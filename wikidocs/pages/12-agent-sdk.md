Claude Code Agent SDK는 Claude의 에이전트 루프를 본인의 앱이나 워크플로에 코드 수준에서 임베드할 수 있게 해주는 라이브러리입니다.  
대화형 CLI 사용자가 아니라, TypeScript 또는 Python으로 세션, 도구, 권한, 스트리밍, 호스팅을 직접 제어해야 하는 빌더 관점의 모듈입니다.

## 언제 읽으면 좋은가

- Claude Code의 자동화 흐름을 본인의 서비스나 사내 도구에 임베드하고 싶을 때
- TypeScript 또는 Python으로 에이전트 루프와 도구 호출을 직접 제어해야 할 때
- 호스팅, 권한, 세션 영속성, 비용 추적을 운영 코드로 관리해야 할 때
- CLI 명령에서 가능한 동작을 백엔드 API나 백그라운드 작업으로 옮기고 싶을 때

## 핵심 개념

| 개념 | 무엇인가 | 먼저 볼 페이지 |
| --- | --- | --- |
| Agent loop | LLM 호출과 도구 실행을 묶는 에이전트의 기본 실행 루프 | `agent-loop.md` |
| Sessions | 대화 상태와 컨텍스트의 영속 단위 | `sessions.md` |
| Custom tools | 자체 함수를 도구로 노출해 에이전트가 호출하게 하는 메커니즘 | `custom-tools.md` |
| Permissions | 도구 사용과 파일 접근을 코드로 통제하는 정책 계층 | `permissions.md` |
| Hooks | SDK 실행 흐름의 특정 시점을 가로채 사용자 코드를 실행 | `hooks.md` |
| Streaming | 토큰과 도구 결과를 실시간으로 받아 UI에 흘려보내기 | `streaming-output.md` |
| Hosting | SDK 기반 에이전트를 운영 환경에 띄우는 패턴 | `hosting.md` |

## 빠른 시작

가장 짧은 진입은 TypeScript 또는 Python에서 SDK 클라이언트를 만들고 한 번의 에이전트 호출을 실행해보는 것입니다.

```ts
// TypeScript 예시 (자세한 내용은 typescript.md)
import { Claude } from "@anthropic-ai/claude-code-sdk";

const client = new Claude({ apiKey: process.env.ANTHROPIC_API_KEY });
const session = await client.sessions.create();
const result = await session.run({ input: "이 저장소의 README를 요약해줘" });
console.log(result.output);
```

```python
# Python 예시 (자세한 내용은 python.md)
from claude_code_sdk import Claude

client = Claude(api_key=os.environ["ANTHROPIC_API_KEY"])
session = client.sessions.create()
result = session.run(input="이 저장소의 README를 요약해줘")
print(result.output)
```

## 자주 하는 실수

- CLI에서 가능한 동작이 SDK에서도 자동으로 가능하다고 가정하기 — 일부 기능은 SDK 전용 또는 CLI 전용이라 `migration-guide.md` 확인이 필수
- `permissions` 설정 없이 운영 환경 배포 — 기본 정책은 안전하지 않으므로 명시적 정책 정의 필요
- 세션 ID를 매 요청마다 새로 만들기 — 비용과 컨텍스트 효율을 위해 세션 재사용 패턴이 기본
- Streaming 모드를 채택했는데 클라이언트가 partial 결과를 처리할 준비가 안 된 채 띄우기

## 추천 읽기 순서

1. `overview.md` — SDK 표면과 CLI 차이 이해
2. `sessions.md` — 컨텍스트 영속 단위 이해
3. `custom-tools.md` — 자체 함수를 에이전트에 노출
4. `permissions.md` — 운영 환경에서 안전한 정책
5. `hooks.md` — 실행 흐름 가로채기
6. `typescript.md` 또는 `python.md` — 언어별 진입점

## 관련 가이드

- CLI 참조
- Hooks
- Subagents
- Plugins

## Official reference

- [Agent SDK overview](https://code.claude.com/docs/ko/agent-sdk/overview)
- [Claude Code docs map](https://code.claude.com/docs/ko/claude_code_docs_map)
