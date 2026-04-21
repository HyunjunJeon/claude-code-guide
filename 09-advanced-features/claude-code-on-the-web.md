# Claude Code On The Web

Claude Code on the web is the cloud-hosted surface at `claude.ai/code`. It is not just a browser wrapper around the terminal. It runs each coding session inside an Anthropic-managed VM with its own branch, environment, and review UI.

## What Makes It Different

Compared with local terminal or Desktop sessions, the web surface has four defining properties:

- code runs in Anthropic-managed cloud VMs
- each task gets its own isolated session and branch
- GitHub access is a first-class dependency
- cloud environments replace your local machine setup

This makes the web surface best for long-running, branch-oriented work that should keep going after you close your laptop.

## GitHub Access Models

The official docs describe two ways to grant repository access:

| Method | How it works | Best for |
|---|---|---|
| GitHub App | Install the Claude GitHub App on chosen repos | teams that want explicit repo-by-repo authorization |
| `/web-setup` | Sync your local `gh` CLI token to Claude | individual developers already using `gh` |

Important constraint:

- Auto-fix pull requests requires the GitHub App, even if `/web-setup` is enough for ordinary cloud sessions.

Team and Enterprise admins can disable quick web setup from admin settings.

## What The Cloud Environment Includes

Cloud sessions come with common runtimes and tools preinstalled. The official page lists support across:

- Python
- Node.js
- Ruby
- PHP
- Java
- Go
- Rust
- C/C++
- Docker
- PostgreSQL and Redis
- common utilities like `git`, `jq`, `yq`, `ripgrep`, `tmux`, `vim`, and `nano`

If exact versions matter, the official guidance is to ask Claude to run `check-tools` inside a cloud session.

## Environment Caching

One of the most important cloud behaviors is environment caching.

How it works:

- the setup script runs the first time an environment is used
- Anthropic snapshots the resulting filesystem
- later sessions start from that cached filesystem instead of re-running setup

What persists:

- installed dependencies
- files written by setup
- downloaded toolchains or container images

What does not persist:

- running processes
- active services or containers

That means long-lived setup belongs in the environment script, while per-session services should start from a `SessionStart` hook or explicit commands.

## Move Between Web And Terminal

The official docs define the handoff model clearly.

### From Terminal To Web

```bash
claude --remote "Fix the authentication bug in src/auth/login.ts"
```

This creates a new cloud session from your current repository and branch. Because the VM clones from GitHub rather than your disk, push local commits first if Claude needs them.

### From Web To Terminal

```bash
claude --teleport
```

This pulls a cloud session into your local terminal so you can continue with local files and tools.

Important limitation:

- from the CLI, session handoff is one-way: you can pull cloud sessions down, but you cannot push an already-running local terminal session up to the web. The Desktop app supports that handoff.

## Review Changes

Each web session shows a diff indicator such as `+42 -18`. Open it to:

- inspect file-by-file changes
- leave inline comments on exact lines
- send those comments back to Claude in the next instruction

This is one of the main reasons the web surface works well for branch-based review and refinement.

## Auto-Fix Pull Requests

The web surface is also the home of PR auto-fix.

When enabled, Claude can:

- watch CI failures
- react to review comments
- investigate and push fixes
- reply on review threads under your GitHub identity with Claude labeling

Operational warning from the official docs:

- if your repository triggers infrastructure or privileged workflows from PR comments, Claude replies may trigger them too. Review repository automation before enabling auto-fix.

## Security And Isolation

The official page highlights several layers:

- isolated Anthropic-managed VMs
- network access controls by environment
- credentials kept out of the sandbox and proxied securely
- repository analysis and edits contained inside isolated cloud sessions

One subtle but important note:

- even with network access disabled for the cloud environment, Claude Code still needs to reach the Anthropic API, so some data can still exit the VM through product operation itself.

## When To Prefer The Web Surface

Good fit:

- long-running branch work
- cross-device monitoring
- GitHub-first review loops
- setups where local machine availability is unreliable

Poor fit:

- workflows that require local-only files or tools
- repos not accessible from GitHub
- tasks where local credentials or services are the source of truth

## Related Guides

- [Web Quickstart](./web-quickstart.md)
- [Desktop Quickstart](./desktop-quickstart.md)
- [Remote Control and Platforms](./platforms.md)

## Official Source

- [Use Claude Code on the web](https://code.claude.com/docs/ko/claude-code-on-the-web)
