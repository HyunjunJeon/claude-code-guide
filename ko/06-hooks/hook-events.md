# Hook 이벤트

Claude Code는 27개의 hook 이벤트를 지원합니다. 이 페이지는 모든 이벤트의 트리거 시점·matcher·차단 가능 여부를 한눈에 정리한 표와, 자주 쓰는 이벤트별 상세 설정을 함께 제공합니다.

## 이벤트 한눈에 보기

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

## PreToolUse

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

## PostToolUse

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

## UserPromptSubmit

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

## Stop과 SubagentStop

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

## SubagentStart

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

## SessionStart

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

## SessionEnd

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

## Notification 이벤트

알림 이벤트의 업데이트된 matcher:

- `permission_prompt` - 권한 요청 알림
- `idle_prompt` - 유휴 상태 알림
- `auth_success` - 인증 성공
- `elicitation_dialog` - 사용자에게 표시되는 대화상자

## InstructionsLoaded

`CLAUDE.md`, rules 파일, 기타 instruction source가 로드된 직후 실행됩니다. 도구 실행 반응점이 아니라 "instruction이 로드되었다"는 사실에 반응하고 싶을 때 사용합니다.

대표적인 용도:

- 세션 시작 컨텍스트 주석 추가
- 어떤 instruction source가 활성화됐는지 로깅
- `session_start`, `nested_traversal`, `path_glob_match`에 따라 동작 분기

이미 로드된 instruction을 이 event 안에서 직접 바꾸는 용도로 생각하지 말고, 로드 완료 후의 반응 지점으로 보는 것이 맞습니다.

## PermissionDenied와 PostToolUseFailure

이 둘은 모두 실패 측 후처리 이벤트입니다:

- `PermissionDenied`는 사용자가 권한 프롬프트를 거부한 뒤 실행
- `PostToolUseFailure`는 도구 실행이 실패한 뒤 실행

주요 용도:

- 로깅
- 분석
- 복구 힌트 제공
- 다음 assistant turn을 위한 보조 컨텍스트 추가

`PreToolUse`나 `PermissionRequest`처럼 원래 동작을 결정하는 이벤트가 아니라, 이미 거부되었거나 실패한 뒤에 반응하는 이벤트입니다.

## TaskCreated와 TaskCompleted

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

## StopFailure

`StopFailure`는 일반적인 assistant stop이 아니라 API 또는 model failure 때문에 turn이 끝났을 때 실행됩니다.

주요 용도:

- 오류 로깅
- 복구 힌트
- 운영자 알림

`Stop`과 같은 의미로 취급하면 안 됩니다. 실패 측 이벤트이며, turn이 비정상 종료됐다고 가정해야 합니다.

## TeammateIdle

`TeammateIdle`은 team mode coordination용입니다. teammate가 충분히 오래 idle 상태여서 nudge나 policy decision이 필요할 때 실행됩니다.

주요 용도:

- mailbox reminder 전송
- block된 작업 escaltion
- teammate heartbeat 신호 수집

Agent teams를 쓰지 않는다면 이 이벤트는 설정하지 않아도 됩니다.

## ConfigChange

`ConfigChange`는 Claude Code 구성이 바뀌었을 때 실행됩니다. 다음 워크플로우 단계 전에 새 설정에 반응해야 하는 hook에 적합합니다.

대표 용도:

- 의존 로컬 state 재로드
- 변경된 설정 검증
- 필수 policy key가 제거됐을 때 경고

일반적인 startup hook이 아니라, configuration reaction point로 보는 것이 맞습니다.

## CwdChanged와 FileChanged

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

## WorktreeCreate와 WorktreeRemove

이 이벤트들은 git worktree workflow에 특화되어 있습니다:

- `WorktreeCreate`는 worktree 생성 전후에 실행되며 worktree별 setup 정보를 반환할 수 있습니다
- `WorktreeRemove`는 teardown 과정에서 cleanup용으로 실행됩니다

주요 용도:

- 새 worktree에서 dependency bootstrap
- 로컬 config 파일 생성
- teardown 시 임시 산출물 제거

`WorktreeCreate` 로직은 workflow의 critical path에 있을 수 있으므로 빠르고 결정적이어야 합니다.

## Elicitation와 ElicitationResult

이 이벤트들은 MCP server가 Claude Code에게 사용자 입력을 수집해 달라고 요청할 때 연결됩니다:

- `Elicitation`은 server가 입력을 요청할 때 실행
- `ElicitationResult`는 사용자가 응답한 뒤 실행

주요 용도:

- 요청된 prompt shape 검증
- 사용자 입력 정규화
- 민감한 응답의 로깅 또는 redaction

이 이벤트들은 MCP server가 단순 tool call이 아니라 반구조화 form flow처럼 동작할 때 특히 중요합니다.
