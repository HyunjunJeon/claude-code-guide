# Skills

Skills are packaged capabilities that combine instructions, helper scripts, templates, and supporting assets for recurring task types.

## What They Are Good For

Use skills when you want the agent to do a class of work consistently, such as:

- generate docs,
- review code in a specific style,
- prepare release notes,
- operate a recurring internal workflow.

A skill is stronger than a one-line prompt because it can carry local instructions and reusable artifacts together.

## Skills vs Slash Commands

- Use a slash command when the user should invoke a named workflow.
- Use a skill when the system should bundle reusable capability and context.

Many teams use both: a slash command triggers a workflow, and a skill provides the reusable instructions underneath it.

## Common Pitfalls

- turning a skill into a giant catch-all folder,
- failing to document when the skill should trigger,
- assuming a skill can replace permissions, hooks, or testing.

## Related Links

- [Slash Commands](./slash-commands.md)
- [Plugins](./plugins.md)
- [Skills module](../03-skills/README.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/skills
