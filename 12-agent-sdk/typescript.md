# TypeScript

TypeScript is the fastest path if your host application already runs on Node.js or if you want strong typing around events, tools, and runtime options.

## Why Choose It

Use the TypeScript SDK when you want:

- a Node-native integration,
- typed streaming events,
- easy embedding in web backends or CLIs,
- close control over async workflows.

## Typical Setup

Install the package, then call `query(...)` from your app:

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

## Strengths

- clean async iteration for streaming,
- straightforward integration with existing Node services,
- strong fit for MCP-heavy or connector-heavy hosts,
- good ergonomics for typed schemas and event handling.

## Common Pitfalls

- starting in single mode when the app really needs streaming,
- forgetting to narrow tool permissions,
- mixing transient session handling with persistent production workflows.

## Related Links

- [Overview](./overview.md)
- [Streaming Output](./streaming-output.md)
- Official guide: https://code.claude.com/docs/ko/agent-sdk/typescript
