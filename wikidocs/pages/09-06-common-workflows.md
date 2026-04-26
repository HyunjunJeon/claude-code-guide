이 문서는 공식 workflow 가이드를 빠르게 재사용할 수 있는 패턴 중심으로 압축한 버전입니다.

## 새 코드베이스 이해하기

처음에는 넓게 묻고, 그다음 좁혀 들어갑니다.

예시 프롬프트:

```plaintext
give me an overview of this codebase
explain the main architecture patterns used here
what are the key data models?
how is authentication handled?
```

좋은 후속 질문:

- 프로젝트 컨벤션이 무엇인지 묻기
- 프로젝트 전용 용어집 요청하기
- 특정 사용자 흐름을 끝에서 끝까지 추적하게 하기

## 관련 코드 찾기

파일 이름만이 아니라 도메인 언어와 실행 흐름을 같이 묻는 편이 좋습니다.

```plaintext
find the files that handle user authentication
how do these authentication files work together?
trace the login process from front-end to database
```

코드 인텔리전스 플러그인이 있으면 정확도가 더 좋아집니다.

## 버그 효율적으로 고치기

증상만 말하지 말고 재현 방법을 함께 줍니다.

```plaintext
I'm seeing an error when I run npm test
suggest a few ways to fix the @ts-ignore in user.ts
update user.ts to add the null check you suggested
```

좋은 습관:

- 실패하는 명령 포함하기
- 스택 트레이스 포함하기
- 간헐적인지 항상 재현되는지 적기
- 수정 후 검증까지 같이 요청하기

## 리팩터링 안전하게 하기

리팩터링은 범위와 호환성 기준이 분명할수록 잘 됩니다.

```plaintext
find deprecated API usage in our codebase
suggest how to refactor utils.js to use modern JavaScript features
refactor utils.js to use ES2024 features while maintaining the same behavior
run tests for the refactored code
```

한 번에 크게 바꾸기보다 작고 검증 가능한 단위로 나누는 편이 안전합니다.

## 전문화된 subagent 쓰기

옆 작업이 메인 대화 문맥을 너무 많이 먹는다면 subagent가 적합합니다.

대표적인 용도:

- 보안 리뷰
- 테스트 트리아지
- 깊은 코드베이스 탐색
- 범위가 제한된 구현 작업

먼저 `/agents`로 확인하고, 필요하면 Claude에게 위임시키거나 직접 특정 역할을 요청합니다.

## 분석에는 Plan Mode 쓰기

위험한 변경은 다음 순서가 좋습니다.

1. 읽고 분석한다
2. 계획을 만든다
3. 계획을 검토한다
4. 구현한다

곧바로 편집부터 시작하는 것보다 이 흐름이 더 안정적인 경우가 많습니다.

## 테스트와 함께 일하기

Claude는 검증 경로가 명확할수록 더 잘 작동합니다.

다음 식으로 요청할 수 있습니다.

- 어떤 테스트가 실패하는지 찾기
- 실패 이유 설명하기
- 가장 작은 유효한 수정 적용하기
- 관련 테스트부터 다시 돌리기
- 그다음 더 넓은 검증 돌리기

## Pull Request 준비하기

PR 관련 작업 예:

- diff 요약
- 커밋 메시지 작성
- PR 설명 초안
- 위험한 파일과 회귀 가능성 찾기
- 리뷰 체크리스트 제안

의도한 변경과 승인 기준, 릴리스 노트나 마이그레이션 제약을 같이 주면 훨씬 좋아집니다.

## 문서와 노트 다루기

Claude Code는 코드 외 작업에도 잘 맞습니다.

- 문서 재작성
- changelog 초안
- runbook 정리
- 노트 요약
- 저장소 전반 용어 통일

## 비대화형 모드 활용하기

공식 문서는 다음 같은 CLI 흐름도 강조합니다.

- pipe in, pipe out
- 구조화된 출력
- 예약 실행
- 검증 파이프라인에 Claude 추가하기

이런 작업은 대화형 세션보다 automation/CI 경로에 더 잘 맞습니다.

## 세션과 worktree 패턴

긴 작업에서는 다음 패턴이 유용합니다.

- 연속성이 중요하면 세션 재개
- 찾기 쉽게 세션 이름 붙이기
- 다른 접근을 시험하려면 세션 포크
- 별도 파일 트리가 필요하면 Git worktree로 병렬 세션 실행

## 관련 가이드

- Best Practices
- Planning Mode Examples
- Session and Interaction
- Execution Modes

## 공식 출처

- [Common workflows](https://code.claude.com/docs/ko/common-workflows)
