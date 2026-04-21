
# Settings System Guide

Claude Code's settings system is not just a single `settings.json` file. It is a layered configuration model with multiple scopes, related sidecar files, and feature-specific storage locations.

This guide focuses on how the settings system actually behaves in practice:

- which scope to use
- how precedence works
- which features participate in the scope model
- where configuration really lives

## Scope Model

Claude Code uses four main scopes:

| Scope | Primary location | Who it affects | Team-shared |
|---|---|---|---|
| `managed` | OS / server-managed policy locations | Everyone on the machine or org | Yes |
| `user` | `~/.claude/` | You, across all projects | No |
| `project` | `.claude/` in the repository | Everyone on the repo | Yes |
| `local` | `.claude/settings.local.json` | You, in this repo only | No |

Use the scopes this way:

- `managed`: hard organizational policy
- `user`: personal defaults you want everywhere
- `project`: repo-shared conventions and tooling
- `local`: personal overrides for one repository

## When To Use Each Scope

### Managed

Use managed scope for settings that must not be bypassed:

- security policy
- login restrictions
- marketplace restrictions
- forced sandboxing or permission rules

If the setting is a policy, it belongs here.

### User

Use user scope for:

- preferred model defaults
- personal plugins and agents
- personal environment defaults
- your default working style

If you want it in every repo but do not want to commit it, use user scope.

### Project

Use project scope for:

- team hooks
- team plugins
- shared permissions and MCP servers
- repo-specific behavior everyone should inherit

If teammates should get it by cloning the repo, use project scope.

### Local

Use local scope for:

- machine-specific paths
- temporary experiments
- personal overrides you do not want to commit

If it would break for teammates or should stay private, use local scope.

## Precedence

When the same setting appears in multiple places, the more specific or more authoritative source wins.

Practical rule of thumb:

- managed policy overrides normal editable settings
- project settings override user defaults for that repository
- local project settings override shared project settings for your machine
- session-specific flags can still affect the current run

The main idea is:

`policy beats preference, and local beats shared.`

## What Actually Uses Scopes

Not every Claude Code feature stores data in the same file.

| Feature | User location | Project location | Local location |
|---|---|---|---|
| General settings | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| Subagents | `~/.claude/agents/` | `.claude/agents/` | none |
| Plugins | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| MCP servers | `~/.claude.json` | `.mcp.json` | `~/.claude.json` per-project entry |
| `CLAUDE.md` memory | `~/.claude/CLAUDE.md` | `CLAUDE.md` or `.claude/CLAUDE.md` | `CLAUDE.local.md` |

Two important consequences:

- not all scoped features live in `settings.json`
- you need to think in terms of the configuration system, not one file

## The Main Settings Files

### User settings

```text
~/.claude/settings.json
```

Use this for personal defaults across all projects.

### Project settings

```text
.claude/settings.json
```

Use this for repo-shared configuration that should travel with the codebase.

### Local project settings

```text
.claude/settings.local.json
```

Use this for gitignored per-project personal overrides.

### Other important files

```text
~/.claude.json
.mcp.json
CLAUDE.md
CLAUDE.local.md
```

Do not confuse these with `settings.json`:

- `~/.claude.json` stores additional state and user-level MCP-related configuration
- `.mcp.json` is the shared project MCP file
- `CLAUDE.md` is behavioral memory, not enforced configuration

## What Goes Into `settings.json`

`settings.json` is the official hierarchical settings layer. Common categories include:

- permissions
- environment variables
- model defaults
- plugin settings
- UI behavior
- hooks
- output style
- status line
- fast mode and thinking-related options

Representative example:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./secrets/**)"
    ]
  },
  "env": {
    "FOO": "bar"
  },
  "outputStyle": "Explanatory"
}
```

If you edit settings directly, keep the schema line. It improves validation in editors such as VS Code.

## Permission Settings vs Permission Modes

These are related, but not the same.

- `permission mode` controls how Claude asks or proceeds during a session
- `permission rules` define what is allowed, denied, or escalated

Examples of settings-level permission work:

- allow or deny specific Bash shapes
- force managed-only permission rules
- disable bypass behavior

Examples of mode-level work:

- `default`
- `plan`
- `acceptEdits`
- `auto`
- `bypassPermissions`

If you need the user's workflow mode, think `permission mode`.
If you need policy, think `permission rules` in settings.

## Sandbox Settings

Sandboxing is one of the clearest examples of where settings matter operationally.

Common sandbox configuration concepts:

- enable or disable sandboxing
- fail if sandboxing is unavailable
- allow or deny read/write paths
- adjust weaker network isolation behavior on macOS

This belongs in the configuration system because it changes what execution is even possible.

## Hooks, Plugins, and Subagents

The settings system controls how these feature families are activated and constrained.

Examples:

- plugin allowlists and marketplace restrictions
- managed hook restrictions
- environment variables available to sessions
- default behavior that Claude and plugin surfaces inherit

Use the dedicated guides for the full feature details:

- [Hooks Guide](../06-hooks/README.md)
- [Plugins Guide](../07-plugins/README.md)
- [Subagents Guide](../04-subagents/README.md)

## Excluding Sensitive or Irrelevant Files

The configuration system also controls exclusion-style behavior.

Examples:

- excluding irrelevant `CLAUDE.md` files in large repos
- reducing accidental inclusion of irrelevant or sensitive paths in shared configuration
- keeping machine-specific or secret-bearing overrides in local-only files

These settings matter because they affect both safety and context quality.

## Verify Active Settings

There are two practical ways to verify what is active.

### 1. Use `/config`

```bash
/config
```

This is the fastest interactive check for many user-facing settings.

### 2. Inspect the relevant scope files

Check:

- `~/.claude/settings.json`
- `.claude/settings.json`
- `.claude/settings.local.json`
- `.mcp.json`
- `~/.claude.json`

When something seems wrong, the fix is often not changing a setting, but discovering that a more specific scope is overriding it.

## Recommended Working Rules

### Team rule

Put shared repo behavior in `.claude/settings.json`.

### Personal rule

Put your global preferences in `~/.claude/settings.json`.

### Safety rule

Put machine-specific or experimental overrides in `.claude/settings.local.json`.

### Policy rule

Do not fake policy with user or project settings. If it must be enforced, it belongs in managed scope.

## Common Mistakes

- treating all Claude Code config as if it lives in one file
- putting machine-specific settings in project scope
- assuming project settings always win over everything
- confusing `CLAUDE.md` behavioral guidance with enforced settings
- debugging the wrong file when MCP behavior is actually in `.mcp.json` or `~/.claude.json`

## Try It Now

### 1. Inspect your three settings scopes

```bash
ls ~/.claude/settings.json .claude/settings.json .claude/settings.local.json
```

Expected result:

- you can see which scopes exist in this project

### 2. Test precedence safely

Set a harmless value in user scope, then override the same setting in local project scope.

Expected result:

- the repository-specific local setting wins for that repo

### 3. Verify schema-aware editing in VS Code

Add:

```json
"$schema": "https://json.schemastore.org/claude-code-settings.json"
```

Expected result:

- autocomplete and validation improve in the editor

## Related Guides

- [Advanced Features README](./README.md)
- [Terminal Configuration](./terminal-configuration.md)
- [Output Styles](./output-styles.md)
- [CLI Reference](../10-cli/README.md)
- [Memory Guide](../02-memory/README.md)

## Official Reference

- https://code.claude.com/docs/ko/settings
