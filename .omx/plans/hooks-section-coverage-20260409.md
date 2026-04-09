Title

Section-level coverage audit for official Hooks reference

Purpose

Refine the coarse page-level matrix for `Hooks reference` into official-section parity so detailed gaps are visible.

Sources

- Official: `https://code.claude.com/docs/en/hooks`
- Repo: `06-hooks/README.md`

Status rules

- `covered`: the official section has clear and substantial coverage in `06-hooks/README.md`.
- `partial`: the concept exists but is compressed, merged into another section, or lacks official-level detail.
- `missing`: no meaningful corresponding coverage found.

Summary

- Covered: 20
- Partial: 17
- Missing: 8

High-risk gaps

- `/hooks` menu
- disable/remove hooks
- event-specific decision-control nuances
- async/background hooks execution model
- several newer event-specific sections are only listed, not explained

Matrix

| Official hooks section | Repo mapping | Status | Evidence note |
|---|---|---|---|
| Hook lifecycle | `06-hooks/README.md#hook-events` | partial | Event table exists, but no dedicated lifecycle walkthrough or diagram equivalent. |
| How a hook resolves | `06-hooks/README.md#configuration` | partial | Basic structure exists, but not the official step-by-step matcher -> if -> handler resolution flow. |
| Configuration | `06-hooks/README.md#configuration` | covered | Strong top-level config coverage exists. |
| Hook locations | `06-hooks/README.md#configuration` | covered | User/project/local/plugin/skill-agent scopes are listed. |
| Matcher patterns | `06-hooks/README.md#matcher-patterns` | covered | Dedicated matcher section exists. |
| Match MCP tools | `06-hooks/README.md#mcp-tool-hooks`, `06-hooks/README.md#matcher-patterns` | covered | MCP tool matching is explicitly covered. |
| Hook handler fields | `06-hooks/README.md#basic-configuration-structure`, `06-hooks/README.md#hook-types` | covered | Field-level documentation exists. |
| Common fields | `06-hooks/README.md#basic-configuration-structure` | covered | `timeout`, `once`, `if`, `async`, `shell` are documented. |
| Command hook fields | `06-hooks/README.md#command-hooks` | covered | Command hook configuration is explicit. |
| HTTP hook fields | `06-hooks/README.md#http-hooks` | covered | HTTP hook fields and env-var handling are documented. |
| Prompt and agent hook fields | `06-hooks/README.md#prompt-hooks`, `06-hooks/README.md#agent-hooks` | covered | Both hook types are documented. |
| Reference scripts by path | examples throughout `06-hooks/README.md` | partial | Paths are shown in examples, but not called out as a dedicated guidance section. |
| Hooks in skills and agents | `06-hooks/README.md#component-scoped-hooks`, `06-hooks/README.md#hooks-in-subagent-frontmatter` | covered | Strong dedicated coverage exists. |
| The `/hooks` menu | none found | missing | No dedicated `/hooks` menu documentation found. |
| Disable or remove hooks | none found | missing | No explicit removal/disable workflow found. |
| Hook input and output | `06-hooks/README.md#hook-input-and-output` | covered | Dedicated section exists. |
| Common input fields | `06-hooks/README.md#json-input-via-stdin` | covered | Common fields table exists. |
| Exit code output | `06-hooks/README.md#exit-codes` | covered | Dedicated exit-code table exists. |
| Exit code 2 behavior per event | `06-hooks/README.md#exit-codes`, event sections | partial | Exit code 2 is described generally, but not in official per-event nuance. |
| HTTP response handling | `06-hooks/README.md#http-hooks` | partial | Some response behavior is documented, but not with official reference depth. |
| JSON output | `06-hooks/README.md#json-output-stdout-exit-code-0` | covered | Dedicated JSON output section exists. |
| Decision control | `06-hooks/README.md#permissionrequest-event`, event sections | partial | Decision payloads are present, but not systematically unified. |
| Hook events overview | `06-hooks/README.md#hook-events` | covered | 26-event summary table exists. |
| SessionStart | `06-hooks/README.md#sessionstart` | covered | Dedicated section exists. |
| InstructionsLoaded | `06-hooks/README.md#hook-events`, `06-hooks/README.md#matcher-patterns` | partial | Event is listed and matcher values appear, but no dedicated event section. |
| UserPromptSubmit | `06-hooks/README.md#userpromptsubmit` | covered | Dedicated section exists. |
| PreToolUse | `06-hooks/README.md#pretooluse` | covered | Dedicated section exists. |
| PermissionRequest | `06-hooks/README.md#permissionrequest-event` | covered | Dedicated section exists. |
| PermissionDenied | `06-hooks/README.md#hook-events` | partial | Listed in event table, but no dedicated behavioral section. |
| PostToolUse | `06-hooks/README.md#posttooluse` | covered | Dedicated section exists. |
| PostToolUseFailure | `06-hooks/README.md#hook-events` | partial | Listed, but no dedicated section found. |
| Notification | `06-hooks/README.md#notification-event` | covered | Dedicated section exists. |
| SubagentStart | `06-hooks/README.md#subagentstart` | covered | Dedicated section exists. |
| SubagentStop | `06-hooks/README.md#stop-and-subagentstop` | covered | Covered together with Stop. |
| TaskCreated | `06-hooks/README.md#hook-events` | partial | Listed in table, but no dedicated section. |
| TaskCompleted | `06-hooks/README.md#hook-events` | partial | Listed in table, but no dedicated section. |
| Stop | `06-hooks/README.md#stop-and-subagentstop`, `06-hooks/README.md#prompt-based-hooks` | covered | Dedicated coverage exists. |
| StopFailure | `06-hooks/README.md#hook-events` | partial | Listed, but no dedicated section. |
| TeammateIdle | `06-hooks/README.md#hook-events` | partial | Listed, but no dedicated section. |
| ConfigChange | `06-hooks/README.md#hook-events` | partial | Listed, but no dedicated section. |
| CwdChanged | `06-hooks/README.md#sessionstart`, `06-hooks/README.md#environment-variables`, `06-hooks/README.md#hook-events` | partial | Mentioned through `CLAUDE_ENV_FILE` and event table, but no dedicated section. |
| FileChanged | `06-hooks/README.md#hook-events`, `06-hooks/README.md#environment-variables` | partial | Mentioned, but no dedicated event section. |
| WorktreeCreate | `06-hooks/README.md#hook-events` | partial | Listed only. |
| WorktreeRemove | `06-hooks/README.md#hook-events` | partial | Listed only. |
| PreCompact | `06-hooks/README.md#hook-events` | partial | Listed only. |
| PostCompact | `06-hooks/README.md#hook-events` | partial | Listed only. |
| SessionEnd | `06-hooks/README.md#sessionend` | covered | Dedicated section exists. |
| Elicitation | `06-hooks/README.md#hook-events` | partial | Listed only; no dedicated handling section. |
| ElicitationResult | `06-hooks/README.md#hook-events` | partial | Listed only; no dedicated handling section. |
| Prompt-based hooks | `06-hooks/README.md#prompt-based-hooks` | covered | Dedicated section exists. |
| Response schema | `06-hooks/README.md#prompt-based-hooks` | covered | LLM response schema is documented. |
| Agent-based hooks | `06-hooks/README.md#agent-hooks` | covered | Dedicated section exists. |
| Run hooks in the background | `06-hooks/README.md#basic-configuration-structure` | partial | `async` is mentioned, but execution semantics are not documented deeply. |
| Configure an async hook | `06-hooks/README.md#basic-configuration-structure` | partial | Knob exists, but no dedicated async config section. |
| How async hooks execute | none found | missing | No dedicated execution-model explanation found. |
| Example: run tests after file changes | none found | missing | No explicit file-change test-runner example found in README. |
| Limitations | scattered notes | partial | Some caveats exist, but not a clear dedicated limitations section for prompt/agent/async hooks. |
| Security considerations | `06-hooks/README.md#security-considerations` | covered | Dedicated section exists. |
| Disclaimer | `06-hooks/README.md#disclaimer` | covered | Dedicated section exists. |
| Security best practices | `06-hooks/README.md#best-practices` | covered | Dedicated best-practice coverage exists. |
| Windows PowerShell tool | `06-hooks/README.md#basic-configuration-structure` | partial | `shell: powershell` is mentioned, but not as dedicated Windows guidance. |
| Debug hooks | `06-hooks/README.md#debugging` | covered | Dedicated section exists. |

Interpretation

- `06-hooks/README.md` is not shallow. It already covers the core schema and the main hook types well.
- The parity gap is not "hooks missing"; it is "reference-level completeness within hooks is uneven".
- The biggest deficit is around newer operational details and long-tail events that are only listed, not deeply documented.

Recommended hooks backlog

Priority 1

- Add a dedicated `/hooks` menu section.
- Add a dedicated `disable/remove hooks` section.
- Add dedicated sections for `InstructionsLoaded`, `PermissionDenied`, `PostToolUseFailure`, `TaskCreated`, `TaskCompleted`, `StopFailure`, `TeammateIdle`, `ConfigChange`, `CwdChanged`, `FileChanged`, `WorktreeCreate`, `WorktreeRemove`, `Elicitation`, and `ElicitationResult`.

Priority 2

- Add a dedicated async/background-hooks section:
  - config
  - execution semantics
  - limitations
  - example: run tests after file changes

Priority 3

- Add event-by-event decision-control notes so `exit code 2` and JSON decision payload behavior match official reference depth.
