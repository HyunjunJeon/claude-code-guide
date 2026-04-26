# MCP Tool Search

이 페이지는 도구 설명이 컨텍스트 윈도우의 10%를 넘으면 자동으로 켜지는 Tool Search 기능을 정리한다. 큰 MCP surface를 운영하는 팀이나 MCP 서버를 직접 만드는 사람이 우선 봐야 할 페이지다. 컨텍스트 팽창을 더 근본적으로 줄이는 방법은 [mcp-code-execution.md](mcp-code-execution.md), 도구 설명·지시 자체의 크기 제한은 [mcp-tool-restrictions.md](mcp-tool-restrictions.md)에서 다룬다.

MCP 도구 설명이 컨텍스트 윈도우의 10%를 초과하면, Claude Code는 모델 컨텍스트를 과부하하지 않고 적절한 도구를 효율적으로 선택하기 위해 자동으로 도구 검색을 활성화합니다.

| 설정 | 값 | 설명 |
|---------|-------|-------------|
| `ENABLE_TOOL_SEARCH` | `auto` (기본값) | 도구 설명이 컨텍스트의 10%를 초과하면 자동 활성화 |
| `ENABLE_TOOL_SEARCH` | `auto:<N>` | 커스텀 임계값 `N`개 도구에서 자동 활성화 |
| `ENABLE_TOOL_SEARCH` | `true` | 도구 수에 관계없이 항상 활성화 |
| `ENABLE_TOOL_SEARCH` | `false` | 비활성화; 모든 도구 설명이 전체로 전송됨 |

> **참고:** Tool search는 Sonnet 4 이상 또는 Opus 4 이상이 필요합니다. Haiku 모델은 tool search를 지원하지 않습니다.

**도구 설명 제한**: 각 MCP 서버의 도구 설명은 2KB로 제한됩니다 (v2.1.84+). 이 제한을 초과하는 설명은 잘립니다.

## Tool Search 작동 방식

Tool Search는 모든 도구 설명을 한 번에 컨텍스트에 넣지 않고, 필요한 도구를 먼저 좁히는 방식으로 동작합니다.

개념적으로는:

1. Claude가 MCP 서버 집합을 확인
2. Tool Search로 후보 도구를 좁힘
3. 관련 도구 설명만 더 자세히 surface

이 덕분에 큰 MCP 설치에서도 매 turn마다 모든 도구 설명 비용을 내지 않아도 됩니다.

핵심 장점은 "큰 도구 상자를 유지하면서도 컨텍스트 폭증을 막는 것"입니다.

## Tool Search 구성

핵심 제어면은 `ENABLE_TOOL_SEARCH`입니다:

- `auto`는 기본 적응형 동작 유지
- `auto:<N>`은 임계값을 조정
- `true`는 항상 활성화
- `false`는 비활성화하고 모든 도구 설명을 그대로 보냄

실무 기준:

- 일반 프로젝트는 `auto`
- MCP surface가 크고 안정적이면 `true`
- debugging이나 전체 설명을 일부러 보고 싶을 때만 `false`

## MCP 서버 작성자를 위한 가이드

MCP 서버를 직접 배포하거나 유지한다면 Tool Search가 켜진 환경에서도 잘 동작하도록 도구를 설계해야 합니다.

좋은 규칙:

- tool name은 서로 명확히 구분되게 짓기
- description은 짧고 앞부분이 강하게 읽히게 쓰기
- tool description 안에 거대한 instruction block를 넣지 않기
- truncation이 걸려도 첫 문장만으로 용도를 알 수 있게 만들기

Tool Search는 이름과 한 줄 설명만으로도 도구를 구분할 수 있을 때 가장 잘 작동합니다.
