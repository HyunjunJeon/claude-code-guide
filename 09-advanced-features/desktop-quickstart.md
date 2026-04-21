# Desktop Quickstart

This page is the shortest path to getting productive with Claude Code Desktop.

## What Desktop Is For

Desktop is the local graphical workspace for Claude Code. Use it when you want:

- local file access,
- visual diff review,
- live preview,
- multiple sessions in one UI,
- local scheduled tasks.

The web surface is better for cloud-first branch work. The terminal is better when you want maximum control and minimum UI.

## Install

Download the Desktop app from `claude.ai` for:

- macOS
- Windows

After install, sign in with the same Anthropic account you use for Claude Code.

## Start Your First Coding Session

1. Open a local project folder
2. Go to the `Code` tab
3. Choose a permission mode
4. Write a concrete prompt

Recommended starting mode:

- `Ask permissions` for unfamiliar repos

Faster follow-up modes:

- `Auto accept edits` when file changes are frequent
- `Plan` when you want an approach before edits

## Add Context

Desktop supports:

- `@mentions` for local files
- file attachments for assets such as images or PDFs

This is one of the biggest differences from cloud sessions, where local file mention is unavailable.

## Review Changes

Use Desktop's visual diff view when:

- code spans several files,
- inline comments help the review loop,
- UI changes are easier to verify visually than in raw patches.

## Use Live Preview

For app or frontend work, connect your local dev server so Desktop can show the running app while Claude edits code.

Typical workflow:

1. start or configure the dev server
2. let Claude make a change
3. verify visually in preview
4. iterate

## Watch PRs And CI

Desktop can keep PR and CI feedback close to the coding session. This is useful when you want Claude to move between implementation, review, and CI fixes without leaving the app.

## Use The Schedule Tab

Desktop also exposes:

- local scheduled tasks on your machine
- remote routines in the cloud

That distinction matters:

- local tasks use your local repo and tools
- remote routines use cloud sessions and fresh clones

## When To Switch Surfaces

- use Desktop for local visual work
- use the terminal for low-friction direct control
- use the web for long-running cloud tasks

## Related Guides

- [Desktop](./desktop.md)
- [Desktop Scheduled Tasks](./desktop-scheduled-tasks.md)
- [Claude Code On The Web](./claude-code-on-the-web.md)

## Official Source

- [Get started with the desktop app](https://code.claude.com/docs/ko/desktop-quickstart)
