# 리팩토링 카탈로그

Martin Fowler의 *Refactoring* (제2판)에서 발췌한 리팩토링 기법의 선별 카탈로그입니다. 각 리팩토링은 동기, 단계별 메커니즘, 예시를 포함합니다.

> "리팩토링은 그 메커니즘 -- 변경을 수행하기 위해 따르는 정확한 단계의 순서 -- 에 의해 정의됩니다." -- Martin Fowler

---

## 이 카탈로그 사용 방법

1. 코드 스멜 참조를 사용하여 **스멜을 식별**합니다
2. 이 카탈로그에서 **일치하는 리팩토링을 찾습니다**
3. **메커니즘을 단계별로 따릅니다**
4. **각 단계 후 테스트**하여 동작이 보존되었는지 확인합니다

**골든 룰**: 어떤 단계든 10분 이상 걸리면 더 작은 단계로 나눕니다.

---

## 가장 일반적인 리팩토링

### Extract Method

**사용 시기**: 긴 메서드, 중복 코드, 개념의 이름이 필요할 때

**동기**: 코드 조각을 목적을 설명하는 이름의 메서드로 변환합니다.

**메커니즘**:
1. 무엇을 하는지(어떻게가 아닌)에 대해 이름을 붙인 새 메서드를 생성합니다
2. 코드 조각을 새 메서드에 복사합니다
3. 조각에서 사용되는 로컬 변수를 스캔합니다
4. 로컬 변수를 파라미터로 전달합니다 (또는 메서드에서 선언)
5. 반환 값을 적절히 처리합니다
6. 원래 조각을 새 메서드 호출로 교체합니다
7. 테스트합니다

**이전**:
```javascript
function printOwing(invoice) {
  let outstanding = 0;

  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");

  // Calculate outstanding
  for (const order of invoice.orders) {
    outstanding += order.amount;
  }

  // Print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

**이후**:
```javascript
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  printDetails(invoice, outstanding);
}

function printBanner() {
  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");
}

function calculateOutstanding(invoice) {
  return invoice.orders.reduce((sum, order) => sum + order.amount, 0);
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

---

### Inline Method

**사용 시기**: 메서드 본문이 이름만큼 명확할 때, 과도한 위임

**동기**: 메서드가 가치를 추가하지 않을 때 불필요한 간접 참조를 제거합니다.

**메커니즘**:
1. 메서드가 다형적이지 않은지 확인합니다
2. 메서드에 대한 모든 호출을 찾습니다
3. 각 호출을 메서드 본문으로 교체합니다
4. 각 교체 후 테스트합니다
5. 메서드 정의를 제거합니다

**이전**:
```javascript
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}
```

**이후**:
```javascript
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

---

### Extract Variable

**사용 시기**: 이해하기 어려운 복잡한 표현식

**동기**: 복잡한 표현식의 일부에 이름을 부여합니다.

**메커니즘**:
1. 표현식에 부작용이 없는지 확인합니다
2. 불변 변수를 선언합니다
3. 표현식의 결과(또는 일부)로 설정합니다
4. 원래 표현식을 변수로 교체합니다
5. 테스트합니다

**이전**:
```javascript
return order.quantity * order.itemPrice -
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
  Math.min(order.quantity * order.itemPrice * 0.1, 100);
```

**이후**:
```javascript
const basePrice = order.quantity * order.itemPrice;
const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
const shipping = Math.min(basePrice * 0.1, 100);
return basePrice - quantityDiscount + shipping;
```

---

### Inline Variable

**사용 시기**: 변수 이름이 표현식보다 더 많은 것을 전달하지 않을 때

**동기**: 불필요한 간접 참조를 제거합니다.

**메커니즘**:
1. 우변에 부작용이 없는지 확인합니다
2. 변수가 불변이 아니면 불변으로 만들고 테스트합니다
3. 첫 번째 참조를 찾아 표현식으로 교체합니다
4. 테스트합니다
5. 모든 참조에 대해 반복합니다
6. 선언과 할당을 제거합니다
7. 테스트합니다

---

### Rename Variable

**사용 시기**: 이름이 목적을 명확히 전달하지 않을 때

**동기**: 좋은 이름은 깨끗한 코드에 중요합니다.

**메커니즘**:
1. 변수가 널리 사용되면 캡슐화를 고려합니다
2. 모든 참조를 찾습니다
3. 각 참조를 변경합니다
4. 테스트합니다

**팁**:
- 의도를 드러내는 이름을 사용합니다
- 약어를 피합니다
- 도메인 용어를 사용합니다

```javascript
// 나쁨
const d = 30;
const x = users.filter(u => u.a);

// 좋음
const daysSinceLastLogin = 30;
const activeUsers = users.filter(user => user.isActive);
```

---

### Change Function Declaration

**사용 시기**: 함수 이름이 목적을 설명하지 않을 때, 파라미터 변경이 필요할 때

**동기**: 좋은 함수 이름은 코드를 자기 문서화합니다.

**메커니즘 (단순)**:
1. 필요 없는 파라미터를 제거합니다
2. 이름을 변경합니다
3. 필요한 파라미터를 추가합니다
4. 테스트합니다

**메커니즘 (마이그레이션 - 복잡한 변경용)**:
1. 파라미터를 제거하는 경우 사용되지 않는지 확인합니다
2. 원하는 선언으로 새 함수를 생성합니다
3. 이전 함수가 새 함수를 호출하게 합니다
4. 테스트합니다
5. 호출자를 새 함수를 사용하도록 변경합니다
6. 각각 테스트합니다
7. 이전 함수를 제거합니다

**이전**:
```javascript
function circum(radius) {
  return 2 * Math.PI * radius;
}
```

**이후**:
```javascript
function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

---

### Encapsulate Variable

**사용 시기**: 여러 곳에서 데이터에 직접 접근할 때

**동기**: 데이터 조작을 위한 명확한 접근 포인트를 제공합니다.

**메커니즘**:
1. getter와 setter 함수를 생성합니다
2. 모든 참조를 찾습니다
3. 읽기를 getter로 교체합니다
4. 쓰기를 setter로 교체합니다
5. 각 변경 후 테스트합니다
6. 변수의 가시성을 제한합니다

**이전**:
```javascript
let defaultOwner = { firstName: "Martin", lastName: "Fowler" };

// 많은 곳에서 사용됨
spaceship.owner = defaultOwner;
```

**이후**:
```javascript
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };

function defaultOwner() { return defaultOwnerData; }
function setDefaultOwner(arg) { defaultOwnerData = arg; }

spaceship.owner = defaultOwner();
```

---

### Introduce Parameter Object

**사용 시기**: 자주 함께 나타나는 여러 파라미터

**동기**: 자연스럽게 함께 속하는 데이터를 그룹화합니다.

**메커니즘**:
1. 그룹화된 파라미터를 위한 새 클래스/구조체를 생성합니다
2. 테스트합니다
3. Change Function Declaration을 사용하여 새 객체를 추가합니다
4. 테스트합니다
5. 그룹의 각 파라미터에 대해, 함수에서 제거하고 새 객체를 사용합니다
6. 각각 테스트합니다

**이전**:
```javascript
function amountInvoiced(startDate, endDate) { ... }
function amountReceived(startDate, endDate) { ... }
function amountOverdue(startDate, endDate) { ... }
```

**이후**:
```javascript
class DateRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

function amountInvoiced(dateRange) { ... }
function amountReceived(dateRange) { ... }
function amountOverdue(dateRange) { ... }
```

---

### Combine Functions into Class

**사용 시기**: 여러 함수가 동일한 데이터에 대해 작동할 때

**동기**: 함수를 그것이 작동하는 데이터와 그룹화합니다.

**메커니즘**:
1. 공통 데이터에 Encapsulate Record를 적용합니다
2. 각 함수를 클래스로 이동합니다
3. 각 이동 후 테스트합니다
4. 데이터 인수를 클래스 필드 사용으로 교체합니다

**이전**:
```javascript
function base(reading) { ... }
function taxableCharge(reading) { ... }
function calculateBaseCharge(reading) { ... }
```

**이후**:
```javascript
class Reading {
  constructor(data) { this._data = data; }

  get base() { ... }
  get taxableCharge() { ... }
  get calculateBaseCharge() { ... }
}
```

---

### Split Phase

**사용 시기**: 코드가 두 가지 다른 것을 다룰 때

**동기**: 코드를 명확한 경계를 가진 별도의 단계로 분리합니다.

**메커니즘**:
1. 두 번째 단계를 위한 두 번째 함수를 생성합니다
2. 테스트합니다
3. 단계 사이에 중간 데이터 구조를 도입합니다
4. 테스트합니다
5. 첫 번째 단계를 자체 함수로 추출합니다
6. 테스트합니다

**이전**:
```javascript
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0)
    * product.basePrice * product.discountRate;
  const shippingPerCase = (basePrice > shippingMethod.discountThreshold)
    ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  return basePrice - discount + shippingCost;
}
```

**이후**:
```javascript
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0)
    * product.basePrice * product.discountRate;
  return { basePrice, quantity, discount };
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold)
    ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
}
```

---

## 기능 이동

### Move Method

**사용 시기**: 메서드가 자신의 클래스보다 다른 클래스의 기능을 더 많이 사용할 때

**동기**: 함수를 가장 많이 사용하는 데이터와 함께 배치합니다.

**메커니즘**:
1. 메서드의 클래스에서 사용되는 모든 프로그램 요소를 검사합니다
2. 메서드가 다형적인지 확인합니다
3. 메서드를 대상 클래스에 복사합니다
4. 새 컨텍스트에 맞게 조정합니다
5. 원래 메서드가 대상으로 위임하게 합니다
6. 테스트합니다
7. 원래 메서드 제거를 고려합니다

---

### Move Field

**사용 시기**: 필드가 다른 클래스에서 더 많이 사용될 때

**동기**: 데이터를 그것을 사용하는 함수와 함께 유지합니다.

**메커니즘**:
1. 필드가 아직 캡슐화되지 않았다면 캡슐화합니다
2. 테스트합니다
3. 대상에 필드를 생성합니다
4. 참조를 대상 필드를 사용하도록 업데이트합니다
5. 테스트합니다
6. 원래 필드를 제거합니다

---

### Move Statements into Function

**사용 시기**: 동일한 코드가 항상 함수 호출과 함께 나타날 때

**동기**: 반복되는 코드를 함수에 이동하여 중복을 제거합니다.

**메커니즘**:
1. 반복되는 코드를 아직 함수로 추출하지 않았다면 추출합니다
2. 문장을 해당 함수로 이동합니다
3. 테스트합니다
4. 호출자가 더 이상 독립 문장이 필요하지 않으면 제거합니다

---

### Move Statements to Callers

**사용 시기**: 공통 동작이 호출자 간에 다를 때

**동기**: 동작이 달라야 할 때 함수에서 이동합니다.

**메커니즘**:
1. 이동할 코드에 Extract Method를 사용합니다
2. 원래 함수에 Inline Method를 사용합니다
3. 인라인된 호출을 제거합니다
4. 추출된 코드를 각 호출자로 이동합니다
5. 테스트합니다

---

## 데이터 구성

### Replace Primitive with Object

**사용 시기**: 데이터 항목이 단순 값 이상의 동작이 필요할 때

**동기**: 데이터를 동작과 함께 캡슐화합니다.

**메커니즘**:
1. Encapsulate Variable를 적용합니다
2. 단순 값 클래스를 생성합니다
3. setter를 새 인스턴스를 생성하도록 변경합니다
4. getter를 값을 반환하도록 변경합니다
5. 테스트합니다
6. 새 클래스에 풍부한 동작을 추가합니다

**이전**:
```javascript
class Order {
  constructor(data) {
    this.priority = data.priority; // 문자열: "high", "rush" 등
  }
}

// 사용
if (order.priority === "high" || order.priority === "rush") { ... }
```

**이후**:
```javascript
class Priority {
  constructor(value) {
    if (!Priority.legalValues().includes(value))
      throw new Error(`Invalid priority: ${value}`);
    this._value = value;
  }

  static legalValues() { return ['low', 'normal', 'high', 'rush']; }
  get value() { return this._value; }

  higherThan(other) {
    return Priority.legalValues().indexOf(this._value) >
           Priority.legalValues().indexOf(other._value);
  }
}

// 사용
if (order.priority.higherThan(new Priority("normal"))) { ... }
```

---

### Replace Temp with Query

**사용 시기**: 임시 변수가 표현식의 결과를 보유할 때

**동기**: 표현식을 함수로 추출하여 코드를 더 명확하게 만듭니다.

**메커니즘**:
1. 변수가 한 번만 할당되는지 확인합니다
2. 할당의 우변을 메서드로 추출합니다
3. 임시 변수에 대한 참조를 메서드 호출로 교체합니다
4. 테스트합니다
5. 임시 변수 선언과 할당을 제거합니다

**이전**:
```javascript
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000) {
  return basePrice * 0.95;
} else {
  return basePrice * 0.98;
}
```

**이후**:
```javascript
get basePrice() {
  return this._quantity * this._itemPrice;
}

// 메서드에서
if (this.basePrice > 1000) {
  return this.basePrice * 0.95;
} else {
  return this.basePrice * 0.98;
}
```

---

## 조건 로직 단순화

### Decompose Conditional

**사용 시기**: 복잡한 조건문 (if-then-else)

**동기**: 조건과 액션을 추출하여 의도를 명확하게 만듭니다.

**메커니즘**:
1. 조건에 Extract Method를 적용합니다
2. then 브랜치에 Extract Method를 적용합니다
3. else 브랜치에 Extract Method를 적용합니다 (있는 경우)

**이전**:
```javascript
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}
```

**이후**:
```javascript
if (isSummer(aDate, plan)) {
  charge = summerCharge(quantity, plan);
} else {
  charge = regularCharge(quantity, plan);
}

function isSummer(date, plan) {
  return !date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd);
}

function summerCharge(quantity, plan) {
  return quantity * plan.summerRate;
}

function regularCharge(quantity, plan) {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}
```

---

### Consolidate Conditional Expression

**사용 시기**: 동일한 결과를 가진 여러 조건

**동기**: 조건이 하나의 검사임을 명확하게 만듭니다.

**메커니즘**:
1. 조건에 부작용이 없는지 확인합니다
2. `and` 또는 `or`를 사용하여 조건을 결합합니다
3. 결합된 조건에 Extract Method를 고려합니다

**이전**:
```javascript
if (employee.seniority < 2) return 0;
if (employee.monthsDisabled > 12) return 0;
if (employee.isPartTime) return 0;
```

**이후**:
```javascript
if (isNotEligibleForDisability(employee)) return 0;

function isNotEligibleForDisability(employee) {
  return employee.seniority < 2 ||
         employee.monthsDisabled > 12 ||
         employee.isPartTime;
}
```

---

### Replace Nested Conditional with Guard Clauses

**사용 시기**: 깊게 중첩된 조건문으로 흐름을 따라가기 어려울 때

**동기**: 특수 사례에 가드 절을 사용하여 정상 흐름을 명확하게 유지합니다.

**메커니즘**:
1. 특수 사례 조건을 찾습니다
2. 조기 반환하는 가드 절로 교체합니다
3. 각 변경 후 테스트합니다

**이전**:
```javascript
function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    result = { amount: 0, reasonCode: "SEP" };
  } else {
    if (employee.isRetired) {
      result = { amount: 0, reasonCode: "RET" };
    } else {
      result = calculateNormalPay(employee);
    }
  }
  return result;
}
```

**이후**:
```javascript
function payAmount(employee) {
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
  if (employee.isRetired) return { amount: 0, reasonCode: "RET" };
  return calculateNormalPay(employee);
}
```

---

### Replace Conditional with Polymorphism

**사용 시기**: 타입에 기반한 switch/case, 타입에 따라 다른 조건 로직

**동기**: 객체가 자신의 동작을 처리하게 합니다.

**메커니즘**:
1. 클래스 계층을 생성합니다 (없는 경우)
2. 객체 생성에 Factory Function을 사용합니다
3. 조건 로직을 슈퍼클래스 메서드로 이동합니다
4. 각 케이스에 대해 서브클래스 메서드를 생성합니다
5. 원래 조건문을 제거합니다

**이전**:
```javascript
function plumages(birds) {
  return birds.map(b => plumage(b));
}

function plumage(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return "average";
    case 'AfricanSwallow':
      return (bird.numberOfCoconuts > 2) ? "tired" : "average";
    case 'NorwegianBlueParrot':
      return (bird.voltage > 100) ? "scorched" : "beautiful";
    default:
      return "unknown";
  }
}
```

**이후**:
```javascript
class Bird {
  get plumage() { return "unknown"; }
}

class EuropeanSwallow extends Bird {
  get plumage() { return "average"; }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? "tired" : "average";
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return (this.voltage > 100) ? "scorched" : "beautiful";
  }
}

function createBird(data) {
  switch (data.type) {
    case 'EuropeanSwallow': return new EuropeanSwallow(data);
    case 'AfricanSwallow': return new AfricanSwallow(data);
    case 'NorwegianBlueParrot': return new NorwegianBlueParrot(data);
    default: return new Bird(data);
  }
}
```

---

### Introduce Special Case (Null Object)

**사용 시기**: 특수 사례에 대한 반복적인 null 검사

**동기**: 특수 사례를 처리하는 특수 객체를 반환합니다.

**메커니즘**:
1. 예상 인터페이스를 가진 특수 사례 클래스를 생성합니다
2. isSpecialCase 검사를 추가합니다
3. 팩토리 메서드를 도입합니다
4. null 검사를 특수 사례 객체 사용으로 교체합니다
5. 테스트합니다

**이전**:
```javascript
const customer = site.customer;
// ... 많은 곳에서 검사
if (customer === "unknown") {
  customerName = "occupant";
} else {
  customerName = customer.name;
}
```

**이후**:
```javascript
class UnknownCustomer {
  get name() { return "occupant"; }
  get billingPlan() { return registry.defaultPlan; }
}

// 팩토리 메서드
function customer(site) {
  return site.customer === "unknown"
    ? new UnknownCustomer()
    : site.customer;
}

// 사용 - null 검사 불필요
const customerName = customer.name;
```

---

## API 리팩토링

### Separate Query from Modifier

**사용 시기**: 함수가 값을 반환하면서 부작용도 있을 때

**동기**: 어떤 연산이 부작용을 가지는지 명확하게 만듭니다.

**메커니즘**:
1. 새 쿼리 함수를 생성합니다
2. 원래 함수의 반환 로직을 복사합니다
3. 원래 함수를 void를 반환하도록 수정합니다
4. 반환 값을 사용하는 호출을 교체합니다
5. 테스트합니다

**이전**:
```javascript
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms();
      return "Don";
    }
    if (p === "John") {
      setOffAlarms();
      return "John";
    }
  }
  return "";
}
```

**이후**:
```javascript
function findMiscreant(people) {
  for (const p of people) {
    if (p === "Don") return "Don";
    if (p === "John") return "John";
  }
  return "";
}

function alertForMiscreant(people) {
  if (findMiscreant(people) !== "") setOffAlarms();
}
```

---

### Parameterize Function

**사용 시기**: 여러 함수가 다른 값으로 유사한 작업을 할 때

**동기**: 파라미터를 추가하여 중복을 제거합니다.

**메커니즘**:
1. 하나의 함수를 선택합니다
2. 다른 리터럴에 대한 파라미터를 추가합니다
3. 파라미터를 사용하도록 본문을 변경합니다
4. 테스트합니다
5. 호출자를 파라미터화된 버전을 사용하도록 변경합니다
6. 이제 사용되지 않는 함수를 제거합니다

**이전**:
```javascript
function tenPercentRaise(person) {
  person.salary = person.salary * 1.10;
}

function fivePercentRaise(person) {
  person.salary = person.salary * 1.05;
}
```

**이후**:
```javascript
function raise(person, factor) {
  person.salary = person.salary * (1 + factor);
}

// 사용
raise(person, 0.10);
raise(person, 0.05);
```

---

### Remove Flag Argument

**사용 시기**: 함수 동작을 변경하는 불리언 파라미터

**동기**: 별도의 함수를 통해 동작을 명시적으로 만듭니다.

**메커니즘**:
1. 각 플래그 값에 대한 명시적 함수를 생성합니다
2. 각 호출을 적절한 새 함수로 교체합니다
3. 각 변경 후 테스트합니다
4. 원래 함수를 제거합니다

**이전**:
```javascript
function bookConcert(customer, isPremium) {
  if (isPremium) {
    // 프리미엄 예약 로직
  } else {
    // 일반 예약 로직
  }
}

bookConcert(customer, true);
bookConcert(customer, false);
```

**이후**:
```javascript
function bookPremiumConcert(customer) {
  // 프리미엄 예약 로직
}

function bookRegularConcert(customer) {
  // 일반 예약 로직
}

bookPremiumConcert(customer);
bookRegularConcert(customer);
```

---

## 상속 다루기

### Pull Up Method

**사용 시기**: 여러 서브클래스에 동일한 메서드가 있을 때

**동기**: 클래스 계층에서 중복을 제거합니다.

**메커니즘**:
1. 메서드가 동일한지 검사합니다
2. 시그니처가 동일한지 확인합니다
3. 슈퍼클래스에 새 메서드를 생성합니다
4. 하나의 서브클래스에서 본문을 복사합니다
5. 하나의 서브클래스 메서드를 삭제하고 테스트합니다
6. 다른 서브클래스 메서드를 삭제하고 각각 테스트합니다

---

### Push Down Method

**사용 시기**: 동작이 서브클래스의 하위 집합에만 관련될 때

**동기**: 메서드를 사용되는 곳에 배치합니다.

**메커니즘**:
1. 필요한 각 서브클래스에 메서드를 복사합니다
2. 슈퍼클래스에서 메서드를 제거합니다
3. 테스트합니다
4. 필요하지 않은 서브클래스에서 제거합니다
5. 테스트합니다

---

### Replace Subclass with Delegate

**사용 시기**: 상속이 잘못 사용되고 있을 때, 더 많은 유연성이 필요할 때

**동기**: 적절한 경우 상속보다 합성을 선호합니다.

**메커니즘**:
1. 위임을 위한 빈 클래스를 생성합니다
2. 위임을 보유하는 필드를 호스트 클래스에 추가합니다
3. 호스트에서 호출되는 위임의 생성자를 생성합니다
4. 기능을 위임으로 이동합니다
5. 각 이동 후 테스트합니다
6. 상속을 위임으로 교체합니다

---

## Extract Class

**사용 시기**: 여러 책임을 가진 큰 클래스

**동기**: 단일 책임을 유지하기 위해 클래스를 분할합니다.

**메커니즘**:
1. 책임을 어떻게 분할할지 결정합니다
2. 새 클래스를 생성합니다
3. 원래 클래스에서 새 클래스로 필드를 이동합니다
4. 테스트합니다
5. 원래 클래스에서 새 클래스로 메서드를 이동합니다
6. 각 이동 후 테스트합니다
7. 두 클래스를 검토하고 이름을 변경합니다
8. 새 클래스를 어떻게 노출할지 결정합니다

**이전**:
```javascript
class Person {
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get officeAreaCode() { return this._officeAreaCode; }
  set officeAreaCode(arg) { this._officeAreaCode = arg; }
  get officeNumber() { return this._officeNumber; }
  set officeNumber(arg) { this._officeNumber = arg; }

  get telephoneNumber() {
    return `(${this._officeAreaCode}) ${this._officeNumber}`;
  }
}
```

**이후**:
```javascript
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get telephoneNumber() { return this._telephoneNumber.toString(); }
  get officeAreaCode() { return this._telephoneNumber.areaCode; }
  set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg; }
}

class TelephoneNumber {
  get areaCode() { return this._areaCode; }
  set areaCode(arg) { this._areaCode = arg; }
  get number() { return this._number; }
  set number(arg) { this._number = arg; }
  toString() { return `(${this._areaCode}) ${this._number}`; }
}
```

---

## 빠른 참조: 스멜에서 리팩토링으로

| 코드 스멜 | 주요 리팩토링 | 대안 |
|------------|-------------------|-------------|
| Long Method | Extract Method | Replace Temp with Query |
| Duplicate Code | Extract Method | Pull Up Method |
| Large Class | Extract Class | Extract Subclass |
| Long Parameter List | Introduce Parameter Object | Preserve Whole Object |
| Feature Envy | Move Method | Extract Method + Move |
| Data Clumps | Extract Class | Introduce Parameter Object |
| Primitive Obsession | Replace Primitive with Object | Replace Type Code |
| Switch Statements | Replace Conditional with Polymorphism | Replace Type Code |
| Temporary Field | Extract Class | Introduce Null Object |
| Message Chains | Hide Delegate | Extract Method |
| Middle Man | Remove Middle Man | Inline Method |
| Divergent Change | Extract Class | Split Phase |
| Shotgun Surgery | Move Method | Inline Class |
| Dead Code | Remove Dead Code | - |
| Speculative Generality | Collapse Hierarchy | Inline Class |

---

## 더 읽을거리

- Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code* (2nd ed.)
- 온라인 카탈로그: https://refactoring.com/catalog/
