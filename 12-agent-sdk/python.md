# Python

Python is a strong fit for automation backends, evaluation systems, research tooling, and operational workflows that already live in Python.

## Why Choose It

Use the Python SDK when you want:

- easy integration with existing Python services,
- orchestration around data or ML workflows,
- a straightforward client object for continuing sessions,
- familiar packaging for internal automation.

## Typical Shape

Python commonly keeps a client object alive and issues multiple queries through it:

```python
from claude_agent_sdk import ClaudeSDKClient

client = ClaudeSDKClient()
result = client.query(
    prompt="Summarize the recent release notes",
    allowed_tools=["Read", "WebFetch"],
)
print(result)
```

## Strengths

- good fit for orchestration-heavy systems,
- comfortable integration with evaluation and notebook workflows,
- clear session-oriented client model.

## Common Pitfalls

- forgetting that Python sessions persist to disk,
- treating notebook experiments like production security boundaries,
- allowing too many tools in operational jobs.

## Related Links

- [Sessions](./sessions.md)
- [Structured Outputs](./structured-outputs.md)
- Official guide: https://code.claude.com/docs/ko/agent-sdk/python
