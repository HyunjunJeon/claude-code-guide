# 01. Slash Command

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

---

<a id="01-slash-commands-01-ultraplan"></a>

## 01-01. `/ultraplan`

`/ultraplan`은 로컬 CLI에서 시작한 planning 작업을 Claude Code on the web으로 넘겨서 브라우저에서 계획을 검토하게 하고, 이후 클라우드에서 실행하거나 다시 터미널로 되돌려 로컬에서 구현하게 하는 기능입니다.

### 무엇인가

Ultraplan은 큰 작업이나 애매한 작업을 위한 research preview 계획 워크플로입니다. 전체 계획을 터미널에서만 다듬는 대신, 브라우저의 더 풍부한 리뷰 화면에서 계획을 다듬을 수 있게 해 줍니다.

공식 문서는 이를 `/ultrareview`의 planning 대응 기능으로 설명합니다.

### 요구사항

- Claude Code `v2.1.91` 이상
- Claude Code on the web 계정
- GitHub 저장소

Anthropic 클라우드 인프라에서 동작하므로 다음 경로에서는 사용할 수 없습니다.

- Amazon Bedrock
- Google Vertex AI
- Microsoft Foundry

또한 계정의 기본 cloud environment를 사용하며, 없으면 첫 실행 때 자동 생성됩니다.

### 실행 방법

세 가지 방식이 있습니다.

1. `/ultraplan <prompt>` 실행
2. 일반 프롬프트 안에 `ultraplan` 키워드 포함
3. 로컬 plan 승인 대화상자에서 web refine 옵션 선택

예시:

```text
/ultraplan migrate the auth service from sessions to JWTs
```

### CLI 상태 흐름

실행 후 터미널에는 백그라운드 상태 표시가 나타납니다.

- `◇ ultraplan`: Claude가 조사하고 계획을 작성 중
- `◇ ultraplan needs your input`: 추가 설명이 필요함
- `◆ ultraplan ready`: 브라우저에서 검토 가능

`/tasks`로 현재 ultraplan 작업을 보고, 세션 링크를 열거나, 중지할 수 있습니다. 중지하면 클라우드 세션이 archive되고 상태 표시가 사라집니다.

### 브라우저에서 계획 검토

계획이 준비되면 웹 세션을 열어 검토합니다. 공식 문서가 강조하는 검토 기능:

- 특정 구간에 인라인 코멘트
- 이모지 반응
- 아웃라인 사이드바

즉, ultraplan의 핵심 가치는 "코딩 전에 계획 자체를 더 정교하게 리뷰할 수 있다"는 점입니다.

### 어디서 실행할지 선택

계획이 충분히 좋아지면 두 가지 경로가 있습니다.

#### 웹에서 바로 실행

같은 클라우드 세션에서 계획을 승인하고 구현까지 이어갑니다. 저장소와 환경이 이미 web workflow에 잘 맞을 때 유리합니다.

#### 터미널로 다시 보내기

계획을 승인하고 로컬 CLI로 teleport해서 구현합니다. 이 경우 터미널은 다음 선택지를 보여줍니다.

- `Implement here`
- `Start new session`
- `Cancel` 후 계획 파일로 저장

새 세션을 시작하면 Claude가 이전 대화로 돌아갈 수 있도록 `claude --resume` 명령을 출력합니다.

### 언제 써야 하나

다음 상황에 잘 맞습니다.

- 작업이 크고 구현 전에 계획 리뷰가 필요할 때
- 계획 문서에 구간별 코멘트를 달고 싶을 때
- 터미널 planning 흐름이 답답할 때
- 최종 실행 위치를 로컬과 클라우드 사이에서 고르고 싶을 때

작업이 작다면 일반 local plan mode가 더 단순합니다.

### 흔한 실수

- GitHub 기반 web 설정 없이 동작할 거라고 기대하는 것
- ultraplan 시작 시 Remote Control이 끊긴다는 점을 놓치는 것
- 클라우드 세션에서 Bedrock/Vertex/Foundry 경로도 쓸 수 있다고 생각하는 것
- 브라우저 검토 단계를 부가 기능으로만 보는 것

### 관련 가이드

- [Web Quickstart](09-advanced-features.md#09-advanced-features-31-claude-code-웹-시작하기)
- [Planning and Thinking](09-advanced-features.md#09-advanced-features-22-플래닝-모드-확장-사고)
- [Ultrareview](01-slash-commands.md#01-slash-commands-02-ultrareview)

### 공식 출처

- [Plan in the cloud with ultraplan](https://code.claude.com/docs/ko/ultraplan)

---

<a id="01-slash-commands-02-ultrareview"></a>

## 01-02. `/ultrareview`

`/ultrareview`는 Claude Code의 클라우드 샌드박스에서 깊은 원격 코드 리뷰를 실행하고, 검증된 버그 후보를 현재 CLI 세션으로 다시 돌려주는 기능입니다.

### 무엇인가

Ultrareview는 큰 변경을 위한 research preview 리뷰 워크플로입니다. 여러 리뷰 에이전트를 원격 샌드박스에 띄우고, 찾은 이슈를 독립적으로 검증해서 단순 스타일 지적보다 실제 버그 가능성이 높은 결과에 집중합니다.

공식 문서는 이를 로컬 `/review`보다 더 깊고 느리지만 병합 전 신뢰도가 높은 리뷰로 설명합니다.

### 요구사항

- Claude Code `v2.1.86` 이상
- `/login`을 통한 Claude.ai 인증
- Git 저장소

다음 경로에서는 사용할 수 없습니다.

- Amazon Bedrock
- Google Vertex AI
- Microsoft Foundry

또한 Zero Data Retention이 활성화된 조직에서는 사용할 수 없습니다.

### 실행 방법

브랜치 리뷰:

```text
/ultrareview
```

현재 브랜치와 기본 브랜치의 diff를 리뷰하며, staged와 unstaged 변경도 포함합니다.

PR 리뷰:

```text
/ultrareview 1234
```

PR 모드는 로컬 작업 트리를 번들하지 않고 GitHub에서 PR을 직접 clone합니다. 따라서 `github.com` remote가 필요합니다.

저장소가 너무 크면 Claude Code가 PR 모드로 전환하라고 안내합니다.

### 실행 전 확인 대화상자

시작 전에 Claude Code는 다음을 보여줍니다.

- 리뷰 범위
- 브랜치 리뷰 시 파일/라인 수
- 남아 있는 무료 실행 횟수
- 예상 비용

중요한 점은 `/ultrareview`는 명시적으로 호출할 때만 실행된다는 것입니다. Claude가 스스로 시작하지는 않습니다.

### 비용 모델

Ultrareview는 일반 포함 사용량이 아니라 extra usage로 과금됩니다.

공식 기준:

- Pro: 1회성 무료 `3`회 후 유료
- Max: 1회성 무료 `3`회 후 유료
- Team/Enterprise: 무료 없음, 처음부터 유료

공식 문서는 유료 리뷰가 보통 `$5`에서 `$20` 정도라고 설명합니다.

extra usage가 꺼져 있으면 실행이 차단되며, `/extra-usage`로 현재 설정을 확인할 수 있습니다.

### 실행 중 동작

Ultrareview는 백그라운드 작업으로 돌아가며 보통 `5`에서 `10`분 정도 걸립니다. 그동안 사용자는 다른 작업을 계속할 수 있습니다.

`/tasks`로 할 수 있는 일:

- 진행 상황 확인
- 리뷰 상세 보기
- 실행 중인 리뷰 중지

중지하면 클라우드 세션이 archive되고 부분 결과는 반환되지 않습니다.

### `/review`와의 차이

| 명령 | 적합한 용도 | 실행 위치 | 비용 |
|---|---|---|---|
| `/review` | 코딩 중 빠른 피드백 | 로컬, 수초~수분 | 일반 사용량 |
| `/ultrareview` | 병합 전 깊은 검토 | 원격, 약 5~10분 | extra usage |

작업 중 빠르게 확인할 때는 `/review`, 큰 변경을 병합 전에 한 번 깊게 볼 때는 `/ultrareview`가 맞습니다.

### 언제 써야 하나

다음에 적합합니다.

- 큰 PR
- 위험한 리팩터링
- 병합 전 신뢰도를 높이고 싶을 때
- 단일 로컬 리뷰 패스로는 놓칠 수 있는 버그 탐색

반대로 다음에는 과할 수 있습니다.

- 아주 작은 diff
- 아직 수정 중인 상태의 빠른 반복
- Claude.ai 인증 기반 원격 경로를 쓸 수 없는 환경

### 흔한 실수

- `/review`와 같은 속도와 비용일 거라고 생각하는 것
- PR 모드에 GitHub remote가 필요하다는 점을 놓치는 것
- extra usage 설정을 보지 않고 유료 리뷰를 시작하는 것
- 백그라운드 작업을 중지해도 부분 결과가 남을 거라고 생각하는 것

### 관련 가이드

- [Code Review](09-advanced-features.md#09-advanced-features-05-code-review)
- [Web Quickstart](09-advanced-features.md#09-advanced-features-31-claude-code-웹-시작하기)
- [Ultraplan](01-slash-commands.md#01-slash-commands-01-ultraplan)

### 공식 출처

- [Find bugs with ultrareview](https://code.claude.com/docs/ko/ultrareview)
