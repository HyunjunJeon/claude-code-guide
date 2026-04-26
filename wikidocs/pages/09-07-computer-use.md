Claude Code의 computer use는 CLI에서 Claude가 macOS 실제 화면을 열고, 클릭하고, 입력하고, 읽을 수 있게 해 줍니다. 터미널이나 API로 끝내기 어려운 GUI 작업을 처리할 때 쓰는 가장 넓은 범위의 fallback입니다.

## 개요

다음처럼 터미널 밖의 작업에 적합합니다.

- 네이티브 앱 빌드와 검증
- 시각적/레이아웃 문제 디버깅
- 시뮬레이터 흐름 테스트
- CLI나 MCP가 없는 GUI 전용 도구 제어

공식 문서 기준으로 computer use는 macOS의 research preview이며, Pro 또는 Max 플랜, Claude Code v2.1.85 이상, 대화형 세션, 그리고 `claude.ai` 인증이 필요합니다.

## 사전 조건

| 항목 | 요구사항 |
|---|---|
| 플랫폼 | CLI에서는 macOS만 지원 |
| 플랜 | Pro 또는 Max |
| Claude Code 버전 | v2.1.85 이상 |
| 세션 | 대화형 세션만 가능, `-p` 불가 |
| 인증 | `claude.ai`로 로그인 |

CLI에서 사용할 수 없는 환경:

- Linux / Windows
- Team / Enterprise 플랜
- Bedrock, Vertex AI, Foundry 같은 서드파티 제공자

## 설정 및 사용 흐름

1. 대화형 Claude Code 세션에서 `/mcp`를 실행합니다.
2. MCP 서버 목록에서 `computer-use`를 찾아 활성화합니다.
3. 화면 녹화와 손쉬운 사용(Accessibility) 권한을 허용합니다.
4. Claude가 세션별 앱 승인 프롬프트를 띄우면 필요한 앱만 허용합니다.
5. GUI 작업을 Claude에게 요청합니다.

활성화는 프로젝트별로 유지되므로, 같은 저장소에서는 보통 한 번만 설정하면 됩니다.

실무 예시:

- `앱을 빌드하고 실행한 뒤 환경설정 창을 열어 결과를 스크린샷해줘.`
- `작은 창에서 하단이 잘리도록 만들어 보고, 레이아웃을 고친 뒤 다시 확인해줘.`
- `iOS Simulator를 열고 온보딩을 끝까지 눌러 보면서 어디서 막히는지 알려줘.`

## 제한 사항

- 한 번에 한 Claude Code 세션만 컴퓨터를 제어할 수 있습니다.
- CLI에서는 macOS만 지원합니다.
- 비대화형 모드(`-p`)에서는 사용할 수 없습니다.
- Claude가 작업하는 동안 앱이 숨겨집니다.
- 스크린샷은 자동으로 축소됩니다.
- CLI에는 Desktop 앱의 denied-apps 목록이 아직 없습니다.

## 보안 참고

computer use는 Bash 샌드박스가 아니라 실제 데스크톱에서 동작합니다. 신뢰 경계가 다릅니다.

- 현재 세션에서 승인한 앱만 제어할 수 있습니다.
- 셸, 파일 시스템, 시스템 설정 접근이 있는 앱은 더 강한 경고가 뜹니다.
- 터미널 창은 스크린샷에서 제외되므로, 터미널에 보이는 내용이 다시 모델로 들어가지 않습니다.
- `Esc`는 어디서든 computer use를 즉시 중단합니다.
- 잠금 파일로 인해 동시에 두 세션이 같은 머신을 제어하지 못합니다.

신뢰할 수 없는 화면이나 앱에서는 prompt injection 위험이 남아 있으므로 주의해야 합니다.

## 문제 해결

### `computer-use`가 다른 Claude 세션에서 사용 중이라고 나옴

다른 Claude Code 세션이 머신 잠금을 잡고 있습니다. 해당 세션을 끝내거나 종료하세요. 다른 세션이 비정상 종료된 경우에는 Claude가 프로세스 종료를 감지한 뒤 잠금을 해제합니다.

### macOS 권한 프롬프트가 계속 다시 나옴

Claude Code를 완전히 종료한 뒤 새 세션을 시작합니다. 그다음 System Settings > Privacy & Security에서 터미널 앱의 Screen Recording 권한이 켜져 있는지 확인합니다.

### `/mcp`에 `computer-use`가 보이지 않음

다음을 확인합니다.

- macOS인지
- Claude Code v2.1.85 이상인지
- Pro 또는 Max 플랜인지
- `claude.ai`로 인증했는지
- `-p`가 아닌 대화형 세션인지

## 관련 링크

- [공식 computer use 문서](https://code.claude.com/docs/ko/computer-use)
- [한국어 computer use 문서](https://code.claude.com/docs/ko/computer-use)
- [Computer use safety guide](https://support.claude.com)
- [Computer use in Desktop](https://code.claude.com/docs/ko/desktop)
- [Claude in Chrome](https://code.claude.com/docs/ko/chrome)
- [MCP 개요](https://wikidocs.net/345445)
- [권한 및 보안](https://wikidocs.net/345697)
