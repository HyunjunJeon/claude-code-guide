이 문서는 plugin 안에서 사용할 수 있는 두 가지 핵심 경로 변수(`${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_PLUGIN_DATA}`)의 차이와 사용 규칙을 설명합니다. plugin이 셸이나 hook에서 파일을 읽거나 쓸 때 어떤 기준점을 써야 하는지 헷갈릴 때 참고하세요. 잘못된 경로 가정은 plugin이 일부 환경에서만 동작하는 원인이 되므로 안전한 path 작성 규칙을 함께 다룹니다.

Plugin에는 사실상 두 개의 중요한 파일 시스템 기준점이 있습니다:

| 변수 | 의미 | 용도 |
|---------|---------|------------|
| `${CLAUDE_PLUGIN_ROOT}` | plugin 설치 루트 | 스크립트, 번들 설정, 상대 asset 참조 |
| `${CLAUDE_PLUGIN_DATA}` | plugin 전용 영구 데이터 디렉토리 | 캐시, 상태, 런타임 생성 산출물 |

실무 규칙:

- `${CLAUDE_PLUGIN_ROOT}`를 shipped file의 안정적인 기준점으로 취급
- `${CLAUDE_PLUGIN_DATA}`를 mutable plugin state의 안정적인 기준점으로 취급
- manifest component path는 plugin package 기준으로 결정적으로 유지
- 현재 working directory가 plugin directory라고 가정하지 않기

## Path behavior rules

Manifest와 보조 파일을 작성할 때는 다음 규칙이 안전합니다:

1. component path는 호출한 shell 상태가 아니라 plugin package 기준으로 해석되도록 설계
2. hook, MCP server, helper script가 안정적인 절대 기준점이 필요하면 `${CLAUDE_PLUGIN_ROOT}` 사용
3. writable state는 shipped plugin tree가 아니라 `${CLAUDE_PLUGIN_DATA}`에 저장

## Path traversal과 안전성

Plugin root 밖의 임의 host path에 의존하는 설계는 피하는 것이 좋습니다. 외부 path가 정말 필요하다면:

- explicit user configuration으로 받거나
- 안전한 runtime input으로부터 계산

이렇게 해야 packaging이 재현 가능해지고 설치/리뷰 중 surprise를 줄일 수 있습니다.
