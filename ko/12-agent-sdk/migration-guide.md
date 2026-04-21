# 마이그레이션 가이드

마이그레이션 가이드는 예전 Claude Code SDK 사용 패턴에서 현재 Claude Agent SDK 모델로 옮기는 팀을 위한 문서입니다.

## 보통 무엇이 바뀌는가

자주 나오는 변화는 다음과 같습니다.

- "Claude Code SDK"에서 "Claude Agent SDK"로의 제품 명칭 변화
- 세션과 이벤트 기반 실행에 대한 비중 확대
- 권한, 훅, 도구의 경계가 더 분명해짐
- TypeScript와 Python 진입점의 정리

## 안전한 이전 전략

1. 기존 도구와 권한 가정을 목록화합니다.
2. 현재 워크플로를 새 세션/루프 모델에 대응시킵니다.
3. 작은 워크플로 하나부터 옮깁니다.
4. 넓게 배포하기 전에 관측성을 먼저 붙입니다.
5. 동작이 안정될 때까지 롤백 경로를 유지합니다.

## 흔한 실수

- 런타임 안전 모델은 다시 생각하지 않고 API 호출만 옮기는 것
- 제어 모델이 바뀌었는데도 예전 프롬프트 가정을 그대로 유지하는 것
- 도구를 쓰는 흐름에 대한 테스트를 생략하는 것

## 관련 링크

- [개요](./overview.md)
- [TypeScript](./typescript.md)
- [Python](./python.md)
- 공식 가이드: https://platform.claude.com/docs/en/agent-sdk/migration-guide
