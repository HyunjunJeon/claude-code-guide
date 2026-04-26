Martin Fowler의 *Refactoring: Improving the Design of Existing Code* (제2판)에 기반한 체계적인 리팩토링 접근법입니다. 이 스킬은 테스트로 뒷받침되는 안전하고 점진적인 변경을 강조합니다.

> "리팩토링은 코드의 외부 동작을 변경하지 않으면서 내부 구조를 개선하는 방식으로 소프트웨어 시스템을 변경하는 프로세스입니다." -- Martin Fowler

## 핵심 원칙

1. **동작 보존**: 외부 동작은 반드시 변경되지 않아야 합니다
2. **작은 단계**: 작고 테스트 가능한 변경을 합니다
3. **테스트 주도**: 테스트가 안전망입니다
4. **지속적**: 리팩토링은 일회성 이벤트가 아니라 지속적인 것입니다
5. **협력적**: 각 단계에서 사용자 승인이 필요합니다

## 워크플로 개요

```
Phase 1: Research & Analysis
    ↓
Phase 2: Test Coverage Assessment
    ↓
Phase 3: Code Smell Identification
    ↓
Phase 4: Refactoring Plan Creation
    ↓
Phase 5: Incremental Implementation
    ↓
Phase 6: Review & Iteration
```

---

## 1단계: 리서치 및 분석

### 목표
- 코드베이스 구조와 목적 이해
- 리팩토링 범위 파악
- 비즈니스 요구사항에 대한 컨텍스트 수집

### 사용자에게 할 질문
시작하기 전에 명확히 합니다:

1. **범위**: 어떤 파일/모듈/함수를 리팩토링해야 합니까?
2. **목표**: 어떤 문제를 해결하려고 합니까? (가독성, 성능, 유지보수성)
3. **제약 조건**: 변경하면 안 되는 영역이 있습니까?
4. **일정 압박**: 다른 작업을 차단하고 있습니까?
5. **테스트 상태**: 테스트가 존재합니까? 통과하고 있습니까?

### 액션
- [ ] 대상 코드를 읽고 이해합니다
- [ ] 의존성 및 통합을 파악합니다
- [ ] 현재 아키텍처를 문서화합니다
- [ ] 기존 기술 부채 마커를 기록합니다 (TODO, FIXME)

### 출력
사용자에게 발견 사항을 제시합니다:
- 코드 구조 요약
- 식별된 문제 영역
- 초기 권장 사항
- **진행 승인 요청**

---

## 2단계: 테스트 커버리지 평가

### 테스트가 중요한 이유
> "테스트 없이 리팩토링하는 것은 안전벨트 없이 운전하는 것과 같습니다." -- Martin Fowler

테스트는 안전한 리팩토링의 **핵심 요소**입니다. 테스트 없이는 버그를 도입할 위험이 있습니다.

### 평가 단계

1. **기존 테스트 확인**
   ```bash
   # 테스트 파일 찾기
   find . -name "*test*" -o -name "*spec*" | head -20
   ```

2. **기존 테스트 실행**
   ```bash
   # JavaScript/TypeScript
   npm test

   # Python
   pytest -v

   # Java
   mvn test
   ```

3. **커버리지 확인 (가능한 경우)**
   ```bash
   # JavaScript
   npm run test:coverage

   # Python
   pytest --cov=.
   ```

### 결정 시점: 사용자에게 질문

**테스트가 존재하고 통과하는 경우:**
- 3단계로 진행합니다

**테스트가 없거나 불완전한 경우:**
옵션을 제시합니다:
1. 먼저 테스트를 작성합니다 (권장)
2. 리팩토링 중 점진적으로 테스트를 추가합니다
3. 테스트 없이 진행합니다 (위험 - 사용자 확인 필요)

**테스트가 실패하는 경우:**
- 중지합니다. 리팩토링 전에 실패하는 테스트를 수정합니다
- 사용자에게 질문합니다: 먼저 테스트를 수정해야 할까요?

### 테스트 작성 가이드라인 (필요한 경우)

리팩토링되는 각 함수에 대해 테스트가 다음을 커버하도록 합니다:
- 정상 경로 (정상 작동)
- 엣지 케이스 (빈 입력, null, 경계값)
- 에러 시나리오 (잘못된 입력, 예외)

"red-green-refactor" 사이클을 사용합니다:
1. 실패하는 테스트 작성 (red)
2. 통과시키기 (green)
3. 리팩토링

---

## 3단계: 코드 스멜 식별

### 코드 스멜이란?
코드의 더 깊은 문제의 증상입니다. 버그는 아니지만 코드를 개선할 수 있다는 지표입니다.

### 확인할 일반적인 코드 스멜

전체 카탈로그는 [references/code-smells.md](03-12-refactor-references-code-smells.md)를 참조하십시오.

#### 빠른 참조

| 스멜 | 징후 | 영향 |
|-------|-------|--------|
| **Long Method** | 30-50줄 이상의 메서드 | 이해, 테스트, 유지보수가 어려움 |
| **Duplicated Code** | 여러 곳에 동일한 로직 | 여러 곳에서 버그 수정 필요 |
| **Large Class** | 책임이 너무 많은 클래스 | 단일 책임 원칙 위반 |
| **Feature Envy** | 다른 클래스의 데이터를 더 많이 사용하는 메서드 | 캡슐화 부족 |
| **Primitive Obsession** | 객체 대신 기본형의 과도한 사용 | 도메인 개념 누락 |
| **Long Parameter List** | 4개 이상의 파라미터를 가진 메서드 | 올바르게 호출하기 어려움 |
| **Data Clumps** | 함께 나타나는 동일한 데이터 항목 | 추상화 누락 |
| **Switch Statements** | 복잡한 switch/if-else 체인 | 확장하기 어려움 |
| **Speculative Generality** | "만약을 대비한" 코드 | 불필요한 복잡성 |
| **Dead Code** | 사용되지 않는 코드 | 혼란, 유지보수 부담 |

### 분석 단계

1. **자동화된 분석** (스크립트를 사용할 수 있는 경우)
   ```bash
   python scripts/detect-smells.py <file>
   ```

2. **수동 리뷰**
   - 코드를 체계적으로 살펴봅니다
   - 각 스멜의 위치와 심각도를 기록합니다
   - 영향별로 분류합니다 (Critical/High/Medium/Low)

3. **우선순위 결정**
   다음과 같은 스멜에 집중합니다:
   - 현재 개발을 차단하는 것
   - 버그나 혼란을 일으키는 것
   - 가장 자주 변경되는 코드 경로에 영향을 주는 것

### 출력: 스멜 보고서

사용자에게 제시합니다:
- 위치가 포함된 식별된 스멜 목록
- 각각의 심각도 평가
- 권장 우선순위 순서
- **우선순위에 대한 승인 요청**

---

## 4단계: 리팩토링 계획 작성

### 리팩토링 선택

각 스멜에 대해 카탈로그에서 적절한 리팩토링을 선택합니다.

전체 목록은 [references/refactoring-catalog.md](03-13-refactor-references-refactoring-catalog.md)를 참조하십시오.

#### 스멜-리팩토링 매핑

| 코드 스멜 | 권장 리팩토링 |
|------------|---------------------------|
| Long Method | Extract Method, Replace Temp with Query |
| Duplicated Code | Extract Method, Pull Up Method, Form Template Method |
| Large Class | Extract Class, Extract Subclass |
| Feature Envy | Move Method, Move Field |
| Primitive Obsession | Replace Primitive with Object, Replace Type Code with Class |
| Long Parameter List | Introduce Parameter Object, Preserve Whole Object |
| Data Clumps | Extract Class, Introduce Parameter Object |
| Switch Statements | Replace Conditional with Polymorphism |
| Speculative Generality | Collapse Hierarchy, Inline Class, Remove Dead Code |
| Dead Code | Remove Dead Code |

### 계획 구조

[templates/refactoring-plan.md](03-14-refactor-templates-refactoring-plan.md)의 템플릿을 사용합니다.

각 리팩토링에 대해:
1. **대상**: 어떤 코드가 변경될 것인지
2. **스멜**: 어떤 문제를 해결하는지
3. **리팩토링**: 어떤 기법을 적용할 것인지
4. **단계**: 상세한 마이크로 단계
5. **위험**: 무엇이 잘못될 수 있는지
6. **롤백**: 필요 시 어떻게 취소할 것인지

### 단계적 접근

**중요**: 리팩토링을 단계적으로 점진 도입합니다.

**Phase A: 빠른 성과** (낮은 위험, 높은 가치)
- 명확성을 위해 변수 이름 변경
- 명백한 중복 코드 추출
- 죽은 코드 제거

**Phase B: 구조적 개선** (중간 위험)
- 긴 함수에서 메서드 추출
- 파라미터 객체 도입
- 적절한 클래스로 메서드 이동

**Phase C: 아키텍처 변경** (높은 위험)
- 조건문을 다형성으로 교체
- 클래스 추출
- 디자인 패턴 도입

### 결정 시점: 사용자에게 계획 제시

구현 전에:
- 완전한 리팩토링 계획을 보여줍니다
- 각 단계와 위험을 설명합니다
- 각 단계에 대한 명시적 승인을 받습니다
- **질문합니다**: "Phase A를 진행할까요?"

---

## 5단계: 점진적 구현

### 골든 룰
> "변경 -> 테스트 -> 녹색? -> 커밋 -> 다음 단계"

### 구현 리듬

각 리팩토링 단계에 대해:

1. **사전 확인**
   - 테스트가 통과 중 (녹색)
   - 코드가 컴파일됨

2. **하나의 작은 변경 수행**
   - 카탈로그의 메커니즘을 따릅니다
   - 변경을 최소한으로 유지합니다

3. **검증**
   - 즉시 테스트를 실행합니다
   - 컴파일 에러를 확인합니다

4. **테스트 통과 시 (녹색)**
   - 설명적인 메시지와 함께 커밋합니다
   - 다음 단계로 이동합니다

5. **테스트 실패 시 (빨간색)**
   - 즉시 중지합니다
   - 변경을 취소합니다
   - 무엇이 잘못되었는지 분석합니다
   - 불확실한 경우 사용자에게 질문합니다

### 커밋 전략

각 커밋은 다음과 같아야 합니다:
- **원자적**: 하나의 논리적 변경
- **되돌릴 수 있는**: 쉽게 되돌릴 수 있음
- **설명적인**: 명확한 커밋 메시지

커밋 메시지 예시:
```
refactor: Extract calculateTotal() from processOrder()
refactor: Rename 'x' to 'customerCount' for clarity
refactor: Remove unused validateOldFormat() method
```

### 진행 보고

각 하위 단계 후 사용자에게 보고합니다:
- 수행된 변경 사항
- 테스트가 여전히 통과하는지?
- 발생한 문제
- **질문합니다**: "다음 배치를 계속할까요?"

---

## 6단계: 리뷰 및 반복

### 리팩토링 후 체크리스트

- [ ] 모든 테스트 통과
- [ ] 새로운 경고/에러 없음
- [ ] 코드가 성공적으로 컴파일됨
- [ ] 동작 변경 없음 (수동 검증)
- [ ] 필요한 경우 문서 업데이트됨
- [ ] 커밋 기록이 깔끔함

### 메트릭 비교

전후 복잡도 분석을 실행합니다:
```bash
python scripts/analyze-complexity.py <file>
```

개선 사항을 제시합니다:
- 코드 줄 수 변화
- 순환 복잡도 변화
- 유지보수성 지수 변화

### 사용자 리뷰

최종 결과를 제시합니다:
- 모든 변경 사항 요약
- 전/후 코드 비교
- 메트릭 개선
- 남아 있는 기술 부채
- **질문합니다**: "이 변경 사항에 만족하십니까?"

### 다음 단계

사용자와 논의합니다:
- 해결해야 할 추가 스멜?
- 후속 리팩토링 일정?
- 다른 곳에 유사한 변경 적용?

---

## 중요 가이드라인

### 중지하고 질문해야 할 때

항상 일시 중지하고 사용자에게 상담합니다:
- 비즈니스 로직이 불확실할 때
- 변경이 외부 API에 영향을 줄 수 있을 때
- 테스트 커버리지가 부족할 때
- 중요한 아키텍처 결정이 필요할 때
- 위험 수준이 증가할 때
- 예상치 못한 복잡성을 만났을 때

### 안전 규칙

1. **테스트 없이 절대 리팩토링하지 마십시오** (사용자가 명시적으로 위험을 인정하지 않는 한)
2. **큰 변경을 절대 하지 마십시오** - 작은 단계로 나눕니다
3. **각 변경 후 테스트 실행을 절대 건너뛰지 마십시오**
4. **테스트가 실패하면 절대 계속하지 마십시오** - 먼저 수정하거나 롤백합니다
5. **절대 가정하지 마십시오** - 의심스러우면 질문합니다

### 하지 말아야 할 것

- 리팩토링과 기능 추가를 결합하지 마십시오
- 프로덕션 긴급 상황 중에 리팩토링하지 마십시오
- 이해하지 못하는 코드를 리팩토링하지 마십시오
- 과도하게 엔지니어링하지 마십시오 - 단순하게 유지합니다
- 모든 것을 한 번에 리팩토링하지 마십시오

---

## 빠른 시작 예시

### 시나리오: 중복이 있는 긴 메서드

**이전:**
```javascript
function processOrder(order) {
  // 다음을 포함하는 150줄의 코드:
  // - 중복된 유효성 검사 로직
  // - 인라인 계산
  // - 혼합된 책임
}
```

**리팩토링 단계:**

1. processOrder()에 대한 **테스트가 존재하는지 확인**합니다
2. 유효성 검사를 validateOrder()로 **추출**합니다
3. **테스트** - 통과해야 합니다
4. 계산을 calculateOrderTotal()로 **추출**합니다
5. **테스트** - 통과해야 합니다
6. 알림을 notifyCustomer()로 **추출**합니다
7. **테스트** - 통과해야 합니다
8. **리뷰** - processOrder()가 이제 3개의 명확한 함수를 오케스트레이션합니다

**이후:**
```javascript
function processOrder(order) {
  validateOrder(order);
  const total = calculateOrderTotal(order);
  notifyCustomer(order, total);
  return { order, total };
}
```

---

## 참고 자료

- [코드 스멜 카탈로그](03-12-refactor-references-code-smells.md) - 코드 스멜 전체 목록
- [리팩토링 카탈로그](03-13-refactor-references-refactoring-catalog.md) - 리팩토링 기법
- [리팩토링 계획 템플릿](03-14-refactor-templates-refactoring-plan.md) - 계획 템플릿

## 스크립트

- `scripts/analyze-complexity.py` - 코드 복잡도 메트릭 분석
- `scripts/detect-smells.py` - 자동화된 스멜 감지

## 버전 기록

- v1.0.0 (2025-01-15): Fowler 방법론, 단계적 접근, 사용자 상담 포인트가 포함된 초기 릴리스
