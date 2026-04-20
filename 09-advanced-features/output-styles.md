
# Output Styles

Output styles let you change how Claude Code responds without giving up its core CLI behavior. This is the right tool when you want a persistent response mode, not a one-off prompt tweak.

## What Output Styles Are For

Use output styles when you want Claude Code to stay in a consistent response mode across a session:

- Explain implementation choices while coding
- Turn coding work into a guided learning exercise
- Apply a non-default structure or tone to all replies
- Keep a custom working mode available through `/config`

Output styles are different from a normal prompt because they change the system-prompt layer that Claude Code starts with.

## Built-In Output Styles

Claude Code ships with three built-in styles:

| Style | When to use it | What changes |
|---|---|---|
| `Default` | Normal engineering work | Uses the standard coding-focused Claude Code behavior |
| `Explanatory` | You want commentary while Claude works | Adds educational explanation and implementation insights |
| `Learning` | You want guided participation | Encourages learn-by-doing and may leave `TODO(human)` markers for you |

If your goal is still software engineering, start with `Default` or `Explanatory`. `Learning` is best when you explicitly want the session to slow down and teach.

## How Output Styles Work

Output styles modify Claude Code's system prompt rather than acting like ordinary user instructions.

Key behaviors:

- A selected output style is applied when a new session starts
- Switching styles mid-session does not fully rewire the current conversation
- Custom styles add their own instructions to the end of the system prompt
- Custom styles can optionally preserve coding-specific default instructions

This matters for both behavior and token cost:

- More style instructions increase input tokens
- Prompt caching reduces repeated cost after the first request in a session
- Verbose styles often increase output tokens too

## Change Your Output Style

The most convenient way is through `/config`.

```bash
/config
```

Then choose `Output style`.

You can also set it directly in settings:

```json
{
  "outputStyle": "Explanatory"
}
```

Common locations:

- Local project: `.claude/settings.local.json`
- Project-shared: `.claude/settings.json`
- User-wide: `~/.claude/settings.json`

In practice, local project scope is the safest default while you experiment.

## Create a Custom Output Style

Custom output styles are Markdown files stored in one of these locations:

- User-wide: `~/.claude/output-styles/`
- Project-wide: `.claude/output-styles/`
- Plugin-provided: `output-styles/` inside a plugin

Minimal example:

```md
---
name: Architecture Reviewer
description: Focus on tradeoffs, risks, and boundary decisions.
keep-coding-instructions: true
---

# Architecture Reviewer

Prioritize:
- boundary clarity
- migration risk
- operational impact
- testability

Prefer short, high-signal responses with explicit tradeoffs.
```

### Frontmatter

| Field | Purpose | Default |
|---|---|---|
| `name` | Display name shown in the picker | Falls back to file name |
| `description` | Short explanation shown in `/config` | None |
| `keep-coding-instructions` | Keep Claude Code's coding-specific default instructions | `false` |

### When to Set `keep-coding-instructions: true`

Set it to `true` when you still want Claude Code to behave like a coding agent and only want to change the presentation or emphasis.

Examples:

- architecture review mode
- concise code-explanation mode
- mentoring mode for implementation walkthroughs

Leave it `false` when the style is intentionally moving Claude Code away from normal software-engineering behavior.

## Example Project Layout

```text
.claude/
└── output-styles/
    ├── architecture-reviewer.md
    └── onboarding-mentor.md
```

## Comparisons

### Output Styles vs `CLAUDE.md`

Use output styles when you want to change how Claude responds.

Use `CLAUDE.md` when you want to give Claude durable project instructions such as:

- coding standards
- architecture rules
- testing expectations
- deployment constraints

`CLAUDE.md` is project memory. Output styles are response mode.

### Output Styles vs `--append-system-prompt`

Use `--append-system-prompt` for one session or one CLI invocation.

Use output styles for reusable, selectable modes that should be visible in configuration.

### Output Styles vs Agents

Use agents when you want a specialized worker with its own model, tools, or task boundary.

Use output styles when you want to change the main agent's tone, structure, or operating mode.

### Output Styles vs Skills

Use skills for task-specific workflows and reusable capability bundles.

Use output styles for persistent response behavior across the session.

## Recommended Patterns

### Pattern: Teaching Without Losing Coding Discipline

Use:

- `keep-coding-instructions: true`
- a short educational instruction set
- `Explanatory` as the baseline mental model

This keeps verification and coding discipline intact while making the session more transparent.

### Pattern: Project-Specific Review Mode

Create one project-level output style for:

- architecture review
- migration review
- release-readiness review

That gives the team a stable mode without forcing everyone to remember the same manual prompt.

## Common Mistakes

- Using output styles to store project rules that belong in `CLAUDE.md`
- Using a long style file that duplicates large parts of your existing system prompt strategy
- Expecting a style change to fully affect the current session without restarting
- Forgetting `keep-coding-instructions` when the style should still behave like Claude Code

## Try It Now

### 1. Switch to a built-in style

```bash
/config
```

Choose `Output style` and select `Explanatory`, then start a fresh session and ask Claude to explain a file-level refactor.

Expected result:

- Claude still codes
- responses include more implementation reasoning than `Default`

### 2. Add a project style

```bash
mkdir -p .claude/output-styles
```

Create `.claude/output-styles/architecture-reviewer.md` with the example above, then reopen `/config`.

Expected result:

- the new style appears in the picker
- selecting it gives the session a more architecture-focused review mode

## Related Guides

- [Advanced Features README](./README.md)
- [Memory Guide](../02-memory/README.md)
- [Skills Guide](../03-skills/README.md)
- [Subagents Guide](../04-subagents/README.md)

## Official Reference

- https://code.claude.com/docs/en/output-styles
