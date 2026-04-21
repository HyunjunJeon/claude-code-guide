# Agent Teams

Agent teams coordinate multiple Claude Code sessions that can communicate with each other directly. They are not just bigger subagents.

## What Makes Agent Teams Different

Subagents:

- have isolated context,
- report back to the caller,
- are coordinated entirely by the main session.

Agent teams:

- have isolated context,
- can message each other directly,
- coordinate through a shared task list,
- keep running as separate Claude Code instances.

That makes agent teams more collaborative, but also more expensive and more complex.

## Requirements

- Claude Code `v2.1.32` or later
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

You can enable them through environment or `settings.json`.

## Best Use Cases

The official docs recommend agent teams for work where parallel exploration has real value:

- research and review from multiple angles,
- cross-layer work spanning frontend, backend, and tests,
- debugging with competing hypotheses,
- large features where separate teammates can own separate pieces.

Do not use them for sequential work or same-file editing where coordination cost exceeds the benefit.

## When To Use Subagents Instead

Choose subagents when:

- only the final result matters,
- the worker is focused and bounded,
- teammates do not need to talk to each other,
- you want lower token cost and lower orchestration overhead.

Choose agent teams when teammates need to:

- share findings,
- challenge assumptions,
- self-coordinate on tasks.

## How To Start

After enabling the feature, ask Claude to create an agent team in natural language:

```text
Create an agent team to investigate this bug: one teammate on frontend, one on backend, one on test coverage.
```

Claude can also propose creating a team when it detects the task would benefit from parallel work, but it still requires your approval.

## Architecture

An agent team includes:

- a team lead: your main session
- teammates: separate Claude Code instances
- a shared task list: work items teammates can claim and complete

The team lead coordinates, but teammates are not passive workers. They can message each other directly.

## Practical Limits

The official docs call out known limitations around:

- session resumption,
- task coordination,
- shutdown behavior.

Treat agent teams as experimental. Use them where the upside of parallel exploration is large enough to justify occasional rough edges.

## Related Guides

- [Subagents Guide](./README.md)
- [How Claude Code Works](../09-advanced-features/how-claude-code-works.md)
- [Common Workflows](../09-advanced-features/common-workflows.md)

## Official Source

- [Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/ko/agent-teams)
