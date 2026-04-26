Claude Agent SDK는 Claude Code를 애플리케이션 안에서 프로그래밍 가능하게 쓸 수 있도록 만든 SDK입니다. 파일 읽기, 도구 호출, 멀티턴 컨텍스트 유지, 권한 제어를 터미널 인터랙션 없이 처리하고 싶을 때 사용합니다.

## 무엇인가

이 SDK는 Claude Code를 움직이는 것과 같은 에이전트 루프를 제공합니다. 여기에 기본 도구, 세션, 훅, 권한, MCP/커스텀 도구를 붙여서 실제 제품에 넣을 수 있게 합니다. 예전 문서에서 보이던 Claude Code SDK라는 이름은 현재 Agent SDK로 바뀌었습니다.

## 언제 쓰는가

다음이 필요할 때 적합합니다.

- 코드베이스를 읽고 수정하는 에이전트,
- 결과를 보고 다시 시도하는 작업 흐름,
- 여러 턴에 걸친 컨텍스트 유지,
- 승인 정책이나 보안 제어,
- 프로젝트 전용 도구 호출.

단순히 한 번 답만 받으면 되는 작업이라면 Agent SDK는 과할 수 있습니다.

## 멘탈 모델

에이전트 루프를 기준으로 보면 이해가 쉽습니다.

1. 프롬프트와 설정을 보냅니다.
2. Claude가 바로 답할지, 도구를 부를지 판단합니다.
3. SDK가 도구를 실행하고 결과를 다시 Claude에 돌려줍니다.
4. 세션은 이 대화 기록을 보존합니다.
5. 권한과 훅은 루프 바깥에서 행동을 통제합니다.

## 핵심 API와 패턴

- TypeScript와 Python 모두 `query(...)`가 진입점입니다.
- `allowedTools`, `disallowedTools`, `permissionMode`로 도구 범위를 조절합니다.
- `resume`, `continue: true`, `fork_session`으로 세션을 이어가거나 분기합니다.
- `mcpServers`와 `createSdkMcpServer(...)`로 커스텀 도구를 추가합니다.
- `hooks`와 `settings.json`으로 정책, 로깅, 자동화를 넣습니다.

간단한 TypeScript 예시:

```ts
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "auth.ts의 버그를 찾아 고쳐줘",
  options: { allowedTools: ["Read", "Edit", "Bash"] },
})) {
  if (message.type === "result" && message.subtype === "success") {
    console.log(message.result);
  }
}
```

## 흔한 실수

- SDK를 상태 없는 프롬프트 래퍼처럼 생각하는 것
- 쓰기나 셸 권한을 열어두고 시작하는 것
- 훅이 권한 시스템 전체를 대체한다고 착각하는 것
- 세션 복원과 파일 상태 복원을 혼동하는 것

## 관련 링크

- [에이전트 루프](https://wikidocs.net/345718)
- [세션](https://wikidocs.net/345719)
- [커스텀 도구](https://wikidocs.net/345721)
- [권한](https://wikidocs.net/345720)
- [훅](https://wikidocs.net/345725)
- 공식 개요: https://code.claude.com/docs/ko/agent-sdk/overview
- 공식 문서 맵: https://code.claude.com/docs/ko/claude_code_docs_map
