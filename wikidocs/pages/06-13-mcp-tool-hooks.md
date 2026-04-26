MCP 서버가 노출하는 도구도 일반 도구와 동일한 hook 인프라를 사용합니다. matcher 패턴만 `mcp__<server>__<tool>` 규칙을 따르면 됩니다.

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
