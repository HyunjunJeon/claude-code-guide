# 설정을 통한 인라인 Plugin (`source: 'settings'`) (v2.1.80+)

이 문서는 별도의 외부 마켓플레이스 저장소 없이 설정 파일 안에 plugin 정의를 직접 인라인으로 포함하는 방법을 설명합니다. 빠른 프로토타이핑이나 단일 프로젝트 내부에서만 쓰는 plugin을 정의할 때 참고하세요. `source: 'settings'` 필드를 사용하면 마켓플레이스 인프라를 세팅하지 않고도 plugin을 즉시 사용할 수 있습니다.

Plugin은 `source: 'settings'` 필드를 사용하여 설정 파일에 마켓플레이스 항목으로 인라인 정의할 수 있습니다. 이를 통해 별도의 저장소나 마켓플레이스 없이 plugin 정의를 직접 포함할 수 있습니다:

```json
{
  "pluginMarketplaces": [
    {
      "name": "inline-tools",
      "source": "settings",
      "plugins": [
        {
          "name": "quick-lint",
          "source": "./local-plugins/quick-lint"
        }
      ]
    }
  ]
}
```
