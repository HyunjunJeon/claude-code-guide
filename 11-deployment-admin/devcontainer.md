# Development Containers

Claude Code's reference devcontainer is for teams that want a consistent and more isolated development environment. It is especially useful when you want reproducible tooling, safer unattended execution, and faster onboarding.

## Overview

The official devcontainer setup provides:

- a preconfigured Node.js environment
- developer tooling like git, shell helpers, and search tools
- firewall rules for tighter network boundaries
- VS Code Dev Containers integration
- session persistence across container restarts

The official reference container is designed so teams can run:

```bash
claude --dangerously-skip-permissions
```

inside a more controlled environment than a host machine.

## When to use it

Use a devcontainer when you want:

- consistent onboarding across macOS, Windows, and Linux
- a safer place to run unattended Claude Code sessions
- the same toolchain across local development and CI-like environments
- a standard place to install Claude Code for a team

## Setup flow

1. Install VS Code and the Dev Containers extension.
2. Clone the reference devcontainer repository or copy its setup into your own repo.
3. Open the repository in VS Code.
4. Reopen the project in the container.
5. Start a terminal inside the container and run `claude`.

Once the container is built, Claude Code is already installed and your project files are mounted into the environment.

## Security model

The security story is better than running directly on the host, but it is not absolute.

What the devcontainer gives you:

- environment isolation
- firewall-based outbound restrictions
- repeatable setup
- separation from the host workstation

What it does not guarantee:

- protection from a malicious trusted repo when you use `--dangerously-skip-permissions`
- protection for every credential reachable from inside the container

The official docs explicitly warn that a malicious project can still exfiltrate anything accessible inside the devcontainer, including Claude Code credentials.

## Key files

The reference setup centers on three files:

- `devcontainer.json`
- `Dockerfile`
- `init-firewall.sh`

That split matters:

- `devcontainer.json` controls editor and mount behavior
- `Dockerfile` defines the image and tools
- `init-firewall.sh` enforces the network boundary

## Troubleshooting

### Container starts but Claude Code is missing

Use the official reference setup or confirm your image still installs Claude Code during build. Team customizations often break this by trimming the base image too aggressively.

### Network calls fail inside the container

Check the firewall script and proxy settings first. In secure setups, this is usually intentional rather than an Anthropic outage.

### `--dangerously-skip-permissions` still feels risky

That is expected. The devcontainer reduces blast radius, but it does not make untrusted repos safe. Keep using it only with trusted codebases.

## Related links

- [Official devcontainer docs](https://code.claude.com/docs/ko/devcontainer)
- [Reference devcontainer repository](https://github.com/anthropics/claude-code)
- [Network Configuration](./network-config.md)
- [LLM Gateway](./llm-gateway.md)
