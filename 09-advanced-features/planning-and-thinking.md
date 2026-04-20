# Planning Mode & Extended Thinking

---

## Planning Mode

Planning mode allows Claude to think through complex tasks before implementing them, creating a detailed plan that you can review and approve.

### What is Planning Mode?

Planning mode is a two-phase approach:
1. **Planning Phase**: Claude analyzes the task and creates a detailed implementation plan
2. **Implementation Phase**: After approval, Claude executes the plan

### When to Use Planning Mode

✅ Use planning mode for:
- Complex multi-file refactoring
- New feature implementations
- Architectural changes
- Database migrations
- Major API redesigns

❌ Don't use planning mode for:
- Simple bug fixes
- Formatting changes
- Single-file edits
- Quick queries

### Activating Planning Mode

**Slash command**:
```bash
/plan Implement user authentication system
```

**CLI flag**:
```bash
claude --permission-mode plan
```

**Set as default**:
```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

**Keyboard shortcut**:
- `Shift + Tab` - Toggle permission modes (including plan)
- `Alt + M` - Toggle permission modes (Windows/Linux)

### Benefits of Planning Mode

- **Structured implementation approach**: Detailed breakdown of implementation steps
- **Review and approval**: Approve or adjust the plan before execution
- **Risk identification**: Identify potential issues before implementation
- **Clear phases**: Organized implementation phases and milestones

### Example: Feature Implementation

```
User: /plan Add a real-time notification system

Claude: I'll create a plan for implementing real-time notifications.

## Implementation Plan

### Phase 1: Infrastructure Setup
1. Install WebSocket libraries (socket.io)
2. Set up WebSocket server
3. Configure connection management

### Phase 2: Backend Implementation
4. Create notification service
5. Implement notification queue
6. Add database schema for notifications
7. Create API endpoints

### Phase 3: Frontend Integration
8. Set up WebSocket client
9. Create notification UI components
10. Implement notification state management
11. Add notification permissions

### Phase 4: Testing & Deployment
12. Write unit tests
13. Write integration tests
14. Update documentation
15. Deploy to staging

Estimated time: 3-4 hours
Files to modify: 12
New files to create: 8

Ready to proceed? (yes/no/modify plan)

User: yes

Claude: [Begins implementation following the plan]
```

### Plan Modifications

```
User: Modify the plan - skip the queue for now, we'll add it later

Claude: Updated plan:
[Shows modified plan with queue removed]

User: Looks good, proceed

Claude: [Implements modified plan]
```

### Planning Mode Configuration

Planning mode is activated via the CLI flag or slash command:

```bash
# Activate plan mode via CLI
claude --permission-mode plan

# Or use the /plan slash command inside the REPL
/plan Implement user authentication system
```

**Model alias for planning**: Use `opusplan` as a model alias to use Opus for planning and Sonnet for execution:

```bash
claude --model opusplan "design and implement the new API"
```

**Edit plan externally**: Press `Ctrl+G` to open the current plan in your external editor for detailed modifications.

### Ultraplan

Use `/ultraplan <prompt>` for an end-to-end planning workflow: Claude drafts a detailed plan, opens it in the browser for review, then executes the plan either remotely or sends it back to your terminal for local execution.

---

## Extended Thinking

Extended thinking allows Claude to spend more time reasoning about complex problems before providing a solution.

### What is Extended Thinking?

Extended thinking is a deliberate, step-by-step reasoning process where Claude:
- Breaks down complex problems
- Considers multiple approaches
- Evaluates trade-offs
- Reasons through edge cases

### Activating Extended Thinking

**Keyboard shortcut**:
- `Option + T` (macOS) / `Alt + T` (Windows/Linux) - Toggle extended thinking

**Automatic activation**:
- Enabled by default for all models (Opus 4.7, Opus 4.6, Sonnet 4.6, Haiku 4.5)
- Opus 4.7: Always uses adaptive reasoning; default effort is `xhigh`
- Opus 4.6: Adaptive reasoning with effort levels: `low` (○), `medium` (◐), `high` (●), `max` (Opus 4.6 only)
- Other models: Fixed budget up to 31,999 tokens

**Configuration methods**:
- Toggle: `Alt+T` / `Option+T`, or via `/config`
- View reasoning: `Ctrl+O` (verbose mode)
- Set effort: `/effort` command or `--effort` flag

**Custom budget**:
```bash
export MAX_THINKING_TOKENS=1024
```

**Effort level**:
```bash
export CLAUDE_CODE_EFFORT_LEVEL=high   # low (○), medium (◐), high (●), xhigh (Opus 4.7 default), or max
```

**CLI flag**:
```bash
claude --effort high "complex architectural review"
```

**Interactive effort slider:**
```bash
/effort          # Interactive slider (arrow keys)
/effort xhigh    # Set directly
/effort auto     # Reset to model default
```

### Effort Levels

| Level | Opus 4.7 | Opus 4.6 / Sonnet 4.6 | Notes |
|-------|----------|----------------------|-------|
| `low` (○) | ✅ | ✅ | Latency-sensitive tasks |
| `medium` (◐) | ✅ | ✅ | Cost-sensitive work |
| `high` (●) | ✅ | ✅ (4.6 default) | Balanced |
| `xhigh` | ✅ **(4.7 default)** | ❌ (falls back to `high`) | New — Opus 4.7 only |
| `max` | ✅ | ✅ | Session-only; deepest reasoning |

> **Note:** Opus 4.7 always uses adaptive reasoning. The `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` environment variable and `MAX_THINKING_TOKENS` fixed budget do not apply to Opus 4.7.

> **Note:** The keyword "ultrathink" in prompts activates deep reasoning mode. Effort levels `low`, `medium`, `high`, `xhigh` (Opus 4.7 default), and `max` control how much reasoning Claude performs.

> **Note**: As of v2.1.94, the default effort level changed from `medium` to `high` for API-key, Bedrock/Vertex/Foundry, Team, and Enterprise users (Opus 4.6). Opus 4.7 defaults to `xhigh`.

### Benefits of Extended Thinking

- **Deep reasoning**: Spend more time thinking about complex problems
- **Better architectural decisions**: Make informed choices with comprehensive evaluation
- **Consideration of edge cases**: Think through potential issues and scenarios
- **Thorough analysis**: Structured approach to complex problem-solving

### Example: Architectural Decision

```
User: /think Should we use microservices or a monolith for our e-commerce platform?

Claude: Let me think through this architectural decision carefully...

<extended_thinking>
## Context Analysis
- Team size: 5 developers
- Expected traffic: 10k daily users initially
- Need to scale to 100k+ users
- Limited DevOps resources
- 6-month timeline to MVP

## Approach 1: Microservices
Pros:
+ Independent scaling
+ Technology flexibility
+ Team independence
+ Fault isolation

Cons:
- Operational complexity
- Network overhead
- Distributed tracing needed
- Requires DevOps expertise
- Slower initial development

## Approach 2: Monolith
Pros:
+ Simpler deployment
+ Faster initial development
+ Easier debugging
+ Lower operational overhead
+ Single codebase

Cons:
- Scaling challenges later
- All-or-nothing deployments
- Technology lock-in
- Potential for tight coupling

## Decision Factors
1. Team size (5 devs) → Favors monolith
2. DevOps resources (limited) → Favors monolith
3. Timeline (6 months) → Favors monolith
4. Future scale (100k users) → Achievable with monolith + caching
5. Complexity budget → Limited

## Recommendation
Start with a **modular monolith**:
- Single deployment unit
- Clear module boundaries
- Clean interfaces between modules
- Prepare for future extraction to microservices if needed

This gives you:
✓ Fast initial development
✓ Low operational complexity
✓ Option to extract services later
✓ Clear architecture

Migration path: When you reach 50k+ users or specific modules need independent scaling, extract those modules into microservices.
</extended_thinking>

**Recommendation**: Implement a modular monolith with clean module boundaries.

This approach balances your current constraints (team size, timeline, DevOps resources) with future scalability needs. You can migrate specific modules to microservices later when there's a clear business need.
```

### Extended Thinking Configuration

Extended thinking is controlled via environment variables, keyboard shortcuts, and CLI flags:

```bash
# Set thinking token budget (does not apply to Opus 4.7)
export MAX_THINKING_TOKENS=16000

# Set effort level: low (○), medium (◐), high (●), xhigh (Opus 4.7 default), or max
export CLAUDE_CODE_EFFORT_LEVEL=xhigh
```

Toggle during a session with `Alt+T` / `Option+T`, set effort with `/effort`, or configure via `/config`.
