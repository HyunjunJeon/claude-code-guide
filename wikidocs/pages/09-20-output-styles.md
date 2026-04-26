Output styles는 Claude Code의 핵심 CLI 동작은 유지하면서 응답 방식을 바꾸고 싶을 때 쓰는 기능입니다. 일회성 prompt tweak가 아니라, 세션 전반에 유지되는 응답 모드를 만들고 싶을 때 적합합니다.

## What Output Styles Are For

다음처럼 Claude Code가 일정한 응답 모드로 유지되길 원할 때 사용합니다:

- 코딩 중 구현 선택 이유를 더 설명하게 하기
- 코딩 작업을 학습용 흐름으로 바꾸기
- 비기본 응답 구조나 tone 적용하기
- `/config`에서 고를 수 있는 커스텀 작업 모드 만들기

Output styles는 일반 user instruction과 다릅니다. Claude Code가 시작할 때 쓰는 system-prompt layer를 바꾸기 때문입니다.

## Built-In Output Styles

Claude Code에는 기본으로 세 가지 style이 있습니다:

| Style | When to use it | What changes |
|---|---|---|
| `Default` | 일반적인 엔지니어링 작업 | 표준 Claude Code coding behavior를 사용 |
| `Explanatory` | 작업 중 설명을 더 받고 싶을 때 | 구현 reasoning과 설명을 더 많이 추가 |
| `Learning` | 참여형 학습 세션을 원할 때 | learn-by-doing 성격이 강해지고 `TODO(human)` 성격의 흐름이 생길 수 있음 |

그래도 소프트웨어 엔지니어링이 목적이라면 기본은 `Default` 또는 `Explanatory`가 안전합니다. `Learning`은 세션을 의도적으로 더 교육적으로 만들고 싶을 때 적합합니다.

## How Output Styles Work

Output styles는 일반 prompt처럼 덧붙는 게 아니라 Claude Code의 system prompt를 수정합니다.

핵심 동작:

- 선택한 output style은 새 세션이 시작될 때 적용됩니다
- 세션 도중 style을 바꿔도 현재 대화가 완전히 다시 구성되지는 않습니다
- custom style은 자기 instruction을 system prompt 끝에 추가합니다
- custom style은 기본 coding-specific instruction을 유지할 수도 있습니다

토큰 관점에서는:

- style instruction이 길수록 입력 토큰이 늘어납니다
- 첫 요청 이후에는 prompt caching이 반복 비용을 줄여줍니다
- 설명형 style은 출력 토큰도 더 많이 쓸 수 있습니다

## Change Your Output Style

가장 쉬운 방법은 `/config`입니다.

```bash
/config
```

그다음 `Output style`을 선택합니다.

직접 settings에 넣을 수도 있습니다:

```json
{
  "outputStyle": "Explanatory"
}
```

주요 위치:

- Local project: `.claude/settings.local.json`
- Project-shared: `.claude/settings.json`
- User-wide: `~/.claude/settings.json`

실험할 때는 local project scope가 가장 안전합니다.

## Create a Custom Output Style

Custom output styles는 다음 위치의 Markdown 파일입니다:

- User-wide: `~/.claude/output-styles/`
- Project-wide: `.claude/output-styles/`
- Plugin-provided: plugin 내부의 `output-styles/`

최소 예시:

```markdown
---
name: Architecture Reviewer
description: Focus on tradeoffs, risks, and boundary decisions.
keep-coding-instructions: true
---

# Architecture Reviewer

Prioritize:
- boundary clarity
- migration risk
- operational impact
- testability

Prefer short, high-signal responses with explicit tradeoffs.
```

### Frontmatter

| Field | Purpose | Default |
|---|---|---|
| `name` | picker에 표시되는 이름 | file name 사용 가능 |
| `description` | `/config`에서 보이는 짧은 설명 | None |
| `keep-coding-instructions` | Claude Code의 coding-specific default instructions 유지 | `false` |

### When to Set `keep-coding-instructions: true`

Claude Code를 계속 coding agent처럼 유지하면서 presentation이나 emphasis만 바꾸고 싶을 때 `true`로 둡니다.

예:

- architecture review mode
- concise code-explanation mode
- mentoring mode

반대로 일반 software-engineering behavior에서 일부러 벗어나고 싶다면 `false`가 맞습니다.

## Example Project Layout

```plaintext
.claude/
└── output-styles/
    ├── architecture-reviewer.md
    └── onboarding-mentor.md
```

## Comparisons

### Output Styles vs `CLAUDE.md`

응답 방식을 바꾸고 싶다면 output styles를 사용합니다.

프로젝트의 durable instruction이 필요하다면 `CLAUDE.md`를 사용합니다. 예:

- coding standards
- architecture rules
- testing expectations
- deployment constraints

`CLAUDE.md`는 project memory이고, output styles는 response mode입니다.

### Output Styles vs `--append-system-prompt`

`--append-system-prompt`는 한 세션 또는 한 CLI invocation용입니다.

Output styles는 재사용 가능하고 `/config`에서 선택 가능한 지속형 모드입니다.

### Output Styles vs Agents

별도 model, tools, task boundary를 가진 전문 worker가 필요하면 agents를 사용합니다.

메인 agent의 tone, structure, working mode만 바꾸고 싶다면 output styles가 맞습니다.

### Output Styles vs Skills

Skills는 task-specific workflow와 reusable capability bundle용입니다.

Output styles는 세션 전체의 persistent response behavior용입니다.

## Recommended Patterns

### Pattern: Teaching Without Losing Coding Discipline

다음을 함께 씁니다:

- `keep-coding-instructions: true`
- 짧은 교육용 instruction set
- `Explanatory`에 가까운 응답 방식

이렇게 하면 verification과 coding discipline은 유지하면서 세션을 더 투명하게 만들 수 있습니다.

### Pattern: Project-Specific Review Mode

프로젝트 수준에서 다음 같은 review mode를 하나 두는 것이 좋습니다:

- architecture review
- migration review
- release-readiness review

같은 manual prompt를 계속 기억할 필요 없이 팀 전체가 안정적인 모드를 쓸 수 있습니다.

## Common Mistakes

- project rule을 output styles에 넣고 `CLAUDE.md`를 비워 두는 것
- 기존 system prompt 전략을 긴 style 파일로 중복하는 것
- 세션 중간 style 변경이 현재 대화를 완전히 재구성할 거라고 기대하는 것
- coding agent로 남아야 하는데 `keep-coding-instructions`를 빼먹는 것

## Try It Now

### 1. Switch to a built-in style

```bash
/config
```

`Output style`에서 `Explanatory`를 선택한 뒤 새 세션을 열고 file-level refactor를 설명해 달라고 요청합니다.

Expected result:

- Claude는 계속 코딩을 수행합니다
- `Default`보다 구현 reasoning을 더 많이 설명합니다

### 2. Add a project style

```bash
mkdir -p .claude/output-styles
```

위 예시로 `.claude/output-styles/architecture-reviewer.md`를 만든 뒤 `/config`를 다시 엽니다.

Expected result:

- 새 style이 picker에 나타납니다
- 선택하면 세션이 architecture-focused review mode에 가까워집니다

## Related Guides

- 고급 기능 README
- 메모리 가이드
- Skills 가이드
- Subagents 가이드

## Official Reference

- https://code.claude.com/docs/ko/output-styles
