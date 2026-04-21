# Microsoft Foundry

Microsoft Foundry is the right fit when Claude Code needs to run inside Azure with Microsoft Entra ID, Azure RBAC, and Azure billing controls.

## When to use

- You already standardize on Azure and want Claude Code to inherit Microsoft identity and resource controls.
- You need centralized billing, role-based access, and Azure-native monitoring.
- You want Claude Code to stay inside your Azure security and compliance boundaries.

## Setup path

1. Create a Claude resource in the Microsoft Foundry portal.
2. Create deployments for the Claude models your team needs.
3. Choose API key auth or Microsoft Entra ID auth.
4. Set `CLAUDE_CODE_USE_FOUNDRY=1` and `ANTHROPIC_FOUNDRY_RESOURCE=...` or a full base URL.
5. Pin model versions before rollout so later Anthropic releases do not change what your users see.

Example:

```sh
export CLAUDE_CODE_USE_FOUNDRY=1
export ANTHROPIC_FOUNDRY_RESOURCE=your-resource
export ANTHROPIC_FOUNDRY_API_KEY=your-azure-api-key
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-4-6'
```

## Auth and config basics

- If `ANTHROPIC_FOUNDRY_API_KEY` is set, Claude Code uses it directly.
- If no key is set, Claude Code uses the Azure SDK default credential chain, which can include `az login`.
- `/login` and `/logout` are disabled because Azure credentials handle authentication.
- `ANTHROPIC_FOUNDRY_BASE_URL` lets you point Claude Code at the full Azure endpoint or a gateway.

## Model and provider caveats

- Claude model usage in Foundry is currently limited to Enterprise and MCA-E subscriptions.
- You must create the Claude deployments in Foundry before Claude Code can use them.
- When you deploy to multiple users, pin model versions instead of relying on aliases such as `sonnet`, `opus`, or `haiku`.
- The default roles `Azure AI User` and `Cognitive Services User` already include the permissions needed to invoke Claude models.
- If you need a tighter role, build one that allows the `Microsoft.CognitiveServices/accounts/providers/*` data action.

## Common errors

- `ChainedTokenCredential authentication failed` usually means Entra ID is not configured or `ANTHROPIC_FOUNDRY_API_KEY` is missing.
- A `401` or `403` usually means the resource exists but the caller does not have the right Azure RBAC role.
- If Claude Code cannot find the deployment, confirm that the resource name and deployment names match what you created in Foundry.
- If `/status` does not show Foundry, verify that `CLAUDE_CODE_USE_FOUNDRY=1` is exported in the same shell that launched Claude Code.

## Related links

- Anthropic: [Claude Code on Microsoft Foundry](https://code.claude.com/docs/ko/microsoft-foundry)
- Anthropic: [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- Microsoft: [Deploy and use Claude models in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-claude)
- Microsoft: [Configure Claude Code for Microsoft Foundry](https://learn.microsoft.com/azure/foundry/foundry-models/how-to/configure-claude-code)
- Microsoft: [Foundry models catalog](https://ai.azure.com/catalog/models)
- Microsoft: [Foundry models product page](https://azure.microsoft.com/en-us/products/ai-foundry/models/)
