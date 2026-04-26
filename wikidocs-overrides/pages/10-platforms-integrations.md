# 플랫폼과 통합

Claude Code는 터미널만의 도구가 아니라 Remote Control, Web, Desktop, IDE, Slack, CI/CD 같은 여러 실행 표면에서 같은 agentic coding engine을 사용합니다. 이 섹션은 어떤 환경에서 어떤 기능을 쓰면 좋은지 정리합니다.

## 추천 읽기 순서

| 순서 | 문서 | 읽는 이유 |
|---|---|---|
| 1 | [플랫폼 & 통합](09-24-platforms.md) | Chrome 통합, Remote Control, Web, Desktop의 전체 지형도 |
| 2 | [Remote Control](10-remote-control.md) | 로컬 세션을 모바일·브라우저에서 이어서 제어하는 방식 |
| 3 | [Claude Code 웹 시작하기](09-31-web-quickstart.md) | 브라우저에서 cloud session을 시작하는 방법 |
| 4 | [웹에서 Claude Code 사용하기](09-03-claude-code-on-the-web.md) | 웹 세션의 장점과 로컬 세션과의 차이 |
| 5 | [Desktop Quickstart](09-10-desktop-quickstart.md) | 데스크톱 앱 시작 경로 |
| 6 | [Claude Code Desktop 사용하기](09-12-desktop.md) | 데스크톱 앱의 diff review, 세션 관리, 예약 작업 |
| 7 | [Use Claude Code in VS Code](09-30-vscode.md) | 에디터 안에서 Claude Code를 쓰는 방식 |
| 8 | [Slack의 Claude Code](09-28-slack.md) | 팀 채팅에서 작업을 요청하고 결과를 받는 흐름 |
| 9 | [GitHub Actions](09-16-github-actions.md) | CI에서 리뷰, triage, 자동화를 실행 |
| 10 | [GitLab CI/CD](09-18-gitlab-ci-cd.md) | GitLab 환경에서 자동화 흐름 구성 |
| 11 | [GitHub Enterprise Server](09-17-github-enterprise-server.md) | 엔터프라이즈 GitHub 환경 고려사항 |
| 12 | [Computer Use](09-07-computer-use.md) | 브라우저나 GUI를 직접 다루는 preview 기능 |
| 13 | [Channels Reference](09-02-channels-reference.md) | 외부 채널과 이벤트 기반 진입점 |

## 선택 기준

- 로컬 코드베이스를 깊게 다루면서 다른 기기에서 이어가려면 Remote Control을 우선합니다.
- 로컬 설정 없이 새 작업을 시작하려면 Web을 고려합니다.
- 오래 걸리는 병렬 작업은 Web, Routines, Desktop Scheduled Tasks를 함께 검토합니다.
- 팀 이벤트와 리뷰 자동화는 Slack, GitHub Actions, GitLab CI/CD를 연결합니다.
