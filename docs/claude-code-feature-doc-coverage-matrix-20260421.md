# Claude Code Feature-Doc Coverage Matrix

- Created: 2026-04-21
- Official source baseline: `Claude code docs map` updated 2026-04-20 21:18:54 UTC
- Scope note: `JetBrains IDEs` is intentionally tracked as `out-of-scope`; see `docs/SCOPE-DECISION-20260421.md`

## Status vocabulary

- `covered`: current repo has a dedicated page or sufficiently complete coverage
- `partial`: repo covers part of the topic, but depth or page-level parity is incomplete
- `missing`: no meaningful user-facing coverage yet
- `out-of-scope`: official page intentionally excluded from the current parity target

## Getting started

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `overview` | `partial` | `README.md`, `INDEX.md`, `10-cli/README.md` | General orientation exists, but not as a dedicated page |
| `quickstart` | `covered` | `10-cli/quickstart.md`, `ko/10-cli/quickstart.md` | Dedicated EN/KO quickstart guide added |
| `changelog` | `covered` | `10-cli/changelog.md`, `ko/10-cli/changelog.md` | Practical EN/KO changelog guide added |

## Core concepts

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `how-claude-code-works` | `covered` | `09-advanced-features/how-claude-code-works.md`, `ko/09-advanced-features/how-claude-code-works.md` | Dedicated EN/KO guide added |
| `features-overview` | `covered` | `09-advanced-features/features-overview.md`, `ko/09-advanced-features/features-overview.md` | Dedicated EN/KO guide added |
| `claude-directory` | `covered` | `09-advanced-features/claude-directory.md`, `ko/09-advanced-features/claude-directory.md` | Dedicated EN/KO guide added |
| `context-window` | `covered` | `09-advanced-features/context-window.md`, `ko/09-advanced-features/context-window.md` | Dedicated EN/KO guide added |

## Use Claude Code

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `memory` | `covered` | `02-memory/README.md` | Strong dedicated module |
| `permission-modes` | `covered` | `09-advanced-features/permissions-and-security.md` | Dedicated section with examples |
| `common-workflows` | `covered` | `09-advanced-features/common-workflows.md`, `ko/09-advanced-features/common-workflows.md` | Dedicated EN/KO workflow hub added |
| `best-practices` | `covered` | `09-advanced-features/best-practices.md`, `ko/09-advanced-features/best-practices.md` | Dedicated EN/KO best-practices guide added |

## Platforms and integrations

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `platforms` | `partial` | `09-advanced-features/platforms.md` | Broad hub exists, but too compressed |
| `remote-control` | `covered` | `09-advanced-features/platforms.md` | Dedicated section with commands and limits |
| `chrome` | `covered` | `09-advanced-features/platforms.md` | Dedicated section exists |
| `computer-use` | `covered` | `09-advanced-features/computer-use.md`, `ko/09-advanced-features/computer-use.md` | Dedicated EN/KO pages added |
| `vs-code` | `covered` | `09-advanced-features/vscode.md` | Dedicated page exists |
| `jetbrains` | `out-of-scope` | - | See `docs/SCOPE-DECISION-20260421.md` |
| `slack` | `covered` | `09-advanced-features/slack.md`, `ko/09-advanced-features/slack.md` | Dedicated EN/KO pages added |
| `web-quickstart` | `covered` | `09-advanced-features/web-quickstart.md`, `ko/09-advanced-features/web-quickstart.md` | Dedicated EN/KO quickstart guide added |
| `claude-code-on-the-web` | `covered` | `09-advanced-features/claude-code-on-the-web.md`, `ko/09-advanced-features/claude-code-on-the-web.md` | Dedicated EN/KO web-reference guide added |
| `routines` | `covered` | `09-advanced-features/routines.md`, `ko/09-advanced-features/routines.md` | Dedicated EN/KO routines guide added |
| `ultraplan` | `covered` | `01-slash-commands/ultraplan.md`, `ko/01-slash-commands/ultraplan.md` | Dedicated EN/KO guide added |
| `ultrareview` | `covered` | `01-slash-commands/ultrareview.md`, `ko/01-slash-commands/ultrareview.md` | Dedicated EN/KO guide added |
| `desktop-quickstart` | `covered` | `09-advanced-features/desktop-quickstart.md`, `ko/09-advanced-features/desktop-quickstart.md` | Dedicated EN/KO desktop quickstart guide added |
| `desktop` | `covered` | `09-advanced-features/desktop.md`, `ko/09-advanced-features/desktop.md` | Dedicated EN/KO desktop guide added |
| `desktop-scheduled-tasks` | `covered` | `09-advanced-features/desktop-scheduled-tasks.md`, `ko/09-advanced-features/desktop-scheduled-tasks.md` | Dedicated EN/KO guide added |
| `code-review` | `covered` | `09-advanced-features/code-review.md`, `ko/09-advanced-features/code-review.md` | Dedicated EN/KO guide added |
| `github-actions` | `covered` | `09-advanced-features/github-actions.md`, `ko/09-advanced-features/github-actions.md` | Dedicated EN/KO guide added |
| `github-enterprise-server` | `covered` | `09-advanced-features/github-enterprise-server.md`, `ko/09-advanced-features/github-enterprise-server.md` | Dedicated EN/KO guide added |
| `gitlab-ci-cd` | `covered` | `09-advanced-features/gitlab-ci-cd.md`, `ko/09-advanced-features/gitlab-ci-cd.md` | Dedicated EN/KO guide added |

## Agents

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `sub-agents` | `covered` | `04-subagents/README.md` | Strong dedicated module |
| `agent-teams` | `covered` | `04-subagents/agent-teams.md`, `ko/04-subagents/agent-teams.md` | Dedicated EN/KO agent-teams guide added |

## Tools and plugins

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `mcp` | `covered` | `05-mcp/README.md` | Strong dedicated module |
| `discover-plugins` | `covered` | `07-plugins/discover-plugins.md`, `ko/07-plugins/discover-plugins.md` | Dedicated EN/KO plugin-discovery guide added |
| `plugins` | `covered` | `07-plugins/README.md` | Strong dedicated module |

## Automation

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `hooks` | `covered` | `06-hooks/README.md` | Strong dedicated module |
| scheduled/background automation family | `partial` | `09-advanced-features/execution-modes.md` | Split across execution modes, not mapped page-for-page |

## Deployment

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `amazon-bedrock` | `covered` | `11-deployment-admin/amazon-bedrock.md`, `ko/11-deployment-admin/amazon-bedrock.md` | Dedicated EN/KO provider guide added |
| `google-vertex-ai` | `covered` | `11-deployment-admin/google-vertex-ai.md`, `ko/11-deployment-admin/google-vertex-ai.md` | Dedicated EN/KO provider guide added |
| `microsoft-foundry` | `covered` | `11-deployment-admin/microsoft-foundry.md`, `ko/11-deployment-admin/microsoft-foundry.md` | Dedicated EN/KO provider guide added |
| `network-config` | `covered` | `11-deployment-admin/network-config.md`, `ko/11-deployment-admin/network-config.md` | Dedicated EN/KO network and proxy guide added |
| `llm-gateway` | `covered` | `11-deployment-admin/llm-gateway.md`, `ko/11-deployment-admin/llm-gateway.md` | Dedicated EN/KO gateway guide added |
| `devcontainer` | `covered` | `11-deployment-admin/devcontainer.md`, `ko/11-deployment-admin/devcontainer.md` | Dedicated EN/KO devcontainer guide added |

## Administration

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `server-managed-settings` | `covered` | `11-deployment-admin/server-managed-settings.md`, `ko/11-deployment-admin/server-managed-settings.md` | Dedicated EN/KO admin policy guide added |
| `monitoring-usage` | `covered` | `11-deployment-admin/monitoring-usage.md`, `ko/11-deployment-admin/monitoring-usage.md` | Dedicated EN/KO usage-governance guide added |
| `data-usage` | `covered` | `11-deployment-admin/data-usage.md`, `ko/11-deployment-admin/data-usage.md` | Dedicated EN/KO data-handling guide added |
| `zero-data-retention` | `covered` | `11-deployment-admin/zero-data-retention.md`, `ko/11-deployment-admin/zero-data-retention.md` | Dedicated EN/KO ZDR guide added |
| `iam` | `covered` | `11-deployment-admin/authentication-and-iam.md`, `ko/11-deployment-admin/authentication-and-iam.md` | Dedicated EN/KO authentication and IAM guide added |

## Configuration and reference remainder

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `configuration` | `covered` | `09-advanced-features/configuration.md`, `ko/09-advanced-features/configuration.md` | Dedicated EN/KO configuration guide added |
| `interactive-mode` | `covered` | `10-cli/interactive-mode.md`, `ko/10-cli/interactive-mode.md` | Dedicated EN/KO interactive-mode guide added |
| `tools-reference` | `covered` | `10-cli/tools-reference.md`, `ko/10-cli/tools-reference.md` | Dedicated EN/KO pages added |
| `env-vars` | `covered` | `10-cli/env-vars.md`, `ko/10-cli/env-vars.md` | Dedicated EN/KO environment-variable guide added |
| `errors` | `covered` | `10-cli/errors.md`, `ko/10-cli/errors.md` | Dedicated EN/KO pages added |
| `troubleshooting` | `covered` | `10-cli/troubleshooting.md`, `ko/10-cli/troubleshooting.md` | Dedicated EN/KO pages added |
| `fullscreen-rendering` | `covered` | `09-advanced-features/fullscreen-rendering.md` | Dedicated page exists |
| `terminal-configuration` | `covered` | `09-advanced-features/terminal-configuration.md` | Dedicated page exists |
| `output-styles` | `covered` | `09-advanced-features/output-styles.md` | Dedicated page exists |
| `channels` / `channels-reference` | `covered` | `09-advanced-features/channels-reference.md`, `09-advanced-features/README.md` | Dedicated builder-oriented page exists |

## Agent SDK

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `overview` | `covered` | `12-agent-sdk/overview.md`, `ko/12-agent-sdk/overview.md` | Dedicated EN/KO overview added |
| `agent-loop` | `covered` | `12-agent-sdk/agent-loop.md`, `ko/12-agent-sdk/agent-loop.md` | Dedicated EN/KO guide added |
| `sessions` | `covered` | `12-agent-sdk/sessions.md`, `ko/12-agent-sdk/sessions.md` | Dedicated EN/KO sessions guide added |
| `streaming-vs-single-mode` | `covered` | `12-agent-sdk/streaming-vs-single-mode.md`, `ko/12-agent-sdk/streaming-vs-single-mode.md` | Dedicated EN/KO guide added |
| `user-input` | `covered` | `12-agent-sdk/user-input.md`, `ko/12-agent-sdk/user-input.md` | Dedicated EN/KO guide added |
| `streaming-output` | `covered` | `12-agent-sdk/streaming-output.md`, `ko/12-agent-sdk/streaming-output.md` | Dedicated EN/KO guide added |
| `structured-outputs` | `covered` | `12-agent-sdk/structured-outputs.md`, `ko/12-agent-sdk/structured-outputs.md` | Dedicated EN/KO guide added |
| `custom-tools` | `covered` | `12-agent-sdk/custom-tools.md`, `ko/12-agent-sdk/custom-tools.md` | Dedicated EN/KO custom-tools guide added |
| `mcp` | `covered` | `12-agent-sdk/mcp.md`, `ko/12-agent-sdk/mcp.md` | Dedicated EN/KO guide added |
| `tool-search` | `covered` | `12-agent-sdk/tool-search.md`, `ko/12-agent-sdk/tool-search.md` | Dedicated EN/KO guide added |
| `subagents` | `covered` | `12-agent-sdk/subagents.md`, `ko/12-agent-sdk/subagents.md` | Dedicated EN/KO guide added |
| `modifying-system-prompts` | `covered` | `12-agent-sdk/modifying-system-prompts.md`, `ko/12-agent-sdk/modifying-system-prompts.md` | Dedicated EN/KO guide added |
| `slash-commands` | `covered` | `12-agent-sdk/slash-commands.md`, `ko/12-agent-sdk/slash-commands.md` | Dedicated EN/KO guide added |
| `skills` | `covered` | `12-agent-sdk/skills.md`, `ko/12-agent-sdk/skills.md` | Dedicated EN/KO guide added |
| `plugins` | `covered` | `12-agent-sdk/plugins.md`, `ko/12-agent-sdk/plugins.md` | Dedicated EN/KO guide added |
| `permissions` | `covered` | `12-agent-sdk/permissions.md`, `ko/12-agent-sdk/permissions.md` | Dedicated EN/KO permissions guide added |
| `hooks` | `covered` | `12-agent-sdk/hooks.md`, `ko/12-agent-sdk/hooks.md` | Dedicated EN/KO hooks guide added |
| `file-checkpointing` | `covered` | `12-agent-sdk/file-checkpointing.md`, `ko/12-agent-sdk/file-checkpointing.md` | Dedicated EN/KO guide added |
| `cost-tracking` | `covered` | `12-agent-sdk/cost-tracking.md`, `ko/12-agent-sdk/cost-tracking.md` | Dedicated EN/KO guide added |
| `observability` | `covered` | `12-agent-sdk/observability.md`, `ko/12-agent-sdk/observability.md` | Dedicated EN/KO guide added |
| `todo-tracking` | `covered` | `12-agent-sdk/todo-tracking.md`, `ko/12-agent-sdk/todo-tracking.md` | Dedicated EN/KO guide added |
| `hosting` | `covered` | `12-agent-sdk/hosting.md`, `ko/12-agent-sdk/hosting.md` | Dedicated EN/KO guide added |
| `secure-deployment` | `covered` | `12-agent-sdk/secure-deployment.md`, `ko/12-agent-sdk/secure-deployment.md` | Dedicated EN/KO guide added |
| `typescript` | `covered` | `12-agent-sdk/typescript.md`, `ko/12-agent-sdk/typescript.md` | Dedicated EN/KO guide added |
| `typescript-v2-preview` | `covered` | `12-agent-sdk/typescript-v2-preview.md`, `ko/12-agent-sdk/typescript-v2-preview.md` | Dedicated EN/KO guide added |
| `python` | `covered` | `12-agent-sdk/python.md`, `ko/12-agent-sdk/python.md` | Dedicated EN/KO guide added |
| `migration-guide` | `covered` | `12-agent-sdk/migration-guide.md`, `ko/12-agent-sdk/migration-guide.md` | Dedicated EN/KO guide added |

## What's New and Resources

| Official page | Status | Current repo coverage | Notes |
|---|---|---|---|
| `whats-new` | `covered` | `WHATS-NEW.md` | Root digest guide added with latest official weekly summaries |
| `legal-and-compliance` | `covered` | `LEGAL-AND-COMPLIANCE.md` | Root legal/compliance summary added with official links |
| resources family | `partial` | `resources.md`, `resources/README.md` | General resources exist, but not aligned to official docs families |

## Current closure priorities

The highest-priority blockers for practical parity are:

1. split broader hub pages that remain `partial`, especially `platforms`
2. map the scheduled/background automation family more explicitly against official pages
3. align the resources family more tightly to official docs families
4. keep `whats-new` current as new weekly digests are published
5. refresh the matrix when the official docs map adds, removes, or renames pages
