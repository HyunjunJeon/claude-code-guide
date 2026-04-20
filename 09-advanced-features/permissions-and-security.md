# Permissions & Security

---

## Permission Modes

Permission modes control what actions Claude can take without explicit approval.

### Available Permission Modes

| Mode | Behavior |
|---|---|
| `default` | Read files only; prompts for all other actions |
| `acceptEdits` | Read and edit files; prompts for commands |
| `plan` | Read files only (research mode, no edits) |
| `auto` | All actions with background safety classifier checks (Research Preview) |
| `bypassPermissions` | All actions, no permission checks (dangerous) |
| `dontAsk` | Only pre-approved tools execute; all others denied |

Cycle through modes with `Shift+Tab` in the CLI. Set a default with the `--permission-mode` flag or the `permissions.defaultMode` setting.

### Activation Methods

**Keyboard shortcut**:
```bash
Shift + Tab  # Cycle through all 6 modes
```

**Slash command**:
```bash
/plan                  # Enter plan mode
```

**CLI flag**:
```bash
claude --permission-mode plan
claude --permission-mode auto
```

**Setting**:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### Permission Mode Examples

#### Default Mode
Claude asks for confirmation on significant actions:

```
User: Fix the bug in auth.ts

Claude: I need to modify src/auth.ts to fix the bug.
The change will update the password validation logic.

Approve this change? (yes/no/show)
```

#### Plan Mode
Review implementation plan before execution:

```
User: /plan Implement user authentication system

Claude: I'll create a plan for implementing authentication.

## Implementation Plan
[Detailed plan with phases and steps]

Ready to proceed? (yes/no/modify)
```

#### Accept Edits Mode
Automatically accept file modifications:

```
User: acceptEdits
User: Fix the bug in auth.ts

Claude: [Makes changes without asking]
```

### Use Cases

**Code Review**:
```
User: claude --permission-mode plan
User: Review this PR and suggest improvements

Claude: [Reads code, provides feedback, but cannot modify]
```

**Pair Programming**:
```
User: claude --permission-mode default
User: Let's implement the feature together

Claude: [Asks for approval before each change]
```

**Automated Tasks**:
```
User: claude --permission-mode acceptEdits
User: Fix all linting issues in the codebase

Claude: [Auto-accepts file edits without asking]
```

---

## Sandboxing

Sandboxing provides OS-level filesystem and network isolation for Bash commands executed by Claude Code. This is complementary to permission rules and provides an additional security layer.

### Enabling Sandboxing

**Slash command**:
```
/sandbox
```

**CLI flags**:
```bash
claude --sandbox       # Enable sandboxing
claude --no-sandbox    # Disable sandboxing
```

### Configuration Settings

| Setting | Description |
|---------|-------------|
| `sandbox.enabled` | Enable or disable sandboxing |
| `sandbox.failIfUnavailable` | Fail if sandboxing cannot be activated |
| `sandbox.filesystem.allowWrite` | Paths allowed for write access |
| `sandbox.filesystem.allowRead` | Paths allowed for read access |
| `sandbox.filesystem.denyRead` | Paths denied for read access |
| `sandbox.enableWeakerNetworkIsolation` | Enable weaker network isolation on macOS |

### Example Configuration

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "filesystem": {
      "allowWrite": ["/Users/me/project"],
      "allowRead": ["/Users/me/project", "/usr/local/lib"],
      "denyRead": ["/Users/me/.ssh", "/Users/me/.aws"]
    },
    "enableWeakerNetworkIsolation": true
  }
}
```

### How It Works

- Bash commands run in a sandboxed environment with restricted filesystem access
- Network access can be isolated to prevent unintended external connections
- Works alongside permission rules for defense in depth
- On macOS, use `sandbox.enableWeakerNetworkIsolation` for network restrictions (full network isolation is not available on macOS)

### Use Cases

- Running untrusted or generated code safely
- Preventing accidental modifications to files outside the project
- Restricting network access during automated tasks
