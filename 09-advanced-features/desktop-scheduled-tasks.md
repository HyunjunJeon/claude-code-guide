# Desktop Scheduled Tasks

Desktop scheduled tasks let Claude Code start new sessions on a recurring cadence from your machine. Use them for work that must touch local files, local tools, or local credentials, but can still run without manual prompting every time.

## What They Are For

The official docs frame Desktop scheduled tasks around repeatable jobs such as:

- daily code review
- dependency update checks
- morning briefings that pull from connected tools

Each run creates a fresh session automatically at the time you choose.

## Compare The Three Scheduling Options

Claude Code officially documents three different ways to schedule work:

| Option | Runs where | Requires machine on | Requires open session | Local file access | Minimum interval |
| --- | --- | --- | --- | --- | --- |
| Routines | Anthropic cloud | No | No | No, fresh clone | 1 hour |
| Desktop scheduled tasks | Your machine | Yes | No | Yes | 1 minute |
| `/loop` | Current session on your machine | Yes | Yes | Yes | 1 minute |

The selection rule is simple:

- choose `Routines` for unattended cloud execution
- choose `Desktop scheduled tasks` for recurring local automation
- choose `/loop` for temporary polling or reminders inside an active session

## Local Vs Remote Tasks In Desktop

The Schedule page can show both:

- `Local tasks`: run on your machine and can access your files and tools
- `Remote tasks`: cloud routines that keep running while your machine is off

Do not confuse them. A local task is not a cloud routine, even though Desktop presents both in one grid.

## Create A Scheduled Task

The official Desktop docs support conversational creation, but the core flow is:

1. Open the `Schedule` page
2. Click `New task`
3. Choose `New local task` for a machine-local scheduled task
4. Define the prompt, folder, schedule, and permission mode
5. Save it and run it once immediately to validate permissions

That last step matters. If a task is blocked by permissions later, you want to discover that before the first unattended run.

## Frequency Options

The official page lists these built-in schedule presets:

- `Manual`
- `Hourly`
- `Daily`
- `Weekdays`
- `Weekly`

When the picker is not enough, you can ask Claude in a Desktop session to change the schedule in natural language. The docs explicitly use examples like running tests every six hours.

## How Runs Actually Execute

Important runtime semantics from the official docs:

- Desktop checks schedules every minute while the app is open
- each due task starts a fresh session
- manual sessions stay independent from scheduled runs
- the machine must be awake for local tasks to execute

This means Desktop scheduling is local automation, not guaranteed background infrastructure.

## Missed Runs

If your machine is asleep or the app is closed, the run can be skipped. Review history from the task detail page to see what happened.

That behavior is a major difference from routines, which are designed to continue without your laptop.

## Permissions For Scheduled Tasks

Each Desktop scheduled task has its own permission mode. The official guidance is explicit:

- allow rules from `~/.claude/settings.json` also apply
- if a task runs in `Ask` mode and hits an unapproved tool, it stalls waiting for approval
- the stalled session stays in the sidebar so you can respond later

Operationally, the safest pattern is:

1. create the task
2. click `Run now`
3. watch for permission prompts
4. use `always allow` where appropriate for the recurring workflow

That reduces surprise stalls during unattended execution.

## Manage Tasks

From the task detail page, the official docs say you can:

- run now
- pause or resume repeats
- edit prompt, frequency, folder, and settings
- review history
- review and revoke allowed permissions
- delete the task

You can also manage tasks conversationally from any Desktop session, for example by asking Claude to list, pause, or delete them.

## Edit The Prompt On Disk

The official Desktop page documents the prompt file location:

- `~/.claude/scheduled-tasks/<task-name>/SKILL.md`
- or the equivalent path under `CLAUDE_CONFIG_DIR` if that variable is set

The file uses:

- YAML frontmatter for `name` and `description`
- the prompt body below the frontmatter

The docs also note an important limitation: schedule, folder, model, and enabled state are not stored in that file. Change those through the edit form or by asking Claude.

## Practical Use Cases

Desktop scheduled tasks are a good fit for:

- local test or lint sweeps against an active checkout
- recurring repo hygiene that depends on your workstation setup
- briefings that read from local tools or credentials
- maintenance tasks that need access to uncommitted local work

They are a poor fit for work that must happen reliably while your machine is off.

## Official References

- Desktop scheduled tasks: `https://code.claude.com/docs/ko/desktop-scheduled-tasks`
- Routines: `https://code.claude.com/docs/ko/web-scheduled-tasks`
- CLI scheduled tasks and `/loop`: `https://code.claude.com/docs/ko/scheduled-tasks`

