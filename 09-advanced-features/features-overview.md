# Features Overview

This page covers the extension layer around Claude Code: the features you add when built-in tools are not enough.

## The Core Idea

Claude Code starts with a model plus built-in tools. Extensions plug into different parts of that loop:

- `CLAUDE.md` adds persistent context
- skills add reusable knowledge and workflows
- MCP connects Claude to external services
- subagents run isolated work and return summaries
- agent teams coordinate multiple sessions
- hooks run deterministic scripts around events
- plugins package and distribute combinations of these features

## Match The Feature To The Goal

Use the smallest feature that solves the problem:

| Feature | Best for |
|---|---|
| `CLAUDE.md` | project conventions, always-on instructions |
| Skills | reusable prompts, reference docs, repeatable workflows |
| Subagents | isolation, parallel research, specialized workers |
| Agent teams | multi-session coordination |
| MCP | external systems, APIs, browsers, databases |
| Hooks | deterministic automation on lifecycle events |
| Plugins | packaging and sharing a setup across repos or teams |

## Build Your Setup Over Time

The official docs recommend evolving gradually instead of enabling everything up front.

Common triggers:

- Claude gets a project convention wrong twice: add it to `CLAUDE.md`
- you keep typing the same starter prompt: turn it into a skill
- Claude needs data from a system it cannot see: add MCP
- a side task bloats the main conversation: use a subagent
- you want something to happen every time: add a hook
- another repo needs the same setup: package it as a plugin

## Similar Features That People Confuse

### `CLAUDE.md` vs skills

- `CLAUDE.md` is always-on context
- skills are reusable capabilities that load when needed

### Skills vs slash commands

- skills package instructions and assets
- slash commands are named entrypoints that often invoke a skill-like workflow

### MCP vs hooks

- MCP gives Claude new tools and data sources
- hooks run deterministic scripts outside the model loop

### Subagents vs agent teams

- subagents are delegated bounded tasks inside a workflow
- agent teams coordinate multiple independent sessions at a higher level

### Plugins vs everything else

- plugins are the packaging layer
- they bundle skills, hooks, subagents, or MCP servers into an installable unit

## Context Cost Matters

Not every feature has the same context cost.

- `CLAUDE.md` is persistent
- skills are usually cheaper because they can load on demand
- subagents help because their detailed work stays out of the parent context
- MCP tool definitions are often deferred until needed

When in doubt, prefer the feature that keeps the main session smaller.

## Recommended Adoption Order

For most teams, a practical order is:

1. `CLAUDE.md`
2. skills
3. subagents
4. MCP
5. hooks
6. plugins

That sequence matches the official guidance and usually keeps complexity under control.

## Related Guides

- [How Claude Code Works](./how-claude-code-works.md)
- [Settings System Guide](./settings-system-guide.md)
- [Channels Reference](./channels-reference.md)
- [Subagents](../04-subagents/README.md)
- [Skills](../03-skills/README.md)
- [Plugins](../07-plugins/README.md)

## Official Source

- [Extend Claude Code](https://code.claude.com/docs/ko/features-overview)
