# GitHub Actions

Claude Code GitHub Actions runs Claude inside GitHub Actions workflows so you can automate implementation, issue triage, review tasks, and repository operations on your own GitHub runners. Unlike hosted Code Review, this path keeps execution inside GitHub Actions and is the better fit when you want CI-native control over triggers, credentials, and workflow logic.

## Overview

The official integration centers on `anthropics/claude-code-action@v1`.

Typical use cases:

- respond to `@claude` mentions on issues and pull requests
- turn issues into working pull requests
- run scheduled maintenance or reporting jobs
- implement repository-specific automation with prompts and CLI arguments

Key official characteristics:

- setup can start from the CLI via `/install-github-app`
- Claude follows repository instructions from `CLAUDE.md`
- your code stays on GitHub's runners
- direct Claude API, AWS Bedrock, and Google Vertex AI are all supported

## Quick Setup

The fastest setup path is to open Claude Code locally and run:

```bash
/install-github-app
```

That guided flow installs the GitHub App and helps you configure the required secrets.

Important constraints from the official docs:

- you need repository admin permission
- the quick installer path is for direct Claude API users
- Bedrock and Vertex setups require provider-specific authentication instead of the direct API key path

## Basic Workflow Shape

The v1 action uses a simplified interface built around:

- `prompt`: instructions for Claude
- `claude_args`: CLI flags forwarded to Claude Code
- `anthropic_api_key`: required for direct Claude API usage
- optional GitHub and provider-specific settings

Minimal example:

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    prompt: "Review this pull request for correctness and security issues"
    claude_args: "--max-turns 5"
```

For issue and PR comment workflows, Claude can also react to `@claude` mentions automatically when the app and workflow are configured correctly.

## When to Use GitHub Actions vs Code Review

Use GitHub Actions when:

- you want Claude to execute on GitHub infrastructure you already govern
- you need custom workflow triggers beyond managed review
- you want Claude to write code, open PRs, respond to issues, or run scheduled tasks
- you need Bedrock or Vertex-backed execution in CI

Use managed Code Review when:

- you only need hosted PR review findings
- you want the simplest admin-managed rollout for pull request review

The two features complement each other. Code Review is hosted review infrastructure. GitHub Actions is programmable CI automation.

## Best Practices

### Keep `CLAUDE.md` Tight

Store coding rules, architectural constraints, and repository conventions in `CLAUDE.md`. Claude Code Actions uses that file as part of its working context, so concise and durable instructions produce better results than long policy dumps.

### Control Scope with `claude_args`

Use CLI flags to bound cost and runtime. Common examples:

- `--max-turns` to cap back-and-forth work
- model selection when your workflow requires a specific model profile
- allowed or disallowed tools when tightening execution boundaries

### Prefer Explicit Triggers

For expensive jobs, use event filters, branch filters, or GitHub concurrency controls so multiple long-running Claude jobs do not pile up unnecessarily.

### Review Claude's Commits Like Human Contributions

Even though execution happens in automation, treat the produced code as normal reviewable output. Keep branch protection, tests, and approvals in place.

## Bedrock and Vertex AI

GitHub Actions can run Claude Code with AWS Bedrock or Google Vertex AI for enterprise environments that need cloud-provider-native identity, billing, or regional control.

Operationally, this means:

- no direct `ANTHROPIC_API_KEY` path for those workflows
- credentials and secrets must match the provider configuration used in the workflow
- region and model availability still need to line up with the selected provider

If your organization has already standardized on provider-based auth, this is the CI path that usually aligns best with internal controls.

## Migration Notes for v1

If you still have beta workflows, the official v1 release requires cleanup:

- move from `@beta` to `@v1`
- replace older prompt inputs with `prompt`
- move CLI-style settings into `claude_args`
- remove old mode configuration because mode is auto-detected

This is worth fixing early because old examples age badly and create confusing CI failures.

## Troubleshooting

### Claude does not respond to `@claude`

Check all of the following:

- the GitHub App is installed correctly
- the workflow is enabled for the event you expect
- the repository secret is present if you use direct Claude API
- the comment actually uses `@claude`, not `/claude`

### CI does not run on Claude's commits

Confirm that:

- you are using the GitHub App or a custom app, not the plain Actions user path
- workflow triggers include the needed push or pull request events
- app permissions allow the CI behavior you expect

### Authentication errors

For direct API:

- confirm `ANTHROPIC_API_KEY` exists and is valid

For Bedrock or Vertex:

- verify credentials and secret names
- verify provider auth wiring
- verify region and model availability

## Related Links

- [Official GitHub Actions docs](https://code.claude.com/docs/ko/github-actions)
- [Claude Code Action repository](https://github.com/anthropics/claude-code-action)
- [Official Code Review docs](https://code.claude.com/docs/ko/code-review)
- [AWS Bedrock](../11-deployment-admin/amazon-bedrock.md)
- [Google Vertex AI](../11-deployment-admin/google-vertex-ai.md)
- [Store instructions and memories](../02-memory/README.md)
