
# 실행 모드

## Auto Mode

Auto Mode는 백그라운드 안전 분류기를 사용하여 각 작업을 실행 전에 검토하는 Research Preview 권한 모드입니다 (2026년 3월). Claude가 자율적으로 작업하면서 위험한 작업은 차단할 수 있게 합니다.

### 요구 사항

- **플랜**: Team, Enterprise, 또는 API (Pro 또는 Max 플랜에서는 사용 불가)
- **모델**: Claude Sonnet 4.6, Opus 4.6, 또는 Opus 4.7
- **제공업체**: Anthropic API 전용 (Bedrock, Vertex, Foundry에서는 지원되지 않음)
- **분류기**: Claude Sonnet 4.6에서 실행 (추가 토큰 비용 발생)

### Auto Mode 활성화

```bash
# Auto mode는 Shift+Tab 권한 순환에 포함되어 있음
# 직접 시작하려면 --permission-mode auto 사용
claude --permission-mode auto
```

> **참고:** `--enable-auto-mode` 플래그는 v2.1.111에서 제거되었습니다. Auto mode는 이제 `Shift+Tab` 순환에 기본 포함됩니다. `--permission-mode auto`를 대신 사용하세요.

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

| 플래그 | 설명 | 예시 |
|------|-------------|---------|
| `--max-budget-usd` | 세션의 최대 비용 한도 설정 | `claude -p --max-budget-usd 5.00 "query"` |

---

## Advisor

> **참고:** Advisor 기능은 실험적이며 공식 문서에서 별도 페이지로 다루어지지 않을 수 있습니다. 최신 정보는 Claude Code 내에서 확인하세요.

Advisor는 저비용 **executor 모델**(Sonnet 또는 Haiku)과 고지능 **advisor 모델**(Opus 4.7)을 서버 사이드에서 결합하는 베타 도구(`advisor_20260301`)입니다. Executor가 작업을 처리하다가 전략적 결정이 필요한 시점에 자율적으로 `advisor()`를 호출하면, 서버가 별도의 Opus 추론을 실행하여 가이던스를 반환합니다. 이 모든 과정이 단일 API 요청 안에서 이루어집니다.

### 작동 방식

1. Executor 모델이 일반 도구처럼 `advisor()`를 **자율적으로** 호출 (매 턴이 아닌 전략적 결정 시점에만)
2. Opus 4.7이 전체 대화 기록을 읽고 전략적 가이던스 반환 (400–700 토큰)
3. Advisor는 도구를 직접 호출하지 않고 사용자에게 직접 출력하지도 않음 — executor에게만 조언
4. API 응답에서 `server_tool_use` + `advisor_tool_result` 블록으로 표시

### 활성화

**Claude Code (대화형):**
```bash
/advisor    # 현재 세션에서 advisor 켜기/끄기
```

> **참고:** `/advisor` 명령이 자동완성 메뉴에 표시되지 않을 수 있습니다. 직접 입력하세요.

**API (프로그래밍):**
```bash
curl https://api.anthropic.com/v1/messages \
  --header "anthropic-beta: advisor-tool-2026-03-01" \
  --header "content-type: application/json" \
  --data '{
      "model": "claude-sonnet-4-6",
      "max_tokens": 4096,
      "tools": [{
          "type": "advisor_20260301",
          "name": "advisor",
          "model": "claude-opus-4-7"
      }],
      "messages": [{"role": "user", "content": "Go로 동시성 워커 풀 구현"}]
  }'
```

### 모델 호환성

| Executor | Advisor |
|----------|---------|
| `claude-haiku-4-5` | `claude-opus-4-7` |
| `claude-sonnet-4-6` | `claude-opus-4-7` |
| `claude-opus-4-6` | `claude-opus-4-7` |
| `claude-opus-4-7` | `claude-opus-4-7` |

### 설정 옵션

| 파라미터 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `type` | string | 필수 | `"advisor_20260301"` |
| `name` | string | 필수 | `"advisor"` |
| `model` | string | 필수 | Advisor 모델 (예: `"claude-opus-4-7"`) |
| `max_uses` | integer | 무제한 | 요청당 호출 횟수 제한 |
| `caching` | object | off | `{"type": "ephemeral", "ttl": "5m"}` — advisor 프롬프트 캐싱 |

### 성능

| 구성 | 벤치마크 | 개선 효과 |
|------|----------|----------|
| Sonnet + Opus advisor | SWE-bench Multilingual | Sonnet 단독 대비 +2.7pp, 비용 11.9% 절감 |
| Haiku + Opus advisor | BrowseComp | 41.2% vs 19.7% (단독), 비용 ~85% 절감 |

### 요구 사항 및 제한

- **상태**: 베타 (API 사용 시 `advisor-tool-2026-03-01` beta header 필요)
- **제공자**: Anthropic API 전용 (Bedrock, Vertex, Foundry 미지원)
- **알려진 이슈**: Advisor 결과가 포함된 세션이 1–3일 후 암호화된 결과 TTL 만료로 복구 불가능해질 수 있음. `/clear`로 해결.
