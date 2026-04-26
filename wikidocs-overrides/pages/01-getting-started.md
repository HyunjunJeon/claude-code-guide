# Slash Command

Slash command는 Claude Code 세션 안에서 자주 쓰는 동작을 빠르게 호출하는 명령입니다. 대화창에 `/`를 입력하면 사용 가능한 명령을 확인할 수 있고, 이어서 이름을 입력하면 원하는 기능으로 바로 이동할 수 있습니다.

## 언제 읽으면 좋은가

- Claude Code의 기본 동작(`/help`, `/clear`, `/model` 등)을 빠르게 확인하고 싶을 때
- 팀이나 개인의 반복 워크플로를 단축 명령으로 정리하고 싶을 때
- skill, plugin, MCP prompt가 어떻게 slash command 형태로 노출되는지 이해하고 싶을 때
- 기존 사용자 정의 slash command를 skill 구조로 마이그레이션해야 할 때

## Slash command의 종류

| 종류 | 예시 | 설명 |
|---|---|---|
| 내장 명령 | `/help`, `/clear`, `/model` | Claude Code에 기본 포함된 명령 |
| Skill 기반 명령 | `/simplify`, `/batch`, `/debug` | `SKILL.md`로 정의된 재사용 워크플로 |
| Plugin 명령 | `/plugin-name:command-name` | plugin이 제공하는 명령 |
| MCP prompt 명령 | `/mcp__github__review` | MCP 서버 prompt를 명령처럼 노출한 형태 |

## 먼저 익힐 명령

| Command | 용도 |
|---|---|
| `/help` | 전체 명령과 사용법 확인 |
| `/status` | 버전, 모델, 계정, provider 상태 확인 |
| `/model` | 사용할 모델 변경 |
| `/permissions` | 도구 권한 확인 및 변경 |
| `/plan` | 구현 전 계획 모드 진입 |
| `/diff` | 커밋되지 않은 변경 확인 |
| `/resume` | 이전 세션 이어서 작업 |
| `/rewind` | checkpoint 기준으로 되돌리기 |
| `/memory` | `CLAUDE.md`와 memory 흐름 관리 |
| `/mcp` | MCP 서버 및 OAuth 관리 |
| `/agents` | subagent 구성 관리 |
| `/hooks` | hook 구성 확인 |
| `/plugin` | plugin 설치 및 관리 |

## Skill 기반 명령으로 옮겨가는 이유

예전의 `.claude/commands/*.md` 방식도 동작하지만, 새 워크플로는 skill 중심으로 정리하는 편이 좋습니다.

- 관련 스크립트, 템플릿, 참조 파일을 한 디렉터리에 묶을 수 있습니다.
- Claude가 상황에 따라 자동으로 호출할 수 있습니다.
- 필요하면 `context: fork`로 격리된 subagent 실행도 연결할 수 있습니다.
- 명령 설명, 허용 도구, 인수 힌트 같은 메타데이터를 함께 관리할 수 있습니다.

## 명령이 안 보일 때 확인할 것

1. `/help` 또는 `/skills`에서 실제로 노출되는지 확인합니다.
2. skill이라면 `SKILL.md` 위치와 frontmatter를 점검합니다.
3. plugin 또는 MCP 기반 명령이면 해당 구성 자체가 활성 상태인지 봅니다.
4. 세션을 다시 열어 명령 목록을 새로 로드합니다.

## 함께 읽으면 좋은 문서

- [`/ultraplan`](01-01-ultraplan.md)
- [`/ultrareview`](01-02-ultrareview.md)
- [CLI 참조](10-cli.md)
- [Skill](03-skills.md)
- [MCP](05-mcp.md)
- [Plugin](07-plugins.md)
