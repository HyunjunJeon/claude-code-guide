# MCP Elicitation

이 페이지는 MCP 서버가 워크플로우 도중에 사용자에게 구조화된 입력을 요청하는 Elicitation(v2.1.49+) 기능을 정리한다. 자유 형식 prompt가 아니라 "옵션 선택", "필수 필드 채우기", "확인" 같은 폼-style 요청을 안전하게 처리해야 할 때 본다. hook을 통한 자동 응답·검증 패턴까지 포함하므로 [06-hooks/](../06-hooks/) 모듈과 함께 읽어도 좋다.

MCP 서버는 대화형 대화 상자를 통해 사용자로부터 구조화된 입력을 요청할 수 있습니다 (v2.1.49+). 이를 통해 MCP 서버가 워크플로우 도중에 추가 정보를 요청할 수 있습니다 -- 예를 들어, 확인을 요청하거나, 옵션 목록에서 선택하거나, 필수 필드를 채우는 등 -- MCP 서버 상호작용에 대화형 기능을 추가합니다.

## MCP Elicitation 응답 처리

Elicitation은 자유 형식 prompt라기보다 반구조화 form exchange처럼 다루는 것이 좋습니다.

좋은 기준:

- 서버가 정확히 무엇을 요청하는지 먼저 검증
- 필요한 필드를 명확히 유지
- 이후 로그를 남길 경우 민감한 응답은 정규화하거나 redaction

MCP 서버가 multi-step workflow와 human input checkpoint를 섞어 쓰는 경우, 이 지점에서 hook 기반 validation도 특히 유용합니다. `Elicitation` 및 `ElicitationResult` hook 이벤트를 통해 elicitation 요청에 프로그래밍 방식으로 자동 응답하거나, 사용자 응답을 서버로 보내기 전에 가로채서 수정할 수 있습니다.
