`PermissionRequest`는 권한 대화상자가 사용자에게 노출되기 직전에 발동됩니다. hook이 직접 결정을 반환하면 대화상자 자체를 우회하거나 자동 승인·거부 정책을 코드로 표현할 수 있습니다.

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
