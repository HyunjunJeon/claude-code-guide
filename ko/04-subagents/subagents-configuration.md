# 구성

이 문서는 subagent를 정의할 때 쓰는 YAML frontmatter의 모든 필드와 도구 구성 패턴을 정리합니다.
새 `.claude/agents/<name>.md` 파일을 만들거나 `--agents` JSON으로 일회성 subagent를 정의할 때 펼쳐 보세요.
필수 필드(`name`, `description`)부터 도구 제한·모델·메모리·격리까지 모든 옵션을 한 페이지에 모았습니다.

## 파일 형식

Subagent는 YAML frontmatter와 그 뒤에 이어지는 마크다운 형식의 시스템 프롬프트로 정의됩니다:

```yaml
---
name: your-sub-agent-name
description: Description of when this subagent should be invoked
tools: tool1, tool2, tool3  # Optional - inherits all tools if omitted
disallowedTools: tool4  # Optional - explicitly disallowed tools
model: sonnet  # Optional - sonnet, opus, haiku, or inherit
permissionMode: default  # Optional - permission mode
maxTurns: 20  # Optional - limit agentic turns
skills: skill1, skill2  # Optional - skills to preload into context
mcpServers: server1  # Optional - MCP servers to make available
memory: user  # Optional - persistent memory scope (user, project, local)
background: false  # Optional - run as background task
effort: high  # Optional - reasoning effort (low, medium, high, xhigh, max)
isolation: worktree  # Optional - git worktree isolation
initialPrompt: "Start by analyzing the codebase"  # Optional - auto-submitted first turn
hooks:  # Optional - component-scoped hooks
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/security-check.sh"
---

Your subagent's system prompt goes here. This can be multiple paragraphs
and should clearly define the subagent's role, capabilities, and approach
to solving problems.
```

## 구성 필드

| 필드 | 필수 | 설명 |
|-------|----------|-------------|
| `name` | 예 | 고유 식별자 (소문자와 하이픈) |
| `description` | 예 | 목적에 대한 자연어 설명. 자동 호출을 장려하려면 "use PROACTIVELY"를 포함하세요 |
| `tools` | 아니오 | 쉼표로 구분된 특정 도구 목록. 생략하면 모든 도구를 상속합니다. 생성 가능한 subagent를 제한하기 위해 `Agent(agent_name)` 구문을 지원합니다 |
| `disallowedTools` | 아니오 | subagent가 사용해서는 안 되는 도구의 쉼표 구분 목록 |
| `model` | 아니오 | 사용할 모델: `sonnet`, `opus`, `haiku`, 전체 모델 ID, 또는 `inherit`. 기본값은 구성된 subagent 모델입니다 |
| `permissionMode` | 아니오 | `default`, `acceptEdits`, `dontAsk`, `bypassPermissions`, `plan` |
| `maxTurns` | 아니오 | subagent가 수행할 수 있는 최대 에이전트 턴 수 |
| `skills` | 아니오 | 사전 로드할 skill의 쉼표 구분 목록. 시작 시 subagent의 컨텍스트에 전체 skill 내용을 주입합니다 |
| `mcpServers` | 아니오 | subagent에서 사용 가능한 MCP 서버 |
| `hooks` | 아니오 | 컴포넌트 범위 hook (PreToolUse, PostToolUse, Stop) |
| `memory` | 아니오 | 영구 메모리 디렉토리 범위: `user`, `project`, 또는 `local` |
| `background` | 아니오 | `true`로 설정하면 이 subagent를 항상 백그라운드 작업으로 실행합니다 |
| `effort` | 아니오 | 추론 노력 수준: `low`, `medium`, `high`, `xhigh`, 또는 `max` |
| `isolation` | 아니오 | `worktree`로 설정하면 subagent에 자체 git worktree를 부여합니다 |
| `initialPrompt` | 아니오 | subagent가 메인 agent로 실행될 때 자동 제출되는 첫 번째 턴 |

## 도구 구성 옵션

**옵션 1: 모든 도구 상속 (필드 생략)**

```yaml
---
name: full-access-agent
description: Agent with all available tools
---
```

**옵션 2: 개별 도구 지정**

```yaml
---
name: limited-agent
description: Agent with specific tools only
tools: Read, Grep, Glob, Bash
---
```

**옵션 3: 조건부 도구 접근**

```yaml
---
name: conditional-agent
description: Agent with filtered tool access
tools: Read, Bash(npm:*), Bash(test:*)
---
```

## CLI 기반 구성

`--agents` 플래그와 JSON 형식을 사용하여 단일 세션용 subagent를 정의할 수 있습니다:

```bash
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'
```

**`--agents` 플래그의 JSON 형식:**

```json
{
  "agent-name": {
    "description": "Required: when to invoke this agent",
    "prompt": "Required: system prompt for the agent",
    "tools": ["Optional", "array", "of", "tools"],
    "model": "optional: sonnet|opus|haiku"
  }
}
```

**Agent 정의 우선순위:**

Agent 정의는 다음 우선순위로 로드됩니다 (첫 번째 매칭이 적용):

1. **CLI 정의** - `--agents` 플래그 (세션 한정, JSON)
2. **프로젝트 레벨** - `.claude/agents/` (현재 프로젝트)
3. **사용자 레벨** - `~/.claude/agents/` (모든 프로젝트)
4. **Plugin 레벨** - Plugin `agents/` 디렉토리

이를 통해 CLI 정의가 단일 세션에서 다른 모든 소스를 재정의할 수 있습니다.
