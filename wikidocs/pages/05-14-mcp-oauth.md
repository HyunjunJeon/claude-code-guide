이 페이지는 OAuth 2.0이 필요한 MCP 서버에 Claude Code를 연결할 때 알아야 할 모든 것을 모아 둔다. interactive 흐름·사전 등록된 client·고정 callback port·메타데이터 디스커버리 override·custom header 같은 실무 옵션을 함께 다룬다. 일반적인 토큰 헤더(`Authorization: Bearer ...`)만으로 끝나는 서버라면 [mcp-installation.md](https://wikidocs.net/345448)가 더 빠르고, OAuth가 필요한 서비스(Notion, Stripe 등)는 이 페이지를 본다.

Claude Code는 OAuth 2.0을 요구하는 MCP 서버를 지원합니다. OAuth가 활성화된 서버에 연결할 때 Claude Code가 전체 인증 흐름을 처리합니다:

```bash
# Connect to an OAuth-enabled MCP server (interactive flow)
claude mcp add --transport http my-service https://my-service.example.com/mcp

# Pre-configure OAuth credentials for non-interactive setup
claude mcp add --transport http my-service https://my-service.example.com/mcp \
  --client-id "your-client-id" \
  --client-secret "your-client-secret" \
  --callback-port 8080
```

| 기능 | 설명 |
|---------|-------------|
| **Interactive OAuth** | `/mcp`를 사용하여 브라우저 기반 OAuth 흐름을 트리거합니다 |
| **Pre-configured OAuth clients** | Notion, Stripe 등 일반적인 서비스를 위한 내장 OAuth 클라이언트 (v2.1.30+) |
| **Pre-configured credentials** | 자동화된 설정을 위한 `--client-id`, `--client-secret`, `--callback-port` 플래그 |
| **Token storage** | 토큰은 시스템 키체인에 안전하게 저장됩니다 |
| **Step-up auth** | 권한이 필요한 작업에 대한 단계적 인증을 지원합니다 |
| **Discovery caching** | 빠른 재연결을 위해 OAuth 디스커버리 메타데이터가 캐시됩니다 |
| **Metadata override** | 기본 OAuth 메타데이터 디스커버리를 재정의하기 위한 `.mcp.json`의 `oauth.authServerMetadataUrl` |

## OAuth 메타데이터 디스커버리 재정의

MCP 서버가 표준 OAuth 메타데이터 엔드포인트(`/.well-known/oauth-authorization-server`)에서 오류를 반환하지만 작동하는 OIDC 엔드포인트를 제공하는 경우, Claude Code에 특정 URL에서 OAuth 메타데이터를 가져오도록 지시할 수 있습니다. 서버 설정의 `oauth` 객체에서 `authServerMetadataUrl`을 설정합니다:

```json
{
  "mcpServers": {
    "my-server": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "oauth": {
        "authServerMetadataUrl": "https://auth.example.com/.well-known/openid-configuration"
      }
    }
  }
}
```

URL은 반드시 `https://`를 사용해야 합니다. 이 옵션은 Claude Code v2.1.64 이상이 필요합니다.

## 고정 OAuth 콜백 포트 사용

예측 가능한 로컬 redirect target이 필요하다면 설정 시 `--callback-port`를 명시합니다:

```bash
claude mcp add --transport http my-service https://my-service.example.com/mcp \
  --callback-port 8080
```

다음 상황에서 특히 유용합니다:

- 로컬 firewall이 특정 loopback port만 허용하는 경우
- 팀용 setup instruction을 반복 가능하게 만들고 싶은 경우
- random ephemeral port보다 고정 포트가 브라우저 redirect troubleshooting에 유리한 경우

팀 문서에는 "사용 가능한 로컬 포트를 하나 정해서 쓰는 것"이 가장 실용적입니다.

## 사전 구성된 OAuth 자격 증명

비대화식 또는 반자동 setup에서는 OAuth client identity를 미리 넣을 수 있습니다:

```bash
claude mcp add --transport http my-service https://my-service.example.com/mcp \
  --client-id "your-client-id" \
  --client-secret "your-client-secret" \
  --callback-port 8080
```

다음 상황에 적합합니다:

- 팀에서 이미 OAuth client를 provision해 둔 경우
- manual client creation 없이 따라 할 수 있는 setup 문서가 필요한 경우
- CI나 scripted bootstrap flow에서 안정적인 client metadata가 필요한 경우

client secret은 공유 shell history나 팀 문서에 그대로 남기지 않는 것이 좋습니다.

## 커스텀 인증용 동적 헤더

OAuth만으로 끝나지 않는 HTTP MCP 서버는 추가 인증 헤더가 필요할 수 있습니다. 이때는 secret을 하드코딩하지 말고 environment-backed configuration으로 header를 동적으로 넣는 것이 좋습니다.

실무 패턴:

- 민감 값은 environment variable에 저장
- server configuration 또는 wrapper script에서 참조
- header 생성 로직은 connection definition 가까이에 둬서 audit 가능하게 유지

OAuth를 쓸 수 있다면 OAuth를 우선하고, 서비스 특성상 꼭 필요할 때만 custom header를 추가하는 것이 좋습니다.
