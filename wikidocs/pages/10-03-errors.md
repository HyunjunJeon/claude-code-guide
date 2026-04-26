이 문서는 Claude Code가 이미 실행 중일 때 나타나는 런타임 오류를 다룹니다. 설치 중 PATH 문제, 바이너리 문제, TLS 문제는 문제 해결 문서를 보세요.

## 자동 재시도

Claude Code는 일시적 실패를 바로 보여주지 않고 먼저 여러 번 재시도합니다. 서버 오류, 과부하 응답, 요청 시간 초과, 일시적 429 제한, 연결 끊김은 지수 백오프로 다시 시도됩니다.

조절 가능한 환경 변수는 다음과 같습니다.

```plaintext
CLAUDE_CODE_MAX_RETRIES
API_TIMEOUT_MS
```

## 서버 오류

### `API Error: 500 Internal server error`

Anthropic 쪽 내부 오류입니다. 프롬프트나 계정 문제는 아닙니다. `status.claude.com`을 확인하고 잠시 후 다시 시도하세요. 계속되면 `/feedback`을 사용하세요.

### `API Error: Repeated 529 Overloaded errors`

API가 일시적으로 포화 상태입니다. 몇 분 뒤 다시 시도하고, 필요하면 `/model`로 다른 모델로 바꾸세요.

### `Request timed out`

요청이 제한 시간 안에 끝나지 못했습니다. 다시 시도하거나 작업을 더 작은 단위로 나누세요. 네트워크가 느리면 `API_TIMEOUT_MS`를 늘릴 수 있습니다.

### Auto mode가 작업 안전성을 판단하지 못함

분류 모델이 과부하되면 Auto mode는 무작정 승인하지 않고 작업을 막습니다. 잠시 뒤 다시 시도하세요.

## 사용 한도

### `You’ve hit your session limit`

플랜의 누적 사용 한도를 다 썼습니다. 메시지에 나온 리셋 시각까지 기다리거나, `/usage`와 `/extra-usage`로 상태를 확인하세요.

### `Server is temporarily limiting requests`

이건 일시적 throttling입니다. 잠깐 기다렸다가 다시 시도하세요.

### `Request rejected (429)`

키, Bedrock 프로젝트, Vertex 프로젝트에 연결된 rate limit에 걸렸습니다. `/status`를 확인하고 동시성을 줄이세요.

### `Credit balance is too low`

Console 조직의 선불 크레딧이 부족합니다. 크레딧을 충전하거나 `/login`으로 구독 기반 인증을 사용하세요.

## 인증 오류

### `Not logged in`

`/login`을 실행하세요. 환경 변수 기반 인증을 기대했다면, Claude Code를 실행한 셸에 `ANTHROPIC_API_KEY`가 export되어 있는지 확인하세요.

### `Invalid API key`

`ANTHROPIC_API_KEY` 또는 `apiKeyHelper`가 돌려준 키가 거부되었습니다. 변수를 제거하고 다시 실행한 뒤 `/status`로 활성 자격 증명을 확인하세요.

### `This organization has been disabled`

오래된 API 키가 구독 로그인보다 우선하는 경우가 많습니다. 현재 셸과 셸 프로필에서 `ANTHROPIC_API_KEY`를 제거하세요.

### `OAuth token revoked` 또는 `OAuth token has expired`

다시 `/login` 하세요. 같은 세션에서 반복되면 먼저 `/logout`으로 완전히 지운 뒤 `/login` 하세요.

### `does not meet scope requirement user:profile`

저장된 토큰이 현재 기능에 필요한 scope보다 오래되었습니다. `/login`으로 새 토큰을 발급받으세요.

## 네트워크와 연결 오류

### `Unable to connect to API`

API에 아예 도달하지 못했습니다. 같은 셸에서 연결을 확인하세요.

```bash
curl -I https://api.anthropic.com
```

프록시를 쓰면 `HTTPS_PROXY`를 설정하고, LLM gateway나 relay를 쓰면 base URL 설정도 확인하세요.

### `SSL certificate verification failed`

프록시나 TLS 검사 장비가 Node가 신뢰하지 않는 인증서를 내보내고 있습니다. `NODE_EXTRA_CA_CERTS`로 조직의 CA 번들을 지정하고, 전역 TLS 검증 비활성화는 피하세요.

## 요청 오류

### `Prompt is too long`

대화와 첨부 파일이 모델 컨텍스트 창을 넘었습니다. `/compact`, `/clear`, `/context`를 사용하고, 쓰지 않는 MCP 서버는 줄이세요.

### `Error during compaction: Conversation too long`

`/compact` 자체가 들어갈 공간이 부족합니다. Esc를 두 번 눌러 몇 턴 뒤로 가고 다시 compact 하세요. 그래도 부족하면 `/clear`로 새 세션을 시작하세요.

### `Request too large`

원시 요청 본문이 API 바이트 제한을 넘었습니다. 큰 파일을 붙여넣지 말고 경로로 참조하세요.

### `Image was too large`

첨부한 이미지가 크기나 해상도 제한을 넘었습니다. 더 작은 크롭본이나 리사이즈한 이미지를 사용하세요.

### `PDF too large` 또는 `PDF is password protected`

PDF를 분할하거나 보호를 해제하거나 텍스트를 추출한 뒤 다시 시도하세요.

### `Extra inputs are not permitted`

프록시나 gateway가 `anthropic-beta` 헤더를 제거했습니다. 헤더를 그대로 전달하도록 고치거나, 필요하면 베타 의존 기능을 끄세요.

### `There’s an issue with the selected model`

모델 이름이 잘못됐거나 현재 계정에 권한이 없습니다. `/model`로 사용할 수 있는 모델을 고르고, `--model`, `ANTHROPIC_MODEL`, 설정 파일에서 오래된 ID가 있는지 확인하세요.

### `Claude Opus is not available with the Claude Pro plan`

플랜에 포함된 모델로 바꾸세요. 최근 업그레이드했다면 `/logout` 후 `/login`으로 다시 인증해야 새 권한이 반영됩니다.

### `thinking.type.enabled is not supported for this model`

Claude Code 버전이 모델 설정 요구사항보다 오래되었습니다. 업데이트하고 다시 시작하거나, 더 오래된 모델을 고르세요.

### `Thinking budget exceeds output limit`

thinking budget이 응답 길이보다 커서 답변 공간이 없어졌습니다. `MAX_THINKING_TOKENS`를 낮추거나 출력 한도를 올리세요.

### `API Error: 400 due to tool use concurrency issues`

중간에 tool call이 끊기거나 중간 편집이 일어나 대화 기록이 꼬였습니다. `/rewind`로 체크포인트 이전으로 돌아가 다시 진행하세요.

## 에러 없이 품질만 나빠질 때

오류는 안 뜨는데 답변이 갑자기 이상하면 다음을 먼저 확인하세요.

- `/model`로 모델 확인
- `/effort`로 reasoning level 확인
- `/context`로 컨텍스트 압박 확인
- `/compact` 또는 `/clear`로 오래된 기록 정리
- `/rewind`로 잘못된 턴 되돌리기

큰 `CLAUDE.md`, 사용하지 않는 MCP 서버, 오래된 지시문이 흔한 원인입니다.

## 보고

여기에 없는 오류이거나 복구 방법이 안 통하면 `/feedback`을 사용하세요. 컴포넌트별 오류는 해당 문서를 따르세요.

- MCP 서버 연결 또는 인증 실패: MCP 문서
- hook 실패: hooks 문서
- 설치나 파일시스템 문제: 문제 해결 문서

## 공식 출처

- https://code.claude.com/docs/ko/errors
- https://code.claude.com/docs/ko/troubleshooting
- https://code.claude.com/docs/ko/settings
- https://code.claude.com/docs/ko/mcp
- https://code.claude.com/docs/ko/permissions
