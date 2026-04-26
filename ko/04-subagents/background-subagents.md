# 백그라운드 Subagent

이 문서는 subagent를 메인 대화와 분리해 백그라운드에서 굴리는 방법을 설명합니다.
오래 걸리는 분석이나 빌드 같은 작업을 던져두고 다른 일을 계속하고 싶을 때 씁니다.
`background: true` frontmatter, `Ctrl+B` 단축키, 환경 변수 비활성화 옵션을 함께 다룹니다.

Subagent는 백그라운드에서 실행할 수 있어 메인 대화를 다른 작업에 사용할 수 있습니다.

## 구성

frontmatter에서 `background: true`로 설정하여 subagent를 항상 백그라운드 작업으로 실행합니다:

```yaml
---
name: long-runner
background: true
description: Performs long-running analysis tasks in the background
---
```

## 키보드 단축키

| 단축키 | 동작 |
|----------|--------|
| `Ctrl+B` | 현재 실행 중인 subagent 작업을 백그라운드로 전환 |
| `Ctrl+F` | 모든 백그라운드 agent 종료 (두 번 눌러 확인) |

## 백그라운드 작업 비활성화

환경 변수를 설정하여 백그라운드 작업 지원을 완전히 비활성화합니다:

```bash
export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1
```
