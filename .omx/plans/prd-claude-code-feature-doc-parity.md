Title

PRD: Claude Code feature-doc parity audit

Problem

The repository currently claims or implies broad Claude Code completeness, but it does not yet prove parity against the official Claude Code feature-documentation surface.

Goal

Establish and maintain defensible parity with the official Claude Code feature-doc surface.

Users

- Human learners who expect the guide to be complete.
- Contributors who need a gap-aware roadmap.
- Agents that rely on repository structure as a knowledge source.

Scope

- In scope: official Claude Code feature documentation pages.
- Out of scope: adjacent Anthropic operational/platform docs that are not part of the Claude Code feature-doc surface.

Deliverables

- Official feature-doc page inventory
- Coverage matrix
- Gap backlog linked to target modules
- Public claim wording updated to match actual coverage state
- Maintenance rule for future releases

Success metrics

- 100% of in-scope official pages mapped
- 0 unmapped pages
- 0 `missing` rows before strong completeness claims
- Release maintenance process documented

Risks

- Official docs evolve faster than the roadmap cadence.
- Some features are spread across multiple repo modules and may be hard to score consistently.
- Public messaging may currently overstate coverage.
