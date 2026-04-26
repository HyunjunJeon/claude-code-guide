이 페이지는 첫 MCP 서버를 처음부터 끝까지 붙여 보는 단계별 setup 안내(전제조건 → 추가 → 환경변수 → 연결 테스트 → 도구 호출)와 자주 쓰이는 패키지 설치 명령을 모아 둔다. MCP를 처음 도입하는 사람이 따라 하기 좋은 페이지다. 명령 자체의 문법 레퍼런스는 [mcp-installation.md](https://wikidocs.net/345448)와 [mcp-management.md](https://wikidocs.net/345451), 문제가 생겼을 때는 [mcp-troubleshooting.md](https://wikidocs.net/345186)를 본다.

## 전제 조건

- Node.js 및 npm 설치
- Claude Code CLI 설치
- 외부 서비스를 위한 API 토큰/자격 증명

## 단계별 설정

1. **첫 번째 MCP 서버 추가** CLI를 사용합니다 (예: GitHub):

   ```bash
   claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
   ```

   또는 프로젝트 루트에 `.mcp.json` 파일을 생성합니다:

   ```json
   {
     "mcpServers": {
       "github": {
         "command": "npx",
         "args": ["@modelcontextprotocol/server-github"],
         "env": {
           "GITHUB_TOKEN": "${GITHUB_TOKEN}"
         }
       }
     }
   }
   ```

2. **환경 변수 설정:**

   ```bash
   export GITHUB_TOKEN="your_github_personal_access_token"
   ```

3. **연결 테스트:**

   ```bash
   claude /mcp
   ```

4. **MCP 도구 사용:**

   ```bash
   /mcp__github__list_prs
   /mcp__github__create_issue "Title" "Description"
   ```

## 특정 서비스 설치

**GitHub MCP:**

```bash
npm install -g @modelcontextprotocol/server-github
```

**Database MCP:**

```bash
npm install -g @modelcontextprotocol/server-database
```

**Filesystem MCP:**

```bash
npm install -g @modelcontextprotocol/server-filesystem
```

**Slack MCP:**

```bash
npm install -g @modelcontextprotocol/server-slack
```
