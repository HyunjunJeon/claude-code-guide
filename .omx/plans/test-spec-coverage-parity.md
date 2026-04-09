# Test Spec: Claude Code Feature-Doc Parity Review

## Objective

Verify whether the repository can legitimately claim parity with the official Claude Code feature docs.

## Checks

1. Coverage Matrix Exists
   - Expected: A document or data file enumerates official Claude Code feature-doc pages.
   - Pass condition: Each page has a mapped repo destination and status.

2. Scope Definition Is Explicit
   - Expected: The matrix and roadmap clearly exclude adjacent non-feature Anthropic docs.
   - Pass condition: No ambiguity remains about what counts toward parity.

3. Gap Status Is Actionable
   - Expected: Every missing or partial area has a task or milestone entry.
   - Pass condition: No gap exists without ownership or planned location.

4. Parity Claim Gate Exists
   - Expected: A documented rule defines when the repo may claim official-doc parity.
   - Pass condition: Claim requires all in-scope rows covered or intentionally excluded with rationale.

5. Version Verification Is Operationalized
   - Expected: Parity-sensitive pages have a verification cadence.
   - Pass condition: Verification is not deferred solely to a distant milestone.

## High-Risk Areas To Check First

- Getting started / quickstart
- Tutorials / common workflows
- Output styles
- GitHub Actions / automation pages
- Reference implementation / devcontainer-equivalent guidance
- Advanced feature surfaces grouped only under `09-advanced-features`

## Evidence Sources

- Official Claude Code docs pages
- `README.md`
- `CATALOG.md`
- `LEARNING-ROADMAP.md`
- `docs/ROADMAP-20260401.md`
- `docs/TASKS-20260401.md`
- 10 module README files
