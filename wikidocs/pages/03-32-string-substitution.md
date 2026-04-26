이 문서는 스킬 콘텐츠가 Claude에게 전달되기 전에 해석되는 동적 변수를 정리합니다.
`/fix-issue 123`처럼 인수를 받는 스킬, 또는 세션 ID·스킬 디렉토리 경로가 본문에 필요한 스킬을 만들 때 사용합니다.
`!`백틱 명령``으로 셸 출력을 인라인 삽입하는 패턴은 [동적 컨텍스트 주입](https://wikidocs.net/345391)에서 더 자세히 다룹니다.

스킬은 스킬 콘텐츠가 Claude에 도달하기 전에 해석되는 동적 값을 지원합니다:

| 변수 | 설명 |
|----------|-------------|
| `$ARGUMENTS` | 스킬 호출 시 전달된 모든 인수 |
| `$ARGUMENTS[N]` 또는 `$N` | 인덱스로 특정 인수 접근 (0 기반) |
| `${CLAUDE_SESSION_ID}` | 현재 세션 ID |
| `${CLAUDE_SKILL_DIR}` | 스킬의 SKILL.md 파일이 포함된 디렉토리 |
| `` !`command` `` | 동적 컨텍스트 주입 - 셸 명령을 실행하고 출력을 인라인으로 삽입 |

**예시:**

```yaml
---
name: fix-issue
description: Fix a GitHub issue
---

Fix GitHub issue $ARGUMENTS following our coding standards.
1. Read the issue description
2. Implement the fix
3. Write tests
4. Create a commit
```

`/fix-issue 123`을 실행하면 `$ARGUMENTS`가 `123`으로 대체됩니다.
