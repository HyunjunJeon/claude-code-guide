# Migration Guide

The migration guide is for teams moving from older Claude Code SDK usage patterns to the current Claude Agent SDK model.

## What Usually Changes

Common migration themes include:

- product naming changes from "Claude Code SDK" to "Claude Agent SDK",
- stronger emphasis on sessions and event-driven execution,
- clearer separation between permissions, hooks, and tools,
- updated TypeScript or Python entry points.

## Safe Migration Strategy

1. inventory the existing tool and permission assumptions,
2. map current workflows to the new session and loop model,
3. migrate a small workflow first,
4. add observability before broad rollout,
5. keep a rollback path until behavior is stable.

## Common Pitfalls

- migrating API calls without rethinking runtime safety,
- keeping legacy prompt assumptions after the control model changed,
- skipping test coverage for tool-using flows.

## Related Links

- [Overview](./overview.md)
- [TypeScript](./typescript.md)
- [Python](./python.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/migration-guide
