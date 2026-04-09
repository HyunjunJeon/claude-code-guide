Title

Execution plan for remaining Claude Code parity docs

Purpose

Turn the current parity audits into a concrete execution order for the remaining documentation work after the `settings system guide` and `VS Code` slice.

Current state

Completed or in progress:

- English docs created and/or refined:
  - `09-advanced-features/settings-system-guide.md`
  - `09-advanced-features/vscode.md`
  - `09-advanced-features/output-styles.md`
  - `09-advanced-features/fullscreen-rendering.md`
  - `09-advanced-features/terminal-configuration.md`
  - `09-advanced-features/channels-reference.md`
- Korean mirror currently exists only for:
  - `ko/09-advanced-features/settings-system-guide.md`
  - `ko/09-advanced-features/vscode.md`
- `09-advanced-features/README.md`, `ko/09-advanced-features/README.md`, `INDEX.md`, and `docs/TASKS-20260401.md` have already started to absorb parity-driven work.

Hard decisions

- Exclude `JetBrains IDEs` from the next implementation waves.
- Exclude `Claude Code in Slack` from the next implementation waves.
- Treat `Hooks`, `MCP`, and `Plugins` as the most important remaining reference surfaces and document them thoroughly.
- Keep English as source of truth and maintain Korean as a structural mirror for every selected doc.

Execution order

Wave 1: Finish the remaining advanced-features doc set

Scope:

- `output-styles`
- `fullscreen-rendering`
- `terminal-configuration`
- `channels-reference`

Required work:

- Refine the existing English docs so they match the intended official-doc surface without overstating behavior.
- Add Korean mirrors:
  - `ko/09-advanced-features/output-styles.md`
  - `ko/09-advanced-features/fullscreen-rendering.md`
  - `ko/09-advanced-features/terminal-configuration.md`
  - `ko/09-advanced-features/channels-reference.md`
- Update:
  - `09-advanced-features/README.md`
  - `ko/09-advanced-features/README.md`
  - `INDEX.md`
- Narrow `docs/TASKS-20260401.md` task text so `T-082`, `T-083`, `T-084`, and `T-087` clearly describe this exact slice.

Acceptance criteria:

- All four English docs are present and internally consistent.
- All four Korean docs exist with matching section structure, tables, examples, and related links.
- English and Korean advanced-features README files reference the same six companion docs:
  - settings system guide
  - VS Code
  - output styles
  - fullscreen rendering
  - terminal configuration
  - channels reference

Wave 2: Deepen Hooks into reference parity

Scope:

- `06-hooks/README.md`
- `ko/06-hooks/README.md`
- related examples only when needed to support missing official sections

Primary gaps to close:

- `/hooks` menu
- disable/remove workflow
- async/background execution model
- long-tail events that are currently listed but not documented:
  - `InstructionsLoaded`
  - `PermissionDenied`
  - `PostToolUseFailure`
  - `TaskCreated`
  - `TaskCompleted`
  - `StopFailure`
  - `TeammateIdle`
  - `ConfigChange`
  - `CwdChanged`
  - `FileChanged`
  - `WorktreeCreate`
  - `WorktreeRemove`
  - `Elicitation`
  - `ElicitationResult`

Required work:

- Expand the English hooks guide at section level using the existing `hooks-section-coverage-20260409.md` audit as the checklist.
- Mirror the same structure in Korean.
- Add or refine examples only where they are needed to make the newly added sections real, especially async behavior and file-change test-runner style workflows.
- Update `docs/TASKS-20260401.md` only for `T-074`, `T-075`, and `T-076` wording if implementation scope becomes narrower or more explicit.

Acceptance criteria:

- Every currently `missing` hooks section is documented in both English and Korean.
- Every long-tail event above has a dedicated subsection or an explicitly named grouped subsection.
- Async behavior is described with configuration, execution semantics, and at least one concrete example.

Wave 3: Deepen MCP into reference parity

Scope:

- `05-mcp/README.md`
- `ko/05-mcp/README.md`

Primary gaps to close:

- fixed OAuth callback ports
- pre-configured OAuth credentials
- dynamic headers clarification
- Tool Search internals/configuration
- managed restriction behavior:
  - command-based restrictions
  - URL-based restrictions
  - allowlist / denylist resolution
- per-tool output override behavior if supported

Required work:

- Use `mcp-section-coverage-20260409.md` as the implementation checklist.
- Expand the English MCP guide by adding advanced operational sections instead of scattering notes across examples.
- Mirror the same sections and examples in Korean.
- Preserve the current strong core-user-path coverage and only add the missing advanced layer.
- Update `docs/TASKS-20260401.md` for `T-078` and `T-079` if wording needs to be narrowed to the actual implementation slice.

Acceptance criteria:

- All current MCP `missing` sections are resolved to at least `partial`, with priority to moving them to `covered`.
- OAuth and managed-restriction guidance is clear enough that a reader can configure them without jumping back to the audit notes.
- Tool Search has both user-side and author-side explanation where the audit marked a gap.

Wave 4: Deepen Plugins into reference parity

Scope:

- `07-plugins/README.md`
- `ko/07-plugins/README.md`

Primary gaps to close:

- plugin channels schema
- path behavior rules
- `CLAUDE_PLUGIN_ROOT` semantics
- caching and file resolution
- auto-update behavior
- remote marketplace URL flows

Required work:

- Use `plugins-family-coverage-20260409.md` as the checklist.
- Restructure the plugin guide so the technical reference layer is easier to find without damaging the current practical examples.
- Mirror the structural changes in Korean.
- Update `docs/TASKS-20260401.md` for `T-080` and `T-081` if the execution slice needs tighter wording.

Acceptance criteria:

- The plugin guide clearly separates discovery/install, creation, and reference concerns.
- All current plugin `missing` sections are addressed.
- The technical-reference layer is explicit enough to support plugin authors, not only plugin users.

Wave 5: Reference cleanup and parity maintenance

Scope:

- `08-checkpoints/README.md`
- `09-advanced-features/README.md`
- parity artifacts under `.omx/plans/`
- `docs/TASKS-20260401.md`

Required work:

- Tighten checkpointing wording around restore vs summarize.
- Consolidate the remaining interactive-mode reference material if it still remains fragmented after the earlier waves.
- Refresh page-level and section-level parity audits after the document waves land.
- Update roadmap/task wording to reflect what is actually completed vs what remains.

Acceptance criteria:

- No strong completeness claim is restored until the updated parity matrix shows no unacceptable `missing` rows in the selected in-scope surfaces.
- `docs/TASKS-20260401.md` remains aligned with the actual execution order.

Files to avoid in these waves

- `README.md`
- `ko/README.md`
- `CATALOG.md`
- any JetBrains- or Slack-specific feature docs

These can be handled in a later plan if needed, but they are not part of the current execution order.

Verification rules for every wave

1. English and Korean heading structures match.
2. New links added to module README files are valid.
3. `INDEX.md` reflects the current English file set accurately.
4. `docs/TASKS-20260401.md` task text matches the actual slice being executed.
5. Official links are included only when they were verified in-session; otherwise use neutral navigation wording instead of guessing URLs.

Success condition

The remaining advanced-features doc set is fully mirrored in Korean, and the next high-priority parity work on `Hooks`, `MCP`, and `Plugins` is staged in a decision-complete order with clear acceptance criteria and no dependency ambiguity.
