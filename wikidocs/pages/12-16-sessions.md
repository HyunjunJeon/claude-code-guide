세션은 Agent SDK가 쌓아 두는 대화 기록입니다. 프롬프트, 도구 호출, 도구 결과, 모델 응답을 함께 저장해서 나중에 같은 작업을 이어갈 수 있게 합니다.

## 무엇인가

세션은 파일 시스템 스냅샷이 아니라 대화 기록과 메타데이터입니다. SDK가 자동으로 디스크에 저장하므로, 나중에 같은 흐름으로 돌아오거나 분기할 수 있습니다.

## 언제 쓰는가

다음 상황에서 세션이 필요합니다.

- 한 프로세스 안에서 여러 턴을 이어가는 작업,
- 프로세스를 재시작한 뒤 이어서 진행해야 하는 경우,
- 같은 출발점에서 다른 접근을 시험하고 싶은 경우,
- 세션 조회, 정리, 분류가 필요한 경우.

## 멘탈 모델

세션은 “Claude가 알고 있는 것”이지 “현재 파일 상태”가 아닙니다. Claude가 이미 읽은 파일, 수행한 분석, 내린 결정은 세션에 남습니다. 반대로 파일 변경을 되돌리려면 파일 체크포인팅을 써야 합니다.

## 핵심 API와 패턴

- Python의 `ClaudeSDKClient`는 세션 ID를 내부에서 관리합니다.
- TypeScript의 `continue: true`는 현재 디렉터리에서 가장 최근 세션을 이어갑니다.
- `resume`는 특정 세션 ID를 지정해서 복원합니다.
- `fork_session: true`는 원본 기록을 복사한 새 세션을 만듭니다.
- `persistSession: false`는 TypeScript에서만 메모리 세션으로 끝냅니다.
- `ResultMessage.session_id`를 저장해 두면 나중에 안전하게 이어갈 수 있습니다.
- `listSessions()`, `getSessionMessages()`, `getSessionInfo()`, `renameSession()`, `tagSession()`로 세션을 탐색하고 정리할 수 있습니다.

## 흔한 실수

- 다른 `cwd`에서 resume하는 것
- 세션이 다른 머신으로 자동 이동한다고 기대하는 것
- fork가 파일 변경까지 되돌린다고 생각하는 것
- Python도 메모리 전용 세션을 지원한다고 착각하는 것

## 관련 링크

- [에이전트 루프](12-01-agent-loop.md)
- [파일 체크포인팅](12-04-file-checkpointing.md)
- 공식 세션 가이드: https://code.claude.com/docs/ko/agent-sdk/sessions
- Python SDK: https://code.claude.com/docs/ko/agent-sdk/python
- TypeScript SDK: https://code.claude.com/docs/ko/agent-sdk/typescript
