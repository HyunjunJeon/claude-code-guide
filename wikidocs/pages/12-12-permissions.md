권한은 Claude가 어떤 도구를 쓸 수 있는지, 그리고 언제 사용자 승인이 필요한지를 정합니다. 파일 수정, 셸 명령, 기타 민감한 작업을 통제하는 핵심 안전장치입니다.

## 무엇인가

Agent SDK는 권한 모드, 선언형 규칙, 훅, 런타임 콜백을 함께 사용합니다. 이 조합이 도구 요청을 자동 허용할지, 차단할지, 아니면 승인을 요청할지를 결정합니다.

## 언제 쓰는가

다음이 필요할 때 사용합니다.

- 기본적으로 읽기 전용 에이전트로 두고 싶을 때,
- 신뢰 가능한 작업 공간에서 편집만 자동 승인하고 싶을 때,
- 위험한 명령을 차단하고 싶을 때,
- 계획만 만들고 실행은 막고 싶을 때,
- 사용자나 운영자 승인 흐름이 필요할 때.

## 멘탈 모델

권한 평가는 다음 순서로 흘러갑니다.

1. 훅이 도구 호출을 먼저 검사합니다.
2. `settings.json`의 `deny`, `allow`, `ask` 규칙이 적용됩니다.
3. 현재 권한 모드가 기본 동작을 정합니다.
4. 아직 결정되지 않으면 `canUseTool`이 판단합니다.

뒤 단계는 앞 단계의 명시적 거절을 무시하지 못합니다.

## 핵심 API와 패턴

- `permissionMode`를 `query(...)` 옵션으로 설정하고 스트리밍 중에도 바꿀 수 있습니다.
- `default`는 기본 승인 흐름입니다.
- `acceptEdits`는 파일 편집과 파일시스템 작업만 자동 승인합니다.
- `bypassPermissions`는 모든 프롬프트를 없애지만, 훅은 계속 실행됩니다.
- `plan`은 도구 실행을 막고 검토/제안 작업에 맞습니다.
- `allowedTools`, `disallowedTools`로 명시적인 도구 허용/차단을 할 수 있습니다.
- `settings.json`의 `allow`, `deny`, `ask` 규칙으로 선언형 정책을 둡니다.

## 흔한 실수

- `acceptEdits`가 Bash까지 자동 승인한다고 생각하는 것
- `bypassPermissions`를 통제되지 않은 환경에서 쓰는 것
- 하위 에이전트가 bypass 모드를 그대로 상속한다는 점을 놓치는 것
- plan 모드에서 실제 변경이 된다고 기대하는 것
- 훅이 권한 규칙을 대체한다고 생각하는 것

## 관련 링크

- [훅](https://wikidocs.net/345725)
- [세션](https://wikidocs.net/345719)
- 공식 권한 가이드: https://platform.claude.com/docs/en/agent-sdk/permissions
- 공식 에이전트 루프 가이드: https://code.claude.com/docs/ko/agent-sdk/agent-loop
