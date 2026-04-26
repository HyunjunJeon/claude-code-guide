이 문서는 누가(사용자 vs Claude) 어떤 스킬을 호출할 수 있는지 frontmatter 두 필드로 제어하는 방법을 설명합니다.
배포·커밋·외부 메시지 전송처럼 부작용이 있는 스킬, 또는 사용자에게 직접 노출하면 의미가 없는 배경 지식 스킬을 만들 때 필요합니다.
세 가지 호출 모드(기본·model 차단·user 차단)를 상황에 맞게 골라 쓰세요.

기본적으로 사용자와 Claude 모두 모든 스킬을 호출할 수 있습니다. 두 개의 frontmatter 필드가 세 가지 호출 모드를 제어합니다:

| Frontmatter | 사용자 호출 가능 | Claude 호출 가능 |
|---|---|---|
| (기본) | 예 | 예 |
| `disable-model-invocation: true` | 예 | 아니오 |
| `user-invocable: false` | 아니오 | 예 |

**`disable-model-invocation: true`는** 부작용이 있는 워크플로에 사용합니다: `/commit`, `/deploy`, `/send-slack-message`. 코드가 준비되어 보인다고 Claude가 배포를 결정하는 것을 원하지 않을 것입니다.

**`user-invocable: false`는** 명령으로는 의미 없는 배경 지식에 사용합니다. `legacy-system-context` 스킬은 이전 시스템의 작동 방식을 설명합니다. Claude에게는 유용하지만, 사용자에게는 의미 있는 액션이 아닙니다.
