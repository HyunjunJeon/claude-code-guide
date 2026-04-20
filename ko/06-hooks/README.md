
# Hooks

Hooks는 Claude Code 세션 중 특정 이벤트에 반응하여 실행되는 자동화 스크립트입니다. 자동화, 검증, 권한 관리, 커스텀 워크플로우를 가능하게 합니다.

## 개요

### 이벤트 기반 아키텍처

Claude Code는 **이벤트 루프** 기반으로 동작합니다. 사용자가 프롬프트를 제출하면 Claude는 응답을 생성하기 위해 여러 **턴(turn)** 을 수행하며, 각 턴에서 도구를 호출하고, 결과를 분석하고, 다음 행동을 결정합니다. Hooks는 이 이벤트 루프의 특정 지점에 개입하여 사용자 정의 로직을 실행하는 메커니즘입니다.

```
세션 시작 (SessionStart)
    ↓
[사용자 프롬프트 제출] (UserPromptSubmit)
    ↓
  ┌─ 에이전트 루프 ──────────────────────────┐
  │  도구 호출 전 (PreToolUse)                │
  │      ↓                                    │
  │  권한 확인 (PermissionRequest)             │
  │      ↓                                    │
  │  도구 실행                                │
  │      ↓                                    │
  │  도구 완료 후 (PostToolUse / Failure)      │
  │      ↓                                    │
  │  다음 도구 필요? ──→ 루프 반복             │
  └───────────────────────────────────────────┘
    ↓
응답 완료 (Stop)
    ↓
비동기 이벤트: ConfigChange, FileChanged, CwdChanged 등
    ↓
세션 종료 (SessionEnd)
```

이 구조를 이해하면 어떤 hook 이벤트가 언제 발생하는지, 차단(blocking)이 어떤 효과를 갖는지 직관적으로 파악할 수 있습니다. 예를 들어 `PreToolUse`에서 차단하면 도구 실행 자체를 막을 수 있고, `Stop`에서 차단하면 Claude가 작업이 덜 되었다고 판단하고 추가 턴을 수행합니다.

### Hooks란?

Hooks는 위 이벤트 루프의 지정된 지점에서 자동으로 실행되는 동작(셸 명령, HTTP 웹훅, LLM 프롬프트 또는 subagent 평가)입니다. JSON 입력을 받고 종료 코드와 JSON 출력을 통해 결과를 전달합니다.

**주요 기능:**
- 이벤트 루프의 특정 지점에 개입하는 이벤트 기반 자동화
- JSON 기반 입출력 (stdin으로 컨텍스트 수신, stdout으로 결정 반환)
- command, prompt, HTTP, agent 네 가지 hook 타입 지원
- matcher 패턴으로 특정 도구나 이벤트만 선택적으로 처리

## 설정

Hooks는 특정 구조의 설정 파일에서 구성합니다:

- `~/.claude/settings.json` - 사용자 설정 (모든 프로젝트)
- `.claude/settings.json` - 프로젝트 설정 (공유 가능, 커밋됨)
- `.claude/settings.local.json` - 로컬 프로젝트 설정 (커밋되지 않음)
- Managed policy - 조직 전체 설정
- Plugin `hooks/hooks.json` - plugin 범위 hooks
- Skill/Agent frontmatter - 컴포넌트 수명 주기 hooks

### 기본 설정 구조

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

**주요 필드:**

| 필드 | 설명 | 예시 |
|-------|-------------|---------|
| `matcher` | 도구 이름과 매칭하는 패턴 (대소문자 구분) | `"Write"`, `"Edit\|Write"`, `"*"` |
| `hooks` | hook 정의 배열 | `[{ "type": "command", ... }]` |
| `type` | Hook 타입: `"command"` (bash), `"prompt"` (LLM), `"http"` (웹훅), 또는 `"agent"` (subagent) | `"command"` |
| `command` | 실행할 셸 명령 | `"$CLAUDE_PROJECT_DIR/.claude/hooks/format.sh"` |
| `timeout` | 선택적 타임아웃(초 단위, 기본값 60) | `30` |
| `once` | `true`이면 세션당 한 번만 hook 실행 | `true` |
| `if` | 조건부 실행을 위한 권한 규칙 필터 (v2.1.85+) | `"Bash(git *)"` |
| `async` | hook을 비동기적으로 실행 (논블로킹) | `true` |
| `shell` | command hook에 사용할 셸: `bash` (기본값) 또는 `powershell` | `"bash"` |

### Matcher 패턴

| 패턴 | 설명 | 예시 |
|---------|-------------|---------|
| 정확한 문자열 | 특정 도구와 매칭 | `"Write"` |
| 정규식 패턴 | 여러 도구와 매칭 | `"Edit\|Write"` |
| 와일드카드 | 모든 도구와 매칭 | `"*"` 또는 `""` |
| MCP 도구 | 서버 및 도구 패턴 | `"mcp__memory__.*"` |

**InstructionsLoaded matcher 값:**

| Matcher 값 | 설명 |
|---------------|-------------|
| `session_start` | 세션 시작 시 로드된 지침 |
| `nested_traversal` | 중첩 디렉토리 탐색 중 로드된 지침 |
| `path_glob_match` | 경로 glob 패턴 매칭으로 로드된 지침 |

## Hooks 관리

### `/hooks` 메뉴 사용

`/hooks`는 설정 파일을 직접 뒤지기 전에 현재 hook 구성을 대화형으로 확인하고 관리하고 싶을 때 쓰는 가장 빠른 진입점입니다.

대표적인 용도:

- 현재 어떤 hook event가 설정되어 있는지 확인
- 어떤 파일이나 컴포넌트가 hook를 소유하는지 찾기
- hook가 user, project, plugin, component 중 어디에서 왔는지 확인

Hook가 예상과 다르게 실행되거나 전혀 실행되지 않을 때 `/hooks` 메뉴부터 보는 것이 가장 빠릅니다.

### Hook 비활성화 또는 제거

Hook를 끄는 방법은 정의 위치에 따라 다릅니다:

- user/project/local settings: 해당 settings 파일에서 관련 `hooks` 항목 제거 또는 주석 처리
- plugin hooks: plugin을 비활성화하거나 plugin 정의에서 hook 제거
- component hooks: skill, agent, command frontmatter에서 `hooks` 블록 제거

안전한 작업 순서:

1. `/hooks` 또는 설정 파일 확인으로 hook 정의 위치를 찾습니다.
2. 전체 hook family를 지우기보다 가장 좁은 matcher 엔트리부터 비활성화합니다.
3. 동일한 동작을 한 번 다시 실행해 hook가 실제로 비활성화됐는지 확인합니다.

디버깅 목적이라면 event 전체를 지우는 것보다 단일 matcher 항목만 끄는 것이 안전합니다.

## Hook 타입

Claude Code는 네 가지 hook 타입을 지원합니다:

### Command Hooks

기본 hook 타입입니다. 셸 명령을 실행하고 JSON stdin/stdout 및 종료 코드를 통해 통신합니다.

```json
{
  "type": "command",
  "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate.py\"",
  "timeout": 60
}
```

### HTTP Hooks

> v2.1.63에서 추가되었습니다.

command hook과 동일한 JSON 입력을 받는 원격 웹훅 엔드포인트입니다. HTTP hooks는 URL로 JSON을 POST하고 JSON 응답을 받습니다. 샌드박싱이 활성화된 경우 샌드박스를 통해 라우팅됩니다. URL에서 환경 변수 보간을 사용하려면 보안을 위해 명시적인 `allowedEnvVars` 목록이 필요합니다.

```json
{
  "hooks": {
    "PostToolUse": [{
      "type": "http",
      "url": "https://my-webhook.example.com/hook",
      "matcher": "Write"
    }]
  }
}
```

**주요 속성:**
- `"type": "http"` -- HTTP hook임을 식별
- `"url"` -- 웹훅 엔드포인트 URL
- 샌드박스 활성화 시 샌드박스를 통해 라우팅
- URL의 환경 변수 보간에는 명시적 `allowedEnvVars` 목록 필요

### Prompt Hooks

hook 내용이 Claude가 평가하는 프롬프트인 LLM 평가 프롬프트입니다. 주로 `Stop` 및 `SubagentStop` 이벤트에서 지능적인 작업 완료 확인에 사용됩니다.

```json
{
  "type": "prompt",
  "prompt": "Evaluate if Claude completed all requested tasks.",
  "timeout": 30
}
```

LLM이 프롬프트를 평가하고 구조화된 결정을 반환합니다 (자세한 내용은 [프롬프트 기반 Hooks](#프롬프트-기반-hooks) 참조).

### Agent Hooks

전용 에이전트를 생성하여 조건을 평가하거나 복잡한 검사를 수행하는 subagent 기반 검증 hooks입니다. prompt hooks(단일 턴 LLM 평가)와 달리, agent hooks는 도구를 사용하고 다단계 추론을 수행할 수 있습니다.

```json
{
  "type": "agent",
  "prompt": "Verify the code changes follow our architecture guidelines. Check the relevant design docs and compare.",
  "timeout": 120
}
```

**주요 속성:**
- `"type": "agent"` -- agent hook임을 식별
- `"prompt"` -- subagent에 대한 작업 설명
- 에이전트는 도구(Read, Grep, Bash 등)를 사용하여 평가 수행 가능
- prompt hooks와 유사한 구조화된 결정을 반환

## Hook 이벤트

Claude Code는 **27개의 hook 이벤트**를 지원합니다:

| 이벤트 | 트리거 시점 | Matcher 입력 | 차단 가능 | 일반적 용도 |
|-------|---------------|---------------|-----------|------------|
| **SessionStart** | 세션 시작/재개/초기화/압축 | startup/resume/clear/compact | 아니오 | 환경 설정 |
| **InstructionsLoaded** | CLAUDE.md 또는 규칙 파일 로드 후 | (없음) | 아니오 | 지침 수정/필터링 |
| **UserPromptSubmit** | 사용자가 프롬프트 제출 | (없음) | 예 | 프롬프트 검증 |
| **PreToolUse** | 도구 실행 전 | 도구 이름 | 예 (allow/deny/ask) | 입력 검증 및 수정 |
| **PermissionRequest** | 권한 대화상자 표시 | 도구 이름 | 예 | 자동 승인/거부 |
| **PermissionDenied** | 사용자가 권한 프롬프트 거부 | 도구 이름 | 아니오 | 로깅, 분석, 정책 적용 |
| **PostToolUse** | 도구 성공 후 | 도구 이름 | 예 (`decision: "block"`) | 컨텍스트 추가, 피드백, 결과 차단 |
| **PostToolUseFailure** | 도구 실행 실패 | 도구 이름 | 아니오 | 오류 처리, 로깅 |
| **Notification** | 알림 전송 | 알림 유형 | 아니오 | 커스텀 알림 |
| **SubagentStart** | subagent 생성 | 에이전트 타입 이름 | 아니오 | subagent 설정 |
| **SubagentStop** | subagent 완료 | 에이전트 타입 이름 | 예 | subagent 검증 |
| **Stop** | Claude 응답 완료 | (없음) | 예 | 작업 완료 확인 |
| **StopFailure** | API 오류로 턴 종료 | (없음) | 아니오 | 오류 복구, 로깅 |
| **TeammateIdle** | 에이전트 팀 동료 유휴 | (없음) | 예 | 팀원 조율 |
| **TaskCompleted** | 작업 완료로 표시 | (없음) | 예 | 작업 후 동작 |
| **TaskCreated** | TaskCreate로 작업 생성 | (없음) | 예 | 작업 추적, 로깅, 생성 차단 |
| **ConfigChange** | 설정 파일 변경 | (없음) | 예 (정책 제외) | 설정 변경에 반응 |
| **CwdChanged** | 작업 디렉토리 변경 | (없음) | 아니오 | 디렉토리별 설정 |
| **FileChanged** | 감시 중인 파일 변경 | (없음) | 아니오 | 파일 모니터링, 리빌드 |
| **PreCompact** | 컨텍스트 압축 전 | manual/auto | 예 | 압축 전 동작, 압축 차단 |
| **PostCompact** | 압축 완료 후 | (없음) | 아니오 | 압축 후 동작 |
| **WorktreeCreate** | 워크트리 생성 중 | (없음) | 예 (경로 반환) | 워크트리 초기화 |
| **WorktreeRemove** | 워크트리 제거 중 | (없음) | 아니오 | 워크트리 정리 |
| **Elicitation** | MCP 서버가 사용자 입력 요청 | (없음) | 예 | 입력 검증 |
| **ElicitationResult** | 사용자가 요청에 응답 | (없음) | 예 | 응답 처리 |
| **SessionEnd** | 세션 종료 | (없음) | 아니오 | 정리, 최종 로깅 |

### PreToolUse

Claude가 도구 매개변수를 생성한 후 처리 전에 실행됩니다. 도구 입력을 검증하거나 수정하는 데 사용합니다.

**설정:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/validate-bash.py"
          }
        ]
      }
    ]
  }
}
```

**일반적인 matcher:** `Task`, `Bash`, `Glob`, `Grep`, `Read`, `Edit`, `Write`, `WebFetch`, `WebSearch`

**출력 제어:**
- `permissionDecision`: `"allow"`, `"deny"`, 또는 `"ask"`
- `permissionDecisionReason`: 결정에 대한 설명
- `updatedInput`: 수정된 도구 입력 매개변수

### PostToolUse

도구 완료 직후 실행됩니다. 검증, 로깅 또는 Claude에게 컨텍스트를 제공하는 데 사용합니다.

**설정:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/security-scan.py"
          }
        ]
      }
    ]
  }
}
```

**출력 제어:**
- `"block"` 결정은 피드백과 함께 Claude에게 프롬프트를 보냄
- `additionalContext`: Claude에 추가되는 컨텍스트

### UserPromptSubmit

사용자가 프롬프트를 제출하면 Claude가 처리하기 전에 실행됩니다.

**설정:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/validate-prompt.py"
          }
        ]
      }
    ]
  }
}
```

**출력 제어:**
- `decision`: `"block"`으로 처리를 방지
- `reason`: 차단 시 설명
- `additionalContext`: 프롬프트에 추가되는 컨텍스트

### Stop과 SubagentStop

Claude가 응답을 완료할 때(Stop) 또는 subagent가 완료할 때(SubagentStop) 실행됩니다. 지능적인 작업 완료 확인을 위한 프롬프트 기반 평가를 지원합니다.

**추가 입력 필드:** `Stop`과 `SubagentStop` hooks 모두 JSON 입력에 `last_assistant_message` 필드를 받으며, 이는 중지 전 Claude 또는 subagent의 마지막 메시지를 포함합니다. 작업 완료를 평가하는 데 유용합니다.

**설정:**
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Evaluate if Claude completed all requested tasks.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### SubagentStart

subagent가 실행을 시작할 때 실행됩니다. matcher 입력은 에이전트 타입 이름으로, 특정 subagent 타입을 대상으로 하는 hooks를 허용합니다.

**설정:**
```json
{
  "hooks": {
    "SubagentStart": [
      {
        "matcher": "code-review",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/subagent-init.sh"
          }
        ]
      }
    ]
  }
}
```

### SessionStart

세션이 시작되거나 재개될 때 실행됩니다. 환경 변수를 유지할 수 있습니다.

**Matcher:** `startup`, `resume`, `clear`, `compact`

**특수 기능:** `CLAUDE_ENV_FILE`을 사용하여 환경 변수를 유지합니다 (`CwdChanged` 및 `FileChanged` hooks에서도 사용 가능):

```bash
#!/bin/bash
if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=development' >> "$CLAUDE_ENV_FILE"
fi
exit 0
```

### SessionEnd

세션이 종료될 때 정리 작업이나 최종 로깅을 수행합니다. 종료를 차단할 수 없습니다.

**Reason 필드 값:**
- `clear` - 사용자가 세션을 초기화함
- `logout` - 사용자가 로그아웃함
- `prompt_input_exit` - 사용자가 프롬프트 입력으로 종료함
- `other` - 기타 이유

**설정:**
```json
{
  "hooks": {
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR/.claude/hooks/session-cleanup.sh\""
          }
        ]
      }
    ]
  }
}
```

### Notification 이벤트

알림 이벤트의 업데이트된 matcher:
- `permission_prompt` - 권한 요청 알림
- `idle_prompt` - 유휴 상태 알림
- `auth_success` - 인증 성공
- `elicitation_dialog` - 사용자에게 표시되는 대화상자

### InstructionsLoaded

`CLAUDE.md`, rules 파일, 기타 instruction source가 로드된 직후 실행됩니다. 도구 실행 반응점이 아니라 "instruction이 로드되었다"는 사실에 반응하고 싶을 때 사용합니다.

대표적인 용도:

- 세션 시작 컨텍스트 주석 추가
- 어떤 instruction source가 활성화됐는지 로깅
- `session_start`, `nested_traversal`, `path_glob_match`에 따라 동작 분기

이미 로드된 instruction을 이 event 안에서 직접 바꾸는 용도로 생각하지 말고, 로드 완료 후의 반응 지점으로 보는 것이 맞습니다.

### PermissionDenied와 PostToolUseFailure

이 둘은 모두 실패 측 후처리 이벤트입니다:

- `PermissionDenied`는 사용자가 권한 프롬프트를 거부한 뒤 실행
- `PostToolUseFailure`는 도구 실행이 실패한 뒤 실행

주요 용도:

- 로깅
- 분석
- 복구 힌트 제공
- 다음 assistant turn을 위한 보조 컨텍스트 추가

`PreToolUse`나 `PermissionRequest`처럼 원래 동작을 결정하는 이벤트가 아니라, 이미 거부되었거나 실패한 뒤에 반응하는 이벤트입니다.

### TaskCreated와 TaskCompleted

이 이벤트들은 tool-level automation보다 task-system automation이 필요할 때 유용합니다.

`TaskCreated` 용도:

- task tracking
- 초기 태깅
- mailbox나 dashboard 동기화

`TaskCompleted` 용도:

- 작업 완료 알림
- cleanup
- verification prompt

이 둘은 `TaskCreate`와 `TaskUpdate`를 이미 쓰는 워크플로우와 함께 쓸 때 가장 효과적이며, tool hook의 대체재는 아닙니다.

### StopFailure

`StopFailure`는 일반적인 assistant stop이 아니라 API 또는 model failure 때문에 turn이 끝났을 때 실행됩니다.

주요 용도:

- 오류 로깅
- 복구 힌트
- 운영자 알림

`Stop`과 같은 의미로 취급하면 안 됩니다. 실패 측 이벤트이며, turn이 비정상 종료됐다고 가정해야 합니다.

### TeammateIdle

`TeammateIdle`은 team mode coordination용입니다. teammate가 충분히 오래 idle 상태여서 nudge나 policy decision이 필요할 때 실행됩니다.

주요 용도:

- mailbox reminder 전송
- block된 작업 escaltion
- teammate heartbeat 신호 수집

Agent teams를 쓰지 않는다면 이 이벤트는 설정하지 않아도 됩니다.

### ConfigChange

`ConfigChange`는 Claude Code 구성이 바뀌었을 때 실행됩니다. 다음 워크플로우 단계 전에 새 설정에 반응해야 하는 hook에 적합합니다.

대표 용도:

- 의존 로컬 state 재로드
- 변경된 설정 검증
- 필수 policy key가 제거됐을 때 경고

일반적인 startup hook이 아니라, configuration reaction point로 보는 것이 맞습니다.

### CwdChanged와 FileChanged

이 이벤트들은 현재 작업 디렉토리나 watched file에 따라 자동화가 달라져야 할 때 유용합니다.

`CwdChanged` 용도:

- 디렉토리별 setup
- environment switching
- 로컬 toolchain 선택

`FileChanged` 용도:

- test runner
- rebuild trigger
- cache invalidation

둘 다 `CLAUDE_ENV_FILE`과 함께 사용할 때, event 이후에도 환경 변경을 유지해야 하는 흐름에서 특히 유용합니다.

### WorktreeCreate와 WorktreeRemove

이 이벤트들은 git worktree workflow에 특화되어 있습니다:

- `WorktreeCreate`는 worktree 생성 전후에 실행되며 worktree별 setup 정보를 반환할 수 있습니다
- `WorktreeRemove`는 teardown 과정에서 cleanup용으로 실행됩니다

주요 용도:

- 새 worktree에서 dependency bootstrap
- 로컬 config 파일 생성
- teardown 시 임시 산출물 제거

`WorktreeCreate` 로직은 workflow의 critical path에 있을 수 있으므로 빠르고 결정적이어야 합니다.

### Elicitation와 ElicitationResult

이 이벤트들은 MCP server가 Claude Code에게 사용자 입력을 수집해 달라고 요청할 때 연결됩니다:

- `Elicitation`은 server가 입력을 요청할 때 실행
- `ElicitationResult`는 사용자가 응답한 뒤 실행

주요 용도:

- 요청된 prompt shape 검증
- 사용자 입력 정규화
- 민감한 응답의 로깅 또는 redaction

이 이벤트들은 MCP server가 단순 tool call이 아니라 반구조화 form flow처럼 동작할 때 특히 중요합니다.

## 컴포넌트 범위 Hooks

Hooks를 특정 컴포넌트(skill, agent, command)의 frontmatter에 첨부할 수 있습니다:

**SKILL.md, agent.md 또는 command.md에서:**

```yaml
---
name: secure-operations
description: Perform operations with security checks
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/check.sh"
          once: true  # Only run once per session
---
```

**컴포넌트 hooks에서 지원되는 이벤트:** `PreToolUse`, `PostToolUse`, `Stop`

이를 통해 관련 코드를 함께 유지하면서 해당 컴포넌트에서 직접 hooks를 정의할 수 있습니다.

### Subagent Frontmatter의 Hooks

subagent의 frontmatter에 `Stop` hook이 정의되면 해당 subagent에 범위가 지정된 `SubagentStop` hook으로 자동 변환됩니다. 이를 통해 메인 세션이 중지될 때가 아니라 특정 subagent가 완료될 때만 stop hook이 실행됩니다.

```yaml
---
name: code-review-agent
description: Automated code review subagent
hooks:
  Stop:
    - hooks:
        - type: prompt
          prompt: "Verify the code review is thorough and complete."
  # The above Stop hook auto-converts to SubagentStop for this subagent
---
```

## PermissionRequest 이벤트

커스텀 출력 형식으로 권한 요청을 처리합니다:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "allow|deny",
      "updatedInput": {},
      "message": "Custom message",
      "interrupt": false
    }
  }
}
```

## Hook 입력과 출력

### JSON 입력 (stdin을 통해)

모든 hooks는 stdin을 통해 JSON 입력을 받습니다:

```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/current/working/directory",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.js",
    "content": "..."
  },
  "tool_use_id": "toolu_01ABC123...",
  "agent_id": "agent-abc123",
  "agent_type": "main",
  "worktree": "/path/to/worktree"
}
```

**공통 필드:**

| 필드 | 설명 |
|-------|-------------|
| `session_id` | 고유 세션 식별자 |
| `transcript_path` | 대화 기록 파일 경로 |
| `cwd` | 현재 작업 디렉토리 |
| `hook_event_name` | hook을 트리거한 이벤트 이름 |
| `agent_id` | 이 hook을 실행하는 에이전트 식별자 |
| `agent_type` | 에이전트 유형 (`"main"`, subagent 타입 이름 등) |
| `worktree` | 에이전트가 워크트리에서 실행 중인 경우 git 워크트리 경로 |

### 종료 코드

| 종료 코드 | 의미 | 동작 |
|-----------|---------|----------|
| **0** | 성공 | 계속 진행, JSON stdout 파싱 |
| **2** | 차단 오류 | 작업 차단, stderr가 오류로 표시됨 |
| **기타** | 비차단 오류 | 계속 진행, stderr가 상세 모드에서 표시됨 |

### JSON 출력 (stdout, 종료 코드 0)

```json
{
  "continue": true,
  "stopReason": "Optional message if stopping",
  "suppressOutput": false,
  "systemMessage": "Optional warning message",
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "File is in allowed directory",
    "updatedInput": {
      "file_path": "/modified/path.js"
    }
  }
}
```

## 환경 변수

| 변수 | 사용 가능 범위 | 설명 |
|----------|-------------|-------------|
| `CLAUDE_PROJECT_DIR` | 모든 hooks | 프로젝트 루트의 절대 경로 |
| `CLAUDE_ENV_FILE` | SessionStart, CwdChanged, FileChanged | 환경 변수를 유지하기 위한 파일 경로 |
| `CLAUDE_CODE_REMOTE` | 모든 hooks | 원격 환경에서 실행 중이면 `"true"` |
| `${CLAUDE_PLUGIN_ROOT}` | Plugin hooks | plugin 디렉토리 경로 |
| `${CLAUDE_PLUGIN_DATA}` | Plugin hooks | plugin 데이터 디렉토리 경로 |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | SessionEnd hooks | SessionEnd hooks의 설정 가능한 타임아웃(밀리초, 기본값 재정의) |

## 프롬프트 기반 Hooks

`Stop` 및 `SubagentStop` 이벤트에서 LLM 기반 평가를 사용할 수 있습니다:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Review if all tasks are complete. Return your decision.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**LLM 응답 스키마:**
```json
{
  "decision": "approve",
  "reason": "All tasks completed successfully",
  "continue": false,
  "stopReason": "Task complete"
}
```

## Async Hooks

### How Async Hooks Execute

Hook를 `"async": true`로 설정하면 Claude Code는 현재 작업을 막지 않고 hook를 시작합니다. 그래서 async hooks는 현재 tool call을 지연시키지 않아야 하는 후속 작업에 적합합니다.

적합한 용도:

- 파일 변경 후 테스트 큐잉
- 알림 전송
- 로깅 / analytics
- 낮은 우선순위 cache warming

적합하지 않은 용도:

- 실행 전 차단
- 실행 전 tool input 수정
- 다음 단계 전 완료 보장

즉, async hooks는 gating이 아니라 side work에 써야 합니다.

### Configure an Async Hook

최소 패턴:

```json
{
  "hooks": {
    "FileChanged": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/run-tests.sh",
            "async": true
          }
        ]
      }
    ]
  }
}
```

### Async Hook Limitations

- Async hooks는 자신을 트리거한 작업의 precondition처럼 동작할 수 없습니다.
- 블로킹 hook보다 출력 시점이 덜 예측 가능합니다.
- 결정적인 검증이 필요하면 `PreToolUse` 또는 `PermissionRequest` 같은 blocking event를 사용해야 합니다.

## 예제

### 예제 1: Bash 명령 검증기 (PreToolUse)

**파일:** `.claude/hooks/validate-bash.py`

```python
#!/usr/bin/env python3
import json
import sys
import re

BLOCKED_PATTERNS = [
    (r"\brm\s+-rf\s+/", "Blocking dangerous rm -rf / command"),
    (r"\bsudo\s+rm", "Blocking sudo rm command"),
]

def main():
    input_data = json.load(sys.stdin)

    tool_name = input_data.get("tool_name", "")
    if tool_name != "Bash":
        sys.exit(0)

    command = input_data.get("tool_input", {}).get("command", "")

    for pattern, message in BLOCKED_PATTERNS:
        if re.search(pattern, command):
            print(message, file=sys.stderr)
            sys.exit(2)  # Exit 2 = blocking error

    sys.exit(0)

if __name__ == "__main__":
    main()
```

**설정:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate-bash.py\""
          }
        ]
      }
    ]
  }
}
```

### 예제 2: 보안 스캐너 (PostToolUse)

**파일:** `.claude/hooks/security-scan.py`

```python
#!/usr/bin/env python3
import json
import sys
import re

SECRET_PATTERNS = [
    (r"password\s*=\s*['\"][^'\"]+['\"]", "Potential hardcoded password"),
    (r"api[_-]?key\s*=\s*['\"][^'\"]+['\"]", "Potential hardcoded API key"),
]

def main():
    input_data = json.load(sys.stdin)

    tool_name = input_data.get("tool_name", "")
    if tool_name not in ["Write", "Edit"]:
        sys.exit(0)

    tool_input = input_data.get("tool_input", {})
    content = tool_input.get("content", "") or tool_input.get("new_string", "")
    file_path = tool_input.get("file_path", "")

    warnings = []
    for pattern, message in SECRET_PATTERNS:
        if re.search(pattern, content, re.IGNORECASE):
            warnings.append(message)

    if warnings:
        output = {
            "hookSpecificOutput": {
                "hookEventName": "PostToolUse",
                "additionalContext": f"Security warnings for {file_path}: " + "; ".join(warnings)
            }
        }
        print(json.dumps(output))

    sys.exit(0)

if __name__ == "__main__":
    main()
```

### 예제 3: 코드 자동 포맷 (PostToolUse)

**파일:** `.claude/hooks/format-code.sh`

```bash
#!/bin/bash

# Read JSON from stdin
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('tool_name', ''))")
FILE_PATH=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('tool_input', {}).get('file_path', ''))")

if [ "$TOOL_NAME" != "Write" ] && [ "$TOOL_NAME" != "Edit" ]; then
    exit 0
fi

# Format based on file extension
case "$FILE_PATH" in
    *.js|*.jsx|*.ts|*.tsx|*.json)
        command -v prettier &>/dev/null && prettier --write "$FILE_PATH" 2>/dev/null
        ;;
    *.py)
        command -v black &>/dev/null && black "$FILE_PATH" 2>/dev/null
        ;;
    *.go)
        command -v gofmt &>/dev/null && gofmt -w "$FILE_PATH" 2>/dev/null
        ;;
esac

exit 0
```

### 예제 4: 프롬프트 검증기 (UserPromptSubmit)

**파일:** `.claude/hooks/validate-prompt.py`

```python
#!/usr/bin/env python3
import json
import sys
import re

BLOCKED_PATTERNS = [
    (r"delete\s+(all\s+)?database", "Dangerous: database deletion"),
    (r"rm\s+-rf\s+/", "Dangerous: root deletion"),
]

def main():
    input_data = json.load(sys.stdin)
    prompt = input_data.get("user_prompt", "") or input_data.get("prompt", "")

    for pattern, message in BLOCKED_PATTERNS:
        if re.search(pattern, prompt, re.IGNORECASE):
            output = {
                "decision": "block",
                "reason": f"Blocked: {message}"
            }
            print(json.dumps(output))
            sys.exit(0)

    sys.exit(0)

if __name__ == "__main__":
    main()
```

### 예제 5: 지능형 Stop Hook (프롬프트 기반)

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Review if Claude completed all requested tasks. Check: 1) Were all files created/modified? 2) Were there unresolved errors? If incomplete, explain what's missing.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### 예제 6: 컨텍스트 사용량 추적기 (Hook 쌍)

`UserPromptSubmit`(메시지 전) 및 `Stop`(응답 후) hooks를 함께 사용하여 요청별 토큰 소비를 추적합니다.

**파일:** `.claude/hooks/context-tracker.py`

```python
#!/usr/bin/env python3
"""
Context Usage Tracker - Tracks token consumption per request.

Uses UserPromptSubmit as "pre-message" hook and Stop as "post-response" hook
to calculate the delta in token usage for each request.

Token Counting Methods:
1. Character estimation (default): ~4 chars per token, no dependencies
2. tiktoken (optional): More accurate (~90-95%), requires: pip install tiktoken
"""
import json
import os
import sys
import tempfile

# Configuration
CONTEXT_LIMIT = 128000  # Claude's context window (adjust for your model)
USE_TIKTOKEN = False    # Set True if tiktoken is installed for better accuracy


def get_state_file(session_id: str) -> str:
    """Get temp file path for storing pre-message token count, isolated by session."""
    return os.path.join(tempfile.gettempdir(), f"claude-context-{session_id}.json")


def count_tokens(text: str) -> int:
    """
    Count tokens in text.

    Uses tiktoken with p50k_base encoding if available (~90-95% accuracy),
    otherwise falls back to character estimation (~80-90% accuracy).
    """
    if USE_TIKTOKEN:
        try:
            import tiktoken
            enc = tiktoken.get_encoding("p50k_base")
            return len(enc.encode(text))
        except ImportError:
            pass  # Fall back to estimation

    # Character-based estimation: ~4 characters per token for English
    return len(text) // 4


def read_transcript(transcript_path: str) -> str:
    """Read and concatenate all content from transcript file."""
    if not transcript_path or not os.path.exists(transcript_path):
        return ""

    content = []
    with open(transcript_path, "r") as f:
        for line in f:
            try:
                entry = json.loads(line.strip())
                # Extract text content from various message formats
                if "message" in entry:
                    msg = entry["message"]
                    if isinstance(msg.get("content"), str):
                        content.append(msg["content"])
                    elif isinstance(msg.get("content"), list):
                        for block in msg["content"]:
                            if isinstance(block, dict) and block.get("type") == "text":
                                content.append(block.get("text", ""))
            except json.JSONDecodeError:
                continue

    return "\n".join(content)


def handle_user_prompt_submit(data: dict) -> None:
    """Pre-message hook: Save current token count before request."""
    session_id = data.get("session_id", "unknown")
    transcript_path = data.get("transcript_path", "")

    transcript_content = read_transcript(transcript_path)
    current_tokens = count_tokens(transcript_content)

    # Save to temp file for later comparison
    state_file = get_state_file(session_id)
    with open(state_file, "w") as f:
        json.dump({"pre_tokens": current_tokens}, f)


def handle_stop(data: dict) -> None:
    """Post-response hook: Calculate and report token delta."""
    session_id = data.get("session_id", "unknown")
    transcript_path = data.get("transcript_path", "")

    transcript_content = read_transcript(transcript_path)
    current_tokens = count_tokens(transcript_content)

    # Load pre-message count
    state_file = get_state_file(session_id)
    pre_tokens = 0
    if os.path.exists(state_file):
        try:
            with open(state_file, "r") as f:
                state = json.load(f)
                pre_tokens = state.get("pre_tokens", 0)
        except (json.JSONDecodeError, IOError):
            pass

    # Calculate delta
    delta_tokens = current_tokens - pre_tokens
    remaining = CONTEXT_LIMIT - current_tokens
    percentage = (current_tokens / CONTEXT_LIMIT) * 100

    # Report usage
    method = "tiktoken" if USE_TIKTOKEN else "estimated"
    print(f"Context ({method}): ~{current_tokens:,} tokens ({percentage:.1f}% used, ~{remaining:,} remaining)", file=sys.stderr)
    if delta_tokens > 0:
        print(f"This request: ~{delta_tokens:,} tokens", file=sys.stderr)


def main():
    data = json.load(sys.stdin)
    event = data.get("hook_event_name", "")

    if event == "UserPromptSubmit":
        handle_user_prompt_submit(data)
    elif event == "Stop":
        handle_stop(data)

    sys.exit(0)


if __name__ == "__main__":
    main()
```

**설정:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/context-tracker.py\""
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/context-tracker.py\""
          }
        ]
      }
    ]
  }
}
```

**작동 원리:**
1. `UserPromptSubmit`이 프롬프트 처리 전에 발동 - 현재 토큰 수를 저장
2. `Stop`이 Claude 응답 후 발동 - 델타를 계산하고 사용량 보고
3. 각 세션은 임시 파일명의 `session_id`를 통해 격리됨

**토큰 계산 방법:**

| 방법 | 정확도 | 의존성 | 속도 |
|--------|----------|--------------|-------|
| 문자 추정 | ~80-90% | 없음 | <1ms |
| tiktoken (p50k_base) | ~90-95% | `pip install tiktoken` | <10ms |

> **참고:** Anthropic은 공식 오프라인 토크나이저를 출시하지 않았습니다. 두 방법 모두 근사치입니다. 대화 기록에는 사용자 프롬프트, Claude의 응답, 도구 출력이 포함되지만, 시스템 프롬프트나 내부 컨텍스트는 포함되지 않습니다.

### 예제 7: 파일 변경 후 테스트 실행 (Async)

현재 상호작용을 막지 않고 백그라운드에서 테스트를 시작하고 싶을 때 `FileChanged`를 사용합니다.

**파일:** `.claude/hooks/run-tests.sh`

```bash
#!/bin/bash
set -euo pipefail

INPUT=$(cat)
CHANGED_PATH=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('file_path', ''))")

case "$CHANGED_PATH" in
  *.py)
    pytest -q
    ;;
  *.ts|*.tsx|*.js|*.jsx)
    npm test -- --runInBand
    ;;
  *)
    exit 0
    ;;
esac
```

**설정:**

```json
{
  "hooks": {
    "FileChanged": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/run-tests.sh",
            "async": true
          }
        ]
      }
    ]
  }
}
```

**왜 async가 맞는가:**

- 테스트가 edit보다 오래 걸릴 수 있음
- 편집 흐름은 계속 반응성을 유지해야 함
- 실패는 이후 로그, 알림, 후속 hook로 surface할 수 있음

### 예제 8: 자동 모드 권한 시드 설정 (일회성 설정 스크립트)

`~/.claude/settings.json`에 Claude Code의 자동 모드 기준선에 해당하는 약 67개의 안전한 권한 규칙을 시드하는 일회성 설정 스크립트입니다 -- hook 없이, 향후 선택을 기억하지 않습니다. 한 번 실행하면 됩니다; 재실행해도 안전합니다(이미 있는 규칙은 건너뜀).

**파일:** `09-advanced-features/setup-auto-mode-permissions.py`

```bash
# Preview what would be added
python3 09-advanced-features/setup-auto-mode-permissions.py --dry-run

# Apply
python3 09-advanced-features/setup-auto-mode-permissions.py
```

**추가되는 항목:**

| 카테고리 | 예시 |
|----------|---------|
| 내장 도구 | `Read(*)`, `Edit(*)`, `Write(*)`, `Glob(*)`, `Grep(*)`, `Agent(*)`, `WebSearch(*)` |
| Git 읽기 | `Bash(git status:*)`, `Bash(git log:*)`, `Bash(git diff:*)` |
| Git 쓰기 (로컬) | `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git checkout:*)` |
| 패키지 매니저 | `Bash(npm install:*)`, `Bash(pip install:*)`, `Bash(cargo build:*)` |
| 빌드 및 테스트 | `Bash(make:*)`, `Bash(pytest:*)`, `Bash(go test:*)` |
| 일반 셸 | `Bash(ls:*)`, `Bash(cat:*)`, `Bash(find:*)`, `Bash(cp:*)`, `Bash(mv:*)` |
| GitHub CLI | `Bash(gh pr view:*)`, `Bash(gh pr create:*)`, `Bash(gh issue list:*)` |

**의도적으로 제외된 항목** (이 스크립트에서 절대 추가하지 않는 항목):
- `rm -rf`, `sudo`, force push, `git reset --hard`
- `DROP TABLE`, `kubectl delete`, `terraform destroy`
- `npm publish`, `curl | bash`, 프로덕션 배포

## Plugin Hooks

Plugin은 `hooks/hooks.json` 파일에 hooks를 포함할 수 있습니다:

**파일:** `hooks/hooks.json`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/validate.sh"
          }
        ]
      }
    ]
  }
}
```

**Plugin Hooks의 환경 변수:**
- `${CLAUDE_PLUGIN_ROOT}` - plugin 디렉토리 경로
- `${CLAUDE_PLUGIN_DATA}` - plugin 데이터 디렉토리 경로

이를 통해 plugin에 커스텀 검증 및 자동화 hooks를 포함할 수 있습니다.

## MCP 도구 Hooks

MCP 도구는 `mcp__<server>__<tool>` 패턴을 따릅니다:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__memory__.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '{\"systemMessage\": \"Memory operation logged\"}'"
          }
        ]
      }
    ]
  }
}
```

## 보안 고려사항

### 면책 조항

**사용에 따른 위험은 본인이 부담합니다**: Hooks는 임의의 셸 명령을 실행합니다. 다음에 대한 책임은 전적으로 사용자에게 있습니다:
- 구성하는 명령
- 파일 접근/수정 권한
- 잠재적 데이터 손실이나 시스템 손상
- 프로덕션 사용 전 안전한 환경에서 hooks 테스트

### 보안 참고사항

- **작업공간 신뢰 필요:** `statusLine` 및 `fileSuggestion` hook 출력 명령은 이제 작업공간 신뢰 수락이 있어야 적용됩니다.
- **HTTP hooks와 환경 변수:** HTTP hooks는 URL에서 환경 변수 보간을 사용하려면 명시적 `allowedEnvVars` 목록이 필요합니다. 이는 민감한 환경 변수가 원격 엔드포인트로 실수로 유출되는 것을 방지합니다.
- **관리 설정 계층:** `disableAllHooks` 설정은 이제 관리 설정 계층을 따릅니다. 즉, 조직 수준 설정이 개별 사용자가 재정의할 수 없는 hook 비활성화를 강제할 수 있습니다.

### 모범 사례

| 해야 할 것 | 하지 말아야 할 것 |
|-----|-------|
| 모든 입력을 검증하고 정제 | 입력 데이터를 맹목적으로 신뢰 |
| 셸 변수를 따옴표로 감싸기: `"$VAR"` | 따옴표 없이 사용: `$VAR` |
| 경로 탐색(`..`)을 차단 | 임의의 경로 허용 |
| `$CLAUDE_PROJECT_DIR`로 절대 경로 사용 | 경로를 하드코딩 |
| 민감한 파일(`.env`, `.git/`, 키) 건너뛰기 | 모든 파일 처리 |
| hooks를 먼저 독립적으로 테스트 | 테스트하지 않은 hooks 배포 |
| HTTP hooks에 명시적 `allowedEnvVars` 사용 | 웹훅에 모든 환경 변수 노출 |

## 디버깅

### 디버그 모드 활성화

상세한 hook 로그를 보려면 디버그 플래그로 Claude를 실행합니다:

```bash
claude --debug
```

### 상세 모드

Claude Code에서 `Ctrl+O`를 사용하여 상세 모드를 활성화하고 hook 실행 진행 상황을 확인합니다.

### Hooks 독립적으로 테스트

```bash
# Test with sample JSON input
echo '{"tool_name": "Bash", "tool_input": {"command": "ls -la"}}' | python3 .claude/hooks/validate-bash.py

# Check exit code
echo $?
```

## 전체 설정 예제

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate-bash.py\"",
            "timeout": 10
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR/.claude/hooks/format-code.sh\"",
            "timeout": 30
          },
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/security-scan.py\"",
            "timeout": 10
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate-prompt.py\""
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR/.claude/hooks/session-init.sh\""
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Verify all tasks are complete before stopping.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

## Hook 실행 세부사항

| 항목 | 동작 |
|--------|----------|
| **타임아웃** | 기본 60초, 명령별 설정 가능 |
| **병렬화** | 매칭되는 모든 hooks가 병렬로 실행 |
| **중복 제거** | 동일한 hook 명령은 중복 제거됨 |
| **환경** | 현재 디렉토리와 Claude Code 환경에서 실행 |
| **Async hooks** | 독립적으로 계속 실행되며, gating control flow에는 부적합 |

## 문제 해결

### Hook이 실행되지 않음
- JSON 설정 구문이 올바른지 확인
- matcher 패턴이 도구 이름과 일치하는지 확인
- 스크립트가 존재하고 실행 가능한지 확인: `chmod +x script.sh`
- `claude --debug`로 hook 실행 로그 확인
- hook이 stdin에서 JSON을 읽는지 확인 (명령 인수가 아님)

### Hook이 예기치 않게 차단함
- 샘플 JSON으로 hook 테스트: `echo '{"tool_name": "Write", ...}' | ./hook.py`
- 종료 코드 확인: 허용은 0, 차단은 2
- stderr 출력 확인 (종료 코드 2에서 표시됨)

### JSON 파싱 오류
- 항상 stdin에서 읽기 (명령 인수가 아님)
- 적절한 JSON 파싱 사용 (문자열 조작이 아님)
- 누락된 필드를 우아하게 처리

## 설치

### 1단계: Hooks 디렉토리 생성
```bash
mkdir -p ~/.claude/hooks
```

### 2단계: 예제 Hooks 복사
```bash
cp 06-hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh
```

### 3단계: 설정에서 구성
위에 표시된 hook 설정으로 `~/.claude/settings.json` 또는 `.claude/settings.json`을 편집합니다.

## 관련 개념

- **[Checkpoints와 되감기](../08-checkpoints/)** - 대화 상태 저장 및 복원
- **[Slash Commands](../01-slash-commands/)** - 커스텀 slash command 생성
- **[Skills](../03-skills/)** - 재사용 가능한 자율 기능
- **[Subagents](../04-subagents/)** - 위임된 작업 실행
- **[Plugins](../07-plugins/)** - 번들형 확장 패키지
- **[고급 기능](../09-advanced-features/)** - 고급 Claude Code 기능 탐색

## 추가 리소스

- **[공식 Hooks 문서](https://code.claude.com/docs/ko/hooks)** - 전체 hooks 참조
- **[CLI 참조](https://code.claude.com/docs/ko/cli-reference)** - 명령줄 인터페이스 문서
- **[메모리 가이드](../02-memory/)** - 영구 컨텍스트 설정

---
