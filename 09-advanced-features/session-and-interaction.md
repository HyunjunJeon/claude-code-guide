# Session & Interaction

---

## Session Management

Manage multiple Claude Code sessions effectively.

### Session Management Commands

| Command | Description |
|---------|-------------|
| `/resume` | Resume a conversation by ID or name |
| `/rename` | Name the current session |
| `/fork` | Fork current session into a new branch |
| `claude -c` | Continue most recent conversation |
| `claude -r "session"` | Resume session by name or ID |

### Resuming Sessions

**Continue last conversation**:
```bash
claude -c
```

**Resume a named session**:
```bash
claude -r "auth-refactor" "finish this PR"
```

**Rename the current session** (inside the REPL):
```
/rename auth-refactor
```

### Forking Sessions

Fork a session to try an alternative approach without losing the original:

```
/fork
```

Or from the CLI:
```bash
claude --resume auth-refactor --fork-session "try OAuth instead"
```

### Session Persistence

Sessions are automatically saved and can be resumed:

```bash
# Continue last conversation
claude -c

# Resume specific session by name or ID
claude -r "auth-refactor"

# Resume and fork for experimentation
claude --resume auth-refactor --fork-session "alternative approach"
```

Use `--fork-session` with `--resume` to fork an existing session into a new one.

---

## Interactive Features

### Keyboard Shortcuts

Claude Code supports keyboard shortcuts for efficiency. Here's the complete reference from official docs:

| Shortcut | Description |
|----------|-------------|
| `Ctrl+C` | Cancel current input/generation |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+G` | Edit plan in external editor |
| `Ctrl+L` | Clear terminal screen |
| `Ctrl+O` | Toggle verbose output (view reasoning) |
| `Ctrl+R` | Reverse search history |
| `Ctrl+T` | Toggle task list view |
| `Ctrl+B` | Background running tasks |
| `Esc+Esc` | Rewind code/conversation |
| `Shift+Tab` / `Alt+M` | Toggle permission modes |
| `Option+P` / `Alt+P` | Switch model |
| `Option+T` / `Alt+T` | Toggle extended thinking |
| `Ctrl+X Ctrl+K` | Kill all background agents |
| `Ctrl+X Ctrl+E` | Open in external editor (alias for Ctrl+G) |

**Line Editing (standard readline shortcuts):**

| Shortcut | Action |
|----------|--------|
| `Ctrl + A` | Move to line start |
| `Ctrl + E` | Move to line end |
| `Ctrl + K` | Cut to end of line |
| `Ctrl + U` | Cut to start of line |
| `Ctrl + W` | Delete word backward |
| `Ctrl + Y` | Paste (yank) |
| `Tab` | Autocomplete |
| `↑ / ↓` | Command history |

### Theme and Display

Claude Code does not own your terminal theme, but it does affect how the interface feels inside the terminal.

Use:
- your terminal emulator for fonts, colors, and overall theme
- `/config` and `/statusline` for Claude-specific interface behavior
- fullscreen rendering when long sessions feel visually unstable

The practical split is: terminal controls appearance, Claude Code controls interaction behavior.

### Customizing keybindings

Create custom keyboard shortcuts by running `/keybindings`, which opens `~/.claude/keybindings.json` for editing (v2.1.18+).

**Configuration format**:

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null,
        "ctrl+k ctrl+s": "chat:stash"
      }
    },
    {
      "context": "Confirmation",
      "bindings": {
        "ctrl+a": "confirmation:yes"
      }
    }
  ]
}
```

Set a binding to `null` to unbind a default shortcut.

### Available contexts

Keybindings are scoped to specific UI contexts:

| Context | Key Actions |
|---------|-------------|
| **Chat** | `submit`, `cancel`, `cycleMode`, `modelPicker`, `thinkingToggle`, `undo`, `externalEditor`, `stash`, `imagePaste` |
| **Confirmation** | `yes`, `no`, `previous`, `next`, `nextField`, `cycleMode`, `toggleExplanation` |
| **Global** | `interrupt`, `exit`, `toggleTodos`, `toggleTranscript` |
| **Autocomplete** | `accept`, `dismiss`, `next`, `previous` |
| **HistorySearch** | `search`, `previous`, `next` |
| **Settings** | Context-specific settings navigation |
| **Tabs** | Tab switching and management |
| **Help** | Help panel navigation |

There are 18 contexts total including `Transcript`, `Task`, `ThemePicker`, `Attachments`, `Footer`, `MessageSelector`, `DiffDialog`, `ModelPicker`, and `Select`.

### Chord support

Keybindings support chord sequences (multi-key combinations):

```
"ctrl+k ctrl+s"   → Two-key sequence: press ctrl+k, then ctrl+s
"ctrl+shift+p"    → Simultaneous modifier keys
```

**Keystroke syntax**:
- **Modifiers**: `ctrl`, `alt` (or `opt`), `shift`, `meta` (or `cmd`)
- **Uppercase implies Shift**: `K` is equivalent to `shift+k`
- **Special keys**: `escape`, `enter`, `return`, `tab`, `space`, `backspace`, `delete`, arrow keys

### Reserved and conflicting keys

| Key | Status | Notes |
|-----|--------|-------|
| `Ctrl+C` | Reserved | Cannot be rebound (interrupt) |
| `Ctrl+D` | Reserved | Cannot be rebound (exit) |
| `Ctrl+B` | Terminal conflict | tmux prefix key |
| `Ctrl+A` | Terminal conflict | GNU Screen prefix key |
| `Ctrl+Z` | Terminal conflict | Process suspend |

> **Tip**: If a shortcut does not work, check for conflicts with your terminal emulator or multiplexer.

**Transcript search** (v2.1.83+): Press `/` in transcript mode to search through conversation history.

### Transcript Viewer and Search

Transcript-oriented navigation is a distinct part of interactive mode:

- `Ctrl+O` opens the transcript/verbose view flow
- `/` searches inside transcript mode
- `[` can push conversation content back to terminal scrollback for native search

Use transcript mode when the normal chat surface is too compressed for inspection or when you need search behavior that differs from the live prompt view.

### Tab Completion

Claude Code provides intelligent tab completion:

```
User: /rew<TAB>
→ /rewind

User: /plu<TAB>
→ /plugin

User: /plugin <TAB>
→ /plugin install
→ /plugin enable
→ /plugin disable
```

### Quick Commands

Interactive mode is not just typing plain prompts. In practice, quick commands are part of the day-to-day interaction model:

- `/` for slash-command discovery
- tab completion for narrowing command names
- direct mode toggles and built-in shortcuts for common actions

This is why the command surface belongs in the interactive reference story even though the full command catalog lives in the slash-commands guide.

### Command History

Access previous commands:

```
User: <↑>  # Previous command
User: <↓>  # Next command
User: Ctrl+R  # Search history

(reverse-i-search)`test': run all tests
```

### Multi-line Input

For complex queries, use multi-line mode:

```bash
User: \
> Long complex prompt
> spanning multiple lines
> \end
```

**Example:**

```
User: \
> Implement a user authentication system
> with the following requirements:
> - JWT tokens
> - Email verification
> - Password reset
> - 2FA support
> \end

Claude: [Processes the multi-line request]
```

### Inline Editing

Edit commands before sending:

```
User: Deploy to prodcution<Backspace><Backspace>uction

[Edit in-place before sending]
```

### Vim Mode

Enable Vi/Vim keybindings for text editing:

**Activation**:
- Use `/vim` command or `/config` to enable
- Mode switching with `Esc` for NORMAL, `i/a/o` for INSERT

**Navigation keys**:
- `h` / `l` - Move left/right
- `j` / `k` - Move down/up
- `w` / `b` / `e` - Move by word
- `0` / `$` - Move to line start/end
- `gg` / `G` - Jump to start/end of text

**Text objects**:
- `iw` / `aw` - Inner/around word
- `i"` / `a"` - Inner/around quoted string
- `i(` / `a(` - Inner/around parentheses

### Bash Mode

Execute shell commands directly with `!` prefix:

```bash
! npm test
! git status
! cat src/index.js
```

### Background Bash vs Background Tasks

Keep these two ideas separate:

- `!` runs an immediate shell command inside the interactive session
- background tasks are longer-lived operations that continue without blocking the main conversation

Use `!` when you want a quick shell action now.

Use background tasks when the command or workflow should keep running while you continue interacting with Claude.

Use this for quick command execution without switching contexts.

---

## Voice Dictation

Voice Dictation provides push-to-talk voice input for Claude Code, allowing you to speak your prompts instead of typing them.

### Activating Voice Dictation

```
/voice
```

### Features

| Feature | Description |
|---------|-------------|
| **Push-to-talk** | Hold a key to record, release to send |
| **20 languages** | Speech-to-text supports 20 languages |
| **Custom keybinding** | Configure the push-to-talk key via `/keybindings` |
| **Account requirement** | Requires a Claude.ai account for STT processing |

### Configuration

Hold `Space` to use push-to-talk voice dictation (rebindable via `/keybindings`).

Customize the push-to-talk keybinding in your keybindings file (`/keybindings`). Voice dictation uses your Claude.ai account for speech-to-text processing.

---

## Task List

The Task List feature provides persistent task tracking that survives context compactions (when the conversation history is trimmed to fit the context window).

### Toggling the Task List

Press `Ctrl+T` to toggle the task list view on or off during a session.

### Persistent Tasks

Tasks persist across context compactions, ensuring that long-running work items are not lost when the conversation context is trimmed. This is particularly useful for complex, multi-step implementations.

### Named Task Directories

Use the `CLAUDE_CODE_TASK_LIST_ID` environment variable to create named task directories shared across sessions:

```bash
export CLAUDE_CODE_TASK_LIST_ID=my-project-sprint-3
```

This allows multiple sessions to share the same task list, making it useful for team workflows or multi-session projects.

---

## Prompt Suggestions

Prompt Suggestions display grayed-out example commands based on your git history and current conversation context.

### How It Works

- Suggestions appear as grayed-out text below your input prompt
- Press `Tab` to accept the suggestion
- Press `Enter` to accept and immediately submit
- Suggestions are context-aware, drawing from git history and conversation state

### Disabling Prompt Suggestions

```bash
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
```
