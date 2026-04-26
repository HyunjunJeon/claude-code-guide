이 문서는 공식 Claude Code changelog를 빠르게 읽기 위한 실전 가이드입니다. 전체 upstream 릴리스 이력을 그대로 복제하지는 않습니다.

## 공식 changelog가 무엇인가

Anthropic은 버전별 릴리스 노트를 공식 changelog 페이지에 게시합니다. 공식 문서에 따르면 이 페이지는 GitHub의 `CHANGELOG.md`에서 생성되며, CLI 안에서는 `/release-notes`로 같은 흐름을 확인할 수 있습니다.

공식 문서가 권장하는 두 가지 빠른 확인:

- `claude --version`으로 현재 설치 버전 확인
- `/release-notes`로 Claude Code 안에서 변경사항 열기

## 효율적으로 읽는 방법

세 단계로 보면 됩니다.

1. 내 설치 버전을 확인하고
2. 그 위쪽 최신 항목을 훑고
3. 내가 많이 쓰는 기능 중심으로 다시 본다

특히 유용한 관찰 포인트:

- 세션 로딩과 `/resume`
- plugin 및 MCP 시작 속도
- 권한과 sandbox 수정
- UI/터미널 렌더링 수정
- web, remote, review 관련 변경

## 최신 주요 항목

현재 공식 changelog 페이지 기준 최신 항목은 다음과 같습니다.

### `2.1.116` — 2026년 4월 20일

중요한 변화:

- 큰 세션에서 `/resume`이 훨씬 빨라짐
- 여러 stdio MCP 서버 사용 시 시작 속도 개선
- VS Code 계열 터미널의 fullscreen scrolling 개선
- plugin reload/auto-update가 누락된 의존성을 자동 설치할 수 있게 됨
- 보안 및 터미널 동작 관련 수정 다수 포함

긴 세션, plugin-heavy 환경, IDE 통합 터미널을 많이 쓴다면 특히 볼 가치가 큽니다.

### `2.1.114` — 2026년 4월 18일

- agent teams teammate 권한 요청 시 발생하던 permission dialog crash 수정

멀티에이전트 워크플로를 쓰는 팀에게는 작은 항목이지만 중요합니다.

### `2.1.113` — 2026년 4월 17일

주요 내용:

- CLI가 번들 JavaScript 대신 네이티브 Claude Code 바이너리를 실행
- `sandbox.network.deniedDomains` 추가
- `/ultrareview` 개선
- `/loop` wakeup 동작 개선
- Bash allow/deny 규칙 관련 보안 수정 다수

sandbox 정책, review 워크플로, shell safety에 민감하다면 이 항목을 자세히 읽는 편이 좋습니다.

## 언제 weekly digest를 볼까

changelog는 버전 단위의 정확한 변화 확인용입니다. 모든 수정이 아니라 "무엇이 내 작업 방식을 바꾸는가"를 보고 싶다면 WHATS-NEW.md 또는 공식 weekly digest가 더 적합합니다.

정리하면:

- changelog: 정확한 버전 변화
- weekly digest: 중요한 기능 변화와 데모

## 운영상 조언

- "최근에 뭔가 바뀐 것 같다"면 먼저 changelog를 확인합니다
- 장애나 버그 리포트에는 설치 버전을 같이 남깁니다
- 저장소 문제라고 단정하기 전에 최신 fix와 증상을 대조합니다
- Bash 규칙, plugin, sandbox를 많이 쓴다면 보안 fix를 더 주의 깊게 봅니다

## 관련 가이드

- [Quickstart](https://wikidocs.net/345345)
- [문제 해결](https://wikidocs.net/345703)
- [오류 참고](https://wikidocs.net/345702)
- What's New

## 공식 출처

- [Claude Code changelog](https://code.claude.com/docs/ko/changelog)
