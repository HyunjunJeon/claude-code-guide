# Explore The `.claude` Directory

Claude Code reads instructions, settings, skills, subagents, and memory from your project and from `~/.claude`. This page is the practical map of where each type of customization belongs.

## Two Scopes

- project scope: repo-local files you can commit and share
- global scope: `~/.claude` files that apply across all your projects

On Windows, `~/.claude` resolves under `%USERPROFILE%\\.claude`. If `CLAUDE_CONFIG_DIR` is set, Claude Code uses that path instead.

## Start With The Smallest Useful Files

Most teams only need these first:

- `CLAUDE.md`
- `settings.json`
- `settings.local.json`
- `.mcp.json`

Everything else is optional and should be added when there is a concrete need.

## Choose The Right File

| You want to change | File |
|---|---|
| project conventions and standing instructions | `CLAUDE.md` |
| permissions, hooks, env, model defaults | `settings.json` |
| private project-only overrides | `settings.local.json` |
| team-shared MCP servers | `.mcp.json` |
| reusable prompts and workflows | `skills/<name>/SKILL.md` |
| custom slash-command style prompts | `commands/*.md` |
| output formatting styles | `output-styles/*.md` |
| specialized subagents | `agents/*.md` |
| subagent persistent memory | `agent-memory/<name>/` |
| worktree file copy rules | `.worktreeinclude` |

## Important File Roles

### `CLAUDE.md`

The highest-value file for most projects. Put:

- coding conventions
- preferred tools
- verification rules
- architectural context
- compact instructions you want preserved

### `settings.json`

Use this for:

- permission rules
- hooks
- environment variables
- model defaults

Remember that CLI flags can override `settings.json` for the current session.

### `settings.local.json`

Use this for your personal overrides that should not be committed. It is project-only and meant to stay out of Git.

### `.mcp.json`

Project MCP config lives at the repository root, not inside `.claude/`.

## What Is Not In The Explorer

Some related files live elsewhere:

- managed settings, which are organization-enforced
- `CLAUDE.local.md` in the project root for private project preferences
- installed plugin data under `~/.claude/plugins`

`~/.claude` also stores operational data such as transcripts, file snapshots, caches, logs, and prompt history.

## Precedence And Overrides

Several things can override authored config:

- organization-managed settings
- CLI flags such as `--permission-mode` or `--settings`
- some environment variables
- `settings.local.json` overriding `settings.json`

If something is not taking effect, precedence is the first thing to check.

## Common Troubleshooting Patterns

The official docs call out several recurring mistakes:

- putting hooks in a standalone hooks file instead of inside `settings.json`
- putting project MCP config under `.claude/` instead of root `.mcp.json`
- using lowercase tool names in hook matchers
- expecting `settings.json` env vars to automatically propagate to MCP child processes
- assuming subdirectory `CLAUDE.md` files load at session start instead of on demand

## What Loaded In The Current Session

These commands help inspect the live state:

- `/context`
- `/memory`
- `/agents`
- `/hooks`
- `/mcp`
- `/skills`
- `/permissions`
- `/doctor`

Use `/context` first for the broad picture.

## Application Data And Privacy

`~/.claude` stores plaintext session data such as:

- session transcripts
- large tool results
- pre-edit file history for checkpoints
- debug logs
- prompt history
- token and cost cache

This matters for privacy and local security. If a tool reads secrets, that content can land in transcripts on disk. The official docs recommend shortening retention, denying sensitive reads where appropriate, or disabling persistence when needed.

## Related Guides

- [How Claude Code Works](./how-claude-code-works.md)
- [Settings System Guide](./settings-system-guide.md)
- [Output Styles](./output-styles.md)
- [MCP](../05-mcp/README.md)

## Official Source

- [Explore the .claude directory](https://code.claude.com/docs/ko/claude-directory)
