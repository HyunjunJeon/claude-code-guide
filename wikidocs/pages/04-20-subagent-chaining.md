이 문서는 한 subagent의 출력을 다음 subagent의 입력으로 넘기는 순차 워크플로우 패턴을 설명합니다.
"분석 → 수정"처럼 두 단계 이상이 자연스럽게 이어지는 작업에 적합합니다.
한 줄의 자연어 명령으로 여러 subagent를 묶어 호출할 수 있습니다.

여러 subagent를 순차적으로 실행합니다:

```bash
> First use the code-analyzer subagent to find performance issues,
  then use the optimizer subagent to fix them
```

이를 통해 한 subagent의 출력이 다른 subagent에 전달되는 복잡한 워크플로우를 구현할 수 있습니다.
