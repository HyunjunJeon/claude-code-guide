# 동적 컨텍스트 주입

이 문서는 `` !`command` `` 구문으로 셸 명령 출력을 스킬 본문에 직접 끼워 넣는 방법을 설명합니다.
PR 요약·git diff·gh CLI 결과처럼 매번 변하는 컨텍스트를 스킬에 자동 주입하고 싶을 때 씁니다.
명령은 Claude가 스킬을 실행하기 직전에 실행되며, Claude는 최종 결과만 봅니다.

`` !`command` `` 구문은 스킬 콘텐츠가 Claude에 전송되기 전에 셸 명령을 실행합니다:

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request...
```

명령은 즉시 실행되며, Claude는 최종 출력만 봅니다. 기본적으로 명령은 `bash`에서 실행됩니다. PowerShell을 사용하려면 frontmatter에서 `shell: powershell`을 설정하십시오.
