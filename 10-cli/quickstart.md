# Quickstart

This guide condenses the official Claude Code quickstart into a practical first-run path for terminal users. Read it before the full CLI reference if you want to get productive quickly.

## Before You Begin

Prepare these first:

- a terminal or shell you can run commands in
- a code project or repo to open
- one of these account paths:
  - Claude subscription: Pro, Max, Team, or Enterprise
  - Claude Console account with API billing
  - a supported cloud-provider route such as Bedrock, Vertex AI, or Microsoft Foundry

If you plan to use Windows without WSL, install Git for Windows before the native installer.

## Step 1: Install Claude Code

Recommended native installers:

```sh
# macOS, Linux, WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

Alternative package-manager routes:

```sh
brew install --cask claude-code
winget install Anthropic.ClaudeCode
```

Notes:

- Native installers auto-update in the background.
- `brew` and `winget` installs need manual upgrades.
- `claude-code` on Homebrew tracks the stable channel; `claude-code@latest` tracks the latest channel.

## Step 2: Log In

Start Claude Code once and complete the login flow:

```sh
claude
```

Inside the interactive session, you can also run:

```text
/login
```

Supported login paths:

- Claude subscription accounts
- Claude Console accounts
- cloud-provider-backed auth flows for Bedrock, Vertex AI, and Foundry

To verify which identity is active, use `/status`.

## Step 3: Start Your First Session

Open a project and launch Claude Code from that directory:

```sh
cd /path/to/project
claude
```

Useful first commands:

```text
/help
/resume
/status
```

## Step 4: Ask Exploration Questions

Start with repo-understanding prompts before requesting edits:

```text
what does this project do?
what technologies does this project use?
where is the main entry point?
explain the folder structure
```

Claude Code reads project files as needed, so you usually do not have to paste large amounts of context manually.

## Step 5: Make a Small Edit

Try a contained change first:

```text
add a hello world function to the main file
```

Typical flow:

1. Claude finds the relevant file.
2. Claude proposes an edit.
3. You approve or deny the change.
4. Claude applies it.

Permission prompts are normal. For broader control, see [Permissions and Security](../09-advanced-features/permissions-and-security.md).

## Step 6: Use Git Conversationally

Common Git prompts:

```text
what files have I changed?
commit my changes with a descriptive message
create a new branch called feature/quickstart
show me the last 5 commits
help me resolve merge conflicts
```

Claude Code can inspect Git state and propose commands, but you should still review branch names, commit messages, and conflict resolution before accepting them.

## Step 7: Fix a Bug or Add a Feature

Describe the task in plain language:

```text
there's a bug where users can submit empty forms - fix it
```

Or:

```text
add input validation to the user registration form
```

For best results:

- describe the symptom, scope, and expected outcome
- point Claude at the specific area if you already know it
- ask for tests when correctness matters

## Essential Commands

| Command | Purpose |
|---|---|
| `claude` | Start interactive mode |
| `claude "task"` | Start a session with an initial prompt |
| `claude -p "query"` | Run one-off print mode and exit |
| `claude -c` | Continue the most recent conversation |
| `claude -r <session>` | Resume a named or ID-based session |
| `/help` | Show available slash commands |
| `/clear` | Clear current conversation context |
| `exit` or `Ctrl+D` | Exit Claude Code |

## Beginner Tips

- Be specific. "Fix the login bug where users see a blank screen after invalid credentials" is better than "fix the bug."
- Break big tasks into steps when the workflow is not obvious.
- Ask Claude to inspect before editing when you are entering a new codebase.
- Use Tab completion, command history, and `/` command search to move faster.

## What To Read Next

- [CLI Reference](./README.md)
- [Tools Reference](./tools-reference.md)
- [Troubleshooting](./troubleshooting.md)
- [Permissions and Security](../09-advanced-features/permissions-and-security.md)
- [Session and Interaction](../09-advanced-features/session-and-interaction.md)
- [Execution Modes](../09-advanced-features/execution-modes.md)

## Official Source

- [Claude Code Quickstart](https://code.claude.com/docs/ko/quickstart)
