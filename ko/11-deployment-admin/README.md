# Deployment Administration

이 모듈은 Claude Code를 관리형 환경에서 운영할 때 필요한 배포와 관리 주제를 다룹니다. 공급자 선택, 네트워크 경계, 인증과 IAM, 중앙 정책, 사용량 통제 같은 운영 관점이 중심입니다.

## Official reference

- [Claude Code docs map](https://code.claude.com/docs/ko/claude_code_docs_map)
- [Amazon Bedrock](https://code.claude.com/docs/ko/amazon-bedrock)
- [Google Vertex AI](https://code.claude.com/docs/ko/google-vertex-ai)
- [Microsoft Foundry](https://code.claude.com/docs/ko/microsoft-foundry)
- [Server-managed settings](https://code.claude.com/docs/ko/server-managed-settings)
- [Network config](https://code.claude.com/docs/ko/network-config)

## 이 모듈에서 다루는 것

- Anthropic API, Bedrock, Vertex, Foundry 중 어떤 경로를 선택할지
- 로컬 사용, 팀 운영, CI에서 인증과 IAM이 어떻게 달라지는지
- 프록시, 인증서, allowlist, 게이트웨이 라우팅을 어떻게 준비할지
- 어떤 설정을 중앙에서 강제하고 어떤 설정을 사용자에게 맡길지
- 모니터링, 데이터 사용, zero retention 요구사항을 어떻게 해석할지

## 추천 읽기 순서

1. `authentication-and-iam.md`
2. `network-config.md`
3. Bedrock, Vertex AI, Foundry 중 하나의 공급자 문서
4. `server-managed-settings.md`
5. `monitoring-usage.md`, `data-usage.md`, `zero-data-retention.md`

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

## 관련 가이드

- [Settings System Guide](../09-advanced-features/settings-system-guide.md)
- [CLI 참조](../10-cli/README.md)
- [문제 해결](../10-cli/troubleshooting.md)
