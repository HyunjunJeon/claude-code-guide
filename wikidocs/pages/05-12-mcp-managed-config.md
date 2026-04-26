이 페이지는 IT 관리자가 `managed-mcp.json`으로 조직 전체에 MCP 서버 정책(allowlist, denylist, 명령/URL 패턴 매칭)을 강제하는 방법을 정리한다. 사용자나 프로젝트 설정보다 위에서 동작하는 게이트라서 기업 배포·보안 감사 시 가장 먼저 확인해야 할 페이지다. 일반 사용자 범위 설정은 [mcp-scopes.md](https://wikidocs.net/345452), 운영 명령은 [mcp-management.md](https://wikidocs.net/345451)에서 다룬다.

기업 배포의 경우, IT 관리자는 `managed-mcp.json` 구성 파일을 통해 MCP 서버 정책을 적용할 수 있습니다. 이 파일은 조직 전체에서 허용되거나 차단되는 MCP 서버에 대한 독점적 제어를 제공합니다.

**위치:**

- macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json`
- Linux: `~/.config/ClaudeCode/managed-mcp.json`
- Windows: `%APPDATA%\ClaudeCode\managed-mcp.json`

**기능:**

- `allowedMcpServers` -- 허용된 서버의 화이트리스트
- `deniedMcpServers` -- 금지된 서버의 블랙리스트
- 서버 이름, 명령 및 URL 패턴별 매칭 지원
- 사용자 구성 전에 적용되는 조직 전체 MCP 정책
- 비인가 서버 연결 방지

**구성 예시:**

```json
{
  "allowedMcpServers": [
    {
      "serverName": "github",
      "serverUrl": "https://api.github.com/mcp"
    },
    {
      "serverName": "company-internal",
      "serverCommand": "company-mcp-server"
    }
  ],
  "deniedMcpServers": [
    {
      "serverName": "untrusted-*"
    },
    {
      "serverUrl": "http://*"
    }
  ]
}
```

> **참고:** `allowedMcpServers`와 `deniedMcpServers`가 모두 서버와 매칭될 경우, 거부 규칙이 우선합니다.

## 관리형 제한 동작

관리형 MCP policy는 일반 user/project configuration 앞에서 동작하는 gate라고 생각하면 됩니다.

즉:

- user/project config는 "무엇을 쓰고 싶은지"
- managed MCP policy는 "실제로 무엇이 허용되는지"

정책이 서버를 막으면 더 낮은 scope가 그 결정을 뒤집을 수 없습니다.

### 명령 기반 제한 동작

명령 기반 제한은 local stdio 서버에 가장 유용합니다.

대표 용도:

- 감사된 launcher command만 허용
- 안전하지 않은 wrapper script 차단
- package-manager 기반 launcher 패턴 제한

팀이 특정 로컬 MCP binary에 의존한다면, 정확한 command form을 문서화하고 allowlist도 그 형태에 맞춰 두는 것이 중요합니다.

### URL 기반 제한 동작

URL 기반 제한은 remote HTTP, SSE, WebSocket MCP 서버에 가장 유용합니다.

대표 용도:

- 승인된 hostname만 허용
- insecure transport 차단
- 내부 도메인으로 사용 범위 제한

이 레이어는 팀원이 승인된 MCP endpoint에만 연결하도록 강제하는 데 가장 적합합니다.

### Allowlist와 Denylist 해석

정책 해석 규칙은 다음처럼 보면 됩니다:

- allowlist만 있으면 그 밖의 서버는 사실상 제외
- denylist가 매칭되면 거부가 우선
- 둘 다 같은 서버에 매칭되면 차단된 것으로 처리

운영 문서에는 실제 match example을 함께 남겨 두는 것이 좋습니다.
