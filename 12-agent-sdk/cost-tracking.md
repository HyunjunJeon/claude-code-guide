# Cost Tracking

Cost tracking helps you understand how much an SDK run is consuming and where that spend is coming from.

## What To Measure

Useful measurements include:

- total run cost,
- token usage,
- tool-heavy versus model-heavy runs,
- cost by workflow, user, or tenant,
- cost spikes caused by retries or long context chains.

## Why It Matters

Agent apps are not static prompt wrappers. A single user action can expand into several model turns and tool calls. Without cost tracking, you cannot tell whether a workflow is efficient or simply expensive.

## Practical Patterns

- attach usage and cost metadata to session records,
- show operators a per-run summary,
- alert on abnormal usage growth,
- pair cost tracking with `maxTurns` and permission policy,
- separate evaluation traffic from production traffic.

## Common Pitfalls

- Looking only at top-line spend and missing the workflow that causes it.
- Ignoring retries, tool loops, or context bloat.
- Failing to distinguish preview/test traffic from real customer usage.

## Related Links

- [Observability](./observability.md)
- [Sessions](./sessions.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/cost-tracking
