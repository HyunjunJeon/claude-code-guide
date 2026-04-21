# User Input

User input in the Agent SDK means the agent can pause and ask the host application for clarification, approval, or a concrete answer before continuing.

## What It Is

In a real agent app, Claude may need information that is not available in files or tools. Instead of hallucinating, the SDK can surface an input request to the host, wait for the user's answer, and then resume the same run.

## Good Use Cases

- asking the operator which option to choose,
- collecting credentials or IDs that should not live in the prompt,
- confirming destructive actions,
- narrowing ambiguous tasks before more tool use happens.

## Design Guidance

Keep user-input requests short and explicit. The host UI should make it obvious:

- what Claude is asking,
- why the answer matters,
- whether the answer changes permissions, cost, or scope.

If the answer is high risk, make the host render that risk clearly instead of burying it inside a free-form prompt field.

## Common Pitfalls

- Letting the agent ask vague questions that stall the workflow.
- Mixing approval prompts with ordinary clarification prompts.
- Failing to persist the conversation state after the user responds.
- Using user input as a substitute for good defaults.

## Related Links

- [Permissions](./permissions.md)
- [Streaming Output](./streaming-output.md)
- [Sessions](./sessions.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/user-input
