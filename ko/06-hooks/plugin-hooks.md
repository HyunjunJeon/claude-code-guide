# Plugin Hooks

Plugin은 자체 hook 정의를 번들로 묶어 배포할 수 있습니다. plugin 패키지의 `hooks/hooks.json`에 hook을 선언하면 plugin이 활성화될 때 함께 등록됩니다.

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
