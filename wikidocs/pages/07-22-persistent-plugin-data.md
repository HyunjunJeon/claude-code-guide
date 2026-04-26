이 문서는 plugin이 세션 간에 유지되는 영구 상태(캐시, 데이터베이스, 사용 통계 등)를 어디에 저장해야 하는지 설명합니다. plugin이 hook이나 스크립트에서 파일을 기록할 필요가 있을 때 어디에 두어야 안전한지 결정할 때 참고하세요. `${CLAUDE_PLUGIN_DATA}` 환경 변수를 사용하면 plugin 제거 시까지 데이터가 보존되며, 다른 plugin과 충돌하지 않습니다.

Plugin은 `${CLAUDE_PLUGIN_DATA}` 환경 변수를 통해 영구 상태 디렉토리에 접근할 수 있습니다. 이 디렉토리는 plugin별로 고유하며 세션 간에 유지되므로 캐시, 데이터베이스 및 기타 영구 상태에 적합합니다:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "command": "node ${CLAUDE_PLUGIN_DATA}/track-usage.js"
      }
    ]
  }
}
```

이 디렉토리는 plugin 설치 시 자동으로 생성됩니다. 여기에 저장된 파일은 plugin이 제거될 때까지 유지됩니다.
