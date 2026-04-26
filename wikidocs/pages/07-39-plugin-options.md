이 문서는 plugin이 사용자에게 받아야 할 설정값(API 키, 리전 등)을 매니페스트의 `userConfig`로 선언하는 방법을 설명합니다. 사용자가 설치 후 직접 입력해야 하는 항목을 plugin 작성 단계에서 명시할 때 참고하세요. `sensitive: true`로 표시한 값은 일반 텍스트 설정 파일이 아니라 시스템 키체인에 저장되어 비밀 정보 노출 위험을 줄입니다.

Plugin은 매니페스트의 `userConfig`를 통해 사용자 설정 가능한 옵션을 선언할 수 있습니다. `sensitive: true`로 표시된 값은 일반 텍스트 설정 파일이 아닌 시스템 키체인에 저장됩니다:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "userConfig": {
    "apiKey": {
      "description": "API key for the service",
      "sensitive": true
    },
    "region": {
      "description": "Deployment region",
      "default": "us-east-1"
    }
  }
}
```
