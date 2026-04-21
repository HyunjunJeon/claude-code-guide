# Permissions

Permissions control what tools Claude can use and when it must ask for approval. This is the main guardrail for file edits, shell commands, and other sensitive actions.

## What It Is

The Agent SDK combines permission modes, declarative rules, hooks, and runtime callbacks. Together they decide whether a tool request is allowed automatically, blocked, or sent back for approval.

## When To Use It

Use permissions when you need to:

- keep an agent read-only by default,
- auto-approve safe edits in a trusted workspace,
- block dangerous commands,
- run in plan-only mode,
- enforce approval flows for users or operators.

## Mental Model

Think of permission evaluation as a pipeline:

1. Hooks get first chance to inspect or block a tool call.
2. Declarative rules in `settings.json` apply `deny`, `allow`, and `ask`.
3. The active permission mode sets the default behavior.
4. `canUseTool` handles anything still undecided.

That order matters. A later layer does not erase an earlier deny.

## Key APIs And Patterns

- `permissionMode` is set on `query(...)` and can be changed during streaming.
- `default` keeps normal approval behavior.
- `acceptEdits` auto-approves file edits and filesystem operations.
- `bypassPermissions` removes prompts, but still runs hooks.
- `plan` prevents tool execution and is useful for review or proposal-only work.
- `allowedTools` and `disallowedTools` provide explicit tool gating.
- `canUseTool` handles anything still unresolved after rules and mode checks.
- `settings.json` supports declarative `allow`, `deny`, and `ask` rules.

## Common Pitfalls

- Assuming `acceptEdits` also auto-approves Bash. It does not.
- Using `bypassPermissions` outside a controlled environment.
- Forgetting that subagents inherit bypass mode.
- Expecting plan mode to execute changes. It cannot.
- Treating hooks as a replacement for rule-based permissions.

## Related Links

- [Hooks](./hooks.md)
- [Sessions](./sessions.md)
- Official permissions guide: https://platform.claude.com/docs/en/agent-sdk/permissions
- Official agent loop guide: https://code.claude.com/docs/ko/agent-sdk/agent-loop
