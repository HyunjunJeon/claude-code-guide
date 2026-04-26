Claude Code GitHub Actions는 Claude를 GitHub Actions 워크플로우 안에서 실행해 이슈 처리, PR 작성, 코드 구현, 정기 리포트 같은 자동화를 구성할 수 있게 해 줍니다. 관리형 Code Review와 달리 실행이 GitHub Actions 러너 안에서 일어나므로, 트리거와 인증, 워크플로우 로직을 직접 통제하고 싶을 때 더 적합합니다.

## 개요

공식 통합의 중심은 `anthropics/claude-code-action@v1`입니다.

대표 사용 사례:

- 이슈나 PR의 `@claude` 멘션에 반응
- 이슈를 구현 PR로 전환
- 코드 리뷰 보조나 유지보수 작업 자동화
- 스케줄 기반 리포트나 정리 작업 실행

공식 문서 기준 핵심 특징:

- 로컬 Claude Code에서 `/install-github-app`로 빠른 설정 가능
- 저장소의 `CLAUDE.md` 지침을 따름
- 코드 실행은 GitHub 러너에서 이뤄짐
- Claude API 직접 사용뿐 아니라 AWS Bedrock, Google Vertex AI도 지원

## 빠른 설정

가장 빠른 시작 방법은 로컬 Claude Code에서 다음을 실행하는 것입니다.

```bash
/install-github-app
```

이 흐름은 GitHub App 설치와 필요한 시크릿 설정을 안내합니다.

공식 문서상 주의점:

- 저장소 관리자 권한이 필요합니다
- 빠른 설치 경로는 direct Claude API 사용자 기준입니다
- Bedrock과 Vertex AI는 별도의 제공자 인증 구성이 필요합니다

## 기본 워크플로우 구조

v1 액션은 단순한 입력 구조를 사용합니다.

- `prompt`: Claude에게 줄 지시문
- `claude_args`: Claude Code CLI 인자 전달
- `anthropic_api_key`: direct Claude API 사용 시 필요

최소 예시는 다음과 같습니다.

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    prompt: "Review this pull request for correctness and security issues"
    claude_args: "--max-turns 5"
```

이슈나 PR 댓글 기반 워크플로우에서는 `@claude` 멘션에 자동 반응하도록 구성할 수도 있습니다.

## Code Review와의 차이

GitHub Actions가 더 적합한 경우:

- Claude를 GitHub CI 안에서 실행하고 싶을 때
- PR 리뷰 외에도 구현, 리포트, 자동 커밋, 이슈 응답 같은 커스텀 자동화가 필요할 때
- Bedrock 또는 Vertex AI 기반으로 CI를 운영하고 싶을 때

관리형 Code Review가 더 적합한 경우:

- 호스팅된 PR 리뷰 기능만 필요할 때
- 조직 관리자가 빠르게 리뷰 기능만 롤아웃하고 싶을 때

둘은 대체 관계라기보다 보완 관계에 가깝습니다.

## 권장 운영 방식

### `CLAUDE.md`를 간결하게 유지

공식 문서도 `CLAUDE.md`를 주요 제어 수단으로 봅니다. 저장소 규칙, 아키텍처 제약, 코드 스타일을 짧고 안정적으로 정리해 두면 액션 품질이 좋아집니다.

### `claude_args`로 범위 제어

비용과 실행 시간을 관리하려면 CLI 인자를 적극적으로 사용합니다.

- `--max-turns`로 반복 횟수 제한
- 필요한 경우 모델 지정
- 허용/차단 도구 범위 설정

### 트리거를 명시적으로 설계

비용이 큰 작업은 이벤트 필터, 브랜치 필터, concurrency 제어를 함께 써서 중복 실행을 줄이는 편이 좋습니다.

### Claude의 결과물도 일반 코드처럼 리뷰

자동화로 생성된 커밋이라도 테스트, 리뷰, 승인 규칙은 그대로 유지하는 것이 안전합니다.

## Bedrock 및 Vertex AI

GitHub Actions는 AWS Bedrock과 Google Vertex AI 기반 실행도 지원합니다. 이는 기업 환경에서 클라우드 제공자 인증, 리전 제어, 내부 보안 정책에 맞추기 좋습니다.

실무적으로는 다음을 뜻합니다.

- direct API 키 대신 제공자 인증 구성이 필요
- 워크플로우의 시크릿 이름과 자격 증명 구성이 정확해야 함
- 선택한 리전과 모델 가용성이 맞아야 함

이미 조직이 Bedrock 또는 Vertex 중심으로 운영 중이라면 이 경로가 자연스럽습니다.

## v1 전환 시 주의점

베타 시절 예제를 쓰고 있다면 v1 규격으로 정리해야 합니다.

- `@beta`를 `@v1`로 변경
- 예전 prompt 입력 방식을 `prompt`로 통일
- CLI 옵션은 `claude_args`로 이동
- 구버전 `mode` 설정은 제거

오래된 베타 예제를 그대로 두면 가장 먼저 CI 설정에서 혼란이 생깁니다.

## 문제 해결

### `@claude`에 반응하지 않음

다음을 확인합니다.

- GitHub App이 정상 설치되었는지
- 해당 이벤트용 워크플로우가 활성화되어 있는지
- direct API 사용 시 필요한 시크릿이 있는지
- 댓글이 `/claude`가 아니라 `@claude`인지

### Claude가 만든 커밋에서 CI가 돌지 않음

다음을 확인합니다.

- GitHub App 또는 custom app 경로를 쓰는지
- 필요한 push / pull_request 이벤트 트리거가 포함되어 있는지
- 앱 권한이 원하는 CI 흐름을 허용하는지

### 인증 오류

direct API라면:

- `ANTHROPIC_API_KEY`가 존재하고 유효한지 확인합니다

Bedrock / Vertex라면:

- 자격 증명과 시크릿 이름
- 제공자 인증 연결
- 리전과 모델 가용성

을 순서대로 점검합니다.

## 관련 링크

- [공식 GitHub Actions 문서](https://code.claude.com/docs/ko/github-actions)
- [Claude Code Action 저장소](https://github.com/anthropics/claude-code-action)
- [공식 Code Review 문서](https://code.claude.com/docs/ko/code-review)
- AWS Bedrock
- Google Vertex AI
- 지침과 메모 관리
