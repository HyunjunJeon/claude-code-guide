# Interactive Mode

Interactive mode is the full-screen terminal experience you get when you run `claude` without `-p`.

## What It Covers

The official interactive-mode reference includes:

- keyboard shortcuts
- multiline input
- command search
- transcript viewing
- background bash tasks
- prompt suggestions
- task list behavior
- PR review status in the footer
- vim-style editing

This page is the practical summary of those behaviors.

## Core Input Patterns

At the prompt:

- `/` opens commands and skills
- `!` starts Bash mode
- `@` triggers file-path autocomplete

These three entrypoints define most day-to-day interaction.

## Multiline Input

The official docs list several ways to create multiline prompts:

- `\` + `Enter`
- `Option+Enter` on macOS
- `Shift+Enter` in terminals that support it directly
- `Ctrl+J`
- paste directly for logs or code blocks

If your terminal does not support `Shift+Enter` out of the box, run `/terminal-setup`.

## Keyboard Features

Notable interaction features include:

- command search in history
- transcript viewer
- task list toggle
- backgrounding Bash jobs
- vim editor mode via `/config`

The exact shortcut list is long, so the most important habit is to treat the session as an interactive workspace rather than a plain REPL.

## Background Bash Tasks

Claude Code can run Bash commands in the background so you can keep chatting while they execute.

Two practical ways:

- ask Claude to run a command in the background
- press `Ctrl+B` to move a Bash tool invocation to the background

Background jobs write output to files that Claude can read later.

## Prompt Suggestions

The prompt input can show grayed-out follow-up suggestions based on:

- recent git history
- conversation flow
- likely next steps

Use them when they save time, but disable them if they distract from focused work.

## Task List

For multi-step work, Claude can maintain a task list that persists across compaction.

Important behaviors:

- `Ctrl+T` toggles the list view
- the terminal shows pending, in-progress, and complete tasks
- named task lists can be shared across sessions via `CLAUDE_CODE_TASK_LIST_ID`

## PR Status In The Footer

When you are on a branch with an open PR and `gh` is installed and authenticated, Claude Code can show PR state directly in the footer.

The official docs describe color-coded review states such as:

- approved
- pending review
- changes requested
- draft
- merged

## When Interactive Mode Is Best

Use interactive mode when:

- the task may need several turns,
- you want Claude to explore before editing,
- approvals or task tracking matter,
- you are steering the workflow live.

Use `-p` non-interactive mode for one-shot automation instead.

## Related Guides

- [CLI Reference](./README.md)
- [Quickstart](./quickstart.md)
- [Terminal Configuration](../09-advanced-features/terminal-configuration.md)

## Official Source

- [Interactive mode](https://code.claude.com/docs/ko/interactive-mode)
