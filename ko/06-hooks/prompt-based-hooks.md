# 프롬프트 기반 Hooks

`Stop` 및 `SubagentStop` 이벤트에서 LLM에게 작업이 충분히 끝났는지 평가하게 만들 수 있습니다. command hook과 달리 셸 스크립트가 아닌 자연어 프롬프트가 hook 본문이 됩니다.

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
