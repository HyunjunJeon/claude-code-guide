이 문서는 메인 agent가 위임할 수 있는 subagent 종류를 `Agent(agent_type)` 구문으로 허용 목록 제어하는 방법을 설명합니다.
`claude --agent`로 실행되는 메인 에이전트의 권한을 좁히고 싶을 때 씁니다.
주의: 이 기능은 subagent 정의에서는 효과가 없습니다 — subagent는 다른 subagent를 생성할 수 없기 때문입니다.

`claude --agent`로 메인 스레드에서 에이전트를 실행할 때, `tools` 필드의 `Agent(agent_type)` 구문을 사용하여 해당 에이전트가 생성할 수 있는 subagent를 제한할 수 있습니다. 이는 메인 에이전트의 위임 대상을 허용 목록으로 제어하는 기능입니다. **주의: 이 기능은 subagent 정의에서는 효과가 없습니다.** Subagent는 다른 subagent를 생성할 수 없습니다.

[[TIP("참고")]]
v2.1.63에서 `Task` 도구가 `Agent`로 이름이 변경되었습니다. 기존 `Task(...)` 참조는 별칭으로 계속 작동합니다.
[[/TIP]]

## 예시

```yaml
---
name: coordinator
description: Coordinates work between specialized agents
tools: Agent(worker, researcher), Read, Bash
---

You are a coordinator agent. You can delegate work to the "worker" and
"researcher" subagents only. Use Read and Bash for your own exploration.
```

이 예시에서 `coordinator` subagent는 `worker`와 `researcher` subagent만 생성할 수 있습니다. 다른 곳에 정의된 다른 subagent는 생성할 수 없습니다.
