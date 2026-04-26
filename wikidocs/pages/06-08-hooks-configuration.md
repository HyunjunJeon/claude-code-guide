Hook은 여러 위치의 settings 파일과 컴포넌트 frontmatter에 정의할 수 있습니다. 이 페이지는 어디에 정의할 수 있는지, 어떤 필드가 있는지, 그리고 matcher 패턴이 어떻게 작동하는지 정리합니다.

Hooks는 특정 구조의 설정 파일에서 구성합니다:

- `~/.claude/settings.json` - 사용자 설정 (모든 프로젝트)
- `.claude/settings.json` - 프로젝트 설정 (공유 가능, 커밋됨)
- `.claude/settings.local.json` - 로컬 프로젝트 설정 (커밋되지 않음)
- Managed policy - 조직 전체 설정
- Plugin `hooks/hooks.json` - plugin 범위 hooks
- Skill/Agent frontmatter - 컴포넌트 수명 주기 hooks

## 기본 설정 구조

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
| `matcher` | 도구 이름과 매칭하는 패턴 (대소문자 구분) | `"Write"`, `"Edit&#124;Write"`, `"*"` |
| `hooks` | hook 정의 배열 | `[{ "type": "command", ... }]` |
| `type` | Hook 타입: `"command"` (bash), `"prompt"` (LLM), `"http"` (웹훅), 또는 `"agent"` (subagent) | `"command"` |
| `command` | 실행할 셸 명령 | `"$CLAUDE_PROJECT_DIR/.claude/hooks/format.sh"` |
| `timeout` | 선택적 타임아웃(초 단위, 기본값 60) | `30` |
| `once` | `true`이면 세션당 한 번만 hook 실행 | `true` |
| `if` | 조건부 실행을 위한 권한 규칙 필터 (v2.1.85+) | `"Bash(git *)"` |
| `async` | hook을 비동기적으로 실행 (논블로킹) | `true` |
| `shell` | command hook에 사용할 셸: `bash` (기본값) 또는 `powershell` | `"bash"` |

## Matcher 패턴

| 패턴 | 설명 | 예시 |
|---------|-------------|---------|
| 정확한 문자열 | 특정 도구와 매칭 | `"Write"` |
| 정규식 패턴 | 여러 도구와 매칭 | `"Edit&#124;Write"` |
| 와일드카드 | 모든 도구와 매칭 | `"*"` 또는 `""` |
| MCP 도구 | 서버 및 도구 패턴 | `"mcp__memory__.*"` |

**InstructionsLoaded matcher 값:**

| Matcher 값 | 설명 |
|---------------|-------------|
| `session_start` | 세션 시작 시 로드된 지침 |
| `nested_traversal` | 중첩 디렉토리 탐색 중 로드된 지침 |
| `path_glob_match` | 경로 glob 패턴 매칭으로 로드된 지침 |
