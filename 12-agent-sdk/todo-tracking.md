# Todo Tracking

Todo tracking gives the agent and the host a lightweight task list for long or multi-step work.

## What It Is

Instead of forcing users to infer progress from free-form prose, the agent can maintain an explicit list of tasks, update their status, and show what remains.

## When It Helps

Todo tracking is especially useful for:

- long refactors,
- multi-file migrations,
- review workflows,
- background tasks,
- operator-facing dashboards.

## Design Guidance

Good todo lists are:

- short,
- outcome-based,
- updated as the run changes direction,
- visible to the host or operator.

The list should explain current progress without becoming a second transcript.

## Common Pitfalls

- Letting the todo list drift out of sync with the actual run.
- Writing tasks that are too vague to be checked off.
- Duplicating the entire conversation inside the todo list.

## Related Links

- [Sessions](./sessions.md)
- [Agent Loop](./agent-loop.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/todo-tracking
