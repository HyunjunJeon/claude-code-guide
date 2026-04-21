# Hosting

Hosting is the question of where your Agent SDK application runs and what infrastructure surrounds it.

## Common Deployment Shapes

Typical choices include:

- local developer machine,
- CI runner,
- containerized web service,
- internal automation worker,
- tenant-aware backend service.

The right choice depends on tool access, isolation, latency tolerance, and who is allowed to trigger runs.

## What To Decide Early

- where sessions are stored,
- how credentials are provided,
- whether tools can reach the filesystem or shell,
- how long runs are allowed to live,
- how logs and traces are collected.

These decisions shape the entire safety model of the app.

## Common Pitfalls

- hosting the agent in a place with broader filesystem access than intended,
- forgetting that long-running sessions need durable storage,
- treating development and production hosting as equivalent.

## Related Links

- [Secure Deployment](./secure-deployment.md)
- [Observability](./observability.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/hosting
