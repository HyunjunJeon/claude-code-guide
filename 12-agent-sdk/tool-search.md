# Tool Search

Tool search helps the agent discover relevant tools when the available tool surface is too large to stuff directly into the model context.

## What It Does

Instead of presenting every possible tool up front, the host can provide a searchable index of tool metadata. Claude first searches that index, then loads or uses the tool it actually needs.

This keeps context smaller and tool selection more accurate.

## When To Use It

Tool search is useful when:

- your platform has many tools or connectors,
- tools are grouped by plugin, tenant, or app,
- only a small subset is relevant per task,
- you want discovery without permanently bloating the prompt.

## Design Guidance

- make tool descriptions concrete and action-oriented,
- include safety-relevant details in metadata,
- keep the search surface fresh as tools change,
- log which tools were surfaced and which were selected.

Tool search is especially valuable for connector-heavy systems, but it should not replace explicit permission checks.

## Common Pitfalls

- vague metadata that makes the wrong tool look relevant,
- letting search results imply permission to execute,
- forgetting that stale search indexes create misleading behavior.

## Related Links

- [MCP](./mcp.md)
- [Plugins](./plugins.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/tool-search
