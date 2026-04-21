# Custom Tools

Custom tools extend the Agent SDK with project-specific actions, usually by exposing an in-process MCP server that Claude can call like any other tool.

## What It Is

The SDK lets you define tools with a schema and a handler, then register them as an MCP server. Claude sees those tools alongside the built-ins, but only if you explicitly expose and allow them.

## When To Use It

Use custom tools when built-in file, shell, or web tools are not enough. Common cases include internal APIs, database lookups, browser automation, calculators, or service-specific workflows.

## Mental Model

Think in three layers:

1. Define the tool contract and handler.
2. Register the tool set as an MCP server.
3. Allow only the tool names you want Claude to call.

That keeps the agent extensible without giving it broad, implicit access.

## Key APIs And Patterns

- `createSdkMcpServer(...)` builds an in-process MCP server.
- `tool(...)` defines a typed tool with a name, description, schema, and handler.
- `mcpServers` passes the server into `query(...)`.
- `allowedTools` should whitelist the specific `mcp__{server_name}__{tool_name}` values you want.
- MCP tools require streaming input mode, so use an async generator/iterable for `prompt` instead of a plain string.
- `maxTurns` is useful when a custom tool may trigger several agent/tool cycles.

Example naming pattern:

- `get_weather` on `my-custom-tools` becomes `mcp__my-custom-tools__get_weather`

## Common Pitfalls

- Passing a plain string prompt when the MCP server requires streaming input.
- Allowing the whole server when you only needed one tool.
- Skipping validation on tool inputs and outputs.
- Assuming errors inside the tool will be self-healing; return meaningful error text.

## Related Links

- [Permissions](./permissions.md)
- [Agent loop](./agent-loop.md)
- Official custom tools guide: https://platform.claude.com/docs/en/agent-sdk/custom-tools
- Official MCP guide: https://platform.claude.com/docs/en/agent-sdk/mcp
- TypeScript SDK reference: https://code.claude.com/docs/ko/agent-sdk/typescript
- Python SDK reference: https://code.claude.com/docs/ko/agent-sdk/python
