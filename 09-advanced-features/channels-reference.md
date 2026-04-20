
# Channels Reference

Channels let external systems push messages into a live Claude Code session. They are useful when Claude should react to events that happen away from the terminal, such as CI failures, monitoring alerts, or chat messages.

This guide focuses on the builder/reference side of channels, not just how to subscribe to existing ones.

## What a Channel Is

A channel is an MCP server that:

- runs locally as a subprocess of Claude Code
- connects over stdio
- declares the `claude/channel` capability
- emits `notifications/claude/channel` when an external event arrives

Typical patterns:

- chat bridge: Telegram or Discord DM arrives, Claude sees it in the session
- webhook bridge: CI or monitoring POSTs to a local HTTP listener, Claude reacts

## Requirements

You need:

- an MCP SDK implementation such as `@modelcontextprotocol/sdk`
- a runtime like Node, Bun, or Deno
- a local process started by Claude Code

Your channel server must do three things:

1. declare the `claude/channel` capability
2. emit `notifications/claude/channel`
3. connect over stdio

During research-preview style development flows, custom channels may also need an explicit development flag for local testing.

## Minimal Architecture

```text
External system -> Local channel server -> Claude Code session
```

Examples:

- CI sends a webhook to your local channel server
- the channel server wraps the payload in a channel notification
- Claude receives the event and acts inside the current session

## Minimal Webhook Receiver

The smallest useful pattern is a one-way webhook receiver:

1. start an MCP server
2. declare `claude/channel`
3. listen on a local HTTP port
4. forward POST bodies as channel notifications

Minimal TypeScript shape:

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

Your HTTP listener can then translate inbound requests into:

- `content`: the text Claude should see
- `meta`: attributes that become metadata on the channel event

## Notification Format

Channel events arrive in Claude's context as a `<channel>` block.

Conceptually:

```xml
<channel source="webhook" severity="high" run_id="1234">
build failed on main
</channel>
```

Important pieces:

- `source` is derived from the configured server name
- metadata becomes attributes on the tag
- the body is the actual event content Claude reads

Use metadata for routing and reply context:

- `chat_id`
- `severity`
- `run_id`
- `path`
- `method`

## Reply Tools for Two-Way Channels

If the channel is not one-way, expose a normal MCP tool such as `reply`.

That requires:

1. `tools: {}` in the MCP server capabilities
2. a normal tool registration via MCP request handlers
3. instructions that tell Claude when and how to use the reply tool

Example tool shape:

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

Use this when Claude should answer back into:

- a chat thread
- a ticket comment stream
- a webhook-backed operator console

## Sender Gating

Channels are a prompt-injection boundary. Do not blindly forward every inbound message into Claude.

Use sender gating to verify the origin before forwarding content. Examples:

- allowlisted user ID
- signed webhook secret
- bot-owner ID
- known chat/thread mapping

Without sender checks, anyone who can reach the channel can inject instructions into a live session.

## Permission Relay

Two-way channels can also relay permission prompts so approvals happen remotely.

This requires:

1. declaring `claude/channel/permission` under experimental capabilities
2. handling permission request notifications
3. sending back an allow/deny verdict tied to the issued request ID

Critical rule:

- only enable permission relay if the remote sender is authenticated and trusted

Otherwise, a remote actor could approve tool use in your local session.

## Testing During Development

For local experimentation, channels may require a development bypass flag.

Typical pattern:

```bash
claude --dangerously-load-development-channels server:webhook
```

Use this only for channels you control while building or testing.

## Packaging as a Plugin

Channels become much easier to distribute when wrapped as a plugin:

- plugin owns the MCP server config
- plugin can bundle hooks, skills, and channel-related setup
- teammates can install one package instead of recreating a manual MCP setup

This is the right direction when a channel should be shared across a team.

## Recommended Project Structure

```text
my-channel-plugin/
├── .claude-plugin/
│   └── plugin.json
├── .mcp.json
├── servers/
│   └── webhook-channel.ts
└── README.md
```

## Common Mistakes

- treating channels like ordinary MCP tools instead of long-lived event bridges
- forgetting to declare `claude/channel`
- exposing a reply tool but not telling Claude when to use it
- forwarding inbound text without sender verification
- enabling permission relay without authenticating the sender

## Try It Now

### 1. Sketch a one-way local channel

Create a small local MCP server that:

- declares `claude/channel`
- listens on localhost
- forwards POST request bodies to Claude

Expected result:

- Claude receives external events inside the current session context

### 2. Add a reply tool

Extend the server with a `reply` tool that accepts `chat_id` and `text`.

Expected result:

- Claude can answer back through the channel instead of only reacting one-way

## Related Guides

- [Advanced Features README](./README.md)
- [MCP Guide](../05-mcp/README.md)
- [Plugins Guide](../07-plugins/README.md)
- [Hooks Guide](../06-hooks/README.md)

## Official Reference

- https://code.claude.com/docs/en/channels-reference
