Why this exists

The repository already covers the major Claude Code feature families, but its roadmap does not yet prove parity against the official Claude Code feature-documentation surface. A parity claim needs an explicit audit layer, not just deeper pedagogy.

Problem statement

Current content breadth is strong, yet the roadmap focuses on module deep passes, onboarding, generated agent artifacts, and late version audits. That is not sufficient evidence to support "covers all official Claude Code feature docs."

Goal

Add a lightweight, explicit parity-audit workstream that maps official Claude Code feature docs to repository coverage, identifies missing or shallow areas, and gates any completeness claim on documented evidence.

Non-goals

- Expanding scope to non-Claude-Code Anthropic docs
- Rewriting all modules immediately
- Replacing the current 10-module learning structure

Success criteria

- A repository-local coverage matrix exists for official Claude Code feature docs.
- Each official Claude Code feature-doc area is mapped to one or more repo locations, or marked missing.
- Missing or weak areas are tracked as explicit tasks, not implied by generic "deep pass" work.
- README and roadmap language stop short of full-coverage claims until the matrix is complete.
- Version verification is pulled forward enough to support confidence in the claim.

Proposed phases

Phase 1: Coverage Matrix
- Create `docs/COVERAGE-MATRIX.md`
- Enumerate official Claude Code feature-doc areas
- Map each area to existing repo files
- Mark each row as `covered`, `partial`, or `missing`

Phase 2: Gap Tasks
- Add roadmap/tasks entries only for `partial` and `missing` rows
- Split "module deep pass" work from "official parity closure" work
- Prioritize shallow modules first, especially checkpoints and any feature clusters hidden only inside advanced-features

Phase 3: Claim Discipline
- Downgrade or qualify any "covers every feature" language until parity is evidenced
- Add a maintenance rule that parity claims require matrix completion + verification date

Phase 4: Verification Loop
- Move a minimal version/parity audit earlier than late-2026 roadmap milestones
- Re-run parity check whenever major Claude Code docs change

Acceptance criteria

- No official Claude Code feature-doc area is left unmapped
- All `missing` rows have explicit tasks
- All `partial` rows have bounded remediation notes
- Public-facing claim language matches actual evidence
