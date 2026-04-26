이 페이지는 프롬프트에서 `@server-name:protocol://resource/path` 형식으로 MCP 리소스를 인라인 컨텍스트로 끌어오는 방법을 설명한다. 도구 호출까지 가지 않고 단순 데이터를 prompt 안에 즉시 끼워 넣고 싶을 때 가장 빠른 방법이다. 일반 도구 호출 흐름은 mcp-architecture.md, tool surface가 클 때의 최적화는 mcp-tool-search.md에서 다룬다.

`@` 멘션 구문을 사용하여 프롬프트에서 MCP 리소스를 직접 참조할 수 있습니다:

```text
@server-name:protocol://resource/path
```

예를 들어, 특정 데이터베이스 리소스를 참조하려면:

```text
@database:postgres://mydb/users
```

이를 통해 Claude가 MCP 리소스 콘텐츠를 가져와 대화 컨텍스트의 일부로 인라인에 포함할 수 있습니다.
