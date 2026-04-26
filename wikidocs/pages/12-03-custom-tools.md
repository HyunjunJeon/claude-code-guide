커스텀 도구는 Agent SDK에 프로젝트 전용 기능을 붙이는 방법입니다. 보통 인프로세스 MCP 서버로 정의해서 Claude가 기본 도구처럼 호출하게 만듭니다.

## 무엇인가

도구의 스키마와 핸들러를 정의한 뒤, MCP 서버로 등록해서 `query(...)`에 넘깁니다. Claude는 빌트인 도구와 함께 이 도구를 볼 수 있지만, 허용한 것만 사용할 수 있습니다.

## 언제 쓰는가

내장된 파일/셸/웹 도구만으로 부족할 때 씁니다. 예를 들면 사내 API 조회, 데이터베이스 검색, 브라우저 자동화, 계산기, 서비스별 워크플로가 있습니다.

## 멘탈 모델

흐름은 세 단계로 보면 됩니다.

1. 도구 계약과 핸들러를 정의한다.
2. 도구 묶음을 MCP 서버로 등록한다.
3. Claude가 사용할 도구만 명시적으로 허용한다.

이렇게 해야 확장성은 유지하면서 접근 범위는 좁게 가져갈 수 있습니다.

## 핵심 API와 패턴

- `createSdkMcpServer(...)`로 인프로세스 MCP 서버를 만듭니다.
- `tool(...)`로 이름, 설명, 스키마, 핸들러를 정의합니다.
- `mcpServers`로 서버를 `query(...)`에 전달합니다.
- `allowedTools`에는 필요한 `mcp__{server_name}__{tool_name}`만 넣습니다.
- MCP 도구를 쓸 때는 문자열 프롬프트보다 async generator/iterable을 쓰는 스트리밍 입력 모드가 필요합니다.
- `maxTurns`를 두면 커스텀 도구가 여러 턴을 유발해도 제어하기 쉽습니다.

이름 규칙 예시:

- `get_weather`를 `my-custom-tools` 서버에 두면 `mcp__my-custom-tools__get_weather`가 됩니다.

## 흔한 실수

- MCP 서버를 쓰면서 문자열 프롬프트를 그대로 넣는 것
- 서버 전체를 열어 놓고 세부 도구를 제한하지 않는 것
- 입력과 출력을 검증하지 않는 것
- 에러 메시지를 충분히 의미 있게 돌려주지 않는 것

## 관련 링크

- 권한
- 에이전트 루프
- 공식 커스텀 도구 가이드: https://platform.claude.com/docs/en/agent-sdk/custom-tools
- 공식 MCP 가이드: https://platform.claude.com/docs/en/agent-sdk/mcp
- TypeScript SDK: https://code.claude.com/docs/ko/agent-sdk/typescript
- Python SDK: https://code.claude.com/docs/ko/agent-sdk/python
