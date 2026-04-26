이 문서는 Claude Code Desktop을 가장 빨리 실무에 올리는 짧은 시작 가이드입니다.

## Desktop은 언제 쓰는가

Desktop은 로컬 그래픽 작업 공간입니다. 다음이 필요하면 잘 맞습니다.

- 로컬 파일 접근
- 시각적 diff 검토
- live preview
- 하나의 UI 안에서 여러 세션 관리
- 로컬 scheduled task

웹은 cloud-first 브랜치 작업에 더 적합하고, 터미널은 가장 세밀한 제어가 필요할 때 더 적합합니다.

## 설치

`claude.ai`에서 Desktop 앱을 내려받습니다.

- macOS
- Windows

설치 후 Claude Code에 쓰는 것과 같은 Anthropic 계정으로 로그인합니다.

## 첫 코딩 세션 시작

1. 로컬 프로젝트 폴더 열기
2. `Code` 탭으로 이동
3. 권한 모드 선택
4. 구체적인 프롬프트 입력

처음 권장 모드:

- `Ask permissions`

속도를 높일 때:

- `Auto accept edits`
- `Plan`

## 컨텍스트 추가

Desktop은 다음을 지원합니다.

- 로컬 파일 `@mention`
- 이미지나 PDF 같은 파일 첨부

이 점이 로컬 파일 mention이 없는 cloud session과의 큰 차이입니다.

## 변경 검토

다음 상황에서는 Desktop의 visual diff가 특히 좋습니다.

- 여러 파일에 걸친 변경
- 인라인 코멘트가 필요한 리뷰
- raw patch보다 눈으로 보는 편이 빠른 UI 변경

## Live Preview 사용

앱이나 프론트엔드 작업에서는 로컬 dev server를 연결해 Desktop 안에서 실행 결과를 바로 확인할 수 있습니다.

전형적인 흐름:

1. dev server 설정 또는 실행
2. Claude가 코드 수정
3. preview에서 시각 검증
4. 반복

## PR과 CI 추적

Desktop은 구현, 리뷰, CI 수정 흐름을 앱 안에 붙여 둘 수 있습니다. 브라우저와 터미널을 계속 오가지 않아도 되는 것이 장점입니다.

## Schedule 탭 사용

Desktop은 다음 두 가지를 함께 노출합니다.

- 내 머신에서 도는 local scheduled task
- 클라우드에서 도는 remote routine

구분이 중요합니다.

- local task는 로컬 저장소와 로컬 도구를 사용
- remote routine은 cloud session과 fresh clone을 사용

## 언제 표면을 바꿔야 하나

- 로컬 시각 작업은 Desktop
- 가장 직접적인 제어는 터미널
- 오래 걸리는 클라우드 작업은 웹

## 관련 가이드

- [Desktop](https://wikidocs.net/345686)
- [Desktop Scheduled Tasks](https://wikidocs.net/345678)
- [Claude Code On The Web](https://wikidocs.net/345684)

## 공식 출처

- [Get started with the desktop app](https://code.claude.com/docs/ko/desktop-quickstart)
