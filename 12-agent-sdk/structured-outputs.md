# Structured Outputs

Structured outputs let you shape the final answer into a predictable schema instead of free-form prose.

## What It Is

Instead of asking the model to "return JSON" and hoping for the best, you define the structure your application expects. The SDK then validates or constrains the final result against that structure.

## When To Use It

Use structured outputs when the result feeds:

- another service,
- a workflow engine,
- a database write,
- an evaluation harness,
- a typed frontend component.

This is especially useful in single mode, but streaming workflows can also treat the final event as a structured payload.

## Design Guidance

- Keep schemas narrow and purposeful.
- Prefer enums or bounded fields for routing decisions.
- Separate agent reasoning from the final structured result when the output must stay machine-safe.
- Validate again in the host if the downstream side is sensitive.

## Common Pitfalls

- Asking for a schema that is much broader than the task.
- Mixing explanatory prose into fields meant for machines.
- Treating schema validation as a substitute for business-rule validation.

## Related Links

- [Streaming Output](./streaming-output.md)
- [Streaming vs Single Mode](./streaming-vs-single-mode.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/structured-outputs
