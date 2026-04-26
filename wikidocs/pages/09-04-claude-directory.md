Claude Code는 프로젝트와 `~/.claude`에서 지시문, 설정, skills, subagents, 메모리를 읽습니다. 이 페이지는 어떤 커스터마이징을 어디에 두어야 하는지 빠르게 찾기 위한 실전 지도입니다.

## 두 가지 범위

- 프로젝트 범위: 저장소 안에 두고 팀과 공유할 수 있는 파일
- 전역 범위: `~/.claude` 아래 두고 모든 프로젝트에 적용하는 개인 설정

Windows에서는 `~/.claude`가 `%USERPROFILE%\\.claude` 아래로 해석됩니다. `CLAUDE_CONFIG_DIR`를 쓰면 그 경로가 기준이 됩니다.

## 먼저 필요한 최소 파일

대부분의 팀은 우선 이 네 가지면 충분합니다.

- `CLAUDE.md`
- `settings.json`
- `settings.local.json`
- `.mcp.json`

나머지는 필요가 생길 때 추가하면 됩니다.

## 어떤 파일을 써야 하나

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 프로젝트 규칙과 상시 지침 | `CLAUDE.md` |
| 권한, hooks, env, 모델 기본값 | `settings.json` |
| 개인용 프로젝트 오버라이드 | `settings.local.json` |
| 팀 공유 MCP 서버 | `.mcp.json` |
| 재사용 프롬프트와 워크플로 | `skills/<name>/SKILL.md` |
| 커스텀 슬래시 명령 스타일 프롬프트 | `commands/*.md` |
| 출력 형식 스타일 | `output-styles/*.md` |
| 전문화된 subagent 정의 | `agents/*.md` |
| subagent의 지속 메모리 | `agent-memory/<name>/` |
| worktree 파일 복사 규칙 | `.worktreeinclude` |

## 중요한 파일 역할

### `CLAUDE.md`

대부분 프로젝트에서 가장 가치가 큰 파일입니다. 여기에 두면 좋은 것:

- 코딩 컨벤션
- 선호 도구
- 검증 규칙
- 아키텍처 맥락
- 압축 후에도 남겨야 하는 compact instructions

### `settings.json`

다음 설정에 사용합니다.

- 권한 규칙
- hooks
- 환경 변수
- 모델 기본값

단, 현재 세션에서는 CLI 플래그가 `settings.json`을 덮을 수 있습니다.

### `settings.local.json`

개인용 오버라이드를 위해 씁니다. Git에 올리지 않는 프로젝트 전용 설정입니다.

### `.mcp.json`

프로젝트 MCP 설정은 `.claude/` 아래가 아니라 저장소 루트에 둡니다.

## 탐색기에 나오지 않는 것

관련 파일 중 일부는 다른 위치에 있습니다.

- 조직이 강제하는 managed settings
- 프로젝트 루트의 `CLAUDE.local.md`
- `~/.claude/plugins` 아래 설치된 플러그인 데이터

또한 `~/.claude`에는 세션 기록, 파일 스냅샷, 캐시, 로그, 프롬프트 기록 같은 운영 데이터도 저장됩니다.

## 우선순위와 오버라이드

작성한 설정을 덮어쓸 수 있는 것들:

- 조직의 managed settings
- `--permission-mode`, `--settings` 같은 CLI 플래그
- 일부 환경 변수
- `settings.json`을 덮는 `settings.local.json`

설정이 먹지 않을 때는 우선순위를 먼저 확인하는 편이 맞습니다.

## 자주 나오는 문제

공식 문서가 반복적으로 지적하는 실수는 다음과 같습니다.

- hooks를 `settings.json` 안이 아니라 별도 hooks 파일에 두는 것
- 프로젝트 MCP 설정을 루트 `.mcp.json`이 아니라 `.claude/` 아래에 두는 것
- hook matcher에 소문자 도구 이름을 쓰는 것
- `settings.json`의 env가 MCP 자식 프로세스에도 자동 전달된다고 생각하는 것
- 하위 디렉터리 `CLAUDE.md`가 세션 시작 시 바로 로드된다고 생각하는 것

## 현재 세션에서 실제로 로드된 것 확인

다음 명령이 유용합니다.

- `/context`
- `/memory`
- `/agents`
- `/hooks`
- `/mcp`
- `/skills`
- `/permissions`
- `/doctor`

먼저 `/context`로 큰 그림을 본 뒤 세부 명령으로 내려가는 방식이 좋습니다.

## 애플리케이션 데이터와 개인정보

`~/.claude`에는 다음 같은 평문 데이터가 저장될 수 있습니다.

- 세션 transcript
- 큰 tool 결과
- 체크포인트용 파일 히스토리
- 디버그 로그
- 프롬프트 이력
- 토큰/비용 캐시

즉, 도구가 비밀 정보를 읽으면 그 내용이 디스크 transcript에 남을 수 있습니다. 공식 문서는 보관 기간 단축, 민감 경로 읽기 차단, 필요 시 persistence 비활성화를 권장합니다.

## 관련 가이드

- [How Claude Code Works](09-19-how-claude-code-works.md)
- [Settings System Guide](09-27-settings-system-guide.md)
- [Output Styles](09-20-output-styles.md)
- [MCP](05-mcp.md)

## 공식 출처

- [Explore the .claude directory](https://code.claude.com/docs/ko/claude-directory)
