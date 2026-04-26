Plugin은 슬래시 커맨드, 서브에이전트, MCP 서버, hook, 설정을 하나의 설치 가능한 패키지로 묶는 Claude Code의 최상위 확장 메커니즘입니다. 여러 customization을 단일 명령으로 보급하고, 마켓플레이스를 통해 팀·조직·커뮤니티에 배포할 수 있도록 설계되었습니다. 이 장에서는 plugin 아키텍처부터 게시·운영·보안까지 전체 수명 주기를 다룹니다.

[TOC]

## 언제 읽으면 좋은가

- 여러 customization(슬래시 커맨드 + 서브에이전트 + hook + MCP 서버)을 한 번에 설치/배포하고 싶을 때
- 팀 표준 워크플로(PR 리뷰, DevOps 자동화, 문서화 등)를 단일 명령으로 보급하고 싶을 때
- 외부 plugin marketplace에서 검증된 기능을 가져와 사용하고 싶을 때
- 조직 내에서 plugin source와 권한을 중앙에서 통제해야 할 때

## 이 장의 핵심 주제

| 주제 | 왜 중요한가 | 먼저 볼 페이지 |
| --- | --- | --- |
| 아키텍처 이해 | plugin이 어떤 구성요소를 묶을 수 있는지 한눈에 파악 | [Plugin 아키텍처](https://wikidocs.net/345492) · [로딩 프로세스](https://wikidocs.net/345502) |
| 정의와 구조 | plugin을 직접 만들 때 필요한 매니페스트와 디렉토리 트리 | [정의 구조](https://wikidocs.net/345493) · [구조 예시](https://wikidocs.net/345494) |
| 옵션과 데이터 | 사용자 설정값 선언과 영구 상태 저장 위치 결정 | [Plugin 옵션](https://wikidocs.net/345506) · [영구 데이터](https://wikidocs.net/345507) · [경로 해석](https://wikidocs.net/345508) |
| 배포와 마켓플레이스 | plugin을 어디에 어떻게 게시·공유할지 선택 | [Plugin 유형](https://wikidocs.net/345516) · [마켓플레이스](https://wikidocs.net/345514) · [인라인 plugin](https://wikidocs.net/345515) |
| 운영과 수명 주기 | 설치·업데이트·테스트·핫 리로드를 안전하게 진행 | [설치 라이프사이클](https://wikidocs.net/345501) · [업데이트](https://wikidocs.net/345505) · [테스트](https://wikidocs.net/345517) · [핫 리로드](https://wikidocs.net/345504) |
| 결정과 비교 | 언제 plugin을 만들고 언제 다른 메커니즘을 쓸지 판단 | [Plugin을 만들 시점](https://wikidocs.net/345496) · [기능 비교](https://wikidocs.net/345495) · [독립형 vs Plugin](https://wikidocs.net/345498) · [vs 수동 설정](https://wikidocs.net/345497) |
| 보안과 거버넌스 | 조직 정책으로 plugin 사용 범위 통제 | [보안](https://wikidocs.net/345519) · [관리 설정](https://wikidocs.net/345510) · [Channels](https://wikidocs.net/345511) |
| 게시와 모범 사례 | 사용자에게 신뢰받는 plugin 출시 | [게시](https://wikidocs.net/345513) · [모범 사례](https://wikidocs.net/345520) · [실용 예제](https://wikidocs.net/345521) · [전체 워크플로우](https://wikidocs.net/345522) |
| 운용 명령 모음 | CLI/슬래시 커맨드를 빠르게 찾고 싶을 때 | [CLI 명령](https://wikidocs.net/345512) · [설치 방법](https://wikidocs.net/345500) · [설치 안내](https://wikidocs.net/345499) · [캐싱과 reload](https://wikidocs.net/345503) · [문제 해결](https://wikidocs.net/345518) |

## 빠른 시작

`.claude-plugin/plugin.json` 한 파일만 있어도 가장 단순한 plugin을 정의할 수 있습니다.

```json
{
  "name": "my-first-plugin",
  "description": "A greeting plugin",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  },
  "license": "MIT"
}
```

로컬에서 바로 테스트하려면 다음을 실행합니다.

```bash
claude --plugin-dir ./my-first-plugin
```

마켓플레이스에 게시된 plugin을 설치할 때는 슬래시 커맨드 한 줄이면 됩니다.

```bash
/plugin install pr-review
```

자세한 흐름은 [실용 예제](https://wikidocs.net/345521)와 [설치 안내](https://wikidocs.net/345499)를 참고하세요.

## 자주 하는 실수

- **현재 working directory를 plugin directory로 가정** — 항상 `${CLAUDE_PLUGIN_ROOT}`나 `${CLAUDE_PLUGIN_DATA}`를 기준으로 경로를 작성해야 합니다. ([Plugin 경로와 파일 해석](https://wikidocs.net/345508))
- **영구 상태를 shipped plugin tree에 저장** — 캐시·DB·런타임 산출물은 반드시 `${CLAUDE_PLUGIN_DATA}`에 둬야 plugin 업데이트 시 사라지지 않습니다. ([영구 Plugin 데이터](https://wikidocs.net/345507))
- **`/reload-plugins`로 모든 게 갱신된다고 기대** — reload는 manifest와 component 정의만 다시 읽습니다. compiled asset이나 외부 의존성은 별도로 갱신해야 합니다. ([캐싱과 Reload 의미](https://wikidocs.net/345503))
- **plugin subagent에 `hooks`/`mcpServers`/`permissionMode` 키 사용** — 보안상 차단된 필드라서 plugin이 로드되지 않습니다. ([Plugin 보안](https://wikidocs.net/345519))
- **silent auto-update를 가정한 운영** — 업데이트는 명시적 `claude plugin update`로 일어납니다. 안정적 동작이 필요하면 version pinning을 사용하세요. ([업데이트와 Auto-Update 동작](https://wikidocs.net/345505))

## 관련 장

- [공식 Plugins 문서](https://code.claude.com/docs/ko/plugins)
- [Plugin 탐색](https://code.claude.com/docs/ko/discover-plugins) · [내부 가이드](https://wikidocs.net/345491)
- [Plugin 마켓플레이스](https://code.claude.com/docs/ko/plugin-marketplaces)
- [Plugins 참조](https://code.claude.com/docs/ko/plugins-reference)
- [MCP 서버 참조](https://modelcontextprotocol.io/)
- [01. Slash Commands](https://wikidocs.net/345351) — plugin에 번들되는 개별 명령
- [02. Memory](https://wikidocs.net/345360) — plugin을 위한 영구 컨텍스트
- [03. Skills](https://wikidocs.net/345381) — plugin으로 래핑할 수 있는 도메인 전문성
- [04. Subagents](https://wikidocs.net/345414) — plugin 구성요소로 포함되는 전문 에이전트
- [05. MCP](https://wikidocs.net/345445) — plugin에 번들되는 Model Context Protocol 통합
- [06. Hooks](https://wikidocs.net/344613) — plugin 워크플로우를 트리거하는 이벤트 핸들러

---
