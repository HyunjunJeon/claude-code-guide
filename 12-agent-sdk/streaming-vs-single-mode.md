# Streaming vs Single Mode

The Agent SDK has two broad execution styles: streaming mode for event-by-event control, and single mode for one-shot programmatic responses.

## Streaming Mode

Use streaming mode when your host application needs to react while the run is still in progress.

Typical reasons:

- render partial output live,
- handle tool calls and approvals,
- collect user follow-up input,
- observe usage, status, or intermediate events,
- keep long-running agents responsive.

Streaming is the safer default for real agent workflows because tools and lifecycle events stay visible.

## Single Mode

Use single mode when you want the SDK to finish the run and hand back one final result.

Typical reasons:

- batch jobs,
- simple automation,
- structured output pipelines,
- wrapper services where intermediate events are not needed.

Single mode is easier to integrate, but you give up much of the runtime visibility and control that makes the SDK agentic.

## How To Choose

Choose streaming mode if any of these are true:

- the agent can call tools,
- the user may need to approve or answer something,
- you need live output or tracing,
- you want fine-grained guardrails.

Choose single mode if all you need is a final answer and the run can remain opaque while it executes.

## Common Pitfalls

- Starting with single mode and then discovering you need approval flows.
- Assuming structured output automatically means single mode is best.
- Forgetting that custom tools and MCP integrations often fit more naturally in streaming flows.

## Related Links

- [Agent Loop](./agent-loop.md)
- [Streaming Output](./streaming-output.md)
- [User Input](./user-input.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/streaming-vs-single-mode
