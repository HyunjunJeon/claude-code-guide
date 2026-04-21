# Parity Operations

Operational rules for maintaining official Claude Code feature-doc parity.

This document defines how the repository should decide:

- when strong completeness claims are allowed
- how public wording should change when parity is incomplete
- what must happen after each Claude Code release
- how section-level parity artifacts are maintained

The source of truth for parity status is:

- page-level matrix:
  - `docs/claude-code-feature-doc-coverage-matrix-20260421.md`
- scope decisions:
  - `docs/SCOPE-DECISION-20260421.md`
- section-level audits:
  - hooks
  - MCP
  - plugins
  - configuration family
  - subagents
  - reference remainder

## T-090: Parity Gate

Use this gate before any strong public claim about coverage.

### Strong claim

Examples:

- covers the official Claude Code feature-doc surface
- every Claude Code feature
- complete coverage of Claude Code docs

### Safe claim

Examples:

- covers most major Claude Code feature areas
- broad practical coverage across core Claude Code surfaces
- strong coverage of the main Claude Code workflows and reference areas

### Gate rules

Strong claims are allowed only when all of the following are true:

1. No in-scope page is marked `missing` in the page-level matrix.
2. Any remaining `partial` row has an explicit rationale and is accepted intentionally.
3. The relevant section-level audit does not contradict the matrix status.
4. The matrix has been refreshed against the current Claude Code docs version.
5. Any excluded official page is explicitly marked `out-of-scope` in the scope decision.

### Current gate state

At the time this document was added, strong claims are **not allowed**.

Current blocking `missing` items include:

- broader hub surfaces that remain `partial`, especially `platforms`
- scheduled/background automation mapping that still spans multiple pages
- resources-family alignment and ongoing weekly-digest maintenance

`JetBrains IDEs` is currently treated as `out-of-scope` and does not block the gate while that scope decision remains in force.

Until the remaining in-scope `missing` rows are either covered or explicitly removed from scope, use safe claims only.

## T-091: Public Wording Policy

Public wording must follow the parity gate state.

### Files that may need wording updates

- `README.md`
- `INDEX.md`
- `CATALOG.md`
- landing copy in `src/lib/config.tsx`
- roadmap or plan summaries if they describe overall coverage

### If the gate is not passed

Use safe wording such as:

- covers most major Claude Code feature areas
- broad, example-driven coverage of the main Claude Code surfaces
- practical coverage across core Claude Code workflows and reference areas

Do not use wording that implies universal completeness.

### If the gate is passed

You may restore stronger wording such as:

- covers the official Claude Code feature-doc surface
- comprehensive Claude Code feature-doc coverage

Only do this after checking the current matrix and section-level audits together.

### Public wording update procedure

1. Read the current page-level matrix.
2. Check whether any `missing` in-scope rows remain.
3. Check whether any `partial` rows still need explicit rationale.
4. Check whether any `out-of-scope` rows are still intentionally excluded and documented.
5. Choose the correct claim tier: `safe` or `strong`.
6. Update the public-facing files only after that decision.

## T-092: Release Refresh Procedure

Every Claude Code release should trigger a parity refresh review.

### Refresh steps

1. Re-check the official Claude Code docs navigation.
2. Compare the current page list against the page-level matrix.
3. Add any new pages or rename changed pages in the matrix.
4. Refresh the relevant section-level audit for any changed official surface.
5. Re-evaluate `covered`, `partial`, and `missing` statuses.
6. Re-evaluate whether any `out-of-scope` decision still stands.
7. Update `docs/TASKS-20260401.md` if new gaps create new work.
8. Re-run the public wording gate from `T-090`.

### Timing rule

New official pages or substantial page changes should be triaged within 7 days of the release being noticed.

### Output of a refresh

Each refresh should leave behind:

- an updated matrix
- updated scope decision when exclusions change
- updated section-level audits when needed
- updated task status or new backlog items when needed

## T-093: Section-Audit Maintenance

Large official surfaces must keep a section-level audit, not just a page-level row.

### Required audit families

- hooks
- MCP
- plugins
- configuration family
- subagents
- reference remainder

### Maintenance rules

1. If a documentation wave changes a large surface, update its audit in the same cycle.
2. If the page-level matrix and section-level audit disagree, fix the disagreement before changing public wording.
3. New backlog items should name the affected audit file and the intended status change.

### Status change notation

When documenting follow-up work, prefer explicit transitions such as:

- `missing -> partial`
- `partial -> covered`

This keeps the work tied to observable parity progress instead of vague improvement language.

## Current Operating Default

Until the remaining `missing` items are resolved or explicitly excluded from scope:

- keep public wording in the safe-claim tier
- keep parity artifacts current
- treat release refresh as mandatory maintenance

This project is now operating with a documented parity process rather than relying on intuition.
