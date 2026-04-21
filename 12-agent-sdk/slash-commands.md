# Slash Commands

Slash commands are named shortcuts for repeatable workflows. They package intent behind a stable command surface instead of asking users to remember long prompts.

## Why They Matter

They are useful when your agent app has recurring flows such as:

- code review,
- deployment preparation,
- project-specific reports,
- incident triage,
- environment setup.

In practice, a slash command should be a thin entrypoint into a well-defined workflow, not a hidden pile of unrelated logic.

## Design Guidance

- keep command names short and memorable,
- document required inputs and side effects,
- make the command expand into a predictable workflow,
- avoid overlapping commands that differ only slightly.

## Common Pitfalls

- using slash commands to compensate for weak defaults,
- creating many near-duplicate commands,
- hiding destructive behavior behind a friendly command name.

## Related Links

- [Skills](./skills.md)
- [Plugins](./plugins.md)
- [Slash commands module](../01-slash-commands/README.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/slash-commands
