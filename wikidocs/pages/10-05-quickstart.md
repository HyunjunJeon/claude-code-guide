이 문서는 공식 Claude Code quickstart를 터미널 사용자 관점으로 압축한 첫 실행 가이드입니다. 전체 CLI 레퍼런스를 읽기 전에 빠르게 시작하고 싶다면 여기부터 보는 편이 좋습니다.

## 시작 전 준비

먼저 다음을 준비합니다.

- 명령을 실행할 수 있는 터미널 또는 셸
- 작업할 코드 프로젝트나 저장소
- 다음 중 하나의 계정 경로:
  - Claude Pro, Max, Team, Enterprise 구독
  - Claude Console 계정과 API 과금
  - Bedrock, Vertex AI, Microsoft Foundry 같은 지원 공급자 경로

Windows를 WSL 없이 네이티브로 사용할 예정이라면 Git for Windows를 먼저 설치합니다.

## 1단계: Claude Code 설치

권장 네이티브 설치 방법:

```sh
# macOS, Linux, WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

대안 패키지 매니저:

```sh
brew install --cask claude-code
winget install Anthropic.ClaudeCode
```

설치 시 알아둘 점:

- 네이티브 설치는 백그라운드 자동 업데이트를 사용합니다.
- `brew`, `winget` 설치는 수동 업그레이드가 필요합니다.
- Homebrew의 `claude-code`는 stable 채널, `claude-code@latest`는 latest 채널을 추적합니다.

## 2단계: 로그인

처음 한 번 Claude Code를 실행하고 로그인 흐름을 완료합니다.

```sh
claude
```

대화형 세션 안에서는 다음 명령으로도 로그인할 수 있습니다.

```plaintext
/login
```

지원되는 로그인 경로:

- Claude 구독 계정
- Claude Console 계정
- Bedrock, Vertex AI, Foundry 기반 클라우드 인증

현재 어떤 계정이 활성화되었는지는 `/status`로 확인합니다.

## 3단계: 첫 세션 시작

프로젝트 디렉터리에서 Claude Code를 실행합니다.

```sh
cd /path/to/project
claude
```

처음에 자주 쓰는 명령:

```plaintext
/help
/resume
/status
```

## 4단계: 코드베이스 탐색 질문하기

바로 수정보다 먼저 저장소 이해 질문부터 던지는 편이 좋습니다.

```plaintext
what does this project do?
what technologies does this project use?
where is the main entry point?
explain the folder structure
```

Claude Code는 필요할 때 프로젝트 파일을 읽기 때문에, 대부분의 경우 긴 문맥을 직접 붙여넣을 필요가 없습니다.

## 5단계: 작은 수정부터 시도하기

처음에는 범위가 작은 변경이 적합합니다.

```plaintext
add a hello world function to the main file
```

일반적인 흐름:

1. Claude가 관련 파일을 찾습니다.
2. 수정안을 제안합니다.
3. 사용자가 승인하거나 거부합니다.
4. Claude가 편집을 적용합니다.

권한 프롬프트는 정상 동작입니다. 더 세밀한 제어는 [Permissions and Security](https://wikidocs.net/345697)를 참고하면 됩니다.

## 6단계: Git 작업을 대화형으로 처리하기

자주 쓰는 Git 프롬프트:

```plaintext
what files have I changed?
commit my changes with a descriptive message
create a new branch called feature/quickstart
show me the last 5 commits
help me resolve merge conflicts
```

Claude Code가 Git 상태를 읽고 명령을 제안할 수는 있지만, 브랜치 이름, 커밋 메시지, 충돌 해결 결과는 항상 직접 검토하는 편이 안전합니다.

## 7단계: 버그 수정이나 기능 추가 요청하기

원하는 작업을 자연어로 설명합니다.

```plaintext
there's a bug where users can submit empty forms - fix it
```

또는:

```plaintext
add input validation to the user registration form
```

더 잘 작동하게 하려면:

- 증상, 범위, 기대 결과를 함께 적고
- 이미 알고 있는 관련 파일이나 모듈을 지정하고
- 정확성이 중요하면 테스트도 같이 요청합니다

## 핵심 명령

| 명령 | 용도 |
|---|---|
| `claude` | 대화형 모드 시작 |
| `claude "task"` | 초기 프롬프트와 함께 세션 시작 |
| `claude -p "query"` | print mode로 한 번 실행하고 종료 |
| `claude -c` | 가장 최근 대화 계속 |
| `claude -r <session>` | 이름 또는 ID로 세션 재개 |
| `/help` | 사용 가능한 슬래시 명령 보기 |
| `/clear` | 현재 대화 문맥 비우기 |
| `exit` 또는 `Ctrl+D` | Claude Code 종료 |

## 초보자 팁

- "fix the bug"보다 "잘못된 자격 증명 입력 후 빈 화면이 뜨는 로그인 버그를 고쳐라"처럼 구체적으로 적는 편이 낫습니다.
- 큰 작업은 단계로 나눠 지시합니다.
- 처음 보는 코드베이스에서는 수정 전에 먼저 분석을 시킵니다.
- Tab 완성, 명령 기록, `/` 명령 검색을 활용하면 속도가 크게 빨라집니다.

## 다음에 읽을 문서

- [CLI 참조](https://wikidocs.net/345354)
- [도구 참고](https://wikidocs.net/345356)
- [문제 해결](https://wikidocs.net/345703)
- [Permissions and Security](https://wikidocs.net/345697)
- [Session and Interaction](https://wikidocs.net/345358)
- [Execution Modes](https://wikidocs.net/345673)

## 공식 출처

- [Claude Code Quickstart](https://code.claude.com/docs/ko/quickstart)
