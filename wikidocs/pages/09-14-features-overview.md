이 페이지는 Claude Code의 확장 계층을 설명합니다. 내장 도구만으로 부족할 때 무엇을 추가해야 하는지 빠르게 판단할 수 있도록 정리한 문서입니다.

## 기본 개념

Claude Code는 모델과 내장 도구로 시작합니다. 그 위에 확장 기능이 에이전트 루프의 서로 다른 지점에 붙습니다.

- `CLAUDE.md`는 항상 로드되는 지속 문맥을 더합니다
- skills는 재사용 가능한 지식과 워크플로를 더합니다
- MCP는 외부 서비스와 도구를 연결합니다
- subagents는 격리된 작업을 수행하고 요약을 돌려줍니다
- agent teams는 여러 세션을 조정합니다
- hooks는 루프 바깥에서 결정적 스크립트를 실행합니다
- plugins는 이런 구성 요소를 패키징하고 배포합니다

## 목표에 맞는 기능 고르기

가장 작은 기능으로 문제를 해결하는 편이 좋습니다.

| 기능 | 적합한 용도 |
|---|---|
| `CLAUDE.md` | 프로젝트 규칙, 항상 지켜야 하는 지침 |
| Skills | 반복 프롬프트, 참고 지식, 재사용 워크플로 |
| Subagents | 문맥 격리, 병렬 조사, 전문 작업자 |
| Agent teams | 여러 세션 조정 |
| MCP | 외부 시스템, API, 브라우저, 데이터베이스 |
| Hooks | 이벤트 기반 결정적 자동화 |
| Plugins | 여러 저장소나 팀에 재사용할 배포 단위 |

## 점진적으로 키우기

공식 문서는 처음부터 모든 기능을 켜기보다 필요가 생길 때마다 추가하라고 권합니다.

대표적인 신호:

- Claude가 프로젝트 규칙을 두 번 이상 틀린다: `CLAUDE.md`
- 같은 시작 프롬프트를 계속 친다: skill
- Claude가 볼 수 없는 시스템의 데이터를 자꾸 복사해 준다: MCP
- 옆 작업이 메인 대화 문맥을 너무 많이 먹는다: subagent
- 매번 같은 후처리를 원한다: hook
- 다른 저장소에도 같은 구성을 배포하고 싶다: plugin

## 자주 헷갈리는 기능 구분

### `CLAUDE.md` vs skills

- `CLAUDE.md`는 항상 켜져 있는 문맥
- skills는 필요할 때 쓰는 재사용 능력

### Skills vs 슬래시 명령

- skills는 지시와 자산을 묶는 단위
- 슬래시 명령은 이름 붙은 진입점

### MCP vs hooks

- MCP는 Claude에게 새 도구와 데이터 소스를 줍니다
- hooks는 모델 바깥에서 스크립트를 실행합니다

### Subagents vs agent teams

- subagents는 하나의 워크플로 안에서 위임되는 하위 작업자
- agent teams는 여러 독립 세션을 조정하는 상위 구조

### Plugins vs 나머지

- plugins는 패키징 계층입니다
- skills, hooks, subagents, MCP 서버를 설치 가능한 단위로 묶습니다

## 컨텍스트 비용을 고려해야 한다

모든 기능이 같은 비용을 갖지는 않습니다.

- `CLAUDE.md`는 지속적으로 로드됩니다
- skills는 필요할 때만 로드되어 더 가벼울 수 있습니다
- subagents는 상세 작업을 부모 문맥 밖으로 밀어냅니다
- MCP 도구 정의도 필요 시 지연 로딩되는 경우가 많습니다

즉, 메인 세션을 더 작게 유지하는 기능 선택이 중요합니다.

## 추천 도입 순서

대부분의 팀은 다음 순서가 실용적입니다.

1. `CLAUDE.md`
2. skills
3. subagents
4. MCP
5. hooks
6. plugins

이 순서는 공식 문서의 권장 흐름과도 잘 맞습니다.

## 관련 가이드

- [How Claude Code Works](https://wikidocs.net/345346)
- [Settings System Guide](https://wikidocs.net/345696)
- [Channels Reference](https://wikidocs.net/345693)
- [Subagents](https://wikidocs.net/345414)
- [Skills](https://wikidocs.net/345381)
- [Plugins](https://wikidocs.net/345497)

## 공식 출처

- [Extend Claude Code](https://code.claude.com/docs/ko/features-overview)
