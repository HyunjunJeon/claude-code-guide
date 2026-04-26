Slash command는 Claude Code 세션 안에서 자주 쓰는 동작을 빠르게 호출하는 명령입니다. 대화창에 `/`를 입력하면 사용 가능한 명령을 확인할 수 있고, 이어서 이름을 입력하면 원하는 기능으로 바로 이동할 수 있습니다.

이 장에서는 slash command를 세 가지 관점으로 정리합니다.

- 기본 제공 명령을 언제 쓰는지
- skill, plugin, MCP prompt가 slash command처럼 어떻게 동작하는지
- 팀 또는 개인 워크플로에 맞는 사용자 정의 명령을 어떻게 구성하는지

## 언제 읽으면 좋은가

- Claude Code의 기본 동작(`/help`, `/clear`, `/model` 등)을 빠르게 확인하고 싶을 때
- 팀이나 개인의 자주 쓰는 워크플로를 단축 명령으로 정리하고 싶을 때
- skill, plugin, MCP prompt가 어떻게 slash command 형태로 노출되는지 이해하고 싶을 때
- 기존 사용자 정의 slash command를 skill 구조로 마이그레이션해야 할 때

## 먼저 알아둘 것

- 가장 빠른 확인 방법은 Claude Code에서 `/`를 입력하는 것입니다.
- 명령 목록은 실행 환경, 구독 플랜, 활성 plugin, 설정 상태에 따라 일부 달라질 수 있습니다.
- 예전의 사용자 정의 slash command는 현재 skill 중심 구조로 통합되었습니다.

## Slash command의 종류

| 종류 | 예시 | 설명 |
|---|---|---|
| 내장 명령 | `/help`, `/clear`, `/model` | Claude Code에 기본 포함된 명령 |
| skill 기반 명령 | `/optimize`, `/pr` | `SKILL.md`로 정의한 사용자 또는 팀 명령 |
| plugin 명령 | `/plugin-name:command-name` | plugin이 제공하는 명령 |
| MCP prompt 명령 | `/mcp__github__list_prs` | MCP 서버 prompt를 명령처럼 노출한 형태 |

## 자주 쓰는 내장 명령

처음부터 전체 목록을 외우기보다는 아래 그룹만 익히는 편이 훨씬 낫습니다.

### 세션과 화면

| Command | 용도 |
|---|---|
| `/help` | 명령과 사용법 확인 |
| `/clear` | 현재 대화 초기화 |
| `/status` | 버전, 모델, 계정 상태 확인 |
| `/config` | 설정 열기 |
| `/model` | 모델 변경 |
| `/permissions` | 권한 상태 확인 및 변경 |

### 작업 흐름

| Command | 용도 |
|---|---|
| `/plan` | 구현 전 계획 모드 진입 |
| `/resume` | 이전 대화 이어서 작업 |
| `/rewind` | 체크포인트 기준으로 되돌리기 |
| `/tasks` | 백그라운드 작업 확인 |
| `/diff` | 커밋되지 않은 변경 확인 |

### 통합과 확장

| Command | 용도 |
|---|---|
| `/mcp` | MCP 서버 및 OAuth 관리 |
| `/plugin` | plugin 설치 및 관리 |
| `/agents` | subagent 구성 관리 |
| `/hooks` | hook 구성 확인 |
| `/memory` | `CLAUDE.md` 편집 및 memory 흐름 관리 |

## 내장 명령 빠른 참조

위키독스판에서는 전체 내장 명령 가운데 실제 사용 빈도가 높은 항목 위주로 먼저 정리합니다.

| Command | 용도 |
|---|---|
| `/help` | 전체 명령과 사용법 확인 |
| `/clear` | 현재 대화 초기화 |
| `/config` | 설정 열기 |
| `/model` | 모델 변경 |
| `/permissions` | 권한 확인 및 변경 |
| `/status` | 버전, 모델, 계정 상태 확인 |
| `/plan` | 계획 모드 진입 |
| `/resume` | 이전 세션 이어서 작업 |
| `/rewind` | 체크포인트 기준으로 되돌리기 |
| `/diff` | 커밋되지 않은 변경 확인 |
| `/tasks` | 백그라운드 작업 확인 |
| `/mcp` | MCP 서버 및 OAuth 관리 |
| `/plugin` | plugin 관리 |
| `/agents` | subagent 관리 |
| `/memory` | `CLAUDE.md` 편집 및 memory 흐름 관리 |
| `/hooks` | hook 구성 확인 |

## 알아두면 좋은 추가 명령

| Command | 용도 |
|---|---|
| `/branch` | 대화를 새 세션으로 분기 |
| `/compact` | 대화를 압축해 컨텍스트 정리 |
| `/context` | 컨텍스트 사용량 시각화 |
| `/cost` | 토큰 사용량 통계 확인 |
| `/doctor` | 설치 상태 진단 |
| `/export` | 현재 대화 내보내기 |
| `/remote-control` | 웹에서 원격 제어 연결 |
| `/sandbox` | sandbox 모드 전환 |
| `/schedule` | 예약 작업 생성 및 관리 |
| `/voice` | 푸시투톡 음성 받아쓰기 |

## 빠른 시작 예시

처음 쓰는 사람에게는 아래 흐름이 가장 자연스럽습니다.

1. `/help`로 명령 구조를 훑습니다.
2. `/model`과 `/permissions`로 현재 작업 환경을 확인합니다.
3. 구현 전에 `/plan`으로 작업을 정리합니다.
4. 필요하면 `/diff`, `/rewind`, `/resume`으로 세션을 정리합니다.

## 번들 skill

Claude Code에는 slash command처럼 바로 호출할 수 있는 번들 skill도 포함되어 있습니다.

| Skill | 용도 |
|---|---|
| `/batch <instruction>` | 워크트리를 사용한 대규모 병렬 변경 오케스트레이션 |
| `/claude-api` | 프로젝트 언어에 맞는 Claude API 레퍼런스 로드 |
| `/debug [description]` | 디버그 로깅 활성화 |
| `/loop [interval] <prompt>` | 프롬프트를 주기적으로 반복 실행 |
| `/simplify [focus]` | 변경된 파일의 코드 품질 검토 |

## Skill 기반 명령

현재 사용자 정의 slash command의 중심은 skill입니다. 예전의 `.claude/commands/*.md` 방식도 동작은 하지만, 새로 정리할 때는 skill 구조를 기준으로 두는 편이 낫습니다.

| 방식 | 위치 | 상태 |
|---|---|---|
| Skill | `.claude/skills/<name>/SKILL.md` | 권장 |
| Legacy command | `.claude/commands/<name>.md` | 호환 유지 |

Skill의 장점은 다음과 같습니다.

- 관련 스크립트, 템플릿, 참조 파일을 한 디렉터리에 묶을 수 있습니다.
- Claude가 상황에 따라 자동으로 호출할 수 있습니다.
- 필요하면 `context: fork`로 격리된 subagent 실행도 연결할 수 있습니다.
- 명령 설명, 허용 도구, 인수 힌트 같은 메타데이터를 함께 관리할 수 있습니다.

## 지원 중단된 명령

예전 글이나 캡처를 보다 보면 아래 명령이 보일 수 있습니다. 현재는 그대로 쓰지 않는 편이 맞습니다.

| Command | 상태 |
|---|---|
| `/review` | `code-review` plugin으로 대체 |
| `/output-style` | 지원 중단 |
| `/fork` | `/branch`로 이름 변경, 별칭만 유지 |
| `/pr-comments` | 제거됨 |
| `/vim` | 제거됨. `/config`의 editor mode 사용 |

## 최근에 눈여겨볼 변화

- `/branch`가 기존 `/fork` 역할을 대체합니다.
- `/voice`, `/schedule`, `/sandbox`처럼 워크플로 성격이 강한 명령이 추가되었습니다.
- `/model`은 예전보다 읽기 쉬운 모델 레이블 중심으로 동작합니다.
- MCP prompt도 `/mcp__<server>__<prompt>` 형태로 명령처럼 사용할 수 있습니다.
- 사용자 정의 slash command는 사실상 skill 구조로 정리하는 것이 기준입니다.

## 이 페이지에 함께 정리한 주제

위키독스판 1차 정리에서는 하위 페이지를 분리하지 않고, 같은 페이지 안에 핵심 주제를 이어서 배치합니다. 이 페이지 하단에는 `/ultraplan`, `/ultrareview` 관련 내용도 함께 포함됩니다.

## 사용자 정의 명령을 만들 때의 기준

좋은 slash command는 보통 다음 성격을 가집니다.

- 한 가지 작업을 분명하게 수행합니다.
- 반복해서 쓰는 흐름을 줄여 줍니다.
- 실행 전에 필요한 컨텍스트를 잘 모아 둡니다.
- 부작용이 크면 자동 호출을 막습니다.

반대로 아래와 같은 명령은 오래 유지하기 어렵습니다.

- 역할이 너무 넓은 명령
- 팀 규칙과 연결되지 않은 일회성 명령
- 설명 없이 이름만 있는 명령
- 현재 프로젝트 상태를 가정하는 명령

## 명령이 안 보일 때 확인할 것

1. `/help` 또는 `/skills`에서 실제로 노출되는지 확인합니다.
2. skill이라면 `SKILL.md` 위치와 `name` 필드를 점검합니다.
3. plugin 또는 MCP 기반 명령이면 해당 구성 자체가 활성 상태인지 봅니다.
4. 세션을 다시 열어 명령 목록을 새로 로드합니다.

## 함께 읽으면 좋은 문서

- [Skill](03-skills.md)
- [Memory](02-memory.md)
- [Subagent](04-subagents.md)
- [Hook](06-hooks.md)
- [Plugin](07-plugins.md)
- [CLI 참조](10-cli.md)
