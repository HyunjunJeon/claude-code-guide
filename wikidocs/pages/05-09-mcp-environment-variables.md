이 페이지는 MCP 설정에서 자격 증명을 다룰 때 환경 변수에 저장하고 `${VAR}`로 참조하는 표준 패턴을 정리한다. 시크릿을 git에 절대 넣지 않으면서 팀과 안전하게 공유하기 위한 가장 기본적인 보안 위생이다. 더 풍부한 확장 문법(`${VAR:-default}`)과 활용 예시는 [mcp-examples.md](05-10-mcp-examples.md)에서, 정책적 통제는 [mcp-best-practices.md](05-03-mcp-best-practices.md)에서 다룬다.

민감한 자격 증명을 환경 변수에 저장합니다:

```bash
# ~/.bashrc or ~/.zshrc
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxx"
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
export SLACK_TOKEN="xoxb-xxxxxxxxxxxxx"
```

그런 다음 MCP 설정에서 참조합니다:

```json
{
  "env": {
    "GITHUB_TOKEN": "${GITHUB_TOKEN}"
  }
}
```
