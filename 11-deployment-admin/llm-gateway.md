# LLM Gateway

Use an LLM gateway when Claude Code should talk to a central proxy instead of directly to Anthropic, Bedrock, or Vertex. This is useful for centralized auth, model routing, cost controls, and audit policy.

## Overview

An LLM gateway sits between Claude Code and the underlying model provider. Typical reasons to add one:

- centralize API credentials
- apply rate limits and budget policy
- route requests across providers
- capture usage and audit metadata
- enforce network policy inside enterprise environments

Claude Code works with gateways only if the gateway preserves the provider-specific API behavior Claude Code expects.

## Gateway requirements

The gateway must expose at least one supported API shape:

1. Anthropic Messages API
2. Bedrock InvokeModel
3. Vertex rawPredict

Important compatibility rules:

- Forward `anthropic-beta` and `anthropic-version` headers when the API shape expects headers.
- Preserve body fields like `anthropic_beta` and `anthropic_version` when the provider uses body fields.
- Keep streaming behavior intact if you expect Claude Code streaming features to work.

If those fields are dropped, Claude Code can lose features or fail entirely.

## Basic configuration

In practice, a gateway setup usually needs:

- a base URL
- an auth token or helper
- model-name mapping
- optional provider flags when the gateway speaks a provider-native protocol

Example pattern:

```bash
export ANTHROPIC_BASE_URL=https://gateway.example.com
export ANTHROPIC_AUTH_TOKEN=token-from-gateway
```

If the gateway exposes custom model names, also align Claude Code's model configuration so aliases like `sonnet` or `opus` resolve correctly in your environment.

## Model selection

Model selection gets tricky when the gateway hides provider-native names.

Check all of these:

- what model names the gateway exposes
- whether Claude Code aliases map to those names
- whether the gateway expects Anthropic, Bedrock, or Vertex request formats

If you expose Anthropic-style endpoints backed by Bedrock or Vertex, some setups require disabling experimental betas:

```bash
export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1
```

Use this only when your gateway cannot safely forward the required beta behavior.

## LiteLLM notes

The official docs call out LiteLLM as a common example, but not as an endorsed default. Treat it as third-party infrastructure you must secure and operate yourself.

Important note from the official docs:

- LiteLLM PyPI versions `1.82.7` and `1.82.8` were compromised and should not be used.

If those versions were installed, rotate any affected credentials immediately.

## Security notes

- Do not hardcode proxy or gateway secrets into repo files.
- Prefer short-lived tokens or helper scripts over static secrets.
- Audit whether the gateway stores prompt bodies, tool inputs, or response content.
- If the gateway rewrites requests, verify that it does not remove Claude Code feature headers.

## Troubleshooting

### `Extra inputs are not permitted`

This often means the gateway stripped the `anthropic-beta` header or otherwise changed the request shape. Fix the gateway forwarding behavior first.

### Claude Code works directly but fails through the gateway

Check:

- base URL
- auth header format
- model name mapping
- streaming support
- header forwarding for version and beta headers

### Feature behavior is reduced behind the gateway

Compare the gateway protocol against the supported formats. A proxy that only partially mimics the provider API can cause degraded behavior instead of a clean failure.

## Related links

- [Official LLM gateway docs](https://code.claude.com/docs/ko/llm-gateway)
- [Network Configuration](./network-config.md)
- [Data Usage](./data-usage.md)
- [Troubleshooting](../10-cli/troubleshooting.md)
