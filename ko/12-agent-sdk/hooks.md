# 훅

훅은 Agent SDK의 라이프사이클 주변에서 코드를 실행하는 방법입니다. 감사 로그, 검증, 정책 집행, 컨텍스트 주입, 자동 후처리에 적합합니다.

## 무엇인가

훅은 Claude가 도구를 부르기 전, 호출한 뒤, 세션이 시작/종료될 때, 사용자가 프롬프트를 제출할 때처럼 특정 경계에서 실행되는 이벤트 기반 콜백 또는 명령입니다.

## 언제 쓰는가

다음이 필요할 때 사용합니다.

- 도구 사용 내역을 기록하거나 감사하고 싶을 때,
- 위험한 작업을 차단하고 싶을 때,
- Claude가 답하기 전에 추가 컨텍스트를 넣고 싶을 때,
- 출력 형식을 정리하거나 후처리하고 싶을 때,
- 작업 디렉터리 변경이나 파일 변화를 감시하고 싶을 때.

## 멘탈 모델

훅은 루프 자체가 아니라 루프를 둘러싼 제어층입니다. `PreToolUse`는 실행 전에 요청을 차단하거나 수정할 수 있고, `PostToolUse`는 도구가 이미 끝난 뒤 결과를 봅니다. 세션 훅과 프롬프트 훅은 라이프사이클 경계에서 동작합니다.

## 핵심 API와 패턴

- `settings.json`, `.claude/settings.local.json`, 사용자/프로젝트 설정에서 훅을 구성합니다.
- matcher로 도구 이름 범위를 좁힐 수 있습니다.
- 주요 이벤트는 `PreToolUse`, `PostToolUse`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `Notification`, `Stop`, `FileChanged`, `CwdChanged`입니다.
- 훅 출력은 exit code 또는 `permissionDecision`, `permissionDecisionReason`, `updatedInput`, `additionalContext`, `updatedMCPToolOutput` 같은 JSON 필드를 사용합니다.
- `CLAUDE_PROJECT_DIR`를 쓰면 현재 디렉터리에 의존하지 않고 프로젝트 스크립트를 안전하게 참조할 수 있습니다.

## 흔한 실수

- `PostToolUse`에서 도구 실행 자체를 막을 수 있다고 생각하는 것
- 변수 인용과 절대 경로를 빼먹은 취약한 셸 명령을 쓰는 것
- 설정 변경이 현재 세션에 즉시 반영된다고 기대하는 것
- 훅을 권한 설계의 대체물로 보는 것
- 훅이 임의의 셸 명령을 실행한다는 보안 전제를 가볍게 보는 것

## 관련 링크

- [권한](./permissions.md)
- [개요](./overview.md)
- 공식 훅 레퍼런스: https://code.claude.com/docs/ko/hooks
- 공식 훅 가이드: https://platform.claude.com/docs/en/agent-sdk/hooks
