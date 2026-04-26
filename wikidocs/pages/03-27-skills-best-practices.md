이 문서는 자동 호출 정확도를 높이고 스킬을 오래 유지하기 위한 다섯 가지 원칙을 정리합니다.
새 스킬을 만들기 직전, 또는 "왜 내 스킬이 자동으로 호출되지 않을까"를 점검할 때 펼쳐 보세요.
원칙별로 좋은 예와 나쁜 예를 비교해서 빠르게 자기 점검할 수 있게 구성했습니다.

## 1. 설명을 구체적으로 작성합니다

- **나쁜 예 (모호함)**: "Helps with documents"
- **좋은 예 (구체적)**: "Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction."

## 2. 스킬을 집중적으로 유지합니다

- 하나의 스킬 = 하나의 기능
- "PDF form filling"
- "Document processing" (너무 광범위)

## 3. 트리거 용어를 포함합니다

사용자 요청과 일치하는 키워드를 설명에 추가합니다:

```yaml
description: Analyze Excel spreadsheets, generate pivot tables, create charts. Use when working with Excel files, spreadsheets, or .xlsx files.
```

## 4. SKILL.md를 500줄 미만으로 유지합니다

상세한 참조 자료는 Claude가 필요에 따라 로드하는 별도 파일로 이동합니다.

## 5. 지원 파일을 참조합니다

```markdown
## Additional resources

- For complete API details, see [reference.md](reference.md)
- For usage examples, see [examples.md](examples.md)
```

## 해야 할 것

- 명확하고 설명적인 이름을 사용합니다
- 포괄적인 지시사항을 포함합니다
- 구체적인 예제를 추가합니다
- 관련 스크립트와 템플릿을 패키징합니다
- 실제 시나리오로 테스트합니다
- 의존성을 문서화합니다

## 하지 말아야 할 것

- 일회성 작업을 위한 스킬을 만들지 마십시오
- 기존 기능을 중복하지 마십시오
- 스킬을 너무 광범위하게 만들지 마십시오
- 설명 필드를 건너뛰지 마십시오
- 신뢰할 수 없는 소스의 스킬을 감사 없이 설치하지 마십시오
