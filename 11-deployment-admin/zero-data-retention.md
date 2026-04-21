# Zero Data Retention

Zero Data Retention (ZDR) for Claude Code is an Enterprise capability on Anthropic's direct platform. It changes Anthropic's retention behavior for Claude Code inference, but it does not make every surrounding feature or integration retention-free.

## Overview

With ZDR enabled for Claude Code on Claude for Enterprise:

- prompts and model responses are processed in real time
- Anthropic does not store them after the response is returned
- exceptions still exist for legal obligations or misuse handling

The official docs also tie ZDR to administrative capabilities such as:

- per-user cost controls
- analytics
- server-managed settings
- audit logging

## Scope

ZDR covers Claude Code inference on Claude for Enterprise.

It is enabled per organization, not per account globally. New organizations do not inherit ZDR automatically, so each one must be enabled separately through your account team.

## What it covers

ZDR covers:

- Claude Code terminal inference
- model responses generated during Claude Code sessions
- all Claude models used through that Enterprise setup

## What it does not cover

The official docs explicitly call out several exclusions:

- chat on `claude.ai`
- Cowork sessions
- analytics metadata
- user and seat management records
- third-party integrations such as MCP servers and external tools

This is the most important mental model: ZDR changes Anthropic inference retention, not every surrounding data path in your workflow.

## Features disabled under ZDR

Some features are turned off automatically because they require stored prompts or completions:

- Claude Code on the web
- Desktop remote sessions
- `/feedback`

If users try to invoke them, Claude Code returns an error based on org policy.

## Policy violation exception

Even with ZDR enabled, Anthropic can retain data where required by law or to address policy violations. The official docs state that flagged session inputs and outputs may be retained for up to 2 years in that case.

## Requesting ZDR

ZDR is not a self-serve toggle. The documented path is to work through your Anthropic account team, which enables it after eligibility review.

## Related links

- [Official zero data retention docs](https://code.claude.com/docs/ko/zero-data-retention)
- [Data Usage](./data-usage.md)
- [Monitoring Usage](./monitoring-usage.md)
- [Server-Managed Settings](./server-managed-settings.md)
