# Modifying System Prompts

System-prompt customization changes the agent's standing behavior before any user message is processed.

## When To Use It

Modify the system prompt when you need durable behavior such as:

- house style or output constraints,
- domain-specific instructions,
- compliance wording,
- host-specific interaction rules.

Use it sparingly. A large custom system prompt is easy to grow and hard to debug.

## Good Practices

- prefer appending small, focused instructions over replacing the whole default prompt,
- keep policy instructions separate from workflow-specific task text,
- document prompt changes like code changes,
- test prompt edits against real tool-using scenarios, not just toy examples.

## What To Avoid

- hiding operational policy only in prose when permissions or hooks should enforce it,
- packing volatile task details into the base system prompt,
- replacing the default prompt without understanding what product behavior you removed.

## Related Links

- [Permissions](./permissions.md)
- [Hooks](./hooks.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/modifying-system-prompts
