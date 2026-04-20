# Execution Modes

Claude Code supports several execution modes for running tasks autonomously, in the background, on a schedule, or non-interactively. This guide covers Auto Mode, Background Tasks, Scheduled Tasks, and Headless (Print) Mode.

---

## Auto Mode

Auto Mode is a Research Preview permission mode (March 2026) that uses a background safety classifier to review each action before execution. It allows Claude to work autonomously while blocking dangerous operations.

### Requirements

- **Plan**: Team, Enterprise, or API (not available on Pro or Max plans)
- **Model**: Claude Sonnet 4.6, Opus 4.6, or Opus 4.7
- **Provider**: Anthropic API only (not supported on Bedrock, Vertex, or Foundry)
- **Classifier**: Runs on Claude Sonnet 4.6 (adds extra token cost)

### Enabling Auto Mode

```bash
# Auto mode is available in the Shift+Tab permission cycle
# Use --permission-mode auto to start directly
claude --permission-mode auto
```

> **Note:** The `--enable-auto-mode` flag was removed in v2.1.111. Auto mode is now in the `Shift+Tab` cycle by default. Use `--permission-mode auto` instead.

Or set it as the default permission mode:

```bash
claude --permission-mode auto
```

Setting via config:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### How the Classifier Works

The background classifier evaluates each action using the following decision order:

1. **Allow/deny rules** -- Explicit permission rules are checked first
2. **Read-only/edits auto-approved** -- File reads and edits pass automatically
3. **Classifier** -- The background classifier reviews the action
4. **Fallback** -- Falls back to prompting after 3 consecutive or 20 total blocks

### Default Blocked Actions

Auto mode blocks the following by default:

| Blocked Action | Example |
|----------------|---------|
| Pipe-to-shell installs | `curl \| bash` |
| Sending sensitive data externally | API keys, credentials over network |
| Production deploys | Deploy commands targeting production |
| Mass deletion | `rm -rf` on large directories |
| IAM changes | Permission and role modifications |
| Force push to main | `git push --force origin main` |

### Default Allowed Actions

| Allowed Action | Example |
|----------------|---------|
| Local file operations | Read, write, edit project files |
| Declared dependency installs | `npm install`, `pip install` from manifest |
| Read-only HTTP | `curl` for fetching documentation |
| Pushing to current branch | `git push origin feature-branch` |

### Configuring Auto Mode

**Print default rules as JSON**:
```bash
claude auto-mode defaults
```

**Configure trusted infrastructure** via the `autoMode.environment` managed setting for enterprise deployments. This allows administrators to define trusted CI/CD environments, deployment targets, and infrastructure patterns.

### Fallback Behavior

When the classifier is uncertain, auto mode falls back to prompting the user:
- After **3 consecutive** classifier blocks
- After **20 total** classifier blocks in a session

This ensures the user always retains control when the classifier cannot confidently approve an action.

### Seeding Auto-Mode-Equivalent Permissions (No Team Plan Required)

If you don't have a Team plan or want a simpler approach without the background classifier, you can seed your `~/.claude/settings.json` with a conservative baseline of safe permission rules. The script starts with read-only and local-inspection rules, then lets you opt into edits, tests, local git writes, package installs, and GitHub write actions only when you want them.

**File:** `09-advanced-features/setup-auto-mode-permissions.py`

```bash
# Preview what would be added (no changes written)
python3 09-advanced-features/setup-auto-mode-permissions.py --dry-run

# Apply the conservative baseline
python3 09-advanced-features/setup-auto-mode-permissions.py

# Add more capability only when you need it
python3 09-advanced-features/setup-auto-mode-permissions.py --include-edits --include-tests
python3 09-advanced-features/setup-auto-mode-permissions.py --include-git-write --include-packages
```

The script adds rules across these categories:

| Category | Examples |
|----------|---------|
| Core read-only tools | `Read(*)`, `Glob(*)`, `Grep(*)`, `Agent(*)`, `WebSearch(*)`, `WebFetch(*)` |
| Local inspection | `Bash(git status:*)`, `Bash(git log:*)`, `Bash(git diff:*)`, `Bash(cat:*)` |
| Optional edits | `Edit(*)`, `Write(*)`, `NotebookEdit(*)` |
| Optional test/build | `Bash(pytest:*)`, `Bash(python3 -m pytest:*)`, `Bash(cargo test:*)` |
| Optional git writes | `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git stash:*)` |
| Git (local write) | `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git checkout:*)` |
| Package managers | `Bash(npm install:*)`, `Bash(pip install:*)`, `Bash(cargo build:*)` |
| Build & test | `Bash(make:*)`, `Bash(pytest:*)`, `Bash(go test:*)` |
| Common shell | `Bash(ls:*)`, `Bash(cat:*)`, `Bash(find:*)`, `Bash(cp:*)`, `Bash(mv:*)` |
| GitHub CLI | `Bash(gh pr view:*)`, `Bash(gh pr create:*)`, `Bash(gh issue list:*)` |

Dangerous operations (`rm -rf`, `sudo`, force push, `DROP TABLE`, `terraform destroy`, etc.) are intentionally excluded. The script is idempotent — running it twice won't duplicate rules.

---

## Background Tasks

Background tasks allow long-running operations to execute without blocking your conversation.

### What Are Background Tasks?

Background tasks run asynchronously while you continue working:
- Long test suites
- Build processes
- Database migrations
- Deployment scripts
- Analysis tools

**Basic Usage:**
```bash
User: Run tests in background

Claude: Started task bg-1234

/task list           # Show all tasks
/task status bg-1234 # Check progress
/task show bg-1234   # View output
/task cancel bg-1234 # Cancel task
```

### Starting Background Tasks

```
User: Run the full test suite in the background

Claude: Starting tests in background (task-id: bg-1234)
You can continue working while tests run.

[You can continue the conversation]

User: Meanwhile, let's refactor the auth module

Claude: [Works on auth module while tests run in background]

[Later, when tests complete]

Claude: 📢 Background task bg-1234 completed:
✅ 245 tests passed
❌ 3 tests failed
View results: /task show bg-1234
```

### Managing Background Tasks

**List active tasks**:
```
User: /task list

Active background tasks:
1. [bg-1234] Running tests (50% complete, 2min remaining)
2. [bg-1235] Building Docker image (25% complete, 8min remaining)
3. [bg-1236] Deploying to staging (90% complete, 30sec remaining)
```

**Check task status**:
```
User: /task status bg-1234

Task bg-1234: Running tests
Status: In progress
Progress: 120/245 tests (49%)
Started: 2025-11-08 10:30:15
Estimated completion: 2025-11-08 10:34:22
```

**View task output**:
```
User: /task show bg-1234

[Shows live output from the test run]
```

**Cancel task**:
```
User: /task cancel bg-1234

Cancelled background task bg-1234
```

### Example: Parallel Development

```
User: Run the build in the background

Claude: Starting build... (task-id: bg-5001)

User: Also run the linter in background

Claude: Starting linter... (task-id: bg-5002)

User: While those run, let's implement the new API endpoint

Claude: [Implements API endpoint while build and linter run]

[10 minutes later]

Claude: 📢 Build completed successfully (bg-5001)
📢 Linter found 12 issues (bg-5002)

User: Show me the linter issues

Claude: [Shows linter output from bg-5002]
```

### Configuration

```json
{
  "backgroundTasks": {
    "enabled": true,
    "maxConcurrentTasks": 5,
    "notifyOnCompletion": true,
    "autoCleanup": true,
    "logOutput": true
  }
}
```

---

## Scheduled Tasks

Scheduled Tasks let you run prompts automatically on a recurring schedule or as one-time reminders. Tasks are session-scoped — they run while Claude Code is active and are cleared when the session ends. Available since v2.1.72+.

### The `/loop` command

```bash
# Explicit interval
/loop 5m check if the deployment finished

# Natural language
/loop check build status every 30 minutes
```

Standard 5-field cron expressions are also supported for precise scheduling.

### One-time reminders

Set reminders that fire once at a specific time:

```
remind me at 3pm to push the release branch
in 45 minutes, run the integration tests
```

### Managing scheduled tasks

| Tool | Description |
|------|-------------|
| `CronCreate` | Create a new scheduled task |
| `CronList` | List all active scheduled tasks |
| `CronDelete` | Remove a scheduled task |

**Limits and behavior**:
- Up to **50 scheduled tasks** per session
- Session-scoped — cleared when the session ends
- Recurring tasks auto-expire after **3 days**
- Tasks only fire while Claude Code is running — no catch-up for missed fires

### Behavior details

| Aspect | Detail |
|--------|--------|
| **Recurring jitter** | Up to 10% of the interval (max 15 minutes) |
| **One-shot jitter** | Up to 90 seconds on :00/:30 boundaries |
| **Missed fires** | No catch-up — skipped if Claude Code was not running |
| **Persistence** | Not persisted across restarts |

### Cloud Scheduled Tasks

Use `/schedule` to create Cloud scheduled tasks that run on Anthropic infrastructure:

```
/schedule daily at 9am run the test suite and report failures
```

Cloud scheduled tasks persist across restarts and do not require Claude Code to be running locally.

### Disabling scheduled tasks

```bash
export CLAUDE_CODE_DISABLE_CRON=1
```

### Example: monitoring a deployment

```
/loop 5m check the deployment status of the staging environment.
        If the deploy succeeded, notify me and stop looping.
        If it failed, show the error logs.
```

> **Tip**: Scheduled tasks are session-scoped. For persistent automation that survives restarts, use CI/CD pipelines, GitHub Actions, or Desktop App scheduled tasks instead.

---

## Headless Mode

Print mode (`claude -p`) allows Claude Code to run without interactive input, perfect for automation and CI/CD. This is the non-interactive mode, replacing the older `--headless` flag.

### What is Print Mode?

Print mode enables:
- Automated script execution
- CI/CD integration
- Batch processing
- Scheduled tasks

### Running in Print Mode (Non-Interactive)

```bash
# Run specific task
claude -p "Run all tests"

# Process piped content
cat error.log | claude -p "Analyze these errors"

# CI/CD integration (GitHub Actions)
- name: AI Code Review
  run: claude -p "Review PR"
```

### Additional Print Mode Usage Examples

```bash
# Run a specific task with output capture
claude -p "Run all tests and generate coverage report"

# With structured output
claude -p --output-format json "Analyze code quality"

# With input from stdin
echo "Analyze code quality" | claude -p "explain this"
```

### Example: CI/CD Integration

**GitHub Actions**:
```yaml
# .github/workflows/code-review.yml
name: AI Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Claude Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p --output-format json \
            --max-turns 3 \
            "Review this PR for:
            - Code quality issues
            - Security vulnerabilities
            - Performance concerns
            - Test coverage
            Output results as JSON" > review.json

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = JSON.parse(fs.readFileSync('review.json', 'utf8'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: JSON.stringify(review, null, 2)
            });
```

### Print Mode Configuration

Print mode (`claude -p`) supports several flags for automation:

```bash
# Limit autonomous turns
claude -p --max-turns 5 "refactor this module"

# Structured JSON output
claude -p --output-format json "analyze this codebase"

# With schema validation
claude -p --json-schema '{"type":"object","properties":{"issues":{"type":"array"}}}' \
  "find bugs in this code"

# Disable session persistence
claude -p --no-session-persistence "one-off analysis"
```

| Flag | Description | Example |
|------|-------------|---------|
| `--max-budget-usd` | Set maximum spend limit for a session | `claude -p --max-budget-usd 5.00 "query"` |

---

## Advisor

Advisor is a beta server-side tool (`advisor_20260301`) that pairs a lower-cost **executor model** (Sonnet or Haiku) with a high-intelligence **advisor model** (Opus 4.7) mid-generation. The executor handles the task end-to-end and autonomously calls `advisor()` at strategic decision points — the server then runs a separate Opus inference pass and returns guidance, all within a single API request.

### How It Works

1. The executor model decides **when** to call `advisor()` (like any other tool call)
2. Opus 4.7 receives the full conversation transcript and returns strategic guidance (400–700 tokens)
3. The advisor **never** calls tools itself and never produces user-facing output — it only guides the executor
4. Advisor output appears as `server_tool_use` + `advisor_tool_result` blocks in the API response

### Activation

**In Claude Code (interactive):**
```bash
/advisor    # Toggle advisor on/off for current session
```

> **Note:** The `/advisor` command may not appear in the autocomplete menu. Type it directly.

**API (programmatic):**
```bash
curl https://api.anthropic.com/v1/messages \
  --header "anthropic-beta: advisor-tool-2026-03-01" \
  --header "content-type: application/json" \
  --data '{
      "model": "claude-sonnet-4-6",
      "max_tokens": 4096,
      "tools": [{
          "type": "advisor_20260301",
          "name": "advisor",
          "model": "claude-opus-4-7"
      }],
      "messages": [{"role": "user", "content": "Build a concurrent worker pool in Go"}]
  }'
```

### Model Compatibility

| Executor | Advisor |
|----------|---------|
| `claude-haiku-4-5` | `claude-opus-4-7` |
| `claude-sonnet-4-6` | `claude-opus-4-7` |
| `claude-opus-4-6` | `claude-opus-4-7` |
| `claude-opus-4-7` | `claude-opus-4-7` |

### Configuration Options

| Parameter | Type | Default | Notes |
|-----------|------|---------|-------|
| `type` | string | required | `"advisor_20260301"` |
| `name` | string | required | `"advisor"` |
| `model` | string | required | Advisor model (e.g. `"claude-opus-4-7"`) |
| `max_uses` | integer | unlimited | Per-request cap; exceeded calls return error |
| `caching` | object | off | `{"type": "ephemeral", "ttl": "5m"}` — prompt caching for advisor transcript |

### Performance

| Configuration | Benchmark | Improvement |
|---------------|-----------|-------------|
| Sonnet + Opus advisor | SWE-bench Multilingual | +2.7 pp vs. Sonnet alone, 11.9% lower cost |
| Haiku + Opus advisor | BrowseComp | 41.2% vs. 19.7% solo, ~85% lower cost |

### Requirements & Limitations

- **Status**: Beta (requires `advisor-tool-2026-03-01` beta header for API)
- **Provider**: Anthropic API only (not available on Bedrock, Vertex, or Foundry)
- **Known issue**: Sessions with advisor results may become unrecoverable after 1–3 days due to encrypted result TTL expiration. Use `/clear` as workaround.
