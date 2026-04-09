Title

Section-level coverage audit for official Sub-agents documentation

Purpose

Measure section-by-section parity between the official subagents guide and the repository's subagent coverage.

Sources

- Official: `https://code.claude.com/docs/en/sub-agents`
- Repo: `04-subagents/README.md`

Status rules

- `covered`: clear and substantial coverage exists.
- `partial`: concept exists but is less complete or less aligned than the official section.
- `missing`: no meaningful corresponding coverage found.

Summary

- Covered: 24
- Partial: 10
- Missing: 2

High-risk gaps

- project-level hooks for subagent events
- official-pattern coverage is good, but some "when to choose X" guidance is still more fragmented than the official page

Matrix

| Official subagents section | Repo mapping | Status | Evidence note |
|---|---|---|---|
| Built-in subagents | `04-subagents/README.md#built-in-subagents` | covered | Dedicated section exists. |
| Quickstart: create your first subagent | `04-subagents/README.md#managing-subagents`, `#installation-instructions` | covered | Practical creation/install flows exist. |
| Configure subagents | `04-subagents/README.md#configuration` | covered | Dedicated configuration section exists. |
| Use the `/agents` command | `04-subagents/README.md#using-the-agents-command-recommended` | covered | Explicit coverage exists. |
| Choose the subagent scope | `04-subagents/README.md#file-locations` | covered | User/project/global-like scopes are documented. |
| Write subagent files | `04-subagents/README.md#file-format`, `#direct-file-management` | covered | Format and file management are documented. |
| Supported frontmatter fields | `04-subagents/README.md#configuration-fields` | covered | Dedicated fields table exists. |
| Choose a model | `04-subagents/README.md#configuration-fields`, built-in subagent table | covered | Model selection is documented. |
| Control subagent capabilities | `04-subagents/README.md#tool-configuration-options` | covered | Capability control is explicit. |
| Available tools | `04-subagents/README.md#tool-configuration-options` | covered | Tool strategy is documented. |
| Restrict which subagents can be spawned | `04-subagents/README.md#restrict-spawnable-subagents` | covered | Dedicated section exists. |
| Scope MCP servers to a subagent | `05-mcp/README.md#subagent-scoped-mcp` | covered | Covered cross-module even if not local to subagents README. |
| Permission modes | `04-subagents/README.md#configuration-fields` | covered | `permissionMode` is documented. |
| Preload skills into subagents | `04-subagents/README.md#configuration-fields` | covered | `skills` preload support is documented. |
| Enable persistent memory | `04-subagents/README.md#persistent-memory-for-subagents` | covered | Dedicated section exists. |
| Conditional rules with hooks | `04-subagents/README.md#configuration-fields`, `06-hooks/README.md#hooks-in-subagent-frontmatter` | partial | Hooks are covered, but not with the same explicit conditional-rules framing. |
| Disable specific subagents | `04-subagents/README.md#restrict-spawnable-subagents` | covered | Restriction guidance exists. |
| Define hooks for subagents | `04-subagents/README.md#configuration-fields`, `06-hooks/README.md` | covered | Supported via frontmatter and hooks docs. |
| Hooks in subagent frontmatter | `06-hooks/README.md#hooks-in-subagent-frontmatter` | covered | Dedicated section exists, though in hooks doc. |
| Project-level hooks for subagent events | `06-hooks/README.md#subagentstart`, `#stop-and-subagentstop` | partial | Event hooks exist, but not as a clearly connected subagents workflow section. |
| Work with subagents | `04-subagents/README.md#using-subagents` | covered | Dedicated section exists. |
| Understand automatic delegation | `04-subagents/README.md#automatic-delegation` | covered | Dedicated section exists. |
| Invoke subagents explicitly | `04-subagents/README.md#explicit-invocation`, `#-mention-invocation` | covered | Explicit invocation is documented. |
| Run subagents in foreground or background | `04-subagents/README.md#background-subagents` | covered | Background behavior is documented. |
| Common patterns | `04-subagents/README.md#when-to-use-subagents`, `#best-practices` | partial | Guidance exists, but not grouped as an official-style patterns section. |
| Isolate high-volume operations | `04-subagents/README.md#context-management`, `#background-subagents` | partial | Concept exists, but not as a named official section. |
| Run parallel research | `04-subagents/README.md#background-subagents`, `#agent-teams-experimental` | partial | Parallelism exists, but framing differs. |
| Chain subagents | `04-subagents/README.md#chaining-subagents` | covered | Dedicated section exists. |
| Choose between subagents and main conversation | `04-subagents/README.md#when-to-use-subagents` | covered | Explicit decision guidance exists. |
| Manage subagent context | `04-subagents/README.md#context-management` | covered | Dedicated section exists. |
| Resume subagents | `04-subagents/README.md#resumable-agents` | covered | Dedicated section exists. |
| Auto-compaction | `04-subagents/README.md#context-management` | covered | Explicit mention exists. |
| Example subagents | `04-subagents/README.md#example-subagents-in-this-folder` | covered | Large example section exists. |
| Code reviewer | `04-subagents/README.md#1-code-reviewer-code-reviewermd` | covered | Present. |
| Debugger | `04-subagents/README.md#6-debugger-debuggermd` | covered | Present. |
| Data scientist | `04-subagents/README.md#7-data-scientist-data-scientistmd` | covered | Present. |
| Database query validator | none found | missing | No equivalent example found. |
| Next steps | `04-subagents/README.md#related-concepts`, `#additional-resources` | covered | Equivalent closing guidance exists. |

Interpretation

- The subagents module is one of the strongest parity areas in the repo.
- The remaining gaps are mostly connective or example-selection gaps, not structural feature gaps.

Recommended subagents backlog

- Add a short section that explicitly links `SubagentStart`/`SubagentStop` project hooks from the subagents guide.
- Add an official-style "common patterns" section that names the patterns already present.
- Consider adding a database-query-validator example to mirror the official example spread.
