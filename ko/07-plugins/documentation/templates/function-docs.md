# 함수 문서 템플릿

> 사용 시 첫 줄을 "Function: `실제함수명`" 형식으로 교체해 활용하세요.

## 설명
함수가 수행하는 작업에 대한 간단한 설명.

## 시그니처
```typescript
function functionName(param1: Type1, param2: Type2): ReturnType
```

## 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|----------|-------------|
| param1 | Type1 | 예 | param1에 대한 설명 |
| param2 | Type2 | 아니오 | param2에 대한 설명 |

## 반환값
**타입**: `ReturnType`

반환되는 값에 대한 설명.

## 예외
- `Error`: 유효하지 않은 입력이 제공된 경우
- `TypeError`: 잘못된 타입이 전달된 경우

## 예제

### 기본 사용법
```typescript
const result = functionName('value1', 'value2');
console.log(result);
```

### 고급 사용법
```typescript
const result = functionName(
  complexParam1,
  { option: true }
);
```

## 참고사항
- 추가 참고사항 또는 경고
- 성능 고려사항
- 모범 사례

## 관련 항목
- [관련 함수](#)
- [API 문서](#)
