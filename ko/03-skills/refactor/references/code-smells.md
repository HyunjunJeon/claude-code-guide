# 코드 스멜 카탈로그

Martin Fowler의 *Refactoring* (제2판)에 기반한 코드 스멜의 종합 참조입니다. 코드 스멜은 더 깊은 문제의 증상으로, 코드 설계에 문제가 있을 수 있음을 나타냅니다.

> "코드 스멜은 보통 시스템의 더 깊은 문제에 대응하는 표면적 지표입니다." -- Martin Fowler

---

## Bloaters

효과적으로 다루기에 너무 커진 것을 나타내는 코드 스멜입니다.

### Long Method

**징후:**
- 30-50줄을 초과하는 메서드
- 전체 메서드를 보려면 스크롤해야 함
- 여러 수준의 중첩
- 섹션이 무엇을 하는지 설명하는 주석

**왜 나쁜가:**
- 이해하기 어려움
- 격리된 상태에서 테스트하기 어려움
- 변경이 의도하지 않은 결과를 초래함
- 내부에 중복 로직이 숨어 있음

**리팩토링:**
- Extract Method
- Replace Temp with Query
- Introduce Parameter Object
- Replace Method with Method Object
- Decompose Conditional

**예시 (이전):**
```javascript
function processOrder(order) {
  // 주문 유효성 검사 (20줄)
  if (!order.items) throw new Error('No items');
  if (order.items.length === 0) throw new Error('Empty order');
  // ... 추가 유효성 검사

  // 합계 계산 (30줄)
  let subtotal = 0;
  for (const item of order.items) {
    subtotal += item.price * item.quantity;
  }
  // ... 세금, 배송, 할인

  // 알림 전송 (20줄)
  // ... 이메일 로직
}
```

**예시 (이후):**
```javascript
function processOrder(order) {
  validateOrder(order);
  const totals = calculateOrderTotals(order);
  sendOrderNotifications(order, totals);
  return { order, totals };
}
```

---

### Large Class

**징후:**
- 인스턴스 변수가 많음 (7-10개 이상)
- 메서드가 많음 (15-20개 이상)
- 클래스 이름이 모호함 (Manager, Handler, Processor)
- 메서드가 모든 인스턴스 변수를 사용하지 않음

**왜 나쁜가:**
- 단일 책임 원칙 위반
- 테스트하기 어려움
- 변경이 관련 없는 기능에 파급됨
- 부분을 재사용하기 어려움

**리팩토링:**
- Extract Class
- Extract Subclass
- Extract Interface

**감지:**
```
Lines of code > 300
Number of methods > 15
Number of fields > 10
```

---

### Primitive Obsession

**징후:**
- 도메인 개념에 기본형 사용 (이메일에 string, 금액에 int)
- 객체 대신 기본형 배열
- 타입 코드를 위한 문자열 상수
- 매직 넘버/문자열

**왜 나쁜가:**
- 타입 수준에서 유효성 검사 없음
- 로직이 코드베이스에 분산됨
- 잘못된 값을 전달하기 쉬움
- 도메인 개념 누락

**리팩토링:**
- Replace Primitive with Object
- Replace Type Code with Class
- Replace Type Code with Subclasses
- Replace Type Code with State/Strategy

**예시 (이전):**
```javascript
const user = {
  email: 'john@example.com',     // 단순 문자열
  phone: '1234567890',           // 단순 문자열
  status: 'active',              // 매직 문자열
  balance: 10050                 // 센트를 정수로
};
```

**예시 (이후):**
```javascript
const user = {
  email: new Email('john@example.com'),
  phone: new PhoneNumber('1234567890'),
  status: UserStatus.ACTIVE,
  balance: Money.cents(10050)
};
```

---

### Long Parameter List

**징후:**
- 4개 이상의 파라미터를 가진 메서드
- 항상 함께 나타나는 파라미터
- 메서드 동작을 변경하는 불리언 플래그
- null/undefined가 자주 전달됨

**왜 나쁜가:**
- 올바르게 호출하기 어려움
- 파라미터 순서 혼동
- 메서드가 너무 많은 일을 한다는 징후
- 새 파라미터를 추가하기 어려움

**리팩토링:**
- Introduce Parameter Object
- Preserve Whole Object
- Replace Parameter with Method Call
- Remove Flag Argument

**예시 (이전):**
```javascript
function createUser(firstName, lastName, email, phone,
                    street, city, state, zip,
                    isAdmin, isActive, createdBy) {
  // ...
}
```

**예시 (이후):**
```javascript
function createUser(personalInfo, address, options) {
  // personalInfo: { firstName, lastName, email, phone }
  // address: { street, city, state, zip }
  // options: { isAdmin, isActive, createdBy }
}
```

---

### Data Clumps

**징후:**
- 동일한 3개 이상의 필드가 반복적으로 함께 나타남
- 항상 함께 이동하는 파라미터
- 함께 속하는 필드 하위 집합을 가진 클래스

**왜 나쁜가:**
- 중복된 처리 로직
- 추상화 누락
- 확장하기 어려움
- 숨겨진 클래스를 나타냄

**리팩토링:**
- Extract Class
- Introduce Parameter Object
- Preserve Whole Object

**예시:**
```javascript
// 데이터 덩어리: (x, y, z) 좌표
function movePoint(x, y, z, dx, dy, dz) { }
function scalePoint(x, y, z, factor) { }
function distanceBetween(x1, y1, z1, x2, y2, z2) { }

// Point3D 클래스 추출
class Point3D {
  constructor(x, y, z) { }
  move(delta) { }
  scale(factor) { }
  distanceTo(other) { }
}
```

---

## Object-Orientation Abusers

OOP 원칙의 불완전하거나 잘못된 사용을 나타내는 스멜입니다.

### Switch Statements

**징후:**
- 긴 switch/case 또는 if/else 체인
- 여러 곳에 동일한 switch
- 타입 코드에 대한 switch
- 새 케이스를 추가하려면 모든 곳에서 변경 필요

**왜 나쁜가:**
- 개방/폐쇄 원칙 위반
- 변경이 모든 switch 위치에 파급됨
- 확장하기 어려움
- 종종 누락된 다형성을 나타냄

**리팩토링:**
- Replace Conditional with Polymorphism
- Replace Type Code with Subclasses
- Replace Type Code with State/Strategy

**예시 (이전):**
```javascript
function calculatePay(employee) {
  switch (employee.type) {
    case 'hourly':
      return employee.hours * employee.rate;
    case 'salaried':
      return employee.salary / 12;
    case 'commissioned':
      return employee.sales * employee.commission;
  }
}
```

**예시 (이후):**
```javascript
class HourlyEmployee {
  calculatePay() {
    return this.hours * this.rate;
  }
}

class SalariedEmployee {
  calculatePay() {
    return this.salary / 12;
  }
}
```

---

### Temporary Field

**징후:**
- 일부 메서드에서만 사용되는 인스턴스 변수
- 조건부로 설정되는 필드
- 특정 경우에만 복잡한 초기화

**왜 나쁜가:**
- 혼란스러움 -- 필드가 존재하지만 null일 수 있음
- 객체 상태를 이해하기 어려움
- 숨겨진 조건 로직을 나타냄

**리팩토링:**
- Extract Class
- Introduce Null Object
- Replace Temp Field with Local

---

### Refused Bequest

**징후:**
- 하위 클래스가 상속된 메서드/데이터를 사용하지 않음
- 하위 클래스가 아무것도 하지 않도록 오버라이드함
- 코드 재사용을 위해 상속을 사용하되, IS-A 관계가 아님

**왜 나쁜가:**
- 잘못된 추상화
- Liskov 치환 원칙 위반
- 오도하는 계층 구조

**리팩토링:**
- Push Down Method/Field
- Replace Subclass with Delegate
- Replace Inheritance with Delegation

---

### Alternative Classes with Different Interfaces

**징후:**
- 유사한 일을 하는 두 클래스
- 같은 개념에 대해 다른 메서드 이름
- 상호 교환적으로 사용될 수 있음

**왜 나쁜가:**
- 중복된 구현
- 공통 인터페이스 없음
- 전환하기 어려움

**리팩토링:**
- Rename Method
- Move Method
- Extract Superclass
- Extract Interface

---

## Change Preventers

변경을 어렵게 만드는 스멜입니다 -- 한 가지를 변경하면 다른 많은 것도 변경해야 합니다.

### Divergent Change

**징후:**
- 여러 다른 이유로 변경되는 하나의 클래스
- 다른 영역의 변경이 동일한 클래스 수정을 촉발함
- 클래스가 "God 클래스"임

**왜 나쁜가:**
- 단일 책임 위반
- 높은 변경 빈도
- 머지 충돌

**리팩토링:**
- Extract Class
- Extract Superclass
- Extract Subclass

**예시:**
`User` 클래스가 다음을 위해 변경됨:
- 인증 변경
- 프로필 변경
- 결제 변경
- 알림 변경

-> 추출: `AuthService`, `ProfileService`, `BillingService`, `NotificationService`

---

### Shotgun Surgery

**징후:**
- 하나의 변경이 많은 클래스에서 편집을 요구함
- 작은 기능이 10개 이상의 파일을 건드려야 함
- 변경이 분산되어 있어 모두 찾기 어려움

**왜 나쁜가:**
- 한 곳을 놓치기 쉬움
- 높은 결합도
- 변경이 에러를 유발하기 쉬움

**리팩토링:**
- Move Method
- Move Field
- Inline Class

**감지:**
하나의 필드를 추가하면 5개 이상의 파일에서 변경이 필요한지 찾습니다.

---

### Parallel Inheritance Hierarchies

**징후:**
- 하나의 계층에서 하위 클래스를 생성하면 다른 계층에서도 하위 클래스가 필요함
- 클래스 접두사가 일치함 (예: `DatabaseOrder`, `DatabaseProduct`)

**왜 나쁜가:**
- 유지보수가 두 배
- 계층 간 결합
- 한쪽을 잊기 쉬움

**리팩토링:**
- Move Method
- Move Field
- 하나의 계층 제거

---

## Dispensables

제거되어야 하는 불필요한 것입니다.

### Comments (과도한)

**징후:**
- 코드가 무엇을 하는지 설명하는 주석
- 주석 처리된 코드
- 영원히 남아있는 TODO/FIXME
- 주석의 사과

**왜 나쁜가:**
- 주석은 거짓말함 (동기화에서 벗어남)
- 코드가 자기 문서화되어야 함
- 죽은 코드가 혼란을 야기함

**리팩토링:**
- Extract Method (이름이 무엇을 설명)
- Rename (주석 없이 명확성)
- 주석 처리된 코드 제거
- Introduce Assertion

**좋은 주석 vs 나쁜 주석:**
```javascript
// 나쁨: 무엇을 설명
// Loop through users and check if active
for (const user of users) {
  if (user.status === 'active') { }
}

// 좋음: 왜를 설명
// Active users only - inactive are handled by cleanup job
const activeUsers = users.filter(u => u.isActive);
```

---

### Duplicate Code

**징후:**
- 여러 곳에 동일한 코드
- 작은 차이가 있는 유사한 코드
- 복사-붙여넣기 패턴

**왜 나쁜가:**
- 여러 곳에서 버그 수정 필요
- 불일치 위험
- 부풀어진 코드베이스

**리팩토링:**
- Extract Method
- Extract Class
- Pull Up Method (계층에서)
- Form Template Method

**감지 규칙:**
3번 이상 중복된 코드는 추출되어야 합니다.

---

### Lazy Class

**징후:**
- 존재를 정당화할 만큼 충분히 하지 않는 클래스
- 추가 가치 없는 래퍼
- 과도한 엔지니어링의 결과

**왜 나쁜가:**
- 유지보수 오버헤드
- 불필요한 간접 참조
- 이점 없는 복잡성

**리팩토링:**
- Inline Class
- Collapse Hierarchy

---

### Dead Code

**징후:**
- 도달할 수 없는 코드
- 사용되지 않는 변수/메서드/클래스
- 주석 처리된 코드
- 불가능한 조건 뒤의 코드

**왜 나쁜가:**
- 혼란
- 유지보수 부담
- 이해 속도 저하

**리팩토링:**
- Remove Dead Code
- Safe Delete

**감지:**
```bash
# 사용되지 않는 export 찾기
# 참조되지 않는 함수 찾기
# IDE의 "unused" 경고
```

---

### Speculative Generality

**징후:**
- 하위 클래스가 하나뿐인 추상 클래스
- "미래를 위한" 사용되지 않는 파라미터
- 위임만 하는 메서드
- 하나의 사용 사례를 위한 "프레임워크"

**왜 나쁜가:**
- 이점 없는 복잡성
- YAGNI (You Ain't Gonna Need It)
- 이해하기 어려움

**리팩토링:**
- Collapse Hierarchy
- Inline Class
- Remove Parameter
- Rename Method

---

## Couplers

클래스 간 과도한 결합을 나타내는 스멜입니다.

### Feature Envy

**징후:**
- 자신의 클래스보다 다른 클래스의 데이터를 더 많이 사용하는 메서드
- 다른 객체에 대한 많은 getter 호출
- 데이터와 동작이 분리되어 있음

**왜 나쁜가:**
- 동작의 위치가 잘못됨
- 캡슐화 부족
- 유지보수하기 어려움

**리팩토링:**
- Move Method
- Move Field
- Extract Method (그런 다음 이동)

**예시 (이전):**
```javascript
class Order {
  getDiscountedPrice(customer) {
    // 고객 데이터를 많이 사용
    if (customer.loyaltyYears > 5) {
      return this.price * customer.discountRate;
    }
    return this.price;
  }
}
```

**예시 (이후):**
```javascript
class Customer {
  getDiscountedPriceFor(price) {
    if (this.loyaltyYears > 5) {
      return price * this.discountRate;
    }
    return price;
  }
}
```

---

### Inappropriate Intimacy

**징후:**
- 클래스가 서로의 private 부분에 접근함
- 양방향 참조
- 하위 클래스가 부모에 대해 너무 많이 알고 있음

**왜 나쁜가:**
- 높은 결합도
- 변경이 연쇄됨
- 하나를 수정하지 않고 다른 하나를 수정하기 어려움

**리팩토링:**
- Move Method
- Move Field
- Change Bidirectional to Unidirectional
- Extract Class
- Hide Delegate

---

### Message Chains

**징후:**
- 긴 메서드 호출 체인: `a.getB().getC().getD().getValue()`
- 클라이언트가 내비게이션 구조에 의존함
- "기차 충돌" 코드

**왜 나쁜가:**
- 깨지기 쉬움 -- 어떤 변경이든 체인을 깨뜨림
- 디미터 법칙 위반
- 구조에 대한 결합

**리팩토링:**
- Hide Delegate
- Extract Method
- Move Method

**예시:**
```javascript
// 나쁨: 메시지 체인
const managerName = employee.getDepartment().getManager().getName();

// 나음: 위임 숨기기
const managerName = employee.getManagerName();
```

---

### Middle Man

**징후:**
- 다른 클래스에만 위임하는 클래스
- 메서드의 절반이 위임
- 추가 가치 없음

**왜 나쁜가:**
- 불필요한 간접 참조
- 유지보수 오버헤드
- 혼란스러운 아키텍처

**리팩토링:**
- Remove Middle Man
- Inline Method

---

## 스멜 심각도 가이드

| 심각도 | 설명 | 조치 |
|----------|-------------|--------|
| **Critical** | 개발을 차단하고 버그를 유발 | 즉시 수정 |
| **High** | 상당한 유지보수 부담 | 현재 스프린트에서 수정 |
| **Medium** | 눈에 띄지만 관리 가능 | 가까운 미래에 계획 |
| **Low** | 사소한 불편 | 기회가 있을 때 수정 |

---

## 빠른 감지 체크리스트

코드를 스캔할 때 이 체크리스트를 사용합니다:

- [ ] 30줄을 초과하는 메서드가 있는가?
- [ ] 300줄을 초과하는 클래스가 있는가?
- [ ] 4개 이상의 파라미터를 가진 메서드가 있는가?
- [ ] 중복된 코드 블록이 있는가?
- [ ] 타입 코드에 대한 switch/case가 있는가?
- [ ] 사용되지 않는 코드가 있는가?
- [ ] 다른 클래스의 데이터를 많이 사용하는 메서드가 있는가?
- [ ] 긴 메서드 호출 체인이 있는가?
- [ ] "왜"가 아닌 "무엇"을 설명하는 주석이 있는가?
- [ ] 객체여야 할 기본형이 있는가?

---

## 더 읽을거리

- Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code* (2nd ed.)
- Kerievsky, J. (2004). *Refactoring to Patterns*
- Feathers, M. (2004). *Working Effectively with Legacy Code*
