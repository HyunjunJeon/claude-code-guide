Title

Deep coverage audit for the official Configuration documentation family

Purpose

Audit the official configuration-family docs beyond the coarse page-level matrix.

Sources

- Official:
  - `https://code.claude.com/docs/en/settings`
  - `https://code.claude.com/docs/en/permissions`
  - `https://code.claude.com/docs/en/sandboxing`
  - `https://code.claude.com/docs/en/terminal-config`
  - `https://code.claude.com/docs/en/fullscreen`
  - `https://code.claude.com/docs/en/model-config`
  - `https://code.claude.com/docs/en/fast-mode`
  - `https://code.claude.com/docs/en/voice-dictation`
  - `https://code.claude.com/docs/en/output-styles`
  - `https://code.claude.com/docs/en/statusline`
  - `https://code.claude.com/docs/en/keybindings`
- Repo:
  - `09-advanced-features/README.md`
  - `10-cli/README.md`
  - `01-slash-commands/README.md`
  - `07-plugins/README.md`
  - `04-subagents/README.md`

Status rules

- `covered`: strong dedicated coverage exists.
- `partial`: concept exists but not at official depth or not in a dedicated place.
- `missing`: no meaningful corresponding coverage found.

Settings page section audit

| Official settings section | Repo mapping | Status | Evidence note |
|---|---|---|---|
| Configuration scopes | `09-advanced-features/README.md#configuration-and-settings` | partial | Config locations exist, but scope system is less explicit than official doc. |
| Available scopes | `09-advanced-features/README.md#configuration-file-locations` | partial | Global/project config is documented; managed/local semantics are less structured. |
| When to use each scope | none explicit | missing | No dedicated guidance section found. |
| How scopes interact | none explicit | missing | No dedicated scope-interaction logic found. |
| What uses scopes | scattered | partial | Plugins/settings/MCP mention scopes, but no unifying explanation. |
| Settings files | `09-advanced-features/README.md#configuration-file-locations` | covered | Dedicated config-file location section exists. |
| Available settings | `09-advanced-features/README.md#complete-configuration-example` | partial | Example config exists, but not as a systematic settings catalog. |
| Global config settings | `09-advanced-features/README.md#configuration-file-locations` | partial | Present, but not separated clearly from other scopes. |
| Worktree settings | `09-advanced-features/README.md#git-worktrees` | partial | Worktree behavior is documented, but not in settings terminology. |
| Permission settings | `09-advanced-features/README.md#permission-modes`, `10-cli/README.md#tool-permission-management` | covered | Strong practical coverage exists. |
| Permission rule syntax | none explicit in settings page; partial in CLI/listings | partial | Permission topics exist, but rule syntax is not explained at official depth in repo. |
| Sandbox settings | `09-advanced-features/README.md#sandboxing` | covered | Strong dedicated section exists. |
| Sandbox path prefixes | none explicit | missing | No dedicated path-prefix semantics found. |
| Attribution settings | none found | missing | No dedicated attribution coverage found. |
| File suggestion settings | none found | missing | No dedicated file-suggestion coverage found. |
| Hook configuration | `06-hooks/README.md#configuration` | covered | Strong cross-module coverage exists. |
| Settings precedence | none explicit | missing | No dedicated precedence model found. |
| Verify active settings | `/config` mention only | partial | `/config` is referenced, but active-settings verification is not explained. |
| Key points about the configuration system | none explicit | missing | No summary/reference equivalent found. |
| System prompt | `10-cli/README.md#system-prompt-customization` | covered | Dedicated system-prompt coverage exists. |
| Excluding sensitive files | none found | missing | No dedicated exclusion coverage found. |
| Subagent configuration | `04-subagents/README.md#configuration` | covered | Strong cross-module coverage exists. |
| Plugin configuration | `07-plugins/README.md` | covered | Strong cross-module coverage exists. |
| Plugin settings | `07-plugins/README.md#plugin-settings`, `#managed-settings-for-plugins` | covered | Explicitly covered. |
| enabledPlugins | `07-plugins/README.md#managed-settings-for-plugins` | covered | Explicitly documented. |
| extraKnownMarketplaces | `07-plugins/README.md#marketplace-configuration`, `#managed-settings-for-plugins` | covered | Explicitly documented. |
| strictKnownMarketplaces | `07-plugins/README.md#marketplace-configuration`, `#managed-settings-for-plugins` | covered | Explicitly documented. |
| Managing plugins | `07-plugins/README.md#plugin-cli-commands`, install/lifecycle sections | covered | Strong coverage exists. |
| Environment variables | `09-advanced-features/README.md#environment-variables`, `10-cli/README.md#key-environment-variables` | covered | Strong coverage exists. |
| Tools available to Claude | none found | missing | No dedicated reference-style coverage found. |

Configuration subpage audit

| Official page | Repo mapping | Status | Evidence note |
|---|---|---|---|
| Configure permissions | `09-advanced-features/README.md#permission-modes`, `10-cli/README.md#tool-permission-management`, `01-slash-commands/README.md` | partial | Strong practical coverage, but official rule-syntax depth is not fully mirrored. |
| Choose a permission mode | `09-advanced-features/README.md#permission-modes` | covered | Dedicated mode coverage exists. |
| Sandboxing | `09-advanced-features/README.md#sandboxing` | covered | Strong dedicated coverage exists. |
| Terminal configuration | `01-slash-commands/README.md` command listing only | missing | Only `/terminal-setup` references exist; no actual guide. |
| Fullscreen rendering | none found | missing | No dedicated coverage found. |
| Model configuration | `10-cli/README.md#model--configuration`, `#models` | partial | Model selection exists, but not as a dedicated Claude Code config guide. |
| Speed up responses with fast mode | `10-cli/README.md`, `01-slash-commands/README.md` | partial | Fast mode is mentioned, but not deeply explained. |
| Voice dictation | `09-advanced-features/README.md#voice-dictation` | covered | Dedicated section exists. |
| Output styles | deprecated `/output-style` mention only in `01-slash-commands/README.md` | missing | No current output-styles feature guide exists. |
| Customize status line | `/statusline` listings, statusline setup subagent references | partial | Feature is present in listings, but no dedicated guide. |
| Customize keyboard shortcuts | `09-advanced-features/README.md#customizing-keybindings` | covered | Dedicated section exists. |

Interpretation

- The repo does well on hands-on operational features like permission modes, sandboxing, voice, and keybindings.
- The repo is weak on the `configuration system as a reference model`.
- The biggest missing items are not obscure: `terminal configuration`, `fullscreen rendering`, and `output styles` are real holes.

Recommended configuration backlog

Priority 1

- Add dedicated docs for:
  - terminal configuration
  - fullscreen rendering
  - output styles

Priority 2

- Add a real `settings model` page or section:
  - scopes
  - precedence
  - active-setting verification
  - what each scope should be used for

Priority 3

- Expand permission coverage to include:
  - rule syntax
  - tool-specific examples
  - interplay with sandboxing

Priority 4

- Add dedicated status line and fast mode guidance rather than command-list-only coverage.
