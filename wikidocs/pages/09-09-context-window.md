Claude Code의 컨텍스트 윈도우는 현재 세션에서 Claude가 알고 있는 모든 것의 묶음입니다. 이 공간이 차오를수록 품질이 떨어지기 때문에, 실제로는 가장 중요한 운영 자원입니다.

## 무엇이 컨텍스트에 들어오나

세션 시점에 따라 다음이 컨텍스트에 포함될 수 있습니다.

- 시스템 프롬프트와 output style
- `CLAUDE.md`
- auto memory
- MCP 도구 이름
- skill 설명과 실제로 호출된 skill 본문
- 대화 기록
- Claude가 읽은 파일 내용
- 명령 출력
- subagent가 부모 세션으로 돌려준 요약

일부는 시작 전에 자동 로드되고, 일부는 파일 읽기나 skill 호출 이후에만 들어옵니다.

## 왜 중요한가

컨텍스트가 차기 시작하면:

- 초반 지시가 더 쉽게 희미해지고
- 불필요한 출력이 중요한 문맥과 경쟁하고
- Claude가 제약을 놓치거나 실수가 늘 수 있습니다

공식 문서도 컨텍스트를 가장 먼저 관리해야 할 자원으로 설명합니다.

## compaction은 무엇을 하나

세션이 너무 커지면 Claude Code는 자동으로 compact를 수행합니다. 먼저 오래된 tool 출력을 비우고, 필요하면 대화를 요약합니다.

직접 실행할 수도 있습니다.

```plaintext
/compact
/compact keep the API migration details and the failing test command
```

요약이 아니라 완전히 새로 시작하고 싶다면 `/clear`를 사용합니다.

## compaction 후 무엇이 남는가

공식 context 문서는 다시 주입되는 것과, 다시 트리거되기 전까지 사라지는 것을 구분합니다.

보통 유지되거나 다시 주입되는 것:

- 시스템 프롬프트와 output style
- 프로젝트 루트 `CLAUDE.md`와 비범위 규칙
- auto memory
- 토큰 한도 안의 invoked skill 본문

다시 트리거되기 전까지 사라지는 것:

- `paths:` frontmatter가 있는 경로 범위 규칙
- 하위 디렉터리의 nested `CLAUDE.md`

hooks는 메시지 히스토리가 아니라 코드 실행이므로 "컨텍스트에 남는다"는 개념이 다릅니다.

## 왜 subagent가 도움이 되나

subagent는 별도의 컨텍스트 윈도우에서 일합니다. 큰 조사 작업은 그 워커 안에 머물고, 부모 세션에는 요약만 돌아옵니다. 그래서 subagent는 컨텍스트 팽창을 막는 가장 강한 도구 중 하나입니다.

## 실전에서 컨텍스트를 줄이는 방법

- 작업 범위를 좁게 유지하기
- 서로 무관한 작업 사이에는 `/clear` 사용하기
- 긴 세션이 흔들리기 시작하면 `/compact` 하기
- 오래 남아야 하는 규칙은 `CLAUDE.md`로 옮기기
- 큰 skill은 중요한 지시를 파일 상단에 두기
- 큰 조사 작업은 subagent로 분리하기
- Claude가 직접 읽을 수 있는 파일은 긴 로그를 직접 붙여넣지 않기

## 실제 사용량 확인하기

가장 유용한 진단 명령은 다음입니다.

- `/context`: 범주별 사용량과 최적화 힌트
- `/memory`: 시작 시 어떤 memory 파일이 로드되었는지 확인

Claude가 명백한 제약을 자꾸 놓친다면, 모델 탓부터 하기 전에 `/context`를 먼저 확인하는 편이 낫습니다.

## 관련 가이드

- [How Claude Code Works](09-19-how-claude-code-works.md)
- [Best Practices](09-01-best-practices.md)
- [Common Workflows](09-06-common-workflows.md)
- [Subagents](04-subagents.md)

## 공식 출처

- [Explore the context window](https://code.claude.com/docs/ko/context-window)
