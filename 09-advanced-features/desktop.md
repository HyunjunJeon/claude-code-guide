# Use Claude Code Desktop

Claude Code Desktop gives Claude Code a graphical workspace for running and reviewing multiple sessions side by side. It is the official surface for users who want local file access, visual diff review, live preview, and scheduling without living in the terminal full time.

## What Desktop Adds

The official desktop quickstart highlights these Desktop-specific capabilities:

- Sidebar for parallel sessions
- Drag-and-drop layout
- Integrated terminal and file editor
- Visual diff review
- Live app preview
- GitHub pull request monitoring with auto-merge
- Scheduled tasks

Desktop is local-first by default, but it also exposes remote routines in the same scheduling surface.

## The Three Main Tabs

The official quickstart presents Desktop as three coordinated tabs:

- `Code`: run Claude Code sessions and review changes
- `Cowork`: non-code collaboration space for research and planning
- `Schedule`: manage recurring local tasks and remote routines

This separation matters because not every request becomes a coding session. Desktop can route work through Dispatch and only escalate to Code when the task is actually software development.

## Start A Local Coding Session

### 1. Open A Folder

Choose the local project folder you want Claude to work in.

### 2. Pick The Mode

Desktop sessions expose a mode selector beside the prompt box. The reference page emphasizes that you can change this during the session.

Common choices:

- `Ask permissions`: safest starting point for new users
- `Auto accept edits`: Claude can apply edits and common filesystem operations without stopping
- `Plan`: Claude proposes an approach before changing files

The exact set depends on session type and environment, but the local Desktop experience is broader than the web-only cloud modes.

### 3. Give Claude The Right Context

The official reference calls out two prompt-context tools:

- `@mention` files to attach local files to the session context
- file attachments for images, PDFs, and similar artifacts

`@mention` is not available in remote sessions. That distinction matters when comparing Desktop local sessions with cloud routines or web sessions.

## Work With Code Effectively

Desktop is strongest when you use the UI features intentionally:

### Prompt Box

Send work in natural language, interrupt Claude mid-run when needed, and redirect the task in place. The official docs note that Claude adjusts based on follow-up input instead of forcing a new session each time.

### Diff Review

Use Desktop when visual review matters. It is designed for seeing edits clearly before you accept or ship them.

### Integrated Terminal

Desktop keeps shell output close to the coding conversation, which is useful for builds, tests, and debugging loops.

### Live Preview

For app work, the live preview reduces context switching between code changes and visual verification.

## Permission Modes In Practice

The desktop reference explains the permission model as a control over edits, commands, or both. Practical guidance:

- Start with `Ask permissions` when exploring an unfamiliar repo
- Move to `Auto accept edits` when file churn is high but command risk still matters
- Use `Plan` when the task is ambiguous and you want the approach first

For repeatable workflows, teach Claude through stable prompts and repo-local instructions instead of relying only on manual approvals.

## Dispatch And Remote Control

Desktop is tied into the broader Claude app experience:

- You can explicitly ask Dispatch to open a Code session
- Dispatch can decide that a task is development work and spawn one automatically
- Push notifications can tell you when a task finishes or needs input

This makes Desktop useful as an orchestration surface, not just a local editor replacement.

## Pull Requests And CI

The official quickstart explicitly calls out PR monitoring and auto-merge support. The intended workflow is:

1. Let Claude prepare or update a branch
2. Open a PR
3. Watch CI results inside Desktop
4. Let Claude fix failures or merge once checks pass, when configured

Use this when you want a tighter review loop than switching between terminal, browser, and notifications manually.

## Scheduled Work

Desktop includes a `Schedule` tab that can manage:

- local scheduled tasks that run on your machine
- remote routines that run on Anthropic-managed infrastructure

This is the key distinction:

- local scheduled tasks have access to local files and tools, but require the app to be open and the machine awake
- remote routines keep running when the machine is off, but operate on fresh cloud clones rather than your current local checkout

## When Desktop Is The Right Choice

Choose Desktop when you need one or more of these:

- local repository access
- visual review of diffs
- integrated preview and terminal
- multiple parallel sessions in one UI
- scheduling from a GUI instead of a pure CLI workflow

Choose the web product when cloud execution and GitHub-first branching matter more than local state. Choose the terminal when you want the most direct control and the smallest interface surface.

## Official References

- Desktop quickstart: `https://code.claude.com/docs/ko/desktop-quickstart`
- Desktop reference: `https://code.claude.com/docs/ko/desktop`
- Desktop scheduled tasks: `https://code.claude.com/docs/ko/desktop-scheduled-tasks`

