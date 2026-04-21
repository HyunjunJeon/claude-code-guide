
# Advanced Features

Comprehensive guide to Claude Code's advanced capabilities including planning mode, extended thinking, auto mode, background tasks, permission modes, print mode (non-interactive), session management, interactive features, channels, voice dictation, remote control, web sessions, desktop app, task list, prompt suggestions, git worktrees, sandboxing, managed settings, and configuration.

**Companion guides added for parity-critical gaps:**

- [How Claude Code Works](./how-claude-code-works.md)
- [Features Overview](./features-overview.md)
- [Explore the `.claude` Directory](./claude-directory.md)
- [Explore the Context Window](./context-window.md)
- [Common Workflows](./common-workflows.md)
- [Best Practices](./best-practices.md)
- [Settings System Guide](./settings-system-guide.md)
- [Output Styles](./output-styles.md)
- [Fullscreen Rendering](./fullscreen-rendering.md)
- [Terminal Configuration](./terminal-configuration.md)
- [Channels Reference](./channels-reference.md)
- [Computer Use](./computer-use.md)
- [Claude Code in Slack](./slack.md)
- [Use Claude Code in VS Code](./vscode.md)
- [Claude Code on the Web](./web-quickstart.md)
- [Claude Code On The Web](./claude-code-on-the-web.md)
- [Claude Code Desktop](./desktop.md)
- [Desktop Quickstart](./desktop-quickstart.md)
- [Desktop Scheduled Tasks](./desktop-scheduled-tasks.md)
- [Routines](./routines.md)
- [Code Review](./code-review.md)
- [GitHub Actions](./github-actions.md)
- [GitHub Enterprise Server](./github-enterprise-server.md)
- [GitLab CI/CD](./gitlab-ci-cd.md)

## Table of Contents

1. [Overview](#overview)
2. [How Claude Code Works](./how-claude-code-works.md)
3. [Features Overview](./features-overview.md)
4. [Explore the `.claude` Directory](./claude-directory.md)
5. [Explore the Context Window](./context-window.md)
6. [Planning Mode & Extended Thinking](./planning-and-thinking.md)
7. [Execution Modes](./execution-modes.md) — Auto Mode, Background Tasks, Scheduled Tasks, Headless Mode
8. [Permissions & Security](./permissions-and-security.md) — Permission Modes, Sandboxing
9. [Session & Interaction](./session-and-interaction.md) — Session Management, Interactive Features, Voice Dictation, Task List, Prompt Suggestions
10. [Common Workflows](./common-workflows.md)
11. [Best Practices](./best-practices.md)
12. [Platforms & Integrations](./platforms.md) — Chrome Integration, Remote Control, Web Sessions, Desktop App, Git Worktrees
13. [Claude Code on the Web](./web-quickstart.md)
14. [Claude Code On The Web](./claude-code-on-the-web.md)
15. [Claude Code Desktop](./desktop.md)
16. [Desktop Quickstart](./desktop-quickstart.md)
17. [Desktop Scheduled Tasks](./desktop-scheduled-tasks.md)
18. [Routines](./routines.md)
19. [Computer Use](./computer-use.md)
20. [Claude Code in Slack](./slack.md)
21. [Code Review](./code-review.md)
22. [GitHub Actions](./github-actions.md)
23. [GitHub Enterprise Server](./github-enterprise-server.md)
24. [GitLab CI/CD](./gitlab-ci-cd.md)
25. [Configuration](./configuration.md)
26. [Channels](#channels)
27. [Managed Settings (Enterprise)](#managed-settings-enterprise)
28. [Configuration and Settings](#configuration-and-settings)
29. [Agent Teams](#agent-teams)
30. [Additional Resources](#additional-resources)

---

## Overview

Advanced features in Claude Code extend the core capabilities with planning, reasoning, automation, and control mechanisms. These features enable sophisticated workflows for complex development tasks, code review, automation, and multi-session management.

**Key advanced features include:**
- **Planning Mode**: Create detailed implementation plans before coding
- **Extended Thinking**: Deep reasoning for complex problems
- **Auto Mode**: Background safety classifier reviews each action before execution (Research Preview)
- **Background Tasks**: Run long operations without blocking the conversation
- **Permission Modes**: Control what Claude can do (`default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`)
- **Print Mode**: Run Claude Code non-interactively for automation and CI/CD (`claude -p`)
- **Session Management**: Manage multiple work sessions
- **Interactive Features**: Keyboard shortcuts, multi-line input, and command history
- **Voice Dictation**: Push-to-talk voice input with 20-language STT support
- **Channels**: MCP servers push messages into running sessions (Research Preview)
- **Remote Control**: Control Claude Code from Claude.ai or the Claude app
- **Web Sessions**: Run Claude Code in the browser at claude.ai/code
- **Desktop App**: Standalone app for visual diff review and multiple sessions
- **Task List**: Persistent task tracking across context compactions
- **Prompt Suggestions**: Smart command suggestions based on context
- **Git Worktrees**: Isolated worktree branches for parallel work
- **Sandboxing**: OS-level filesystem and network isolation
- **Managed Settings**: Enterprise deployment via plist, Registry, or managed files
- **Configuration**: Customize behavior with JSON configuration files

---

## Channels

Channels is a Research Preview feature that pushes events from external services into a running Claude Code session via MCP servers. Sources include Telegram, Discord, iMessage, and arbitrary webhooks, allowing Claude to react to real-time notifications without polling.

### Subscribing to Channels

```bash
# Subscribe to channel plugins at startup
claude --channels discord,telegram

# Subscribe to multiple sources
claude --channels discord,telegram,imessage,webhooks
```

### Supported Integrations

| Integration | Description |
|-------------|-------------|
| **Discord** | Receive and respond to Discord messages in your session |
| **Telegram** | Receive and respond to Telegram messages in your session |
| **iMessage** | Receive iMessage notifications in your session |
| **Webhooks** | Receive events from arbitrary webhook sources |

### Configuration

Configure channels with the `--channels` flag at startup. For enterprise deployments, use the managed setting to control which channel plugins are permitted:

```json
{
  "allowedChannelPlugins": ["discord", "telegram"]
}
```

The `allowedChannelPlugins` managed setting controls which channel plugins are permitted across the organization.

### How It Works

1. MCP servers act as channel plugins that connect to external services
2. Incoming messages and events are pushed into the active Claude Code session
3. Claude can read and respond to messages within the session context
4. Channel plugins must be approved via the `allowedChannelPlugins` managed setting
5. No polling required — events are pushed in real time

For the full builder-oriented reference, see [Channels Reference](./channels-reference.md).

---

## Managed Settings (Enterprise)

Managed Settings enable enterprise administrators to deploy Claude Code configuration across an organization using platform-native management tools.

### Deployment Methods

| Platform | Method | Since |
|----------|--------|-------|
| macOS | Managed plist files (MDM) | v2.1.51+ |
| Windows | Windows Registry | v2.1.51+ |
| Cross-platform | Managed configuration files | v2.1.51+ |
| Cross-platform | Managed drop-ins (`managed-settings.d/` directory) | v2.1.83+ |

### Managed Drop-ins

Since v2.1.83, administrators can deploy multiple managed settings files into a `managed-settings.d/` directory. Files are merged in alphabetical order, allowing modular configuration across teams:

```
~/.claude/managed-settings.d/
  00-org-defaults.json
  10-team-policies.json
  20-project-overrides.json
```

### Available Managed Settings

| Setting | Description |
|---------|-------------|
| `disableBypassPermissionsMode` | Prevent users from enabling bypass permissions |
| `availableModels` | Restrict which models users can select |
| `allowedChannelPlugins` | Control which channel plugins are permitted |
| `autoMode.environment` | Configure trusted infrastructure for auto mode |
| Custom policies | Organization-specific permission and tool policies |

### Example: macOS Plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>disableBypassPermissionsMode</key>
  <true/>
  <key>availableModels</key>
  <array>
    <string>claude-sonnet-4-6</string>
    <string>claude-haiku-4-5</string>
  </array>
</dict>
</plist>
```

---

## Configuration and Settings

### Configuration File Locations

1. **Global config**: `~/.claude/config.json`
2. **Project config**: `./.claude/config.json`
3. **User config**: `~/.config/claude-code/settings.json`

### Complete Configuration Example

**Core advanced features configuration:**

```json
{
  "permissions": {
    "mode": "default"
  },
  "hooks": {
    "PreToolUse:Edit": "eslint --fix ${file_path}",
    "PostToolUse:Write": "~/.claude/hooks/security-scan.sh"
  },
  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      }
    }
  }
}
```

**Extended configuration example:**

```json
{
  "permissions": {
    "mode": "default",
    "allowedTools": ["Bash(git log:*)", "Read"],
    "disallowedTools": ["Bash(rm -rf:*)"]
  },

  "hooks": {
    "PreToolUse": [{ "matcher": "Edit", "hooks": ["eslint --fix ${file_path}"] }],
    "PostToolUse": [{ "matcher": "Write", "hooks": ["~/.claude/hooks/security-scan.sh"] }],
    "Stop": [{ "hooks": ["~/.claude/hooks/notify.sh"] }]
  },

  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_TOKEN": "${GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

### Environment Variables

Override config with environment variables:

```bash
# Model selection
export ANTHROPIC_MODEL=claude-opus-4-7
export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-7
export ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
export ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5

# API configuration
export ANTHROPIC_API_KEY=sk-ant-...

# Thinking configuration
export MAX_THINKING_TOKENS=16000
export CLAUDE_CODE_EFFORT_LEVEL=high

# Feature toggles
export CLAUDE_CODE_DISABLE_AUTO_MEMORY=true
export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=true
export CLAUDE_CODE_DISABLE_CRON=1
export CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=true
export CLAUDE_CODE_DISABLE_TERMINAL_TITLE=true
export CLAUDE_CODE_DISABLE_1M_CONTEXT=true
export CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=true
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
export CLAUDE_CODE_ENABLE_TASKS=true
export CLAUDE_CODE_SIMPLE=true              # Set by --bare flag

# MCP configuration
export MAX_MCP_OUTPUT_TOKENS=50000
export ENABLE_TOOL_SEARCH=true

# Task management
export CLAUDE_CODE_TASK_LIST_ID=my-project-tasks

# Agent teams (experimental)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Subagent and plugin configuration
export CLAUDE_CODE_SUBAGENT_MODEL=sonnet
export CLAUDE_CODE_PLUGIN_SEED_DIR=./my-plugins
export CLAUDE_CODE_NEW_INIT=1

# Subprocess and streaming
export CLAUDE_CODE_SUBPROCESS_ENV_SCRUB="SECRET_KEY,DB_PASSWORD"
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80
export CLAUDE_STREAM_IDLE_TIMEOUT_MS=30000
export ANTHROPIC_CUSTOM_MODEL_OPTION=my-custom-model
export SLASH_COMMAND_TOOL_CHAR_BUDGET=50000
```

### Configuration Management Commands

```
User: /config
[Opens interactive configuration menu]
```

The `/config` command provides an interactive menu to toggle settings such as:
- Extended thinking on/off
- Verbose output
- Permission mode
- Model selection

### Per-Project Configuration

Create `.claude/config.json` in your project:

```json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", "hooks": ["npm test && npm run lint"] }]
  },
  "permissions": {
    "mode": "default"
  },
  "mcp": {
    "servers": {
      "project-db": {
        "command": "mcp-postgres",
        "env": {
          "DATABASE_URL": "${PROJECT_DB_URL}"
        }
      }
    }
  }
}
```

---

## Agent Teams

Agent Teams is an experimental feature that enables multiple Claude Code instances to collaborate on a task. It is disabled by default.

### Enabling Agent Teams

Enable via environment variable or settings:

```bash
# Environment variable
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Or add to your settings JSON:

```json
{
  "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
}
```

### How Agent Teams Work

- A **team lead** coordinates the overall task and delegates subtasks to teammates
- **Teammates** work independently, each with their own context window
- A **shared task list** enables self-coordination between team members
- Use subagent definitions (`.claude/agents/` or `--agents` flag) to define teammate roles and specializations

### Display Modes

Agent Teams support two display modes, configured with the `--teammate-mode` flag:

| Mode | Description |
|------|-------------|
| `in-process` (default) | Teammates run within the same terminal process |
| `tmux` | Each teammate gets a dedicated split pane (requires tmux or iTerm2) |
| `auto` | Automatically selects the best display mode |

```bash
# Use tmux split panes for teammate display
claude --teammate-mode tmux

# Explicitly use in-process mode
claude --teammate-mode in-process
```

### Use Cases

- Large refactoring tasks where different teammates handle different modules
- Parallel code review and implementation
- Coordinated multi-file changes across a codebase

> **Note**: Agent Teams is experimental and may change in future releases. See [code.claude.com/docs/ko/agent-teams](https://code.claude.com/docs/ko/agent-teams) for the full reference.

---

## Best Practices

### Planning Mode
- ✅ Use for complex multi-step tasks
- ✅ Review plans before approving
- ✅ Modify plans when needed
- ❌ Don't use for simple tasks

### Extended Thinking
- ✅ Use for architectural decisions
- ✅ Use for complex problem-solving
- ✅ Review the thinking process
- ❌ Don't use for simple queries

### Background Tasks
- ✅ Use for long-running operations
- ✅ Monitor task progress
- ✅ Handle task failures gracefully
- ❌ Don't start too many concurrent tasks

### Permissions
- ✅ Use `plan` for code review (read-only)
- ✅ Use `default` for interactive development
- ✅ Use `acceptEdits` for automation workflows
- ✅ Use `auto` for autonomous work with safety guardrails
- ❌ Don't use `bypassPermissions` unless absolutely necessary

### Sessions
- ✅ Use separate sessions for different tasks
- ✅ Save important session states
- ✅ Clean up old sessions
- ❌ Don't mix unrelated work in one session

---

## Additional Resources

For more information about Claude Code and related features:

- [Official Interactive Mode Documentation](https://code.claude.com/docs/ko/interactive-mode)
- [Official Headless Mode Documentation](https://code.claude.com/docs/ko/headless)
- [CLI Reference](https://code.claude.com/docs/ko/cli-reference)
- [Settings System Guide](./settings-system-guide.md) - Scopes, precedence, and how Claude Code configuration actually fits together
- [Output Styles](./output-styles.md) - Built-in and custom output modes
- [Fullscreen Rendering](./fullscreen-rendering.md) - Flicker-free rendering mode
- [Terminal Configuration](./terminal-configuration.md) - Terminal-specific setup and newline/notification behavior
- [Channels Reference](./channels-reference.md) - Builder-oriented guide for channel-backed MCP event streams
- [Use Claude Code in VS Code](./vscode.md) - Extension-focused IDE workflow guide
- [Checkpoints Guide](../08-checkpoints/) - Session management and rewinding
- [Slash Commands](../01-slash-commands/) - Command reference
- [Memory Guide](../02-memory/) - Persistent context
- [Skills Guide](../03-skills/) - Autonomous capabilities
- [Subagents Guide](../04-subagents/) - Delegated task execution
- [MCP Guide](../05-mcp/) - External data access
- [Hooks Guide](../06-hooks/) - Event-driven automation
- [Plugins Guide](../07-plugins/) - Bundled extensions
- [Official Scheduled Tasks Documentation](https://code.claude.com/docs/ko/scheduled-tasks)
- [Official Chrome Integration Documentation](https://code.claude.com/docs/ko/chrome)
- [Official Remote Control Documentation](https://code.claude.com/docs/ko/remote-control)
- [Official Keybindings Documentation](https://code.claude.com/docs/ko/keybindings)
- [Official Desktop App Documentation](https://code.claude.com/docs/ko/desktop)
- [Official Agent Teams Documentation](https://code.claude.com/docs/ko/agent-teams)
