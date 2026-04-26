이 문서는 스킬에 담을 수 있는 두 가지 콘텐츠 유형(참조 콘텐츠와 작업 콘텐츠)을 구분합니다.
새 스킬을 만들 때 "이건 단계별 작업인가, 아니면 Claude가 작업 중에 참고할 지식인가"부터 정해야 합니다.
이 결정은 frontmatter 옵션(`disable-model-invocation`, `context: fork` 등)과 호출 패턴까지 영향을 줍니다.

스킬에는 각각 다른 목적에 적합한 두 가지 유형의 콘텐츠가 포함될 수 있습니다:

## 참조 콘텐츠

Claude가 현재 작업에 적용하는 지식을 추가합니다 - 규칙, 패턴, 스타일 가이드, 도메인 지식. 대화 컨텍스트와 인라인으로 실행됩니다.

```yaml
---
name: api-conventions
description: API design patterns for this codebase
---

When writing API endpoints:
- Use RESTful naming conventions
- Return consistent error formats
- Include request validation
```

## 작업 콘텐츠

특정 작업에 대한 단계별 지시사항입니다. `/skill-name`으로 직접 호출되는 경우가 많습니다.

```yaml
---
name: deploy
description: Deploy the application to production
context: fork
disable-model-invocation: true
---

Deploy the application:
1. Run the test suite
2. Build the application
3. Push to the deployment target
```
