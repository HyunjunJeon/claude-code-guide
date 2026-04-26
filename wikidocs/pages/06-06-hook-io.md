모든 hook은 stdin으로 JSON을 받고, stdout JSON·종료 코드·stderr 메시지를 통해 결과를 돌려줍니다. 이 페이지는 입력 스키마, 종료 코드 의미, 출력 JSON 구조를 정리합니다.

## JSON 입력 (stdin을 통해)

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

## 종료 코드

| 종료 코드 | 의미 | 동작 |
|-----------|---------|----------|
| **0** | 성공 | 계속 진행, JSON stdout 파싱 |
| **2** | 차단 오류 | 작업 차단, stderr가 오류로 표시됨 |
| **기타** | 비차단 오류 | 계속 진행, stderr가 상세 모드에서 표시됨 |

## JSON 출력 (stdout, 종료 코드 0)

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
