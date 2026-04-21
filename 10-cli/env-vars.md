# Environment Variables

Environment variables are the fast path for changing Claude Code behavior without editing a settings file.

## Where To Set Them

The official docs support two main paths:

- export them in your shell before launching `claude`
- put them under the `env` key in `settings.json`

Use shell exports for temporary overrides. Use `settings.json` for persistent team or user defaults.

## The Variables That Matter Most

There are many variables, but these groups do most of the real work.

### Authentication And Routing

- `ANTHROPIC_API_KEY`
- `ANTHROPIC_AUTH_TOKEN`
- `ANTHROPIC_BASE_URL`
- provider flags such as `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_VERTEX`, `CLAUDE_CODE_USE_FOUNDRY`

These decide where requests go and which credential path wins.

### Session And Context Behavior

- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`
- `CLAUDE_CODE_SKIP_PROMPT_HISTORY`
- `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS`
- `CLAUDE_CODE_ENABLE_TASKS`

These matter when sessions get large or when scripted runs should avoid persistence.

### Security And Isolation

- `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`
- `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING`
- `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`
- sandbox-related variables and provider auth skip flags

These are the variables to audit first in high-trust or high-risk environments.

### Feature Flags

- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`
- `CLAUDE_CODE_USE_POWERSHELL_TOOL`
- `CLAUDE_CODE_ENABLE_TELEMETRY`

These often gate previews or infrastructure integrations.

## Practical Examples

Temporary API-key override:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
claude
```

Enable agent teams:

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
claude
```

Skip transcript persistence for ephemeral sessions:

```bash
export CLAUDE_CODE_SKIP_PROMPT_HISTORY=1
claude -p "summarize this diff"
```

## Common Pitfalls

- forgetting that env vars can override file settings,
- leaving temporary auth vars exported longer than intended,
- assuming a variable affects child processes when subprocess scrubbing is enabled,
- using proxy or gateway variables without matching the provider protocol correctly.

## Related Guides

- [Configuration](../09-advanced-features/configuration.md)
- [Troubleshooting](./troubleshooting.md)
- [Authentication and IAM](../11-deployment-admin/authentication-and-iam.md)

## Official Source

- [Environment variables](https://code.claude.com/docs/ko/env-vars)
