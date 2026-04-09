Title

Deep coverage audit for official Plugins documentation family

Purpose

Audit parity across the official plugins documentation family:

- Discover and install plugins
- Create plugins
- Plugins reference

Sources

- Official:
  - `https://code.claude.com/docs/en/discover-plugins`
  - `https://code.claude.com/docs/en/plugins`
  - `https://code.claude.com/docs/en/plugins-reference`
- Repo: `07-plugins/README.md`

Status rules

- `covered`: clear and substantial coverage exists.
- `partial`: concept exists but is less complete or less explicit than the official docs.
- `missing`: no meaningful corresponding coverage found.

Summary

- Covered: 27
- Partial: 15
- Missing: 5

High-risk gaps

- plugin channels schema
- path traversal / caching / external-dependency details
- stronger separation between discover/install vs create vs reference

Matrix

| Official plugins family topic | Repo mapping | Status | Evidence note |
|---|---|---|---|
| How marketplaces work | `07-plugins/README.md#plugin-marketplace` | covered | Marketplace concept is well documented. |
| Official Anthropic marketplace | `07-plugins/README.md#plugin-marketplace` | covered | Official marketplace is explicitly covered. |
| Code intelligence | `07-plugins/README.md#lsp-server-configuration` | covered | LSP/code intelligence is a strong section. |
| What Claude gains from code intelligence plugins | `07-plugins/README.md#lsp-server-configuration`, `#available-lsp-plugins` | partial | Capability exists, but benefits are less explicitly framed. |
| External integrations | `07-plugins/README.md#practical-examples` | covered | Integration-style examples are present. |
| Development workflows | `07-plugins/README.md#practical-examples` | covered | Workflow-oriented plugin examples exist. |
| Output styles marketplace category | none found | missing | No dedicated plugin-output-style marketplace coverage found. |
| Add marketplaces | `07-plugins/README.md#plugin-marketplace`, `#marketplace-configuration` | covered | Add-marketplace flows are documented. |
| Add from GitHub | `07-plugins/README.md#distribution-methods` | covered | GitHub and marketplace install patterns are documented. |
| Add from other Git hosts | `07-plugins/README.md#distribution-methods` | partial | Git repository install exists, but non-GitHub host workflows are less explicit. |
| Add from local paths | `07-plugins/README.md#local-plugin-for-development`, `#installing-from-local-path` | covered | Local path workflow is explicit. |
| Add from remote URLs | none explicit | missing | No direct remote `marketplace.json` URL flow found. |
| Install plugins | `07-plugins/README.md#installation-methods` | covered | Dedicated installation section exists. |
| Manage installed plugins | `07-plugins/README.md#enable-disable-with-auto-detected-scope`, `#uninstalling-a-plugin`, `#updating-a-plugin` | covered | Manage/install lifecycle is documented. |
| Apply plugin changes without restarting | `07-plugins/README.md#hot-reload` | covered | `/reload-plugins` is documented. |
| Manage marketplaces | `07-plugins/README.md#plugin-marketplace`, `#plugin-cli-commands` | partial | Marketplace management exists, but not as comprehensively as official discover doc. |
| Configure auto-updates | none explicit | missing | No dedicated plugin auto-update coverage found. |
| Configure team marketplaces | `07-plugins/README.md#marketplace-configuration`, `#managed-settings-for-plugins` | partial | Team distribution exists, but not framed around marketplace rollout. |
| Security | `07-plugins/README.md#plugin-security` | covered | Dedicated section exists. |
| Troubleshooting | `07-plugins/README.md#troubleshooting` | covered | Dedicated troubleshooting section exists. |
| Create plugins: when to use plugins vs standalone | `07-plugins/README.md#standalone-vs-plugin-approach` | covered | Explicit comparison exists. |
| Create plugins: quickstart | `07-plugins/README.md#practical-examples`, `#installation-instructions` | partial | Strong examples exist, but not a dedicated first-plugin quickstart flow. |
| Create plugins: prerequisites | `07-plugins/README.md#installation-instructions`, examples | partial | Implied, not formalized. |
| Create plugins: create your first plugin | `07-plugins/README.md#plugin-structure-example`, `#example-1-pr-review-plugin` | covered | First-plugin path is well represented. |
| Plugin structure overview | `07-plugins/README.md#plugin-structure-example` | covered | Dedicated structure section exists. |
| Develop more complex plugins | `07-plugins/README.md#practical-examples` | covered | Multi-component plugin examples exist. |
| Add skills to your plugin | `07-plugins/README.md#plugin-structure-example`, examples | covered | Skills are part of plugin examples. |
| Add LSP servers to your plugin | `07-plugins/README.md#lsp-server-configuration` | covered | Strong LSP section exists. |
| Ship default settings with your plugin | `07-plugins/README.md#plugin-settings`, `#managed-settings-for-plugins` | covered | Settings behavior is documented. |
| Organize complex plugins | `07-plugins/README.md#plugin-structure-example`, examples | covered | Multi-directory structure exists. |
| Test your plugins locally | `07-plugins/README.md#testing-a-plugin`, `#local-plugin-for-development` | covered | Explicit local testing exists. |
| Debug plugin issues | `07-plugins/README.md#troubleshooting`, `#hot-reload` | covered | Debug flows exist. |
| Share your plugins | `07-plugins/README.md#publishing-a-plugin` | covered | Sharing/publishing exists. |
| Submit your plugin to the official marketplace | `07-plugins/README.md#publishing-a-plugin` | covered | Official submission path is covered. |
| Convert existing configurations to plugins | `07-plugins/README.md#plugin-vs-manual-configuration` | partial | Comparison exists, but migration guidance is less explicit than official. |
| Plugins reference: plugin components reference | `07-plugins/README.md#plugin-features-comparison`, practical examples | partial | Component types are present, but not as a unified technical reference section. |
| Plugins reference: skills | `07-plugins/README.md` examples | covered | Skills are clearly represented. |
| Plugins reference: agents | `07-plugins/README.md` examples | covered | Agents are represented. |
| Plugins reference: hooks | `07-plugins/README.md` examples | covered | Hooks are represented. |
| Plugins reference: MCP servers | `07-plugins/README.md` examples | covered | MCP components are represented. |
| Plugins reference: LSP servers | `07-plugins/README.md#lsp-server-configuration` | covered | Strong coverage exists. |
| Plugin installation scopes | `07-plugins/README.md#installation-methods` | covered | Scope-aware installation exists. |
| Plugin manifest schema | `07-plugins/README.md#plugin-definition-structure` | covered | Manifest structure is documented. |
| Metadata fields | `07-plugins/README.md#plugin-definition-structure` | covered | Metadata is shown in plugin.json examples. |
| Component path fields | `07-plugins/README.md#plugin-definition-structure` | partial | Core paths exist, but not at full reference completeness. |
| User configuration (`userConfig`) | `07-plugins/README.md#plugin-options-v2183` | covered | User-configurable options are explicitly documented. |
| Channels schema | none found | missing | No dedicated plugin channels schema coverage found. |
| Path behavior rules | none explicit | missing | No dedicated path-resolution rules section found. |
| Environment variables (`CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`) | `07-plugins/README.md#persistent-plugin-data-claude_plugin_data` | partial | `CLAUDE_PLUGIN_DATA` is covered well; `CLAUDE_PLUGIN_ROOT` is mostly implicit. |
| Persistent data directory | `07-plugins/README.md#persistent-plugin-data-claude_plugin_data` | covered | Explicit section exists. |
| Plugin caching and file resolution | `07-plugins/README.md#hot-reload`, troubleshooting | partial | Some behavior is implied, but not as a dedicated reference section. |
| Path traversal limitations | none found | missing | No dedicated limitations section found. |
| Working with external dependencies | LSP install notes, examples | partial | Exists indirectly, not as dedicated guidance. |
| Plugin directory structure | `07-plugins/README.md#plugin-structure-example` | covered | Strong coverage exists. |
| File locations reference | `07-plugins/README.md#plugin-structure-example` | partial | Structure exists, but not as exhaustive reference. |
| CLI commands reference | `07-plugins/README.md#plugin-cli-commands` | covered | Dedicated CLI section exists. |
| Debugging and development tools | `07-plugins/README.md#testing-a-plugin`, `#hot-reload`, `#troubleshooting` | covered | Good developer tooling coverage exists. |

Interpretation

- The plugin module is strong on practical usage and decent on creation.
- The main parity deficit is in the ultra-technical reference layer, especially plugin channels, path rules, and lifecycle/caching details.

Recommended plugins backlog

Priority 1

- Add `plugin channels` coverage.
- Add `path behavior rules` coverage.
- Add `CLAUDE_PLUGIN_ROOT` and caching/file-resolution behavior explicitly.

Priority 2

- Add explicit auto-update behavior and remote marketplace URL installation flows.
- Separate the README more clearly into `discover`, `create`, and `reference` strata.
