# Plugin 설정

이 문서는 plugin이 자체 `settings.json`을 포함해 기본 설정값을 제공하는 방법을 설명합니다. plugin이 특정 메인 스레드 에이전트나 서브에이전트 상태 표시줄을 기본값으로 적용해야 할 때 참고하세요. 사용자는 자신의 프로젝트나 사용자 설정에서 이 기본값을 재정의할 수 있으므로 plugin은 합리적인 기본값을 제안하는 역할만 합니다.

Plugin은 기본 설정을 제공하기 위해 `settings.json` 파일을 포함할 수 있습니다. 현재 `agent` 및 `subagentStatusLine` 키를 지원하며, `agent` 키는 plugin의 메인 스레드 에이전트를 설정합니다:

```json
{
  "agent": "agents/specialist-1.md"
}
```

Plugin이 `settings.json`을 포함하면 설치 시 기본값이 적용됩니다. 사용자는 자신의 프로젝트 또는 사용자 설정에서 이러한 설정을 재정의할 수 있습니다.
