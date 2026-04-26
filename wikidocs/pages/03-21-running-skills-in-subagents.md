이 문서는 `context: fork`로 스킬을 격리된 subagent 컨텍스트에서 실행하는 방법을 설명합니다.
메인 대화 컨텍스트를 깔끔하게 유지하면서 깊이 있는 조사·계획·전문 도구 작업을 위임하고 싶을 때 사용합니다.
`agent` 필드로 어떤 subagent 유형(Explore, Plan, general-purpose 등)을 쓸지 선택하세요.

`context: fork`를 추가하면 격리된 subagent 컨텍스트에서 스킬이 실행됩니다. 스킬 콘텐츠는 자체 컨텍스트 윈도우를 가진 전용 subagent의 작업이 되어 메인 대화를 깔끔하게 유지합니다.

`agent` 필드는 사용할 에이전트 유형을 지정합니다:

| 에이전트 유형 | 적합한 용도 |
|---|---|
| `Explore` | 읽기 전용 조사, 코드베이스 분석 |
| `Plan` | 구현 계획 작성 |
| `general-purpose` | 모든 도구가 필요한 광범위한 작업 |
| Custom agents | 구성에서 정의된 전문화된 에이전트 |

**frontmatter 예시:**

```yaml
---
context: fork
agent: Explore
---
```

**전체 스킬 예시:**

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:
1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```
