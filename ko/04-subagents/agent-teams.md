# Agent Teams

Agent teams는 서로 직접 소통할 수 있는 여러 Claude Code 세션을 조정하는 기능입니다. 단순히 더 큰 subagent 묶음이 아닙니다.

## 무엇이 다른가

Subagent는:

- 격리된 컨텍스트를 쓰고
- 결과를 호출자에게만 돌려주고
- 메인 세션이 전부 조정합니다

Agent team은:

- 격리된 컨텍스트를 쓰고
- 팀원끼리 직접 메시지를 주고받고
- 공유 task list로 스스로 조정하며
- 별도의 Claude Code 인스턴스로 계속 실행됩니다

즉, 더 협업적이지만 비용과 복잡도도 더 큽니다.

## 요구사항

- Claude Code `v2.1.32` 이상
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

환경 변수나 `settings.json`으로 활성화할 수 있습니다.

## 잘 맞는 사용 사례

공식 문서는 다음처럼 병렬 탐색 가치가 큰 경우를 권합니다.

- 여러 관점의 조사와 리뷰
- 프론트엔드, 백엔드, 테스트를 함께 건드리는 교차 계층 작업
- 경쟁 가설을 병렬로 검증하는 디버깅
- 서로 다른 팀원이 다른 조각을 맡을 수 있는 큰 기능 작업

반대로 순차 작업이나 같은 파일을 같이 만지는 작업에는 오히려 비효율적일 수 있습니다.

## 언제 subagent가 더 나은가

다음이면 subagent가 더 적합합니다.

- 최종 결과만 있으면 충분하다
- 작업 범위가 좁고 명확하다
- 팀원끼리 상호 대화가 필요 없다
- 토큰 비용과 조정 비용을 낮추고 싶다

반대로 다음이 필요하면 agent teams가 낫습니다.

- 팀원끼리 발견 내용을 공유
- 가설을 서로 검증
- 작업을 자율적으로 나눠서 진행

## 시작 방법

기능을 켠 뒤 자연어로 팀을 만들라고 요청하면 됩니다.

```plaintext
Create an agent team to investigate this bug: one teammate on frontend, one on backend, one on test coverage.
```

Claude가 병렬성이 유리하다고 판단하면 팀 생성을 제안할 수도 있지만, 여전히 사용자의 승인이 필요합니다.

## 구조

Agent team은 다음으로 구성됩니다.

- team lead: 현재 메인 세션
- teammates: 별도 Claude Code 인스턴스
- shared task list: 팀원들이 가져가고 완료할 수 있는 공용 작업 목록

team lead가 전체를 조정하지만, teammates는 단순 수동 작업자가 아니라 서로 직접 소통할 수 있습니다.

## 실전 한계

공식 문서는 다음 한계를 명시합니다.

- 세션 재개
- 작업 조정
- 종료 동작

즉, 여전히 실험적 기능으로 보고, 병렬 탐색의 이익이 충분히 큰 경우에 쓰는 편이 맞습니다.

## 관련 가이드

- [Subagents Guide](./README.md)
- [How Claude Code Works](../09-advanced-features/how-claude-code-works.md)
- [Common Workflows](../09-advanced-features/common-workflows.md)

## 공식 출처

- [Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/ko/agent-teams)
