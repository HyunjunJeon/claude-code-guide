# How Claude Code Works

Claude Code is an agentic coding environment. It does not just answer with text. It reads files, runs commands, edits code, checks results, and loops until the task is complete or you redirect it.

## The Agentic Loop

Most tasks move through three repeating phases:

1. Gather context
2. Take action
3. Verify results

These phases blur together in practice. A bug fix might read logs, inspect code, edit files, rerun tests, and then loop back if the first fix is incomplete.

## Models And Tools

Claude Code combines:

- a Claude model that reasons about the task
- built-in tools that can act on the environment

The official docs describe five broad built-in tool categories:

- file operations
- search
- execution
- web
- code intelligence

The model decides which tool to use next based on what it just learned.

## What Claude Can Access

When you run `claude` in a project, Claude Code can work with:

- files in the current directory tree
- your terminal commands and local developer tools
- current Git state
- project instructions in `CLAUDE.md`
- auto memory and configured extensions such as skills, MCP, and subagents

This is why Claude Code can coordinate changes across multiple files instead of only assisting inside the current editor tab.

## Environments And Interfaces

The core loop stays the same, but the execution environment can change:

- local: runs on your machine
- cloud: runs on Anthropic-managed VMs
- remote control: runs locally but is controlled from the web UI

The user-facing interface can also vary:

- terminal
- desktop app
- IDE integrations
- claude.ai/code
- Slack
- CI/CD environments

The interface changes how you interact. It does not change the underlying agentic loop.

## Sessions, Branches, And Continuity

Claude Code stores session history locally so you can:

- continue a previous conversation
- resume a specific session
- fork a session and try a different path

Important distinction:

- sessions preserve conversation history
- checkpoints preserve file state

If two terminals resume the same session ID, the transcript can become interleaved. For parallel work from the same starting point, forking is cleaner.

## Context Window

The context window includes:

- conversation history
- file contents Claude has read
- command outputs
- `CLAUDE.md`
- auto memory
- loaded skills
- system instructions

As context fills, Claude Code compacts automatically. Older tool output goes first, then the conversation can be summarized. Persistent rules belong in `CLAUDE.md`, not only in chat history.

Two practical context controls matter a lot:

- skills load on demand
- subagents get a fresh isolated context and return summaries

That is why subagents are useful for long investigations.

## Safety Model

Claude Code uses two main safeguards:

- checkpoints for undoing file edits
- permissions for controlling what Claude may do without asking

Checkpoints are local to the session and only cover file edits. External side effects such as API calls or deployments are not rollback-safe in the same way.

## Working Effectively

The official guidance boils down to a few patterns:

- ask Claude for help configuring Claude Code itself
- treat the interaction as an iterative conversation
- interrupt and steer early if the path is wrong
- be specific about files, constraints, and expected behavior
- give Claude something concrete to verify
- explore before implementing on complex tasks
- delegate outcomes, not step-by-step micromanagement

## Related Guides

- [Best Practices](./best-practices.md)
- [Common Workflows](./common-workflows.md)
- [Session and Interaction](./session-and-interaction.md)
- [Permissions and Security](./permissions-and-security.md)

## Official Source

- [How Claude Code works](https://code.claude.com/docs/ko/how-claude-code-works)
