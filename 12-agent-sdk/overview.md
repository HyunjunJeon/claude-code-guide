# Overview

Claude Agent SDK is the programmable version of Claude Code. Use it when you want Claude to read files, call tools, manage multi-turn context, and keep working inside your application instead of an interactive terminal session.

## What it is

The SDK gives you the same agent loop that powers Claude Code, plus built-in tools, permissions, sessions, hooks, and MCP/custom tool support. The current docs rename the old Claude Code SDK to Claude Agent SDK, so expect both names in older references.

## When to use it

Use the Agent SDK when you need an agent that can:

- inspect and edit a codebase,
- run commands and retry based on results,
- keep context across turns,
- enforce approval rules or policy,
- call project-specific tools.

If you only need a one-off static response, the Agent SDK is usually more machinery than you need.

## Mental Model

Think of the SDK as a loop around Claude:

1. You send a prompt plus configuration.
2. Claude decides whether to answer directly or request tools.
3. The SDK runs the tool calls and feeds results back.
4. Sessions preserve that transcript so later calls can continue or fork it.
5. Permissions and hooks sit around the loop to control what is allowed.

## Key APIs And Patterns

- `query(...)` is the main entry point in TypeScript and Python.
- `allowedTools`, `disallowedTools`, and `permissionMode` shape what the agent can do.
- `resume`, `continue: true`, and `fork_session` control session continuity.
- `mcpServers` and `createSdkMcpServer(...)` add custom tools.
- `hooks` and `settings.json` add policy, logging, and automation around tool use.

Minimal TypeScript example:

```ts
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Find and fix the bug in auth.ts",
  options: { allowedTools: ["Read", "Edit", "Bash"] },
})) {
  if (message.type === "result" && message.subtype === "success") {
    console.log(message.result);
  }
}
```

## Common Pitfalls

- Treating the SDK like a stateless prompt wrapper. Sessions and tool state matter.
- Forgetting to narrow tool permissions before giving the agent write or shell access.
- Expecting hooks to replace permissions entirely. They are part of the control flow, not the whole policy layer.
- Mixing up conversation continuity with filesystem rollback. Use file checkpointing for file state, not sessions.

## Related Links

- [Agent loop](./agent-loop.md)
- [Sessions](./sessions.md)
- [Custom Tools](./custom-tools.md)
- [Permissions](./permissions.md)
- [Hooks](./hooks.md)
- Official overview: https://code.claude.com/docs/ko/agent-sdk/overview
- Official docs map: https://code.claude.com/docs/ko/claude_code_docs_map
