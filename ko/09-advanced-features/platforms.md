
# 플랫폼 & 통합

## Chrome 통합

Chrome 통합은 Claude Code를 Chrome 또는 Microsoft Edge 브라우저에 연결하여 실시간 웹 자동화 및 디버깅을 수행합니다. v2.0.73+부터 사용 가능한 베타 기능입니다 (Edge 지원은 v1.0.36+에서 추가).

### Chrome 통합 활성화

**시작 시**:

```bash
claude --chrome      # Chrome 연결 활성화
claude --no-chrome   # Chrome 연결 비활성화
```

**세션 내에서**:

```
/chrome
```

"Enabled by default"를 선택하면 향후 모든 세션에서 Chrome 통합이 활성화됩니다. Claude Code는 브라우저의 로그인 상태를 공유하므로, 인증된 웹 앱과 상호 작용할 수 있습니다.

### 기능

| 기능 | 설명 |
|------------|-------------|
| **실시간 디버깅** | 콘솔 로그 읽기, DOM 요소 검사, JavaScript 실시간 디버그 |
| **디자인 검증** | 렌더링된 페이지를 디자인 목업과 비교 |
| **폼 유효성 검사** | 폼 제출, 입력 유효성 검사, 오류 처리 테스트 |
| **웹 앱 테스트** | 인증된 앱(Gmail, Google Docs, Notion 등)과 상호 작용 |
| **데이터 추출** | 웹 페이지에서 콘텐츠 스크랩 및 처리 |
| **세션 녹화** | 브라우저 상호 작용을 GIF 파일로 녹화 |

### 사이트별 권한

Chrome 확장 프로그램이 사이트별 접근을 관리합니다. 확장 프로그램 팝업을 통해 언제든지 특정 사이트에 대한 접근 권한을 부여하거나 취소할 수 있습니다. Claude Code는 명시적으로 허용한 사이트만 상호 작용합니다.

### 작동 방식

Claude Code는 보이는 창에서 브라우저를 제어합니다 — 실시간으로 작업이 일어나는 것을 볼 수 있습니다. 브라우저가 로그인 페이지나 CAPTCHA를 만나면, Claude가 일시 정지하고 수동으로 처리한 후 계속 진행합니다.

### 알려진 제한 사항

- **브라우저 지원**: Chrome과 Edge만 지원 — Brave, Arc 및 기타 Chromium 브라우저는 지원되지 않음
- **WSL**: Windows Subsystem for Linux에서 사용 불가
- **서드파티 제공업체**: Bedrock, Vertex, Foundry API 제공업체에서는 지원되지 않음
- **서비스 워커 유휴**: 장시간 세션 동안 Chrome 확장 프로그램 서비스 워커가 유휴 상태가 될 수 있음

> **팁**: Chrome 통합은 베타 기능입니다. 향후 릴리스에서 브라우저 지원이 확대될 수 있습니다.

---

## Remote Control

Remote Control을 사용하면 로컬에서 실행 중인 Claude Code 세션을 휴대폰, 태블릿 또는 모든 브라우저에서 계속할 수 있습니다. 로컬 세션은 사용자의 머신에서 계속 실행됩니다 — 클라우드로 이동하지 않습니다. Pro, Max, Team, Enterprise 플랜에서 사용 가능합니다 (v2.1.51+).

### Remote Control 시작

**CLI에서**:

```bash
# 기본 세션 이름으로 시작
claude remote-control

# 사용자 정의 이름으로 시작
claude remote-control --name "Auth Refactor"
```

**세션 내에서**:

```
/remote-control
/remote-control "Auth Refactor"
```

**사용 가능한 플래그**:

| 플래그 | 설명 |
|------|-------------|
| `--name "title"` | 쉽게 식별하기 위한 사용자 정의 세션 제목 |
| `--verbose` | 상세 연결 로그 표시 |
| `--sandbox` | 파일 시스템 및 네트워크 격리 활성화 |
| `--no-sandbox` | sandboxing 비활성화 (기본값) |

### 세션에 연결

다른 기기에서 연결하는 세 가지 방법:

1. **세션 URL** — 세션 시작 시 터미널에 출력됨; 모든 브라우저에서 열기
2. **QR 코드** — 시작 후 `스페이스바`를 눌러 스캔 가능한 QR 코드 표시
3. **이름으로 찾기** — claude.ai/code 또는 Claude 모바일 앱(iOS/Android)에서 세션 탐색

### 보안

- 머신에 **인바운드 포트가 열리지 않음**
- TLS를 통한 **아웃바운드 HTTPS만** 사용
- **범위가 지정된 자격 증명** — 수명이 짧고 범위가 좁은 여러 토큰
- **세션 격리** — 각 원격 세션이 독립적

### Remote Control과 웹상의 Claude Code 비교

| 항목 | Remote Control | 웹상의 Claude Code |
|--------|---------------|-------------------|
| **실행** | 사용자 머신에서 실행 | Anthropic 클라우드에서 실행 |
| **로컬 도구** | 로컬 MCP 서버, 파일, CLI에 대한 전체 접근 | 로컬 의존성 없음 |
| **사용 사례** | 다른 기기에서 로컬 작업 계속 | 모든 브라우저에서 새로 시작 |

### 제한 사항

- Claude Code 인스턴스당 하나의 원격 세션
- 호스트 머신에서 터미널이 열려 있어야 함
- 네트워크에 접근할 수 없으면 약 10분 후 세션 시간 초과

### 사용 사례

- 책상에서 떨어져 있을 때 모바일 기기나 태블릿에서 Claude Code 제어
- 로컬 도구 실행을 유지하면서 더 풍부한 claude.ai UI 사용
- 전체 로컬 개발 환경으로 이동 중 빠른 코드 리뷰

---

## 웹 세션

웹 세션을 사용하면 claude.ai/code의 브라우저에서 직접 Claude Code를 실행하거나, CLI에서 웹 세션을 생성할 수 있습니다.

### 웹 세션 생성

```bash
# CLI에서 새 웹 세션 생성
claude --remote "implement the new API endpoints"
```

이렇게 하면 모든 브라우저에서 접근할 수 있는 claude.ai의 Claude Code 세션이 시작됩니다.

### 웹 세션을 로컬에서 재개

웹에서 세션을 시작하고 로컬에서 계속하려면:

```bash
# 웹 세션을 로컬 터미널에서 재개
claude --teleport
```

또는 대화형 REPL 내에서:
```
/teleport
```

### 사용 사례

- 한 머신에서 작업을 시작하고 다른 머신에서 계속
- 팀원과 세션 URL 공유
- 시각적 diff 검토에 웹 UI를 사용한 후 실행을 위해 터미널로 전환

---

## 데스크톱 앱

Claude Code 데스크톱 앱은 시각적 diff 검토, 병렬 세션, 통합 커넥터를 갖춘 독립 실행형 애플리케이션을 제공합니다. macOS 및 Windows에서 사용 가능합니다 (Pro, Max, Team, Enterprise 플랜).

### 설치

[claude.ai](https://claude.ai)에서 플랫폼에 맞게 다운로드하세요:
- **macOS**: 유니버설 빌드 (Apple Silicon 및 Intel)
- **Windows**: x64 및 ARM64 설치 프로그램 제공

설치 지침은 [데스크톱 빠른 시작](https://code.claude.com/docs/ko/desktop-quickstart)을 참조하세요.

### CLI에서 전환

현재 CLI 세션을 데스크톱 앱으로 전환합니다:

```
/desktop
```

### 핵심 기능

| 기능 | 설명 |
|---------|-------------|
| **Diff 보기** | 인라인 코멘트가 포함된 파일별 시각적 검토; Claude가 코멘트를 읽고 수정 |
| **앱 미리보기** | 내장 브라우저로 개발 서버를 자동 시작하여 실시간 확인 |
| **PR 모니터링** | GitHub CLI 통합으로 CI 실패 자동 수정 및 체크 통과 시 자동 병합 |
| **병렬 세션** | 사이드바에서 Git worktree 격리를 사용한 다중 세션 |
| **예약 작업** | 앱이 열려 있는 동안 실행되는 반복 작업 (시간별, 일별, 평일, 주별) |
| **풍부한 렌더링** | 구문 강조가 포함된 코드, 마크다운, 다이어그램 렌더링 |

### 앱 미리보기 설정

`.claude/launch.json`에서 개발 서버 동작을 구성합니다:

```json
{
  "command": "npm run dev",
  "port": 3000,
  "readyPattern": "ready on",
  "persistCookies": true
}
```

### 커넥터

더 풍부한 컨텍스트를 위해 외부 서비스를 연결합니다:

| 커넥터 | 기능 |
|-----------|------------|
| **GitHub** | PR 모니터링, 이슈 추적, 코드 리뷰 |
| **Slack** | 알림, 채널 컨텍스트 |
| **Linear** | 이슈 추적, 스프린트 관리 |
| **Notion** | 문서, 지식 베이스 접근 |
| **Asana** | 작업 관리, 프로젝트 추적 |
| **Calendar** | 일정 인식, 회의 컨텍스트 |

[[TIP("참고")]]
커넥터는 원격(클라우드) 세션에서 사용할 수 없습니다.
[[/TIP]]

### 원격 및 SSH 세션

- **원격 세션**: Anthropic 클라우드 인프라에서 실행; 앱을 닫아도 계속됩니다. claude.ai/code 또는 Claude 모바일 앱에서 접근 가능
- **SSH 세션**: SSH를 통해 원격 머신에 연결하여 원격 파일 시스템과 도구에 대한 전체 접근. Claude Code가 원격 머신에 설치되어 있어야 함

### 데스크톱의 권한 모드

데스크톱 앱은 CLI와 동일한 4가지 권한 모드를 지원합니다:

| 모드 | 동작 |
|------|----------|
| **권한 요청** (기본) | 모든 편집과 명령어를 검토하고 승인 |
| **편집 자동 수락** | 파일 편집 자동 승인; 명령어는 수동 승인 필요 |
| **Plan mode** | 변경 전에 접근 방식 검토 |
| **권한 우회** | 자동 실행 (sandbox 전용, 관리자 제어) |

### 엔터프라이즈 기능

- **관리 콘솔**: 조직의 Code 탭 접근 및 권한 설정 제어
- **MDM 배포**: macOS에서 MDM 또는 Windows에서 MSIX를 통한 배포
- **SSO 통합**: 조직 구성원에게 싱글 사인온 요구
- **관리형 설정**: 팀 구성 및 모델 가용성을 중앙에서 관리

---

## Git Worktree

Git Worktree를 사용하면 격리된 worktree에서 Claude Code를 시작하여, stash나 브랜치 전환 없이 다른 브랜치에서 병렬 작업을 수행할 수 있습니다.

### Worktree에서 시작

```bash
# 격리된 worktree에서 Claude Code 시작
claude --worktree
# 또는
claude -w
```

### Worktree 위치

Worktree는 다음 위치에 생성됩니다:
```
<repo>/.claude/worktrees/<name>
```

### 모노레포를 위한 Sparse Checkout

`worktree.sparsePaths` 설정을 사용하여 모노레포에서 sparse-checkout을 수행하면, 디스크 사용량과 클론 시간을 줄일 수 있습니다:

```json
{
  "worktree": {
    "sparsePaths": ["packages/my-package", "shared/"]
  }
}
```

### Worktree 도구 및 Hook

| 항목 | 설명 |
|------|-------------|
| `ExitWorktree` | 현재 worktree를 종료하고 정리하는 도구 |
| `WorktreeCreate` | Worktree 생성 시 발생하는 hook 이벤트 |
| `WorktreeRemove` | Worktree 제거 시 발생하는 hook 이벤트 |

### 자동 정리

Worktree에서 변경이 없으면 세션 종료 시 자동으로 정리됩니다.

### 사용 사례

- 메인 브랜치를 건드리지 않고 기능 브랜치에서 작업
- 작업 디렉토리에 영향을 주지 않고 격리된 환경에서 테스트 실행
- 일회용 환경에서 실험적 변경 시도
- 모노레포에서 특정 패키지만 sparse-checkout하여 더 빠른 시작

---
