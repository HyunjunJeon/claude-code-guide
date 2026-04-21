# Interactive Mode

Interactive mode는 `claude`를 `-p` 없이 실행했을 때의 전체 터미널 작업 공간입니다.

## 무엇을 다루는가

공식 interactive-mode 문서는 다음을 다룹니다.

- 키보드 단축키
- 멀티라인 입력
- 명령 검색
- transcript viewer
- background Bash task
- prompt suggestion
- task list
- 푸터의 PR 상태
- vim 스타일 편집

이 문서는 그중 실무적으로 자주 쓰는 동작을 압축한 요약입니다.

## 핵심 입력 패턴

프롬프트에서:

- `/`는 commands와 skills
- `!`는 Bash mode
- `@`는 파일 경로 자동완성

대부분의 일상 작업은 이 세 진입점으로 시작합니다.

## 멀티라인 입력

공식 문서는 여러 방식을 제시합니다.

- `\` + `Enter`
- macOS의 `Option+Enter`
- 지원되는 터미널의 `Shift+Enter`
- `Ctrl+J`
- 로그나 코드 블록은 그대로 paste

터미널이 `Shift+Enter`를 기본 지원하지 않으면 `/terminal-setup`을 실행합니다.

## 키보드 기능

특히 중요한 기능:

- 히스토리 기반 command search
- transcript viewer
- task list toggle
- Bash 작업 백그라운드 전환
- `/config`를 통한 vim editor mode

단축키 목록을 외우는 것보다, 이 세션을 단순 REPL이 아니라 작업 공간으로 보는 습관이 더 중요합니다.

## Background Bash Tasks

Claude Code는 Bash 명령을 백그라운드로 돌릴 수 있어서, 긴 명령이 실행되는 동안에도 대화를 계속할 수 있습니다.

실전 경로는 두 가지입니다.

- Claude에게 백그라운드 실행을 요청
- Bash tool 실행 중 `Ctrl+B`로 백그라운드 전환

백그라운드 작업 출력은 파일로 저장되고, Claude가 나중에 다시 읽을 수 있습니다.

## Prompt Suggestions

프롬프트 입력창에는 흐릿한 추천 후속 명령이 나타날 수 있습니다. 기준은:

- 최근 git 이력
- 현재 대화 흐름
- 다음에 할 가능성이 큰 작업

시간을 아껴주면 쓰고, 집중을 방해하면 끄면 됩니다.

## Task List

복잡한 작업에서는 Claude가 compaction 이후에도 유지되는 task list를 관리할 수 있습니다.

중요한 동작:

- `Ctrl+T`로 표시/숨김
- pending, in-progress, complete 상태 표시
- `CLAUDE_CODE_TASK_LIST_ID`로 여러 세션 간 공유 가능

## 푸터의 PR 상태

열린 PR이 있는 브랜치에서 `gh`가 설치·인증되어 있으면, Claude Code는 푸터에 PR 상태를 직접 보여줄 수 있습니다.

공식 문서가 설명하는 대표 상태:

- approved
- pending review
- changes requested
- draft
- merged

## 언제 interactive mode가 맞는가

다음이면 interactive mode가 좋습니다.

- 여러 턴이 필요할 수 있다
- 수정 전에 탐색이 필요하다
- 승인과 task tracking이 중요하다
- 사람이 실시간으로 방향을 잡아야 한다

한 번 실행하고 끝나는 automation은 `-p` non-interactive mode가 더 맞습니다.

## 관련 가이드

- [CLI Reference](./README.md)
- [Quickstart](./quickstart.md)
- [Terminal Configuration](../09-advanced-features/terminal-configuration.md)

## 공식 출처

- [Interactive mode](https://code.claude.com/docs/ko/interactive-mode)
