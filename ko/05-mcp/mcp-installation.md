# MCP 설치 방법

이 페이지는 `claude mcp add` 명령으로 MCP 서버를 등록하는 모든 전송 방식(HTTP, stdio, SSE, WebSocket)과 scope 옵션을 한자리에 모아 둔다. 새로운 MCP 서버를 처음 붙일 때 가장 먼저 보는 레퍼런스 페이지다. OAuth가 필요한 서버는 [mcp-oauth.md](mcp-oauth.md), JSON 설정 파일 구조는 [mcp-configuration-process.md](mcp-configuration-process.md)와 [mcp-scopes.md](mcp-scopes.md)에서 이어 본다.

Claude Code는 MCP 서버 연결을 위해 여러 전송 프로토콜을 지원합니다:

## HTTP 전송 (권장)

```bash
# Basic HTTP connection
claude mcp add --transport http notion https://mcp.notion.com/mcp

# HTTP with authentication header
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

## Stdio 전송 (로컬)

로컬에서 실행되는 MCP 서버의 경우:

```bash
# Local Node.js server
claude mcp add --transport stdio myserver -- npx @myorg/mcp-server

# With environment variables
claude mcp add --transport stdio myserver --env KEY=value -- npx server
```

## Scope 지정

`--scope` 플래그를 사용하여 MCP 구성이 저장되는 위치를 지정합니다:

```bash
# Local 범위 (기본값) - 현재 프로젝트, 현재 사용자 전용
claude mcp add --transport http github https://api.github.com/mcp

# 명시적으로 local scope 지정
claude mcp add --transport http stripe --scope local https://mcp.stripe.com

# User 범위 - 모든 프로젝트에서 사용 가능
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic

# Project 범위 - .mcp.json에 저장, 팀과 공유 가능
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp
```

## SSE 전송 (지원 중단 예정)

Server-Sent Events 전송은 `http`를 위해 지원 중단되었지만 여전히 지원됩니다:

```bash
claude mcp add --transport sse legacy-server https://example.com/sse
```

## WebSocket 전송

[[TIP("참고")]]
WebSocket 전송은 공식 Claude Code 문서에 기재되어 있지 않습니다. 실험적이거나 커뮤니티 지원 기능일 수 있습니다. 프로덕션 환경에서는 HTTP 전송을 사용하십시오.
[[/TIP]]

지속적인 양방향 연결을 위한 WebSocket 전송:

```bash
claude mcp add --transport ws realtime-server wss://example.com/mcp
```

## Windows 관련 참고 사항

네이티브 Windows(WSL 제외)에서는 npx 명령에 `cmd /c`를 사용합니다:

```bash
claude mcp add --transport stdio my-server -- cmd /c npx -y @some/package
```

## Claude.ai MCP Connectors

Claude.ai 계정에 구성된 MCP 서버는 Claude Code에서 자동으로 사용할 수 있습니다. 이는 Claude.ai 웹 인터페이스를 통해 설정한 MCP 연결이 추가 구성 없이 접근 가능하다는 것을 의미합니다.

Claude.ai MCP connectors는 `--print` 모드에서도 사용 가능하며 (v2.1.83+), 비대화식 및 스크립트 사용을 지원합니다.

Claude Code에서 Claude.ai MCP 서버를 비활성화하려면 `ENABLE_CLAUDEAI_MCP_SERVERS` 환경 변수를 `false`로 설정합니다:

```bash
ENABLE_CLAUDEAI_MCP_SERVERS=false claude
```

> **참고:** 이 기능은 Claude.ai 계정으로 로그인한 사용자만 사용할 수 있습니다.
