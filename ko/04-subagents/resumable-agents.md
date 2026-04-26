# 재개 가능한 Agent

이 문서는 종료된 subagent 세션을 agentId로 다시 이어 쓰는 방법을 설명합니다.
"어제 시작한 분석을 오늘 같은 컨텍스트에서 이어서 하고 싶다"는 시나리오에 적합합니다.
장기 리서치·반복 개선·다단계 워크플로우에서 매번 컨텍스트를 다시 만들 필요가 없어집니다.

Subagent는 전체 컨텍스트가 보존된 상태로 이전 대화를 계속할 수 있습니다:

```bash
# Initial invocation
> Use the code-analyzer agent to start reviewing the authentication module
# Returns agentId: "abc123"

# Resume the agent later
> Resume agent abc123 and now analyze the authorization logic as well
```

**사용 사례**:

- 여러 세션에 걸친 장기 리서치
- 컨텍스트를 잃지 않는 반복적 개선
- 컨텍스트를 유지하는 다단계 워크플로우
