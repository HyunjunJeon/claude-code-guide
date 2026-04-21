# 웹에서 Claude Code 사용하기

웹의 Claude Code는 `claude.ai/code`에서 돌아가는 클라우드 실행 표면입니다. 단순한 브라우저 래퍼가 아니라, 각 코딩 세션을 Anthropic 관리형 VM과 전용 브랜치, 전용 환경 위에서 실행합니다.

## 무엇이 다른가

로컬 터미널이나 Desktop 세션과 비교했을 때 핵심 차이는 네 가지입니다.

- 코드가 Anthropic 관리형 클라우드 VM에서 실행된다
- 작업마다 독립 세션과 독립 브랜치를 가진다
- GitHub 접근이 사실상 필수다
- 내 로컬 머신 설정 대신 cloud environment가 기준이 된다

그래서 노트북을 닫아도 계속 돌아가야 하는 장시간 브랜치 작업에 특히 잘 맞습니다.

## GitHub 접근 방식

공식 문서는 두 가지 경로를 설명합니다.

| 방법 | 동작 방식 | 적합한 대상 |
|---|---|---|
| GitHub App | 선택한 저장소에 Claude GitHub App 설치 | 저장소 단위 권한을 명확히 관리하려는 팀 |
| `/web-setup` | 로컬 `gh` CLI 토큰을 Claude 계정과 동기화 | 이미 `gh`를 쓰는 개인 개발자 |

중요한 제약:

- Auto-fix pull requests는 일반 cloud session과 달리 GitHub App이 반드시 필요합니다.

Team/Enterprise 관리자는 admin settings에서 quick web setup을 막을 수도 있습니다.

## 클라우드 환경에 기본 포함된 것

공식 페이지는 다음 범주의 런타임과 도구가 기본 탑재된다고 설명합니다.

- Python
- Node.js
- Ruby
- PHP
- Java
- Go
- Rust
- C/C++
- Docker
- PostgreSQL, Redis
- `git`, `jq`, `yq`, `ripgrep`, `tmux`, `vim`, `nano` 같은 유틸리티

정확한 버전이 중요하면 cloud session 안에서 `check-tools`를 실행하라고 공식 문서가 안내합니다.

## 환경 캐싱

웹 실행 표면에서 가장 중요한 동작 중 하나가 environment caching입니다.

동작 방식:

- 환경을 처음 사용할 때 setup script 실행
- 그 결과 파일시스템을 스냅샷으로 저장
- 이후 세션은 그 캐시된 파일시스템에서 시작

유지되는 것:

- 설치된 의존성
- setup이 써 둔 파일
- 다운로드된 툴체인이나 이미지

유지되지 않는 것:

- 실행 중 프로세스
- 살아 있는 서비스나 컨테이너

즉, 장기 설정은 environment script에 두고, 세션마다 필요한 서비스는 `SessionStart` hook이나 명시적 명령으로 올리는 편이 맞습니다.

## 웹과 터미널 사이 이동

공식 문서는 handoff 모델을 꽤 분명하게 설명합니다.

### 터미널에서 웹으로

```bash
claude --remote "Fix the authentication bug in src/auth/login.ts"
```

현재 저장소와 브랜치를 기준으로 새 cloud session을 만듭니다. VM은 로컬 디스크가 아니라 GitHub에서 clone하므로, 필요한 로컬 커밋은 미리 push해야 합니다.

### 웹에서 터미널로

```bash
claude --teleport
```

cloud session을 로컬 터미널로 가져와 로컬 파일과 도구로 계속할 수 있습니다.

중요한 제한:

- CLI에서는 handoff가 한 방향입니다. cloud session을 아래로 끌어올 수는 있지만, 이미 실행 중인 로컬 터미널 세션을 웹으로 밀어 올릴 수는 없습니다. 그 기능은 Desktop 앱이 담당합니다.

## 변경 검토

각 웹 세션은 `+42 -18` 같은 diff indicator를 보여줍니다. 여기서:

- 파일별 변경 확인
- 특정 줄에 인라인 코멘트 남기기
- 그 코멘트를 다음 메시지와 함께 Claude에 보내기

이 흐름이 웹 표면이 branch-based review에 강한 이유 중 하나입니다.

## PR Auto-fix

웹 표면은 PR auto-fix의 중심이기도 합니다.

Claude는 다음을 할 수 있습니다.

- CI 실패 감시
- 리뷰 코멘트 감시
- 원인 조사 후 수정 푸시
- 리뷰 스레드에 Claude 라벨과 함께 응답

공식 문서가 주는 운영상 경고:

- PR 코멘트가 인프라 배포나 특권 작업을 트리거하는 저장소라면, Claude 응답도 그 자동화를 발동시킬 수 있습니다. auto-fix를 켜기 전에 저장소 자동화를 먼저 점검해야 합니다.

## 보안과 격리

공식 페이지가 강조하는 층은 다음과 같습니다.

- 격리된 Anthropic 관리형 VM
- 환경별 네트워크 접근 제어
- 샌드박스 밖의 안전한 credential proxy
- 격리된 세션 안에서만 이루어지는 분석과 수정

미묘하지만 중요한 점:

- 환경 차원에서 네트워크 접근을 꺼도 Anthropic API와의 통신은 제품 동작상 계속 필요하므로, 데이터가 전혀 외부로 나가지 않는다는 뜻은 아닙니다.

## 언제 웹을 선택할까

잘 맞는 경우:

- 장시간 브랜치 작업
- 여러 기기에서 상태 확인
- GitHub 중심 리뷰 루프
- 로컬 머신 가용성에 덜 의존하고 싶을 때

덜 맞는 경우:

- 로컬 전용 파일이나 도구가 필요한 작업
- GitHub에서 접근할 수 없는 저장소
- 로컬 자격 증명이나 서비스가 진짜 source of truth인 작업

## 관련 가이드

- [Web Quickstart](./web-quickstart.md)
- [Desktop Quickstart](./desktop-quickstart.md)
- [Remote Control and Platforms](./platforms.md)

## 공식 출처

- [Use Claude Code on the web](https://code.claude.com/docs/ko/claude-code-on-the-web)
