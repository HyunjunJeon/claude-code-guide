# Desktop Scheduled Tasks

Desktop scheduled task는 Claude Code Desktop이 정해진 시각마다 새 세션을 자동으로 열어 주는 로컬 반복 실행 기능입니다. 로컬 파일, 로컬 도구, 로컬 인증 정보에 접근해야 하는 반복 작업에 적합합니다.

## 무엇에 쓰는가

공식 문서는 Desktop scheduled task의 대표 사례로 다음을 제시합니다.

- 매일 아침 코드 리뷰
- 의존성 점검
- 캘린더나 메일을 끌어오는 아침 브리핑

각 실행은 지정된 시각에 새로운 세션으로 시작됩니다.

## 세 가지 스케줄링 방식 비교

Claude Code는 공식적으로 세 가지 스케줄링 방식을 문서화합니다.

| 방식 | 실행 위치 | 머신 전원 필요 | 열린 세션 필요 | 로컬 파일 접근 | 최소 주기 |
| --- | --- | --- | --- | --- | --- |
| Routines | Anthropic 클라우드 | 아니오 | 아니오 | 아니오, fresh clone | 1시간 |
| Desktop scheduled tasks | 내 머신 | 예 | 아니오 | 예 | 1분 |
| `/loop` | 현재 세션 | 예 | 예 | 예 | 1분 |

선택 기준은 단순합니다.

- 클라우드에서 안정적으로 돌아야 하면 `Routines`
- 로컬 파일과 로컬 도구가 필요하면 `Desktop scheduled tasks`
- 현재 대화 안에서 잠깐 반복 실행하면 되면 `/loop`

## Desktop 안의 local task와 remote task

Schedule 화면은 두 종류를 함께 보여줄 수 있습니다.

- `Local tasks`: 내 머신에서 실행
- `Remote tasks`: Anthropic 관리형 클라우드에서 실행되는 routine

한 화면에 보인다고 해서 같은 실행 모델이 아닙니다. local task는 routine이 아닙니다.

## Scheduled task 만들기

공식 문서는 대화형 생성도 지원하지만, 기본 흐름은 다음과 같습니다.

1. `Schedule` 페이지 열기
2. `New task` 클릭
3. 로컬 작업이면 `New local task` 선택
4. prompt, 폴더, schedule, permission mode 설정
5. 저장 후 `Run now`로 한 번 즉시 실행

마지막 단계가 중요합니다. 첫 무인 실행 때 막히지 않도록 권한과 실행 조건을 미리 확인해야 합니다.

## 주기 옵션

공식 문서가 제공하는 기본 주기:

- `Manual`
- `Hourly`
- `Daily`
- `Weekdays`
- `Weekly`

이 드롭다운으로 표현되지 않는 주기는 Desktop 세션에서 Claude에게 자연어로 바꾸라고 요청할 수 있습니다. 공식 예시는 6시간마다 테스트를 돌리는 식입니다.

## 실제 실행 방식

공식 문서 기준 핵심 실행 규칙:

- Desktop은 앱이 열려 있는 동안 매분 스케줄을 확인
- 실행 시마다 새 세션 생성
- 수동 세션과 scheduled run은 분리
- 로컬 task는 머신이 깨어 있어야 실행

즉, 이것은 로컬 자동화이지, 항상 보장되는 원격 인프라가 아닙니다.

## 놓친 실행

머신이 잠들어 있거나 앱이 닫혀 있으면 실행이 건너뛰어질 수 있습니다. task 상세 화면의 history에서 이런 실행 이력을 확인할 수 있습니다.

이 점이 routines와의 가장 큰 차이 중 하나입니다.

## 권한 모델

각 Desktop scheduled task는 자체 permission mode를 가집니다. 공식 문서의 핵심 포인트:

- `~/.claude/settings.json`의 allow rule도 함께 적용됨
- task가 `Ask` 모드에서 미승인 도구를 만나면 승인 대기 상태로 멈춤
- 멈춘 세션은 사이드바에 남아서 나중에 응답 가능

실무적으로는 다음 흐름이 가장 안전합니다.

1. task 생성
2. `Run now` 클릭
3. 권한 프롬프트 확인
4. 반복적으로 필요한 도구는 적절히 `always allow`

이 과정을 거치면 야간이나 무인 실행에서 예상치 못한 정지가 줄어듭니다.

## 관리 기능

공식 문서에 따르면 task 상세 화면에서 다음이 가능합니다.

- 즉시 실행
- 반복 일시중지 및 재개
- prompt, 빈도, 폴더 등 수정
- 실행 이력 검토
- 저장된 권한 검토 및 철회
- 삭제

또한 Desktop 세션 안에서 Claude에게 scheduled task 목록 조회, 일시중지, 삭제를 자연어로 요청할 수도 있습니다.

## 디스크에서 prompt 수정

공식 Desktop 문서는 prompt 파일 경로를 다음처럼 안내합니다.

- `~/.claude/scheduled-tasks/<task-name>/SKILL.md`
- 또는 `CLAUDE_CONFIG_DIR` 아래 대응 경로

파일 형식:

- YAML frontmatter에 `name`, `description`
- 본문에 실제 prompt

동시에 공식 문서는 중요한 제한도 말합니다. schedule, folder, model, enabled 상태는 이 파일에 저장되지 않습니다. 이런 항목은 편집 UI 또는 Claude에게 요청하는 방식으로 바꿔야 합니다.

## 어떤 작업에 적합한가

Desktop scheduled task가 잘 맞는 경우:

- 현재 로컬 체크아웃 기준 테스트나 린트 반복 실행
- 워크스테이션 환경에 의존하는 저장소 유지보수 작업
- 로컬 도구나 자격 증명을 읽는 브리핑
- 커밋되지 않은 로컬 변경까지 포함해 봐야 하는 작업

반대로, 머신이 꺼져 있어도 반드시 돌아야 하는 작업에는 부적합합니다.

## 공식 참고 문서

- Desktop scheduled tasks: `https://code.claude.com/docs/ko/desktop-scheduled-tasks`
- Routines: `https://code.claude.com/docs/ko/web-scheduled-tasks`
- CLI scheduled tasks and `/loop`: `https://code.claude.com/docs/ko/scheduled-tasks`

