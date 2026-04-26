`/ultrareview`는 Claude Code의 클라우드 샌드박스에서 깊은 원격 코드 리뷰를 실행하고, 검증된 버그 후보를 현재 CLI 세션으로 다시 돌려주는 기능입니다.

## 무엇인가

Ultrareview는 큰 변경을 위한 research preview 리뷰 워크플로입니다. 여러 리뷰 에이전트를 원격 샌드박스에 띄우고, 찾은 이슈를 독립적으로 검증해서 단순 스타일 지적보다 실제 버그 가능성이 높은 결과에 집중합니다.

공식 문서는 이를 로컬 `/review`보다 더 깊고 느리지만 병합 전 신뢰도가 높은 리뷰로 설명합니다.

## 요구사항

- Claude Code `v2.1.86` 이상
- `/login`을 통한 Claude.ai 인증
- Git 저장소

다음 경로에서는 사용할 수 없습니다.

- Amazon Bedrock
- Google Vertex AI
- Microsoft Foundry

또한 Zero Data Retention이 활성화된 조직에서는 사용할 수 없습니다.

## 실행 방법

브랜치 리뷰:

```plaintext
/ultrareview
```

현재 브랜치와 기본 브랜치의 diff를 리뷰하며, staged와 unstaged 변경도 포함합니다.

PR 리뷰:

```plaintext
/ultrareview 1234
```

PR 모드는 로컬 작업 트리를 번들하지 않고 GitHub에서 PR을 직접 clone합니다. 따라서 `github.com` remote가 필요합니다.

저장소가 너무 크면 Claude Code가 PR 모드로 전환하라고 안내합니다.

## 실행 전 확인 대화상자

시작 전에 Claude Code는 다음을 보여줍니다.

- 리뷰 범위
- 브랜치 리뷰 시 파일/라인 수
- 남아 있는 무료 실행 횟수
- 예상 비용

중요한 점은 `/ultrareview`는 명시적으로 호출할 때만 실행된다는 것입니다. Claude가 스스로 시작하지는 않습니다.

## 비용 모델

Ultrareview는 일반 포함 사용량이 아니라 extra usage로 과금됩니다.

공식 기준:

- Pro: 1회성 무료 `3`회 후 유료
- Max: 1회성 무료 `3`회 후 유료
- Team/Enterprise: 무료 없음, 처음부터 유료

공식 문서는 유료 리뷰가 보통 `$5`에서 `$20` 정도라고 설명합니다.

extra usage가 꺼져 있으면 실행이 차단되며, `/extra-usage`로 현재 설정을 확인할 수 있습니다.

## 실행 중 동작

Ultrareview는 백그라운드 작업으로 돌아가며 보통 `5`에서 `10`분 정도 걸립니다. 그동안 사용자는 다른 작업을 계속할 수 있습니다.

`/tasks`로 할 수 있는 일:

- 진행 상황 확인
- 리뷰 상세 보기
- 실행 중인 리뷰 중지

중지하면 클라우드 세션이 archive되고 부분 결과는 반환되지 않습니다.

## `/review`와의 차이

| 명령 | 적합한 용도 | 실행 위치 | 비용 |
|---|---|---|---|
| `/review` | 코딩 중 빠른 피드백 | 로컬, 수초~수분 | 일반 사용량 |
| `/ultrareview` | 병합 전 깊은 검토 | 원격, 약 5~10분 | extra usage |

작업 중 빠르게 확인할 때는 `/review`, 큰 변경을 병합 전에 한 번 깊게 볼 때는 `/ultrareview`가 맞습니다.

## 언제 써야 하나

다음에 적합합니다.

- 큰 PR
- 위험한 리팩터링
- 병합 전 신뢰도를 높이고 싶을 때
- 단일 로컬 리뷰 패스로는 놓칠 수 있는 버그 탐색

반대로 다음에는 과할 수 있습니다.

- 아주 작은 diff
- 아직 수정 중인 상태의 빠른 반복
- Claude.ai 인증 기반 원격 경로를 쓸 수 없는 환경

## 흔한 실수

- `/review`와 같은 속도와 비용일 거라고 생각하는 것
- PR 모드에 GitHub remote가 필요하다는 점을 놓치는 것
- extra usage 설정을 보지 않고 유료 리뷰를 시작하는 것
- 백그라운드 작업을 중지해도 부분 결과가 남을 거라고 생각하는 것

## 관련 가이드

- Code Review
- Web Quickstart
- Ultraplan

## 공식 출처

- [Find bugs with ultrareview](https://code.claude.com/docs/ko/ultrareview)
