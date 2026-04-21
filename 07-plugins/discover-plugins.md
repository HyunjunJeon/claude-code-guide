# Discover Plugins

This page focuses on finding, evaluating, and safely installing Claude Code plugins.

## What Plugin Discovery Means

A plugin is a packaged extension bundle. Discovery is the process of answering three questions before install:

1. what does this plugin add?
2. how much authority does it gain?
3. is it the right boundary for this workflow?

Installing a plugin is not just adding a command. A plugin can add skills, agents, hooks, MCP servers, monitors, executables, and settings.

## Where Plugins Come From

Common sources:

- official marketplace entries
- community plugins
- organization-internal plugins
- local development plugins

The safer the source, the lower the review burden, but even official or internal plugins still deserve scope review.

## What To Inspect Before Installing

Check:

- manifest metadata and version
- commands and skills it exposes
- agents it enables
- MCP servers and external integrations
- hooks and monitors
- settings it applies
- any `bin/` executables placed on the Bash tool path

If the plugin affects execution, not just prompting, treat it as code you are allowing into your Claude Code runtime.

## Selection Criteria

Choose a plugin when you need a reusable package that should travel across repos or teams.

Prefer a smaller feature instead when:

- a single skill is enough,
- a single hook is enough,
- the capability is specific to one repo and does not need packaging.

## Discovery Tips

- start with the workflow you want, not the plugin name
- prefer plugins with clear scope and explicit install docs
- avoid plugins that bundle unrelated capabilities
- review security-sensitive plugins more carefully than convenience-only plugins

## Practical Safety Checklist

- know whether it adds shell execution paths
- know whether it adds outbound network paths
- know whether it changes permissions or settings defaults
- know how to disable or remove it cleanly

## Related Guides

- [Plugins Guide](./README.md)
- [Skills](../03-skills/README.md)
- [MCP](../05-mcp/README.md)

## Official Source

- [Discover plugins](https://code.claude.com/docs/ko/discover-plugins)
