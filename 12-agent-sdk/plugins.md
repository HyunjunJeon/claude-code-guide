# Plugins

Plugins are the distribution and packaging layer for reusable Claude Code extensions.

## What A Plugin Can Bundle

Depending on the system, a plugin can package combinations of:

- skills,
- slash commands,
- MCP servers or connectors,
- supporting instructions or metadata.

That makes plugins the right boundary when you want to install, version, enable, disable, or share an extension across teams.

## When To Use Them

Use plugins when the capability should be portable and managed as a unit. If a feature is specific to one app and never leaves that codebase, direct host integration may be simpler.

## Design Guidance

- keep plugin scope coherent,
- avoid mixing unrelated capabilities in one package,
- document install, config, and safety expectations,
- treat version changes as behavioral changes, not just packaging changes.

## Common Pitfalls

- using a plugin for one tiny feature that does not need packaging,
- shipping broad tool access without clear permission guidance,
- leaving plugin metadata too vague for discovery tools.

## Related Links

- [Skills](./skills.md)
- [Tool Search](./tool-search.md)
- [Plugins module](../07-plugins/README.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/plugins
