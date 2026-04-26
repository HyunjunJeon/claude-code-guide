이 섹션은 plugin의 개념을 익힌 뒤 실제 패키지 예제를 읽는 곳입니다. DevOps 자동화, 문서화, PR 리뷰처럼 팀에서 반복되는 워크플로를 plugin으로 어떻게 묶는지 확인합니다.

## 추천 읽기 순서

| 순서 | 묶음 | 읽는 이유 |
|---|---|---|
| 1 | DevOps Automation Plugin | 배포, 장애 대응, 상태 확인 명령을 plugin으로 묶는 흐름 |
| 2 | Documentation Plugin | 문서 생성 agent, command, template를 함께 배포하는 방식 |
| 3 | PR Review Plugin | 성능·보안·테스트 리뷰 agent를 하나의 리뷰 workflow로 구성 |

## 읽는 기준

- plugin을 처음 만든다면 먼저 Plugins 핵심 섹션에서 구조와 설치 흐름을 읽습니다.
- 팀 표준 workflow를 배포하려면 예제의 agents, commands, templates 디렉터리 역할을 비교합니다.
- 실서비스에 적용하기 전에는 권한, 업데이트, persistent data 위치를 다시 확인합니다.
