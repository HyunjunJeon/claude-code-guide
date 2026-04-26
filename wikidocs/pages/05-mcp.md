MCP(Model Context Protocol)는 Claude Code가 외부 도구·API·실시간 데이터에 접근하기 위한 표준 프로토콜이다. 메모리는 변하지 않는 컨텍스트를, MCP는 매번 변하는 외부 시스템(GitHub 이슈, DB row, Slack 메시지 등)을 다룬다. 이 장은 MCP를 처음 도입할 때부터 수십 개 서버로 확장해 컨텍스트 팽창과 싸우는 단계까지 한 번에 잡는 것을 목표로 한다.

[TOC]

## 언제 읽으면 좋은가

- GitHub, Slack, 데이터베이스 같은 외부 서비스에 Claude가 직접 접근하게 하고 싶을 때
- 실시간으로 변하는 데이터(이슈, PR, 모니터링 지표)를 대화 중에 조회하고 싶을 때
- 사내 API나 자체 서비스를 Claude가 도구로 쓸 수 있게 노출하고 싶을 때
- 여러 MCP 서버의 권한과 범위를 중앙에서 관리해야 할 때
- MCP를 너무 많이 붙여 컨텍스트가 폭주하는 문제를 풀고 싶을 때

## 이 장의 핵심 주제

| 주제 | 왜 중요한가 | 먼저 볼 페이지 |
| --- | --- | --- |
| 개요·아키텍처 | MCP가 client-server로 동작하는 큰 그림 | [mcp-overview.md](05-16-mcp-overview.md) · [mcp-architecture.md](05-02-mcp-architecture.md) · [mcp-ecosystem.md](05-07-mcp-ecosystem.md) |
| 설치·설정 | CLI/JSON으로 서버 등록·운영 | [mcp-installation.md](05-11-mcp-installation.md) · [mcp-configuration-process.md](05-05-mcp-configuration-process.md) · [mcp-management.md](05-13-mcp-management.md) |
| 범위·중복 | local/project/user scope와 우선순위 | [mcp-scopes.md](05-23-mcp-scopes.md) · [mcp-server-deduplication.md](05-26-mcp-server-deduplication.md) |
| 인증 | OAuth 2.1·custom header·환경변수 | [mcp-oauth.md](05-14-mcp-oauth.md) · [mcp-environment-variables.md](05-09-mcp-environment-variables.md) |
| 도구·출력 관리 | tool search·동적 업데이트·2KB 제한·출력 한도 | [mcp-tool-search.md](05-30-mcp-tool-search.md) · [mcp-tool-restrictions.md](05-29-mcp-tool-restrictions.md) · [mcp-dynamic-tool-updates.md](05-06-mcp-dynamic-tool-updates.md) · [mcp-output-limits.md](05-15-mcp-output-limits.md) |
| 컨텍스트 팽창 해결 | 코드 실행으로 토큰 98% 절감 | [mcp-code-execution.md](05-04-mcp-code-execution.md) |
| 고급 기능 | Apps·Elicitation·`@` 리소스·Slash Commands | [mcp-apps.md](05-01-mcp-apps.md) · [mcp-elicitation.md](05-08-mcp-elicitation.md) · [mcp-resource-mentions.md](05-21-mcp-resource-mentions.md) · [mcp-prompts-as-slash-commands.md](05-18-mcp-prompts-as-slash-commands.md) |
| 통합·격리 | Plugin 번들·subagent 범위·Claude as MCP server | [mcp-plugin-servers.md](05-17-mcp-plugin-servers.md) · [mcp-subagent-scope.md](05-28-mcp-subagent-scope.md) · [mcp-serve.md](05-24-mcp-serve.md) |
| 기업 운영 | managed-mcp.json 정책·모범 사례 | [mcp-managed-config.md](05-12-mcp-managed-config.md) · [mcp-best-practices.md](05-03-mcp-best-practices.md) |
| 실전 사례 | GitHub·DB·Filesystem 예제, 위키독스 사례 | [mcp-examples.md](05-10-mcp-examples.md) · [mcp-server-catalog.md](05-25-mcp-server-catalog.md) · [mcp-wikidocs-case.md](05-33-mcp-wikidocs-case.md) |
| 결정과 비교 | Memory vs MCP, 요청/응답 모델 | [mcp-vs-memory.md](05-32-mcp-vs-memory.md) · [mcp-request-response.md](05-20-mcp-request-response.md) · [mcp-related-concepts.md](05-19-mcp-related-concepts.md) |
| 첫 설치·문제 해결 | step-by-step setup, 자주 만나는 오류 | [mcp-setup-guide.md](05-27-mcp-setup-guide.md) · [mcp-troubleshooting.md](05-31-mcp-troubleshooting.md) |

## 빠른 시작

가장 짧은 경로는 GitHub MCP 한 개 등록이다.

```bash
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

이후 `claude`를 실행하고 `/mcp`로 연결을 확인한다. 자세한 단계는 [mcp-setup-guide.md](05-27-mcp-setup-guide.md)에서 본다.

## 자주 하는 실수

- 자격 증명을 `.mcp.json`에 하드코딩 → 환경변수 + `${VAR}` 확장 사용 ([mcp-environment-variables.md](05-09-mcp-environment-variables.md))
- 모든 MCP 서버를 user scope로 박아두고 팀 공유가 안 되는 상황 → project scope `.mcp.json`을 git에 체크인 ([mcp-scopes.md](05-23-mcp-scopes.md))
- 수십 개 MCP 서버를 붙이고 매 turn마다 토큰 폭주 → tool search 또는 코드 실행 패턴 도입 ([mcp-tool-search.md](05-30-mcp-tool-search.md), [mcp-code-execution.md](05-04-mcp-code-execution.md))
- 큰 응답을 무작정 받아 컨텍스트 초과 → `MAX_MCP_OUTPUT_TOKENS` 조정과 server-side shaping ([mcp-output-limits.md](05-15-mcp-output-limits.md))
- OAuth 메타데이터 디스커버리가 표준 endpoint에서 깨지는 서버를 그냥 포기 → `oauth.authServerMetadataUrl`로 OIDC endpoint 지정 ([mcp-oauth.md](05-14-mcp-oauth.md))

## 관련 장

- [공식 MCP 문서](https://code.claude.com/docs/ko/mcp)
- [MCP 프로토콜 사양](https://modelcontextprotocol.io/specification)
- [02. Memory](02-memory.md) — MCP가 못 다루는 영구 컨텍스트 영역
- [04. Subagents](04-subagents.md) — subagent 단위로 MCP 서버 격리
- [06. Hooks](06-hooks.md) — Elicitation/도구 호출에 hook을 끼워 검증
- [07. Plugins](07-plugins.md) — Plugin 번들에 MCP 서버 포함하기
- 더 깊이 파고들 외부 자료는 [mcp-resources.md](05-22-mcp-resources.md)에 모아 두었다.

---
