# Deployment Administration

This module covers the operational work needed to run Claude Code in managed environments. It focuses on provider setup, network boundaries, identity and access, centralized policy, and usage governance.

## Official reference

- [Claude Code docs map](https://code.claude.com/docs/ko/claude_code_docs_map)
- [Amazon Bedrock](https://code.claude.com/docs/ko/amazon-bedrock)
- [Google Vertex AI](https://code.claude.com/docs/ko/google-vertex-ai)
- [Microsoft Foundry](https://code.claude.com/docs/ko/microsoft-foundry)
- [Server-managed settings](https://code.claude.com/docs/ko/server-managed-settings)
- [Network config](https://code.claude.com/docs/ko/network-config)

## What this module covers

- Which provider path to choose for Anthropic API, Bedrock, Vertex, or Foundry
- How authentication and IAM differ across local use, managed teams, and CI
- How to prepare proxies, certificates, allowlists, and gateway routing
- What should be controlled centrally with managed settings and usage policy
- How to reason about monitoring, data handling, and zero-retention constraints

## Recommended reading order

1. `authentication-and-iam.md`
2. `network-config.md`
3. One provider page: Bedrock, Vertex AI, or Foundry
4. `server-managed-settings.md`
5. Governance pages such as monitoring, data usage, and zero data retention

## Pages

- [Amazon Bedrock](amazon-bedrock.md)
- [Google Vertex AI](google-vertex-ai.md)
- [Microsoft Foundry](microsoft-foundry.md)
- [Network Configuration](network-config.md)
- [LLM Gateway](llm-gateway.md)
- [Dev Container Setup](devcontainer.md)
- [Server-Managed Settings](server-managed-settings.md)
- [Monitoring and Usage](monitoring-usage.md)
- [Data Usage](data-usage.md)
- [Zero Data Retention](zero-data-retention.md)
- [Authentication and IAM](authentication-and-iam.md)

## Related guides

- [Settings System Guide](../09-advanced-features/settings-system-guide.md)
- [CLI Reference](../10-cli/README.md)
- [Troubleshooting](../10-cli/troubleshooting.md)
