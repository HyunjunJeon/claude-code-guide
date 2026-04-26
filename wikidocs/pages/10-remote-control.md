Remote Control은 로컬에서 실행 중인 Claude Code 세션을 `claude.ai/code`나 Claude 모바일 앱에서 이어서 조작하는 기능입니다. 실행은 계속 사용자의 컴퓨터에서 일어나므로 로컬 파일, MCP 서버, 프로젝트 설정을 그대로 사용할 수 있습니다.

## 언제 쓰면 좋은가

- 책상에서 시작한 로컬 작업을 모바일이나 다른 브라우저에서 이어가고 싶을 때
- 로컬 MCP 서버와 개발 도구는 유지하면서 웹 UI를 사용하고 싶을 때
- 긴 작업이 끝났을 때 모바일 알림을 받고 다음 결정을 내리고 싶을 때

## 시작 방법

```bash
claude remote-control
claude --remote-control
claude --rc
```

세션 안에서는 다음 명령으로 시작할 수 있습니다.

```text
/remote-control
/rc
```

## Web 세션과의 차이

| 항목 | Remote Control | Claude Code on the Web |
|---|---|---|
| 실행 위치 | 사용자의 로컬 머신 | Anthropic 관리 클라우드 |
| 로컬 도구 접근 | 가능 | 제한적 |
| 적합한 상황 | 진행 중인 로컬 작업 계속하기 | 로컬 설정 없이 새 작업 시작하기 |

## 주의할 점

- 로컬 `claude` 프로세스가 계속 실행 중이어야 합니다.
- 대화형 선택 UI가 필요한 일부 명령은 로컬 CLI에서만 편합니다.
- `/ultraplan`처럼 같은 웹 인터페이스를 점유하는 기능과는 충돌할 수 있습니다.
- Team/Enterprise 환경에서는 조직 정책에 따라 비활성화되어 있을 수 있습니다.
