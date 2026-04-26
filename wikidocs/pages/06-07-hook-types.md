Claude Code는 네 가지 hook 타입을 지원합니다: `command`, `http`, `prompt`, `agent`. 각 타입은 동일한 JSON 입력 모델을 공유하지만, 실행 방식과 적합한 용도가 다릅니다.

## Command Hooks

기본 hook 타입입니다. 셸 명령을 실행하고 JSON stdin/stdout 및 종료 코드를 통해 통신합니다.

```json
{
  "type": "command",
  "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate.py\"",
  "timeout": 60
}
```

## HTTP Hooks

> v2.1.63에서 추가되었습니다.

command hook과 동일한 JSON 입력을 받는 원격 웹훅 엔드포인트입니다. HTTP hooks는 URL로 JSON을 POST하고 JSON 응답을 받습니다. 샌드박싱이 활성화된 경우 샌드박스를 통해 라우팅됩니다. URL에서 환경 변수 보간을 사용하려면 보안을 위해 명시적인 `allowedEnvVars` 목록이 필요합니다.

```json
{
  "hooks": {
    "PostToolUse": [{
      "type": "http",
      "url": "https://my-webhook.example.com/hook",
      "matcher": "Write"
    }]
  }
}
```

**주요 속성:**

- `"type": "http"` -- HTTP hook임을 식별
- `"url"` -- 웹훅 엔드포인트 URL
- 샌드박스 활성화 시 샌드박스를 통해 라우팅
- URL의 환경 변수 보간에는 명시적 `allowedEnvVars` 목록 필요

## Prompt Hooks

hook 내용이 Claude가 평가하는 프롬프트인 LLM 평가 프롬프트입니다. 주로 `Stop` 및 `SubagentStop` 이벤트에서 지능적인 작업 완료 확인에 사용됩니다.

```json
{
  "type": "prompt",
  "prompt": "Evaluate if Claude completed all requested tasks.",
  "timeout": 30
}
```

LLM이 프롬프트를 평가하고 구조화된 결정을 반환합니다 (자세한 내용은 [프롬프트 기반 Hooks](https://wikidocs.net/345483) 참조).

## Agent Hooks

전용 에이전트를 생성하여 조건을 평가하거나 복잡한 검사를 수행하는 subagent 기반 검증 hooks입니다. prompt hooks(단일 턴 LLM 평가)와 달리, agent hooks는 도구를 사용하고 다단계 추론을 수행할 수 있습니다.

```json
{
  "type": "agent",
  "prompt": "Verify the code changes follow our architecture guidelines. Check the relevant design docs and compare.",
  "timeout": 120
}
```

**주요 속성:**

- `"type": "agent"` -- agent hook임을 식별
- `"prompt"` -- subagent에 대한 작업 설명
- 에이전트는 도구(Read, Grep, Bash 등)를 사용하여 평가 수행 가능
- prompt hooks와 유사한 구조화된 결정을 반환
