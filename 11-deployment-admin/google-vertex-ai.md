# Google Vertex AI

Google Vertex AI is the right fit when Claude Code needs to run inside GCP with Google Cloud auth, Model Garden access, and cloud billing controls.

## When to use

- You already standardize on GCP and want Claude Code to inherit Google Cloud identity and project controls.
- You need centralized billing, quota management, and regional endpoint control in Vertex AI.
- You want Claude Code to stay inside your GCP security and audit boundaries.

## Setup path

1. Enable the Vertex AI API in the target project.
2. Request access to the Claude models your team needs in Model Garden.
3. Choose either the Claude Code wizard (`/setup-vertex`) or manual environment-variable setup.
4. Set `CLAUDE_CODE_USE_VERTEX=1`, `CLOUD_ML_REGION=...`, and `ANTHROPIC_VERTEX_PROJECT_ID=...`.
5. Pin model versions before rollout so later Anthropic releases do not change what your users see.

Example:

```sh
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=global
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-4-6'
```

## Auth and config basics

- Claude Code uses standard Google Cloud authentication.
- You can use Application Default Credentials from `gcloud`, a service account key file, or credentials already in your environment.
- `ANTHROPIC_VERTEX_PROJECT_ID` is the project Claude Code uses by default; `GCLOUD_PROJECT`, `GOOGLE_CLOUD_PROJECT`, and `GOOGLE_APPLICATION_CREDENTIALS` can override the lookup.
- `/login` and `/logout` are disabled because Google Cloud credentials handle authentication.
- If you need to disable prompt caching, set `DISABLE_PROMPT_CACHING=1`.

## Model and provider caveats

- Vertex AI supports both global and regional endpoints, but not every Claude model version is available everywhere.
- Global endpoints can be convenient, but some model versions still require a regional endpoint.
- When you deploy to multiple users, pin model versions instead of relying on aliases such as `sonnet` or `opus`.
- Claude Code can check model availability at startup and fall back to an older version for the current session if the pinned version is unavailable.

## Common errors

- A `404` model-not-found error usually means the model is not enabled in Model Garden, the region is wrong, or the model does not support the global endpoint.
- A `429` usually means the region is hitting quota or the chosen model is not available in that region.
- Startup warnings about updating a pin usually mean Claude Code can see a newer version in your project and wants you to repin it.
- If the login wizard cannot complete, verify that the project has billing, the Vertex AI API is enabled, and the right Claude model access has been granted.

## Related links

- Anthropic: [Claude Code on Google Vertex AI](https://code.claude.com/docs/ko/google-vertex-ai)
- Anthropic: [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- Google Cloud: [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs)
- Google Cloud: [Vertex AI Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
- Google Cloud: [Vertex AI quotas and limits](https://cloud.google.com/vertex-ai/quotas)
- Google Cloud: [Vertex AI pricing](https://cloud.google.com/vertex-ai/pricing)
