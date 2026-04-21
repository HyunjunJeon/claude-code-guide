# Computer Use

Claude Code's computer use lets Claude open apps, click, type, and read your screen on macOS from the CLI. It is the broadest fallback for GUI-only work, so Claude will try MCP, Bash, and browser automation first when those are a better fit.

## Overview

Use computer use when the task cannot be done cleanly through the terminal or an API:

- native app validation
- visual and layout debugging
- simulator flows
- GUI-only tools with no MCP or shell interface

Officially, this is a research preview on macOS. It requires a Pro or Max plan, Claude Code v2.1.85 or later, an interactive session, and authentication through `claude.ai`.

## Prerequisites

| Requirement | Notes |
|---|---|
| Platform | macOS only in the CLI |
| Plan | Pro or Max only |
| Claude Code version | v2.1.85+ |
| Session mode | Interactive only, not `-p` |
| Auth | Claude account signed in through `claude.ai` |

Not supported in the CLI:

- Linux or Windows
- Team or Enterprise plans
- third-party providers such as Bedrock, Vertex AI, or Foundry

## Setup and Use Flow

1. Open `/mcp` in an interactive Claude Code session.
2. Find `computer-use` in the MCP server list and enable it.
3. Grant macOS Accessibility and Screen Recording permissions when prompted.
4. Wait for Claude to request session-specific app approval.
5. Approve only the apps needed for the task.
6. Ask Claude to perform the GUI task you want validated.

The enablement persists per project, so you usually only do this once per repo.

Typical prompts:

- `Build the app, launch it, click through the preferences window, and screenshot the result.`
- `Resize the window until the footer clips, then fix the layout and verify the patch.`
- `Open the iOS Simulator, tap through onboarding, and tell me where it gets stuck.`

## Limitations

- Only one Claude Code session can control your machine at a time.
- The CLI surface is macOS only.
- The server is unavailable in non-interactive mode.
- Apps are hidden while Claude works.
- Screenshots are downscaled automatically.
- The CLI does not yet expose the Desktop app's denied-apps list.

## Security Notes

Computer use runs on your real desktop, not in the Bash sandbox. Treat it as a different trust boundary.

- Claude can only control apps you approve in the current session.
- Apps that expose shell, filesystem, or system settings access are flagged with stronger warnings.
- Your terminal window is excluded from screenshots, so terminal output does not feed back into the model.
- `Esc` aborts computer use from anywhere, and the keypress is consumed.
- A lock file prevents two sessions from driving the machine at once.

Use it only in sessions and apps you trust. If the on-screen content is untrusted, it can still be used for prompt injection.

## Troubleshooting

### `computer-use` is in use by another Claude session

Another Claude Code session already holds the machine lock. Finish that session or exit it. If the other session crashed, Claude releases the lock after it detects the process is gone.

### macOS permissions prompt keeps reappearing

Quit Claude Code completely, start a new session, and confirm Screen Recording is enabled for your terminal app in System Settings > Privacy & Security.

### `computer-use` does not appear in `/mcp`

Check all of the following:

- you are on macOS
- you are on Claude Code v2.1.85 or later
- you are on a Pro or Max plan
- you are authenticated through `claude.ai`
- you are in an interactive session, not `-p`

## Related Links

- [Official computer use docs](https://code.claude.com/docs/ko/computer-use)
- [Computer use in Korean](https://code.claude.com/docs/ko/computer-use)
- [Computer use safety guide](https://support.claude.com)
- [Computer use in Desktop](https://code.claude.com/docs/ko/desktop)
- [Claude in Chrome](https://code.claude.com/docs/ko/chrome)
- [MCP overview](../05-mcp/README.md)
- [Permissions and Security](./permissions-and-security.md)
