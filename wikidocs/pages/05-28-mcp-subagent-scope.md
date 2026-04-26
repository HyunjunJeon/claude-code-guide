이 페이지는 agent frontmatter의 `mcpServers:` 키로 특정 subagent에게만 MCP 서버를 노출하는 방법을 다룬다. 한두 개 agent만 특정 외부 도구가 필요할 때 전체 프로젝트에 굳이 노출하지 않으려는 격리 전략으로 본다. subagent 자체 설계는 [04. Subagents](https://wikidocs.net/345414), 프로젝트/사용자 범위와의 비교는 mcp-scopes.md에서 다룬다.

MCP 서버는 `mcpServers:` 키를 사용하여 agent frontmatter 내에서 인라인으로 정의할 수 있으며, 전체 프로젝트가 아닌 특정 subagent로 범위를 제한합니다. 이는 워크플로우의 다른 agent가 필요로 하지 않는 특정 MCP 서버에 agent가 접근해야 할 때 유용합니다.

```yaml
---
mcpServers:
  my-tool:
    type: http
    url: https://my-tool.example.com/mcp
---

You are an agent with access to my-tool for specialized operations.
```

Subagent 범위 MCP 서버는 해당 agent의 실행 컨텍스트 내에서만 사용 가능하며 부모나 형제 agent와 공유되지 않습니다.
