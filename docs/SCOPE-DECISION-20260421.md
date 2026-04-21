# Scope Decision: JetBrains IDEs

- Decision date: 2026-04-21
- Scope status: `out-of-scope`
- Applies to: `docs/claude-code-feature-doc-coverage-matrix-20260421.md`

## Decision

The official Claude Code page `JetBrains IDEs` is currently excluded from the repository's parity target.

## Why it is excluded

1. The current repository is optimized for terminal-first Claude Code workflows and already has substantial surface area to close across `Computer use`, `Slack`, `Troubleshooting`, `Deployment`, `Administration`, and `Agent SDK`.
2. Adding JetBrains coverage now would increase parity scope while higher-priority missing families remain unresolved.
3. The repository already contains a VS Code-focused expansion path; JetBrains can be added later as a separate, intentional wave instead of being mixed into the current closure effort.

## What this means operationally

- `JetBrains IDEs` does not count as a parity blocker while this scope decision is active.
- Any strong completeness claim must still respect all remaining in-scope rows in the page-level matrix.
- If JetBrains work starts later, this file must be updated or retired in the same change that adds the new documentation.

## Revisit triggers

Re-open this decision when any of the following becomes true:

1. `Computer use` and `Claude Code in Slack` are both covered.
2. The `Deployment`, `Administration`, and `Agent SDK` families reach at least `partial` coverage across all listed pages.
3. The repository adds a broader IDE integrations track beyond VS Code.

## Related files

- `docs/PARITY-OPERATIONS.md`
- `docs/PARITY-CLOSURE-PLAN-20260421.md`
- `docs/claude-code-feature-doc-coverage-matrix-20260421.md`
