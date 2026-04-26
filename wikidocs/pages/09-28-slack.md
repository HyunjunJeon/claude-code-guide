Slack의 Claude Code는 Slack 채널에서 바로 코딩 작업을 넘겨 Claude Code on the web 세션으로 실행하게 해 줍니다. `@Claude`를 멘션하면 Claude가 요청을 해석해 코드 작업이면 Claude Code로 라우팅합니다.

## 개요

이 통합은 Slack용 Claude 앱 위에서 동작하며, 개발 작업은 웹의 Claude Code 세션으로 넘깁니다. 이미 Slack 대화 안에 맥락이 있을 때 특히 유용합니다.

핵심 동작은 다음과 같습니다.

- `@Claude`가 코딩 의도를 자동 감지합니다.
- 스레드 또는 최근 채널 메시지에서 컨텍스트를 수집합니다.
- `claude.ai/code`에서 새 세션을 만듭니다.
- 진행 상태를 Slack 스레드에 다시 올립니다.
- 완료되면 요약과 작업 버튼을 제공합니다.

Slack의 Claude Code는 공개 채널과 비공개 채널에서만 동작하며, DM에서는 동작하지 않습니다.

## 사전 조건

| 항목 | 요구사항 |
|---|---|
| Claude 플랜 | Claude Code 액세스가 포함된 Pro, Max, Team, Enterprise |
| Claude Code on the web | 활성화되어 있어야 함 |
| GitHub | 최소 하나의 저장소를 연결하고 인증해야 함 |
| Slack 인증 | Slack 계정이 Claude 계정과 연결되어 있어야 함 |
| 관리자 권한 | 워크스페이스 관리자가 Claude 앱을 설치해야 함 |

## 설정 및 사용 흐름

1. Slack 워크스페이스 관리자가 Slack App Marketplace에서 Claude 앱을 설치합니다.
2. Slack의 Claude App Home에서 Claude 계정을 연결합니다.
3. Claude Code on the web에서 같은 계정으로 로그인하고 GitHub를 연결합니다.
4. 사용할 저장소를 하나 이상 인증합니다.
5. 라우팅 모드를 선택합니다.
   - `Code only`는 모든 `@mention`을 Claude Code 세션으로 보냅니다.
   - `Code + Chat`은 코드 작업과 일반 대화를 자동으로 구분합니다.
6. 채널에서 `/invite @Claude`로 Claude를 초대합니다.
7. 채널 또는 스레드에서 `@Claude`를 멘션해 작업을 시작합니다.
8. 결과는 `View Session`, `Create PR`, `Retry as Code`, `Change Repo`로 확인합니다.

## 제한 사항

- DM은 지원하지 않습니다.
- 현재는 GitHub 저장소만 지원합니다.
- 한 세션은 한 번에 하나의 PR만 만들 수 있습니다.
- 세션은 개인 Claude 플랜의 속도 제한을 사용합니다.
- Claude Code on the web 액세스가 필요합니다.
- 웹 액세스가 없으면 일반 Claude 채팅 응답만 받을 수 있습니다.

## 보안 참고

Slack 맥락은 신뢰 경계의 일부입니다.

- Claude는 스레드와 주변 채널 컨텍스트를 읽을 수 있으므로, 신뢰할 수 있는 대화에서만 사용해야 합니다.
- Claude는 초대된 채널에서만 응답하므로 채널 멤버십이 접근 제어 역할을 합니다.
- 비공개 채널도 지원되므로 노출 범위를 더 세밀하게 제한할 수 있습니다.
- 워크스페이스 관리자가 설치를 제어하며, Enterprise Grid에서는 조직 관리자가 어떤 워크스페이스에 앱을 허용할지 결정할 수 있습니다.
- Slack에서 만든 세션은 Claude Code on the web 기록에 남고, Team 또는 Enterprise에서는 조직에 보일 수 있습니다.

## 문제 해결

### 세션이 시작되지 않음

- App Home에서 Claude 계정이 연결되어 있는지 확인합니다.
- Claude Code on the web 액세스가 켜져 있는지 확인합니다.
- GitHub 저장소가 최소 하나 연결되어 있는지 확인합니다.

### 저장소가 보이지 않음

- Claude Code on the web에서 저장소를 연결합니다.
- GitHub 권한을 확인합니다.
- 필요하면 GitHub 연결을 끊었다가 다시 연결합니다.

### 잘못된 저장소가 선택됨

- `Change Repo`를 사용합니다.
- 요청에 저장소 이름을 명시합니다.

### 인증 오류

- App Home에서 Claude 연결을 끊었다가 다시 연결합니다.
- 브라우저가 올바른 Claude 계정으로 로그인되어 있는지 확인합니다.
- 현재 플랜에 Claude Code 액세스가 포함되어 있는지 확인합니다.

### 세션이 만료됨

- `claude.ai/code`에서 과거 세션을 다시 열거나 이어서 작업할 수 있습니다.
- 전체 세션 기록은 웹에서 계속 접근할 수 있습니다.

## 관련 링크

- [공식 Slack 문서](https://code.claude.com/docs/ko/slack)
- [한국어 Slack 문서](https://code.claude.com/docs/ko/slack)
- [Claude Code on the web](https://claude.ai/code)
- [Slack App Marketplace](https://slack.com/apps)
- [Claude for Slack](https://support.claude.com)
- Claude Code 개요
