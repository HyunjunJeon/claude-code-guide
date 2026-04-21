# Secure Deployment

Secure deployment is about reducing what an SDK-powered agent can reach, change, or leak in production.

## Core Controls

At minimum, secure deployments should define:

- least-privilege credentials,
- tight tool allowlists,
- clear permission policy,
- secret handling outside prompts,
- network boundaries and audit logging.

## Practical Guidance

- default to read-only or narrow write scopes,
- keep production secrets in the hosting layer, not in repo files,
- isolate tenants and workspaces,
- make destructive actions explicit and reviewable,
- connect observability to alerting for abnormal behavior.

## Common Pitfalls

- using `bypassPermissions` in shared or sensitive environments,
- exposing shell access that is broader than the workflow needs,
- logging prompts, outputs, or tool payloads without a redaction plan.

## Related Links

- [Permissions](./permissions.md)
- [Hosting](./hosting.md)
- [Observability](./observability.md)
- Official guide: https://platform.claude.com/docs/en/agent-sdk/secure-deployment
