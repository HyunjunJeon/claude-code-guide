
# Channels Reference

Channels는 외부 시스템이 실행 중인 Claude Code 세션으로 메시지를 push할 수 있게 해 줍니다. CI 실패, monitoring alert, chat message처럼 terminal 밖에서 발생한 이벤트에 Claude가 반응해야 할 때 유용합니다.

이 문서는 기존 channel usage가 아니라 builder/reference 관점에 집중합니다.

## What a Channel Is

Channel은 다음 조건을 만족하는 MCP server입니다:

- Claude Code가 subprocess로 로컬 실행
- stdio로 연결
- `claude/channel` capability 선언
- 외부 이벤트가 들어오면 `notifications/claude/channel` 전송

대표 패턴:

- chat bridge: Telegram / Discord DM이 세션에 들어옴
- webhook bridge: CI 또는 monitoring이 local HTTP listener로 POST하고 Claude가 반응

## Requirements

필요한 것:

- `@modelcontextprotocol/sdk` 같은 MCP SDK 구현
- Node, Bun, Deno 같은 runtime
- Claude Code가 시작하는 local process

Channel server는 최소 세 가지를 해야 합니다:

1. `claude/channel` capability 선언
2. `notifications/claude/channel` 전송
3. stdio로 연결

Research-preview 성격의 local development에서는 custom channel testing에 명시적 development flag가 필요할 수 있습니다.

## Minimal Architecture

```plaintext
External system -> Local channel server -> Claude Code session
```

예:

- CI가 local channel server로 webhook 전송
- channel server가 payload를 channel notification으로 감쌈
- Claude가 세션 안에서 그 이벤트를 읽고 반응

## Minimal Webhook Receiver

가장 단순한 패턴은 one-way webhook receiver입니다:

1. MCP server 시작
2. `claude/channel` 선언
3. local HTTP port에서 listen
4. POST body를 channel notification으로 forward

최소 TypeScript shape:

```ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

const mcp = new Server(
  { name: "webhook", version: "0.0.1" },
  {
    capabilities: { experimental: { "claude/channel": {} } },
    instructions:
      "Events arrive as channel messages from the webhook source. They are one-way alerts.",
  },
)

await mcp.connect(new StdioServerTransport())
```

HTTP listener는 inbound request를 다음으로 변환하면 됩니다:

- `content`: Claude가 실제로 읽는 텍스트
- `meta`: channel event metadata가 되는 값

## Notification Format

Channel event는 Claude의 context 안에서 `<channel>` block 형태로 들어옵니다.

개념적으로는:

```xml
<channel source="webhook" severity="high" run_id="1234">
build failed on main
</channel>
```

핵심 요소:

- `source`는 configured server name에서 옵니다
- metadata는 tag attribute가 됩니다
- body는 Claude가 읽는 실제 event content입니다

metadata는 routing과 reply context에 사용합니다:

- `chat_id`
- `severity`
- `run_id`
- `path`
- `method`

## Reply Tools for Two-Way Channels

Channel이 one-way가 아니라면 `reply` 같은 일반 MCP tool을 노출해야 합니다.

이를 위해서는:

1. MCP server capability에 `tools: {}` 포함
2. 일반 MCP request handler로 tool 등록
3. Claude가 언제 어떻게 reply tool을 써야 하는지 instructions로 설명

예시 tool shape:

```ts
{
  name: "reply",
  description: "Send a message back over this channel",
  inputSchema: {
    type: "object",
    properties: {
      chat_id: { type: "string" },
      text: { type: "string" }
    },
    required: ["chat_id", "text"]
  }
}
```

이건 다음 같은 경우에 필요합니다:

- chat thread에 답장
- ticket comment stream에 응답
- webhook-backed operator console에 응답

## Sender Gating

Channels는 prompt-injection boundary입니다. 들어오는 메시지를 아무 검증 없이 Claude로 넘기면 안 됩니다.

Sender gating 예:

- allowlisted user ID
- signed webhook secret
- bot-owner ID
- known chat/thread mapping

송신자 검증 없이 forward하면, channel에 접근 가능한 누구나 live session에 instruction을 주입할 수 있습니다.

## Permission Relay

Two-way channel은 permission prompt를 원격으로 relay하는 데도 쓸 수 있습니다.

필요한 것:

1. experimental capability에 `claude/channel/permission` 선언
2. permission request notification 처리
3. 발급된 request ID에 묶어서 allow/deny verdict 반환

핵심 규칙:

- remote sender가 인증되고 trusted할 때만 permission relay를 켭니다

그렇지 않으면 원격 사용자가 로컬 세션의 tool use를 승인해 버릴 수 있습니다.

## Testing During Development

로컬 실험에는 development bypass flag가 필요할 수 있습니다.

예:

```bash
claude --dangerously-load-development-channels server:webhook
```

직접 제어하는 channel을 개발/테스트할 때만 사용합니다.

## Packaging as a Plugin

Team 배포가 목적이라면 channel을 plugin으로 감싸는 것이 가장 쉽습니다:

- plugin이 MCP server config를 소유
- plugin이 hooks, skills, channel-related setup을 함께 번들
- 팀원은 수동 MCP 설정 대신 하나의 package만 설치

## Recommended Project Structure

```plaintext
my-channel-plugin/
├── .claude-plugin/
│   └── plugin.json
├── .mcp.json
├── servers/
│   └── webhook-channel.ts
└── README.md
```

## Common Mistakes

- channel을 일반 MCP tool처럼 생각하는 것
- `claude/channel` declaration을 빼먹는 것
- reply tool은 만들고 Claude instructions는 주지 않는 것
- sender verification 없이 inbound text를 그대로 forward하는 것
- 인증 없이 permission relay를 켜는 것

## Try It Now

### 1. Sketch a one-way local channel

다음을 하는 작은 local MCP server를 만듭니다:

- `claude/channel` 선언
- localhost listen
- POST body를 Claude로 forward

Expected result:

- 외부 이벤트가 현재 세션 context로 들어옵니다

### 2. Add a reply tool

`chat_id`와 `text`를 받는 `reply` tool을 추가합니다.

Expected result:

- Claude가 단순히 반응만 하는 것이 아니라 channel을 통해 다시 응답할 수 있습니다

## Related Guides

- [고급 기능 README](./README.md)
- [MCP 가이드](../05-mcp/README.md)
- [Plugin 가이드](../07-plugins/README.md)
- [Hook 가이드](../06-hooks/README.md)

## Official Reference

- https://code.claude.com/docs/ko/channels-reference
