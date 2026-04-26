# Subagent 사용

이 문서는 subagent를 호출하는 네 가지 방식(자동 위임·명시적 호출·`@`-멘션·세션 전체 agent)을 정리합니다.
새 subagent를 만든 직후, 또는 "왜 자동으로 호출이 안 되지"가 궁금할 때 보세요.
description 필드의 "use PROACTIVELY" 키워드와 `claude --agent` 플래그가 호출 빈도와 범위를 크게 바꿉니다.

## 자동 위임

Claude는 다음을 기반으로 작업을 사전에 위임합니다:

- 요청의 작업 설명
- subagent 구성의 `description` 필드
- 현재 컨텍스트와 사용 가능한 도구

사전 사용을 장려하려면 `description` 필드에 "use PROACTIVELY" 또는 "MUST BE USED"를 포함하세요:

```yaml
---
name: code-reviewer
description: Expert code review specialist. Use PROACTIVELY after writing or modifying code.
---
```

## 명시적 호출

특정 subagent를 명시적으로 요청할 수 있습니다:

```
> Use the test-runner subagent to fix failing tests
> Have the code-reviewer subagent look at my recent changes
> Ask the debugger subagent to investigate this error
```

## @-멘션 호출

`@` 접두사를 사용하여 특정 subagent가 확실히 호출되도록 합니다 (자동 위임 휴리스틱 우회):

```
> @"code-reviewer (agent)" review the auth module
```

## 세션 전체 Agent

특정 agent를 메인 agent로 사용하여 전체 세션을 실행합니다:

```bash
# Via CLI flag
claude --agent code-reviewer

# Via settings.json
{
  "agent": "code-reviewer"
}
```

## 사용 가능한 Agent 목록 보기

`claude agents` 명령어를 사용하여 모든 소스에서 구성된 모든 agent를 나열합니다:

```bash
claude agents
```
