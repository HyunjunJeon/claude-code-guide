# Error Reference

This page is for runtime errors that appear while Claude Code is already running. If the problem happens during installation, PATH setup, or binary setup, use the troubleshooting page instead.

## Automatic Retries

Claude Code retries transient failures before surfacing an error. Server errors, overloaded responses, request timeouts, temporary 429 throttles, and dropped connections can all be retried multiple times with exponential backoff.

You can tune that behavior with:

```text
CLAUDE_CODE_MAX_RETRIES
API_TIMEOUT_MS
```

## Server Errors

### `API Error: 500 Internal server error`

This is an Anthropic-side failure, not a prompt or account problem. Check `status.claude.com`, retry after a minute, and use `/feedback` if the error persists.

### `API Error: Repeated 529 Overloaded errors`

The API is temporarily at capacity. Wait a few minutes and try again. If one model is overloaded, switch with `/model` and keep working on another model.

### `Request timed out`

The request did not finish before the deadline. Retry the request, split the task into smaller pieces, or raise `API_TIMEOUT_MS` if a slow network or proxy is the cause.

### Auto mode cannot determine the safety of an action

If the classifier model is overloaded, Auto mode blocks the action instead of approving it blindly. Retry later. Read-only tasks usually still work while this is happening.

## Usage Limits

### `You've hit your session limit`

Your plan quota is exhausted until the reset time shown in the message. Use `/usage` to inspect limits, and `/extra-usage` if your plan supports buying more usage.

### `Server is temporarily limiting requests`

This is a short-lived throttle, not a plan limit. Wait briefly and retry.

### `Request rejected (429)`

The rate limit tied to your key, Bedrock project, or Vertex project was hit. Check `/status`, reduce concurrency, or request a higher tier in the provider console.

### `Credit balance is too low`

Your Console organization has run out of prepaid credits. Add credits or switch to subscription-based login with `/login`.

## Authentication Errors

### `Not logged in`

Run `/login`. If you expected environment-based auth, confirm `ANTHROPIC_API_KEY` is exported in the shell that launched Claude Code.

### `Invalid API key`

The key from `ANTHROPIC_API_KEY` or `apiKeyHelper` was rejected. Unset the variable, relaunch Claude Code, and check `/status` to confirm the active credential.

### `This organization has been disabled`

A stale API key is usually overriding your subscription login. Remove `ANTHROPIC_API_KEY` from the current shell and your shell profile, then relaunch.

### `OAuth token revoked` or `OAuth token has expired`

Run `/login` again. If the problem repeats in the same session, run `/logout` first and then `/login`.

### `does not meet scope requirement user:profile`

Your saved token is too old for the current feature. Run `/login` to mint a fresh token.

## Network And Connection Errors

### `Unable to connect to API`

Claude Code could not reach the API at all. Confirm connectivity from the same shell:

```bash
curl -I https://api.anthropic.com
```

If you are behind a proxy, set `HTTPS_PROXY` before launching Claude Code. If you use an LLM gateway or relay, confirm its base URL is configured correctly.

### `SSL certificate verification failed`

A proxy or TLS-inspecting appliance is presenting a certificate Node does not trust. Point Node at your CA bundle with `NODE_EXTRA_CA_CERTS` and avoid disabling certificate checks globally.

## Request Errors

### `Prompt is too long`

The conversation plus attachments exceed the model context window. Use `/compact`, `/clear`, `/context`, and remove unused MCP servers if the context is crowded.

### `Error during compaction: Conversation too long`

`/compact` could not fit a summary into the remaining context. Press Esc twice to step back a few turns, then compact again. If that is still not enough, start a new session with `/clear`.

### `Request too large`

The raw request body exceeded the API byte limit, usually because of a pasted file or attachment. Step back past the oversized content and reference large files by path instead of pasting them.

### `Image was too large`

The attached image is above the size or dimension limit. Step back, attach a smaller crop, or resize the image first.

### `PDF too large` or `PDF is password protected`

Split the PDF, remove protection, or extract text first. Large PDFs are better handled as file paths or smaller page ranges.

### `Extra inputs are not permitted`

A proxy or gateway stripped the `anthropic-beta` header. Fix the gateway so it forwards the header, or disable experimental beta-dependent features as a fallback.

### `There's an issue with the selected model`

The model name is wrong or your account cannot access it. Use `/model` to choose an available model, and check whether `--model`, `ANTHROPIC_MODEL`, or settings files set a stale ID.

### `Claude Opus is not available with the Claude Pro plan`

Pick a model your plan includes. If you recently upgraded, reauthenticate with `/logout` and `/login` so the session picks up the new entitlement.

### `thinking.type.enabled is not supported for this model`

Your Claude Code version is too old for the model configuration being sent. Update Claude Code, restart, or choose an older model.

### `Thinking budget exceeds output limit`

The configured thinking budget leaves no room for the response. Lower `MAX_THINKING_TOKENS` or raise the output limit for the provider you are using.

### `API Error: 400 due to tool use concurrency issues`

The conversation history became inconsistent after an interrupted tool call or a mid-stream edit. Use `/rewind` or step back to a checkpoint and continue from there.

## Lower-Quality Responses Without An Error

If Claude's answers suddenly feel off but no error appears, check these first:

- `/model` to confirm the model.
- `/effort` to confirm the reasoning level.
- `/context` to check for context pressure.
- `/compact` or `/clear` to remove stale history.
- `/rewind` to undo a bad turn.

Large `CLAUDE.md` files, unused MCP servers, and stale instructions are common causes.

## Reporting

If the error is not listed here or the recovery path does not help, use `/feedback`. For component-specific failures, use the matching guide:

- MCP server connection or auth failures: MCP docs
- Hook failures: hooks docs
- Installation or filesystem issues: troubleshooting

## Official Sources

- https://code.claude.com/docs/ko/errors
- https://code.claude.com/docs/ko/troubleshooting
- https://code.claude.com/docs/ko/settings
- https://code.claude.com/docs/ko/mcp
- https://code.claude.com/docs/ko/permissions
