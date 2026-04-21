# GitHub Enterprise Server

Claude Code can connect to a self-hosted GitHub Enterprise Server instance so teams using GHES instead of `github.com` can still use Claude Code on the web, hosted Code Review, and internal plugin marketplaces.

## Overview

Officially, GitHub Enterprise Server support is available on Team and Enterprise plans.

Once an administrator connects the GHES instance to Claude Code, developers can work with repositories on that instance without repeating setup in every repository.

Supported outcomes highlighted in the official docs:

- web sessions against GHES repositories
- hosted Code Review for GHES repositories
- plugin marketplaces hosted on GHES

This page is about the repository hosting integration, not about running GitHub Actions on GHES runners.

## Admin Setup

Setup is organization-level, not per developer.

1. Open `claude.ai/admin-settings/claude-code`.
2. Find the GitHub Enterprise Server section.
3. Click `Connect`.
4. Enter a display name and the GHES hostname.
5. If needed, provide the CA certificate for self-signed or private CA environments.
6. Continue to GitHub Enterprise to create the GitHub App from the generated manifest.
7. Install that app on the repositories or organizations Claude should access.
8. Return to Claude admin settings and enable the relevant features.

If the redirect-based setup is blocked by network policy, the official docs also describe a manual setup path.

## GitHub App Permissions

The generated app needs enough access to support sessions, reviews, and related automation. The official permission model includes:

- contents read/write
- pull requests read/write
- issues read/write
- checks read/write
- actions read
- repository hooks read/write
- metadata read

The app also subscribes to pull request, comment, review, and check-run webhook events.

That permission set is broader than simple read-only cloning because Claude may need to push branches, comment on pull requests, and publish check results.

## Manual Setup

If guided setup is not possible, create the GitHub App on GHES yourself and then provide the credentials in Claude's admin form.

The manual path requires the standard app material listed in the official docs, including:

- hostname
- OAuth client ID and secret
- GitHub App ID
- client ID and client secret
- webhook secret
- private key

This is mainly for locked-down enterprise networks where browser redirect flows or manifest handoff are restricted.

## Developer Workflow

Once the admin side is complete, developers use GHES repositories much like cloud-hosted repositories. The integration is intended to remove per-repository setup work for normal use.

Typical workflow effects:

- start web sessions against GHES repositories
- use hosted Code Review on pull requests
- work with internal plugin marketplaces hosted on the same GHES instance

If you are troubleshooting a repository connection as a developer, the first question is usually whether the admin completed the GHES connection and installed the app on that repository.

## Plugin Marketplaces on GHES

Claude Code can consume plugin marketplaces hosted on GHES. The important operational detail is that GHES marketplaces must use a full git URL, not the `owner/repo` shorthand that resolves to `github.com`.

Examples from the official pattern:

```bash
/plugin marketplace add git@github.example.com:platform/claude-plugins.git
/plugin marketplace add https://github.example.com/platform/claude-plugins.git
```

If your organization restricts marketplace sources through managed settings, admins can allow GHES-hosted marketplaces with `hostPattern` rules and optionally pre-register internal marketplaces for developers.

## Limitations and Fit

This integration is appropriate when:

- source code must remain on a self-managed GitHub instance
- you want Claude Code web sessions or hosted review without moving repositories to `github.com`
- you need internal plugin distribution from enterprise-controlled infrastructure

You still need network reachability from Anthropic infrastructure to the GHES instance for hosted features to work reliably.

## Troubleshooting

### Web session fails to clone the repository

If `claude --remote` fails with a clone error:

- verify the GHES instance was fully connected by an admin
- verify the GitHub App is installed on the target repository
- verify the hostname registered in Claude matches the hostname used in the git remote

### Marketplace add fails with a policy error

If `/plugin marketplace add` is blocked for your GHES URL, your organization likely restricts marketplace sources. Ask the admin to allow the GHES hostname in managed settings.

### GHES instance is not reachable

If hosted reviews or web sessions time out, confirm the GHES instance is reachable from Anthropic infrastructure and that your firewall allows the required inbound connectivity.

## Related Links

- [Official GHES docs](https://code.claude.com/docs/ko/github-enterprise-server)
- [Official Code Review docs](https://code.claude.com/docs/ko/code-review)
- [Managed settings](../11-deployment-admin/server-managed-settings.md)
- [Plugins and marketplaces](../12-agent-sdk/plugins.md)
