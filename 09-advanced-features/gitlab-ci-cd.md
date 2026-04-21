# GitLab CI/CD

Claude Code GitLab CI/CD integrates Claude into GitLab pipelines so teams can automate issue handling, merge request work, and guided implementation on GitLab-controlled runners. It is a CI-based integration maintained by GitLab and is currently documented as beta.

## Overview

The official docs position this feature as a way to run Claude inside GitLab CI jobs with event-driven orchestration and provider flexibility.

Core ideas from the current documentation:

- GitLab events or manual jobs trigger Claude work
- each run executes inside a containerized CI environment
- Claude writes inside workspace-scoped limits
- output still flows through merge requests so human review remains in place
- Claude API, AWS Bedrock, and Google Vertex AI are supported

This path is the right fit when your organization already centers its SDLC around GitLab rather than GitHub.

## How It Works

At a high level:

1. GitLab captures an event such as a merge request comment or manual pipeline run.
2. The job gathers context from the repository and discussion thread.
3. Claude Code runs inside the CI container with controlled tools and permissions.
4. Claude proposes changes through normal GitLab review flows.

The official docs emphasize isolated execution, restricted writes, and MR-based review rather than direct, invisible mutation of the default branch.

## Setup Patterns

### Quick Setup

The fastest path is to add a Claude job to `.gitlab-ci.yml`, install Claude Code during the job, provide the needed credentials, and then run the job manually or from merge request context.

The official example pattern includes:

- installing Claude in `before_script`
- optionally starting a GitLab MCP server
- passing a prompt with `claude -p`
- using `--permission-mode acceptEdits`
- explicitly setting `--allowedTools`

### Production-Oriented Setup

For longer-term use, treat the pipeline job like any other privileged automation:

- use masked CI/CD variables
- keep prompts and repository rules under version control
- define strict runner, timeout, and network behavior
- prefer cloud-provider identity federation instead of long-lived secrets when possible

## Provider Options

### Claude API

The simplest path uses `ANTHROPIC_API_KEY` as a CI/CD variable.

### AWS Bedrock

The official guidance prefers OIDC-based IAM role assumption rather than static credentials. Required setup includes:

- Bedrock access for the target Claude models
- a GitLab OIDC provider in AWS
- an IAM role trusted by that provider
- least-privilege permissions for Bedrock invocation

Typical variables:

- `AWS_ROLE_TO_ASSUME`
- `AWS_REGION`

### Google Vertex AI

The official guidance uses Workload Identity Federation instead of downloaded keys.

Typical prerequisites:

- Vertex AI API enabled
- GitLab OIDC trusted by Google Cloud
- a dedicated service account with required Vertex roles

Typical variables:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`

## Best Practices

### Keep `CLAUDE.md` Focused

The official docs explicitly call out `CLAUDE.md` as a primary way to steer behavior. Keep it concise, durable, and specific to repository conventions.

### Bound Runtime and Spend

Reduce surprise by controlling:

- `max_turns`
- job timeout
- runner concurrency
- prompt scope

### Treat Claude Output as Normal MR Output

Claude-generated changes should still pass through your normal merge request review, approvals, and branch protection rules.

### Avoid Long-Lived Secrets

Prefer GitLab CI/CD variables and provider-native federation for AWS or GCP rather than embedding credentials in the repository.

## Security and Governance

The official docs emphasize these guardrails:

- jobs run in isolated containers
- network access can be restricted by runner policy
- writes are workspace-scoped
- changes flow through merge requests for inspection
- standard GitLab approval and branch protection controls still apply

This is the right mental model: Claude is operating inside your CI governance, not bypassing it.

## Costs and Performance

Two cost surfaces matter:

- GitLab runner compute minutes
- Claude model token usage

Operational guidance from the official docs:

- use specific prompts instead of broad open-ended asks
- set sensible timeouts
- limit concurrency
- keep context and `CLAUDE.md` focused to reduce wasted turns

## Troubleshooting

### Claude does not respond to `@claude`

Check whether the relevant event wiring exists in your GitLab setup and whether the job receives the expected issue or MR context.

### Job cannot write comments or open merge requests

Check all of the following:

- `CI_JOB_TOKEN` has enough permissions, or use a project access token with `api` scope
- the `mcp__gitlab` tool is included in `--allowedTools`
- the job is running with enough MR or thread context

### Authentication errors

For direct API:

- verify `ANTHROPIC_API_KEY` is valid and current

For Bedrock or Vertex:

- verify OIDC or WIF configuration
- verify impersonation or role assumption wiring
- verify region and model availability

## Related Links

- [Official GitLab CI/CD docs](https://code.claude.com/docs/ko/gitlab-ci-cd)
- [AWS Bedrock](../11-deployment-admin/amazon-bedrock.md)
- [Google Vertex AI](../11-deployment-admin/google-vertex-ai.md)
- [Store instructions and memories](../02-memory/README.md)
