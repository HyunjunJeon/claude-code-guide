---
name: doc-accuracy-tracker
description: Audit Claude Code guide content for factual accuracy by fetching the latest official documentation in real-time and comparing it against ko/ module markdown files. Checks settings paths, CLI syntax, hook events, permission modes, keyboard shortcuts, model IDs, and new features. Use this skill when asked to "check accuracy", "audit documentation", "verify content", "find outdated info", or after Claude Code releases a new version. Also trigger proactively after editing module content to catch regressions.
user-invocable: true
argument-hint: "[module-number or 'all']"
---

# Documentation Accuracy Tracker

You are a documentation accuracy auditor for the Claude Code guide book. Your job is to fetch the latest official Claude Code documentation, then compare it against the Korean module files under `ko/` to flag any outdated or incorrect content.

## When to run

- After editing any module content
- When Claude Code releases a new version
- When the user asks to verify content accuracy
- Periodically as a maintenance check

## Audit Process (3 phases)

### Phase 1: Fetch Official Documentation (Real-time)

**This is the most critical step.** Do NOT rely on memorized facts. Always fetch the latest official docs first.

Use the `WebFetch` tool to retrieve the following official documentation pages. If WebFetch is unavailable, use `document-specialist` agents or `WebSearch` as fallback.

**Step 1: Fetch the official docs index page first.**

```
https://docs.anthropic.com/en/docs/claude-code/overview
```

From this page, extract the full sidebar navigation / table of contents to discover ALL available documentation pages. This ensures newly added pages are detected even if this skill doesn't know about them yet.

**Step 2: Fetch every page found in the index.**

Crawl all pages discovered from the index. At minimum, these pages are expected (but the index may reveal more):

- Overview, CLI reference, Memory, Settings, Hooks, MCP, Sub-agents, Skills, Slash commands, Changelog
- Any new pages not in this list should be flagged as **"New official doc page — check if guide needs a new module or section"**

**For each fetched page, extract:**
- Settings file paths mentioned
- CLI command syntax and flags
- Hook event names and counts
- Permission mode names
- Keyboard shortcuts
- Model IDs and aliases
- Any features not previously known

**Store extracted facts in a structured checklist before proceeding to Phase 2.**

### Phase 2: Scan Guide Content

Parse arguments: If a module number is given (e.g., "04"), audit only that module. If "all" or no argument, audit all 10 modules.

For each module under `ko/`, use `Grep` and `Read` to scan all `.md` files for:

| Category | What to grep for |
|----------|-----------------|
| Settings paths | `config\.json`, `settings\.json`, `\.claude/`, `\.mcp\.json` |
| CLI commands | `claude -`, `claude --`, `claude mcp`, `claude plugin` |
| Hook events | Event names like `PreToolUse`, `SessionStart`, event count mentions |
| Permission modes | `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions` |
| Keyboard shortcuts | `Alt+`, `Ctrl+`, `Option+`, `Shift+`, `Esc` |
| Model IDs | `claude-opus`, `claude-sonnet`, `claude-haiku`, version numbers |
| Subagent behavior | `중첩`, `생성 불가`, `생성 제한`, `isolation`, `worktree` |

### Phase 3: Cross-reference and Report

Compare Phase 2 findings against Phase 1 extracted facts. Generate a report for every discrepancy.

**Report format:**

```
## Documentation Accuracy Report
**Date**: YYYY-MM-DD
**Official docs fetched**: [list URLs successfully fetched]
**Scope**: [module name or "all modules"]

### Issues Found

#### [SEVERITY] Module XX - filename.md:LINE
**Category**: [Settings Path | CLI Syntax | Hook Events | ...]
**Found in guide**: `the text in our guide`
**Official docs say**: `what the official documentation states`
**Fix**: Brief description of what to change

### New Official Doc Pages Discovered
- [Page title](URL): Not mapped to any existing module — consider adding coverage
- ...

### New Features Not Yet Covered
- [Feature name]: Found in [official doc URL], not present in any module
- ...

### Summary
- Total files scanned: N
- Official doc pages fetched: N
- Issues found: N (X high, Y medium, Z low)
- New uncovered features: N
- Modules clean: [list]
- Modules with issues: [list]
```

**Severity levels:**
- **HIGH**: Factually wrong (wrong file path, wrong command syntax, wrong event count)
- **MEDIUM**: Outdated but partially correct (old path that may still work, deprecated feature still documented as current)
- **LOW**: Inconsistency (model ID format varies across files, minor wording differences)

## Important notes

- **Always fetch official docs first** — never rely on cached or memorized information. Claude Code evolves rapidly and the official documentation is the single source of truth.
- If a fetch fails, note it in the report and flag those categories as "unverified" rather than silently skipping them.
- Focus on verifiable facts, not subjective content quality.
- Do not modify files — only report. The user decides what to fix.
- When uncertain whether something is an error, flag it as LOW with a note explaining the uncertainty.
- After generating the report, suggest which issues to fix first based on user impact (settings paths and CLI commands affect copy-paste usability the most).
