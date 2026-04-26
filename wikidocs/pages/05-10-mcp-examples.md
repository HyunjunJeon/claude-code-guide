이 페이지는 GitHub, Database, Filesystem, 다중 MCP 워크플로우 등 가장 자주 쓰이는 MCP 서버의 실제 설정·호출·결과 예시를 모아 둔다. 처음 MCP를 도입할 때 "코드로 어떻게 쓰는가"를 빠르게 보고 싶을 때 본다. `${VAR}`/`${VAR:-default}` 환경변수 확장 같은 공통 문법도 함께 다루므로, 다른 예제에서도 그대로 적용할 수 있다.

## 예제 1: GitHub MCP 구성

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

### Pull Request 관리

- `list_prs` - 저장소의 모든 PR 나열
- `get_pr` - diff를 포함한 PR 세부 정보 가져오기
- `create_pr` - 새 PR 생성
- `update_pr` - PR 설명/제목 업데이트
- `merge_pr` - PR을 메인 브랜치에 병합
- `review_pr` - 리뷰 코멘트 추가

**요청 예시:**

```text
/mcp__github__get_pr 456

# Returns:
Title: Add dark mode support
Author: @alice
Description: Implements dark theme using CSS variables
Status: OPEN
Reviewers: @bob, @charlie
```

### 이슈 관리

- `list_issues` - 모든 이슈 나열
- `get_issue` - 이슈 세부 정보 가져오기
- `create_issue` - 새 이슈 생성
- `close_issue` - 이슈 닫기
- `add_comment` - 이슈에 코멘트 추가

### 저장소 정보

- `get_repo_info` - 저장소 세부 정보
- `list_files` - 파일 트리 구조
- `get_file_content` - 파일 내용 읽기
- `search_code` - 코드베이스 전체 검색

### 커밋 작업

- `list_commits` - 커밋 히스토리
- `get_commit` - 특정 커밋 세부 정보
- `create_commit` - 새 커밋 생성

**설정**:

```bash
export GITHUB_TOKEN="your_github_token"
# Or use the CLI to add directly:
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

## 구성에서 환경 변수 확장

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

## 예제 2: Database MCP 설정

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

## 예제 3: 다중 MCP 워크플로우

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

## 예제 4: Filesystem MCP 작업

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
