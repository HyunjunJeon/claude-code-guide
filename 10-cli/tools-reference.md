# Tools Reference

Claude Code ships with a fixed set of built-in tools. The tool names here are the exact strings you use in permission rules, subagent tool lists, and hook matchers. If you want to disable a tool entirely, add it to the `deny` array in your permission settings. If you want custom capabilities, connect an MCP server instead of inventing new built-in tools.

## Built-in Tools

| Tool | What it does | Permission |
| --- | --- | --- |
| `Agent` | Spawns a subagent with its own context window. | No |
| `AskUserQuestion` | Asks multiple-choice questions to clarify requirements. | No |
| `Bash` | Runs shell commands in your environment. | Yes |
| `CronCreate` | Schedules a recurring or one-shot prompt in the current session. | No |
| `CronDelete` | Cancels a scheduled task by ID. | No |
| `CronList` | Lists scheduled tasks in the session. | No |
| `Edit` | Makes targeted edits to a file. | Yes |
| `EnterPlanMode` | Switches to plan mode so Claude can design before coding. | No |
| `EnterWorktree` | Creates or opens an isolated git worktree. | No |
| `ExitPlanMode` | Returns a plan for approval and exits plan mode. | Yes |
| `ExitWorktree` | Leaves the worktree session and returns to the original directory. | No |
| `Glob` | Finds files by pattern. | No |
| `Grep` | Searches file contents for patterns. | No |
| `ListMcpResourcesTool` | Lists resources exposed by connected MCP servers. | No |
| `LSP` | Uses language servers for code intelligence. | No |
| `Monitor` | Watches a long-running command or file source in the background. | Yes |
| `NotebookEdit` | Modifies Jupyter notebook cells. | Yes |
| `PowerShell` | Runs PowerShell commands natively on Windows. | Yes |
| `Read` | Reads file contents. | No |
| `ReadMcpResourceTool` | Reads a specific MCP resource by URI. | No |
| `SendMessage` | Sends a message to an agent team teammate or resumes a subagent. | No |
| `Skill` | Runs a skill inside the main conversation. | Yes |
| `TaskCreate` | Creates a session task item. | No |
| `TaskGet` | Fetches details for a task. | No |
| `TaskList` | Lists all tasks and their status. | No |
| `TaskOutput` | Legacy background-task output reader. | No |
| `TaskStop` | Stops a running background task. | No |
| `TaskUpdate` | Updates or deletes task metadata. | No |
| `TeamCreate` | Creates an agent team. | No |
| `TeamDelete` | Deletes an agent team. | No |
| `ToolSearch` | Loads deferred tools when tool search is enabled. | No |
| `TodoWrite` | Manages the session task checklist. | No |
| `WebFetch` | Fetches content from a URL. | Yes |
| `WebSearch` | Searches the web. | Yes |
| `Write` | Creates or overwrites files. | Yes |

## Permission Notes

`Bash`, `Edit`, `Write`, `WebFetch`, `WebSearch`, `NotebookEdit`, `Monitor`, and `Skill` need approval by default. Read-only tools such as `Read`, `Glob`, and `Grep` do not.

Permission rules use the exact tool name, optionally with a specifier such as `Bash(npm run build)` or `Read(./.env)`. Claude evaluates deny rules first, then ask rules, then allow rules.

`SendMessage`, `TeamCreate`, and `TeamDelete` are only available when `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set. `TaskOutput` is deprecated; prefer reading the task output file directly.

## Behavior Notes

### Bash

`Bash` runs each command in a separate process. In the main session, `cd` persists to later Bash calls as long as the new working directory stays inside the project directory or an added directory. Environment variables do not persist between Bash calls. If you need persistent environment setup, use `CLAUDE_ENV_FILE` or a `SessionStart` hook.

### LSP

`LSP` provides language-server-driven code intelligence. After each file edit, it can report type errors and warnings automatically, and it can also jump to definitions, find references, inspect types, list symbols, and trace call hierarchies. It stays inactive until you install a code intelligence plugin for the language you are working in.

### Monitor

`Monitor` is for watching logs, polling CI or PR status, watching directories, or tracking long-running commands without blocking the conversation. It requires Claude Code v2.1.98 or later, uses the same permission rules as `Bash`, and is not available on Amazon Bedrock, Google Vertex AI, or Microsoft Foundry. It is also unavailable when telemetry or nonessential traffic is disabled.

### PowerShell

`PowerShell` is an opt-in preview. On Windows, it lets Claude run PowerShell commands directly instead of routing through Git Bash. On Linux, macOS, and WSL, it requires PowerShell 7+ on `PATH`. Known preview limitations include no Auto mode support yet, no PowerShell profiles, no sandboxing on Windows, and Git Bash still being required to launch Claude Code.

## How To Check The Available Set

Your exact tool set depends on provider, platform, and settings. Ask Claude in a running session:

```text
What tools do you have access to?
```

For exact MCP tool names, run `/mcp`.

## Official Sources

- https://code.claude.com/docs/ko/tools-reference
- https://code.claude.com/docs/ko/settings
- https://code.claude.com/docs/ko/permissions
- https://code.claude.com/docs/ko/mcp
