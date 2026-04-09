<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

# Use Claude Code in VS Code

The VS Code extension gives you a VS Code-native workflow on top of Claude Code's core capabilities. It is best when you want editor-aware prompting, visible diff review, and conversation management inside the IDE instead of in a raw terminal alone.

## What You Get in VS Code

The extension adds a graphical Claude Code surface directly into VS Code:

- a dedicated Claude panel
- editor-aware prompts
- `@` references to files and folders
- side-by-side diff review before edits
- multiple conversations in tabs or windows
- shared access to Claude Code settings and plugins

This is not a different product. It is Claude Code in a VS Code-native shell.

## Prerequisites

Before you install it, make sure you have:

- a supported VS Code build
- access to Claude Code through the extension's supported login or provider flow

You can still use terminal-only Claude Code workflows from VS Code's integrated terminal when needed.

## Install the Extension

In VS Code:

1. Open the Extensions view with `Cmd+Shift+X` on macOS or `Ctrl+Shift+X` on Windows/Linux
2. Search for `Claude Code`
3. Install it

If it does not appear immediately:

- restart VS Code, or
- run `Developer: Reload Window`

## Get Started

### Open Claude

Common entry points:

- Spark icon in the editor toolbar
- Spark icon in the Activity Bar
- `Claude Code` commands from the Command Palette
- Claude status item in the status bar

The activity-bar icon is the most stable entry point because it is always visible.

### Send a prompt

Claude automatically sees editor selection context. You can also insert a file-and-range reference with:

- `Option+K` on macOS
- `Alt+K` on Windows/Linux

That turns the current selection into an explicit `@file#start-end` style reference.

### Review edits

When Claude wants to edit files, VS Code shows a side-by-side comparison and asks you to accept, reject, or redirect the change.

This is one of the main reasons the extension is valuable: edit review feels native.

## Use the Prompt Box Well

The prompt box supports more than raw text entry.

### Permission modes

Use the prompt-box mode controls when you want to switch how Claude handles edits and approvals during the current task.

### Command menu

Type `/` to access commands such as:

- model selection
- extended thinking
- usage views
- remote control
- access to MCP, hooks, memory, permissions, and plugins

### Multi-line input

Use:

- `Shift+Enter` for a newline without sending

## Reference Files and Folders

Use `@`-mentions when you want Claude to work from explicit repo context.

Examples:

```text
Explain the logic in @src/auth
```

```text
Review @server.ts#120-180
```

Useful details:

- fuzzy matching is supported
- selected editor text is visible automatically
- `Option+K` / `Alt+K` inserts a range reference for you
- attachments can be removed before sending

## Resume Past Conversations

The extension keeps a conversation list in the Claude panel.

You can:

- search prior sessions
- resume local sessions
- rename them
- remove them

This makes VS Code a better fit than raw terminal usage when you work on several parallel threads.

## Customize Your Workflow

### Choose where Claude lives

You can place the Claude panel in:

- the right sidebar
- the left sidebar
- the editor area as a tab

Use the sidebar for your main conversation and tabs for side tasks.

### Run multiple conversations

Open additional sessions in:

- new tabs
- new windows

Each conversation keeps its own context and history, so this is a practical way to separate refactor, review, and debugging work.

### Switch to terminal mode

If you prefer the CLI-style interface, enable the extension's terminal mode setting. That gives you a closer match to raw Claude Code while staying inside VS Code.

## Manage Plugins in VS Code

The extension includes a graphical plugin-management flow.

You can:

- install plugins
- enable or disable them
- manage marketplaces
- pick install scope

Typical scopes:

- user
- project
- local

After major plugin changes, expect to reload or restart the extension side so all components come online cleanly.

## VS Code Commands and Shortcuts

Useful extension-level commands often include:

| Command | Shortcut | What it does |
|---|---|---|
| Focus Input | `Cmd+Esc` / `Ctrl+Esc` | Toggle focus between editor and Claude |
| Open in New Tab | `Cmd+Shift+Esc` / `Ctrl+Shift+Esc` | Start a new conversation tab |
| New Conversation | `Cmd+N` / `Ctrl+N` when Claude is focused | Start a fresh conversation |
| Insert `@` reference | `Option+K` / `Alt+K` | Insert current file/selection reference |

Keep in mind:

- these are VS Code extension commands, not generic terminal shortcuts
- not every terminal-only Claude Code command is exposed the same way in the extension UI

## Configure Settings

There are two settings layers to keep straight.

### VS Code extension settings

These control extension behavior inside VS Code, such as:

- panel placement
- UI defaults
- extension-specific workflow preferences

### Claude Code settings

These live in Claude Code's own config files and are shared with CLI behavior:

- allowed commands
- MCP configuration
- hooks
- environment variables
- output style

If you want shared behavior across CLI and extension, use Claude Code settings, not only extension settings.

## VS Code Extension vs Claude Code CLI

Think of them as overlapping interfaces with different strengths.

### Use the VS Code extension when you want:

- native diff review
- editor-aware prompting
- file and range references
- multi-tab conversation management
- a more graphical plan-review flow

### Use the CLI in VS Code's terminal when you need:

- terminal-only commands
- `!` shell shortcuts
- raw CLI workflows
- behaviors that have not been surfaced in the extension UI

In practice, many power users use both.

## Rewind with Checkpoints

Checkpoint-based rewind remains part of the broader Claude Code workflow even when you work from the extension. For the full model and caveats, see the dedicated checkpoints guide.

## Work with Git and External Tools

The extension still benefits from the rest of Claude Code:

- MCP integrations
- git workflows
- commits and PR preparation
- worktree-oriented parallel tasks

VS Code is an interface layer, not a separate feature silo.

## Security and Privacy Notes

Treat the extension with the same care as CLI usage:

- understand the active permission mode
- review proposed edits
- know whether you are using local CLI settings or extension-only preferences
- be cautious with plugins and remote integrations

## Common Issues

### Extension will not install

Check:

- VS Code version
- reload window
- whether the extension actually finished installing

### Spark icon is missing

Check:

- whether a file is open
- whether the panel is docked somewhere non-obvious
- whether the Activity Bar icon is present instead

### Claude never responds

Check:

- login state
- whether extension settings are conflicting with your intended provider setup
- whether the underlying Claude process is starting correctly

## Try It Now

### 1. Open Claude from the editor toolbar

With a code file open, click the Spark icon and ask Claude to explain the currently selected function.

Expected result:

- selection is available to Claude
- you get an IDE-native response flow rather than a raw terminal one

### 2. Insert a line-range reference

Select a block of code and press:

- `Option+K` on macOS, or
- `Alt+K` on Windows/Linux

Expected result:

- the prompt includes a precise file-and-range reference

### 3. Compare extension mode vs CLI mode

Use the extension for one task, then run Claude in VS Code's integrated terminal for another.

Expected result:

- you can see clearly which tasks feel better in the graphical extension and which still benefit from the raw CLI

## Related Guides

- [Advanced Features README](./README.md)
- [Settings System Guide](./settings-system-guide.md)
- [Checkpoints Guide](../08-checkpoints/README.md)
- [CLI Reference](../10-cli/README.md)
- [MCP Guide](../05-mcp/README.md)

## Official Reference

See the Claude Code docs navigation under `Platforms and integrations -> Visual Studio Code`.
