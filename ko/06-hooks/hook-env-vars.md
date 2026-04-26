# 환경 변수

Claude Code가 hook 프로세스에 자동으로 주입하는 환경 변수 목록입니다. 어떤 변수가 어느 이벤트 범위에서 쓸 수 있는지 정리합니다.

| 변수 | 사용 가능 범위 | 설명 |
|----------|-------------|-------------|
| `CLAUDE_PROJECT_DIR` | 모든 hooks | 프로젝트 루트의 절대 경로 |
| `CLAUDE_ENV_FILE` | SessionStart, CwdChanged, FileChanged | 환경 변수를 유지하기 위한 파일 경로 |
| `CLAUDE_CODE_REMOTE` | 모든 hooks | 원격 환경에서 실행 중이면 `"true"` |
| `${CLAUDE_PLUGIN_ROOT}` | Plugin hooks | plugin 디렉토리 경로 |
| `${CLAUDE_PLUGIN_DATA}` | Plugin hooks | plugin 데이터 디렉토리 경로 |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | SessionEnd hooks | SessionEnd hooks의 설정 가능한 타임아웃(밀리초, 기본값 재정의) |
