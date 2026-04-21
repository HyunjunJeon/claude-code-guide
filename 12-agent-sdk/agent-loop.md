# Agent Loop

The agent loop is the runtime cycle behind the SDK. It turns a prompt into tool decisions, tool execution, follow-up reasoning, and a final result.

## What It Is

At a high level, the loop works like this:

1. Your app sends a prompt and runtime options.
2. Claude decides whether to answer directly or request a tool.
3. The host runs the tool and feeds the result back.
4. Claude continues until it reaches a final answer, a stop condition, or a turn limit.

Permissions and hooks wrap this loop. They can block, rewrite, or annotate tool requests before the tool actually runs.

## When To Care

Understand the loop when you need to:

- debug why an agent keeps calling tools,
- cap runaway tool use with `maxTurns`,
- explain the difference between streaming and one-shot execution,
- insert policy or logging at the right lifecycle boundary.

## Mental Model

The SDK is not "prompt in, answer out." It is an event loop with repeated model and tool steps. That is why sessions, hooks, permissions, and observability matter so much in SDK apps.

## Practical Control Points

- `query(...)` starts the loop.
- `maxTurns` limits how long the loop can continue.
- `allowedTools` and `disallowedTools` shape what Claude may request.
- `permissionMode`, declarative settings, and `canUseTool` decide whether a request is approved.
- Hooks such as `PreToolUse` and `PostToolUse` observe or change loop behavior.

## Common Pitfalls

- Treating repeated tool calls as a bug when the model is still gathering context.
- Forgetting that a blocked tool can still affect the conversation flow.
- Using single mode where the app actually needs tool turns or user follow-up.
- Expecting sessions to replace loop controls. Sessions preserve history; they do not limit behavior.

## Related Links

- [Sessions](./sessions.md)
- [Streaming vs Single Mode](./streaming-vs-single-mode.md)
- [Permissions](./permissions.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/agent-loop
