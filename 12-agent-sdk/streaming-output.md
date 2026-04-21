# Streaming Output

Streaming output exposes the run as a sequence of events instead of a single final blob of text.

## What You Get

Depending on the run, streaming output can include:

- partial assistant text,
- tool request events,
- tool result events,
- usage or status updates,
- final success or failure messages.

This makes it possible to build responsive UIs and detailed traces without waiting for the whole run to complete.

## When To Use It

Use streaming output when you need:

- live terminal or chat rendering,
- a progress bar or timeline,
- approval handling,
- observability around tool usage,
- incremental JSON or structured event handling.

## Host Responsibilities

Your application should decide how to map stream events into UI or logs. Typical patterns are:

- render partial text optimistically,
- pause on approval or user-input events,
- log tool events separately from user-facing output,
- treat the final result message as the canonical completion signal.

## Common Pitfalls

- Concatenating every event into user-facing text without filtering.
- Treating a partial message as if it were final.
- Ignoring tool events, then wondering why the UI feels opaque.
- Failing to handle interrupted or aborted runs cleanly.

## Related Links

- [Streaming vs Single Mode](./streaming-vs-single-mode.md)
- [Structured Outputs](./structured-outputs.md)
- [Observability](./observability.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/streaming-output
