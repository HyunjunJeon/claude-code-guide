# `/ultraplan`

`/ultraplan` sends planning work from your local CLI to Claude Code on the web, lets you review the plan in a browser, and then execute it either in the cloud or back in your terminal.

## What It Is

Ultraplan is a research-preview planning workflow for large or ambiguous tasks. Instead of drafting the entire plan inside the terminal, Claude creates the plan in a remote web session with a richer review surface.

The official docs position it as the planning counterpart to `/ultrareview`.

## Requirements

- Claude Code `v2.1.91` or later
- a Claude Code on the web account
- a GitHub repository

Because it runs on Anthropic cloud infrastructure, it is not available with:

- Amazon Bedrock
- Google Vertex AI
- Microsoft Foundry

It also uses your account's default cloud environment and creates one automatically on first launch if needed.

## How To Launch It

You can start ultraplan in three ways:

1. Run `/ultraplan <prompt>`
2. Mention the word `ultraplan` in a normal prompt
3. From a local plan approval dialog, choose the web-based refine option

Example:

```text
/ultraplan migrate the auth service from sessions to JWTs
```

## Status Flow In The CLI

After launch, the terminal shows a background status indicator:

- `◇ ultraplan`: Claude is researching and drafting
- `◇ ultraplan needs your input`: Claude needs clarification
- `◆ ultraplan ready`: the plan is ready in the browser

Use `/tasks` to inspect the active ultraplan task, open the session link, or stop it. Stopping archives the cloud session and clears the status indicator.

## Review In The Browser

When the plan is ready, open the web session and review it there. The official review view supports:

- inline comments on specific sections
- emoji reactions
- an outline sidebar for navigation

This is the main value of ultraplan: you can refine the structure of the plan before any implementation starts.

## Choose Where To Execute

Once the plan is good enough, you have two execution paths.

### Execute On The Web

Approve the plan and continue coding in the same cloud session. This is best when the repo, environment, and permissions already fit the web workflow.

### Send The Plan Back To The Terminal

Approve the plan and teleport it back to your local CLI. The terminal then offers:

- `Implement here`
- `Start new session`
- `Cancel` and save the plan to a file

If you start a new session, Claude prints a `claude --resume` command so you can get back to your earlier conversation later.

## When To Use It

Use `/ultraplan` when:

- the task is large and needs review before coding,
- you want section-level comments on the plan,
- the terminal planning flow feels too cramped,
- you are deciding between local execution and remote execution.

Stay with normal local planning when the task is small or the browser review loop would add more overhead than value.

## Common Pitfalls

- expecting ultraplan to work without a GitHub-backed web setup,
- forgetting that Remote Control disconnects when ultraplan starts,
- assuming the cloud session can use Bedrock, Vertex, or Foundry credentials,
- treating browser approval as minor UX rather than the main review step.

## Related Guides

- [Web Quickstart](../09-advanced-features/web-quickstart.md)
- [Planning and Thinking](../09-advanced-features/planning-and-thinking.md)
- [Ultrareview](./ultrareview.md)

## Official Source

- [Plan in the cloud with ultraplan](https://code.claude.com/docs/ko/ultraplan)
