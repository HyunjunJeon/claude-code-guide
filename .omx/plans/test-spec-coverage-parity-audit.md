Verification target

Prove whether the repository can legitimately claim coverage of the official Claude Code feature-documentation surface.

Checks

1. Coverage matrix completeness
- Every official Claude Code feature-doc area has a row.
- Every row has at least one linked repo path or an explicit `missing` status.

2. Status accuracy
- `covered`: dedicated or substantial coverage exists and is easy to discover.
- `partial`: topic exists but is shallow, buried, or lacks guided examples.
- `missing`: no meaningful coverage exists.

3. Plan adequacy
- Roadmap/tasks include explicit closure work for all `partial` and `missing` rows.
- Generic pedagogical upgrades are not counted as parity closure unless they reference concrete coverage rows.

4. Claim integrity
- README, roadmap, and catalog language do not overclaim coverage before evidence exists.
- Any "complete" or "every feature" wording is gated on parity evidence.

Evidence sources

- Official docs navigation and feature pages
- `README.md`
- `CATALOG.md`
- `INDEX.md`
- `docs/ROADMAP-20260401.md`
- `docs/TASKS-20260401.md`
- All 10 module README files

Pass condition

The repository may claim official Claude Code feature-doc parity only when the matrix is complete, all gaps are tracked, and public claim language matches the current evidence.

Fail condition

If a major official feature-doc area is unmapped, hidden only in a large catch-all module, or absent from the roadmap gap list, the claim is not yet supportable and the plan needs additional review.
