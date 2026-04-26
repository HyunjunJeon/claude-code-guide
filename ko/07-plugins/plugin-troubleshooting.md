# 문제 해결

이 문서는 plugin 설치 실패, 구성요소 미로드, MCP 연결 실패, 명령 미사용, hook 실행 오류 같은 자주 발생하는 문제 시나리오와 진단 단계를 정리합니다. plugin을 설치했는데 의도대로 동작하지 않을 때 가장 먼저 확인할 체크리스트로 참고하세요. 각 항목은 가능한 원인과 즉시 실행할 수 있는 점검 명령을 함께 제시합니다.

## Plugin이 설치되지 않음

- Claude Code 버전 호환성 확인: `/version`
- JSON 검증기로 `plugin.json` 구문 확인
- 인터넷 연결 확인 (원격 plugin의 경우)
- 권한 확인: `ls -la plugin/`

## 구성요소가 로드되지 않음

- `plugin.json`의 경로가 실제 디렉토리 구조와 일치하는지 확인
- 파일 권한 확인: `chmod +x scripts/`
- 구성요소 파일 구문 검토
- 로그 확인: `/plugin debug plugin-name`

## MCP 연결 실패

- 환경 변수가 올바르게 설정되었는지 확인
- MCP 서버 설치 및 상태 확인
- `/mcp test`로 MCP 연결을 독립적으로 테스트
- `mcp/` 디렉토리의 MCP 설정 검토

## 설치 후 명령을 사용할 수 없음

- plugin이 성공적으로 설치되었는지 확인: `/plugin list --installed`
- plugin이 활성화되었는지 확인: `/plugin status plugin-name`
- Claude Code 재시작: `exit` 후 다시 열기
- 기존 명령과 이름 충돌이 있는지 확인

## Hook 실행 문제

- hook 파일에 올바른 권한이 있는지 확인
- hook 구문 및 이벤트 이름 확인
- 오류 세부사항을 위해 hook 로그 검토
- 가능하면 hooks를 수동으로 테스트
