# Configuration

This page focuses on Claude Code's settings system as a whole: where settings live, which source wins, and how to reason about conflicts.

## The Settings Hierarchy

The official configuration docs define a strict precedence order:

1. managed settings
2. command-line arguments
3. local project settings: `.claude/settings.local.json`
4. shared project settings: `.claude/settings.json`
5. user settings: `~/.claude/settings.json`

This means org policy wins over everything else, and per-session flags win over local files.

## Why This Matters

Most "Claude ignored my setting" problems are really precedence problems.

Typical examples:

- a project setting denies something your user settings allow,
- a CLI flag overrides the file you expected to be active,
- managed settings quietly block local customization.

## Array Merging

The official docs call out an important rule:

- array-valued settings merge and deduplicate across scopes instead of replacing each other

This affects settings such as:

- sandbox write paths
- permission allow rules
- hook allowlists in some cases

So a lower-priority scope can still add entries without wiping higher-priority ones.

## Common Configuration Families

The configuration page spans many keys, but the most operationally important families are:

- `permissions`
- `hooks`
- `env`
- `sandbox`
- model selection and login restrictions
- plugin and managed-policy controls

If you are trying to learn the full system, start with those families before reading every individual key.

## How To Verify What Is Active

The official docs recommend `/status` as the first inspection command.

Use it to confirm:

- which settings layers are active,
- where they came from,
- whether any file has parse or validation errors.

This is the fastest path when a local tweak appears to do nothing.

## Good Practices

- keep team defaults in shared project settings
- keep personal overrides in `settings.local.json`
- use managed settings for enforcement, not convenience
- document risky settings in `CLAUDE.md` or team docs so people know why they exist

## Related Guides

- [Settings System Guide](./settings-system-guide.md)
- [Environment Variables](../10-cli/env-vars.md)
- [Permissions and Security](./permissions-and-security.md)

## Official Source

- [Claude Code settings](https://code.claude.com/docs/ko/configuration)
