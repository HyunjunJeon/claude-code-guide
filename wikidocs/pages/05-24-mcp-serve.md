이 페이지는 Claude Code 자체를 MCP 서버로 띄워 다른 도구·에디터·또는 다른 Claude 인스턴스가 Claude의 기능을 호출할 수 있게 하는 `claude mcp serve` 모드를 다룬다. multi-agent 워크플로우(한 Claude가 다른 Claude를 조율)를 만들 때 시작점이다. 일반 MCP 서버 등록 방식은 mcp-installation.md, subagent 단위 격리는 mcp-subagent-scope.md에서 본다.

Claude Code 자체가 다른 애플리케이션을 위한 MCP 서버로 동작할 수 있습니다. 이를 통해 외부 도구, 편집기 및 자동화 시스템이 표준 MCP 프로토콜을 통해 Claude의 기능을 활용할 수 있습니다.

```bash
# Start Claude Code as an MCP server on stdio
claude mcp serve
```

다른 애플리케이션은 일반 stdio 기반 MCP 서버처럼 이 서버에 연결할 수 있습니다. 예를 들어, 다른 Claude Code 인스턴스에서 Claude Code를 MCP 서버로 추가하려면:

```bash
claude mcp add --transport stdio claude-agent -- claude mcp serve
```

이는 하나의 Claude 인스턴스가 다른 인스턴스를 조율하는 다중 agent 워크플로우를 구축하는 데 유용합니다.
