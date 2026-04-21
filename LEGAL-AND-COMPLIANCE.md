# Legal and Compliance

This page summarizes the official legal, compliance, and security framing for Claude Code. It is not legal advice and does not replace your agreement with Anthropic.

## Which Terms Apply

The official docs split usage by customer type:

- Team, Enterprise, and Claude API users are governed by Anthropic Commercial Terms
- Free, Pro, and Max users are governed by Anthropic Consumer Terms

If you access Claude through AWS Bedrock or Google Vertex AI, your existing commercial agreement still applies unless another agreement says otherwise.

## Healthcare And BAA

The official docs state that a Business Associate Agreement can extend to Claude Code if both of these are true:

- the customer already has a BAA with Anthropic
- Zero Data Retention is enabled for that organization

The BAA applies to that organization's API traffic flowing through Claude Code. Because ZDR is enabled per organization, each organization must be configured separately.

## Usage Policy

Claude Code usage is subject to Anthropic's Usage Policy. The docs also note that advertised Pro and Max usage limits assume ordinary individual use of Claude Code and the Agent SDK.

This matters if you are trying to use consumer-plan credentials for productized or third-party multi-user access patterns.

## Authentication Rules

The legal page draws a hard line between authentication methods:

- OAuth is for purchasers of Claude Free, Pro, Max, Team, and Enterprise plans using native Anthropic applications
- product builders using Claude capabilities, including the Agent SDK, should use API keys through Claude Console or a supported cloud provider

The official docs explicitly say Anthropic does not permit third-party developers to offer Claude.ai login or route requests through Free, Pro, or Max credentials on behalf of their users.

## Security And Trust

The official legal page points to these operational trust references:

- Anthropic Trust Center
- Transparency Hub
- HackerOne vulnerability reporting

For teams doing security review or vendor due diligence, these are the primary external references to collect alongside product docs.

## Practical Implications For This Repository

- do not describe consumer OAuth as a supported auth path for third-party products
- separate end-user native app use from developer/API integration use
- mention ZDR and BAA together when discussing healthcare coverage
- link trust and vulnerability reporting to official Anthropic pages rather than inventing repo-local policy language

## Official Source

- [Legal and compliance](https://code.claude.com/docs/ko/legal-and-compliance)
- [Anthropic Commercial Terms](https://www.anthropic.com/legal/commercial-terms)
- [Anthropic Consumer Terms](https://www.anthropic.com/legal/consumer-terms)
- [Anthropic Usage Policy](https://www.anthropic.com/legal/aup)
- [Anthropic Trust Center](https://trust.anthropic.com)
- [HackerOne vulnerability reporting](https://hackerone.com/anthropic)
