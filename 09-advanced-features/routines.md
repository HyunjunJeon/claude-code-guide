# Routines

Routines are Claude Code's cloud-run automation surface. The official docs describe them as saved Claude Code configurations that package a prompt, one or more repositories, and a set of connectors, then run automatically from Anthropic-managed cloud infrastructure.

The current official page title is `Automate work with routines`, even though the docs map still places the topic under `web-scheduled-tasks`.

## When To Use Routines

Use routines when work should continue even while your laptop is closed. Good fits include:

- nightly pull request review
- scheduled backlog triage
- docs drift detection
- deploy verification triggered by an API call
- GitHub event driven maintenance or code generation

Routines are best for unattended, repeatable tasks with a clear outcome.

## What A Routine Contains

The official docs treat a routine as a saved configuration made of:

- prompt
- selected model
- one or more GitHub repositories
- environment configuration
- included connectors
- one or more triggers

Each run starts a new cloud session. Claude can run shell commands, use repository-committed skills, and call the connectors you include.

## How Routines Differ From Desktop Scheduled Tasks

This distinction is easy to blur, but the official docs are explicit:

- routines run on Anthropic-managed cloud infrastructure
- they keep working while your computer is off
- they operate on fresh clones, not your current local checkout
- they do not show a permission-mode picker and do not stop for approval prompts

By contrast, Desktop local scheduled tasks run on your machine and can access local files, but only while the app is open and the machine is awake.

## Create A Routine

The official docs support creating routines from three surfaces:

- web
- CLI
- Desktop app

All three write to the same cloud account.

### From The Web

The documented flow is:

1. open `claude.ai/code/routines`
2. click `New routine`
3. name the routine and write a self-contained prompt
4. select repositories
5. configure environment and connectors
6. add triggers
7. create the routine

The prompt matters more here than in an interactive session because the run is autonomous. Be explicit about success criteria, output expectations, and side effects such as PR creation or Slack posting.

### From The CLI

The official command surface is `/schedule`.

Examples documented by Anthropic:

- `/schedule`
- `/schedule daily PR review at 9am`
- `/schedule list`
- `/schedule update`
- `/schedule run`

The CLI can create scheduled routines and manage existing ones. For API and GitHub trigger configuration, the official docs currently point you back to the web UI.

### From Desktop

Open the `Schedule` page, click `New task`, then choose `New remote task`. Desktop shows both local tasks and routines together, but the remote option writes to the same cloud routine system used by the web app.

## Trigger Types

A routine can have one or more triggers, and the official docs currently cover three:

### Schedule Trigger

Runs on a recurring cadence such as hourly, daily, weekdays, or weekly. Times are entered in your local zone and converted automatically. The docs note that runs may begin a few minutes late due to stagger, but the offset remains consistent for that routine.

The minimum supported interval is one hour. For more specific timing, start with a preset and then refine with `/schedule update`.

### API Trigger

An API trigger gives the routine its own authenticated HTTP endpoint. Posting to it with the routine bearer token starts a new session and returns a session URL.

This is the official fit for:

- alerting systems
- deploy pipelines
- internal tools
- on-demand automation from other services

The current docs note that token generation and revocation are handled from the web UI.

### GitHub Trigger

GitHub triggers let routines react to repository events such as pull requests or releases. This is useful for review automation, post-merge maintenance, release checks, and similar repository-native workflows.

## Execution Model And Scope

Routines execute as full cloud Claude Code sessions. Important implications from the official docs:

- there are no approval prompts during a run
- GitHub actions and connector actions happen as your linked identity
- routines belong to your individual `claude.ai` account, not a shared team object
- daily run allowances apply at the account level

Because the routine acts with your linked accounts, scope access tightly:

- only include repositories it truly needs
- only include connectors it must call
- choose an environment with the smallest workable network surface
- allow branch push only when the workflow genuinely needs it

## Managing Runs

The routine detail page lets you:

- inspect repositories, prompt, triggers, and connectors
- run immediately with `Run now`
- pause or resume a schedule
- edit the routine
- inspect past runs as full sessions

Each run opens as a normal Claude Code session, so you can review changes, continue the conversation, or create a pull request from the result.

## Practical Design Advice

### Write Self-Contained Prompts

Routines are autonomous. Do not depend on unstated human judgment mid-run.

### Scope Connectors Conservatively

The docs say all connected MCP connectors are included by default during creation. Remove the ones the routine does not need.

### Expect Fresh Clones

If the workflow assumes generated artifacts, branch conventions, setup steps, or repo-local skills, make those explicit in the repository or the environment.

## Official References

- Routines: `https://code.claude.com/docs/ko/web-scheduled-tasks`
- Web quickstart: `https://code.claude.com/docs/ko/web-quickstart`
- Desktop scheduled tasks: `https://code.claude.com/docs/ko/desktop-scheduled-tasks`

