# Plugin Subagent 보안

이 문서는 plugin이 제공하는 subagent에 적용되는 보안 제한 세 가지를 설명합니다.
plugin을 만들거나 외부 plugin을 도입할 때 "왜 이 frontmatter 필드가 무시되지?"라는 의문이 생기면 봅니다.
`hooks`·`mcpServers`·`permissionMode`가 차단되어 권한 상승이나 임의 명령 실행을 막습니다.

Plugin 제공 subagent는 보안을 위해 frontmatter 기능이 제한됩니다. 다음 필드는 plugin subagent 정의에서 **허용되지 않습니다**:

- `hooks` - 라이프사이클 hook 정의 불가
- `mcpServers` - MCP 서버 구성 불가
- `permissionMode` - 권한 설정 재정의 불가

이를 통해 plugin이 subagent hook을 통해 권한을 상승시키거나 임의의 명령을 실행하는 것을 방지합니다.

> **보안 제한**: Plugin을 통해 배포된 agent는 `hooks`, `mcpServers`, `permissionMode` 필드를 사용할 수 없습니다. 보안상의 이유로 제한됩니다.
