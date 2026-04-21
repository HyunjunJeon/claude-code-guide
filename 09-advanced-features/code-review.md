# Code Review

Claude Code Code Review lets teams run managed pull request review on Anthropic infrastructure and receive inline findings directly on GitHub pull requests. It is a hosted review workflow, not a local CLI command, and it is designed to surface correctness bugs, security issues, and regressions without replacing your existing reviewer process.

## Overview

Officially, Code Review is a research preview for Team and Enterprise plans. It is not available when Zero Data Retention is enabled for the organization.

What the feature does:

- reviews GitHub pull requests against the diff and surrounding repository context
- posts inline comments on the exact changed lines where issues were found
- writes a neutral `Claude Code Review` check run alongside your normal CI
- supports automatic or manual triggering
- can be tuned with `CLAUDE.md` and `REVIEW.md`

Code Review does not approve or block pull requests by itself. The output is advisory, and branch protection remains under your control.

## How Reviews Work

When a review starts, Claude runs a multi-agent analysis pipeline against the pull request diff and relevant repository context. Different agents look for different classes of problems, then a verification step filters noisy or weak candidates before findings are posted back to GitHub.

The official severity buckets are:

- `Important`: a bug that should be fixed before merge
- `Nit`: minor issue worth fixing but not usually blocking
- `Pre-existing`: an issue that already existed outside the PR

If no issues are found, Claude posts a short confirmation instead of inline findings.

## Setup Flow

An administrator enables Code Review once for the organization.

1. Open `claude.ai/admin-settings/claude-code`.
2. In the Code Review section, start setup.
3. Install the Claude GitHub App.
4. Grant repository access to the repositories you want reviewed.
5. Choose the review behavior per repository.

The GitHub App installation requests repository permissions broad enough to support review and related integrations, including read/write access for contents, issues, and pull requests.

## Trigger Modes

Each repository can be configured with one of three review modes:

- `Once after PR creation`: run when the PR opens or becomes ready for review
- `After every push`: re-review the PR on each push
- `Manual`: run only when someone explicitly requests review

Manual review commands:

- `@claude review`: run now and subscribe the PR to future push-triggered reviews
- `@claude review once`: run only one review for the current state

To work reliably, the command should be posted as a top-level PR comment, not as an inline reply.

## Customizing Review Behavior

Claude reads two repository files for guidance:

- `CLAUDE.md`: shared project instructions used across Claude Code workflows
- `REVIEW.md`: review-only instructions injected with higher priority into the review pipeline

Practical guidance:

- keep `CLAUDE.md` for broad engineering rules that should also affect interactive sessions
- use `REVIEW.md` for review-specific severity rules, exceptions, and formatting expectations
- write the actual rules directly in `REVIEW.md`; import expansion is not the point of this file

Use these files to narrow noise, redefine what counts as important for your repository, or teach Claude about domain-specific correctness rules.

## Check Run and Automation

Every run creates a `Claude Code Review` check run. Even if GitHub cannot place every inline comment exactly where you expect, the check run still contains the summary and annotations.

Important operational detail:

- the check run concludes as neutral, so it does not block merges by default
- if you want gating, parse the check output in your own workflow and enforce policy there

This gives teams a path to adopt Claude review gradually without rewriting branch protection on day one.

## Cost and Operational Fit

Review cost scales with PR size and complexity. Official guidance says average reviews complete in roughly tens of minutes, and review behavior directly affects spend:

- one-time review is cheapest
- review-on-every-push gives the fastest feedback loop
- manual mode is best when you want tighter cost control

This is usually the right feature when:

- you want managed review without running Claude inside your own CI runners
- your repos are already on GitHub.com
- you want inline findings and a hosted setup path

Use GitHub Actions or GitLab CI/CD instead when you want Claude to run on your own infrastructure.

## Troubleshooting

### Review did not start

Check that:

- the repository is included in Claude Code admin settings
- the Claude GitHub App was installed on that repository
- the PR is open
- the repository's trigger mode matches what you expected

If you are in Manual mode, add `@claude review` or `@claude review once` as a top-level PR comment.

### Review failed or timed out

Failed runs are best-effort and do not block merges. The standard recovery path is to retrigger the review with `@claude review once` or push a new commit if the repository is already subscribed to push-triggered reviews.

### Findings are not appearing as inline comments

Open the `Claude Code Review` check run details. The check output and annotations may still include the findings even if GitHub rejected inline placement on a moved or outdated diff line.

### Review is noisy

Tighten `CLAUDE.md` and add a focused `REVIEW.md` that defines what should count as an important finding versus a nit for your repository.

## Related Links

- [Official Code Review docs](https://code.claude.com/docs/ko/code-review)
- [Claude Code GitHub Actions](https://code.claude.com/docs/ko/github-actions)
- [Claude Code GitHub Enterprise Server](https://code.claude.com/docs/ko/github-enterprise-server)
- [Claude Code GitLab CI/CD](https://code.claude.com/docs/ko/gitlab-ci-cd)
- [Zero Data Retention](../11-deployment-admin/zero-data-retention.md)
- [Store instructions and memories](../02-memory/README.md)
