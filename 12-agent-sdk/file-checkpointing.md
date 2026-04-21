# File Checkpointing

File checkpointing is the file-state side of safe agent execution. It lets you capture a rollback point before edits and restore files later if the run goes in the wrong direction.

## How It Differs From Sessions

- Sessions preserve conversation history.
- File checkpoints preserve workspace state.

Those are related, but not interchangeable. Resuming a session does not undo edits. Restoring a checkpoint does not restore the agent's reasoning history.

## When To Use It

Use file checkpointing when you need:

- reversible edit workflows,
- safer long-running refactors,
- experiments that may need to be discarded,
- operator confidence in automated edits.

## Operational Guidance

- Take checkpoints before broad or multi-file edits.
- Name or tag them in a way the host can surface clearly.
- Pair checkpoints with session IDs when you need auditability.
- Make rollback a first-class UI action, not an afterthought.

## Common Pitfalls

- Taking a checkpoint too late, after the agent already changed files.
- Assuming Git state alone is enough for application-level rollback UX.
- Forgetting that external side effects, such as network actions, are not reversed by file restore.

## Related Links

- [Sessions](./sessions.md)
- [Todo Tracking](./todo-tracking.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/file-checkpointing
