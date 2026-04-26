이 섹션은 Claude Code를 실제로 호출하고 조작하는 표면을 다룹니다. 터미널 CLI, 대화형 모드, slash command, 출력 형식, 도구 레퍼런스를 한 흐름으로 묶었습니다.

## 추천 읽기 순서

| 순서 | 문서 | 읽는 이유 |
|---|---|---|
| 1 | Slash Command | `/help`, `/model`, `/permissions` 같은 기본 명령과 skill 기반 명령 이해 |
| 2 | `/ultraplan` | 로컬 planning을 웹에서 검토하고 실행하는 흐름 |
| 3 | `/ultrareview` | 클라우드 샌드박스 기반 원격 리뷰 흐름 |
| 4 | CLI 참조 | `claude` 명령의 전체 옵션과 사용 맥락 |
| 5 | Interactive Mode | 대화형 세션에서 사용할 수 있는 조작 방식 |
| 6 | 도구 참고 | Claude Code 내부 도구의 역할과 권한 이해 |
| 7 | Output Styles | 응답 스타일과 출력 형식 조정 |
| 8 | 세션 & 인터랙션 | 세션 관리, 대화 흐름, 상호작용 기능 |
| 9 | Changelog | 버전별 명령과 동작 변화 확인 |

## 읽는 기준

- 처음이라면 Slash Command와 Interactive Mode만 먼저 봐도 충분합니다.
- 자동화나 CI에서 쓰려면 CLI 참조와 Output Styles까지 읽습니다.
- 동작이 예상과 다르면 Changelog와 문제 해결 섹션을 함께 확인합니다.
