
# Checkpoint과 Rewind

Checkpoint을 사용하면 대화 상태를 저장하고 Claude Code 세션의 이전 지점으로 rewind할 수 있습니다. 이 기능은 다양한 접근 방식을 탐색하거나, 실수를 복구하거나, 대안 솔루션을 비교할 때 매우 유용합니다.

## 개요

Checkpoint을 사용하면 대화 상태를 저장하고 이전 지점으로 rewind할 수 있어, 안전한 실험과 다양한 접근 방식 탐색이 가능합니다. Checkpoint은 다음을 포함하는 대화 상태의 스냅샷입니다:
- 주고받은 모든 메시지
- 수행된 파일 수정
- 도구 사용 이력
- 세션 컨텍스트

Checkpoint은 다양한 접근 방식을 탐색하거나, 실수를 복구하거나, 대안 솔루션을 비교할 때 매우 유용합니다.

## 핵심 개념

| 개념 | 설명 |
|---------|-------------|
| **Checkpoint** | 메시지, 파일, 컨텍스트를 포함하는 대화 상태의 스냅샷 |
| **Rewind** | 이전 checkpoint로 되돌아가며, 이후 변경 사항을 폐기 |
| **Branch Point** | 여러 접근 방식을 탐색하기 위한 기준 checkpoint |

## Checkpoint 접근 방법

두 가지 주요 방법으로 checkpoint에 접근하고 관리할 수 있습니다:

### 키보드 단축키 사용
`Esc`를 두 번 누르면(`Esc` + `Esc`) checkpoint 인터페이스가 열리고 저장된 checkpoint을 탐색할 수 있습니다.

### Slash Command 사용
`/rewind` 명령어(별칭: `/checkpoint`)를 사용하여 빠르게 접근할 수 있습니다:

```bash
# Rewind 인터페이스 열기
/rewind

# 또는 별칭 사용
/checkpoint
```

## Rewind 옵션

Rewind할 때 다섯 가지 옵션이 제시됩니다:

1. **코드와 대화 복원** -- 파일과 메시지 모두를 해당 checkpoint 시점으로 되돌립니다
2. **대화 복원** -- 메시지만 rewind하고, 현재 코드는 그대로 유지합니다
3. **코드 복원** -- 파일 변경만 되돌리고, 전체 대화 이력은 유지합니다
4. **여기서부터 요약** -- 이 지점 이후의 대화를 AI가 생성한 요약으로 압축하여 컨텍스트 윈도우 공간을 확보합니다. 선택한 지점 이전의 메시지는 그대로 유지됩니다. 디스크의 파일은 변경되지 않습니다. 원본 메시지는 세션 기록에 보존됩니다. 선택적으로 특정 주제에 초점을 맞추도록 지시를 제공할 수 있습니다.
5. **취소** -- 취소하고 현재 상태로 돌아갑니다

### 복원과 요약의 차이

앞의 세 가지 옵션은 진짜 복원 동작입니다. 선택한 checkpoint를 기준으로 코드, 대화, 또는 둘 다를 이전 상태 쪽으로 되돌립니다.

반면 `여기서부터 요약`은 다르게 동작합니다:

- 디스크의 파일을 복원하지 않습니다
- 보존된 세션 transcript 자체를 다시 쓰지 않습니다
- 대신 선택한 시점 이후의 대화 상세를 요약으로 압축해서 현재 컨텍스트 부담을 줄입니다

이전 작업 상태로 실제로 돌아가고 싶다면 복원 계열 옵션을 사용합니다.

현재 코드는 유지한 채 대화 이력만 압축하고 싶다면 `여기서부터 요약`을 사용합니다.

> **참고**: 대화를 복원하거나 요약한 후, 선택한 메시지의 원본 프롬프트가 입력 필드에 복원되어 다시 전송하거나 편집할 수 있습니다.

## 자동 Checkpoint

Claude Code는 자동으로 checkpoint을 생성합니다:

- **모든 사용자 프롬프트** - 각 사용자 입력마다 새로운 checkpoint이 생성됩니다
- **영구 보존** - Checkpoint은 세션 간에 유지됩니다
- **자동 정리** - 30일 후 checkpoint이 자동으로 정리됩니다

즉, 몇 분 전부터 며칠 전까지 대화의 어떤 이전 지점으로든 항상 rewind할 수 있습니다.

## 사용 사례

| 시나리오 | 워크플로우 |
|----------|----------|
| **접근 방식 탐색** | 저장 → 방법 A 시도 → 저장 → Rewind → 방법 B 시도 → 비교 |
| **안전한 리팩터링** | 저장 → 리팩터링 → 테스트 → 실패 시: Rewind |
| **A/B 테스트** | 저장 → 디자인 A → 저장 → Rewind → 디자인 B → 비교 |
| **실수 복구** | 문제 발견 → 마지막 정상 상태로 Rewind |

## Checkpoint 사용하기

### 보기 및 Rewind

`Esc`를 두 번 누르거나 `/rewind`를 사용하여 checkpoint 브라우저를 엽니다. 타임스탬프와 함께 사용 가능한 모든 checkpoint 목록이 표시됩니다. 원하는 checkpoint을 선택하면 해당 상태로 rewind됩니다.

### Checkpoint 상세 정보

각 checkpoint에는 다음이 표시됩니다:
- 생성된 시간의 타임스탬프
- 수정된 파일
- 대화의 메시지 수
- 사용된 도구

## 실용적인 예제

### 예제 1: 다양한 접근 방식 탐색

```
User: Let's add a caching layer to the API

Claude: I'll add Redis caching to your API endpoints...
[Makes changes at checkpoint A]

User: Actually, let's try in-memory caching instead

Claude: I'll rewind to explore a different approach...
[User presses Esc+Esc and rewinds to checkpoint A]
[Implements in-memory caching at checkpoint B]

User: Now I can compare both approaches
```

### 예제 2: 실수 복구

```
User: Refactor the authentication module to use JWT

Claude: I'll refactor the authentication module...
[Makes extensive changes]

User: Wait, that broke the OAuth integration. Let's go back.

Claude: I'll help you rewind to before the refactoring...
[User presses Esc+Esc and selects the checkpoint before the refactor]

User: Let's try a more conservative approach this time
```

### 예제 3: 안전한 실험

```
User: Let's try rewriting this in a functional style
[Creates checkpoint before experiment]

Claude: [Makes experimental changes]

User: The tests are failing. Let's rewind.
[User presses Esc+Esc and rewinds to the checkpoint]

Claude: I've rewound the changes. Let's try a different approach.
```

### 예제 4: 분기 접근 방식

```
User: I want to compare two database designs
[Takes note of checkpoint - call it "Start"]

Claude: I'll create the first design...
[Implements Schema A]

User: Now let me go back and try the second approach
[User presses Esc+Esc and rewinds to "Start"]

Claude: Now I'll implement Schema B...
[Implements Schema B]

User: Great! Now I have both schemas to choose from
```

## Checkpoint 보존 기간

Claude Code는 checkpoint을 자동으로 관리합니다:

- 모든 사용자 프롬프트마다 자동으로 checkpoint이 생성됩니다
- 오래된 checkpoint은 최대 30일간 보존됩니다
- 무제한 저장 공간 증가를 방지하기 위해 checkpoint이 자동으로 정리됩니다

## 워크플로우 패턴

### 탐색을 위한 분기 전략

여러 접근 방식을 탐색할 때:

```
1. 초기 구현 시작 → Checkpoint A
2. 접근 방식 1 시도 → Checkpoint B
3. Checkpoint A로 Rewind
4. 접근 방식 2 시도 → Checkpoint C
5. B와 C의 결과 비교
6. 최선의 접근 방식을 선택하고 계속 진행
```

### 안전한 리팩터링 패턴

중요한 변경을 할 때:

```
1. 현재 상태 → Checkpoint (자동)
2. 리팩터링 시작
3. 테스트 실행
4. 테스트 통과 → 작업 계속
5. 테스트 실패 → Rewind하고 다른 접근 방식 시도
```

## 모범 사례

Checkpoint은 자동으로 생성되므로 수동으로 상태를 저장하는 것에 대해 걱정하지 않고 작업에 집중할 수 있습니다. 다만 다음 사항을 염두에 두세요:

### 효과적인 Checkpoint 사용

✅ **권장 사항:**
- Rewind하기 전에 사용 가능한 checkpoint을 검토하세요
- 다른 방향을 탐색하고 싶을 때 rewind를 사용하세요
- 다양한 접근 방식을 비교하기 위해 checkpoint을 활용하세요
- 각 rewind 옵션의 기능을 이해하세요 (코드와 대화 복원, 대화 복원, 코드 복원, 또는 요약)

❌ **주의 사항:**
- 코드 보존을 checkpoint에만 의존하지 마세요
- Checkpoint이 외부 파일 시스템 변경을 추적하기를 기대하지 마세요
- Checkpoint을 git 커밋의 대체물로 사용하지 마세요

## 설정

Checkpoint은 Claude Code의 기본 내장 기능이며 활성화하기 위한 별도의 설정이 필요하지 않습니다. 모든 사용자 프롬프트가 자동으로 checkpoint을 생성합니다.

유일한 checkpoint 관련 설정은 세션과 checkpoint의 보존 기간을 제어하는 `cleanupPeriodDays`입니다:

```json
{
  "cleanupPeriodDays": 30
}
```

- `cleanupPeriodDays`: 세션 이력과 checkpoint을 보존할 일수 (기본값: `30`)

## 제한 사항

Checkpoint에는 다음과 같은 제한 사항이 있습니다:

- **Bash 명령어 변경 미추적** - 파일 시스템의 `rm`, `mv`, `cp` 같은 작업은 checkpoint에 캡처되지 않습니다
- **외부 변경 미추적** - Claude Code 외부(편집기, 터미널 등)에서 수행된 변경은 캡처되지 않습니다
- **버전 관리 대체 불가** - 코드베이스의 영구적이고 감사 가능한 변경에는 git을 사용하세요

## 문제 해결

### Checkpoint 누락

**문제**: 예상한 checkpoint을 찾을 수 없음

**해결 방법**:
- Checkpoint이 정리되었는지 확인하세요
- 디스크 공간을 확인하세요
- `cleanupPeriodDays`가 충분히 높게 설정되어 있는지 확인하세요 (기본값: 30일)

### Rewind 실패

**문제**: Checkpoint으로 rewind할 수 없음

**해결 방법**:
- 커밋되지 않은 변경 사항이 충돌하지 않는지 확인하세요
- Checkpoint이 손상되지 않았는지 확인하세요
- 다른 checkpoint으로 rewind를 시도하세요

## Git과의 통합

Checkpoint은 git을 보완하지만 대체하지는 않습니다:

| 기능 | Git | Checkpoint |
|---------|-----|-------------|
| 범위 | 파일 시스템 | 대화 + 파일 |
| 영속성 | 영구적 | 세션 기반 |
| 세밀도 | 커밋 단위 | 모든 시점 |
| 속도 | 느림 | 즉시 |
| 공유 | 가능 | 제한적 |

둘을 함께 사용하세요:
1. 빠른 실험에 checkpoint을 사용하세요
2. 확정된 변경에 git 커밋을 사용하세요
3. Git 작업 전에 checkpoint을 생성하세요
4. 성공한 checkpoint 상태를 git에 커밋하세요

## 빠른 시작 가이드

### 기본 워크플로우

1. **정상적으로 작업** - Claude Code가 자동으로 checkpoint을 생성합니다
2. **돌아가고 싶으신가요?** - `Esc`를 두 번 누르거나 `/rewind`를 사용하세요
3. **Checkpoint 선택** - 목록에서 선택하여 rewind합니다
4. **복원 대상 선택** - 코드와 대화 복원, 대화 복원, 코드 복원, 여기서부터 요약, 또는 취소 중에서 선택합니다
5. **작업 계속** - 해당 시점으로 돌아갑니다

### 키보드 단축키

- **`Esc` + `Esc`** - Checkpoint 브라우저 열기
- **`/rewind`** - Checkpoint에 접근하는 대체 방법
- **`/checkpoint`** - `/rewind`의 별칭

## Rewind 시점 판단: 컨텍스트 모니터링

Checkpoint을 사용하면 되돌아갈 수 있습니다 — 하지만 *언제* 되돌아가야 하는지 어떻게 알 수 있을까요? 대화가 길어지면 Claude의 컨텍스트 윈도우가 가득 차고 모델 품질이 눈에 띄지 않게 저하됩니다. 반쯤 눈이 먼 모델의 코드를 그대로 배포하고 있을 수도 있습니다.

Claude Code의 컨텍스트 윈도우 사용량을 모니터링하면, 품질이 저하되기 전에 적절한 시점에 checkpoint를 만들고 rewind할 수 있습니다.

## 관련 개념

- **[고급 기능](../../09-advanced-features/)** - Plan mode 및 기타 고급 기능
- **[메모리 관리](../../02-memory/)** - 대화 이력 및 컨텍스트 관리
- **[Slash Command](../../01-slash-commands/)** - 사용자 호출 단축키
- **[Hook](../../06-hooks/)** - 이벤트 기반 자동화
- **[Plugin](../../07-plugins/)** - 번들 확장 패키지

## 추가 리소스

- [공식 Checkpoint 문서](https://code.claude.com/docs/ko/checkpointing)
- [고급 기능 가이드](../../09-advanced-features/) - Extended thinking 및 기타 기능

## 요약

Checkpoint은 Claude Code의 자동 기능으로, 작업 손실에 대한 걱정 없이 다양한 접근 방식을 안전하게 탐색할 수 있게 해줍니다. 모든 사용자 프롬프트가 자동으로 새로운 checkpoint을 생성하므로, 세션의 어떤 이전 지점으로든 rewind할 수 있습니다.

주요 이점:
- 여러 접근 방식을 두려움 없이 실험할 수 있습니다
- 실수로부터 빠르게 복구할 수 있습니다
- 다양한 솔루션을 나란히 비교할 수 있습니다
- 버전 관리 시스템과 안전하게 통합할 수 있습니다

기억하세요: checkpoint은 git을 대체하지 않습니다. 빠른 실험에는 checkpoint을, 영구적인 코드 변경에는 git을 사용하세요.

---
