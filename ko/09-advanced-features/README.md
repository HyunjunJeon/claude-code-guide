<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../../resources/logos/claude-howto-logo.svg">
</picture>

# 고급 기능

Plan mode, extended thinking, auto mode, background tasks, 권한 모드, print mode(비대화형), 세션 관리, 대화형 기능, channel, 음성 입력, remote control, 웹 세션, 데스크톱 앱, task list, 프롬프트 제안, git worktree, sandboxing, 관리형 설정, 그리고 구성을 포함하는 Claude Code의 고급 기능에 대한 종합 가이드입니다.

## 목차

1. [개요](#개요)
2. [Plan Mode](#plan-mode)
3. [Extended Thinking](#extended-thinking)
4. [Auto Mode](#auto-mode)
5. [Background Tasks](#background-tasks)
6. [Scheduled Tasks](#scheduled-tasks)
7. [권한 모드](#권한-모드)
8. [Headless Mode](#headless-mode)
9. [세션 관리](#세션-관리)
10. [대화형 기능](#대화형-기능)
11. [음성 입력](#음성-입력)
12. [Channel](#channel)
13. [Chrome 통합](#chrome-통합)
14. [Remote Control](#remote-control)
15. [웹 세션](#웹-세션)
16. [데스크톱 앱](#데스크톱-앱)
17. [Task List](#task-list)
18. [프롬프트 제안](#프롬프트-제안)
19. [Git Worktree](#git-worktree)
20. [Sandboxing](#sandboxing)
21. [관리형 설정 (엔터프라이즈)](#관리형-설정-엔터프라이즈)
22. [구성 및 설정](#구성-및-설정)
23. [Agent Teams](#agent-teams)
24. [모범 사례](#모범-사례)
25. [추가 리소스](#추가-리소스)

---

## 개요

Claude Code의 고급 기능은 계획, 추론, 자동화 및 제어 메커니즘으로 핵심 기능을 확장합니다. 이러한 기능은 복잡한 개발 작업, 코드 리뷰, 자동화 및 다중 세션 관리를 위한 정교한 워크플로우를 가능하게 합니다.

**주요 고급 기능:**
- **Plan Mode**: 코딩 전에 상세한 구현 계획을 작성합니다
- **Extended Thinking**: 복잡한 문제에 대한 깊은 추론을 수행합니다
- **Auto Mode**: 백그라운드 안전 분류기가 각 작업을 실행 전에 검토합니다 (Research Preview)
- **Background Tasks**: 대화를 차단하지 않고 장시간 작업을 실행합니다
- **권한 모드**: Claude가 수행할 수 있는 작업을 제어합니다 (`default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`)
- **Print Mode**: CI/CD 및 자동화를 위해 Claude Code를 비대화형으로 실행합니다 (`claude -p`)
- **세션 관리**: 여러 작업 세션을 관리합니다
- **대화형 기능**: 키보드 단축키, 여러 줄 입력, 명령어 이력
- **음성 입력**: 20개 언어 STT를 지원하는 푸시 투 토크 음성 입력
- **Channel**: MCP 서버가 실행 중인 세션에 메시지를 푸시합니다 (Research Preview)
- **Remote Control**: Claude.ai 또는 Claude 앱에서 Claude Code를 원격 제어합니다
- **웹 세션**: claude.ai/code의 브라우저에서 Claude Code를 실행합니다
- **데스크톱 앱**: 시각적 diff 검토와 다중 세션을 위한 독립 실행형 앱
- **Task List**: 컨텍스트 압축 간에 유지되는 영구 작업 추적
- **프롬프트 제안**: 컨텍스트 기반 스마트 명령어 제안
- **Git Worktree**: 병렬 작업을 위한 격리된 worktree 브랜치
- **Sandboxing**: OS 수준 파일 시스템 및 네트워크 격리
- **관리형 설정**: plist, Registry 또는 관리형 파일을 통한 엔터프라이즈 배포
- **구성**: JSON 구성 파일로 동작을 사용자 정의합니다

---

## Plan Mode

Plan mode는 Claude가 구현하기 전에 복잡한 작업을 면밀히 검토하고, 검토 및 승인할 수 있는 상세한 계획을 생성할 수 있게 합니다.

### Plan Mode란?

Plan mode는 두 단계 접근 방식입니다:
1. **계획 단계**: Claude가 작업을 분석하고 상세한 구현 계획을 생성합니다
2. **구현 단계**: 승인 후, Claude가 계획을 실행합니다

### Plan Mode를 사용할 때

✅ 다음 경우에 plan mode를 사용하세요:
- 복잡한 다중 파일 리팩터링
- 새로운 기능 구현
- 아키텍처 변경
- 데이터베이스 마이그레이션
- 대규모 API 재설계

❌ 다음 경우에는 plan mode를 사용하지 마세요:
- 단순한 버그 수정
- 포맷팅 변경
- 단일 파일 편집
- 간단한 질문

### Plan Mode 활성화

**Slash command**:
```bash
/plan Implement user authentication system
```

**CLI 플래그**:
```bash
claude --permission-mode plan
```

**기본값으로 설정**:
```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

**키보드 단축키**:
- `Shift + Tab` - 권한 모드 전환 (plan 포함)
- `Alt + M` - 권한 모드 전환 (Windows/Linux)

### Plan Mode의 이점

- **구조화된 구현 접근**: 구현 단계의 상세한 분석
- **검토 및 승인**: 실행 전에 계획을 검토하고 조정
- **위험 식별**: 구현 전에 잠재적 문제를 식별
- **명확한 단계**: 체계적인 구현 단계 및 마일스톤

### 예제: 기능 구현

```
User: /plan Add a real-time notification system

Claude: I'll create a plan for implementing real-time notifications.

## Implementation Plan

### Phase 1: Infrastructure Setup
1. Install WebSocket libraries (socket.io)
2. Set up WebSocket server
3. Configure connection management

### Phase 2: Backend Implementation
4. Create notification service
5. Implement notification queue
6. Add database schema for notifications
7. Create API endpoints

### Phase 3: Frontend Integration
8. Set up WebSocket client
9. Create notification UI components
10. Implement notification state management
11. Add notification permissions

### Phase 4: Testing & Deployment
12. Write unit tests
13. Write integration tests
14. Update documentation
15. Deploy to staging

Estimated time: 3-4 hours
Files to modify: 12
New files to create: 8

Ready to proceed? (yes/no/modify plan)

User: yes

Claude: [Begins implementation following the plan]
```

### 계획 수정

```
User: Modify the plan - skip the queue for now, we'll add it later

Claude: Updated plan:
[Shows modified plan with queue removed]

User: Looks good, proceed

Claude: [Implements modified plan]
```

### Plan Mode 설정

Plan mode는 CLI 플래그 또는 slash command로 활성화됩니다:

```bash
# CLI로 plan mode 활성화
claude --permission-mode plan

# 또는 REPL 내에서 /plan slash command 사용
/plan Implement user authentication system
```

**계획용 모델 별칭**: `opusplan`을 모델 별칭으로 사용하면 Opus로 계획을 수립하고 Sonnet으로 실행합니다:

```bash
claude --model opusplan "design and implement the new API"
```

**외부에서 계획 편집**: `Ctrl+G`를 눌러 현재 계획을 외부 편집기에서 상세하게 수정할 수 있습니다.

### Ultraplan

`/ultraplan <prompt>`를 사용하면 엔드투엔드 계획 워크플로우를 실행할 수 있습니다: Claude가 상세한 계획을 작성하고, 브라우저에서 검토한 후, 원격으로 계획을 실행하거나 로컬 실행을 위해 터미널로 전송합니다.

---

## Extended Thinking

Extended thinking은 Claude가 솔루션을 제공하기 전에 복잡한 문제에 대해 더 많은 시간을 들여 추론할 수 있게 합니다.

### Extended Thinking이란?

Extended thinking은 Claude가 다음을 수행하는 신중한 단계별 추론 프로세스입니다:
- 복잡한 문제를 분해합니다
- 여러 접근 방식을 고려합니다
- 트레이드오프를 평가합니다
- 엣지 케이스를 검토합니다

### Extended Thinking 활성화

**키보드 단축키**:
- `Option + T` (macOS) / `Alt + T` (Windows/Linux) - Extended thinking 토글

**자동 활성화**:
- 모든 모델에서 기본적으로 활성화됩니다 (Opus 4.6, Sonnet 4.6, Haiku 4.5)
- Opus 4.6: 노력 수준에 따른 적응형 추론: `low` (○), `medium` (◐), `high` (●), `max` (Opus 4.6 전용)
- 기타 모델: 최대 31,999 토큰의 고정 예산

**설정 방법**:
- 토글: `Alt+T` / `Option+T`, 또는 `/config`를 통해
- 추론 보기: `Ctrl+O` (상세 모드)
- 노력 설정: `/effort` 명령어 또는 `--effort` 플래그

**사용자 정의 예산**:
```bash
export MAX_THINKING_TOKENS=1024
```

**노력 수준** (Opus 4.6 전용):
```bash
export CLAUDE_CODE_EFFORT_LEVEL=high   # low (○), medium (◐), high (●), or max (Opus 4.6 only)
```

**CLI 플래그**:
```bash
claude --effort high "complex architectural review"
```

**Slash command**:
```
/effort high
```

> **참고:** 프롬프트에서 "ultrathink" 키워드를 사용하면 딥 추론 모드가 활성화됩니다. 노력 수준 `low`, `medium`, `high`, `max` (Opus 4.6 전용)는 Claude가 수행하는 추론의 양을 제어합니다.

### Extended Thinking의 이점

- **깊은 추론**: 복잡한 문제에 대해 더 많은 시간을 들여 사고합니다
- **더 나은 아키텍처 결정**: 포괄적인 평가를 통해 정보에 기반한 선택을 합니다
- **엣지 케이스 고려**: 잠재적인 문제와 시나리오를 면밀히 검토합니다
- **철저한 분석**: 복잡한 문제 해결에 대한 구조화된 접근

### 예제: 아키텍처 결정

```
User: /think Should we use microservices or a monolith for our e-commerce platform?

Claude: Let me think through this architectural decision carefully...

<extended_thinking>
## Context Analysis
- Team size: 5 developers
- Expected traffic: 10k daily users initially
- Need to scale to 100k+ users
- Limited DevOps resources
- 6-month timeline to MVP

## Approach 1: Microservices
Pros:
+ Independent scaling
+ Technology flexibility
+ Team independence
+ Fault isolation

Cons:
- Operational complexity
- Network overhead
- Distributed tracing needed
- Requires DevOps expertise
- Slower initial development

## Approach 2: Monolith
Pros:
+ Simpler deployment
+ Faster initial development
+ Easier debugging
+ Lower operational overhead
+ Single codebase

Cons:
- Scaling challenges later
- All-or-nothing deployments
- Technology lock-in
- Potential for tight coupling

## Decision Factors
1. Team size (5 devs) → Favors monolith
2. DevOps resources (limited) → Favors monolith
3. Timeline (6 months) → Favors monolith
4. Future scale (100k users) → Achievable with monolith + caching
5. Complexity budget → Limited

## Recommendation
Start with a **modular monolith**:
- Single deployment unit
- Clear module boundaries
- Clean interfaces between modules
- Prepare for future extraction to microservices if needed

This gives you:
✓ Fast initial development
✓ Low operational complexity
✓ Option to extract services later
✓ Clear architecture

Migration path: When you reach 50k+ users or specific modules need independent scaling, extract those modules into microservices.
</extended_thinking>

**Recommendation**: Implement a modular monolith with clean module boundaries.

This approach balances your current constraints (team size, timeline, DevOps resources) with future scalability needs. You can migrate specific modules to microservices later when there's a clear business need.
```

### Extended Thinking 설정

Extended thinking은 환경 변수, 키보드 단축키, CLI 플래그로 제어됩니다:

```bash
# thinking 토큰 예산 설정
export MAX_THINKING_TOKENS=16000

# 노력 수준 설정 (Opus 4.6 전용): low (○), medium (◐), high (●), or max (Opus 4.6 only)
export CLAUDE_CODE_EFFORT_LEVEL=high
```

세션 중에 `Alt+T` / `Option+T`로 토글하고, `/effort`로 노력 수준을 설정하거나, `/config`를 통해 구성할 수 있습니다.

---

## Auto Mode

Auto Mode는 백그라운드 안전 분류기를 사용하여 각 작업을 실행 전에 검토하는 Research Preview 권한 모드입니다 (2026년 3월). Claude가 자율적으로 작업하면서 위험한 작업은 차단할 수 있게 합니다.

### 요구 사항

- **플랜**: Team, Enterprise, 또는 API (Pro 또는 Max 플랜에서는 사용 불가)
- **모델**: Claude Sonnet 4.6 또는 Opus 4.6
- **제공업체**: Anthropic API 전용 (Bedrock, Vertex, Foundry에서는 지원되지 않음)
- **분류기**: Claude Sonnet 4.6에서 실행 (추가 토큰 비용 발생)

### Auto Mode 활성화

```bash
# CLI 플래그로 auto mode 잠금 해제
claude --enable-auto-mode

# 그런 다음 REPL에서 Shift+Tab으로 전환
```

또는 기본 권한 모드로 설정:

```bash
claude --permission-mode auto
```

설정을 통해 구성:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### 분류기 작동 방식

백그라운드 분류기는 다음 결정 순서로 각 작업을 평가합니다:

1. **허용/거부 규칙** -- 명시적 권한 규칙이 먼저 확인됩니다
2. **읽기 전용/편집 자동 승인** -- 파일 읽기와 편집은 자동으로 통과합니다
3. **분류기** -- 백그라운드 분류기가 작업을 검토합니다
4. **대체** -- 연속 3회 또는 총 20회 차단 후 사용자에게 프롬프트로 전환합니다

### 기본 차단 작업

Auto mode는 기본적으로 다음을 차단합니다:

| 차단 작업 | 예시 |
|----------------|---------|
| 파이프 투 셸 설치 | `curl \| bash` |
| 민감한 데이터 외부 전송 | API 키, 네트워크를 통한 자격 증명 |
| 프로덕션 배포 | 프로덕션을 대상으로 하는 배포 명령어 |
| 대량 삭제 | 대규모 디렉토리에 대한 `rm -rf` |
| IAM 변경 | 권한 및 역할 수정 |
| 메인 브랜치 강제 푸시 | `git push --force origin main` |

### 기본 허용 작업

| 허용 작업 | 예시 |
|----------------|---------|
| 로컬 파일 작업 | 프로젝트 파일 읽기, 쓰기, 편집 |
| 선언된 의존성 설치 | 매니페스트 기반 `npm install`, `pip install` |
| 읽기 전용 HTTP | 문서 가져오기를 위한 `curl` |
| 현재 브랜치에 푸시 | `git push origin feature-branch` |

### Auto Mode 설정

**기본 규칙을 JSON으로 출력**:
```bash
claude auto-mode defaults
```

**신뢰할 수 있는 인프라 구성**은 엔터프라이즈 배포를 위한 `autoMode.environment` 관리형 설정을 통해 수행합니다. 이를 통해 관리자가 신뢰할 수 있는 CI/CD 환경, 배포 대상, 인프라 패턴을 정의할 수 있습니다.

### 대체 동작

분류기가 확신하지 못할 때, auto mode는 사용자에게 프롬프트를 전환합니다:
- **연속 3회** 분류기 차단 후
- 세션에서 **총 20회** 분류기 차단 후

이를 통해 분류기가 작업을 확신 있게 승인할 수 없을 때 사용자가 항상 제어권을 유지할 수 있습니다.

### Auto Mode와 동등한 권한 시딩 (Team 플랜 불필요)

Team 플랜이 없거나 백그라운드 분류기 없이 더 간단한 접근 방식을 원하는 경우, `~/.claude/settings.json`에 보수적인 기본 안전 권한 규칙을 시딩할 수 있습니다. 이 스크립트는 읽기 전용 및 로컬 검사 규칙으로 시작한 다음, 원하는 경우에만 편집, 테스트, 로컬 git 쓰기, 패키지 설치, GitHub 쓰기 작업을 선택적으로 활성화할 수 있습니다.

**파일:** `09-advanced-features/setup-auto-mode-permissions.py`

```bash
# 변경 사항 미리보기 (변경 없음)
python3 09-advanced-features/setup-auto-mode-permissions.py --dry-run

# 보수적인 기본 규칙 적용
python3 09-advanced-features/setup-auto-mode-permissions.py

# 필요할 때만 추가 기능 활성화
python3 09-advanced-features/setup-auto-mode-permissions.py --include-edits --include-tests
python3 09-advanced-features/setup-auto-mode-permissions.py --include-git-write --include-packages
```

스크립트는 다음 카테고리의 규칙을 추가합니다:

| 카테고리 | 예시 |
|----------|---------|
| 핵심 읽기 전용 도구 | `Read(*)`, `Glob(*)`, `Grep(*)`, `Agent(*)`, `WebSearch(*)`, `WebFetch(*)` |
| 로컬 검사 | `Bash(git status:*)`, `Bash(git log:*)`, `Bash(git diff:*)`, `Bash(cat:*)` |
| 선택적 편집 | `Edit(*)`, `Write(*)`, `NotebookEdit(*)` |
| 선택적 테스트/빌드 | `Bash(pytest:*)`, `Bash(python3 -m pytest:*)`, `Bash(cargo test:*)` |
| 선택적 git 쓰기 | `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git stash:*)` |
| Git (로컬 쓰기) | `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git checkout:*)` |
| 패키지 매니저 | `Bash(npm install:*)`, `Bash(pip install:*)`, `Bash(cargo build:*)` |
| 빌드 & 테스트 | `Bash(make:*)`, `Bash(pytest:*)`, `Bash(go test:*)` |
| 일반 셸 | `Bash(ls:*)`, `Bash(cat:*)`, `Bash(find:*)`, `Bash(cp:*)`, `Bash(mv:*)` |
| GitHub CLI | `Bash(gh pr view:*)`, `Bash(gh pr create:*)`, `Bash(gh issue list:*)` |

위험한 작업(`rm -rf`, `sudo`, 강제 푸시, `DROP TABLE`, `terraform destroy` 등)은 의도적으로 제외됩니다. 스크립트는 멱등적이므로 — 두 번 실행해도 규칙이 중복되지 않습니다.

---

## Background Tasks

Background tasks는 대화를 차단하지 않고 장시간 실행되는 작업을 수행할 수 있게 합니다.

### Background Tasks란?

Background tasks는 작업을 계속하는 동안 비동기적으로 실행됩니다:
- 장시간 테스트 스위트
- 빌드 프로세스
- 데이터베이스 마이그레이션
- 배포 스크립트
- 분석 도구

**기본 사용법:**
```bash
User: Run tests in background

Claude: Started task bg-1234

/task list           # 모든 작업 표시
/task status bg-1234 # 진행 상황 확인
/task show bg-1234   # 출력 보기
/task cancel bg-1234 # 작업 취소
```

### Background Tasks 시작

```
User: Run the full test suite in the background

Claude: Starting tests in background (task-id: bg-1234)
You can continue working while tests run.

[You can continue the conversation]

User: Meanwhile, let's refactor the auth module

Claude: [Works on auth module while tests run in background]

[Later, when tests complete]

Claude: 📢 Background task bg-1234 completed:
✅ 245 tests passed
❌ 3 tests failed
View results: /task show bg-1234
```

### Background Tasks 관리

**활성 작업 목록**:
```
User: /task list

Active background tasks:
1. [bg-1234] Running tests (50% complete, 2min remaining)
2. [bg-1235] Building Docker image (25% complete, 8min remaining)
3. [bg-1236] Deploying to staging (90% complete, 30sec remaining)
```

**작업 상태 확인**:
```
User: /task status bg-1234

Task bg-1234: Running tests
Status: In progress
Progress: 120/245 tests (49%)
Started: 2025-11-08 10:30:15
Estimated completion: 2025-11-08 10:34:22
```

**작업 출력 보기**:
```
User: /task show bg-1234

[Shows live output from the test run]
```

**작업 취소**:
```
User: /task cancel bg-1234

Cancelled background task bg-1234
```

### 예제: 병렬 개발

```
User: Run the build in the background

Claude: Starting build... (task-id: bg-5001)

User: Also run the linter in background

Claude: Starting linter... (task-id: bg-5002)

User: While those run, let's implement the new API endpoint

Claude: [Implements API endpoint while build and linter run]

[10 minutes later]

Claude: 📢 Build completed successfully (bg-5001)
📢 Linter found 12 issues (bg-5002)

User: Show me the linter issues

Claude: [Shows linter output from bg-5002]
```

### 설정

```json
{
  "backgroundTasks": {
    "enabled": true,
    "maxConcurrentTasks": 5,
    "notifyOnCompletion": true,
    "autoCleanup": true,
    "logOutput": true
  }
}
```

---

## Scheduled Tasks

Scheduled Tasks를 사용하면 반복 일정으로 또는 일회성 리마인더로 프롬프트를 자동 실행할 수 있습니다. 작업은 세션 범위입니다 — Claude Code가 활성화된 동안 실행되며 세션이 종료되면 삭제됩니다. v2.1.72+부터 사용 가능합니다.

### `/loop` 명령어

```bash
# 명시적 간격
/loop 5m check if the deployment finished

# 자연어
/loop check build status every 30 minutes
```

정밀한 스케줄링을 위해 표준 5필드 cron 표현식도 지원됩니다.

### 일회성 리마인더

특정 시간에 한 번 실행되는 리마인더를 설정합니다:

```
remind me at 3pm to push the release branch
in 45 minutes, run the integration tests
```

### Scheduled tasks 관리

| 도구 | 설명 |
|------|-------------|
| `CronCreate` | 새 예약 작업 생성 |
| `CronList` | 모든 활성 예약 작업 나열 |
| `CronDelete` | 예약 작업 제거 |

**제한 및 동작**:
- 세션당 최대 **50개 예약 작업**
- 세션 범위 — 세션 종료 시 삭제됨
- 반복 작업은 **3일** 후 자동 만료
- Claude Code가 실행 중일 때만 작업이 실행됨 — 놓친 실행에 대한 보충 없음

### 동작 세부 사항

| 항목 | 세부 내용 |
|--------|--------|
| **반복 지터** | 간격의 최대 10% (최대 15분) |
| **일회성 지터** | :00/:30 경계에서 최대 90초 |
| **놓친 실행** | 보충 없음 — Claude Code가 실행 중이 아니면 건너뜀 |
| **영속성** | 재시작 시 유지되지 않음 |

### 클라우드 Scheduled Tasks

`/schedule`을 사용하여 Anthropic 인프라에서 실행되는 클라우드 예약 작업을 생성합니다:

```
/schedule daily at 9am run the test suite and report failures
```

클라우드 예약 작업은 재시작 후에도 유지되며 Claude Code가 로컬에서 실행 중일 필요가 없습니다.

### Scheduled tasks 비활성화

```bash
export CLAUDE_CODE_DISABLE_CRON=1
```

### 예제: 배포 모니터링

```
/loop 5m check the deployment status of the staging environment.
        If the deploy succeeded, notify me and stop looping.
        If it failed, show the error logs.
```

> **팁**: Scheduled tasks는 세션 범위입니다. 재시작 후에도 유지되는 영구 자동화를 위해서는 CI/CD 파이프라인, GitHub Actions, 또는 데스크톱 앱 예약 작업을 대신 사용하세요.

---

## 권한 모드

권한 모드는 Claude가 명시적 승인 없이 수행할 수 있는 작업을 제어합니다.

### 사용 가능한 권한 모드

| 모드 | 동작 |
|---|---|
| `default` | 파일 읽기만 가능; 다른 모든 작업에 프롬프트 표시 |
| `acceptEdits` | 파일 읽기 및 편집 가능; 명령어에 프롬프트 표시 |
| `plan` | 파일 읽기만 가능 (조사 모드, 편집 없음) |
| `auto` | 백그라운드 안전 분류기 확인을 통한 모든 작업 (Research Preview) |
| `bypassPermissions` | 모든 작업, 권한 확인 없음 (위험) |
| `dontAsk` | 사전 승인된 도구만 실행; 나머지는 모두 거부 |

CLI에서 `Shift+Tab`으로 모드를 전환합니다. `--permission-mode` 플래그 또는 `permissions.defaultMode` 설정으로 기본값을 지정합니다.

### 활성화 방법

**키보드 단축키**:
```bash
Shift + Tab  # 6개 모드 순환
```

**Slash command**:
```bash
/plan                  # Plan mode 진입
```

**CLI 플래그**:
```bash
claude --permission-mode plan
claude --permission-mode auto
```

**설정**:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### 권한 모드 예제

#### Default 모드
Claude가 중요한 작업에 대해 확인을 요청합니다:

```
User: Fix the bug in auth.ts

Claude: I need to modify src/auth.ts to fix the bug.
The change will update the password validation logic.

Approve this change? (yes/no/show)
```

#### Plan 모드
실행 전에 구현 계획을 검토합니다:

```
User: /plan Implement user authentication system

Claude: I'll create a plan for implementing authentication.

## Implementation Plan
[Detailed plan with phases and steps]

Ready to proceed? (yes/no/modify)
```

#### Accept Edits 모드
파일 수정을 자동으로 수락합니다:

```
User: acceptEdits
User: Fix the bug in auth.ts

Claude: [Makes changes without asking]
```

### 사용 사례

**코드 리뷰**:
```
User: claude --permission-mode plan
User: Review this PR and suggest improvements

Claude: [Reads code, provides feedback, but cannot modify]
```

**페어 프로그래밍**:
```
User: claude --permission-mode default
User: Let's implement the feature together

Claude: [Asks for approval before each change]
```

**자동화 작업**:
```
User: claude --permission-mode acceptEdits
User: Fix all linting issues in the codebase

Claude: [Auto-accepts file edits without asking]
```

---

## Headless Mode

Print mode(`claude -p`)는 대화형 입력 없이 Claude Code를 실행할 수 있어, 자동화 및 CI/CD에 적합합니다. 이전 `--headless` 플래그를 대체하는 비대화형 모드입니다.

### Print Mode란?

Print mode는 다음을 가능하게 합니다:
- 자동화된 스크립트 실행
- CI/CD 통합
- 배치 처리
- 예약 작업

### Print Mode 실행 (비대화형)

```bash
# 특정 작업 실행
claude -p "Run all tests"

# 파이프된 콘텐츠 처리
cat error.log | claude -p "Analyze these errors"

# CI/CD 통합 (GitHub Actions)
- name: AI Code Review
  run: claude -p "Review PR"
```

### 추가 Print Mode 사용 예제

```bash
# 출력 캡처와 함께 특정 작업 실행
claude -p "Run all tests and generate coverage report"

# 구조화된 출력
claude -p --output-format json "Analyze code quality"

# stdin으로부터 입력
echo "Analyze code quality" | claude -p "explain this"
```

### 예제: CI/CD 통합

**GitHub Actions**:
```yaml
# .github/workflows/code-review.yml
name: AI Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Claude Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p --output-format json \
            --max-turns 3 \
            "Review this PR for:
            - Code quality issues
            - Security vulnerabilities
            - Performance concerns
            - Test coverage
            Output results as JSON" > review.json

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = JSON.parse(fs.readFileSync('review.json', 'utf8'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: JSON.stringify(review, null, 2)
            });
```

### Print Mode 설정

Print mode(`claude -p`)는 자동화를 위한 여러 플래그를 지원합니다:

```bash
# 자율 턴 제한
claude -p --max-turns 5 "refactor this module"

# 구조화된 JSON 출력
claude -p --output-format json "analyze this codebase"

# 스키마 검증 포함
claude -p --json-schema '{"type":"object","properties":{"issues":{"type":"array"}}}' \
  "find bugs in this code"

# 세션 영속성 비활성화
claude -p --no-session-persistence "one-off analysis"
```

---

## 세션 관리

여러 Claude Code 세션을 효과적으로 관리합니다.

### 세션 관리 명령어

| 명령어 | 설명 |
|---------|-------------|
| `/resume` | ID 또는 이름으로 대화 재개 |
| `/rename` | 현재 세션 이름 지정 |
| `/fork` | 현재 세션을 새 브랜치로 분기 |
| `claude -c` | 가장 최근 대화 계속 |
| `claude -r "session"` | 이름 또는 ID로 세션 재개 |

### 세션 재개

**마지막 대화 계속**:
```bash
claude -c
```

**이름이 지정된 세션 재개**:
```bash
claude -r "auth-refactor" "finish this PR"
```

**현재 세션 이름 변경** (REPL 내부):
```
/rename auth-refactor
```

### 세션 분기

원본을 잃지 않고 대안적 접근 방식을 시도하기 위해 세션을 분기합니다:

```
/fork
```

또는 CLI에서:
```bash
claude --resume auth-refactor --fork-session "try OAuth instead"
```

### 세션 영속성

세션은 자동으로 저장되며 재개할 수 있습니다:

```bash
# 마지막 대화 계속
claude -c

# 이름 또는 ID로 특정 세션 재개
claude -r "auth-refactor"

# 실험을 위해 재개 후 분기
claude --resume auth-refactor --fork-session "alternative approach"
```

---

## 대화형 기능

### 키보드 단축키

Claude Code는 효율성을 위한 키보드 단축키를 지원합니다. 공식 문서의 전체 참조입니다:

| 단축키 | 설명 |
|----------|-------------|
| `Ctrl+C` | 현재 입력/생성 취소 |
| `Ctrl+D` | Claude Code 종료 |
| `Ctrl+G` | 외부 편집기에서 계획 편집 |
| `Ctrl+L` | 터미널 화면 지우기 |
| `Ctrl+O` | 상세 출력 토글 (추론 보기) |
| `Ctrl+R` | 이력 역방향 검색 |
| `Ctrl+T` | Task list 보기 토글 |
| `Ctrl+B` | 실행 중인 작업을 백그라운드로 전환 |
| `Esc+Esc` | 코드/대화 rewind |
| `Shift+Tab` / `Alt+M` | 권한 모드 전환 |
| `Option+P` / `Alt+P` | 모델 전환 |
| `Option+T` / `Alt+T` | Extended thinking 토글 |

**줄 편집 (표준 readline 단축키):**

| 단축키 | 동작 |
|----------|--------|
| `Ctrl + A` | 줄 시작으로 이동 |
| `Ctrl + E` | 줄 끝으로 이동 |
| `Ctrl + K` | 줄 끝까지 잘라내기 |
| `Ctrl + U` | 줄 시작까지 잘라내기 |
| `Ctrl + W` | 뒤쪽 단어 삭제 |
| `Ctrl + Y` | 붙여넣기 (yank) |
| `Tab` | 자동 완성 |
| `↑ / ↓` | 명령어 이력 |

### 키 바인딩 사용자 정의

`/keybindings`를 실행하면 `~/.claude/keybindings.json`이 열려 사용자 정의 키보드 단축키를 만들 수 있습니다 (v2.1.18+).

**설정 형식**:

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null,
        "ctrl+k ctrl+s": "chat:stash"
      }
    },
    {
      "context": "Confirmation",
      "bindings": {
        "ctrl+a": "confirmation:yes"
      }
    }
  ]
}
```

바인딩을 `null`로 설정하면 기본 단축키의 바인딩이 해제됩니다.

### 사용 가능한 컨텍스트

키 바인딩은 특정 UI 컨텍스트에 범위가 지정됩니다:

| 컨텍스트 | 주요 동작 |
|---------|-------------|
| **Chat** | `submit`, `cancel`, `cycleMode`, `modelPicker`, `thinkingToggle`, `undo`, `externalEditor`, `stash`, `imagePaste` |
| **Confirmation** | `yes`, `no`, `previous`, `next`, `nextField`, `cycleMode`, `toggleExplanation` |
| **Global** | `interrupt`, `exit`, `toggleTodos`, `toggleTranscript` |
| **Autocomplete** | `accept`, `dismiss`, `next`, `previous` |
| **HistorySearch** | `search`, `previous`, `next` |
| **Settings** | 컨텍스트별 설정 네비게이션 |
| **Tabs** | 탭 전환 및 관리 |
| **Help** | 도움말 패널 네비게이션 |

`Transcript`, `Task`, `ThemePicker`, `Attachments`, `Footer`, `MessageSelector`, `DiffDialog`, `ModelPicker`, `Select`를 포함하여 총 18개의 컨텍스트가 있습니다.

### 코드 지원

키 바인딩은 코드 시퀀스(다중 키 조합)를 지원합니다:

```
"ctrl+k ctrl+s"   → 두 키 시퀀스: ctrl+k를 누른 후 ctrl+s를 누름
"ctrl+shift+p"    → 동시 수정자 키
```

**키 입력 문법**:
- **수정자**: `ctrl`, `alt` (또는 `opt`), `shift`, `meta` (또는 `cmd`)
- **대문자는 Shift를 의미**: `K`는 `shift+k`와 동일
- **특수 키**: `escape`, `enter`, `return`, `tab`, `space`, `backspace`, `delete`, 방향 키

### 예약 및 충돌 키

| 키 | 상태 | 참고 |
|-----|--------|-------|
| `Ctrl+C` | 예약됨 | 재바인딩 불가 (인터럽트) |
| `Ctrl+D` | 예약됨 | 재바인딩 불가 (종료) |
| `Ctrl+B` | 터미널 충돌 | tmux 접두사 키 |
| `Ctrl+A` | 터미널 충돌 | GNU Screen 접두사 키 |
| `Ctrl+Z` | 터미널 충돌 | 프로세스 일시 중지 |

> **팁**: 단축키가 작동하지 않으면 터미널 에뮬레이터나 멀티플렉서와의 충돌을 확인하세요.

### 탭 완성

Claude Code는 지능적인 탭 완성을 제공합니다:

```
User: /rew<TAB>
→ /rewind

User: /plu<TAB>
→ /plugin

User: /plugin <TAB>
→ /plugin install
→ /plugin enable
→ /plugin disable
```

### 명령어 이력

이전 명령어에 접근합니다:

```
User: <↑>  # 이전 명령어
User: <↓>  # 다음 명령어
User: Ctrl+R  # 이력 검색

(reverse-i-search)`test': run all tests
```

### 여러 줄 입력

복잡한 쿼리의 경우 여러 줄 모드를 사용합니다:

```bash
User: \
> Long complex prompt
> spanning multiple lines
> \end
```

**예시:**

```
User: \
> Implement a user authentication system
> with the following requirements:
> - JWT tokens
> - Email verification
> - Password reset
> - 2FA support
> \end

Claude: [Processes the multi-line request]
```

### 인라인 편집

전송 전에 명령어를 편집합니다:

```
User: Deploy to prodcution<Backspace><Backspace>uction

[Edit in-place before sending]
```

### Vim Mode

Vi/Vim 키 바인딩을 텍스트 편집에 활성화합니다:

**활성화**:
- `/vim` 명령어 또는 `/config`를 사용하여 활성화
- `Esc`로 NORMAL 모드, `i/a/o`로 INSERT 모드 전환

**네비게이션 키**:
- `h` / `l` - 좌/우 이동
- `j` / `k` - 하/상 이동
- `w` / `b` / `e` - 단어 단위 이동
- `0` / `$` - 줄 시작/끝으로 이동
- `gg` / `G` - 텍스트 시작/끝으로 점프

**텍스트 객체**:
- `iw` / `aw` - 내부/주변 단어
- `i"` / `a"` - 내부/주변 따옴표 문자열
- `i(` / `a(` - 내부/주변 괄호

### Bash Mode

`!` 접두사로 셸 명령어를 직접 실행합니다:

```bash
! npm test
! git status
! cat src/index.js
```

컨텍스트를 전환하지 않고 빠른 명령어 실행에 사용하세요.

---

## 음성 입력

음성 입력은 Claude Code에 푸시 투 토크 음성 입력을 제공하여, 타이핑 대신 음성으로 프롬프트를 말할 수 있게 합니다.

### 음성 입력 활성화

```
/voice
```

### 기능

| 기능 | 설명 |
|---------|-------------|
| **푸시 투 토크** | 키를 누르고 있으면 녹음, 놓으면 전송 |
| **20개 언어** | 음성 인식이 20개 언어를 지원 |
| **사용자 정의 키 바인딩** | `/keybindings`를 통해 푸시 투 토크 키를 구성 |
| **계정 요구 사항** | STT 처리를 위해 Claude.ai 계정이 필요 |

### 설정

키 바인딩 파일(`/keybindings`)에서 푸시 투 토크 키 바인딩을 사용자 정의합니다. 음성 입력은 음성 인식 처리에 Claude.ai 계정을 사용합니다.

---

## Channel

Channel은 MCP 서버를 통해 외부 서비스의 이벤트를 실행 중인 Claude Code 세션으로 푸시하는 Research Preview 기능입니다. Telegram, Discord, iMessage, 임의의 웹훅을 소스로 지원하며, 폴링 없이 Claude가 실시간 알림에 반응할 수 있게 합니다.

### Channel 구독

```bash
# 시작 시 채널 플러그인 구독
claude --channels discord,telegram

# 여러 소스 구독
claude --channels discord,telegram,imessage,webhooks
```

### 지원되는 통합

| 통합 | 설명 |
|-------------|-------------|
| **Discord** | 세션에서 Discord 메시지 수신 및 응답 |
| **Telegram** | 세션에서 Telegram 메시지 수신 및 응답 |
| **iMessage** | 세션에서 iMessage 알림 수신 |
| **Webhooks** | 임의의 웹훅 소스로부터 이벤트 수신 |

### 설정

시작 시 `--channels` 플래그로 channel을 구성합니다. 엔터프라이즈 배포의 경우, 관리형 설정으로 허용되는 채널 플러그인을 제어합니다:

```json
{
  "allowedChannelPlugins": ["discord", "telegram"]
}
```

`allowedChannelPlugins` 관리형 설정은 조직 전체에서 허용되는 채널 플러그인을 제어합니다.

### 작동 방식

1. MCP 서버가 외부 서비스에 연결하는 채널 플러그인 역할을 합니다
2. 수신 메시지와 이벤트가 활성 Claude Code 세션으로 푸시됩니다
3. Claude가 세션 컨텍스트 내에서 메시지를 읽고 응답할 수 있습니다
4. 채널 플러그인은 `allowedChannelPlugins` 관리형 설정을 통해 승인되어야 합니다
5. 폴링이 필요 없습니다 — 이벤트가 실시간으로 푸시됩니다

---

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

설치 지침은 [데스크톱 빠른 시작](https://code.claude.com/docs/en/desktop-quickstart)을 참조하세요.

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

> **참고**: 커넥터는 원격(클라우드) 세션에서 사용할 수 없습니다.

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

## Task List

Task List 기능은 컨텍스트 압축(대화 이력이 컨텍스트 윈도우에 맞게 트리밍될 때)을 거쳐도 유지되는 영구 작업 추적을 제공합니다.

### Task List 토글

세션 중에 `Ctrl+T`를 눌러 task list 보기를 켜거나 끕니다.

### 영구 작업

작업은 컨텍스트 압축 간에 유지되어, 대화 컨텍스트가 트리밍될 때 장시간 실행 중인 작업 항목이 손실되지 않습니다. 이는 복잡한 다단계 구현에 특히 유용합니다.

### 이름이 지정된 작업 디렉토리

`CLAUDE_CODE_TASK_LIST_ID` 환경 변수를 사용하여 세션 간에 공유되는 이름이 지정된 작업 디렉토리를 생성합니다:

```bash
export CLAUDE_CODE_TASK_LIST_ID=my-project-sprint-3
```

이를 통해 여러 세션이 동일한 task list를 공유할 수 있어, 팀 워크플로우나 다중 세션 프로젝트에 유용합니다.

---

## 프롬프트 제안

프롬프트 제안은 git 이력과 현재 대화 컨텍스트를 기반으로 회색 텍스트의 예제 명령어를 표시합니다.

### 작동 방식

- 입력 프롬프트 아래에 회색 텍스트로 제안이 표시됩니다
- `Tab`을 눌러 제안을 수락합니다
- `Enter`를 눌러 수락하고 즉시 제출합니다
- 제안은 git 이력과 대화 상태에서 가져온 컨텍스트 인식 기능입니다

### 프롬프트 제안 비활성화

```bash
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
```

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

## Sandboxing

Sandboxing은 Claude Code가 실행하는 Bash 명령어에 대해 OS 수준의 파일 시스템 및 네트워크 격리를 제공합니다. 권한 규칙을 보완하며 추가 보안 계층을 제공합니다.

### Sandboxing 활성화

**Slash command**:
```
/sandbox
```

**CLI 플래그**:
```bash
claude --sandbox       # Sandboxing 활성화
claude --no-sandbox    # Sandboxing 비활성화
```

### 설정 항목

| 설정 | 설명 |
|---------|-------------|
| `sandbox.enabled` | sandboxing 활성화 또는 비활성화 |
| `sandbox.failIfUnavailable` | sandboxing을 활성화할 수 없을 때 실패 처리 |
| `sandbox.filesystem.allowWrite` | 쓰기 접근이 허용되는 경로 |
| `sandbox.filesystem.allowRead` | 읽기 접근이 허용되는 경로 |
| `sandbox.filesystem.denyRead` | 읽기 접근이 거부되는 경로 |
| `sandbox.enableWeakerNetworkIsolation` | macOS에서 약한 네트워크 격리 활성화 |

### 설정 예제

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "filesystem": {
      "allowWrite": ["/Users/me/project"],
      "allowRead": ["/Users/me/project", "/usr/local/lib"],
      "denyRead": ["/Users/me/.ssh", "/Users/me/.aws"]
    },
    "enableWeakerNetworkIsolation": true
  }
}
```

### 작동 방식

- Bash 명령어가 파일 시스템 접근이 제한된 sandbox 환경에서 실행됩니다
- 의도하지 않은 외부 연결을 방지하기 위해 네트워크 접근을 격리할 수 있습니다
- 심층 방어를 위해 권한 규칙과 함께 작동합니다
- macOS에서는 네트워크 제한을 위해 `sandbox.enableWeakerNetworkIsolation`을 사용합니다 (macOS에서는 전체 네트워크 격리를 사용할 수 없음)

### 사용 사례

- 신뢰할 수 없거나 생성된 코드를 안전하게 실행
- 프로젝트 외부 파일에 대한 우발적 수정 방지
- 자동화 작업 중 네트워크 접근 제한

---

## 관리형 설정 (엔터프라이즈)

관리형 설정은 엔터프라이즈 관리자가 플랫폼 네이티브 관리 도구를 사용하여 조직 전체에 Claude Code 구성을 배포할 수 있게 합니다.

### 배포 방법

| 플랫폼 | 방법 | 지원 시작 |
|----------|--------|-------|
| macOS | 관리형 plist 파일 (MDM) | v2.1.51+ |
| Windows | Windows Registry | v2.1.51+ |
| 크로스 플랫폼 | 관리형 구성 파일 | v2.1.51+ |
| 크로스 플랫폼 | 관리형 드롭인 (`managed-settings.d/` 디렉토리) | v2.1.83+ |

### 관리형 드롭인

v2.1.83부터 관리자는 `managed-settings.d/` 디렉토리에 여러 관리형 설정 파일을 배포할 수 있습니다. 파일은 알파벳 순서로 병합되어 팀 간 모듈식 구성이 가능합니다:

```
~/.claude/managed-settings.d/
  00-org-defaults.json
  10-team-policies.json
  20-project-overrides.json
```

### 사용 가능한 관리형 설정

| 설정 | 설명 |
|---------|-------------|
| `disableBypassPermissionsMode` | 사용자가 권한 우회 모드를 활성화하는 것을 방지 |
| `availableModels` | 사용자가 선택할 수 있는 모델 제한 |
| `allowedChannelPlugins` | 허용되는 채널 플러그인 제어 |
| `autoMode.environment` | Auto mode를 위한 신뢰할 수 있는 인프라 구성 |
| 사용자 정의 정책 | 조직별 권한 및 도구 정책 |

### 예제: macOS Plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>disableBypassPermissionsMode</key>
  <true/>
  <key>availableModels</key>
  <array>
    <string>claude-sonnet-4-6</string>
    <string>claude-haiku-4-5</string>
  </array>
</dict>
</plist>
```

---

## 구성 및 설정

### 구성 파일 위치

1. **전역 설정**: `~/.claude/config.json`
2. **프로젝트 설정**: `./.claude/config.json`
3. **사용자 설정**: `~/.config/claude-code/settings.json`

### 전체 구성 예제

**핵심 고급 기능 설정:**

```json
{
  "permissions": {
    "mode": "default"
  },
  "hooks": {
    "PreToolUse:Edit": "eslint --fix ${file_path}",
    "PostToolUse:Write": "~/.claude/hooks/security-scan.sh"
  },
  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      }
    }
  }
}
```

**확장 구성 예제:**

```json
{
  "permissions": {
    "mode": "default",
    "allowedTools": ["Bash(git log:*)", "Read"],
    "disallowedTools": ["Bash(rm -rf:*)"]
  },

  "hooks": {
    "PreToolUse": [{ "matcher": "Edit", "hooks": ["eslint --fix ${file_path}"] }],
    "PostToolUse": [{ "matcher": "Write", "hooks": ["~/.claude/hooks/security-scan.sh"] }],
    "Stop": [{ "hooks": ["~/.claude/hooks/notify.sh"] }]
  },

  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_TOKEN": "${GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

### 환경 변수

환경 변수로 설정을 재정의합니다:

```bash
# 모델 선택
export ANTHROPIC_MODEL=claude-opus-4-6
export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-6
export ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
export ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5

# API 설정
export ANTHROPIC_API_KEY=sk-ant-...

# Thinking 설정
export MAX_THINKING_TOKENS=16000
export CLAUDE_CODE_EFFORT_LEVEL=high

# 기능 토글
export CLAUDE_CODE_DISABLE_AUTO_MEMORY=true
export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=true
export CLAUDE_CODE_DISABLE_CRON=1
export CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=true
export CLAUDE_CODE_DISABLE_TERMINAL_TITLE=true
export CLAUDE_CODE_DISABLE_1M_CONTEXT=true
export CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=true
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
export CLAUDE_CODE_ENABLE_TASKS=true
export CLAUDE_CODE_SIMPLE=true              # --bare 플래그로 설정

# MCP 설정
export MAX_MCP_OUTPUT_TOKENS=50000
export ENABLE_TOOL_SEARCH=true

# 작업 관리
export CLAUDE_CODE_TASK_LIST_ID=my-project-tasks

# Agent teams (실험적)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Subagent 및 plugin 설정
export CLAUDE_CODE_SUBAGENT_MODEL=sonnet
export CLAUDE_CODE_PLUGIN_SEED_DIR=./my-plugins
export CLAUDE_CODE_NEW_INIT=1

# 서브프로세스 및 스트리밍
export CLAUDE_CODE_SUBPROCESS_ENV_SCRUB="SECRET_KEY,DB_PASSWORD"
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80
export CLAUDE_STREAM_IDLE_TIMEOUT_MS=30000
export ANTHROPIC_CUSTOM_MODEL_OPTION=my-custom-model
export SLASH_COMMAND_TOOL_CHAR_BUDGET=50000
```

### 구성 관리 명령어

```
User: /config
[Opens interactive configuration menu]
```

`/config` 명령어는 다음과 같은 설정을 토글할 수 있는 대화형 메뉴를 제공합니다:
- Extended thinking 켜기/끄기
- 상세 출력
- 권한 모드
- 모델 선택

### 프로젝트별 구성

프로젝트에 `.claude/config.json`을 생성합니다:

```json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", "hooks": ["npm test && npm run lint"] }]
  },
  "permissions": {
    "mode": "default"
  },
  "mcp": {
    "servers": {
      "project-db": {
        "command": "mcp-postgres",
        "env": {
          "DATABASE_URL": "${PROJECT_DB_URL}"
        }
      }
    }
  }
}
```

---

## Agent Teams

Agent Teams는 여러 Claude Code 인스턴스가 작업에 협력할 수 있게 하는 실험적 기능입니다. 기본적으로 비활성화되어 있습니다.

### Agent Teams 활성화

환경 변수 또는 설정을 통해 활성화합니다:

```bash
# 환경 변수
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

또는 설정 JSON에 추가합니다:

```json
{
  "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
}
```

### Agent Teams 작동 방식

- **팀 리더**가 전체 작업을 조율하고 하위 작업을 팀원에게 위임합니다
- **팀원**은 각자 고유한 컨텍스트 윈도우를 가지고 독립적으로 작업합니다
- **공유 task list**를 통해 팀원 간 자체 조율이 가능합니다
- subagent 정의(`.claude/agents/` 또는 `--agents` 플래그)를 사용하여 팀원 역할과 전문 분야를 정의합니다

### 표시 모드

Agent Teams는 `--teammate-mode` 플래그로 구성되는 두 가지 표시 모드를 지원합니다:

| 모드 | 설명 |
|------|-------------|
| `in-process` (기본) | 팀원이 동일한 터미널 프로세스 내에서 실행 |
| `tmux` | 각 팀원이 전용 분할 창을 가짐 (tmux 또는 iTerm2 필요) |
| `auto` | 최적의 표시 모드를 자동 선택 |

```bash
# tmux 분할 창에서 팀원 표시
claude --teammate-mode tmux

# 명시적으로 in-process 모드 사용
claude --teammate-mode in-process
```

### 사용 사례

- 다른 팀원이 다른 모듈을 담당하는 대규모 리팩터링 작업
- 병렬 코드 리뷰 및 구현
- 코드베이스 전반에 걸친 조율된 다중 파일 변경

> **참고**: Agent Teams는 실험적 기능이며 향후 릴리스에서 변경될 수 있습니다. 전체 참조는 [code.claude.com/docs/en/agent-teams](https://code.claude.com/docs/en/agent-teams)를 참조하세요.

---

## 모범 사례

### Plan Mode
- ✅ 복잡한 다단계 작업에 사용합니다
- ✅ 승인 전에 계획을 검토합니다
- ✅ 필요한 경우 계획을 수정합니다
- ❌ 간단한 작업에는 사용하지 마세요

### Extended Thinking
- ✅ 아키텍처 결정에 사용합니다
- ✅ 복잡한 문제 해결에 사용합니다
- ✅ 사고 과정을 검토합니다
- ❌ 간단한 질문에는 사용하지 마세요

### Background Tasks
- ✅ 장시간 실행되는 작업에 사용합니다
- ✅ 작업 진행 상황을 모니터링합니다
- ✅ 작업 실패를 우아하게 처리합니다
- ❌ 너무 많은 동시 작업을 시작하지 마세요

### 권한
- ✅ 코드 리뷰(읽기 전용)에 `plan`을 사용합니다
- ✅ 대화형 개발에 `default`를 사용합니다
- ✅ 자동화 워크플로우에 `acceptEdits`를 사용합니다
- ✅ 안전 가드레일이 있는 자율 작업에 `auto`를 사용합니다
- ❌ 절대적으로 필요한 경우가 아니면 `bypassPermissions`를 사용하지 마세요

### 세션
- ✅ 다른 작업에 별도 세션을 사용합니다
- ✅ 중요한 세션 상태를 저장합니다
- ✅ 오래된 세션을 정리합니다
- ❌ 하나의 세션에서 관련 없는 작업을 혼합하지 마세요

---

## 추가 리소스

Claude Code 및 관련 기능에 대한 자세한 정보:

- [공식 대화형 모드 문서](https://code.claude.com/docs/en/interactive-mode)
- [공식 Headless 모드 문서](https://code.claude.com/docs/en/headless)
- [CLI 참조](https://code.claude.com/docs/en/cli-reference)
- [Checkpoint 가이드](../../08-checkpoints/) - 세션 관리 및 rewind
- [Slash Command](../../01-slash-commands/) - 명령어 참조
- [메모리 가이드](../../02-memory/) - 영구 컨텍스트
- [Skill 가이드](../../03-skills/) - 자율 기능
- [Subagent 가이드](../../04-subagents/) - 위임 작업 실행
- [MCP 가이드](../../05-mcp/) - 외부 데이터 접근
- [Hook 가이드](../../06-hooks/) - 이벤트 기반 자동화
- [Plugin 가이드](../../07-plugins/) - 번들 확장
- [공식 Scheduled Tasks 문서](https://code.claude.com/docs/en/scheduled-tasks)
- [공식 Chrome 통합 문서](https://code.claude.com/docs/en/chrome)
- [공식 Remote Control 문서](https://code.claude.com/docs/en/remote-control)
- [공식 키 바인딩 문서](https://code.claude.com/docs/en/keybindings)
- [공식 데스크톱 앱 문서](https://code.claude.com/docs/en/desktop)
- [공식 Agent Teams 문서](https://code.claude.com/docs/en/agent-teams)

---
**최종 업데이트**: 2026년 4월
**Claude Code 버전**: 2.1+
**호환 모델**: Claude Sonnet 4.6, Claude Opus 4.6, Claude Haiku 4.5
