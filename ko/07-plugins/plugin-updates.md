# 업데이트와 Auto-Update 동작

이 문서는 plugin 업데이트가 자동 백그라운드 작업이 아니라 명시적 lifecycle event로 다뤄야 하는 이유와 `claude plugin update` 명령의 동작을 설명합니다. 팀이 plugin 동작의 안정성을 보장해야 하는 운영 환경에서 어떤 통제 수단(version pinning, source pinning)을 갖춰야 하는지 정리합니다. silent update가 일어난다고 가정하지 말아야 한다는 점이 핵심입니다.

Plugin 업데이트는 자동으로 배경에서 조용히 바뀌는 동작이라기보다, 명시적인 lifecycle event로 취급하는 것이 맞습니다.

사용 명령:

```bash
claude plugin update
```

핵심 기대값:

- marketplace에 새 버전이 올라와도 설치된 복사본이 즉시 바뀌는 것은 아님
- silent background upgrade보다 명시적 update flow가 재현 가능성에 유리함
- 팀이 안정적 동작에 의존한다면 version pinning이 가장 안전함

## 현재 업데이트를 제어하는 표면

| Concern | Control surface | Notes |
|---|---|---|
| 설치된 plugin 업데이트 | `claude plugin update` | 명시적인 operator action |
| 설치 소스 고정 | Marketplace source / git ref / version | 재현 가능성에 가장 중요 |
| 로컬 수정 후 정의 다시 읽기 | `/reload-plugins` | 정의를 다시 읽을 뿐, build artifact를 재생성하지는 않음 |
| Auto-update 정책 | 문서화된 user-tunable background setting 없음 | 명시적 문서가 없는 silent-update control plane이 있다고 가정하지 말 것 |

즉:

- update는 explicit lifecycle action이고
- reload는 update가 아니며
- version/source pinning이 가장 안전한 운영 제어 수단입니다
