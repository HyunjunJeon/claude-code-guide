# Sessions

Sessions are the SDK’s conversation history. They capture prompts, tool calls, tool results, and model responses so you can continue the same work later.

## What It Is

A session is not a filesystem snapshot. It is the transcript and metadata for an agent run. The SDK writes it to disk automatically, which lets you resume a previous run, branch from it, or inspect what happened.

## When To Use It

Use sessions when you need:

- multi-turn work in the same process,
- a restart-safe way to continue later,
- a branch to test a different approach,
- session browsing, cleanup, or organization.

## Mental Model

Treat the session as “what the agent knows,” not “what files look like.” If Claude already read a file or reasoned through a bug, that context lives in the session. If you need to undo file changes, use file checkpointing instead.

## Key APIs And Patterns

- `ClaudeSDKClient` keeps one session alive across calls in Python.
- `continue: true` resumes the most recent session in the current directory.
- `resume` targets a specific session ID.
- `fork_session: true` creates a new branch with copied history.
- `persistSession: false` keeps TypeScript sessions in memory only.
- `ResultMessage.session_id` is the safest place to capture the ID for later reuse.
- `listSessions()`, `getSessionMessages()`, `getSessionInfo()`, `renameSession()`, and `tagSession()` support browsing and cleanup.

## Common Pitfalls

- Resuming from the wrong `cwd`. The SDK looks under the current project path.
- Expecting sessions to move across machines automatically. Session files are local to the host.
- Using fork when you actually need filesystem rollback. Fork only branches conversation history.
- Forgetting that Python always persists sessions to disk.

## Related Links

- [Agent loop](./agent-loop.md)
- [File checkpointing](./file-checkpointing.md)
- Official session guide: https://code.claude.com/docs/ko/agent-sdk/sessions
- Python SDK reference: https://code.claude.com/docs/ko/agent-sdk/python
- TypeScript SDK reference: https://code.claude.com/docs/ko/agent-sdk/typescript
