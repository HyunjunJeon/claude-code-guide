Title

Section-level coverage audit for official MCP documentation

Purpose

Measure section-by-section parity between the official Claude Code MCP documentation and the repository's MCP coverage.

Sources

- Official: `https://code.claude.com/docs/en/mcp`
- Repo: `05-mcp/README.md`

Status rules

- `covered`: clear and substantial coverage exists in the repo.
- `partial`: the concept exists but is less complete, less explicit, or less operationally detailed than the official docs.
- `missing`: no meaningful corresponding coverage found.

Summary

- Covered: 21
- Partial: 14
- Missing: 6

High-risk gaps

- OAuth advanced flows (`callback port`, `pre-configured credentials`)
- per-tool output override
- MCP Tool Search internals and author guidance
- channel/message-push integration from the MCP page

Matrix

| Official MCP section | Repo mapping | Status | Evidence note |
|---|---|---|---|
| What you can do with MCP | `05-mcp/README.md#overview`, `#practical-examples` | covered | Core value proposition and use cases are well represented. |
| Popular MCP servers | `05-mcp/README.md#available-mcp-servers-table` | covered | Dedicated server table exists. |
| Installing MCP servers | `05-mcp/README.md#mcp-installation-methods` | covered | Install flows are explicit. |
| Option 1: Add a remote HTTP server | `05-mcp/README.md#http-transport-recommended` | covered | Dedicated HTTP transport section exists. |
| Option 2: Add a remote SSE server | `05-mcp/README.md#sse-transport-deprecated` | covered | SSE is covered and marked deprecated. |
| Option 3: Add a local stdio server | `05-mcp/README.md#stdio-transport-local` | covered | Dedicated local stdio section exists. |
| Managing your servers | `05-mcp/README.md#mcp-configuration-management` | covered | Add/list/get/remove flows are documented. |
| Dynamic tool updates | `05-mcp/README.md#dynamic-tool-updates` | covered | Dedicated section exists. |
| Push messages with channels | `09-advanced-features/README.md#channels`, `10-cli/README.md` | partial | Channel capability exists elsewhere in repo, but MCP page linkage is weak. |
| Plugin-provided MCP servers | `05-mcp/README.md#plugin-provided-mcp-servers`, `07-plugins/README.md` | covered | Explicit section exists. |
| MCP installation scopes | `05-mcp/README.md#mcp-scopes` | covered | Dedicated scopes section exists. |
| Local scope | `05-mcp/README.md#mcp-scopes` | covered | Covered in scope section. |
| Project scope | `05-mcp/README.md#using-project-scope` | covered | Explicit project-scope guidance exists. |
| User scope | `05-mcp/README.md#mcp-scopes` | covered | Covered in scope discussion and commands. |
| Scope hierarchy and precedence | `05-mcp/README.md#mcp-scopes` | partial | Scope concept exists, but precedence behavior is less explicit than official doc. |
| Environment variable expansion in `.mcp.json` | `05-mcp/README.md#environment-variable-expansion-in-configuration` | covered | Dedicated section exists. |
| Practical examples | `05-mcp/README.md#practical-examples` | covered | Multiple practical examples exist. |
| Example: Monitor errors with Sentry | none specific | partial | Repo has examples, but no Sentry-specific monitoring example. |
| Example: Connect to GitHub for code reviews | `05-mcp/README.md#example-1-github-mcp-configuration` | covered | Strong GitHub example exists. |
| Example: Query your PostgreSQL database | `05-mcp/README.md#example-2-database-mcp-setup` | covered | Strong database example exists. |
| Authenticate with remote MCP servers | `05-mcp/README.md#oauth-20-authentication` | covered | OAuth auth is covered. |
| Use a fixed OAuth callback port | none found | missing | No dedicated callback-port guidance found. |
| Use pre-configured OAuth credentials | none found | missing | No dedicated pre-configured credentials flow found. |
| Override OAuth metadata discovery | `05-mcp/README.md#overriding-oauth-metadata-discovery` | covered | Dedicated subsection exists. |
| Use dynamic headers for custom authentication | `05-mcp/README.md#http-transport-recommended`, `#environment-variable-expansion-in-configuration` | partial | Auth headers are mentioned, but not as a dedicated guidance section. |
| Add MCP servers from JSON configuration | `05-mcp/README.md#mcp-configuration-management` | partial | Configuration management exists, but JSON-add flow is less explicit than official doc. |
| Import MCP servers from Claude Desktop | `05-mcp/README.md#mcp-configuration-management` | partial | Mentioned, but not deeply documented. |
| Use MCP servers from Claude.ai | `05-mcp/README.md#claudeai-mcp-connectors` | covered | Dedicated section exists. |
| Use Claude Code as an MCP server | `05-mcp/README.md#claude-as-mcp-server-claude-mcp-serve` | covered | Dedicated section exists. |
| MCP output limits and warnings | `05-mcp/README.md#mcp-output-limits` | covered | Dedicated section exists. |
| Override result size per tool | none found | missing | No per-tool override guidance found. |
| Respond to MCP elicitation requests | `05-mcp/README.md#mcp-elicitation` | partial | Elicitation is present, but not at full operational depth. |
| Use MCP resources | `05-mcp/README.md#mcp-resources-via-mentions` | covered | Resources are explicitly documented. |
| Reference MCP resources | `05-mcp/README.md#mcp-resources-via-mentions` | partial | Mention-based usage exists, but official "reference" framing is lighter. |
| Scale with MCP Tool Search | `05-mcp/README.md#mcp-tool-search` | covered | Dedicated section exists. |
| How it works | `05-mcp/README.md#mcp-tool-search`, `#requestresponse-pattern` | partial | Underlying behavior is somewhat explained, but not as explicitly as official docs. |
| For MCP server authors | none found | missing | No author-oriented guidance found. |
| Configure tool search | none found | missing | No dedicated configuration guidance for tool search found. |
| Use MCP prompts as commands | `05-mcp/README.md#mcp-prompts-as-slash-commands` | covered | Dedicated section exists. |
| Execute MCP prompts | `05-mcp/README.md#mcp-prompts-as-slash-commands` | covered | Execution examples exist. |
| Managed MCP configuration | `05-mcp/README.md#managed-mcp-configuration-enterprise` | covered | Dedicated enterprise section exists. |
| Exclusive control with managed-mcp.json | `05-mcp/README.md#managed-mcp-configuration-enterprise` | partial | Managed control is covered, but file-specific mode is less explicit. |
| Policy-based control with allowlists and denylists | `05-mcp/README.md#managed-mcp-configuration-enterprise` | partial | Policy controls exist, but official behavior breakdown is more detailed. |
| Restriction options | `05-mcp/README.md#managed-mcp-configuration-enterprise` | partial | Present at a high level only. |
| Example configuration | `05-mcp/README.md#managed-mcp-configuration-enterprise` | partial | Some examples exist, but less exhaustive than official doc. |
| How command-based restrictions work | none found | missing | No dedicated explanation found. |
| How URL-based restrictions work | none found | missing | No dedicated explanation found. |
| Allowlist behavior (`allowedMcpServers`) | `05-mcp/README.md#managed-mcp-configuration-enterprise` | partial | Concept appears, but not with official resolution detail. |
| Denylist behavior (`deniedMcpServers`) | `05-mcp/README.md#managed-mcp-configuration-enterprise` | partial | Concept appears, but not with official resolution detail. |

Interpretation

- The repo's MCP coverage is strong on the core user path.
- The parity gaps are mostly in advanced operations and governance details, not the basic feature itself.
- This means `MCP` should not be marked as simply "covered" or "not covered"; it is `core-covered, advanced-reference-partial`.

Recommended MCP backlog

Priority 1

- Add OAuth advanced-auth sections:
  - fixed callback port
  - pre-configured credentials
  - dynamic headers

Priority 2

- Expand `MCP Tool Search` into:
  - how it works
  - configuration
  - server-author guidance

Priority 3

- Expand managed MCP restrictions:
  - command-based restriction behavior
  - URL-based restriction behavior
  - allowlist/denylist resolution examples

Priority 4

- Add explicit linkage between MCP and channels/push-message workflows.
