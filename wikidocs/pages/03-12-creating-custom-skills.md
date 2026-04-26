이 문서는 디렉토리 구조부터 SKILL.md frontmatter까지 처음 스킬을 만들 때 필요한 모든 것을 모았습니다.
"내 워크플로를 스킬로 패키징하려면 정확히 어떤 파일에 무엇을 쓰지?"라는 질문에 한 페이지로 답합니다.
필수 필드와 선택 필드를 모두 포함하므로, 옵션 의미가 헷갈릴 때 레퍼런스로 다시 열어보세요.

## 기본 디렉토리 구조

```
my-skill/
├── SKILL.md           # 주요 지시사항 (필수)
├── template.md        # Claude가 채울 템플릿
├── examples/
│   └── sample.md      # 예상 형식을 보여주는 예제 출력
└── scripts/
    └── validate.sh    # Claude가 실행할 수 있는 스크립트
```

## SKILL.md 형식

```yaml
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---

# Your Skill Name

## Instructions
Provide clear, step-by-step guidance for Claude.

## Examples
Show concrete examples of using this Skill.
```

## 필수 필드

- **name**: 소문자, 숫자, 하이픈만 가능 (최대 64자).
- **description**: 스킬이 무엇을 하는지와 언제 사용하는지 (`when_to_use`와 합산하여 최대 1,536자). Claude가 스킬을 활성화할 시점을 아는 데 중요합니다.

## 선택적 Frontmatter 필드

```yaml
---
name: my-skill
description: What this skill does and when to use it
argument-hint: "[filename] [format]"        # 자동 완성을 위한 힌트
disable-model-invocation: true              # 사용자만 호출 가능
user-invocable: false                       # slash 메뉴에서 숨김
allowed-tools: Read, Grep, Glob             # 도구 접근 제한
model: opus                                 # 사용할 특정 모델
effort: high                                # 노력 수준 재정의 (low, medium, high, xhigh, max)
when_to_use: "사용자가 ...를 요청할 때"       # 호출을 위한 추가 맥락
context: fork                               # 격리된 subagent에서 실행
agent: Explore                              # 에이전트 유형 (context: fork와 함께)
shell: bash                                 # 명령어 셸: bash (기본) 또는 powershell
hooks:                                      # 스킬 범위 hook
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate.sh"
paths: "src/api/**/*.ts"               # 스킬 활성화를 제한하는 glob 패턴
---
```

| 필드 | 설명 |
|-------|-------------|
| `name` | 소문자, 숫자, 하이픈만 가능 (최대 64자). |
| `description` | 스킬이 무엇을 하는지와 언제 사용하는지 (`when_to_use`와 합산하여 최대 1,536자). 자동 호출 매칭에 중요합니다. |
| `argument-hint` | `/` 자동 완성 메뉴에 표시되는 힌트 (예: `"[filename] [format]"`). |
| `disable-model-invocation` | `true` = 사용자만 `/name`으로 호출 가능. Claude는 절대 자동 호출하지 않습니다. |
| `user-invocable` | `false` = `/` 메뉴에서 숨겨짐. Claude만 자동으로 호출할 수 있습니다. |
| `allowed-tools` | 스킬이 권한 프롬프트 없이 사용할 수 있는 도구의 쉼표로 구분된 목록. |
| `model` | 스킬이 활성 상태인 동안의 모델 재정의 (예: `opus`, `sonnet`). |
| `effort` | 스킬이 활성 상태인 동안의 노력 수준 재정의: `low`, `medium`, `high`, `xhigh`, 또는 `max`. |
| `context` | `fork`로 설정하면 자체 컨텍스트 윈도우를 가진 포크된 subagent 컨텍스트에서 스킬을 실행합니다. |
| `agent` | `context: fork` 시 subagent 유형 (예: `Explore`, `Plan`, `general-purpose`). |
| `shell` | `` !`command` `` 대체 및 스크립트에 사용되는 셸: `bash` (기본) 또는 `powershell`. |
| `hooks` | 이 스킬의 수명 주기에 한정된 hook (글로벌 hook과 동일한 형식). |
| `when_to_use` | Claude가 스킬을 호출해야 할 추가 맥락. `description`에 추가되어 스킬 목록에 표시되며 합산 1,536자 제한. |
| `paths` | 스킬이 자동 활성화되는 시점을 제한하는 glob 패턴. 쉼표로 구분된 문자열 또는 YAML 목록. 경로별 규칙과 동일한 형식. |
