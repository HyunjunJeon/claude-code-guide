
# Fullscreen Rendering

Fullscreen rendering is an alternate rendering path for Claude Code that reduces flicker, keeps memory usage flatter in long sessions, and adds better mouse support.

It is called "fullscreen" because Claude Code takes over the terminal drawing surface in the same way `vim` or `htop` does. It does not mean your terminal window must be maximized.

## Why Use It

Enable fullscreen rendering when you notice:

- heavy flicker during long tool runs
- scroll position jumping while output streams
- sluggish rendering inside tmux or integrated terminals
- long sessions becoming visually unstable

This mode is especially useful in:

- VS Code integrated terminal
- tmux
- iTerm2
- other terminals where rendering throughput is the bottleneck

## Enable It

One session:

```bash
CLAUDE_CODE_NO_FLICKER=1 claude
```

Persistent:

```bash
export CLAUDE_CODE_NO_FLICKER=1
```

Add that export to your shell profile if you want it every time.

## What Changes

When fullscreen rendering is active:

- the input box stays fixed at the bottom
- only visible messages are rendered
- memory stays more stable in long sessions
- the conversation lives in the terminal's alternate screen buffer

That last point changes a few habits:

- native terminal search does not see the conversation until you export it back to scrollback
- mouse behavior is handled by Claude Code instead of by the terminal
- selection and scrolling semantics differ from the normal renderer

## Mouse and Selection Behavior

Fullscreen rendering can:

- move the cursor when you click in the prompt
- expand or collapse tool results
- open clickable URLs and file paths
- allow in-app text selection
- scroll the conversation with the mouse wheel

If you prefer native terminal selection, disable mouse capture while keeping flicker-free rendering:

```bash
CLAUDE_CODE_NO_FLICKER=1 CLAUDE_CODE_DISABLE_MOUSE=1 claude
```

## Scrolling and Search

Useful navigation shortcuts:

| Shortcut | Action |
|---|---|
| `PgUp` / `PgDn` | Scroll by half a screen |
| `Ctrl+Home` | Jump to the beginning |
| `Ctrl+End` | Jump to the latest message |
| `Ctrl+O` | Open transcript mode |

Transcript mode is the key workaround for alternate-screen limitations:

- `/` searches within transcript mode
- `[` writes the conversation into native terminal scrollback
- `v` opens the conversation in `$VISUAL` or `$EDITOR`

If you rely on terminal-native search like `Cmd+F`, transcript mode is essential.

## Adjust Scroll Speed

Some terminals send slow wheel events. You can increase scroll distance:

```bash
export CLAUDE_CODE_SCROLL_SPEED=3
```

Values from `1` to `20` are supported. `3` is a reasonable starting point.

## tmux Notes

Fullscreen rendering works well in normal tmux, but you should enable mouse mode:

```tmux
set -g mouse on
```

Important caveats:

- mouse wheel scrolling depends on tmux mouse mode
- `tmux -CC` in iTerm2 is a bad fit for fullscreen rendering
- if notifications or progress indicators need to reach the outer terminal, passthrough may also matter for your setup

## When Not To Use It

Leave fullscreen rendering off if:

- your current terminal already behaves smoothly
- you depend heavily on native terminal copy/search behavior
- you are in a terminal setup where mouse capture causes friction

## Troubleshooting

### Search does not work with `Cmd+F`

Expected in alternate-screen mode. Use:

- `Ctrl+O`, then `/` for in-app search
- `Ctrl+O`, then `[` to send the conversation to native scrollback

### Mouse selection feels wrong

Try:

```bash
CLAUDE_CODE_NO_FLICKER=1 CLAUDE_CODE_DISABLE_MOUSE=1 claude
```

### Wheel scrolling does nothing in tmux

Check:

```tmux
set -g mouse on
```

### Rendering still feels slow

Try the combination:

- fullscreen rendering on
- mouse disabled if you do not need it
- a moderate `CLAUDE_CODE_SCROLL_SPEED`

## Try It Now

### 1. Compare normal vs fullscreen rendering

Run one long session normally, then another with:

```bash
CLAUDE_CODE_NO_FLICKER=1 claude
```

Expected result:

- input remains anchored at the bottom
- visual flicker is reduced during streaming output

### 2. Export the transcript back to scrollback

While fullscreen rendering is active:

- press `Ctrl+O`
- press `[`

Expected result:

- the conversation becomes searchable with normal terminal tools

## Related Guides

- [Advanced Features README](./README.md)
- [Terminal Configuration](./terminal-configuration.md)
- [Sandboxing](./README.md#sandboxing)

## Official Reference

- https://code.claude.com/docs/en/fullscreen
