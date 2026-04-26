Subagent는 Claude Code가 작업을 위임할 수 있는 전문화된 AI 어시스턴트입니다.
각 subagent는 메인 대화와 분리된 자체 컨텍스트 윈도우를 사용하고, 특정 도구·시스템 프롬프트·모델로 구성할 수 있습니다.
컨텍스트 오염을 막으면서 코드 리뷰·테스트·디버깅 같은 전문 작업을 병렬로 돌릴 때 가장 큰 가치를 발휘합니다.

[TOC]

## 언제 읽으면 좋은가

- 코드 리뷰, 테스트 작성, 디버깅 같은 특정 작업을 전담 에이전트에게 위임하고 싶을 때
- 메인 대화의 컨텍스트를 오염시키지 않고 별도 컨텍스트에서 작업을 돌리고 싶을 때
- 여러 전문 분야(보안, 성능, 문서)의 결과를 병렬로 받고 싶을 때
- 팀이 공유하는 표준 에이전트 프로필을 관리하고 싶을 때

## 이 장의 핵심 주제

| 주제 | 왜 중요한가 | 먼저 볼 페이지 |
| --- | --- | --- |
| 기본 개념 | 이점·파일 위치·구성 필드 | [subagents-benefits.md](04-23-subagents-benefits.md) · [subagents-file-locations.md](04-26-subagents-file-locations.md) · [subagents-configuration.md](04-25-subagents-configuration.md) |
| 내장 Subagent | general-purpose·Plan·Explore·Bash 등 6개 | [builtin-subagents.md](04-04-builtin-subagents.md) |
| 만들기·관리 | `/agents` 메뉴 vs 직접 파일 관리 | [managing-subagents.md](04-15-managing-subagents.md) |
| 호출 방식 | 자동 위임·@-멘션·세션 전체 agent | [using-subagents.md](04-29-using-subagents.md) |
| 고급 실행 모드 | 재개·체이닝·영구 메모리·백그라운드·worktree | [resumable-agents.md](04-18-resumable-agents.md) 외 |
| 위임 제한 | `Agent(...)` 허용 목록과 plugin 보안 | [limiting-subagent-creation.md](04-14-limiting-subagent-creation.md) · [plugin-subagent-security.md](04-17-plugin-subagent-security.md) |
| Agent Teams | 메일박스 기반 다중 인스턴스 협업(실험적) | [agent-teams.md](04-02-agent-teams.md) (입문) · [agent-teams-experimental.md](04-01-agent-teams-experimental.md) (상세) |
| 아키텍처 | 메인↔subagent 위임 흐름과 라이프사이클 | [subagents-architecture.md](04-22-subagents-architecture.md) · [context-management.md](04-08-context-management.md) |
| 운영 가이드 | 사용 시점·모범 사례·CLI 명령어 | [when-to-use-subagents.md](04-30-when-to-use-subagents.md) · [subagents-best-practices.md](04-24-subagents-best-practices.md) · [cli-agents-command.md](04-06-cli-agents-command.md) |
| 예제·설치 | 7개 예제 subagent와 적용 방법 | [example-subagents.md](04-12-example-subagents.md) · [subagents-installation.md](04-27-subagents-installation.md) |

## 빠른 시작

`.claude/agents/code-reviewer.md`를 만들고 다음을 적습니다:

```yaml
---
name: code-reviewer
description: Expert code review specialist. Use PROACTIVELY after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a senior code reviewer.

When invoked:
1. Run `git diff` to see recent changes
2. Focus on modified files
3. Report findings as: Severity / Category / Location / Description / Fix
```

저장하면 코드 변경 후 자동으로 호출됩니다.
명시적으로 띄우려면 `> Use the code-reviewer subagent to review my changes`라고 말하면 됩니다.
구성 옵션 전체는 [subagents-configuration.md](04-25-subagents-configuration.md)를 참고하세요.

## 자주 하는 실수

- **`description`을 너무 짧게 씀**: 자동 위임이 안 됩니다. "use PROACTIVELY" 같은 트리거 표현을 포함해 작성 시점·도메인을 구체적으로 적으세요.
- **모든 도구를 상속받게 둠**: 보안과 디버깅이 모두 어려워집니다. `tools` 필드로 필요한 것만 부여하세요.
- **Subagent에서 다른 subagent를 띄우려 함**: 중첩 생성은 동작하지 않습니다. 메인 agent만 위임 가능합니다.
- **단순 작업에 subagent 사용**: 컨텍스트 초기화 비용이 더 큽니다. 단일 단계 작업은 메인 세션에서 처리하세요.
- **Agent Teams를 일상 작업에 도입**: 토큰 비용이 선형으로 증가합니다. 리서치·리뷰·새 기능처럼 병렬 가치가 큰 경우에만 쓰세요.

## 관련 장

- [공식 Subagent 문서](https://code.claude.com/docs/ko/sub-agents)
- [CLI 참조](https://code.claude.com/docs/ko/cli-reference) — `--agents` 플래그 및 기타 CLI 옵션
- [01. Slash Commands](01-slash-commands.md) — 빠른 사용자 호출 단축키
- [02. Memory](02-memory.md) — 영구 세션 간 컨텍스트
- [03. Skills](03-skills.md) — 재사용 가능한 자율 기능
- [05. MCP](05-mcp.md) — 실시간 외부 데이터 접근
- [06. Hooks](06-hooks.md) — 이벤트 기반 셸 명령 자동화
- [07. Plugins](07-plugins.md) — 번들 확장 패키지

---
