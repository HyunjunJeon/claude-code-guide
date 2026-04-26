# 인증 및 IAM

이 문서는 Claude Code 사용자가 어떻게 인증하는지, 조직 역할이 접근 제어에 어떤 영향을 주는지, 그리고 인터랙티브 사용, CI, 서비스 계정형 자동화에 어떤 자격 증명 경로를 써야 하는지를 정리합니다.

## 로그인 경로

대화형 사용은 일반적으로 `claude` 를 실행해서 브라우저 기반 로그인 흐름을 완료하는 방식입니다. Claude Code는 다음 계정 경로를 지원합니다.

- Claude Pro 또는 Max용 Claude.ai 계정
- Claude for Teams 또는 Claude for Enterprise 계정
- Claude Console 계정
- Amazon Bedrock, Google Vertex AI, Microsoft Foundry 같은 클라우드 공급자 인증

기본적인 실행 예시는 다음과 같습니다.

```bash
claude
```

로그아웃하거나 다시 인증하려면 다음을 사용합니다.

```plaintext
/logout
```

Claude Code 안에서는 `/login` 과 `/status` 로 재인증과 상태 확인을 할 수 있습니다.

## 조직 과 역할

팀 환경에서는 중앙 과금과 조직 관리가 필요한 경우 Claude for Teams 또는 Claude for Enterprise가 가장 단순한 선택입니다.

Claude Console 기반 접근에서는 역할 구분이 중요합니다.

- `Claude Code` 역할: Claude Code API 키만 만들 수 있음
- `Developer` 역할: 어떤 종류의 API 키든 만들 수 있음

즉, Claude Code 전용 키만 허용할지, 일반 개발자 키까지 허용할지 역할로 구분할 수 있습니다.

## 자격 증명 우선순위

여러 인증 수단이 있으면 Claude Code는 다음 순서로 선택합니다.

1. `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_VERTEX`, 또는 `CLAUDE_CODE_USE_FOUNDRY` 가 설정된 경우 클라우드 공급자 자격 증명
2. `ANTHROPIC_AUTH_TOKEN`
3. `ANTHROPIC_API_KEY`
4. `apiKeyHelper` 출력
5. `CLAUDE_CODE_OAUTH_TOKEN`
6. `/login` 으로 얻은 구독 OAuth 자격 증명

실무적으로 중요한 점은 다음과 같습니다.

- `ANTHROPIC_API_KEY` 가 설정되어 있고 승인되면, 로그인된 구독보다 이 값이 우선합니다.
- `ANTHROPIC_AUTH_TOKEN` 은 `Authorization: Bearer` 헤더를 쓰는 게이트웨이 또는 프록시에 적합합니다.

`apiKeyHelper`, `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN` 는 CLI 세션에만 적용됩니다. Claude Desktop 과 원격 세션은 OAuth만 사용합니다.

## 자격 증명 저장

Claude Code는 자격 증명을 안전하게 저장합니다.

- macOS: 암호화된 Keychain
- Linux, Windows: `~/.claude/.credentials.json`
- `CLAUDE_CONFIG_DIR` 가 있으면 해당 경로 아래 저장

문서 기준으로 Linux에서는 파일 권한이 `0600` 이고, Windows에서는 사용자 프로필 디렉터리의 접근 제어를 따릅니다.

## CI 와 서비스 계정형 사용

브라우저 로그인 없이 돌아가야 하는 환경에서는 비대화형 경로를 사용합니다.

- 구독 기반 자동화: `claude setup-token` 으로 장기 OAuth 토큰을 만들고 `CLAUDE_CODE_OAUTH_TOKEN` 으로 내보냅니다.
- API 키 기반 파이프라인: `ANTHROPIC_API_KEY` 를 마스킹된 시크릿으로 저장합니다.
- 클라우드 공급자 기반 자동화: 정적 키 대신 공급자 고유 인증 모델을 사용합니다.

실제로는 다음과 같은 패턴이 적합합니다.

- Google Vertex AI + Workload Identity Federation + 전용 서비스 계정
- AWS Bedrock + OIDC 기반 역할 위임
- GitLab CI/CD 또는 유사 러너에서 마스킹 변수와 최소 권한 역할 사용

Vertex AI 쪽은 다운로드 가능한 서비스 계정 키보다, 필요한 권한만 가진 전용 서비스 계정과 Workload Identity Federation을 쓰는 패턴이 권장됩니다.

## 확인 방법

현재 활성 인증 수단을 보려면:

```plaintext
/status
```

API 키가 잘못 고정된 경우에는 환경 변수를 제거하고 다시 시작합니다.

```bash
unset ANTHROPIC_API_KEY
claude
```

CI 나 스크립트에서는 실행 전에 토큰 또는 공급자 자격 증명이 제대로 주입되었는지 확인해야 합니다.

## 공식 문서 링크

- [인증](https://code.claude.com/docs/ko/authentication)
- [환경 변수](https://code.claude.com/docs/ko/env-vars)
- [Google Vertex AI에서 Claude Code 사용하기](https://code.claude.com/docs/ko/google-vertex-ai)
- [Claude Code GitLab CI/CD](https://code.claude.com/docs/ko/gitlab-ci-cd)
- [Claude Code 설정](https://code.claude.com/docs/ko/settings)
