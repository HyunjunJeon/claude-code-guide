# Claude Code in Slack

Claude Code in Slack lets you delegate coding tasks from Slack channels to a Claude Code session on the web. When you mention `@Claude`, Claude decides whether the request is coding-related and routes it to Claude Code when appropriate.

## Overview

This integration is built on the Claude app for Slack, with routing to Claude Code on the web for development work. It works best when the discussion context already lives in Slack and you want to hand off a task without leaving the thread.

Key behaviors:

- `@Claude` can detect coding intent automatically
- context is gathered from the thread or recent channel messages
- Claude creates a session on `claude.ai/code`
- progress updates are posted back into Slack
- the final result includes a summary and action buttons

Claude Code in Slack only works in channels, public or private. It does not work in direct messages.

## Prerequisites

| Requirement | Notes |
|---|---|
| Claude plan | Pro, Max, Team, or Enterprise with Claude Code access |
| Claude Code on the web | Must be enabled |
| GitHub | At least one repository connected and authenticated |
| Slack auth | Your Slack account linked to your Claude account |
| Admin access | A workspace admin must install the Claude app |

## Setup and Use Flow

1. A Slack workspace admin installs the Claude app from the Slack App Marketplace.
2. Open the Claude App Home in Slack and connect your Claude account.
3. In Claude Code on the web, sign in with the same account and connect GitHub.
4. Authenticate at least one repository you want Claude to use.
5. Pick a routing mode:
   - `Code only` routes all `@mentions` to Claude Code sessions.
   - `Code + Chat` lets Claude choose between Claude Code and regular Claude Chat.
6. Invite Claude to a channel with `/invite @Claude`.
7. Mention `@Claude` in a channel or thread to start a task.
8. Review the result with `View Session`, `Create PR`, `Retry as Code`, or `Change Repo`.

## Limitations

- Channels only; DMs are not supported.
- GitHub repositories only.
- Each session can create one pull request at a time.
- Sessions count against the user's plan limits.
- Users must have Claude Code on the web access enabled.
- If the web access is missing, Slack falls back to standard Claude chat responses.

## Security Notes

Slack context is part of the trust boundary here.

- Claude can read the thread and nearby channel context, so use it only in trusted conversations.
- Channel membership controls access because Claude only responds where it has been invited.
- Private channels are supported, which makes access scoping more precise.
- Workspace admins control installation, and Enterprise Grid admins can limit which workspaces get the app.
- Sessions created from Slack are visible in Claude Code on the web, and Team or Enterprise sessions can be visible to the organization.

## Troubleshooting

### Sessions not starting

- Confirm your Claude account is connected in App Home.
- Confirm Claude Code on the web access is enabled.
- Confirm at least one GitHub repository is connected.

### Repository not showing

- Connect the repository in Claude Code on the web.
- Verify GitHub permissions.
- Disconnect and reconnect GitHub if needed.

### Wrong repository selected

- Use `Change Repo`.
- Include the repository name in the request for clearer routing.

### Authentication errors

- Disconnect and reconnect Claude in App Home.
- Confirm the browser is signed into the correct Claude account.
- Confirm your plan includes Claude Code access.

### Session expiration

- Open `claude.ai/code` to continue or review past sessions.
- The full session history remains available on the web.

## Related Links

- [Official Slack docs](https://code.claude.com/docs/ko/slack)
- [Slack page in Korean](https://code.claude.com/docs/ko/slack)
- [Claude Code on the web](https://claude.ai/code)
- [Slack App Marketplace](https://slack.com/apps)
- [Claude for Slack](https://support.claude.com)
- [Claude Code overview](./README.md)
