Title

Deep coverage audit for remaining high-value reference pages

Purpose

Audit the remaining major reference pages not fully expanded in the earlier section-level audits:

- CLI reference
- Interactive mode
- Checkpointing
- Channels reference

Sources

- Official:
  - `https://code.claude.com/docs/en/cli-reference`
  - `https://code.claude.com/docs/en/interactive-mode`
  - `https://code.claude.com/docs/en/checkpointing`
  - `https://code.claude.com/docs/en/channels-reference`
- Repo:
  - `10-cli/README.md`
  - `09-advanced-features/README.md`
  - `08-checkpoints/README.md`
  - `08-checkpoints/checkpoint-examples.md`
  - `01-slash-commands/README.md`

Status rules

- `covered`: strong dedicated coverage exists.
- `partial`: concept exists but not at official reference depth.
- `missing`: no meaningful corresponding coverage found.

Page audit

| Official page | Repo mapping | Status | Evidence note |
|---|---|---|---|
| CLI reference | `10-cli/README.md` | covered | Dedicated module with commands, flags, models, sessions, MCP, examples, and troubleshooting. |
| Interactive mode | `09-advanced-features/README.md#interactive-features`, `#voice-dictation`, `#task-list`; `01-slash-commands/README.md`; `08-checkpoints/README.md` | partial | Many interactive features are covered, but official reference-level keyboard/control granularity is spread across modules. |
| Checkpointing | `08-checkpoints/README.md`, `08-checkpoints/checkpoint-examples.md` | covered | Dedicated module and examples exist; depth is lower than some other modules but core parity is good. |
| Channels reference | `09-advanced-features/README.md#channels`, `10-cli/README.md`, `CATALOG.md` | partial | Usage and startup flags are covered, but the official page is a channel-server implementation reference, which the repo does not match yet. |

Interactive mode section notes

| Official interactive section | Repo mapping | Status | Evidence note |
|---|---|---|---|
| Keyboard shortcuts | `09-advanced-features/README.md#keyboard-shortcuts` | covered | Strong shortcut coverage exists. |
| Text editing | `09-advanced-features/README.md#inline-editing`, `#vim-mode` | partial | Covered, but not in the same reference grouping. |
| Theme and display | none explicit | missing | No dedicated theme/display reference found. |
| Multiline input | `09-advanced-features/README.md#multi-line-input` | covered | Dedicated section exists. |
| Quick commands | `01-slash-commands/README.md`, `09-advanced-features/README.md` | partial | Commands exist, but not as an interactive-mode quick command section. |
| Transcript viewer | `09-advanced-features/README.md#inline-editing`, verbose output mentions | partial | Transcript-related behavior is not explicitly mirrored. |
| Voice input | `09-advanced-features/README.md#voice-dictation` | covered | Dedicated section exists. |
| Built-in commands | `01-slash-commands/README.md` | covered | Dedicated built-in commands reference exists. |
| Vim editor mode | `09-advanced-features/README.md#vim-mode` | covered | Dedicated section exists. |
| Command history / reverse search | `09-advanced-features/README.md#command-history` | covered | Dedicated command-history section exists. |
| Background bash commands | `09-advanced-features/README.md#background-tasks`, `10-cli/README.md` | partial | Background task concepts exist, but shell-background semantics are not reference-complete. |
| Bash mode with `!` prefix | `09-advanced-features/README.md#bash-mode` | covered | Dedicated section exists. |
| Prompt suggestions | `09-advanced-features/README.md#prompt-suggestions` | covered | Dedicated section exists. |
| Task list | `09-advanced-features/README.md#task-list` | covered | Dedicated section exists. |

Checkpointing section notes

| Official checkpointing section | Repo mapping | Status | Evidence note |
|---|---|---|---|
| How checkpoints work | `08-checkpoints/README.md#key-concepts`, `#automatic-checkpoints` | covered | Core behavior is explained. |
| Automatic tracking | `08-checkpoints/README.md#automatic-checkpoints` | covered | Explicit coverage exists. |
| Rewind and summarize | `08-checkpoints/README.md#accessing-checkpoints`, `#using-checkpoints` | covered | Rewind access and actions are documented. |
| Restore vs summarize | `08-checkpoints/README.md#rewind-options` | partial | Present, but less sharply articulated than official doc. |
| Common use cases | `08-checkpoints/README.md#use-cases`, examples file | covered | Multiple use cases and examples exist. |
| Limitations | `08-checkpoints/README.md#limitations` | covered | Dedicated limitations section exists. |
| Bash command changes not tracked | `08-checkpoints/README.md#limitations` | covered | Explicitly documented. |
| External changes not tracked | `08-checkpoints/README.md#limitations` | covered | Explicitly documented. |
| Not a replacement for version control | `08-checkpoints/README.md#integration-with-git` | covered | Explicitly documented. |

Channels reference notes

| Official channels section | Repo mapping | Status | Evidence note |
|---|---|---|---|
| Overview | `09-advanced-features/README.md#channels` | partial | Repo explains user-facing channels, not channel architecture/reference depth. |
| What you need | none found | missing | No builder-oriented prerequisites section found. |
| Example: build a webhook receiver | none found | missing | No channel-server implementation walkthrough found. |
| Test during research preview | none found | missing | No dedicated preview/testing section found. |
| Server options | none found | missing | No server-constructor or config-contract reference found. |
| Notification format | none found | missing | No notification payload reference found. |
| Expose a reply tool | none found | missing | No two-way channel guidance found. |
| Gate inbound messages | none found | missing | No sender-gating guidance found. |
| Relay permission prompts | none found | missing | No remote permission relay guidance found. |
| Package as a plugin | `07-plugins/README.md` | partial | Plugin packaging exists generally, but not in channel-specific form. |

Interpretation

- `CLI reference` and `Checkpointing` are in relatively good shape.
- `Interactive mode` is functionally well covered, but the content is split across multiple modules instead of matching the official reference shape.
- `Channels reference` is a real feature-doc gap: the repo covers user-facing usage but not channel implementation/reference.

Recommended backlog

Priority 1

- Add a real `Channels reference` page or section set:
  - architecture
  - notification format
  - reply tool
  - sender gating
  - permission relay
  - webhook receiver example

Priority 2

- Consolidate interactive-mode reference coverage into one place:
  - transcript viewer
  - theme/display
  - quick commands
  - background bash semantics

Priority 3

- Tighten checkpointing copy so `restore vs summarize` matches the official distinction more directly.
