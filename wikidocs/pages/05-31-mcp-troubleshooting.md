이 페이지는 MCP 서버에서 자주 만나는 4가지 증상(서버 미발견, 인증 실패, 연결 시간 초과, 서버 충돌)별로 점검 명령과 체크리스트를 모아 둔다. MCP가 갑자기 안 될 때 가장 먼저 펼쳐 보는 페이지다. 사전 예방을 위한 모범 사례는 mcp-best-practices.md, 처음 설치 흐름은 mcp-setup-guide.md에서 확인한다.

## MCP 서버를 찾을 수 없음

```bash
# Verify MCP server is installed
npm list -g @modelcontextprotocol/server-github

# Install if missing
npm install -g @modelcontextprotocol/server-github
```

## 인증 실패

```bash
# Verify environment variable is set
echo $GITHUB_TOKEN

# Re-export if needed
export GITHUB_TOKEN="your_token"

# Verify token has correct permissions
# Check GitHub token scopes at: https://github.com/settings/tokens
```

## 연결 시간 초과

- 네트워크 연결 확인: `ping api.github.com`
- API 엔드포인트 접근 가능 여부 확인
- API의 속도 제한 확인
- 설정에서 시간 초과 값 증가 시도
- 방화벽 또는 프록시 문제 확인

## MCP 서버 충돌

- MCP 서버 로그 확인: `~/.claude/logs/`
- 모든 환경 변수가 설정되었는지 확인
- 적절한 파일 권한 보장
- MCP 서버 패키지 재설치 시도
- 동일 포트의 충돌하는 프로세스 확인
