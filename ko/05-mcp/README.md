<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../../resources/logos/claude-howto-logo.svg">
</picture>

# MCP (Model Context Protocol)

이 폴더에는 Claude Code에서 사용하는 MCP 서버 구성 및 사용법에 대한 포괄적인 문서와 예제가 포함되어 있습니다.

## 개요

MCP (Model Context Protocol)는 Claude가 외부 도구, API 및 실시간 데이터 소스에 접근하기 위한 표준화된 방법입니다. Memory와 달리, MCP는 변경되는 데이터에 대한 실시간 접근을 제공합니다.

주요 특성:
- 외부 서비스에 대한 실시간 접근
- 실시간 데이터 동기화
- 확장 가능한 아키텍처
- 안전한 인증
- 도구 기반 상호작용

## MCP 아키텍처

```mermaid
graph TB
    A["Claude"]
    B["MCP Server"]
    C["External Service"]

    A -->|Request: list_issues| B
    B -->|Query| C
    C -->|Data| B
    B -->|Response| A

    A -->|Request: create_issue| B
    B -->|Action| C
    C -->|Result| B
    B -->|Response| A

    style A fill:#e1f5fe,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#e8f5e9,stroke:#333,color:#333
```

## MCP 생태계

```mermaid
graph TB
    A["Claude"] -->|MCP| B["Filesystem<br/>MCP Server"]
    A -->|MCP| C["GitHub<br/>MCP Server"]
    A -->|MCP| D["Database<br/>MCP Server"]
    A -->|MCP| E["Slack<br/>MCP Server"]
    A -->|MCP| F["Google Docs<br/>MCP Server"]

    B -->|File I/O| G["Local Files"]
    C -->|API| H["GitHub Repos"]
    D -->|Query| I["PostgreSQL/MySQL"]
    E -->|Messages| J["Slack Workspace"]
    F -->|Docs| K["Google Drive"]

    style A fill:#e1f5fe,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#f3e5f5,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#f3e5f5,stroke:#333,color:#333
    style F fill:#f3e5f5,stroke:#333,color:#333
    style G fill:#e8f5e9,stroke:#333,color:#333
    style H fill:#e8f5e9,stroke:#333,color:#333
    style I fill:#e8f5e9,stroke:#333,color:#333
    style J fill:#e8f5e9,stroke:#333,color:#333
    style K fill:#e8f5e9,stroke:#333,color:#333
```

## MCP 설치 방법

Claude Code는 MCP 서버 연결을 위해 여러 전송 프로토콜을 지원합니다:

### HTTP 전송 (권장)

```bash
# Basic HTTP connection
claude mcp add --transport http notion https://mcp.notion.com/mcp

# HTTP with authentication header
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### Stdio 전송 (로컬)

로컬에서 실행되는 MCP 서버의 경우:

```bash
# Local Node.js server
claude mcp add --transport stdio myserver -- npx @myorg/mcp-server

# With environment variables
claude mcp add --transport stdio myserver --env KEY=value -- npx server
```

### SSE 전송 (지원 중단 예정)

Server-Sent Events 전송은 `http`를 위해 지원 중단되었지만 여전히 지원됩니다:

```bash
claude mcp add --transport sse legacy-server https://example.com/sse
```

### WebSocket 전송

> **참고**: WebSocket 전송은 공식 Claude Code 문서에 기재되어 있지 않습니다. 실험적이거나 커뮤니티 지원 기능일 수 있습니다. 프로덕션 환경에서는 HTTP 전송을 사용하십시오.

지속적인 양방향 연결을 위한 WebSocket 전송:

```bash
claude mcp add --transport ws realtime-server wss://example.com/mcp
```

### Windows 관련 참고 사항

네이티브 Windows(WSL 제외)에서는 npx 명령에 `cmd /c`를 사용합니다:

```bash
claude mcp add --transport stdio my-server -- cmd /c npx -y @some/package
```

### OAuth 2.0 인증

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

#### OAuth 메타데이터 디스커버리 재정의

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

#### 고정 OAuth 콜백 포트 사용

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

#### 사전 구성된 OAuth 자격 증명

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

#### 커스텀 인증용 동적 헤더

OAuth만으로 끝나지 않는 HTTP MCP 서버는 추가 인증 헤더가 필요할 수 있습니다. 이때는 secret을 하드코딩하지 말고 environment-backed configuration으로 header를 동적으로 넣는 것이 좋습니다.

실무 패턴:

- 민감 값은 environment variable에 저장
- server configuration 또는 wrapper script에서 참조
- header 생성 로직은 connection definition 가까이에 둬서 audit 가능하게 유지

OAuth를 쓸 수 있다면 OAuth를 우선하고, 서비스 특성상 꼭 필요할 때만 custom header를 추가하는 것이 좋습니다.

### Claude.ai MCP Connectors

Claude.ai 계정에 구성된 MCP 서버는 Claude Code에서 자동으로 사용할 수 있습니다. 이는 Claude.ai 웹 인터페이스를 통해 설정한 MCP 연결이 추가 구성 없이 접근 가능하다는 것을 의미합니다.

Claude.ai MCP connectors는 `--print` 모드에서도 사용 가능하며 (v2.1.83+), 비대화식 및 스크립트 사용을 지원합니다.

Claude Code에서 Claude.ai MCP 서버를 비활성화하려면 `ENABLE_CLAUDEAI_MCP_SERVERS` 환경 변수를 `false`로 설정합니다:

```bash
ENABLE_CLAUDEAI_MCP_SERVERS=false claude
```

> **참고:** 이 기능은 Claude.ai 계정으로 로그인한 사용자만 사용할 수 있습니다.

## MCP 설정 프로세스

```mermaid
sequenceDiagram
    participant User
    participant Claude as Claude Code
    participant Config as Config File
    participant Service as External Service

    User->>Claude: Type /mcp
    Claude->>Claude: List available MCP servers
    Claude->>User: Show options
    User->>Claude: Select GitHub MCP
    Claude->>Config: Update configuration
    Config->>Claude: Activate connection
    Claude->>Service: Test connection
    Service-->>Claude: Authentication successful
    Claude->>User: MCP connected!
```

## MCP Tool Search

MCP 도구 설명이 컨텍스트 윈도우의 10%를 초과하면, Claude Code는 모델 컨텍스트를 과부하하지 않고 적절한 도구를 효율적으로 선택하기 위해 자동으로 도구 검색을 활성화합니다.

| 설정 | 값 | 설명 |
|---------|-------|-------------|
| `ENABLE_TOOL_SEARCH` | `auto` (기본값) | 도구 설명이 컨텍스트의 10%를 초과하면 자동 활성화 |
| `ENABLE_TOOL_SEARCH` | `auto:<N>` | 커스텀 임계값 `N`개 도구에서 자동 활성화 |
| `ENABLE_TOOL_SEARCH` | `true` | 도구 수에 관계없이 항상 활성화 |
| `ENABLE_TOOL_SEARCH` | `false` | 비활성화; 모든 도구 설명이 전체로 전송됨 |

> **참고:** Tool search는 Sonnet 4 이상 또는 Opus 4 이상이 필요합니다. Haiku 모델은 tool search를 지원하지 않습니다.

**도구 설명 제한**: 각 MCP 서버의 도구 설명은 2KB로 제한됩니다 (v2.1.84+). 이 제한을 초과하는 설명은 잘립니다.

### Tool Search 작동 방식

Tool Search는 모든 도구 설명을 한 번에 컨텍스트에 넣지 않고, 필요한 도구를 먼저 좁히는 방식으로 동작합니다.

개념적으로는:

1. Claude가 MCP 서버 집합을 확인
2. Tool Search로 후보 도구를 좁힘
3. 관련 도구 설명만 더 자세히 surface

이 덕분에 큰 MCP 설치에서도 매 turn마다 모든 도구 설명 비용을 내지 않아도 됩니다.

핵심 장점은 "큰 도구 상자를 유지하면서도 컨텍스트 폭증을 막는 것"입니다.

### Tool Search 구성

핵심 제어면은 `ENABLE_TOOL_SEARCH`입니다:

- `auto`는 기본 적응형 동작 유지
- `auto:<N>`은 임계값을 조정
- `true`는 항상 활성화
- `false`는 비활성화하고 모든 도구 설명을 그대로 보냄

실무 기준:

- 일반 프로젝트는 `auto`
- MCP surface가 크고 안정적이면 `true`
- debugging이나 전체 설명을 일부러 보고 싶을 때만 `false`

### MCP 서버 작성자를 위한 가이드

MCP 서버를 직접 배포하거나 유지한다면 Tool Search가 켜진 환경에서도 잘 동작하도록 도구를 설계해야 합니다.

좋은 규칙:

- tool name은 서로 명확히 구분되게 짓기
- description은 짧고 앞부분이 강하게 읽히게 쓰기
- tool description 안에 거대한 instruction block를 넣지 않기
- truncation이 걸려도 첫 문장만으로 용도를 알 수 있게 만들기

Tool Search는 이름과 한 줄 설명만으로도 도구를 구분할 수 있을 때 가장 잘 작동합니다.

## 동적 도구 업데이트

Claude Code는 MCP `list_changed` 알림을 지원합니다. MCP 서버가 사용 가능한 도구를 동적으로 추가, 제거 또는 수정하면, Claude Code가 업데이트를 수신하고 도구 목록을 자동으로 조정합니다 -- 재연결이나 재시작이 필요 없습니다.

## MCP Apps

MCP Apps는 최초의 공식 MCP 확장 기능으로, MCP 도구 호출이 채팅 인터페이스에 직접 렌더링되는 대화형 UI 컴포넌트를 반환할 수 있게 합니다. 일반 텍스트 응답 대신, MCP 서버가 풍부한 대시보드, 양식, 데이터 시각화 및 다단계 워크플로우를 전달할 수 있으며 -- 모두 대화를 벗어나지 않고 인라인으로 표시됩니다.

## MCP Elicitation

MCP 서버는 대화형 대화 상자를 통해 사용자로부터 구조화된 입력을 요청할 수 있습니다 (v2.1.49+). 이를 통해 MCP 서버가 워크플로우 도중에 추가 정보를 요청할 수 있습니다 -- 예를 들어, 확인을 요청하거나, 옵션 목록에서 선택하거나, 필수 필드를 채우는 등 -- MCP 서버 상호작용에 대화형 기능을 추가합니다.

### MCP Elicitation 응답 처리

Elicitation은 자유 형식 prompt라기보다 반구조화 form exchange처럼 다루는 것이 좋습니다.

좋은 기준:

- 서버가 정확히 무엇을 요청하는지 먼저 검증
- 필요한 필드를 명확히 유지
- 이후 로그를 남길 경우 민감한 응답은 정규화하거나 redaction

MCP 서버가 multi-step workflow와 human input checkpoint를 섞어 쓰는 경우, 이 지점에서 hook 기반 validation도 특히 유용합니다.

## 도구 설명 및 지시 제한

v2.1.84부터 Claude Code는 MCP 서버당 도구 설명과 지시에 **2 KB 제한**을 적용합니다. 이는 개별 서버가 지나치게 장황한 도구 정의로 과도한 컨텍스트를 소비하는 것을 방지하여, 컨텍스트 팽창을 줄이고 상호작용을 효율적으로 유지합니다.

## MCP Prompts를 Slash Commands로

MCP 서버는 Claude Code에서 slash command로 나타나는 프롬프트를 노출할 수 있습니다. 프롬프트는 다음 명명 규칙을 사용하여 접근할 수 있습니다:

```
/mcp__<server>__<prompt>
```

예를 들어, `github`라는 이름의 서버가 `review`라는 프롬프트를 노출하면, `/mcp__github__review`로 호출할 수 있습니다.

## 서버 중복 제거

동일한 MCP 서버가 여러 범위(local, project, user)에서 정의되면 로컬 설정이 우선합니다. 이를 통해 충돌 없이 프로젝트 레벨 또는 사용자 레벨 MCP 설정을 로컬 커스터마이징으로 재정의할 수 있습니다.

## @ 멘션을 통한 MCP 리소스

`@` 멘션 구문을 사용하여 프롬프트에서 MCP 리소스를 직접 참조할 수 있습니다:

```
@server-name:protocol://resource/path
```

예를 들어, 특정 데이터베이스 리소스를 참조하려면:

```
@database:postgres://mydb/users
```

이를 통해 Claude가 MCP 리소스 콘텐츠를 가져와 대화 컨텍스트의 일부로 인라인에 포함할 수 있습니다.

## MCP 범위

MCP 구성은 서로 다른 공유 수준의 범위에 저장할 수 있습니다:

| 범위 | 위치 | 설명 | 공유 대상 | 승인 필요 |
|-------|----------|-------------|-------------|------------------|
| **Local** (기본값) | `~/.claude.json` (프로젝트 경로 아래) | 현재 사용자, 현재 프로젝트 전용 (이전 버전에서는 `project`로 불림) | 본인만 | 아니오 |
| **Project** | `.mcp.json` | git 저장소에 체크인됨 | 팀원 | 예 (최초 사용 시) |
| **User** | `~/.claude.json` | 모든 프로젝트에서 사용 가능 (이전 버전에서는 `global`로 불림) | 본인만 | 아니오 |

### Project 범위 사용

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

## MCP 구성 관리

### MCP 서버 추가

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

## 사용 가능한 MCP 서버 테이블

| MCP 서버 | 용도 | 주요 도구 | 인증 | 실시간 |
|------------|---------|--------------|------|-----------|
| **Filesystem** | 파일 작업 | read, write, delete | OS 권한 | 예 |
| **GitHub** | 저장소 관리 | list_prs, create_issue, push | OAuth | 예 |
| **Slack** | 팀 커뮤니케이션 | send_message, list_channels | 토큰 | 예 |
| **Database** | SQL 쿼리 | query, insert, update | 자격 증명 | 예 |
| **Google Docs** | 문서 접근 | read, write, share | OAuth | 예 |
| **Asana** | 프로젝트 관리 | create_task, update_status | API 키 | 예 |
| **Stripe** | 결제 데이터 | list_charges, create_invoice | API 키 | 예 |
| **Memory** | 영구 메모리 | store, retrieve, delete | 로컬 | 아니오 |

## 실용 예제

### 예제 1: GitHub MCP 구성

**파일:** `.mcp.json` (프로젝트 루트)

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

**사용 가능한 GitHub MCP 도구:**

#### Pull Request 관리
- `list_prs` - 저장소의 모든 PR 나열
- `get_pr` - diff를 포함한 PR 세부 정보 가져오기
- `create_pr` - 새 PR 생성
- `update_pr` - PR 설명/제목 업데이트
- `merge_pr` - PR을 메인 브랜치에 병합
- `review_pr` - 리뷰 코멘트 추가

**요청 예시:**
```
/mcp__github__get_pr 456

# Returns:
Title: Add dark mode support
Author: @alice
Description: Implements dark theme using CSS variables
Status: OPEN
Reviewers: @bob, @charlie
```

#### 이슈 관리
- `list_issues` - 모든 이슈 나열
- `get_issue` - 이슈 세부 정보 가져오기
- `create_issue` - 새 이슈 생성
- `close_issue` - 이슈 닫기
- `add_comment` - 이슈에 코멘트 추가

#### 저장소 정보
- `get_repo_info` - 저장소 세부 정보
- `list_files` - 파일 트리 구조
- `get_file_content` - 파일 내용 읽기
- `search_code` - 코드베이스 전체 검색

#### 커밋 작업
- `list_commits` - 커밋 히스토리
- `get_commit` - 특정 커밋 세부 정보
- `create_commit` - 새 커밋 생성

**설정**:
```bash
export GITHUB_TOKEN="your_github_token"
# Or use the CLI to add directly:
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

### 구성에서 환경 변수 확장

MCP 구성은 대체 기본값이 있는 환경 변수 확장을 지원합니다. `${VAR}` 및 `${VAR:-default}` 구문은 다음 필드에서 작동합니다: `command`, `args`, `env`, `url`, `headers`.

```json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}",
        "X-Custom-Header": "${CUSTOM_HEADER:-default-value}"
      }
    },
    "local-server": {
      "command": "${MCP_BIN_PATH:-npx}",
      "args": ["${MCP_PACKAGE:-@company/mcp-server}"],
      "env": {
        "DB_URL": "${DATABASE_URL:-postgresql://localhost/dev}"
      }
    }
  }
}
```

변수는 런타임에 확장됩니다:
- `${VAR}` - 환경 변수 사용, 설정되지 않으면 오류
- `${VAR:-default}` - 환경 변수 사용, 설정되지 않으면 기본값으로 대체

### 예제 2: Database MCP 설정

**구성:**

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-database"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

**사용 예시:**

```markdown
User: Fetch all users with more than 10 orders

Claude: I'll query your database to find that information.

# Using MCP database tool:
SELECT u.*, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING COUNT(o.id) > 10
ORDER BY order_count DESC;

# Results:
- Alice: 15 orders
- Bob: 12 orders
- Charlie: 11 orders
```

**설정**:
```bash
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
# Or use the CLI to add directly:
claude mcp add --transport stdio database -- npx @modelcontextprotocol/server-database
```

### 예제 3: 다중 MCP 워크플로우

**시나리오: 일일 보고서 생성**

```markdown
# Daily Report Workflow using Multiple MCPs

## Setup
1. GitHub MCP - fetch PR metrics
2. Database MCP - query sales data
3. Slack MCP - post report
4. Filesystem MCP - save report

## Workflow

### Step 1: Fetch GitHub Data
/mcp__github__list_prs completed:true last:7days

Output:
- Total PRs: 42
- Average merge time: 2.3 hours
- Review turnaround: 1.1 hours

### Step 2: Query Database
SELECT COUNT(*) as sales, SUM(amount) as revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '1 day'

Output:
- Sales: 247
- Revenue: $12,450

### Step 3: Generate Report
Combine data into HTML report

### Step 4: Save to Filesystem
Write report.html to /reports/

### Step 5: Post to Slack
Send summary to #daily-reports channel

Final Output:
Report generated and posted
47 PRs merged this week
$12,450 in daily sales
```

**설정**:
```bash
export GITHUB_TOKEN="your_github_token"
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
export SLACK_TOKEN="your_slack_token"
# Add each MCP server via the CLI or configure them in .mcp.json
```

### 예제 4: Filesystem MCP 작업

**구성:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}
```

**사용 가능한 작업:**

| 작업 | 명령 | 용도 |
|-----------|---------|---------|
| List files | `ls ~/projects` | 디렉토리 내용 표시 |
| Read file | `cat src/main.ts` | 파일 내용 읽기 |
| Write file | `create docs/api.md` | 새 파일 생성 |
| Edit file | `edit src/app.ts` | 파일 수정 |
| Search | `grep "async function"` | 파일에서 검색 |
| Delete | `rm old-file.js` | 파일 삭제 |

**설정**:
```bash
# Use the CLI to add directly:
claude mcp add --transport stdio filesystem -- npx @modelcontextprotocol/server-filesystem /home/user/projects
```

## MCP vs Memory: 결정 매트릭스

```mermaid
graph TD
    A["Need external data?"]
    A -->|No| B["Use Memory"]
    A -->|Yes| C["Does it change frequently?"]
    C -->|No/Rarely| B
    C -->|Yes/Often| D["Use MCP"]

    B -->|Stores| E["Preferences<br/>Context<br/>History"]
    D -->|Accesses| F["Live APIs<br/>Databases<br/>Services"]

    style A fill:#fff3e0,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#fff3e0,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#e8f5e9,stroke:#333,color:#333
    style F fill:#e8f5e9,stroke:#333,color:#333
```

## 요청/응답 패턴

```mermaid
sequenceDiagram
    participant App as Claude
    participant MCP as MCP Server
    participant DB as Database

    App->>MCP: Request: "SELECT * FROM users WHERE id=1"
    MCP->>DB: Execute query
    DB-->>MCP: Result set
    MCP-->>App: Return parsed data
    App->>App: Process result
    App->>App: Continue task

    Note over MCP,DB: Real-time access<br/>No caching
```

## 환경 변수

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

## Claude를 MCP 서버로 (`claude mcp serve`)

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

## 관리형 MCP 구성 (기업용)

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

### 관리형 제한 동작

관리형 MCP policy는 일반 user/project configuration 앞에서 동작하는 gate라고 생각하면 됩니다.

즉:

- user/project config는 "무엇을 쓰고 싶은지"
- managed MCP policy는 "실제로 무엇이 허용되는지"

정책이 서버를 막으면 더 낮은 scope가 그 결정을 뒤집을 수 없습니다.

#### 명령 기반 제한 동작

명령 기반 제한은 local stdio 서버에 가장 유용합니다.

대표 용도:

- 감사된 launcher command만 허용
- 안전하지 않은 wrapper script 차단
- package-manager 기반 launcher 패턴 제한

팀이 특정 로컬 MCP binary에 의존한다면, 정확한 command form을 문서화하고 allowlist도 그 형태에 맞춰 두는 것이 중요합니다.

#### URL 기반 제한 동작

URL 기반 제한은 remote HTTP, SSE, WebSocket MCP 서버에 가장 유용합니다.

대표 용도:

- 승인된 hostname만 허용
- insecure transport 차단
- 내부 도메인으로 사용 범위 제한

이 레이어는 팀원이 승인된 MCP endpoint에만 연결하도록 강제하는 데 가장 적합합니다.

#### Allowlist와 Denylist 해석

정책 해석 규칙은 다음처럼 보면 됩니다:

- allowlist만 있으면 그 밖의 서버는 사실상 제외
- denylist가 매칭되면 거부가 우선
- 둘 다 같은 서버에 매칭되면 차단된 것으로 처리

운영 문서에는 실제 match example을 함께 남겨 두는 것이 좋습니다.

## Plugin 제공 MCP 서버

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

## Subagent 범위 MCP

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

## MCP 출력 제한

Claude Code는 컨텍스트 오버플로우를 방지하기 위해 MCP 도구 출력에 제한을 적용합니다:

| 제한 | 임계값 | 동작 |
|-------|-----------|----------|
| **경고** | 10,000 토큰 | 출력이 크다는 경고가 표시됩니다 |
| **기본 최대값** | 25,000 토큰 | 이 한도를 초과하면 출력이 잘립니다 |
| **디스크 저장** | 50,000 문자 | 50K 문자를 초과하는 도구 결과는 디스크에 저장됩니다 |

최대 출력 제한은 `MAX_MCP_OUTPUT_TOKENS` 환경 변수를 통해 구성할 수 있습니다:

```bash
# Increase the max output to 50,000 tokens
export MAX_MCP_OUTPUT_TOKENS=50000
```

### 도구별 결과 크기 조정

Claude Code의 주요 CLI surface에는 per-tool 전용 cap보다 `MAX_MCP_OUTPUT_TOKENS`라는 global cap이 먼저 노출됩니다.

실무 기준:

- 전체 한도를 올려야 할 때만 `MAX_MCP_OUTPUT_TOKENS` 사용
- 특정 도구 하나만 noisy하다면 server-side에서 출력 자체를 shaping
- 가능하면 global cap 상향보다 paging, filtering, summarization을 우선

문제가 되는 것이 한 도구라면, 전체 한도를 올리기 전에 그 도구의 output contract를 먼저 손보는 것이 낫습니다.

### MCP와 Channels

Channels와 MCP는 가까운 개념이지만 역할은 다릅니다. channels는 MCP-backed event stream이고, 일반 MCP tool은 request/response 도구입니다.

일반 MCP tool이 맞는 경우:

- Claude가 필요할 때 데이터를 요청
- 상호작용이 request/response 구조

Channels가 맞는 경우:

- 외부 시스템이 live session으로 이벤트를 push
- Claude가 alert, chat message, webhook 기반 상태 변화에 반응해야 함

즉, channels는 event ingress를, 일반 MCP tool은 data/action access를 해결합니다.

## 코드 실행으로 컨텍스트 팽창 해결

MCP 채택이 확대됨에 따라, 수십 개의 서버와 수백 또는 수천 개의 도구에 연결하면 심각한 문제가 발생합니다: **컨텍스트 팽창**. 이는 대규모 MCP에서 가장 큰 문제이며, Anthropic의 엔지니어링 팀은 우아한 해결책을 제안했습니다 -- 직접 도구 호출 대신 코드 실행을 사용하는 것입니다.

> **출처**: [Code Execution with MCP: Building More Efficient Agents](https://www.anthropic.com/engineering/code-execution-with-mcp) -- Anthropic 엔지니어링 블로그

### 문제: 두 가지 토큰 낭비 원인

**1. 도구 정의가 컨텍스트 윈도우를 과부하함**

대부분의 MCP 클라이언트는 모든 도구 정의를 사전에 로드합니다. 수천 개의 도구에 연결되면, 모델은 사용자의 요청을 읽기도 전에 수십만 토큰을 처리해야 합니다.

**2. 중간 결과가 추가 토큰을 소비함**

모든 중간 도구 결과가 모델의 컨텍스트를 통과합니다. 회의 트랜스크립트를 Google Drive에서 Salesforce로 전송하는 경우를 생각해보세요 -- 전체 트랜스크립트가 컨텍스트를 **두 번** 통과합니다: 읽을 때 한 번, 대상에 쓸 때 한 번. 2시간짜리 회의 트랜스크립트는 50,000개 이상의 추가 토큰을 의미할 수 있습니다.

```mermaid
graph LR
    A["Model"] -->|"Tool Call: getDocument"| B["MCP Server"]
    B -->|"Full transcript (50K tokens)"| A
    A -->|"Tool Call: updateRecord<br/>(re-sends full transcript)"| B
    B -->|"Confirmation"| A

    style A fill:#ffcdd2,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
```

### 해결책: MCP 도구를 코드 API로

도구 정의와 결과를 컨텍스트 윈도우를 통해 전달하는 대신, agent가 MCP 도구를 API로 호출하는 **코드를 작성**합니다. 코드는 샌드박스된 실행 환경에서 실행되며, 최종 결과만 모델에 반환됩니다.

```mermaid
graph LR
    A["Model"] -->|"Writes code"| B["Code Execution<br/>Environment"]
    B -->|"Calls tools directly"| C["MCP Servers"]
    C -->|"Data stays in<br/>execution env"| B
    B -->|"Only final result<br/>(minimal tokens)"| A

    style A fill:#c8e6c9,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#f3e5f5,stroke:#333,color:#333
```

#### 작동 방식

MCP 도구는 타입이 지정된 함수의 파일 트리로 제공됩니다:

```
servers/
├── google-drive/
│   ├── getDocument.ts
│   └── index.ts
├── salesforce/
│   ├── updateRecord.ts
│   └── index.ts
└── ...
```

각 도구 파일에는 타입이 지정된 래퍼가 포함됩니다:

```typescript
// ./servers/google-drive/getDocument.ts
import { callMCPTool } from "../../../client.js";

interface GetDocumentInput {
  documentId: string;
}

interface GetDocumentResponse {
  content: string;
}

export async function getDocument(
  input: GetDocumentInput
): Promise<GetDocumentResponse> {
  return callMCPTool<GetDocumentResponse>(
    'google_drive__get_document', input
  );
}
```

그런 다음 agent가 도구를 조율하는 코드를 작성합니다:

```typescript
import * as gdrive from './servers/google-drive';
import * as salesforce from './servers/salesforce';

// Data flows directly between tools — never through the model
const transcript = (
  await gdrive.getDocument({ documentId: 'abc123' })
).content;

await salesforce.updateRecord({
  objectType: 'SalesMeeting',
  recordId: '00Q5f000001abcXYZ',
  data: { Notes: transcript }
});
```

**결과: 토큰 사용량이 약 150,000에서 약 2,000으로 감소 -- 98.7% 절감.**

### 주요 이점

| 이점 | 설명 |
|---------|-------------|
| **Progressive Disclosure** | Agent가 모든 도구를 사전에 로드하는 대신, 필요한 도구 정의만 파일시스템을 탐색하여 로드합니다 |
| **Context-Efficient Results** | 모델에 반환되기 전에 실행 환경에서 데이터가 필터링/변환됩니다 |
| **Powerful Control Flow** | 루프, 조건문, 오류 처리가 모델을 거치지 않고 코드에서 실행됩니다 |
| **Privacy Preservation** | 중간 데이터(PII, 민감한 레코드)가 실행 환경에 머물며 모델 컨텍스트에 들어가지 않습니다 |
| **State Persistence** | Agent가 중간 결과를 파일로 저장하고 재사용 가능한 skill 함수를 구축할 수 있습니다 |

#### 예제: 대규모 데이터셋 필터링

```typescript
// Without code execution — all 10,000 rows flow through context
// TOOL CALL: gdrive.getSheet(sheetId: 'abc123')
//   -> returns 10,000 rows in context

// With code execution — filter in the execution environment
const allRows = await gdrive.getSheet({ sheetId: 'abc123' });
const pendingOrders = allRows.filter(
  row => row["Status"] === 'pending'
);
console.log(`Found ${pendingOrders.length} pending orders`);
console.log(pendingOrders.slice(0, 5)); // Only 5 rows reach the model
```

#### 예제: 왕복 없는 루프

```typescript
// Poll for a deployment notification — runs entirely in code
let found = false;
while (!found) {
  const messages = await slack.getChannelHistory({
    channel: 'C123456'
  });
  found = messages.some(
    m => m.text.includes('deployment complete')
  );
  if (!found) await new Promise(r => setTimeout(r, 5000));
}
console.log('Deployment notification received');
```

### 고려해야 할 트레이드오프

코드 실행은 자체적인 복잡성을 도입합니다. agent가 생성한 코드를 실행하려면 다음이 필요합니다:

- 적절한 리소스 제한이 있는 **안전한 샌드박스 실행 환경**
- 실행된 코드의 **모니터링 및 로깅**
- 직접 도구 호출에 비해 추가적인 **인프라 오버헤드**

토큰 비용 절감, 낮은 지연 시간, 향상된 도구 구성의 이점은 이러한 구현 비용과 비교하여 평가해야 합니다. 소수의 MCP 서버만 있는 agent의 경우, 직접 도구 호출이 더 간단할 수 있습니다. 대규모 agent(수십 개의 서버, 수백 개의 도구)의 경우, 코드 실행은 상당한 개선입니다.

### MCPorter: MCP 도구 구성을 위한 런타임

[MCPorter](https://github.com/steipete/mcporter)는 보일러플레이트 없이 MCP 서버 호출을 실용적으로 만드는 TypeScript 런타임 및 CLI 도구 키트입니다 -- 선택적 도구 노출과 타입이 지정된 래퍼를 통해 컨텍스트 팽창을 줄이는 데 도움을 줍니다.

**해결하는 문제:** 모든 MCP 서버의 모든 도구 정의를 사전에 로드하는 대신, MCPorter를 사용하면 특정 도구를 요청 시 검색, 검사 및 호출할 수 있어 컨텍스트를 가볍게 유지합니다.

**주요 기능:**

| 기능 | 설명 |
|---------|-------------|
| **Zero-config discovery** | Cursor, Claude, Codex 또는 로컬 설정에서 MCP 서버를 자동 검색합니다 |
| **Typed tool clients** | `mcporter emit-ts`가 `.d.ts` 인터페이스와 바로 실행 가능한 래퍼를 생성합니다 |
| **Composable API** | `createServerProxy()`가 `.text()`, `.json()`, `.markdown()` 헬퍼와 함께 camelCase 메서드로 도구를 노출합니다 |
| **CLI generation** | `mcporter generate-cli`가 MCP 서버를 `--include-tools` / `--exclude-tools` 필터링이 있는 독립형 CLI로 변환합니다 |
| **Parameter hiding** | 선택적 매개변수가 기본적으로 숨겨져 스키마 장황함을 줄입니다 |

**설치:**

```bash
npx mcporter list          # No install required — discover servers instantly
pnpm add mcporter          # Add to a project
brew install steipete/tap/mcporter  # macOS via Homebrew
```

**예제 -- TypeScript에서 도구 구성:**

```typescript
import { createRuntime, createServerProxy } from "mcporter";

const runtime = await createRuntime();
const gdrive = createServerProxy(runtime, "google-drive");
const salesforce = createServerProxy(runtime, "salesforce");

// Data flows between tools without passing through the model context
const doc = await gdrive.getDocument({ documentId: "abc123" });
await salesforce.updateRecord({
  objectType: "SalesMeeting",
  recordId: "00Q5f000001abcXYZ",
  data: { Notes: doc.text() }
});
```

**예제 -- CLI 도구 호출:**

```bash
# Call a specific tool directly
npx mcporter call linear.create_comment issueId:ENG-123 body:'Looks good!'

# List available servers and tools
npx mcporter list
```

MCPorter는 위에서 설명한 코드 실행 접근 방식을 보완하여 MCP 도구를 타입이 지정된 API로 호출하기 위한 런타임 인프라를 제공합니다 -- 중간 데이터를 모델 컨텍스트에서 벗어나게 유지하는 것을 간단하게 만듭니다.

## 모범 사례

### 보안 고려 사항

#### 권장 사항
- 모든 자격 증명에 환경 변수 사용
- 토큰과 API 키를 정기적으로 교체 (월 1회 권장)
- 가능하면 읽기 전용 토큰 사용
- MCP 서버 접근 범위를 최소한으로 제한
- MCP 서버 사용량 및 접근 로그 모니터링
- 외부 서비스에는 가능하면 OAuth 사용
- MCP 요청에 속도 제한 구현
- 프로덕션 사용 전에 MCP 연결 테스트
- 모든 활성 MCP 연결 문서화
- MCP 서버 패키지 업데이트 유지

#### 비권장 사항
- 구성 파일에 자격 증명 하드코딩 금지
- 토큰이나 시크릿을 git에 커밋 금지
- 팀 채팅이나 이메일로 토큰 공유 금지
- 팀 프로젝트에 개인 토큰 사용 금지
- 불필요한 권한 부여 금지
- 인증 오류 무시 금지
- MCP 엔드포인트를 공개적으로 노출 금지
- root/admin 권한으로 MCP 서버 실행 금지
- 로그에 민감한 데이터 캐시 금지
- 인증 메커니즘 비활성화 금지

### 구성 모범 사례

1. **버전 관리**: `.mcp.json`을 git에 유지하되 시크릿에는 환경 변수 사용
2. **최소 권한**: 각 MCP 서버에 필요한 최소 권한 부여
3. **격리**: 가능하면 서로 다른 MCP 서버를 별도의 프로세스에서 실행
4. **모니터링**: 감사 추적을 위해 모든 MCP 요청과 오류 기록
5. **테스트**: 프로덕션에 배포하기 전에 모든 MCP 구성 테스트

### 성능 팁

- 자주 접근하는 데이터를 애플리케이션 레벨에서 캐시
- 데이터 전송을 줄이기 위해 구체적인 MCP 쿼리 사용
- MCP 작업의 응답 시간 모니터링
- 외부 API에 대한 속도 제한 고려
- 여러 작업 수행 시 배치 사용

## 설치 안내

### 전제 조건
- Node.js 및 npm 설치
- Claude Code CLI 설치
- 외부 서비스를 위한 API 토큰/자격 증명

### 단계별 설정

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

### 특정 서비스 설치

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

## 문제 해결

### MCP 서버를 찾을 수 없음
```bash
# Verify MCP server is installed
npm list -g @modelcontextprotocol/server-github

# Install if missing
npm install -g @modelcontextprotocol/server-github
```

### 인증 실패
```bash
# Verify environment variable is set
echo $GITHUB_TOKEN

# Re-export if needed
export GITHUB_TOKEN="your_token"

# Verify token has correct permissions
# Check GitHub token scopes at: https://github.com/settings/tokens
```

### 연결 시간 초과
- 네트워크 연결 확인: `ping api.github.com`
- API 엔드포인트 접근 가능 여부 확인
- API의 속도 제한 확인
- 설정에서 시간 초과 값 증가 시도
- 방화벽 또는 프록시 문제 확인

### MCP 서버 충돌
- MCP 서버 로그 확인: `~/.claude/logs/`
- 모든 환경 변수가 설정되었는지 확인
- 적절한 파일 권한 보장
- MCP 서버 패키지 재설치 시도
- 동일 포트의 충돌하는 프로세스 확인

## 관련 개념

### Memory vs MCP
- **Memory**: 영구적이고 변하지 않는 데이터 저장 (선호사항, 컨텍스트, 히스토리)
- **MCP**: 실시간으로 변하는 데이터 접근 (API, 데이터베이스, 실시간 서비스)

### 사용 시점
- **Memory 사용**: 사용자 선호사항, 대화 히스토리, 학습된 컨텍스트
- **MCP 사용**: 현재 GitHub 이슈, 실시간 데이터베이스 쿼리, 실시간 데이터

### 다른 Claude 기능과의 통합
- MCP와 Memory를 결합하여 풍부한 컨텍스트 제공
- 더 나은 추론을 위해 프롬프트에서 MCP 도구 사용
- 복잡한 워크플로우를 위해 여러 MCP 활용

## 추가 리소스

- [공식 MCP 문서](https://code.claude.com/docs/en/mcp)
- [MCP 프로토콜 사양](https://modelcontextprotocol.io/specification)
- [MCP GitHub 저장소](https://github.com/modelcontextprotocol/servers)
- [사용 가능한 MCP 서버](https://github.com/modelcontextprotocol/servers)
- [MCPorter](https://github.com/steipete/mcporter) -- 보일러플레이트 없이 MCP 서버를 호출하기 위한 TypeScript 런타임 및 CLI
- [Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) -- 컨텍스트 팽창 해결에 관한 Anthropic 엔지니어링 블로그
- [Claude Code CLI 참조](https://code.claude.com/docs/en/cli-reference)
- [Claude API 문서](https://docs.anthropic.com)

---
**최종 업데이트**: 2026년 4월
**Claude Code 버전**: 2.1+
**호환 모델**: Claude Sonnet 4.6, Claude Opus 4.6, Claude Haiku 4.5
