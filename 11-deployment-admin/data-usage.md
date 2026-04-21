# Data Usage

This page summarizes how Claude Code data is handled across account types, execution modes, and telemetry paths. It is the right place to start before enabling Claude Code in a managed environment.

## Training policy

The official docs separate consumer and commercial usage:

- Free, Pro, and Max users can choose whether their data is used for model improvement.
- Team, Enterprise, API, third-party platform, and Claude Gov usage follows commercial terms and is not used for model training by default.

That distinction matters because Claude Code inherits the policy of the account and platform you use.

## Retention basics

The official defaults differ by account type:

- Consumer users:
  - 5 years if data use for improvement is enabled
  - 30 days if it is disabled
- Commercial users:
  - 30 days by default

Local Claude Code clients also store session transcripts locally under `~/.claude/projects/` for 30 days by default so sessions can be resumed. That local cleanup period can be adjusted.

## Local vs cloud execution

### Local Claude Code

When Claude Code runs locally:

- prompts and model outputs are sent over the network
- traffic is encrypted in transit with TLS
- data is not encrypted at rest by Anthropic's standard API statement on this page
- local transcripts remain on the machine for session resumption

### Claude Code on the web

When Claude Code runs on the web:

- the repository is cloned into an Anthropic-managed isolated VM
- code and session data follow the same account-type retention policy
- GitHub auth is handled through a secure proxy
- outbound network traffic goes through Anthropic security controls

## Telemetry and optional logging

The docs also distinguish between:

- normal product data flow
- operational telemetry
- feedback submission

Key defaults:

- Statsig telemetry can be disabled with `DISABLE_TELEMETRY`
- Sentry error reporting can be disabled with `DISABLE_ERROR_REPORTING`
- `/feedback` can be disabled with `DISABLE_FEEDBACK_COMMAND=1`

For Bedrock, Vertex, and Foundry, nonessential telemetry is off by default.

## What to review before rollout

Before enabling Claude Code broadly, confirm:

- account type and training policy
- retention defaults
- whether local transcript storage is acceptable
- whether web sessions are allowed
- telemetry and feedback opt-out posture
- third-party integrations such as MCP servers or gateways

## Relationship to ZDR

If you need stronger guarantees than standard commercial retention, read the ZDR guide next. ZDR for Claude Code is an Enterprise feature on Anthropic's direct platform and does not automatically apply to Bedrock, Vertex, or Foundry.

## Related links

- [Official data usage docs](https://code.claude.com/docs/ko/data-usage)
- [Zero Data Retention](./zero-data-retention.md)
- [Monitoring Usage](./monitoring-usage.md)
- [Legal and compliance](https://code.claude.com/docs/ko/legal-and-compliance)
