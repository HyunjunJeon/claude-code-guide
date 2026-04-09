<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

# Terminal Configuration

Claude Code works in many terminals, but some quality-of-life features depend on terminal setup. This guide focuses on the settings that materially change day-to-day usage: line breaks, notifications, large inputs, and the handoff to fullscreen rendering.

## Themes and Appearance

Claude Code cannot change your terminal application's theme for you. Your terminal controls:

- background and foreground colors
- font
- transparency
- terminal-level color theme

Claude Code can still be tuned from inside the app:

- `/config` for UI settings
- `/statusline` for a custom status line

Use the terminal theme for global appearance, and Claude Code settings for Claude-specific UI behavior.

## Entering Line Breaks Reliably

There are several ways to insert a newline without submitting the prompt.

| Method | Notes |
|---|---|
| `\` then `Enter` | Quick escape, works everywhere |
| `Ctrl+J` | Reliable line feed in any terminal |
| `Shift+Enter` | Native in iTerm2, WezTerm, Ghostty, and Kitty |
| Custom keybinding | Best fallback for terminals without native support |

### `/terminal-setup`

Run:

```bash
/terminal-setup
```

This helps configure `Shift+Enter` in terminals that need manual setup, such as:

- VS Code terminal
- Alacritty
- Zed
- Warp

If you do not see `/terminal-setup`, your terminal probably supports the behavior already.

### macOS Terminal.app

To make `Option+Enter` more useful:

1. Open `Settings -> Profiles -> Keyboard`
2. Enable `Use Option as Meta Key`

### iTerm2

1. Open `Settings -> Profiles -> Keys`
2. Set the left/right Option key to `Esc+` if you want Meta-style behavior

### VS Code Terminal

On macOS, this setting helps:

```json
{
  "terminal.integrated.macOptionIsMeta": true
}
```

## Notifications

Claude Code emits notification events when it has finished and is waiting for your next input. How you surface those notifications depends on your terminal.

### Native terminal notifications

Good support:

- Kitty
- Ghostty

iTerm2 also works, but requires setup:

1. Open `Settings -> Profiles -> Terminal`
2. Enable `Notification Center Alerts`
3. In `Filter Alerts`, enable escape-sequence-generated alerts

### tmux passthrough

If Claude Code is inside tmux and your outer terminal supports notifications, allow passthrough:

```tmux
set -g allow-passthrough on
```

Without passthrough, the outer terminal may never see Claude's notification sequences.

### Notification hooks

If your terminal does not support native notifications well, use a hook instead:

- play a sound
- send a desktop notification
- notify Slack or another service

See [Hooks Guide](../06-hooks/README.md) for automation patterns.

## Handling Large Inputs

Claude Code performs better when long content comes from files rather than giant paste blobs.

Preferred workflow:

1. put long content in a file
2. ask Claude to read the file
3. only paste short, targeted snippets into the prompt

Good examples:

```bash
claude "Review the migration plan in docs/migration-plan.md"
```

```bash
cat logs/error.log | claude -p "Summarize the root cause"
```

Avoid pasting huge transcripts or very long code dumps directly into the prompt box when a file-based workflow is possible.

## Reduce Flicker and Memory Pressure

If the terminal feels unstable during long sessions, move to fullscreen rendering:

```bash
CLAUDE_CODE_NO_FLICKER=1 claude
```

See [Fullscreen Rendering](./fullscreen-rendering.md) for the detailed behavior and tradeoffs.

## Vim Mode

If you edit prompts heavily and prefer modal input, enable Vim mode through:

```bash
/config
```

or by using the built-in Vim settings path documented in the main advanced-features guide.

## Recommended Terminal Setups

### Best out-of-the-box experience

- iTerm2
- WezTerm
- Ghostty
- Kitty

These generally require less manual newline and notification setup.

### Still workable, but likely to need tuning

- VS Code integrated terminal
- tmux
- Terminal.app

These setups benefit most from:

- `/terminal-setup`
- fullscreen rendering
- explicit notification configuration

## Try It Now

### 1. Verify your newline workflow

Open Claude Code and test:

- `Ctrl+J`
- `Shift+Enter`
- `/terminal-setup` if `Shift+Enter` does not work

Expected result:

- you can insert a newline without accidentally sending the prompt

### 2. Verify notifications

Trigger a short task and wait until Claude finishes.

Expected result:

- a terminal-native notification appears, or
- you confirm you need a notification hook instead

## Related Guides

- [Advanced Features README](./README.md)
- [Fullscreen Rendering](./fullscreen-rendering.md)
- [Hooks Guide](../06-hooks/README.md)
- [CLI Reference](../10-cli/README.md)

## Official Reference

- https://code.claude.com/docs/en/terminal-config
