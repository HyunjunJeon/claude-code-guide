# Get Started With Claude Code On The Web

Claude Code on the web runs development sessions from `claude.ai/code` on Anthropic-managed cloud infrastructure. It is the right surface when you want Claude to work against GitHub repositories without depending on your laptop staying online.

## When To Use The Web

Use the web surface when you need:

- Cloud-hosted sessions that continue after you disconnect
- One branch per task, with isolated sessions for parallel work
- A browser-first workflow for starting work from issues, PRs, or links
- A consistent environment shared across multiple repositories

Prefer the Desktop app when you need direct access to your local checkout. Prefer the terminal when you want full control over local tools, prompts, and config files.

## How The Web Surface Differs

The official quickstart compares the main surfaces this way:

| Surface | Where code runs | Local config | GitHub required | Permission modes |
| --- | --- | --- | --- | --- |
| Web | Anthropic cloud VM | No, repository only | Yes, unless you bundle a local repo with `--remote` | `Auto accept edits`, `Plan` |
| Desktop local session | Your machine | Yes | No | Depends on session type |
| Terminal CLI | Your machine | Yes | No | Full local set |

Important constraints from the official docs:

- Web sessions work from existing GitHub repositories.
- Each task gets its own session and its own branch.
- Cloud sessions do not offer `Ask permissions`, `Auto mode`, or `Bypass permissions`.
- Network access is controlled by the selected cloud environment, not by your machine.

## One-Time Setup

### 1. Sign in at `claude.ai/code`

Open `https://claude.ai/code` and sign in with your Anthropic account.

### 2. Connect GitHub

Install the Claude GitHub App and grant it access to the repositories Claude should use. If you want Claude to start work in a new project, create an empty GitHub repository first.

### 3. Create A Cloud Environment

The environment defines what Claude can reach and how each new session boots.

Core fields called out in the official quickstart:

- `Name`: display label for the environment
- `Network access`: controls what internet destinations Claude can reach
- `Setup script`: commands that run before work begins
- Environment variables and related settings as configured in the environment UI

The default trusted network profile allows common package registries while still blocking general internet access. Treat the setup script as part of your runtime contract: install dependencies, generate needed artifacts, and fail fast if bootstrapping is incomplete.

## Start Your First Session

### 1. Choose Repositories

Pick one or more GitHub repositories. Claude clones them into the cloud session before it begins work.

### 2. Choose A Permission Mode

The web quickstart currently documents two modes:

- `Auto accept edits`: Claude can edit files and push a branch without stopping for approval
- `Plan`: Claude proposes an approach and waits for your go-ahead before editing

Because cloud sessions are autonomous by design, there is no `Ask permissions` mode on the web.

### 3. Write A Precise Prompt

The official guidance is straightforward: name the file or function, paste errors when relevant, and describe expected behavior instead of only symptoms.

Good prompts are concrete:

- `Fix the failing auth test in tests/test_auth.py and explain the root cause`
- `Add a README with setup instructions for local development`
- `Update the login form validation to match the API contract in api/schema.ts`

### 4. Review The Session Output

After submission, Claude:

1. Clones the selected repositories
2. Runs the environment setup script if configured
3. Starts work in a fresh session
4. Uses a dedicated branch for that task

This separation is one of the biggest operational differences from local sessions: you can start another task immediately without waiting for the first branch or session to finish.

## Prefill Sessions From External Tools

The official page documents URL query parameters for pre-filling prompt, repositories, and environment when opening `claude.ai/code`. This is useful when building integrations from issue trackers, internal dashboards, or bug-reporting tools.

Typical pattern:

- Generate a link that opens Claude Code on the web
- Pre-populate the task description from an issue or alert
- Pre-select the target repository and environment

This reduces manual setup and makes web sessions easier to launch from surrounding tooling.

## Operational Advice

### Design The Environment First

Most failures in web sessions come from incomplete setup, missing secrets, or overly broad or overly narrow network policy. Before scaling usage, validate:

- dependency installation
- test or build prerequisites
- environment variables
- outbound network rules

### Write Task Prompts For Autonomy

Web sessions are strongest when the task is bounded and success criteria are explicit. Ask for outcomes, files, constraints, and verification steps instead of vague intent.

### Treat Each Session As Ephemeral

Do not assume prior local state exists. If the task requires generated code, migrations, fixtures, or tool installation, make that part of the repository or setup script.

## Common Misunderstandings

### "It uses my local Claude settings"

Not in web sessions. The official comparison page explicitly says web sessions use repository context, not your local machine config.

### "It can work without GitHub"

Usually no. The official quickstart requires GitHub-connected repositories for standard web sessions, with special handling only for bundled local repos via `--remote`.

### "It has the same permission controls as local Claude Code"

No. Cloud sessions have a narrower permission model than the terminal or local desktop sessions.

## Official References

- Web quickstart: `https://code.claude.com/docs/ko/web-quickstart`
- Claude Code overview: `https://code.claude.com/docs/en`
- Desktop quickstart for comparison: `https://code.claude.com/docs/ko/desktop-quickstart`

