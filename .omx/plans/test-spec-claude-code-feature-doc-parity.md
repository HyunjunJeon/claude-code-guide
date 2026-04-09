Title

Test spec: Claude Code feature-doc parity audit

Verification rules

1. Page inventory completeness
- Verify that every in-scope official Claude Code feature-doc page appears exactly once in the coverage matrix.

2. Mapping validity
- Verify that every mapped repo file exists.
- Verify that each mapping includes a status and a short evidence note.

3. Claim safety
- Fail the parity claim if any page is marked `missing`.
- Fail the strong completeness claim if any page is unmapped.

4. Partial coverage handling
- Require explicit rationale for every `partial` row.
- Require a linked backlog task or explicit public-claim narrowing for every `partial` row.

5. Maintenance
- Verify that the version-audit process references the coverage matrix.
- Verify that release-driven updates cannot bypass parity review.

Exit condition

The repository may claim coverage of the official Claude Code feature-doc surface only when the matrix is complete, all rows are mapped, and no in-scope page remains `missing`.
