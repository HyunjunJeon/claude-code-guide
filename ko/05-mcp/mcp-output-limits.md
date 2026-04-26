# MCP 출력 제한

이 페이지는 MCP 도구 출력에 적용되는 토큰·문자 한도(경고 10K, 기본 max 25K, 디스크 저장 50K 문자)와 `MAX_MCP_OUTPUT_TOKENS` 환경변수, 그리고 channels와의 차이를 정리한다. MCP 출력이 컨텍스트를 잡아먹는 문제를 만났을 때 가장 먼저 보는 페이지다. 같은 문제를 더 근본적으로 푸는 코드 실행 전략은 [mcp-code-execution.md](mcp-code-execution.md)에서 본다.

Claude Code는 컨텍스트 오버플로우를 방지하기 위해 MCP 도구 출력에 제한을 적용합니다:

| 제한 | 임계값 | 동작 |
|-------|-----------|----------|
| **경고** | 10,000 토큰 | 출력이 크다는 경고가 표시됩니다 |
| **기본 최대값** | 25,000 토큰 | 이 한도를 초과하면 출력이 잘립니다 |
| **디스크 저장** | 50,000 문자 | 50K 문자를 초과하는 도구 결과는 디스크에 저장됩니다 |

최대 출력 제한은 `MAX_MCP_OUTPUT_TOKENS` 환경 변수를 통해 구성할 수 있습니다:

```bash
# Increase the max output to 50,000 tokens
export MAX_MCP_OUTPUT_TOKENS=50000
```

## 도구별 결과 크기 조정

Claude Code의 주요 CLI surface에는 per-tool 전용 cap보다 `MAX_MCP_OUTPUT_TOKENS`라는 global cap이 먼저 노출됩니다.

실무 기준:

- 전체 한도를 올려야 할 때만 `MAX_MCP_OUTPUT_TOKENS` 사용
- 특정 도구 하나만 noisy하다면 server-side에서 출력 자체를 shaping
- 가능하면 global cap 상향보다 paging, filtering, summarization을 우선

문제가 되는 것이 한 도구라면, 전체 한도를 올리기 전에 그 도구의 output contract를 먼저 손보는 것이 낫습니다.

## MCP와 Channels

Channels와 MCP는 가까운 개념이지만 역할은 다릅니다. channels는 MCP-backed event stream이고, 일반 MCP tool은 request/response 도구입니다.

일반 MCP tool이 맞는 경우:

- Claude가 필요할 때 데이터를 요청
- 상호작용이 request/response 구조

Channels가 맞는 경우:

- 외부 시스템이 live session으로 이벤트를 push
- Claude가 alert, chat message, webhook 기반 상태 변화에 반응해야 함

즉, channels는 event ingress를, 일반 MCP tool은 data/action access를 해결합니다.
