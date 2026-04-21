# GitLab CI/CD

Claude Code GitLab CI/CD는 Claude를 GitLab 파이프라인 안에서 실행해 이슈 처리, 머지 리퀘스트 작업, 구현 보조 자동화를 GitLab 러너 위에서 수행할 수 있게 해 줍니다. 공식 문서 기준 현재 beta이며, 통합 자체는 GitLab이 유지보수합니다.

## 개요

현재 공식 문서가 설명하는 핵심 구조는 다음과 같습니다.

- GitLab 이벤트나 수동 실행이 Claude 작업을 트리거
- 각 실행은 컨테이너화된 CI 환경에서 동작
- Claude의 쓰기 범위는 workspace 수준으로 제한
- 결과는 merge request 흐름을 통해 검토
- Claude API, AWS Bedrock, Google Vertex AI 지원

즉, GitLab 중심 개발 조직에서 Claude를 기존 CI/CD 거버넌스 안에 넣는 방식이라고 보면 됩니다.

## 동작 방식

큰 흐름은 이렇습니다.

1. GitLab이 MR 댓글, 수동 파이프라인 실행 같은 이벤트를 감지합니다.
2. 작업은 저장소와 토론 문맥을 수집합니다.
3. Claude Code가 CI 컨테이너 안에서 제한된 도구와 권한으로 실행됩니다.
4. 변경 사항은 merge request 흐름으로 제안됩니다.

공식 문서는 격리된 실행, 제한된 쓰기, MR 기반 검토를 반복해서 강조합니다. 즉 기본 브랜치를 몰래 수정하는 모델이 아닙니다.

## 설정 패턴

### 빠른 시작

가장 빠른 방법은 `.gitlab-ci.yml`에 Claude 작업을 추가하고, job 안에서 Claude Code를 설치한 뒤, 필요한 자격 증명을 넣어 수동 실행 또는 MR 문맥에서 돌려 보는 것입니다.

공식 예제의 공통 패턴:

- `before_script`에서 Claude 설치
- 필요하면 GitLab MCP 서버 시작
- `claude -p`로 prompt 전달
- `--permission-mode acceptEdits` 사용
- `--allowedTools`를 명시적으로 지정

### 운영 환경용 설정

지속 운영 관점에서는 일반적인 고권한 자동화처럼 다루는 편이 맞습니다.

- CI/CD 변수는 masked로 관리
- prompt와 저장소 규칙은 버전 관리
- runner, timeout, 네트워크 정책을 명시
- 가능하면 장기 비밀값보다 클라우드 제공자 연합 인증 사용

## 제공자 선택

### Claude API

가장 단순한 경로는 `ANTHROPIC_API_KEY`를 GitLab CI/CD 변수로 두는 방식입니다.

### AWS Bedrock

공식 문서는 정적 키보다 OIDC 기반 IAM role assume 방식을 권장합니다. 필요한 준비 작업:

- 대상 Claude 모델에 대한 Bedrock 접근 권한
- GitLab용 AWS OIDC provider
- 그 provider를 신뢰하는 IAM role
- Bedrock 호출에 필요한 최소 권한

대표 변수:

- `AWS_ROLE_TO_ASSUME`
- `AWS_REGION`

### Google Vertex AI

공식 문서는 다운로드 키 대신 Workload Identity Federation을 사용합니다.

대표 준비 사항:

- Vertex AI API 활성화
- GitLab OIDC를 신뢰하는 Google Cloud 설정
- 필요한 Vertex 권한만 가진 전용 service account

대표 변수:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`

## 권장 운영 방식

### `CLAUDE.md`를 짧고 명확하게 유지

공식 문서도 `CLAUDE.md`를 주요 제어 수단으로 봅니다. 저장소 규칙과 제약을 간결하게 넣는 편이 반복 실행 품질에 좋습니다.

### 실행 시간과 비용을 제한

다음 항목을 명시적으로 제어하는 편이 좋습니다.

- `max_turns`
- job timeout
- runner concurrency
- prompt 범위

### Claude 결과도 일반 MR처럼 리뷰

Claude가 만든 변경이라도 기존 승인 규칙, 테스트, 보호 브랜치 정책을 그대로 통과하게 두는 것이 안전합니다.

### 장기 비밀값을 피함

저장소에 자격 증명을 넣지 말고 GitLab 변수와 제공자 연합 인증을 사용합니다.

## 보안과 거버넌스

공식 문서가 강조하는 운영 원칙:

- job은 격리된 컨테이너에서 실행
- 네트워크 접근은 runner 정책으로 제한 가능
- 쓰기 범위는 workspace 수준으로 제한
- 변경은 MR을 통해 공개적으로 검토
- 기존 GitLab 승인과 브랜치 보호 규칙이 그대로 적용

즉 Claude는 거버넌스를 우회하는 도구가 아니라, 기존 CI 통제 안에서 동작하는 자동화입니다.

## 비용과 성능

비용은 두 층위로 봐야 합니다.

- GitLab runner 사용 시간
- Claude 모델 토큰 사용량

공식 문서가 권장하는 최적화 방향:

- 넓은 질문보다 구체적인 prompt 사용
- timeout을 적절히 설정
- concurrency를 제한
- `CLAUDE.md`와 컨텍스트를 짧게 유지

## 문제 해결

### `@claude`에 반응하지 않음

해당 이벤트가 GitLab 설정에 제대로 연결되어 있는지, 그리고 job이 이슈나 MR 문맥을 실제로 받고 있는지 확인합니다.

### job이 코멘트를 쓰거나 MR을 열지 못함

다음을 확인합니다.

- `CI_JOB_TOKEN` 권한이 충분한지, 아니면 `api` scope가 있는 project access token을 써야 하는지
- `--allowedTools`에 `mcp__gitlab`이 포함되어 있는지
- job이 충분한 MR / 스레드 문맥과 함께 실행되는지

### 인증 오류

direct API라면:

- `ANTHROPIC_API_KEY`가 유효한지 확인합니다

Bedrock / Vertex라면:

- OIDC 또는 WIF 구성
- role assume 또는 impersonation 연결
- 리전과 모델 가용성

을 순서대로 점검합니다.

## 관련 링크

- [공식 GitLab CI/CD 문서](https://code.claude.com/docs/ko/gitlab-ci-cd)
- [AWS Bedrock](../11-deployment-admin/amazon-bedrock.md)
- [Google Vertex AI](../11-deployment-admin/google-vertex-ai.md)
- [지침과 메모 관리](../02-memory/README.md)
