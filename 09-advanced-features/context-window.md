# Explore The Context Window

Claude Code's context window is the live bundle of everything Claude currently knows about your session. It is the most important resource to manage because quality degrades as it fills.

## What Enters Context

At different points in a session, the context window can include:

- system prompt and output style
- `CLAUDE.md`
- auto memory
- MCP tool names
- skill descriptions and invoked skill bodies
- conversation history
- file contents Claude has read
- command outputs
- subagent summaries returned to the parent session

Some of this loads before you type anything. Other parts appear only when Claude reads a file, invokes a skill, or runs a tool.

## Why It Matters

As the context window fills:

- earlier instructions become easier to lose
- irrelevant output starts to compete with useful context
- Claude may make more mistakes or forget constraints

The official docs frame context as the primary resource to manage.

## What Compaction Does

When a session gets too full, Claude Code compacts automatically. It first clears older tool output and then summarizes the conversation when needed.

You can also trigger it manually:

```text
/compact
/compact keep the API migration details and the failing test command
```

Use `/clear` when you want a fresh conversation instead of a summary.

## What Survives Compaction

The official context guide distinguishes between content that is re-injected and content that is lost until triggered again.

Usually preserved or re-injected:

- system prompt and output style
- project-root `CLAUDE.md` and unscoped rules
- auto memory
- invoked skill bodies, within token caps

Usually lost until re-triggered:

- path-scoped rules with `paths:` frontmatter
- nested `CLAUDE.md` files in subdirectories

Hooks do not "stay in context" because they run as code, not as message history.

## Why Subagents Help

Subagents work in their own separate context window. Large investigations stay inside that worker's session, and only the summary comes back to the parent. That makes subagents one of the best tools for controlling context growth.

## Practical Ways To Control Context

- keep tasks scoped and finish one thing at a time
- use `/clear` between unrelated tasks
- use `/compact` when a long session starts drifting
- move durable rules into `CLAUDE.md`
- keep important instructions near the top of large skills
- use subagents for bulky research
- avoid pasting huge logs when Claude can read the file directly

## Inspect Your Actual Usage

These commands are the most useful live diagnostics:

- `/context` for category breakdown and optimization hints
- `/memory` to see which memory files loaded at startup

If Claude starts missing obvious constraints, inspect `/context` before assuming the model is failing randomly.

## Related Guides

- [How Claude Code Works](./how-claude-code-works.md)
- [Best Practices](./best-practices.md)
- [Common Workflows](./common-workflows.md)
- [Subagents](../04-subagents/README.md)

## Official Source

- [Explore the context window](https://code.claude.com/docs/ko/context-window)
