TypeScript는 호스트 애플리케이션이 이미 Node.js 위에 있거나, 이벤트와 도구, 실행 옵션을 타입으로 강하게 다루고 싶을 때 가장 빠른 경로입니다.

## 왜 고를까

다음이 필요하면 TypeScript SDK가 잘 맞습니다.

- Node 네이티브 통합
- 타입이 있는 스트리밍 이벤트 처리
- 웹 백엔드나 CLI에 자연스러운 임베딩
- 비동기 워크플로에 대한 세밀한 제어

## 기본 형태

패키지를 설치한 뒤 앱에서 `query(...)`를 호출합니다.

```ts
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Review the recent auth changes",
  options: { allowedTools: ["Read", "Grep", "Glob"] },
})) {
  if (message.type === "result") {
    console.log(message.result);
  }
}
```

## 강점

- 스트리밍과 async iteration 조합이 깔끔합니다.
- 기존 Node 서비스에 붙이기 쉽습니다.
- MCP나 커넥터가 많은 호스트에 잘 맞습니다.
- 타입이 있는 스키마와 이벤트 처리에 유리합니다.

## 흔한 실수

- 실제로는 스트리밍이 필요한데 싱글 모드로 시작하는 것
- 도구 권한을 충분히 좁히지 않는 것
- 일회성 세션 처리와 운영용 지속 세션을 섞는 것

## 관련 링크

- [개요](https://wikidocs.net/345717)
- [스트리밍 출력](https://wikidocs.net/345722)
- 공식 가이드: https://code.claude.com/docs/ko/agent-sdk/typescript
