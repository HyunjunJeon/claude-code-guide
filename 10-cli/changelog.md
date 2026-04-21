# Changelog

This page is a practical reading guide for the official Claude Code changelog. It is not a mirror of the full upstream release history.

## What The Official Changelog Is

Anthropic publishes version-by-version release notes at the official changelog page. The page is generated from the upstream `CHANGELOG.md` on GitHub, and the CLI exposes the same information through `/release-notes`.

The official docs recommend two quick checks:

- `claude --version` to see what you have installed
- `/release-notes` to inspect changes from inside Claude Code

## How To Use It Efficiently

Read the changelog in three passes:

1. confirm your installed version
2. scan the most recent entries above your version
3. look specifically for changes in the features you rely on most

Good filters:

- session loading and `/resume`
- plugins and MCP startup
- permission and sandbox fixes
- UI or terminal rendering fixes
- web, remote, or review workflows

## Latest Notable Entries

As of the current official changelog page, the newest published entries are:

### `2.1.116` — April 20, 2026

High-signal changes:

- large-session `/resume` is much faster
- MCP startup is faster when multiple stdio servers are configured
- fullscreen scrolling improved in VS Code-family terminals
- plugin reload and auto-update can install missing marketplace dependencies
- multiple security and terminal-behavior fixes landed

This release matters if your workflow depends on long sessions, plugin-heavy setups, or IDE-integrated terminals.

### `2.1.114` — April 18, 2026

- fixed a permission-dialog crash involving agent teams teammates

This is small but important if you actively use multi-agent workflows.

### `2.1.113` — April 17, 2026

Highlights:

- the CLI now spawns a native Claude Code binary instead of bundled JavaScript
- added `sandbox.network.deniedDomains`
- improved `/ultrareview`
- improved `/loop` wakeup behavior
- several security fixes for Bash allow/deny rule handling

This is the entry to read closely if you care about sandbox policy, review workflows, or shell safety.

## When To Read The Weekly Digest Instead

The changelog is for precise release-by-release changes. If you want the most important workflow shifts instead of every fix, read [WHATS-NEW.md](/Users/jhj/Desktop/personal/claude-code-guide-book/WHATS-NEW.md) or the official weekly digest page.

Use:

- changelog for exact version deltas
- weekly digest for notable product changes and demos

## Operational Advice

- check the changelog before troubleshooting something that changed "recently"
- pin the installed version in incident notes or bug reports
- compare your symptoms against the latest fixes before assuming a repo-specific regression
- pay special attention to security fixes when your workflow uses broad Bash rules, plugins, or sandboxes

## Related Guides

- [Quickstart](./quickstart.md)
- [Troubleshooting](./troubleshooting.md)
- [Error Reference](./errors.md)
- [What's New](../WHATS-NEW.md)

## Official Source

- [Claude Code changelog](https://code.claude.com/docs/ko/changelog)
