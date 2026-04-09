Title

Coverage matrix draft for official Claude Code feature docs

Purpose

Map the current official Claude Code feature-documentation surface to repository coverage so parity claims can be judged with evidence instead of intuition.

Scope freeze

- In scope: official Claude Code feature-doc pages under the Claude Code docs navigation, as reviewed on 2026-04-09.
- Out of scope for this matrix: Deployment, Administration, Agent SDK, and adjacent Anthropic platform/ops docs.

Status rules

- `covered`: dedicated or strong multi-section coverage exists in the repo.
- `partial`: the topic is mentioned or split across files, but not at official-page depth.
- `missing`: no meaningful dedicated coverage found.

Summary

- Covered: 24
- Partial: 18
- Missing: 6
- Immediate high-risk gaps: `output styles`, `fullscreen rendering`, `Visual Studio Code`, `JetBrains IDEs`, `Claude Code in Slack`, `Computer use`

Matrix

| Official doc page | Repo mapping | Status | Evidence note |
|---|---|---|---|
| Overview | `README.md`, `INDEX.md`, `LEARNING-ROADMAP.md` | covered | Strong top-level guide and navigation already exist. |
| Quickstart | `README.md` | partial | There is a "Get Started in 15 Minutes" section, but planned `QUICKSTART.md` does not exist yet. |
| Changelog | `CHANGELOG.md`, `RELEASE_NOTES.md` | covered | Release history exists as dedicated docs. |
| How Claude Code works | `claude_concepts_guide.md`, `README.md` | partial | Conceptual explanation exists, but not as a clearly aligned official-page equivalent. |
| Extend Claude Code | `03-skills/README.md`, `04-subagents/README.md`, `05-mcp/README.md`, `06-hooks/README.md`, `07-plugins/README.md` | covered | Extension surfaces are comprehensively represented. |
| Explore the `.claude` directory | `README.md`, `02-memory/README.md`, `03-skills/README.md`, `04-subagents/README.md` | partial | Pieces exist, but there is no single dedicated `.claude` directory explainer. |
| Explore the context window | `06-hooks/README.md`, `08-checkpoints/README.md`, `claude_concepts_guide.md` | partial | Context monitoring and rewind concepts exist, but no dedicated page-level match. |
| How Claude remembers your project / Memory | `02-memory/README.md` | covered | Dedicated module with strong depth. |
| Permission modes | `09-advanced-features/README.md`, `10-cli/README.md`, `01-slash-commands/README.md` | covered | Dedicated advanced-features section plus CLI coverage. |
| Common workflows | `README.md`, `LEARNING-ROADMAP.md`, `09-advanced-features/README.md` | partial | Use cases and learning path exist, but not as a dedicated workflows guide. |
| Best practices | `STYLE_GUIDE.md`, `clean-code-rules.md`, per-module best-practice sections | partial | Good advice exists, but it is fragmented rather than unified. |
| Remote Control | `09-advanced-features/README.md` | covered | Dedicated section exists. |
| Claude Code on the web | `09-advanced-features/README.md` | partial | Web sessions are covered, but not as a dedicated full page. |
| Claude Code on desktop | `09-advanced-features/README.md` | covered | Dedicated desktop section exists. |
| Chrome extension (beta) | `09-advanced-features/README.md` | covered | Covered as "Chrome Integration". |
| Computer use (preview) | none found | missing | No meaningful dedicated coverage found in repo search. |
| Visual Studio Code | `10-cli/README.md`, `01-slash-commands/README.md` | missing | Only incidental IDE references found; no VS Code guide. |
| JetBrains IDEs | none found | missing | No dedicated JetBrains coverage found. |
| Claude Code in Slack | `09-advanced-features/README.md`, `CATALOG.md` | missing | Slack appears only as channels/integration mentions, not as a dedicated feature guide. |
| Sub-agents | `04-subagents/README.md` | covered | Dedicated module with deep coverage. |
| Run agent teams | `04-subagents/README.md` | partial | Agent teams are covered as an experimental subsection, not a full standalone guide. |
| Discover and install prebuilt plugins | `07-plugins/README.md`, `CATALOG.md` | covered | Marketplace and install flows are documented. |
| Create and use plugins | `07-plugins/README.md` | covered | Dedicated module with structure, lifecycle, and examples. |
| Extend with skills | `03-skills/README.md` | covered | Dedicated module with examples and packaging patterns. |
| Automate with hooks | `06-hooks/README.md` | covered | Dedicated module with strong depth. |
| Push external events to Claude / Channels | `09-advanced-features/README.md`, `10-cli/README.md`, `CATALOG.md` | partial | Channels are covered, but the external-events framing is not clearly mirrored. |
| Run prompts on a schedule | `09-advanced-features/README.md`, `LEARNING-ROADMAP.md` | covered | `/loop` and scheduled tasks are documented well. |
| Programmatic usage / Headless | `09-advanced-features/README.md`, `10-cli/README.md` | covered | Print/headless mode is explicitly documented. |
| Troubleshooting | per-module `README.md` troubleshooting sections | partial | Troubleshooting exists, but there is no central parity-level troubleshooting guide. |
| Settings | `09-advanced-features/README.md`, `10-cli/README.md`, `02-memory/README.md` | partial | Settings are discussed across files, but not as a dedicated settings page equivalent. |
| Permissions | `09-advanced-features/README.md`, `10-cli/README.md`, `01-slash-commands/README.md` | partial | Good practical coverage exists, but page-level parity is still spread across modules. |
| Sandboxing | `09-advanced-features/README.md` | covered | Dedicated advanced-features section exists. |
| Terminal configuration | `01-slash-commands/README.md`, `CATALOG.md` | partial | `/terminal-setup` is listed, but there is no dedicated explanatory guide. |
| Fullscreen rendering | none found | missing | No dedicated coverage found. |
| Model configuration | `10-cli/README.md`, `09-advanced-features/README.md`, `01-slash-commands/README.md` | partial | Model selection/configuration exists, but not as a standalone feature page. |
| Speed up responses with fast mode | `10-cli/README.md`, `01-slash-commands/README.md`, `CATALOG.md` | partial | Fast mode is mentioned, but not deeply documented. |
| Voice dictation | `09-advanced-features/README.md`, `01-slash-commands/README.md` | covered | Dedicated advanced-features section exists. |
| Output styles | `01-slash-commands/README.md` | missing | Only deprecated `/output-style` history exists; no current feature coverage. |
| Customize status line | `01-slash-commands/README.md`, `CATALOG.md` | partial | Statusline command exists in listings, but no dedicated guide was found. |
| Customize keyboard shortcuts | `09-advanced-features/README.md`, `01-slash-commands/README.md` | covered | Dedicated section exists. |
| CLI reference | `10-cli/README.md` | covered | Dedicated module. |
| Built-in commands | `01-slash-commands/README.md` | covered | Strong built-in command reference section exists. |
| Environment variables | `10-cli/README.md`, `09-advanced-features/README.md`, `05-mcp/README.md` | covered | Good explicit env-var coverage exists. |
| Interactive mode | `09-advanced-features/README.md`, `10-cli/README.md` | covered | Interactive behavior and features are documented. |
| Checkpointing | `08-checkpoints/README.md`, `08-checkpoints/checkpoint-examples.md` | covered | Dedicated module exists, though still shallower than peers. |
| Hooks reference | `06-hooks/README.md` | covered | Dedicated module with reference-style depth. |
| Plugins reference | `07-plugins/README.md` | covered | Dedicated module with reference-style depth. |
| Channels reference | `09-advanced-features/README.md`, `10-cli/README.md`, `CATALOG.md` | partial | Coverage exists, but not yet at clear reference depth. |
| GitHub Actions | `01-slash-commands/setup-ci-cd.md`, `09-advanced-features/README.md`, `10-cli/README.md` | partial | CI/CD usage exists, but not as a dedicated official-page equivalent. |

Recommended backlog from this matrix

Priority 1

- Add dedicated coverage for `output styles`.
- Add dedicated coverage for `fullscreen rendering`.
- Add dedicated pages or sections for `Visual Studio Code`, `JetBrains IDEs`, and `Claude Code in Slack`.
- Decide whether `Computer use` belongs in the project's in-scope claim; if yes, add coverage, if no, narrow the claim.

Priority 2

- Create dedicated or clearly signposted pages for `settings`, `terminal configuration`, `model configuration`, `fast mode`, and `status line`.
- Strengthen `common workflows`, `best practices`, and `troubleshooting` into standalone parity-friendly pages or cross-linked guides.

Priority 3

- Deepen `08-checkpoints/README.md` until its depth matches the rest of the feature set.
- Add a maintenance pass that re-checks this matrix against each Claude Code release.

Claim guidance

- Safe current claim: the repo covers most major Claude Code feature areas and many of the core workflows.
- Unsafe current claim: the repo fully covers the official Claude Code feature-doc surface.
