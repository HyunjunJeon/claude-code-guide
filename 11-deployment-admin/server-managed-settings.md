# Server-Managed Settings

This page covers the managed tier that Claude Code can receive from Anthropic's servers through the Claude.ai admin console. It is not the general settings guide; for user, project, and local settings, see the main settings documentation. Server-managed settings are the right choice when you need organization-wide policy on unmanaged devices or when you do not have MDM/endpoint management in place.

## What It Is

Server-managed settings are centrally delivered JSON policy settings. Claude Code fetches them from Anthropic at startup and during active sessions, then applies them as the highest-priority managed source for the organization.

Use this mode when you need:

- Organization-wide security policy that users cannot override.
- Central rollout of permissions, hooks, environment variables, or managed-only settings.
- A simpler deployment path than device-management tooling.

Use endpoint-managed settings instead when you already control devices with MDM or OS policy and want stronger local enforcement.

## Requirements

- Claude for Teams or Claude for Enterprise.
- A supported Claude Code version for the relevant plan.
- Network access to `api.anthropic.com`.

## How It Differs From Settings

The general settings guide explains the full hierarchy: user settings, project settings, local settings, and managed settings. This page focuses only on the server-delivered managed source.

Important differences:

- Server-managed settings are delivered from Anthropic's servers through the Claude.ai admin console.
- They cannot be overridden by user, project, or command-line settings.
- They are fetched on startup and refreshed periodically.
- They are separate from endpoint-managed settings, which are deployed directly to devices.

## Configure

1. Open Claude.ai admin settings.
2. Go to Claude Code managed settings.
3. Paste the policy JSON.
4. Save and deploy.

The JSON shape matches `settings.json`, so you can use the same keys for permissions, environment variables, hooks, and other supported options. Managed settings can also include managed-only keys such as `allowManagedPermissionRulesOnly` and `forceRemoteSettingsRefresh`.

Example:

```json
{
  "permissions": {
    "deny": [
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true
}
```

## Precedence And Delivery

Managed settings are the top tier of the Claude Code settings hierarchy. Within managed configuration, server-managed settings are checked before endpoint-managed settings. If server-managed settings contain any keys, endpoint-managed settings are ignored for that client. If server-managed settings are empty, the client can fall back to endpoint-managed policy.

Delivery behavior to keep in mind:

- Claude Code fetches settings at startup and polls for updates about once per hour while running.
- On first launch, settings may not be enforced until the fetch completes.
- Cached settings apply immediately on later launches.
- Most updates apply without restart, but some advanced settings still require a full restart.

If you need fail-closed behavior, set `forceRemoteSettingsRefresh: true` so Claude Code exits instead of starting without fresh policy when the remote fetch fails.

## Access Control

Only the following Claude.ai roles can manage server-managed settings:

- Primary Owner
- Owner

Treat this as org-wide policy. A mistake affects every user in the organization.

## Limits

- Policy applies uniformly across the organization; per-group policy is not supported yet.
- MCP server configuration cannot be distributed through server-managed settings.
- Server-managed settings require direct access to `api.anthropic.com` and are not available when Claude Code is pointed at third-party providers or custom base URLs.

## Verify

Practical checks:

```bash
claude
```

Inside Claude Code:

```text
/status
/permissions
```

Use `/status` to confirm which managed source is active, and use `/permissions` to confirm the effective rule set. If settings should force a prompt at startup, a user restart is a useful smoke test.

## Official Source Links

- [Server-managed settings](https://code.claude.com/docs/ko/server-managed-settings)
- [Claude Code settings](https://code.claude.com/docs/ko/settings)
- [Authentication](https://code.claude.com/docs/ko/authentication)
