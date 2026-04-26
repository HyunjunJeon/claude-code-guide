이 페이지는 MCP 서버를 추가·조회·제거·import하는 일상 운영 명령(`claude mcp add/list/get/remove/...`)을 한 곳에 모아 둔다. 처음 설치보다는 이미 등록된 서버를 손볼 때 빠르게 들춰 보는 레퍼런스다. 전송 옵션이 더 궁금하면 mcp-installation.md, JSON 설정 자체는 mcp-scopes.md에서 본다.

## MCP 서버 추가

```bash
# Add HTTP-based server
claude mcp add --transport http github https://api.github.com/mcp

# Add local stdio server
claude mcp add --transport stdio database -- npx @company/db-server

# List all MCP servers
claude mcp list

# Get details on specific server
claude mcp get github

# Remove an MCP server
claude mcp remove github

# Reset project-specific approval choices
claude mcp reset-project-choices

# Import from Claude Desktop
claude mcp add-from-claude-desktop
```
