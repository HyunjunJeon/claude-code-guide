이 문서는 plugin 디렉토리가 가질 수 있는 전체 파일 트리 구조를 한 번에 보여 주고, 각 디렉토리(`commands/`, `agents/`, `skills/`, `hooks/`, `bin/` 등)가 어떤 역할을 하는지 설명합니다. plugin을 새로 만들 때 어떤 폴더를 어디에 두어야 Claude Code가 제대로 인식하는지 확인할 때 참고하세요. 백그라운드 모니터와 LSP 서버 같은 고급 기능 설정도 함께 다룹니다.

```text
my-plugin/
├── .claude-plugin/
│   └── plugin.json       # 매니페스트 (이름, 설명, 버전, 작성자)
├── commands/             # 마크다운 파일로 된 Skills
│   ├── task-1.md
│   ├── task-2.md
│   └── workflows/
├── agents/               # 커스텀 에이전트 정의
│   ├── specialist-1.md
│   ├── specialist-2.md
│   └── configs/
├── skills/               # SKILL.md 파일이 있는 Agent Skills
│   ├── skill-1.md
│   └── skill-2.md
├── hooks/                # hooks.json의 이벤트 핸들러
│   └── hooks.json
├── .mcp.json             # MCP 서버 설정
├── .lsp.json             # 코드 인텔리전스를 위한 LSP 서버 설정
├── monitors/             # monitors.json에 정의된 백그라운드 모니터
│   └── monitors.json
├── bin/                  # plugin 활성화 시 Bash 도구의 PATH에 추가되는 실행 파일
├── settings.json         # plugin 활성화 시 적용되는 기본 설정 (현재 `agent` 및 `subagentStatusLine` 키 지원)
├── templates/
│   └── issue-template.md
├── scripts/
│   ├── helper-1.sh
│   └── helper-2.py
├── docs/
│   ├── README.md
│   └── USAGE.md
└── tests/
    └── plugin.test.js
```

## 백그라운드 모니터

Plugin은 `monitors/monitors.json` 파일을 통해 백그라운드 모니터를 정의할 수 있습니다. 모니터는 plugin이 활성화되면 자동으로 시작되며, stdout의 각 줄이 Claude에게 알림으로 전달됩니다.

```json
[
  {
    "name": "error-log",
    "command": "tail -F ./logs/error.log",
    "description": "Application error log"
  }
]
```

## LSP 서버 설정

Plugin은 실시간 코드 인텔리전스를 위한 Language Server Protocol(LSP) 지원을 포함할 수 있습니다. LSP 서버는 작업 중 진단, 코드 탐색, 심볼 정보를 제공합니다.

**설정 위치**:
- plugin 루트 디렉토리의 `.lsp.json` 파일
- `plugin.json`의 인라인 `lsp` 키

### 필드 참조

| 필드 | 필수 | 설명 |
|-------|----------|-------------|
| `command` | 예 | LSP 서버 바이너리 (PATH에 있어야 함) |
| `extensionToLanguage` | 예 | 파일 확장자를 언어 ID에 매핑 |
| `args` | 아니오 | 서버의 명령줄 인수 |
| `transport` | 아니오 | 통신 방법: `stdio` (기본값) 또는 `socket` |
| `env` | 아니오 | 서버 프로세스의 환경 변수 |
| `initializationOptions` | 아니오 | LSP 초기화 시 전송되는 옵션 |
| `settings` | 아니오 | 서버에 전달되는 작업공간 설정 |
| `workspaceFolder` | 아니오 | 작업공간 폴더 경로 재정의 |
| `startupTimeout` | 아니오 | 서버 시작 대기 최대 시간(ms) |
| `shutdownTimeout` | 아니오 | 정상 종료를 위한 최대 시간(ms) |
| `restartOnCrash` | 아니오 | 서버 충돌 시 자동 재시작 |
| `maxRestarts` | 아니오 | 포기 전 최대 재시작 시도 횟수 |

### 설정 예시

**Go (gopls)**:

```json
{
  "go": {
    "command": "gopls",
    "args": ["serve"],
    "extensionToLanguage": {
      ".go": "go"
    }
  }
}
```

**Python (pyright)**:

```json
{
  "python": {
    "command": "pyright-langserver",
    "args": ["--stdio"],
    "extensionToLanguage": {
      ".py": "python",
      ".pyi": "python"
    }
  }
}
```

**TypeScript**:

```json
{
  "typescript": {
    "command": "typescript-language-server",
    "args": ["--stdio"],
    "extensionToLanguage": {
      ".ts": "typescript",
      ".tsx": "typescriptreact",
      ".js": "javascript",
      ".jsx": "javascriptreact"
    }
  }
}
```

### 사용 가능한 LSP plugin

공식 마켓플레이스에는 사전 구성된 LSP plugin이 포함되어 있습니다:

| Plugin | 언어 | 서버 바이너리 | 설치 명령 |
|--------|----------|---------------|----------------|
| `pyright-lsp` | Python | `pyright-langserver` | `pip install pyright` |
| `typescript-lsp` | TypeScript/JavaScript | `typescript-language-server` | `npm install -g typescript-language-server typescript` |
| `rust-lsp` | Rust | `rust-analyzer` | `rustup component add rust-analyzer`로 설치 |

### LSP 기능

구성이 완료되면 LSP 서버는 다음을 제공합니다:

- **즉시 진단** -- 편집 직후 오류와 경고가 표시됩니다
- **코드 탐색** -- 정의로 이동, 참조 찾기, 구현체 찾기
- **호버 정보** -- 호버 시 타입 시그니처와 문서 표시
- **심볼 목록** -- 현재 파일이나 작업공간의 심볼 탐색
