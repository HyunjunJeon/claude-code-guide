# `/ultrareview`

`/ultrareview` runs a deep remote code review in Claude Code's cloud sandbox and returns verified findings back to your CLI session.

## What It Is

Ultrareview is a research-preview review workflow for substantial changes. It launches a remote fleet of reviewer agents, verifies findings independently, and reports only higher-signal bugs instead of ordinary style feedback.

The official docs position it as deeper and slower than local `/review`, with higher confidence before merge.

## Requirements

- Claude Code `v2.1.86` or later
- Claude.ai authentication via `/login`
- a Git repository

It is not available when using:

- Amazon Bedrock
- Google Vertex AI
- Microsoft Foundry

It is also unavailable for organizations with Zero Data Retention enabled.

## How To Run It

Branch review:

```text
/ultrareview
```

This reviews the diff between your current branch and the default branch, including staged and unstaged local changes.

PR review:

```text
/ultrareview 1234
```

PR mode clones the pull request directly from GitHub instead of bundling your local working tree. It requires a `github.com` remote.

If the repository is too large to bundle, Claude Code prompts you to switch to PR mode instead.

## Launch Confirmation

Before the review starts, Claude Code shows:

- the review scope,
- file and line counts for branch review,
- remaining free runs,
- estimated cost.

The command runs only when you explicitly invoke `/ultrareview`. Claude does not start it automatically.

## Cost Model

Ultrareview bills as extra usage, not normal included usage.

Official pricing guidance:

- Pro: `3` one-time free runs, then paid
- Max: `3` one-time free runs, then paid
- Team/Enterprise: no free runs, paid from the start

The official docs say paid reviews typically cost about `$5` to `$20`, depending on change size.

If extra usage is disabled, Claude Code blocks launch and directs you to billing settings. You can also inspect this with `/extra-usage`.

## Runtime Behavior

Ultrareview runs as a background task and usually takes roughly `5` to `10` minutes. You can keep working while it runs.

Use `/tasks` to:

- monitor progress,
- open review details,
- stop a running review.

If you stop the review, the cloud session is archived and no partial findings are returned.

## `/review` vs `/ultrareview`

| Command | Best for | Runtime | Cost |
|---|---|---|---|
| `/review` | quick iteration while coding | local, seconds to minutes | normal usage |
| `/ultrareview` | deeper pre-merge bug finding | remote, about 5 to 10 minutes | extra usage |

Use `/review` for fast local feedback. Use `/ultrareview` before merge when the change is substantial enough to justify a deeper pass.

## When To Use It

Good fit:

- large PRs,
- risky refactors,
- high-confidence pre-merge review,
- bug hunting where a single local pass may miss issues.

Poor fit:

- tiny diffs,
- quick iteration while still editing,
- environments without Claude.ai web-backed auth.

## Common Pitfalls

- expecting it to behave like `/review` with no cost or latency difference,
- forgetting that PR mode needs a GitHub remote,
- starting paid reviews without checking extra-usage settings,
- assuming partial output survives if the background task is stopped.

## Related Guides

- [Code Review](../09-advanced-features/code-review.md)
- [Web Quickstart](../09-advanced-features/web-quickstart.md)
- [Ultraplan](./ultraplan.md)

## Official Source

- [Find bugs with ultrareview](https://code.claude.com/docs/ko/ultrareview)
