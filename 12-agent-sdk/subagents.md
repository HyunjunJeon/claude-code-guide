# Subagents

Subagents are specialized child agents that handle bounded work in an isolated context, then hand a result back to the parent workflow.

## Why Use Them

Subagents help when one agent should not carry every detail of every task at once. They let you split work by responsibility, parallelize independent tasks, and keep the parent focused on orchestration.

Good examples:

- code exploration versus implementation,
- research versus execution,
- file-scope ownership across parallel tasks,
- review or verification passes.

## Mental Model

Use the parent as the coordinator. Use subagents for sidecar work, not as an excuse to outsource the critical path blindly.

That means:

- define a narrow task,
- assign clear ownership,
- avoid overlapping write scopes,
- merge results intentionally.

## Common Pitfalls

- spawning subagents for vague work,
- delegating the immediate blocker and then waiting idly,
- sending multiple agents into the same write set,
- treating subagents as free parallelism without review overhead.

## Related Links

- [Sessions](./sessions.md)
- [Agent Loop](./agent-loop.md)
- [Subagents module](../04-subagents/README.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/subagents
