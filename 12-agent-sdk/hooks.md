# Hooks

Hooks let you run code around the Agent SDK lifecycle. Use them for auditing, validation, policy enforcement, context injection, or automated follow-up actions.

## What It Is

A hook is an event-driven callback or command that runs when Claude reaches a lifecycle boundary, such as before a tool call, after a tool call, when a session starts or ends, or when the user submits a prompt.

## When To Use It

Use hooks when you need to:

- log or audit tool activity,
- block risky operations,
- inject extra context before Claude responds,
- format or post-process outputs,
- watch files or react to working-directory changes.

## Mental Model

Think of hooks as the control layer around the loop, not the loop itself. `PreToolUse` can block or rewrite a request before it runs. `PostToolUse` sees the result after the tool already executed. Session and prompt hooks operate at lifecycle boundaries.

## Key APIs And Patterns

- Configure callback hooks through `options.hooks` on `query(...)`.
- Configure hooks in `settings.json`, `.claude/settings.local.json`, or project/user settings.
- Use matchers to scope hooks to tool names.
- Common events include `PreToolUse`, `PostToolUse`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `Notification`, `Stop`, `FileChanged`, and `CwdChanged`.
- Hook output can use exit codes or structured JSON fields such as `permissionDecision`, `permissionDecisionReason`, `updatedInput`, `additionalContext`, and `updatedMCPToolOutput`.
- `CLAUDE_PROJECT_DIR` is available when Claude launches the hook command and is the safest way to reference project-relative scripts.

## Common Pitfalls

- Trying to prevent a tool in `PostToolUse`; by then the tool has already run.
- Writing fragile shell commands without quoting variables or using absolute paths.
- Assuming config edits apply immediately to the active session.
- Using hooks as a shortcut for permission design. They complement permissions; they do not replace them.
- Forgetting that hooks run arbitrary shell commands and need the same care as production scripts.

## Related Links

- [Permissions](./permissions.md)
- [Overview](./overview.md)
- Official hooks reference: https://code.claude.com/docs/ko/hooks
- Official hooks guide: https://platform.claude.com/docs/en/agent-sdk/hooks
