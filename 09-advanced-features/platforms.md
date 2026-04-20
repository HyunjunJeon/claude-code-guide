# Platforms & Integrations

---

## Chrome Integration

Chrome Integration connects Claude Code to your Chrome or Microsoft Edge browser for live web automation and debugging. This is a beta feature available since v2.0.73+ (Edge support added in v1.0.36+).

### Enabling Chrome Integration

**At startup**:

```bash
claude --chrome      # Enable Chrome connection
claude --no-chrome   # Disable Chrome connection
```

**Within a session**:

```
/chrome
```

Select "Enabled by default" to activate Chrome Integration for all future sessions. Claude Code shares your browser's login state, so it can interact with authenticated web apps.

### Capabilities

| Capability | Description |
|------------|-------------|
| **Live debugging** | Read console logs, inspect DOM elements, debug JavaScript in real time |
| **Design verification** | Compare rendered pages against design mockups |
| **Form validation** | Test form submissions, input validation, and error handling |
| **Web app testing** | Interact with authenticated apps (Gmail, Google Docs, Notion, etc.) |
| **Data extraction** | Scrape and process content from web pages |
| **Session recording** | Record browser interactions as GIF files |

### Site-level permissions

The Chrome extension manages per-site access. Grant or revoke access for specific sites at any time through the extension popup. Claude Code only interacts with sites you have explicitly allowed.

### How it works

Claude Code controls the browser in a visible window — you can watch actions happen in real time. When the browser encounters a login page or CAPTCHA, Claude pauses and waits for you to handle it manually before continuing.

### Known limitations

- **Browser support**: Chrome and Edge only — Brave, Arc, and other Chromium browsers are not supported
- **WSL**: Not available in Windows Subsystem for Linux
- **Third-party providers**: Not supported with Bedrock, Vertex, or Foundry API providers
- **Service worker idle**: The Chrome extension service worker may go idle during extended sessions

> **Tip**: Chrome Integration is a beta feature. Browser support may expand in future releases.

---

## Remote Control

Remote Control lets you continue a locally running Claude Code session from your phone, tablet, or any browser. Your local session keeps running on your machine — nothing moves to the cloud. Available on Pro, Max, Team, and Enterprise plans (v2.1.51+).

### Starting Remote Control

**From the CLI**:

```bash
# Start with default session name
claude remote-control

# Start with a custom name
claude remote-control --name "Auth Refactor"
```

**From within a session**:

```
/remote-control
/remote-control "Auth Refactor"
```

**Available flags**:

| Flag | Description |
|------|-------------|
| `--name "title"` | Custom session title for easy identification |
| `--verbose` | Show detailed connection logs |
| `--sandbox` | Enable filesystem and network isolation |
| `--no-sandbox` | Disable sandboxing (default) |

### Connecting to a session

Three ways to connect from another device:

1. **Session URL** — Printed to the terminal when the session starts; open in any browser
2. **QR code** — Press `spacebar` after starting to display a scannable QR code
3. **Find by name** — Browse your sessions at claude.ai/code or in the Claude mobile app (iOS/Android)

### Security

- **No inbound ports** opened on your machine
- **Outbound HTTPS only** over TLS
- **Scoped credentials** — multiple short-lived, narrowly scoped tokens
- **Session isolation** — each remote session is independent

### Remote Control vs Claude Code on the web

| Aspect | Remote Control | Claude Code on Web |
|--------|---------------|-------------------|
| **Execution** | Runs on your machine | Runs on Anthropic cloud |
| **Local tools** | Full access to local MCP servers, files, and CLI | No local dependencies |
| **Use case** | Continue local work from another device | Start fresh from any browser |

### Limitations

- One remote session per Claude Code instance
- Terminal must stay open on the host machine
- Session times out after ~10 minutes if the network is unreachable

### Use cases

- Control Claude Code from a mobile device or tablet while away from your desk
- Use the richer claude.ai UI while maintaining local tool execution
- Quick code reviews on the go with your full local development environment

---

## Web Sessions

Web Sessions allow you to run Claude Code directly in the browser at claude.ai/code, or create web sessions from the CLI.

### Creating a Web Session

```bash
# Create a new web session from the CLI
claude --remote "implement the new API endpoints"
```

This starts a Claude Code session on claude.ai that you can access from any browser.

### Resuming Web Sessions Locally

If you started a session on the web and want to continue it locally:

```bash
# Resume a web session in the local terminal
claude --teleport
```

Or from within an interactive REPL:
```
/teleport
```

### Use Cases

- Start work on one machine and continue on another
- Share a session URL with team members
- Use the web UI for visual diff review, then switch to terminal for execution

---

## Desktop App

The Claude Code Desktop App provides a standalone application with visual diff review, parallel sessions, and integrated connectors. Available for macOS and Windows (Pro, Max, Team, and Enterprise plans).

### Installation

Download from [claude.ai](https://claude.ai) for your platform:
- **macOS**: Universal build (Apple Silicon and Intel)
- **Windows**: x64 and ARM64 installers available

See the [Desktop Quickstart](https://code.claude.com/docs/en/desktop-quickstart) for setup instructions.

### Handing off from CLI

Transfer your current CLI session to the Desktop App:

```
/desktop
```

### Core features

| Feature | Description |
|---------|-------------|
| **Diff view** | File-by-file visual review with inline comments; Claude reads comments and revises |
| **App preview** | Auto-starts dev servers with an embedded browser for live verification |
| **PR monitoring** | GitHub CLI integration with auto-fix CI failures and auto-merge when checks pass |
| **Parallel sessions** | Multiple sessions in the sidebar with automatic Git worktree isolation |
| **Scheduled tasks** | Recurring tasks (hourly, daily, weekdays, weekly) that run while the app is open |
| **Rich rendering** | Code, markdown, and diagram rendering with syntax highlighting |

### App preview configuration

Configure dev server behavior in `.claude/launch.json`:

```json
{
  "command": "npm run dev",
  "port": 3000,
  "readyPattern": "ready on",
  "persistCookies": true
}
```

### Connectors

Connect external services for richer context:

| Connector | Capability |
|-----------|------------|
| **GitHub** | PR monitoring, issue tracking, code review |
| **Slack** | Notifications, channel context |
| **Linear** | Issue tracking, sprint management |
| **Notion** | Documentation, knowledge base access |
| **Asana** | Task management, project tracking |
| **Calendar** | Schedule awareness, meeting context |

> **Note**: Connectors are not available for remote (cloud) sessions.

### Remote and SSH sessions

- **Remote sessions**: Run on Anthropic cloud infrastructure; continue even when the app is closed. Accessible from claude.ai/code or the Claude mobile app
- **SSH sessions**: Connect to remote machines over SSH with full access to the remote filesystem and tools. Claude Code must be installed on the remote machine

### Permission modes in Desktop

The Desktop App supports the same 4 permission modes as the CLI:

| Mode | Behavior |
|------|----------|
| **Ask permissions** (default) | Review and approve every edit and command |
| **Auto accept edits** | File edits auto-approved; commands require manual approval |
| **Plan mode** | Review approach before any changes are made |
| **Bypass permissions** | Automatic execution (sandbox-only, admin-controlled) |

### Enterprise features

- **Admin console**: Control Code tab access and permission settings for the organization
- **MDM deployment**: Deploy via MDM on macOS or MSIX on Windows
- **SSO integration**: Require single sign-on for organization members
- **Managed settings**: Centrally manage team configuration and model availability

---

## Git Worktrees

Git Worktrees allow you to start Claude Code in an isolated worktree, enabling parallel work on different branches without stashing or switching.

### Starting in a Worktree

```bash
# Start Claude Code in an isolated worktree
claude --worktree
# or
claude -w
```

### Worktree Location

Worktrees are created at:
```
<repo>/.claude/worktrees/<name>
```

### Sparse Checkout for Monorepos

Use the `worktree.sparsePaths` setting to perform sparse-checkout in monorepos, reducing disk usage and clone time:

```json
{
  "worktree": {
    "sparsePaths": ["packages/my-package", "shared/"]
  }
}
```

### Worktree Tools and Hooks

| Item | Description |
|------|-------------|
| `ExitWorktree` | Tool to exit and clean up the current worktree |
| `WorktreeCreate` | Hook event fired when a worktree is created |
| `WorktreeRemove` | Hook event fired when a worktree is removed |

### Auto-Cleanup

If no changes are made in the worktree, it is automatically cleaned up when the session ends.

### Use Cases

- Work on a feature branch while keeping main branch untouched
- Run tests in isolation without affecting the working directory
- Try experimental changes in a disposable environment
- Sparse-checkout specific packages in monorepos for faster startup
