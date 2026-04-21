# MCP

MCP, the Model Context Protocol, is the main way to extend an agent with external tools, resources, and prompts without hardwiring every integration into the host app.

## What It Adds

An MCP server can expose:

- tools the agent can call,
- resources the agent can read,
- prompts or templates the host can surface.

This makes MCP the standard bridge for internal APIs, developer tools, external systems, and app connectors.

## Why It Matters In The SDK

In the Agent SDK, MCP is how you move from "Claude can use built-in tools" to "Claude can interact with my real platform." It also gives you a cleaner extension boundary than packing every capability into one monolithic host service.

## Design Guidance

- expose only the servers and tools a workflow actually needs,
- keep authentication outside the model when possible,
- validate server output before treating it as trusted,
- document tool names and failure modes for operators.

For simple in-process extensions, the SDK can also wrap custom tools as an MCP server so the agent sees one consistent interface.

## Common Pitfalls

- connecting a large server and forgetting to narrow `allowedTools`,
- assuming MCP authentication is the same as end-user authentication,
- treating resources as if they were safe just because they came from an internal server.

## Related Links

- [Custom Tools](./custom-tools.md)
- [Tool Search](./tool-search.md)
- [Permissions](./permissions.md)
- [MCP module](../05-mcp/README.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/mcp
