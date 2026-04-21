# Best Practices

The official best-practices guide is built around one recurring truth: context is precious, and Claude performs much better when success criteria and environment constraints are clear.

## Highest-Leverage Rule

Give Claude a way to verify its work.

Strong examples:

- tests with expected cases
- screenshots for visual changes
- a failing command to reproduce
- explicit output or acceptance criteria

Without a verification target, you become the only feedback loop.

## Explore First, Then Plan, Then Code

For non-trivial work:

1. inspect the current system
2. produce a plan
3. refine the plan
4. implement
5. verify

This usually beats asking for code immediately.

## Provide Specific Context

Better prompts mention:

- relevant files or directories
- constraints
- expected behavior
- what must not change
- how to verify success

Specific prompts reduce steering overhead and produce better first attempts.

## Configure The Environment

A strong setup usually includes:

- a useful `CLAUDE.md`
- permission rules that match your risk level
- CLI tools Claude can use for verification
- MCP integrations only where they add real value
- hooks for deterministic automation

You do not need everything on day one, but the environment should support the workflows you expect Claude to handle.

## Write A Good `CLAUDE.md`

Put durable rules there, not transient chat instructions:

- coding conventions
- testing expectations
- repo-specific terminology
- architectural constraints
- preferred tools and commands

If you repeat something often, it probably belongs in `CLAUDE.md` or a skill.

## Manage Permissions Deliberately

Set Claude up to move fast safely:

- keep broad access out of untrusted environments
- explicitly allow safe recurring commands
- avoid bypass-style setups unless the environment is isolated
- remember that permissions and hooks solve different problems

## Manage Context Aggressively

The official docs emphasize context management because quality degrades as the context window fills.

Useful habits:

- keep tasks scoped
- split research from implementation
- use subagents for bulky side investigations
- compact intentionally
- store persistent instructions in `CLAUDE.md`

## Course-Correct Early

Claude Code is conversational and interruptible. If it starts down the wrong path:

- stop it early
- clarify the real objective
- narrow the scope
- add better verification criteria

Small redirections early are cheaper than cleanup later.

## Automate And Scale Carefully

As usage grows:

- use non-interactive mode where appropriate
- run multiple sessions in parallel with worktrees
- fan out across files or hypotheses carefully
- use auto mode only in trusted infrastructure

Scale helps only if the environment, permissions, and verification path are already solid.

## Common Failure Patterns

Watch for these:

- vague prompts with no acceptance criteria
- giant sessions with bloated context
- permissions that are either too loose or too restrictive for the task
- no reliable test or verification loop
- asking Claude to blindly follow a procedure instead of delegating the goal

## Related Guides

- [How Claude Code Works](./how-claude-code-works.md)
- [Common Workflows](./common-workflows.md)
- [Permissions and Security](./permissions-and-security.md)
- [Settings System Guide](./settings-system-guide.md)

## Official Source

- [Best Practices for Claude Code](https://code.claude.com/docs/ko/best-practices)
