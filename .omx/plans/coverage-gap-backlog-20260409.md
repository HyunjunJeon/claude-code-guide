Title

Prioritized backlog derived from deep official-doc parity audits

Purpose

Translate the deep parity audits into concrete work items that can be scheduled against the roadmap.

Priority 0: claim safety

1. Narrow public messaging until parity is proven.
   - Replace any wording equivalent to "every Claude Code feature" with language closer to "covers most major Claude Code features" until matrix gaps close.

2. Keep the page-level matrix and section-level audits linked together.
   - Page matrix: `.omx/plans/claude-code-feature-doc-coverage-matrix-20260409.md`
   - Section audits: hooks, MCP, subagents, plugins, configuration family, reference remainder

Priority 1: real missing feature-doc surfaces

3. Add `Output styles` coverage.
   - Current status: missing
   - Why first: this is a real official page with almost no current repo coverage.

4. Add `Fullscreen rendering` coverage.
   - Current status: missing
   - Why first: official config surface with no meaningful current repo page.

5. Add `Terminal configuration` coverage.
   - Current status: missing
   - Why first: only command references exist now.

6. Add `Channels reference` coverage.
   - Current status: missing at implementation/reference depth
   - Required topics: webhook receiver, notification format, reply tool, sender gating, permission relay.

7. Add `Visual Studio Code`, `JetBrains IDEs`, and `Claude Code in Slack` feature coverage.
   - Current status: missing or effectively missing.

Priority 2: strong features that are still reference-incomplete

8. Expand `Hooks` with the missing long-tail event sections.
   - Add `/hooks` menu
   - Add disable/remove workflow
   - Add event-specific sections for InstructionsLoaded, PermissionDenied, PostToolUseFailure, TaskCreated, TaskCompleted, StopFailure, TeammateIdle, ConfigChange, CwdChanged, FileChanged, WorktreeCreate, WorktreeRemove, Elicitation, ElicitationResult
   - Add async execution model

9. Expand `MCP` advanced operations coverage.
   - OAuth callback port
   - Pre-configured OAuth credentials
   - Tool Search internals/configuration
   - Managed restriction behavior
   - Per-tool output overrides

10. Expand `Plugins` technical reference layer.
   - channels schema
   - path behavior rules
   - caching and file resolution
   - auto-update behavior
   - remote marketplace URL flows

11. Expand `Settings` into a real configuration-system guide.
   - scopes
   - precedence
   - active-setting verification
   - settings model
   - sensitive-file exclusion

Priority 3: split-but-present areas that need consolidation

12. Consolidate `Interactive mode` into a clearer reference structure.
   - transcript viewer
   - quick commands
   - theme/display
   - background bash behavior

13. Tighten `Checkpointing` wording around restore vs summarize.

14. Add a named patterns section to `Subagents` that mirrors the official decision patterns more explicitly.

Priority 4: maintenance and process

15. Tie version verification directly to parity maintenance.
   - Do not leave full version audit only as a distant milestone.
   - Re-run parity audit on each Claude Code release.

16. Make section-level parity a first-class artifact.
   - Keep one matrix per large official surface, not just one page-level matrix.

Suggested execution order

Wave 1

- Output styles
- Fullscreen rendering
- Terminal configuration
- Channels reference

Wave 2

- Hooks deepening
- MCP advanced operations
- Settings system guide

Wave 3

- Plugins technical-reference gaps
- IDE and Slack feature pages
- Interactive/reference consolidation

Exit condition

The project should only restore strong completeness claims after:

- all truly missing official feature pages are covered
- all major reference-family gaps are reduced from `missing` to at least `partial`
- claim wording matches the actual matrix state
