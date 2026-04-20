---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git diff:*)
argument-hint: [message]
description: Create a git commit with context
---

## 컨텍스트

- 현재 git 상태: !`git status`
- 현재 git diff: !`git diff HEAD`
- 현재 브랜치: !`git branch --show-current`
- 최근 커밋: !`git log --oneline -10`

## 작업 내용

위의 변경사항을 기반으로 단일 git 커밋을 생성합니다.

인수로 메시지가 제공된 경우 해당 메시지를 사용합니다: $ARGUMENTS

그렇지 않으면 변경사항을 분석하고 conventional commits 형식에 따라 적절한 커밋 메시지를 생성합니다:
- `feat:` 새로운 기능
- `fix:` 버그 수정
- `docs:` 문서 변경
- `refactor:` 코드 리팩터링
- `test:` 테스트 추가
- `chore:` 유지보수 작업

---
