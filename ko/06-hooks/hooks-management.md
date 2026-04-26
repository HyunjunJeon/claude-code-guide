# Hooks 관리

이미 정의된 hook을 확인하고, 비활성화하거나 제거하는 방법을 정리합니다. hook이 예상대로 작동하지 않을 때 가장 먼저 들러야 할 진입점도 다룹니다.

## `/hooks` 메뉴 사용

`/hooks`는 설정 파일을 직접 뒤지기 전에 현재 hook 구성을 대화형으로 확인하고 관리하고 싶을 때 쓰는 가장 빠른 진입점입니다.

대표적인 용도:

- 현재 어떤 hook event가 설정되어 있는지 확인
- 어떤 파일이나 컴포넌트가 hook를 소유하는지 찾기
- hook가 user, project, plugin, component 중 어디에서 왔는지 확인

Hook가 예상과 다르게 실행되거나 전혀 실행되지 않을 때 `/hooks` 메뉴부터 보는 것이 가장 빠릅니다.

## Hook 비활성화 또는 제거

Hook를 끄는 방법은 정의 위치에 따라 다릅니다:

- user/project/local settings: 해당 settings 파일에서 관련 `hooks` 항목 제거 또는 주석 처리
- plugin hooks: plugin을 비활성화하거나 plugin 정의에서 hook 제거
- component hooks: skill, agent, command frontmatter에서 `hooks` 블록 제거

안전한 작업 순서:

1. `/hooks` 또는 설정 파일 확인으로 hook 정의 위치를 찾습니다.
2. 전체 hook family를 지우기보다 가장 좁은 matcher 엔트리부터 비활성화합니다.
3. 동일한 동작을 한 번 다시 실행해 hook가 실제로 비활성화됐는지 확인합니다.

디버깅 목적이라면 event 전체를 지우는 것보다 단일 matcher 항목만 끄는 것이 안전합니다.
