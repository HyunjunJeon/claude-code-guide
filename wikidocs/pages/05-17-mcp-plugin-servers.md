이 페이지는 plugin이 자체 MCP 서버를 번들해 설치만으로 자동 활성화되도록 하는 방법(`.mcp.json` 또는 `plugin.json` 인라인)을 정리한다. plugin을 만드는 입장에서 MCP 도구까지 함께 배포하고 싶을 때 본다. plugin 자체에 대한 더 큰 그림은 07. Plugins, 일반적인 MCP 서버 등록 방식은 mcp-installation.md에서 다룬다.

Plugin은 자체 MCP 서버를 번들할 수 있어, plugin이 설치되면 자동으로 사용 가능합니다. Plugin 제공 MCP 서버는 두 가지 방법으로 정의할 수 있습니다:

1. **독립형 `.mcp.json`** -- plugin 루트 디렉토리에 `.mcp.json` 파일 배치
2. **`plugin.json` 내 인라인** -- plugin 매니페스트 내에서 직접 MCP 서버 정의

plugin의 설치 디렉토리에 상대적인 경로를 참조하기 위해 `${CLAUDE_PLUGIN_ROOT}` 변수를 사용합니다:

```json
{
  "mcpServers": {
    "plugin-tools": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/dist/mcp-server.js"],
      "env": {
        "CONFIG_PATH": "${CLAUDE_PLUGIN_ROOT}/config.json"
      }
    }
  }
}
```
