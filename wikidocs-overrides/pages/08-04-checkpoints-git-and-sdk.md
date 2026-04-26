# Checkpoint, Git, SDK 비교

Checkpoint, git, Agent SDK의 file checkpointing은 모두 되돌리기와 관련이 있지만 쓰임새가 다릅니다. 혼동하지 않으면 실험 속도와 복구 안정성을 동시에 얻을 수 있습니다.

## 비교

| 도구 | 가장 적합한 용도 | 한계 |
|---|---|---|
| Claude Code checkpoint | 세션 중 빠른 실험, 대화와 코드 상태 복구 | 장기 보관과 협업 기준점에는 부적합 |
| Git | 확정된 작업 저장, 리뷰, 협업, 배포 기준점 | 대화 맥락이나 Claude의 시도 흐름은 보존하지 않음 |
| Agent SDK file checkpointing | SDK 기반 앱에서 도구 실행 전후 상태를 코드로 관리 | CLI 세션의 rewind UX와는 별도 설계가 필요 |

## 추천 사용법

- 탐색 단계: checkpoint로 빠르게 되돌릴 수 있게 둡니다.
- 결정 단계: 테스트가 통과한 상태를 git commit으로 고정합니다.
- 제품화 단계: SDK를 쓰는 앱이라면 파일 checkpoint 정책을 코드로 명시합니다.

## 연결해서 읽기

- Checkpoint 예제에서 실제 rewind 시나리오를 봅니다.
- Agent SDK의 파일 체크포인팅은 SDK 섹션에서 운영 코드 관점으로 다시 다룹니다.
- 권한과 보안 섹션을 함께 보면 어떤 작업을 자동화하고 어디서 사용자 승인을 받을지 정하기 쉽습니다.

