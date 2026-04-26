에이전트 스킬은 Claude의 기능을 확장하는 재사용 가능한 파일 시스템 기반 기능입니다.
도메인별 전문 지식·워크플로·모범 사례를 검색 가능한 컴포넌트로 패키징하면, Claude가 관련 상황에서 자동으로 사용합니다.
프롬프트(일회성 지시)와 달리 스킬은 필요할 때만 로드되어 같은 안내를 매 대화마다 반복할 필요가 없습니다.

[TOC]

## 언제 읽으면 좋은가

- 코드 리뷰, 리팩토링, 문서화 같은 도메인별 워크플로를 자동화하고 싶을 때
- 팀이 공유하는 모범 사례를 한 번 정의해 모두가 같은 방식으로 호출하고 싶을 때
- 기존 사용자 정의 slash command를 더 강력한 skill 구조로 업그레이드해야 할 때
- 프로젝트나 조직의 도메인 지식을 Claude가 필요할 때만 자동으로 활용하게 하고 싶을 때

[[TIP("참고")]]
커스텀 slash command는 스킬로 통합되었습니다. `.claude/commands/` 파일은 여전히 작동하며 동일한 frontmatter 필드를 지원합니다. 새로운 개발에는 스킬을 권장합니다. 동일한 경로에 둘 다 존재하는 경우(예: `.claude/commands/review.md`와 `.claude/skills/review/SKILL.md`), 스킬이 우선합니다.
[[/TIP]]

## 이 장의 핵심 주제

| 주제 | 왜 중요한가 | 먼저 볼 페이지 |
| --- | --- | --- |
| 작동 원리 | 점진적 공개로 컨텍스트를 절약하면서 무제한 확장 | [how-skills-work.md](03-15-how-skills-work.md) |
| 로딩 흐름 | 요청 → 매칭 → SKILL.md 로드 시퀀스 이해 | [skill-loading-process.md](03-24-skill-loading-process.md) |
| 유형과 위치 | enterprise·personal·project·plugin 우선순위 | [skill-types-and-locations.md](03-26-skill-types-and-locations.md) |
| 만들기 | 디렉토리 구조와 SKILL.md frontmatter 전체 | [creating-custom-skills.md](03-12-creating-custom-skills.md) |
| 콘텐츠 유형 | 참조 콘텐츠 vs 작업 콘텐츠 구분 | [skill-content-types.md](03-23-skill-content-types.md) |
| 호출 제어 | 누가(사용자 vs Claude) 호출할 수 있게 할지 | [controlling-skill-invocation.md](03-11-controlling-skill-invocation.md) |
| 동적 입력 | `$ARGUMENTS`, `${CLAUDE_SESSION_ID}`, `` !`cmd` `` | [string-substitution.md](03-32-string-substitution.md) · [dynamic-context-injection.md](03-14-dynamic-context-injection.md) |
| Subagent 실행 | `context: fork`로 격리된 컨텍스트에서 실행 | [running-skills-in-subagents.md](03-21-running-skills-in-subagents.md) |
| 실전 예시 | 코드 리뷰·시각화·배포 등 6가지 패턴 | [skills-real-world-examples.md](03-28-skills-real-world-examples.md) |
| 운영 | 보기·테스트·업데이트·권한 제한 | [managing-skills.md](03-16-managing-skills.md) |
| 모범 사례 | 자동 호출 정확도를 높이는 5가지 원칙 | [skills-best-practices.md](03-27-skills-best-practices.md) |
| 문제 해결 | 트리거 안 됨·과다 호출·예산 초과 | [skills-troubleshooting.md](03-30-skills-troubleshooting.md) |
| 기타 운영 | 지원 파일·보안·번들·공유·다른 기능과 비교 | [skill-supporting-files.md](03-25-skill-supporting-files.md) 외 |

## 빠른 시작

`~/.claude/skills/code-review/SKILL.md`를 만들고 다음을 적습니다:

```yaml
---
name: code-review
description: Comprehensive code review with security, performance, and quality analysis. Use when users ask to review code, analyze code quality, or evaluate pull requests.
---

# Code Review Skill

## Instructions
For each file:
1. Identify security issues (auth, injection, exposure)
2. Check performance (Big O, memory, queries)
3. Review code quality (SOLID, naming, tests)

## Output
- Summary (1-5 score, top findings)
- Critical issues with file:line and fix examples
```

저장하면 다음 세션부터 "Can you review this code?" 같은 요청에 자동으로 호출됩니다.
디렉토리 구조와 frontmatter 옵션 전체는 [creating-custom-skills.md](03-12-creating-custom-skills.md)를 참고하세요.

## 자주 하는 실수

- **설명을 너무 짧게 씀**: "Helps with code"처럼 모호하면 Claude가 자동 호출하지 않습니다. 트리거 키워드를 포함해 구체적으로 적으세요.
- **SKILL.md를 500줄 넘게 키움**: 본문이 길어지면 레벨 2 컨텍스트 비용이 커집니다. 상세 자료는 `references/`·`templates/`로 분리하세요.
- **부작용 있는 스킬을 자동 호출 가능하게 둠**: `/deploy`, `/commit` 같은 스킬은 `disable-model-invocation: true`로 잠가야 합니다.
- **외부 출처 스킬을 감사 없이 설치**: 스킬은 코드와 명령을 실행할 수 있으므로 소프트웨어 설치처럼 신뢰 검증이 필요합니다.

## 관련 장

- [공식 스킬 문서](https://code.claude.com/docs/ko/skills)
- [에이전트 스킬 아키텍처 블로그](https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills)
- [01. Slash Command](01-slash-commands.md) — 사용자 시작 단축키
- [02. Memory](02-memory.md) — 영구적인 컨텍스트
- [04. Subagents](04-subagents.md) — 위임된 AI 에이전트
- [05. MCP (Model Context Protocol)](05-mcp.md) — 실시간 외부 데이터
- [06. Hooks](06-hooks.md) — 이벤트 기반 자동화
- [07. Plugins](07-plugins.md) — 스킬·명령·훅 번들 배포

---
