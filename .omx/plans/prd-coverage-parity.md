# PRD: Claude Code Feature-Doc Parity Review

## Problem

The repository has broad Claude Code feature coverage, but the current roadmap does not explicitly guarantee parity with the official Claude Code feature-documentation surface. It is optimized for pedagogy, not parity verification.

## Goal

Establish a repeatable way to prove whether `claude-howto` covers the official Claude Code feature docs and to close any confirmed gaps before claiming completeness.

## Consensus Verdict

- Current content breadth is strong enough for a "broad guide" claim.
- Current roadmap is not sufficient for a "full official-doc parity" claim.
- The plan needs an added parity-audit workstream before or alongside the existing deep-pass roadmap.

## Why The Current Plan Is Insufficient

1. No official-doc coverage matrix exists.
2. Success criteria do not mention page-level or category-level parity.
3. Version audit is delayed until late 2026.
4. Several official-doc surfaces appear only partially covered or scattered, such as quickstart/getting-started, common workflows/tutorials, GitHub Actions, output styles, and reference implementation.
5. Several roadmap items are still unchecked, including onboarding and verification infrastructure.

## Proposed Plan

### Phase A: Parity Inventory

- Build a source-of-truth matrix of official Claude Code feature-doc pages and map each to repo coverage.
- Classify each page as: covered, partially covered, missing, or intentionally excluded.
- Add an explicit scope note for excluded non-feature Anthropic docs.

### Phase B: Gap Decisions

- For every partial/missing page, decide whether it belongs in:
  - an existing module,
  - a new standalone document,
  - or a cross-module recipe/reference page.
- Identify module owners and target files.

### Phase C: Roadmap Repair

- Insert parity tasks ahead of or bundled with module deep passes.
- Move version verification earlier for parity-critical pages.
- Add release-sync cadence and evidence requirements.

### Phase D: Claim Readiness

- Only claim "covers official Claude Code feature docs" once all in-scope rows are marked covered or intentionally excluded with rationale.

## Acceptance Criteria

- A machine-readable or markdown coverage matrix exists.
- Every official Claude Code feature-doc page is mapped to at least one repo page or marked excluded.
- Missing/partial pages have concrete tasks in the roadmap.
- The project has an explicit rule for when parity claims are allowed.
- Version verification is tied to parity maintenance, not only long-term roadmap aspirations.
