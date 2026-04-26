# 도구 참고

Claude Code에는 기본 제공 도구가 정해져 있습니다. 이 페이지의 도구 이름은 권한 규칙, 서브에이전트 도구 목록, 훅 매처에서 그대로 쓰는 정확한 문자열입니다. 새 기능이 필요하면 기본 도구를 임의로 늘리는 대신 MCP 서버를 연결하세요.

## 기본 제공 도구

| 도구 | 하는 일 | 권한 |
| --- | --- | --- |
| `Agent` | 자체 컨텍스트 창을 가진 서브에이전트를 실행합니다. | 아니요 |
| `AskUserQuestion` | 여러 선택지를 제시해 요구사항을 명확히 합니다. | 아니요 |
| `Bash` | 현재 환경에서 셸 명령을 실행합니다. | 예 |
| `CronCreate` | 현재 세션 안에서 반복 또는 1회성 프롬프트를 예약합니다. | 아니요 |
| `CronDelete` | 예약된 작업을 ID로 취소합니다. | 아니요 |
| `CronList` | 세션의 예약 작업 목록을 보여줍니다. | 아니요 |
| `Edit` | 특정 파일에 국소적인 편집을 적용합니다. | 예 |
| `EnterPlanMode` | 코드 작성 전에 계획을 세우는 모드로 전환합니다. | 아니요 |
| `EnterWorktree` | 격리된 git worktree를 만들거나 엽니다. | 아니요 |
| `ExitPlanMode` | 승인용 계획을 제시하고 plan mode를 종료합니다. | 예 |
| `ExitWorktree` | worktree 세션을 끝내고 원래 디렉터리로 돌아갑니다. | 아니요 |
| `Glob` | 패턴으로 파일을 찾습니다. | 아니요 |
| `Grep` | 파일 내용에서 패턴을 검색합니다. | 아니요 |
| `ListMcpResourcesTool` | 연결된 MCP 서버가 노출한 리소스를 나열합니다. | 아니요 |
| `LSP` | 언어 서버 기반 코드 인텔리전스를 제공합니다. | 아니요 |
| `Monitor` | 긴 실행 작업이나 로그를 백그라운드에서 감시합니다. | 예 |
| `NotebookEdit` | Jupyter 노트북 셀을 수정합니다. | 예 |
| `PowerShell` | Windows에서 PowerShell 명령을 직접 실행합니다. | 예 |
| `Read` | 파일 내용을 읽습니다. | 아니요 |
| `ReadMcpResourceTool` | URI로 특정 MCP 리소스를 읽습니다. | 아니요 |
| `SendMessage` | agent team 동료에게 메시지를 보내거나 서브에이전트를 재개합니다. | 아니요 |
| `Skill` | 메인 대화 안에서 skill을 실행합니다. | 예 |
| `TaskCreate` | 세션 작업 항목을 만듭니다. | 아니요 |
| `TaskGet` | 작업 세부 정보를 가져옵니다. | 아니요 |
| `TaskList` | 모든 작업과 상태를 나열합니다. | 아니요 |
| `TaskOutput` | 레거시 백그라운드 작업 출력 읽기 도구입니다. | 아니요 |
| `TaskStop` | 실행 중인 백그라운드 작업을 중지합니다. | 아니요 |
| `TaskUpdate` | 작업 메타데이터를 갱신하거나 삭제합니다. | 아니요 |
| `TeamCreate` | agent team을 만듭니다. | 아니요 |
| `TeamDelete` | agent team을 삭제합니다. | 아니요 |
| `ToolSearch` | tool search가 켜져 있을 때 지연 로드된 도구를 불러옵니다. | 아니요 |
| `TodoWrite` | 세션 작업 체크리스트를 관리합니다. | 아니요 |
| `WebFetch` | URL 내용을 가져옵니다. | 예 |
| `WebSearch` | 웹 검색을 수행합니다. | 예 |
| `Write` | 파일을 새로 만들거나 덮어씁니다. | 예 |

## 권한 메모

`Bash`, `Edit`, `Write`, `WebFetch`, `WebSearch`, `NotebookEdit`, `Monitor`, `Skill`은 기본적으로 승인이 필요합니다. `Read`, `Glob`, `Grep` 같은 읽기 전용 도구는 보통 승인이 필요하지 않습니다.

권한 규칙은 `Bash(npm run build)` 또는 `Read(./.env)`처럼 도구 이름과 선택적 지정자를 조합해 적습니다. Claude는 deny 규칙을 먼저, 그다음 ask, 마지막으로 allow 순서로 평가합니다.

`SendMessage`, `TeamCreate`, `TeamDelete`는 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`을 설정했을 때만 사용할 수 있습니다. `TaskOutput`은 deprecated이므로 작업 출력 파일을 직접 읽는 방식이 권장됩니다.

## 동작 참고

### Bash

`Bash`는 각 명령을 별도 프로세스로 실행합니다. 메인 세션에서는 `cd`로 바뀐 작업 디렉터리가 다음 Bash 호출로 이어질 수 있지만, 프로젝트 디렉터리나 추가 디렉터리 안에 있어야 합니다. 환경 변수는 Bash 호출 사이에 유지되지 않습니다. 계속 유지해야 하면 `CLAUDE_ENV_FILE` 또는 `SessionStart` 훅을 사용하세요.

### LSP

`LSP`는 언어 서버에서 코드 인텔리전스를 가져옵니다. 파일을 편집한 뒤 타입 오류와 경고를 자동으로 보고할 수 있고, 정의로 이동, 참조 검색, 타입 조회, 심볼 목록 보기, 인터페이스 구현 추적도 할 수 있습니다. 해당 언어의 code intelligence plugin을 설치해야 활성화됩니다.

### Monitor

`Monitor`는 로그, CI 상태, 디렉터리 변경, 장시간 실행 스크립트를 대화가 멈추지 않도록 백그라운드에서 감시할 때 씁니다. Claude Code v2.1.98 이상이 필요하고, `Bash`와 같은 권한 규칙을 사용하며, Amazon Bedrock, Google Vertex AI, Microsoft Foundry에서는 사용할 수 없습니다. 텔레메트리나 비필수 트래픽이 꺼져 있어도 사용할 수 없습니다.

### PowerShell

`PowerShell`은 선택형 미리보기 기능입니다. Windows에서는 Git Bash로 우회하지 않고 PowerShell 명령을 직접 실행할 수 있습니다. Linux, macOS, WSL에서는 PowerShell 7 이상과 `pwsh`가 `PATH`에 있어야 합니다. 미리보기 제한으로는 Auto mode 미지원, PowerShell 프로필 미로드, Windows에서 sandbox 미지원, 그리고 Claude Code 시작에는 여전히 Git Bash가 필요하다는 점이 있습니다.

## 사용 가능한 도구 확인

실제 사용 가능 도구는 provider, platform, settings에 따라 달라집니다. 실행 중인 세션에서 확인하려면 Claude에게 이렇게 물어보세요.

```plaintext
What tools do you have access to?
```

정확한 MCP 도구 이름은 `/mcp`로 확인합니다.

## 공식 출처

- https://code.claude.com/docs/ko/tools-reference
- https://code.claude.com/docs/ko/settings
- https://code.claude.com/docs/ko/permissions
- https://code.claude.com/docs/ko/mcp
