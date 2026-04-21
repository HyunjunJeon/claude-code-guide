# Amazon Bedrock

Amazon Bedrock is the right fit when Claude Code needs to run inside AWS with IAM, CloudTrail, regional controls, and Bedrock billing.

## When to use

- You already standardize on AWS and want Claude Code to inherit AWS auth, regions, and enterprise controls.
- You need team-wide deployment with inference profiles, guardrails, or centralized cost tracking.
- You want to keep Claude Code close to AWS networking and compliance boundaries.

## Setup path

1. In the Bedrock console, request access to the Anthropic models your team needs.
2. Choose either the Claude Code wizard (`/setup-bedrock`) or manual environment-variable setup.
3. Configure AWS credentials through an AWS profile, SSO, access keys, or a Bedrock bearer token.
4. Set `CLAUDE_CODE_USE_BEDROCK=1` and `AWS_REGION=...`.
5. Pin model versions before rollout so later Anthropic releases do not change what your users see.

Example:

```sh
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export ANTHROPIC_DEFAULT_SONNET_MODEL='your-bedrock-model-or-inference-profile-id'
```

## Auth and config basics

- `AWS_REGION` is required. Claude Code does not read this from `~/.aws/config`.
- Claude Code uses the default AWS SDK credential chain.
- `/login` and `/logout` are disabled because AWS credentials handle authentication.
- For AWS Organizations, the management account can submit the use-case form once with `bedrock:PutUseCaseForModelAccess`.

## Model and provider caveats

- Bedrock uses the Invoke API path, not the Converse API.
- Unpinned aliases can advance to a newer model version that is not yet enabled in your account.
- Some deployments use inference profiles or application inference profiles, so the model ID you pin must match the form your account exposes.
- Mantle is a separate Bedrock endpoint with its own model lineup and requires Claude Code v2.1.94 or later.

## Common errors

- Repeated browser sign-in loops usually mean `awsAuthRefresh` is fighting an SSO or corporate proxy flow. Remove it or run `aws sso login` manually before starting Claude Code.
- A `403` usually means the model is not enabled for the account or the IAM role is missing `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, or `bedrock:ListInferenceProfiles`.
- A `400` that names the model ID on Mantle usually means you used a Bedrock inference profile ID against the Mantle endpoint.
- Region or throughput errors usually mean you need a different `AWS_REGION`, a supported inference profile, or a model that exists in that region.

## Related links

- Anthropic: [Claude Code on Amazon Bedrock](https://code.claude.com/docs/ko/amazon-bedrock)
- Anthropic: [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- AWS: [Amazon Bedrock documentation](https://docs.aws.amazon.com/bedrock/)
- AWS: [Bedrock inference profiles](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html)
- AWS: [Bedrock quotas and throttling](https://docs.aws.amazon.com/bedrock/latest/userguide/quotas.html)

