# Routines

Routine은 Claude Code의 클라우드 자동화 표면입니다. 공식 문서는 routine을 "프롬프트, 하나 이상의 저장소, 그리고 connector 집합을 묶어 한 번 저장해 두고 자동으로 실행하는 Claude Code 구성"으로 설명합니다.

현재 공식 페이지 제목은 `Automate work with routines`이며, docs map 상에서는 여전히 `web-scheduled-tasks` 계열로 보일 수 있습니다.

## 언제 routine을 써야 하는가

노트북이 닫혀 있어도 계속 돌아야 하는 작업이면 routine이 맞습니다. 대표적인 예:

- 야간 PR 리뷰
- 정기 backlog triage
- 문서 drift 점검
- API 호출로 시작하는 배포 검증
- GitHub 이벤트에 반응하는 저장소 유지보수

핵심은 "무인 실행 가능하고 결과가 명확한 반복 작업"입니다.

## Routine을 구성하는 것

공식 문서 기준 routine은 다음 요소를 저장합니다.

- prompt
- 선택 모델
- 하나 이상의 GitHub 저장소
- environment 설정
- 포함할 connector
- 하나 이상의 trigger

각 실행은 새 클라우드 세션으로 시작합니다. 이 세션은 셸 명령을 실행하고, 저장소에 커밋된 skill을 쓰고, 포함된 connector를 호출할 수 있습니다.

## Desktop scheduled task와의 차이

이 둘은 자주 혼동되지만 공식 문서는 차이를 명확히 구분합니다.

- routine은 Anthropic 관리형 클라우드에서 실행
- 컴퓨터가 꺼져 있어도 계속 동작
- 현재 로컬 체크아웃이 아니라 fresh clone 기준
- permission-mode 선택기와 승인 프롬프트가 없음

반대로 Desktop local scheduled task는 내 머신에서 실행되고 로컬 파일 접근이 가능하지만, 앱이 열려 있고 머신이 깨어 있어야 합니다.

## Routine 만들기

공식 문서는 세 가지 진입점을 제공합니다.

- 웹
- CLI
- Desktop 앱

세 경로 모두 같은 클라우드 계정에 저장됩니다.

### 웹에서 만들기

공식 흐름:

1. `claude.ai/code/routines` 열기
2. `New routine` 클릭
3. 이름과 self-contained prompt 작성
4. 저장소 선택
5. environment와 connector 구성
6. trigger 추가
7. routine 생성

여기서는 프롬프트 품질이 특히 중요합니다. 중간에 사람 승인을 기대할 수 없기 때문에 성공 조건, 출력 형식, 부작용 여부를 모두 명시하는 편이 안전합니다.

### CLI에서 만들기

공식 명령 표면은 `/schedule`입니다.

Anthropic이 문서에서 직접 보여주는 예:

- `/schedule`
- `/schedule daily PR review at 9am`
- `/schedule list`
- `/schedule update`
- `/schedule run`

CLI는 schedule 기반 routine 생성과 기존 routine 관리를 지원합니다. 다만 API trigger와 GitHub trigger의 세부 설정은 현재 공식 문서 기준 웹 UI에서 하는 흐름입니다.

### Desktop에서 만들기

`Schedule` 페이지에서 `New task`를 누르고 `New remote task`를 선택합니다. Desktop은 local task와 routine을 한 화면에서 보여주지만, remote task는 웹과 같은 클라우드 routine 시스템에 저장됩니다.

## Trigger 종류

공식 문서는 현재 세 가지 trigger를 설명합니다.

### Schedule trigger

매시간, 매일, 평일, 매주 같은 주기로 실행합니다. 시간은 사용자의 로컬 시간대로 입력되고 자동 변환됩니다. 공식 문서는 몇 분 정도 지연되어 시작될 수 있지만 해당 routine의 offset은 일관되게 유지된다고 설명합니다.

최소 주기는 1시간입니다. 더 세밀한 cron이 필요하면 기본 preset으로 만든 뒤 `/schedule update`로 조정하는 흐름이 권장됩니다.

### API trigger

API trigger는 routine 전용 인증 HTTP 엔드포인트를 제공합니다. bearer token과 함께 POST하면 새 세션이 시작되고 session URL이 반환됩니다.

공식 문서가 상정하는 사용처:

- 알림 시스템
- 배포 파이프라인
- 내부 운영 도구
- 외부 서비스에서의 주문형 자동화

현재 토큰 생성과 폐기는 웹 UI 기준으로 설명됩니다.

### GitHub trigger

GitHub trigger는 PR, release 같은 저장소 이벤트에 반응해 routine을 시작합니다. 리뷰 자동화, post-merge 유지보수, 릴리스 점검 같은 흐름에 적합합니다.

## 실행 모델과 범위 제어

Routine은 완전한 클라우드 Claude Code 세션으로 실행됩니다. 공식 문서 기준 중요한 의미:

- 실행 중 승인 프롬프트가 없음
- GitHub나 connector에서 보이는 행위는 연결된 내 계정으로 수행됨
- routine은 팀 공유 객체가 아니라 개인 `claude.ai` 계정 소유
- 일일 실행 한도는 계정 기준으로 적용

따라서 범위는 보수적으로 잡아야 합니다.

- 꼭 필요한 저장소만 포함
- 꼭 필요한 connector만 포함
- 가장 좁은 네트워크 환경 사용
- 브랜치 푸시는 진짜 필요한 경우에만 허용

## 실행과 관리

Routine 상세 화면에서 공식적으로 가능한 작업:

- 저장소, prompt, trigger, connector 확인
- `Run now`로 즉시 실행
- schedule 일시중지 및 재개
- routine 수정
- 지난 실행을 전체 세션으로 열어 검토

각 실행은 일반 Claude Code 세션처럼 열리므로, 결과를 이어서 대화하거나 PR을 만들 수 있습니다.

## 설계 실무 조언

### 프롬프트는 독립적으로 완결되게 써라

Routine은 중간에 사람이 상황을 보정해 주는 흐름이 아닙니다. 무엇을 하고, 무엇을 만들고, 언제 실패로 간주할지 명확해야 합니다.

### Connector는 최소한만 포함하라

공식 문서는 생성 시 연결된 MCP connector가 기본 포함될 수 있다고 설명합니다. 필요 없는 것은 제거하는 것이 맞습니다.

### Fresh clone을 전제로 설계하라

생성물, 브랜치 규칙, setup 단계, repo-local skill 의존성이 있다면 저장소나 environment 안에서 명시적으로 보장해야 합니다.

## 공식 참고 문서

- Routines: `https://code.claude.com/docs/ko/web-scheduled-tasks`
- Web quickstart: `https://code.claude.com/docs/ko/web-quickstart`
- Desktop scheduled tasks: `https://code.claude.com/docs/ko/desktop-scheduled-tasks`

