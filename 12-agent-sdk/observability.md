# Observability

Observability is how you see what the agent is actually doing in production: prompts in, tool calls out, retries, failures, latency, and cost.

## What Good Observability Covers

At minimum, capture:

- session ID and user/request correlation,
- model choice and runtime options,
- tool requests and outcomes,
- approval or denial decisions,
- latency, token usage, and final status.

For larger systems, also capture tenant boundaries, environment, and deployment version.

## Why It Matters

When an agent fails, "the answer was bad" is not enough. You need to know whether the issue came from permissions, tools, missing context, schema validation, or model behavior.

## Practical Patterns

- treat the session ID as the backbone of tracing,
- log tool events separately from user-facing text,
- redact secrets before exporting traces,
- connect observability to cost tracking and alerting,
- preserve enough data to debug, but not more than policy allows.

## Common Pitfalls

- Logging everything without a redaction plan.
- Storing user-visible text but not the tool history that explains it.
- Forgetting to join traces across retries and forks.

## Related Links

- [Cost Tracking](./cost-tracking.md)
- [Hooks](./hooks.md)
- [Sessions](./sessions.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/observability
