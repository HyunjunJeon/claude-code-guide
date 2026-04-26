이 문서는 plugin이 배포하는 서브에이전트가 호스트 환경에 영향을 주지 못하도록 막는 frontmatter 키 제한 사항(`hooks`, `mcpServers`, `permissionMode` 금지)을 설명합니다. plugin을 작성하거나 검토할 때 어떤 권한 에스컬레이션이 차단되는지 확인할 때 참고하세요. 이 제한은 plugin이 선언된 범위를 벗어난 동작을 하지 못하도록 강제하는 안전장치입니다.

Plugin subagent는 제한된 샌드박스에서 실행됩니다. 다음 frontmatter 키는 plugin subagent 정의에서 **허용되지 않습니다**:

- `hooks` -- subagent가 이벤트 핸들러를 등록할 수 없음
- `mcpServers` -- subagent가 MCP 서버를 설정할 수 없음
- `permissionMode` -- subagent가 권한 모델을 재정의할 수 없음

이를 통해 plugin이 선언된 범위를 넘어 권한을 에스컬레이션하거나 호스트 환경을 수정할 수 없도록 합니다.

> **보안 제한**: Plugin을 통해 배포된 agent는 보안상의 이유로 `hooks`, `mcpServers`, `permissionMode` 필드를 사용할 수 없습니다.
