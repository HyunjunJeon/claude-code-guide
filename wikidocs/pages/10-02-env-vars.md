환경 변수는 설정 파일을 편집하지 않고 Claude Code 동작을 바꾸는 가장 빠른 방법입니다.

## 어디에 설정할까

공식 문서는 두 가지 주요 경로를 지원합니다.

- `claude` 실행 전에 셸에서 export
- `settings.json`의 `env` 키 아래에 선언

임시 오버라이드는 셸 export, 지속 기본값은 `settings.json`이 더 적합합니다.

## 가장 중요한 변수군

변수는 많지만, 실무적으로 자주 건드리는 묶음은 몇 가지로 압축됩니다.

### 인증과 라우팅

- `ANTHROPIC_API_KEY`
- `ANTHROPIC_AUTH_TOKEN`
- `ANTHROPIC_BASE_URL`
- `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_VERTEX`, `CLAUDE_CODE_USE_FOUNDRY`

이 변수들이 요청 대상과 인증 경로를 결정합니다.

### 세션과 컨텍스트 동작

- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`
- `CLAUDE_CODE_SKIP_PROMPT_HISTORY`
- `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS`
- `CLAUDE_CODE_ENABLE_TASKS`

세션이 커질 때나, 스크립트 실행을 최대한 휘발성으로 만들고 싶을 때 중요합니다.

### 보안과 격리

- `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`
- `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING`
- `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`
- 각종 sandbox 및 provider auth skip 관련 변수

신뢰 경계가 중요한 환경이라면 가장 먼저 감사해야 할 변수들입니다.

### 기능 플래그

- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`
- `CLAUDE_CODE_USE_POWERSHELL_TOOL`
- `CLAUDE_CODE_ENABLE_TELEMETRY`

미리보기 기능이나 인프라 통합을 여는 경우가 많습니다.

## 실전 예시

임시 API 키 오버라이드:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
claude
```

agent teams 활성화:

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
claude
```

휘발성 세션에서 transcript 저장 끄기:

```bash
export CLAUDE_CODE_SKIP_PROMPT_HISTORY=1
claude -p "summarize this diff"
```

## 흔한 실수

- env var가 파일 설정을 덮는다는 점을 놓치는 것
- 임시 인증 변수를 너무 오래 export해 두는 것
- subprocess scrubbing이 켜진 상태에서 자식 프로세스도 같은 변수를 볼 거라고 생각하는 것
- proxy/gateway 변수를 제공자 프로토콜과 맞지 않게 쓰는 것

## 관련 가이드

- [Configuration](https://wikidocs.net/345695)
- [문제 해결](https://wikidocs.net/345703)
- [Authentication and IAM](https://wikidocs.net/345705)

## 공식 출처

- [Environment variables](https://code.claude.com/docs/ko/env-vars)
