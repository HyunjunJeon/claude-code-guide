이 페이지는 MCP 설정을 저장하는 세 가지 범위(Local, Project, User)와 각 범위의 위치·공유 대상·승인 동작을 한 번에 정리한다. 어디에 저장해야 팀과 공유될지, 어디는 본인만 쓸지를 결정할 때 본다. 같은 서버가 여러 범위에 정의됐을 때의 우선순위는 [mcp-server-deduplication.md](https://wikidocs.net/345453), 등록 명령은 [mcp-installation.md](https://wikidocs.net/345448)에서 다룬다.

MCP 구성은 서로 다른 공유 수준의 범위에 저장할 수 있습니다:

| 범위 | 위치 | 설명 | 공유 대상 | 승인 필요 |
|-------|----------|-------------|-------------|------------------|
| **Local** (기본값) | `~/.claude.json` (프로젝트 경로 아래) | 현재 사용자, 현재 프로젝트 전용 (이전 버전에서는 `project`로 불림) | 본인만 | 아니오 |
| **Project** | `.mcp.json` | git 저장소에 체크인됨 | 팀원 | 예 (최초 사용 시) |
| **User** | `~/.claude.json` | 모든 프로젝트에서 사용 가능 (이전 버전에서는 `global`로 불림) | 본인만 | 아니오 |

## Project 범위 사용

프로젝트별 MCP 구성을 `.mcp.json`에 저장합니다:

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.github.com/mcp"
    }
  }
}
```

팀원은 프로젝트 MCP를 처음 사용할 때 승인 프롬프트를 보게 됩니다.
