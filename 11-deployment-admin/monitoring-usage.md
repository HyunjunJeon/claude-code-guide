# Monitoring Usage

Claude Code can export usage and activity telemetry through OpenTelemetry. This is the main path for organization-level monitoring of adoption, cost, tool activity, and session behavior.

## Overview

The official monitoring model supports three signal types:

- metrics
- logs/events
- traces

Typical questions this answers:

- Which teams are using Claude Code most?
- Where are costs spiking?
- Which tools are being used heavily?
- Which sessions are producing code, commits, and pull requests?

## Quick start

The minimum setup is:

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
claude
```

For authenticated collectors:

```bash
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer your-token"
```

## Administrator model

For managed teams, the official guidance is to push telemetry settings centrally via managed settings instead of asking each developer to configure them manually.

That matters because:

- org-level monitoring becomes consistent
- users cannot silently bypass the telemetry settings
- team-specific attributes can be added centrally

## What you can measure

The official docs call out these common categories:

- token usage
- session count
- lines of code changed
- commit count
- pull request count
- cost usage
- API errors and retry exhaustion

These signals are useful for:

- adoption tracking
- budget monitoring
- alerting on unusual activity
- team or cost-center segmentation

## Security and privacy notes

Telemetry is not all-or-nothing. Important defaults:

- prompt content is not logged by default
- tool parameters are not logged by default
- tool input/output content is not logged by default
- raw API request/response bodies are not logged by default

Those become visible only if you turn on the matching `OTEL_LOG_*` flags. That is a major privacy boundary.

The docs also note:

- OAuth-authenticated telemetry can include `user.email`
- metrics cardinality should be managed deliberately
- content-heavy tracing can expose sensitive code and command output

## Tracing

Tracing is a beta path and requires extra enablement:

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1
export OTEL_TRACES_EXPORTER=otlp
```

This lets you tie a user prompt to the API requests and tool calls it triggered.

## Troubleshooting

### No telemetry is arriving

Check:

- `CLAUDE_CODE_ENABLE_TELEMETRY=1`
- exporter type
- OTLP endpoint
- auth headers
- network path to the collector

### Data is too sensitive

Inspect whether `OTEL_LOG_USER_PROMPTS`, `OTEL_LOG_TOOL_DETAILS`, `OTEL_LOG_TOOL_CONTENT`, or `OTEL_LOG_RAW_API_BODIES` were enabled. Those settings dramatically change what leaves the client.

### Metrics cardinality is exploding

Turn down high-cardinality dimensions such as session IDs or account UUIDs if your backend is struggling.

## Related links

- [Official monitoring docs](https://code.claude.com/docs/ko/monitoring-usage)
- [Server-Managed Settings](./server-managed-settings.md)
- [Data Usage](./data-usage.md)
- [Zero Data Retention](./zero-data-retention.md)
