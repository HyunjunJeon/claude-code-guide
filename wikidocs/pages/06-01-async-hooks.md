`"async": true` 설정을 붙이면 hook가 현재 작업을 막지 않고 백그라운드에서 실행됩니다. 비결정적이지만 부수적인 작업(테스트 큐잉, 알림, 로깅)에 적합하며, gating에는 쓸 수 없습니다.

## How Async Hooks Execute

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

## Configure an Async Hook

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

## Async Hook Limitations

- Async hooks는 자신을 트리거한 작업의 precondition처럼 동작할 수 없습니다.
- 블로킹 hook보다 출력 시점이 덜 예측 가능합니다.
- 결정적인 검증이 필요하면 `PreToolUse` 또는 `PermissionRequest` 같은 blocking event를 사용해야 합니다.
