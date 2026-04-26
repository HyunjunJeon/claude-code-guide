Claude Code Desktop은 Claude Code를 그래픽 워크스페이스로 제공하는 공식 실행 표면입니다. 여러 세션을 나란히 두고 작업하고, 시각적으로 diff를 검토하고, 로컬 저장소와 로컬 도구에 직접 접근해야 할 때 가장 유용합니다.

## Desktop이 추가하는 것

공식 quickstart는 Desktop의 핵심 가치를 다음처럼 설명합니다.

- 병렬 세션을 관리하는 사이드바
- 드래그 앤 드롭 레이아웃
- 통합 터미널과 파일 에디터
- 시각적 diff 리뷰
- 라이브 앱 프리뷰
- GitHub PR 모니터링과 auto-merge
- Scheduled tasks

즉, 단순히 CLI를 감싼 UI가 아니라 로컬 작업, 검토, 추적을 한곳에 묶는 작업 공간입니다.

## 세 개의 주요 탭

공식 quickstart는 Desktop을 세 탭으로 설명합니다.

- `Code`: Claude Code 세션 실행과 코드 변경 검토
- `Cowork`: 조사, 계획, 일반 협업용 공간
- `Schedule`: 반복 작업과 루틴 관리

중요한 점은 모든 요청이 곧바로 코드 세션이 되는 것은 아니라는 점입니다. Dispatch가 작업 성격을 판단해서 Code 세션으로 넘기기도 합니다.

## 로컬 코딩 세션 시작

### 1. 폴더 열기

Claude가 작업할 로컬 프로젝트 폴더를 엽니다.

### 2. 모드 선택

Desktop 세션은 프롬프트 옆 모드 선택기를 제공합니다. 공식 reference는 세션 도중에도 모드를 바꿀 수 있다고 설명합니다.

대표적인 선택:

- `Ask permissions`: 처음 쓰는 저장소에서 가장 안전
- `Auto accept edits`: 파일 수정과 일반 파일 시스템 조작을 더 빠르게 진행
- `Plan`: 수정 전에 접근 방식을 먼저 검토

세부 모드는 세션 유형에 따라 다르지만, 웹 클라우드 세션보다 Desktop 로컬 세션이 더 넓은 통제 범위를 제공합니다.

### 3. 컨텍스트를 제대로 넣기

공식 reference가 강조하는 프롬프트 컨텍스트 기능:

- `@mention`으로 로컬 파일을 세션 컨텍스트에 추가
- 이미지, PDF 같은 파일 첨부

단, `@mention`은 remote 세션에서는 지원되지 않습니다. 로컬 Desktop 세션과 원격 루틴을 혼동하면 여기서 차이가 크게 납니다.

## 코드 작업 방식

Desktop은 다음 기능을 의도적으로 쓸 때 장점이 큽니다.

### 프롬프트 박스

자연어로 지시를 보내고, 작업 중간에 중단해서 방향을 바꿀 수 있습니다. 공식 문서는 후속 입력에 맞춰 Claude가 현재 작업을 조정한다고 설명합니다.

### Diff 검토

변경을 눈으로 검토해야 하는 작업이라면 Desktop이 강합니다. 수정 내용을 시각적으로 비교하는 흐름이 이미 제품 설계에 포함돼 있습니다.

### 통합 터미널

빌드, 테스트, 디버깅 출력을 대화 바로 옆에서 확인할 수 있어 문맥 전환이 줄어듭니다.

### 라이브 프리뷰

프론트엔드나 앱 작업에서는 수정 후 화면 변화를 바로 확인할 수 있다는 점이 실무적으로 큽니다.

## 권한 모드 실전 해석

공식 desktop reference는 권한 모드를 "편집, 명령 실행, 또는 둘 다를 어디까지 자동화할 것인가"의 문제로 설명합니다. 실전에서는 다음처럼 쓰는 편이 낫습니다.

- 저장소를 처음 볼 때는 `Ask permissions`
- 파일 수정 속도가 중요하지만 명령 실행은 보고 싶으면 `Auto accept edits`
- 문제 정의가 애매해서 접근 방식부터 보고 싶으면 `Plan`

반복 작업이 많아지면 승인을 많이 누르는 것보다, 저장소 지침과 프롬프트를 안정화하는 편이 더 효과적입니다.

## Dispatch와 연동

Desktop은 단순한 에디터가 아니라 Claude 앱 전체와 연결된 작업 표면입니다.

- 사용자가 직접 Dispatch에 Code 세션을 열라고 요청할 수 있고
- Dispatch가 개발 작업이라고 판단해서 Code 세션을 자동으로 열 수도 있으며
- 작업 완료나 승인 필요 상태를 푸시 알림으로 받을 수 있습니다

즉, Desktop은 실행기이면서 오케스트레이션 UI이기도 합니다.

## Pull Request와 CI 추적

공식 quickstart는 PR 모니터링과 auto-merge를 명시적으로 소개합니다. 의도된 흐름은 대체로 다음과 같습니다.

1. Claude가 브랜치를 준비
2. PR 생성
3. Desktop에서 CI 상태 추적
4. 필요하면 Claude가 실패를 수정하거나, 통과 후 merge 수행

브라우저와 터미널을 오가며 수동으로 추적하는 것보다 더 짧은 검토 루프를 만들 수 있습니다.

## 반복 작업과 Schedule 탭

Desktop의 `Schedule` 탭은 두 가지를 함께 보여줄 수 있습니다.

- 로컬 scheduled task
- Anthropic 관리형 클라우드에서 도는 remote routine

핵심 차이:

- 로컬 scheduled task는 내 파일과 도구에 접근하지만 앱이 열려 있고 머신이 깨어 있어야 함
- remote routine은 머신이 꺼져 있어도 돌지만 현재 로컬 체크아웃이 아니라 fresh clone 기준으로 실행됨

## 언제 Desktop이 맞는가

다음이 중요하면 Desktop을 고르는 편이 맞습니다.

- 로컬 저장소 직접 접근
- 시각적 diff 검토
- 통합 프리뷰와 터미널
- 한 화면에서 여러 세션 병렬 관리
- GUI 기반 스케줄링

반대로 클라우드 실행과 GitHub 중심 브랜치 분리가 더 중요하면 웹이 맞고, 가장 직접적인 통제와 최소 인터페이스가 중요하면 터미널 CLI가 맞습니다.

## 공식 참고 문서

- Desktop quickstart: `https://code.claude.com/docs/ko/desktop-quickstart`
- Desktop reference: `https://code.claude.com/docs/ko/desktop`
- Desktop scheduled tasks: `https://code.claude.com/docs/ko/desktop-scheduled-tasks`
