# 09. 고급 기능

Plan mode, extended thinking, auto mode, background tasks, 권한 모드, print mode(비대화형), 세션 관리, 대화형 기능, channel, 음성 입력, remote control, 웹 세션, 데스크톱 앱, task list, 프롬프트 제안, git worktree, sandboxing, 관리형 설정, 그리고 구성을 포함하는 Claude Code의 고급 기능에 대한 종합 가이드입니다.

## 언제 읽으면 좋은가

- 기본 명령과 메모리, 스킬, MCP를 이미 한 번 써봤을 때
- 장시간 작업이나 자동화를 안정적으로 굴리고 싶을 때
- 팀 환경에서 권한, sandbox, 관리형 설정 같은 운영 감각을 잡고 싶을 때
- 음성, 데스크톱, 웹, 원격 제어처럼 다양한 채널에서 Claude Code를 쓰고 싶을 때

**관련 가이드:**

- [How Claude Code Works](09-advanced-features.md#09-advanced-features-19-claude-code는-어떻게-동작하는가)
- [Features Overview](09-advanced-features.md#09-advanced-features-14-기능-개요)
- [`.claude` 디렉터리 살펴보기](09-advanced-features.md#09-advanced-features-04-claude-디렉터리-살펴보기)
- [컨텍스트 윈도우 살펴보기](09-advanced-features.md#09-advanced-features-09-컨텍스트-윈도우-살펴보기)
- [공통 워크플로](09-advanced-features.md#09-advanced-features-06-공통-워크플로)
- [모범 사례](09-advanced-features.md#09-advanced-features-01-모범-사례)
- [Settings System Guide](09-advanced-features.md#09-advanced-features-27-settings-system-guide)
- [Output Styles](09-advanced-features.md#09-advanced-features-20-output-styles)
- [Fullscreen Rendering](09-advanced-features.md#09-advanced-features-15-fullscreen-rendering)
- [Terminal Configuration](09-advanced-features.md#09-advanced-features-29-terminal-configuration)
- [Channels Reference](09-advanced-features.md#09-advanced-features-02-channels-reference)
- [Computer Use](09-advanced-features.md#09-advanced-features-07-computer-use)
- [Slack의 Claude Code](09-advanced-features.md#09-advanced-features-28-slack의-claude-code)
- [Use Claude Code in VS Code](09-advanced-features.md#09-advanced-features-30-use-claude-code-in-vs-code)
- [Claude Code 웹 시작하기](09-advanced-features.md#09-advanced-features-31-claude-code-웹-시작하기)
- [웹에서 Claude Code 사용하기](09-advanced-features.md#09-advanced-features-03-웹에서-claude-code-사용하기)
- [Claude Code Desktop](09-advanced-features.md#09-advanced-features-12-claude-code-desktop-사용하기)
- [Desktop Quickstart](09-advanced-features.md#09-advanced-features-10-desktop-quickstart)
- [Desktop Scheduled Tasks](09-advanced-features.md#09-advanced-features-11-desktop-scheduled-tasks)
- [Routines](09-advanced-features.md#09-advanced-features-25-routines)
- [Code Review](09-advanced-features.md#09-advanced-features-05-code-review)
- [GitHub Actions](09-advanced-features.md#09-advanced-features-16-github-actions)
- [GitHub Enterprise Server](09-advanced-features.md#09-advanced-features-17-github-enterprise-server)
- [GitLab CI/CD](09-advanced-features.md#09-advanced-features-18-gitlab-ci-cd)

## 목차

1. [개요](#개요)
2. [How Claude Code Works](09-advanced-features.md#09-advanced-features-19-claude-code는-어떻게-동작하는가)
3. [Features Overview](09-advanced-features.md#09-advanced-features-14-기능-개요)
4. [`.claude` 디렉터리 살펴보기](09-advanced-features.md#09-advanced-features-04-claude-디렉터리-살펴보기)
5. [컨텍스트 윈도우 살펴보기](09-advanced-features.md#09-advanced-features-09-컨텍스트-윈도우-살펴보기)
6. [플래닝 모드 & 확장 사고](09-advanced-features.md#09-advanced-features-22-플래닝-모드-확장-사고)
7. [실행 모드](09-advanced-features.md#09-advanced-features-13-실행-모드) — Auto Mode, Background Tasks, Scheduled Tasks, Headless Mode
8. [권한 & 보안](09-advanced-features.md#09-advanced-features-21-권한-보안) — 권한 모드, Sandboxing
9. [세션 & 인터랙션](09-advanced-features.md#09-advanced-features-26-세션-인터랙션) — 세션 관리, 대화형 기능, 음성 입력, Task List, 프롬프트 제안
10. [공통 워크플로](09-advanced-features.md#09-advanced-features-06-공통-워크플로)
11. [모범 사례](09-advanced-features.md#09-advanced-features-01-모범-사례)
12. [플랫폼 & 통합](09-advanced-features.md#09-advanced-features-24-플랫폼-통합) — Chrome 통합, Remote Control, 웹 세션, 데스크톱 앱, Git Worktree
13. [Claude Code 웹 시작하기](09-advanced-features.md#09-advanced-features-31-claude-code-웹-시작하기)
14. [웹에서 Claude Code 사용하기](09-advanced-features.md#09-advanced-features-03-웹에서-claude-code-사용하기)
15. [Claude Code Desktop](09-advanced-features.md#09-advanced-features-12-claude-code-desktop-사용하기)
16. [Desktop Quickstart](09-advanced-features.md#09-advanced-features-10-desktop-quickstart)
17. [Desktop Scheduled Tasks](09-advanced-features.md#09-advanced-features-11-desktop-scheduled-tasks)
18. [Routines](09-advanced-features.md#09-advanced-features-25-routines)
19. [Computer Use](09-advanced-features.md#09-advanced-features-07-computer-use)
20. [Slack의 Claude Code](09-advanced-features.md#09-advanced-features-28-slack의-claude-code)
21. [Code Review](09-advanced-features.md#09-advanced-features-05-code-review)
22. [GitHub Actions](09-advanced-features.md#09-advanced-features-16-github-actions)
23. [GitHub Enterprise Server](09-advanced-features.md#09-advanced-features-17-github-enterprise-server)
24. [GitLab CI/CD](09-advanced-features.md#09-advanced-features-18-gitlab-ci-cd)
25. [Configuration](09-advanced-features.md#09-advanced-features-08-configuration)
26. [Channel](#channel)
27. [관리형 설정 (엔터프라이즈)](#관리형-설정-엔터프라이즈)
28. [구성 및 설정](#구성-및-설정)
29. [Agent Teams](#agent-teams)
30. [추가 리소스](#추가-리소스)

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

전체 빌더 지향 참조는 [Channels Reference](09-advanced-features.md#09-advanced-features-02-channels-reference)를 참조하세요.

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

1. **전역 설정**: `~/.claude/settings.json`
2. **프로젝트 설정**: `./.claude/settings.json`
3. **사용자 설정**: `~/.claude/settings.local.json` (git에 커밋하지 않는 개인 설정)

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
export ANTHROPIC_MODEL=claude-opus-4-7
export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-7
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

프로젝트에 `.claude/settings.json`을 생성합니다:

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

> **참고**: Agent Teams는 실험적 기능이며 향후 릴리스에서 변경될 수 있습니다. 전체 참조는 [code.claude.com/docs/ko/agent-teams](https://code.claude.com/docs/ko/agent-teams)를 참조하세요.

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

## 자주 보는 오류

| 증상 | 원인 | 진단/해결 |
| --- | --- | --- |
| 권한 모드 충돌 | managed settings와 로컬 settings의 우선순위 혼동 | `/status`로 활성 설정 source 확인 |
| Auto mode가 신뢰할 수 있는 동작을 차단 | `autoMode.environment` 또는 allow 규칙 미설정 | `claude auto-mode critique`로 진단 |
| Channel webhook 401/403 | 환경 변수에 인증 토큰 누락 | `/status` 출력에서 channel 인증 상태 확인 |
| Plan mode에서 코드 수정이 안 됨 | 의도된 동작 (Plan mode는 read-only) | 계획 승인 후 일반 모드로 전환 |
| Git worktree에서 특정 명령이 실패 | base 디렉터리 경계 밖 접근 | worktree 안에서만 작업하거나 `--add-dir`로 명시 |

---

## 추가 리소스

Claude Code 및 관련 기능에 대한 자세한 정보:

- [공식 대화형 모드 문서](https://code.claude.com/docs/ko/interactive-mode)
- [공식 Headless 모드 문서](https://code.claude.com/docs/ko/headless)
- [CLI 참조](https://code.claude.com/docs/ko/cli-reference)
- [Settings System Guide](09-advanced-features.md#09-advanced-features-27-settings-system-guide) - scope, precedence, settings file의 실제 동작 정리
- [Output Styles](09-advanced-features.md#09-advanced-features-20-output-styles) - built-in style, custom style, 비교 기준 정리
- [Fullscreen Rendering](09-advanced-features.md#09-advanced-features-15-fullscreen-rendering) - flicker 감소와 alternate-screen 동작 정리
- [Terminal Configuration](09-advanced-features.md#09-advanced-features-29-terminal-configuration) - 줄바꿈, notifications, tmux 관련 설정 정리
- [Channels Reference](09-advanced-features.md#09-advanced-features-02-channels-reference) - channel 기반 event stream의 builder-oriented 가이드
- [Use Claude Code in VS Code](09-advanced-features.md#09-advanced-features-30-use-claude-code-in-vs-code) - VS Code 확장 중심 IDE workflow 가이드
- [Checkpoint 가이드](08-checkpoints.md) - 세션 관리 및 rewind
- [Slash Command](01-slash-commands.md) - 명령어 참조
- [메모리 가이드](02-memory.md) - 영구 컨텍스트
- [Skill 가이드](03-skills.md) - 자율 기능
- [Subagent 가이드](04-subagents.md) - 위임 작업 실행
- [MCP 가이드](05-mcp.md) - 외부 데이터 접근
- [Hook 가이드](06-hooks.md) - 이벤트 기반 자동화
- [Plugin 가이드](07-plugins.md) - 번들 확장
- [공식 Scheduled Tasks 문서](https://code.claude.com/docs/ko/scheduled-tasks)
- [공식 Chrome 통합 문서](https://code.claude.com/docs/ko/chrome)
- [공식 Remote Control 문서](https://code.claude.com/docs/ko/remote-control)
- [공식 키 바인딩 문서](https://code.claude.com/docs/ko/keybindings)
- [공식 데스크톱 앱 문서](https://code.claude.com/docs/ko/desktop)
- [공식 Agent Teams 문서](https://code.claude.com/docs/ko/agent-teams)

---

<a id="09-advanced-features-01-모범-사례"></a>

## 09-01. 모범 사례

공식 best-practices 문서는 한 가지 반복되는 사실 위에 서 있습니다. 컨텍스트는 귀하고, 성공 기준과 환경 제약이 분명할수록 Claude가 훨씬 잘 작동한다는 점입니다.

### 가장 레버리지가 큰 규칙

Claude가 자기 작업을 검증할 수 있게 해 주어야 합니다.

강한 예시:

- 예상 케이스가 있는 테스트
- UI 변경용 스크린샷
- 재현 가능한 실패 명령
- 명시적인 출력 또는 승인 기준

검증 기준이 없으면 결국 사용자가 유일한 피드백 루프가 됩니다.

### 먼저 탐색하고, 그다음 계획하고, 그다음 코딩하기

쉬운 일이 아니라면 다음 흐름이 좋습니다.

1. 현재 시스템을 조사한다
2. 계획을 만든다
3. 계획을 다듬는다
4. 구현한다
5. 검증한다

처음부터 코드부터 달라고 하는 것보다 보통 더 안정적입니다.

### 구체적인 문맥 제공하기

좋은 프롬프트는 보통 다음을 포함합니다.

- 관련 파일이나 디렉터리
- 제약 조건
- 기대 동작
- 바뀌면 안 되는 것
- 성공 검증 방법

프롬프트가 구체적일수록 중간 교정 비용이 줄어듭니다.

### 환경을 맞게 구성하기

강한 설정은 보통 다음을 포함합니다.

- 잘 정리된 `CLAUDE.md`
- 리스크 수준에 맞는 권한 규칙
- Claude가 검증에 쓸 수 있는 CLI 도구
- 실질적 가치가 있는 MCP 통합
- 결정적 자동화를 위한 hooks

처음부터 모두 필요하지는 않지만, 기대하는 워크플로를 환경이 뒷받침해야 합니다.

### 좋은 `CLAUDE.md` 쓰기

일시적인 채팅 지시 대신 오래 가는 규칙을 넣습니다.

- 코딩 컨벤션
- 테스트 기대치
- 저장소 전용 용어
- 아키텍처 제약
- 선호 도구와 명령

같은 말을 자주 반복한다면 `CLAUDE.md`나 skill에 들어갈 가능성이 큽니다.

### 권한을 의도적으로 설계하기

빠르면서도 안전하게 움직이게 해야 합니다.

- 신뢰되지 않은 환경에서는 넓은 접근을 피하고
- 반복적으로 안전한 명령만 명시적으로 허용하고
- 격리된 환경이 아니면 bypass류 설정을 피하고
- 권한과 hooks가 서로 다른 문제를 푼다는 점을 기억합니다

### 컨텍스트를 적극적으로 관리하기

공식 문서가 컨텍스트 관리를 강조하는 이유는, 컨텍스트가 찰수록 품질이 떨어지기 때문입니다.

유용한 습관:

- 작업 범위를 좁게 유지하기
- 조사와 구현을 분리하기
- 큰 조사 작업은 subagent에 맡기기
- 필요한 시점에 의도적으로 compact 하기
- 영구 규칙은 `CLAUDE.md`에 두기

### 일찍 자주 방향 수정하기

Claude Code는 대화형이고 중간에 끊을 수 있습니다. 잘못 가기 시작하면:

- 빨리 멈추고
- 진짜 목표를 다시 적고
- 범위를 좁히고
- 검증 기준을 더 명확히 줍니다

초기에 작은 수정이 나중의 큰 정리보다 훨씬 쌉니다.

### 자동화와 확장 신중하게 하기

사용 규모가 커질수록:

- 적절한 곳에는 비대화형 모드를 쓰고
- worktree로 여러 세션을 병렬 실행하고
- 파일이나 가설 단위로 적절히 팬아웃하고
- auto mode는 신뢰 가능한 인프라에서만 씁니다

환경, 권한, 검증이 갖춰지지 않은 상태에서의 확장은 오히려 위험합니다.

### 흔한 실패 패턴

특히 자주 보이는 것은 다음입니다.

- 승인 기준 없는 모호한 프롬프트
- 컨텍스트가 과도하게 부푼 긴 세션
- 작업에 비해 너무 넓거나 너무 좁은 권한
- 믿을 수 있는 테스트/검증 루프 부재
- 목표를 위임하기보다 절차를 맹목적으로 강요하는 지시

### 관련 가이드

- [How Claude Code Works](09-advanced-features.md#09-advanced-features-19-claude-code는-어떻게-동작하는가)
- [Common Workflows](09-advanced-features.md#09-advanced-features-06-공통-워크플로)
- [Permissions and Security](09-advanced-features.md#09-advanced-features-21-권한-보안)
- [Settings System Guide](09-advanced-features.md#09-advanced-features-27-settings-system-guide)

### 공식 출처

- [Best Practices for Claude Code](https://code.claude.com/docs/ko/best-practices)

---

<a id="09-advanced-features-02-channels-reference"></a>

## 09-02. Channels Reference

Channels는 외부 시스템이 실행 중인 Claude Code 세션으로 메시지를 push할 수 있게 해 줍니다. CI 실패, monitoring alert, chat message처럼 terminal 밖에서 발생한 이벤트에 Claude가 반응해야 할 때 유용합니다.

이 문서는 기존 channel usage가 아니라 builder/reference 관점에 집중합니다.

### What a Channel Is

Channel은 다음 조건을 만족하는 MCP server입니다:

- Claude Code가 subprocess로 로컬 실행
- stdio로 연결
- `claude/channel` capability 선언
- 외부 이벤트가 들어오면 `notifications/claude/channel` 전송

대표 패턴:

- chat bridge: Telegram / Discord DM이 세션에 들어옴
- webhook bridge: CI 또는 monitoring이 local HTTP listener로 POST하고 Claude가 반응

### Requirements

필요한 것:

- `@modelcontextprotocol/sdk` 같은 MCP SDK 구현
- Node, Bun, Deno 같은 runtime
- Claude Code가 시작하는 local process

Channel server는 최소 세 가지를 해야 합니다:

1. `claude/channel` capability 선언
2. `notifications/claude/channel` 전송
3. stdio로 연결

Research-preview 성격의 local development에서는 custom channel testing에 명시적 development flag가 필요할 수 있습니다.

### Minimal Architecture

```plaintext
External system -> Local channel server -> Claude Code session
```

예:

- CI가 local channel server로 webhook 전송
- channel server가 payload를 channel notification으로 감쌈
- Claude가 세션 안에서 그 이벤트를 읽고 반응

### Minimal Webhook Receiver

가장 단순한 패턴은 one-way webhook receiver입니다:

1. MCP server 시작
2. `claude/channel` 선언
3. local HTTP port에서 listen
4. POST body를 channel notification으로 forward

최소 TypeScript shape:

```ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

const mcp = new Server(
  { name: "webhook", version: "0.0.1" },
  {
    capabilities: { experimental: { "claude/channel": {} } },
    instructions:
      "Events arrive as channel messages from the webhook source. They are one-way alerts.",
  },
)

await mcp.connect(new StdioServerTransport())
```

HTTP listener는 inbound request를 다음으로 변환하면 됩니다:

- `content`: Claude가 실제로 읽는 텍스트
- `meta`: channel event metadata가 되는 값

### Notification Format

Channel event는 Claude의 context 안에서 `<channel>` block 형태로 들어옵니다.

개념적으로는:

```xml
<channel source="webhook" severity="high" run_id="1234">
build failed on main
</channel>
```

핵심 요소:

- `source`는 configured server name에서 옵니다
- metadata는 tag attribute가 됩니다
- body는 Claude가 읽는 실제 event content입니다

metadata는 routing과 reply context에 사용합니다:

- `chat_id`
- `severity`
- `run_id`
- `path`
- `method`

### Reply Tools for Two-Way Channels

Channel이 one-way가 아니라면 `reply` 같은 일반 MCP tool을 노출해야 합니다.

이를 위해서는:

1. MCP server capability에 `tools: {}` 포함
2. 일반 MCP request handler로 tool 등록
3. Claude가 언제 어떻게 reply tool을 써야 하는지 instructions로 설명

예시 tool shape:

```ts
{
  name: "reply",
  description: "Send a message back over this channel",
  inputSchema: {
    type: "object",
    properties: {
      chat_id: { type: "string" },
      text: { type: "string" }
    },
    required: ["chat_id", "text"]
  }
}
```

이건 다음 같은 경우에 필요합니다:

- chat thread에 답장
- ticket comment stream에 응답
- webhook-backed operator console에 응답

### Sender Gating

Channels는 prompt-injection boundary입니다. 들어오는 메시지를 아무 검증 없이 Claude로 넘기면 안 됩니다.

Sender gating 예:

- allowlisted user ID
- signed webhook secret
- bot-owner ID
- known chat/thread mapping

송신자 검증 없이 forward하면, channel에 접근 가능한 누구나 live session에 instruction을 주입할 수 있습니다.

### Permission Relay

Two-way channel은 permission prompt를 원격으로 relay하는 데도 쓸 수 있습니다.

필요한 것:

1. experimental capability에 `claude/channel/permission` 선언
2. permission request notification 처리
3. 발급된 request ID에 묶어서 allow/deny verdict 반환

핵심 규칙:

- remote sender가 인증되고 trusted할 때만 permission relay를 켭니다

그렇지 않으면 원격 사용자가 로컬 세션의 tool use를 승인해 버릴 수 있습니다.

### Testing During Development

로컬 실험에는 development bypass flag가 필요할 수 있습니다.

예:

```bash
claude --dangerously-load-development-channels server:webhook
```

직접 제어하는 channel을 개발/테스트할 때만 사용합니다.

### Packaging as a Plugin

Team 배포가 목적이라면 channel을 plugin으로 감싸는 것이 가장 쉽습니다:

- plugin이 MCP server config를 소유
- plugin이 hooks, skills, channel-related setup을 함께 번들
- 팀원은 수동 MCP 설정 대신 하나의 package만 설치

### Recommended Project Structure

```plaintext
my-channel-plugin/
├── .claude-plugin/
│   └── plugin.json
├── .mcp.json
├── servers/
│   └── webhook-channel.ts
└── README.md
```

### Common Mistakes

- channel을 일반 MCP tool처럼 생각하는 것
- `claude/channel` declaration을 빼먹는 것
- reply tool은 만들고 Claude instructions는 주지 않는 것
- sender verification 없이 inbound text를 그대로 forward하는 것
- 인증 없이 permission relay를 켜는 것

### Try It Now

#### 1. Sketch a one-way local channel

다음을 하는 작은 local MCP server를 만듭니다:

- `claude/channel` 선언
- localhost listen
- POST body를 Claude로 forward

Expected result:

- 외부 이벤트가 현재 세션 context로 들어옵니다

#### 2. Add a reply tool

`chat_id`와 `text`를 받는 `reply` tool을 추가합니다.

Expected result:

- Claude가 단순히 반응만 하는 것이 아니라 channel을 통해 다시 응답할 수 있습니다

### Related Guides

- [고급 기능 README](09-advanced-features.md)
- [MCP 가이드](05-mcp.md)
- [Plugin 가이드](07-plugins.md)
- [Hook 가이드](06-hooks.md)

### Official Reference

- https://code.claude.com/docs/ko/channels-reference

---

<a id="09-advanced-features-03-웹에서-claude-code-사용하기"></a>

## 09-03. 웹에서 Claude Code 사용하기

웹의 Claude Code는 `claude.ai/code`에서 돌아가는 클라우드 실행 표면입니다. 단순한 브라우저 래퍼가 아니라, 각 코딩 세션을 Anthropic 관리형 VM과 전용 브랜치, 전용 환경 위에서 실행합니다.

### 무엇이 다른가

로컬 터미널이나 Desktop 세션과 비교했을 때 핵심 차이는 네 가지입니다.

- 코드가 Anthropic 관리형 클라우드 VM에서 실행된다
- 작업마다 독립 세션과 독립 브랜치를 가진다
- GitHub 접근이 사실상 필수다
- 내 로컬 머신 설정 대신 cloud environment가 기준이 된다

그래서 노트북을 닫아도 계속 돌아가야 하는 장시간 브랜치 작업에 특히 잘 맞습니다.

### GitHub 접근 방식

공식 문서는 두 가지 경로를 설명합니다.

| 방법 | 동작 방식 | 적합한 대상 |
|---|---|---|
| GitHub App | 선택한 저장소에 Claude GitHub App 설치 | 저장소 단위 권한을 명확히 관리하려는 팀 |
| `/web-setup` | 로컬 `gh` CLI 토큰을 Claude 계정과 동기화 | 이미 `gh`를 쓰는 개인 개발자 |

중요한 제약:

- Auto-fix pull requests는 일반 cloud session과 달리 GitHub App이 반드시 필요합니다.

Team/Enterprise 관리자는 admin settings에서 quick web setup을 막을 수도 있습니다.

### 클라우드 환경에 기본 포함된 것

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

### 환경 캐싱

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

### 웹과 터미널 사이 이동

공식 문서는 handoff 모델을 꽤 분명하게 설명합니다.

#### 터미널에서 웹으로

```bash
claude --remote "Fix the authentication bug in src/auth/login.ts"
```

현재 저장소와 브랜치를 기준으로 새 cloud session을 만듭니다. VM은 로컬 디스크가 아니라 GitHub에서 clone하므로, 필요한 로컬 커밋은 미리 push해야 합니다.

#### 웹에서 터미널로

```bash
claude --teleport
```

cloud session을 로컬 터미널로 가져와 로컬 파일과 도구로 계속할 수 있습니다.

중요한 제한:

- CLI에서는 handoff가 한 방향입니다. cloud session을 아래로 끌어올 수는 있지만, 이미 실행 중인 로컬 터미널 세션을 웹으로 밀어 올릴 수는 없습니다. 그 기능은 Desktop 앱이 담당합니다.

### 변경 검토

각 웹 세션은 `+42 -18` 같은 diff indicator를 보여줍니다. 여기서:

- 파일별 변경 확인
- 특정 줄에 인라인 코멘트 남기기
- 그 코멘트를 다음 메시지와 함께 Claude에 보내기

이 흐름이 웹 표면이 branch-based review에 강한 이유 중 하나입니다.

### PR Auto-fix

웹 표면은 PR auto-fix의 중심이기도 합니다.

Claude는 다음을 할 수 있습니다.

- CI 실패 감시
- 리뷰 코멘트 감시
- 원인 조사 후 수정 푸시
- 리뷰 스레드에 Claude 라벨과 함께 응답

공식 문서가 주는 운영상 경고:

- PR 코멘트가 인프라 배포나 특권 작업을 트리거하는 저장소라면, Claude 응답도 그 자동화를 발동시킬 수 있습니다. auto-fix를 켜기 전에 저장소 자동화를 먼저 점검해야 합니다.

### 보안과 격리

공식 페이지가 강조하는 층은 다음과 같습니다.

- 격리된 Anthropic 관리형 VM
- 환경별 네트워크 접근 제어
- 샌드박스 밖의 안전한 credential proxy
- 격리된 세션 안에서만 이루어지는 분석과 수정

미묘하지만 중요한 점:

- 환경 차원에서 네트워크 접근을 꺼도 Anthropic API와의 통신은 제품 동작상 계속 필요하므로, 데이터가 전혀 외부로 나가지 않는다는 뜻은 아닙니다.

### 언제 웹을 선택할까

잘 맞는 경우:

- 장시간 브랜치 작업
- 여러 기기에서 상태 확인
- GitHub 중심 리뷰 루프
- 로컬 머신 가용성에 덜 의존하고 싶을 때

덜 맞는 경우:

- 로컬 전용 파일이나 도구가 필요한 작업
- GitHub에서 접근할 수 없는 저장소
- 로컬 자격 증명이나 서비스가 진짜 source of truth인 작업

### 관련 가이드

- [Web Quickstart](09-advanced-features.md#09-advanced-features-31-claude-code-웹-시작하기)
- [Desktop Quickstart](09-advanced-features.md#09-advanced-features-10-desktop-quickstart)
- [Remote Control and Platforms](09-advanced-features.md#09-advanced-features-24-플랫폼-통합)

### 공식 출처

- [Use Claude Code on the web](https://code.claude.com/docs/ko/claude-code-on-the-web)

---

<a id="09-advanced-features-04-claude-디렉터리-살펴보기"></a>

## 09-04. `.claude` 디렉터리 살펴보기

Claude Code는 프로젝트와 `~/.claude`에서 지시문, 설정, skills, subagents, 메모리를 읽습니다. 이 페이지는 어떤 커스터마이징을 어디에 두어야 하는지 빠르게 찾기 위한 실전 지도입니다.

### 두 가지 범위

- 프로젝트 범위: 저장소 안에 두고 팀과 공유할 수 있는 파일
- 전역 범위: `~/.claude` 아래 두고 모든 프로젝트에 적용하는 개인 설정

Windows에서는 `~/.claude`가 `%USERPROFILE%\\.claude` 아래로 해석됩니다. `CLAUDE_CONFIG_DIR`를 쓰면 그 경로가 기준이 됩니다.

### 먼저 필요한 최소 파일

대부분의 팀은 우선 이 네 가지면 충분합니다.

- `CLAUDE.md`
- `settings.json`
- `settings.local.json`
- `.mcp.json`

나머지는 필요가 생길 때 추가하면 됩니다.

### 어떤 파일을 써야 하나

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 프로젝트 규칙과 상시 지침 | `CLAUDE.md` |
| 권한, hooks, env, 모델 기본값 | `settings.json` |
| 개인용 프로젝트 오버라이드 | `settings.local.json` |
| 팀 공유 MCP 서버 | `.mcp.json` |
| 재사용 프롬프트와 워크플로 | `skills/<name>/SKILL.md` |
| 커스텀 슬래시 명령 스타일 프롬프트 | `commands/*.md` |
| 출력 형식 스타일 | `output-styles/*.md` |
| 전문화된 subagent 정의 | `agents/*.md` |
| subagent의 지속 메모리 | `agent-memory/<name>/` |
| worktree 파일 복사 규칙 | `.worktreeinclude` |

### 중요한 파일 역할

#### `CLAUDE.md`

대부분 프로젝트에서 가장 가치가 큰 파일입니다. 여기에 두면 좋은 것:

- 코딩 컨벤션
- 선호 도구
- 검증 규칙
- 아키텍처 맥락
- 압축 후에도 남겨야 하는 compact instructions

#### `settings.json`

다음 설정에 사용합니다.

- 권한 규칙
- hooks
- 환경 변수
- 모델 기본값

단, 현재 세션에서는 CLI 플래그가 `settings.json`을 덮을 수 있습니다.

#### `settings.local.json`

개인용 오버라이드를 위해 씁니다. Git에 올리지 않는 프로젝트 전용 설정입니다.

#### `.mcp.json`

프로젝트 MCP 설정은 `.claude/` 아래가 아니라 저장소 루트에 둡니다.

### 탐색기에 나오지 않는 것

관련 파일 중 일부는 다른 위치에 있습니다.

- 조직이 강제하는 managed settings
- 프로젝트 루트의 `CLAUDE.local.md`
- `~/.claude/plugins` 아래 설치된 플러그인 데이터

또한 `~/.claude`에는 세션 기록, 파일 스냅샷, 캐시, 로그, 프롬프트 기록 같은 운영 데이터도 저장됩니다.

### 우선순위와 오버라이드

작성한 설정을 덮어쓸 수 있는 것들:

- 조직의 managed settings
- `--permission-mode`, `--settings` 같은 CLI 플래그
- 일부 환경 변수
- `settings.json`을 덮는 `settings.local.json`

설정이 먹지 않을 때는 우선순위를 먼저 확인하는 편이 맞습니다.

### 자주 나오는 문제

공식 문서가 반복적으로 지적하는 실수는 다음과 같습니다.

- hooks를 `settings.json` 안이 아니라 별도 hooks 파일에 두는 것
- 프로젝트 MCP 설정을 루트 `.mcp.json`이 아니라 `.claude/` 아래에 두는 것
- hook matcher에 소문자 도구 이름을 쓰는 것
- `settings.json`의 env가 MCP 자식 프로세스에도 자동 전달된다고 생각하는 것
- 하위 디렉터리 `CLAUDE.md`가 세션 시작 시 바로 로드된다고 생각하는 것

### 현재 세션에서 실제로 로드된 것 확인

다음 명령이 유용합니다.

- `/context`
- `/memory`
- `/agents`
- `/hooks`
- `/mcp`
- `/skills`
- `/permissions`
- `/doctor`

먼저 `/context`로 큰 그림을 본 뒤 세부 명령으로 내려가는 방식이 좋습니다.

### 애플리케이션 데이터와 개인정보

`~/.claude`에는 다음 같은 평문 데이터가 저장될 수 있습니다.

- 세션 transcript
- 큰 tool 결과
- 체크포인트용 파일 히스토리
- 디버그 로그
- 프롬프트 이력
- 토큰/비용 캐시

즉, 도구가 비밀 정보를 읽으면 그 내용이 디스크 transcript에 남을 수 있습니다. 공식 문서는 보관 기간 단축, 민감 경로 읽기 차단, 필요 시 persistence 비활성화를 권장합니다.

### 관련 가이드

- [How Claude Code Works](09-advanced-features.md#09-advanced-features-19-claude-code는-어떻게-동작하는가)
- [Settings System Guide](09-advanced-features.md#09-advanced-features-27-settings-system-guide)
- [Output Styles](09-advanced-features.md#09-advanced-features-20-output-styles)
- [MCP](05-mcp.md)

### 공식 출처

- [Explore the .claude directory](https://code.claude.com/docs/ko/claude-directory)

---

<a id="09-advanced-features-05-code-review"></a>

## 09-05. Code Review

Claude Code Code Review는 Anthropic 호스팅 인프라에서 GitHub 풀 리퀘스트를 분석하고, 문제를 찾으면 해당 변경 라인에 인라인 코멘트를 남기는 관리형 PR 리뷰 기능입니다. 로컬 CLI 명령이 아니라 조직 단위로 켜는 호스팅 리뷰 워크플로우라는 점이 핵심입니다.

### 개요

공식 문서 기준으로 Code Review는 Team 및 Enterprise 플랜에서 제공되는 research preview입니다. 조직에 Zero Data Retention이 활성화되어 있으면 사용할 수 없습니다.

주요 동작:

- PR diff와 저장소 주변 문맥을 함께 분석
- 문제가 발견된 라인에 인라인 코멘트 작성
- `Claude Code Review` 체크 런을 생성
- 자동 또는 수동 트리거 지원
- `CLAUDE.md`와 `REVIEW.md`로 리뷰 기준 조정 가능

이 기능은 PR을 직접 approve 하거나 block 하지 않습니다. 리뷰 결과는 참고용이며, 최종 병합 정책은 기존 브랜치 보호 규칙과 리뷰 프로세스가 담당합니다.

### 리뷰가 동작하는 방식

리뷰가 시작되면 Claude는 여러 에이전트를 사용해 PR diff와 관련 코드 문맥을 병렬로 분석합니다. 이후 검증 단계가 후보 이슈를 한 번 더 걸러서, 실제로 의미 있는 결과만 GitHub에 게시하도록 설계되어 있습니다.

공식 severity 범주는 다음과 같습니다.

- `Important`: 병합 전에 고쳐야 할 가능성이 높은 버그
- `Nit`: 고치면 좋지만 보통 블로커는 아닌 이슈
- `Pre-existing`: 이번 PR이 아니라 기존 코드에 있던 문제

문제가 없으면 인라인 코멘트 대신 짧은 확인 메시지가 남습니다.

### 설정 흐름

설정은 저장소마다 개발자가 하는 작업이 아니라, 관리자가 조직 단위로 한 번 수행합니다.

1. `claude.ai/admin-settings/claude-code`를 엽니다.
2. Code Review 섹션에서 설정을 시작합니다.
3. Claude GitHub App을 설치합니다.
4. 리뷰할 저장소에 앱 접근 권한을 부여합니다.
5. 저장소별 리뷰 트리거 방식을 선택합니다.

공식 문서 기준으로 GitHub App은 contents, issues, pull requests 등에 읽기/쓰기 권한을 요청합니다. 이는 인라인 리뷰, 체크 런 작성, 관련 자동화까지 커버하기 위한 범위입니다.

### 트리거 방식

저장소별로 세 가지 방식 중 하나를 선택할 수 있습니다.

- `Once after PR creation`: PR이 열리거나 ready 상태가 될 때 한 번 실행
- `After every push`: PR 브랜치에 push가 있을 때마다 재실행
- `Manual`: 사람이 명시적으로 요청할 때만 실행

수동 트리거 명령:

- `@claude review`: 지금 리뷰를 실행하고 이후 push에도 계속 리뷰
- `@claude review once`: 현재 상태만 한 번 리뷰

이 명령은 인라인 답글이 아니라 PR의 top-level comment로 남기는 편이 안전합니다.

### 리뷰 기준 커스터마이징

Claude는 두 개의 파일을 참고해 리뷰 기준을 조정합니다.

- `CLAUDE.md`: Claude Code 전반에 적용되는 공통 프로젝트 지침
- `REVIEW.md`: 리뷰 파이프라인에 더 강한 우선순위로 주입되는 리뷰 전용 지침

실무적으로는 이렇게 나누는 것이 좋습니다.

- 일반 개발 세션에도 적용되어야 하는 규칙은 `CLAUDE.md`
- 리뷰에서만 강조할 severity 규칙, 예외, 리포팅 방식은 `REVIEW.md`

노이즈가 많은 저장소일수록 `REVIEW.md`를 짧고 구체적으로 두는 편이 효과적입니다.

### 체크 런과 자동화

모든 리뷰는 `Claude Code Review` 체크 런을 남깁니다. GitHub가 특정 라인에 인라인 코멘트를 못 붙이더라도, 체크 런 요약과 annotation은 남아 있을 수 있습니다.

운영상 중요한 점:

- 체크 런 결과는 neutral이라 기본적으로 병합을 막지 않습니다
- 병합 게이트로 쓰고 싶다면, 별도 워크플로우에서 체크 출력 내용을 읽어 정책화해야 합니다

즉, 이 기능은 기존 브랜치 보호를 대체하기보다 보강하는 방향에 가깝습니다.

### 비용과 적합한 사용처

비용은 PR 크기와 복잡도에 따라 커집니다. 트리거 방식도 총비용에 직접 영향을 줍니다.

- PR당 한 번 리뷰가 가장 저렴
- push마다 리뷰는 가장 빠른 피드백 루프
- Manual은 비용 통제에 유리

다음 조건이면 Code Review가 잘 맞습니다.

- GitHub.com 저장소를 쓰고 있고
- Anthropic이 호스팅하는 관리형 리뷰를 원하며
- 별도 CI 러너에 Claude를 직접 올리고 싶지는 않을 때

반대로 자신의 CI 인프라에서 Claude를 실행하고 싶다면 GitHub Actions 또는 GitLab CI/CD가 더 맞습니다.

### 문제 해결

#### 리뷰가 시작되지 않음

다음을 확인합니다.

- 저장소가 Claude Code admin settings에 포함되어 있는지
- Claude GitHub App이 해당 저장소에 설치되어 있는지
- PR이 열려 있는지
- 저장소의 트리거 방식이 기대한 것과 일치하는지

Manual 모드라면 `@claude review` 또는 `@claude review once`를 top-level comment로 남깁니다.

#### 리뷰가 실패하거나 시간 초과됨

실패한 리뷰는 병합을 막지 않지만 자동 재시도도 기본 동작은 아닙니다. 보통은 `@claude review once`로 다시 요청하거나, push-triggered 저장소라면 새 커밋을 올려 재실행합니다.

#### 인라인 코멘트가 보이지 않음

`Claude Code Review` 체크 런의 상세 페이지를 먼저 확인합니다. diff 라인이 이동했거나 오래된 경우 GitHub가 인라인 코멘트를 거부해도, 체크 런 요약과 annotation은 남아 있을 수 있습니다.

#### 리뷰 결과가 너무 시끄러움

`CLAUDE.md`를 정리하고, `REVIEW.md`에서 무엇을 `Important`로 볼지 더 명확히 정의합니다.

### 관련 링크

- [공식 Code Review 문서](https://code.claude.com/docs/ko/code-review)
- [공식 GitHub Actions 문서](https://code.claude.com/docs/ko/github-actions)
- [공식 GitHub Enterprise Server 문서](https://code.claude.com/docs/ko/github-enterprise-server)
- [공식 GitLab CI/CD 문서](https://code.claude.com/docs/ko/gitlab-ci-cd)
- [Zero Data Retention](11-deployment-admin.md#11-deployment-admin-11-zero-data-retention)
- [지침과 메모 관리](02-memory.md)

---

<a id="09-advanced-features-06-공통-워크플로"></a>

## 09-06. 공통 워크플로

이 문서는 공식 workflow 가이드를 빠르게 재사용할 수 있는 패턴 중심으로 압축한 버전입니다.

### 새 코드베이스 이해하기

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

### 관련 코드 찾기

파일 이름만이 아니라 도메인 언어와 실행 흐름을 같이 묻는 편이 좋습니다.

```plaintext
find the files that handle user authentication
how do these authentication files work together?
trace the login process from front-end to database
```

코드 인텔리전스 플러그인이 있으면 정확도가 더 좋아집니다.

### 버그 효율적으로 고치기

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

### 리팩터링 안전하게 하기

리팩터링은 범위와 호환성 기준이 분명할수록 잘 됩니다.

```plaintext
find deprecated API usage in our codebase
suggest how to refactor utils.js to use modern JavaScript features
refactor utils.js to use ES2024 features while maintaining the same behavior
run tests for the refactored code
```

한 번에 크게 바꾸기보다 작고 검증 가능한 단위로 나누는 편이 안전합니다.

### 전문화된 subagent 쓰기

옆 작업이 메인 대화 문맥을 너무 많이 먹는다면 subagent가 적합합니다.

대표적인 용도:

- 보안 리뷰
- 테스트 트리아지
- 깊은 코드베이스 탐색
- 범위가 제한된 구현 작업

먼저 `/agents`로 확인하고, 필요하면 Claude에게 위임시키거나 직접 특정 역할을 요청합니다.

### 분석에는 Plan Mode 쓰기

위험한 변경은 다음 순서가 좋습니다.

1. 읽고 분석한다
2. 계획을 만든다
3. 계획을 검토한다
4. 구현한다

곧바로 편집부터 시작하는 것보다 이 흐름이 더 안정적인 경우가 많습니다.

### 테스트와 함께 일하기

Claude는 검증 경로가 명확할수록 더 잘 작동합니다.

다음 식으로 요청할 수 있습니다.

- 어떤 테스트가 실패하는지 찾기
- 실패 이유 설명하기
- 가장 작은 유효한 수정 적용하기
- 관련 테스트부터 다시 돌리기
- 그다음 더 넓은 검증 돌리기

### Pull Request 준비하기

PR 관련 작업 예:

- diff 요약
- 커밋 메시지 작성
- PR 설명 초안
- 위험한 파일과 회귀 가능성 찾기
- 리뷰 체크리스트 제안

의도한 변경과 승인 기준, 릴리스 노트나 마이그레이션 제약을 같이 주면 훨씬 좋아집니다.

### 문서와 노트 다루기

Claude Code는 코드 외 작업에도 잘 맞습니다.

- 문서 재작성
- changelog 초안
- runbook 정리
- 노트 요약
- 저장소 전반 용어 통일

### 비대화형 모드 활용하기

공식 문서는 다음 같은 CLI 흐름도 강조합니다.

- pipe in, pipe out
- 구조화된 출력
- 예약 실행
- 검증 파이프라인에 Claude 추가하기

이런 작업은 대화형 세션보다 automation/CI 경로에 더 잘 맞습니다.

### 세션과 worktree 패턴

긴 작업에서는 다음 패턴이 유용합니다.

- 연속성이 중요하면 세션 재개
- 찾기 쉽게 세션 이름 붙이기
- 다른 접근을 시험하려면 세션 포크
- 별도 파일 트리가 필요하면 Git worktree로 병렬 세션 실행

### 관련 가이드

- [Best Practices](09-advanced-features.md#09-advanced-features-01-모범-사례)
- [Planning Mode Examples](09-advanced-features.md#09-advanced-features-23-plan-mode-예제)
- [Session and Interaction](09-advanced-features.md#09-advanced-features-26-세션-인터랙션)
- [Execution Modes](09-advanced-features.md#09-advanced-features-13-실행-모드)

### 공식 출처

- [Common workflows](https://code.claude.com/docs/ko/common-workflows)

---

<a id="09-advanced-features-07-computer-use"></a>

## 09-07. Computer Use

Claude Code의 computer use는 CLI에서 Claude가 macOS 실제 화면을 열고, 클릭하고, 입력하고, 읽을 수 있게 해 줍니다. 터미널이나 API로 끝내기 어려운 GUI 작업을 처리할 때 쓰는 가장 넓은 범위의 fallback입니다.

### 개요

다음처럼 터미널 밖의 작업에 적합합니다.

- 네이티브 앱 빌드와 검증
- 시각적/레이아웃 문제 디버깅
- 시뮬레이터 흐름 테스트
- CLI나 MCP가 없는 GUI 전용 도구 제어

공식 문서 기준으로 computer use는 macOS의 research preview이며, Pro 또는 Max 플랜, Claude Code v2.1.85 이상, 대화형 세션, 그리고 `claude.ai` 인증이 필요합니다.

### 사전 조건

| 항목 | 요구사항 |
|---|---|
| 플랫폼 | CLI에서는 macOS만 지원 |
| 플랜 | Pro 또는 Max |
| Claude Code 버전 | v2.1.85 이상 |
| 세션 | 대화형 세션만 가능, `-p` 불가 |
| 인증 | `claude.ai`로 로그인 |

CLI에서 사용할 수 없는 환경:

- Linux / Windows
- Team / Enterprise 플랜
- Bedrock, Vertex AI, Foundry 같은 서드파티 제공자

### 설정 및 사용 흐름

1. 대화형 Claude Code 세션에서 `/mcp`를 실행합니다.
2. MCP 서버 목록에서 `computer-use`를 찾아 활성화합니다.
3. 화면 녹화와 손쉬운 사용(Accessibility) 권한을 허용합니다.
4. Claude가 세션별 앱 승인 프롬프트를 띄우면 필요한 앱만 허용합니다.
5. GUI 작업을 Claude에게 요청합니다.

활성화는 프로젝트별로 유지되므로, 같은 저장소에서는 보통 한 번만 설정하면 됩니다.

실무 예시:

- `앱을 빌드하고 실행한 뒤 환경설정 창을 열어 결과를 스크린샷해줘.`
- `작은 창에서 하단이 잘리도록 만들어 보고, 레이아웃을 고친 뒤 다시 확인해줘.`
- `iOS Simulator를 열고 온보딩을 끝까지 눌러 보면서 어디서 막히는지 알려줘.`

### 제한 사항

- 한 번에 한 Claude Code 세션만 컴퓨터를 제어할 수 있습니다.
- CLI에서는 macOS만 지원합니다.
- 비대화형 모드(`-p`)에서는 사용할 수 없습니다.
- Claude가 작업하는 동안 앱이 숨겨집니다.
- 스크린샷은 자동으로 축소됩니다.
- CLI에는 Desktop 앱의 denied-apps 목록이 아직 없습니다.

### 보안 참고

computer use는 Bash 샌드박스가 아니라 실제 데스크톱에서 동작합니다. 신뢰 경계가 다릅니다.

- 현재 세션에서 승인한 앱만 제어할 수 있습니다.
- 셸, 파일 시스템, 시스템 설정 접근이 있는 앱은 더 강한 경고가 뜹니다.
- 터미널 창은 스크린샷에서 제외되므로, 터미널에 보이는 내용이 다시 모델로 들어가지 않습니다.
- `Esc`는 어디서든 computer use를 즉시 중단합니다.
- 잠금 파일로 인해 동시에 두 세션이 같은 머신을 제어하지 못합니다.

신뢰할 수 없는 화면이나 앱에서는 prompt injection 위험이 남아 있으므로 주의해야 합니다.

### 문제 해결

#### `computer-use`가 다른 Claude 세션에서 사용 중이라고 나옴

다른 Claude Code 세션이 머신 잠금을 잡고 있습니다. 해당 세션을 끝내거나 종료하세요. 다른 세션이 비정상 종료된 경우에는 Claude가 프로세스 종료를 감지한 뒤 잠금을 해제합니다.

#### macOS 권한 프롬프트가 계속 다시 나옴

Claude Code를 완전히 종료한 뒤 새 세션을 시작합니다. 그다음 System Settings > Privacy & Security에서 터미널 앱의 Screen Recording 권한이 켜져 있는지 확인합니다.

#### `/mcp`에 `computer-use`가 보이지 않음

다음을 확인합니다.

- macOS인지
- Claude Code v2.1.85 이상인지
- Pro 또는 Max 플랜인지
- `claude.ai`로 인증했는지
- `-p`가 아닌 대화형 세션인지

### 관련 링크

- [공식 computer use 문서](https://code.claude.com/docs/ko/computer-use)
- [한국어 computer use 문서](https://code.claude.com/docs/ko/computer-use)
- [Computer use safety guide](https://support.claude.com)
- [Computer use in Desktop](https://code.claude.com/docs/ko/desktop)
- [Claude in Chrome](https://code.claude.com/docs/ko/chrome)
- [MCP 개요](05-mcp.md)
- [권한 및 보안](09-advanced-features.md#09-advanced-features-21-권한-보안)

---

<a id="09-advanced-features-08-configuration"></a>

## 09-08. Configuration

이 문서는 Claude Code 설정 시스템 전체를 다룹니다. 설정이 어디에 있고, 어떤 소스가 우선하며, 충돌을 어떻게 해석해야 하는지에 초점을 둡니다.

### 설정 우선순위

공식 configuration 문서는 다음 순서를 정의합니다.

1. managed settings
2. command-line arguments
3. 로컬 프로젝트 설정: `.claude/settings.local.json`
4. 공유 프로젝트 설정: `.claude/settings.json`
5. 사용자 설정: `~/.claude/settings.json`

즉, 조직 정책이 가장 강하고, 현재 세션의 CLI 플래그도 로컬 파일보다 강합니다.

### 왜 중요한가

"Claude가 내 설정을 무시했다"는 문제의 상당수는 실제로 우선순위 문제입니다.

대표적인 예:

- 사용자 설정은 허용하지만 프로젝트 설정이 차단함
- 현재 세션 플래그가 파일 설정을 덮어씀
- managed settings가 로컬 커스터마이징을 막고 있음

### 배열 병합

공식 문서가 특별히 강조하는 규칙:

- 배열형 설정은 스코프를 넘어 병합되고 deduplicate되며, 단순 교체되지 않습니다

영향을 받는 대표 항목:

- sandbox write path
- permission allow rule
- 일부 hook allowlist

즉, 우선순위가 낮은 스코프도 항목을 추가할 수 있습니다.

### 주요 설정 계열

configuration 페이지는 많은 키를 다루지만, 운영상 특히 중요한 계열은 다음입니다.

- `permissions`
- `hooks`
- `env`
- `sandbox`
- 모델 선택과 로그인 제한
- plugin 및 managed policy 제어

전체 시스템을 이해하려면 먼저 이 계열부터 보는 편이 좋습니다.

### 현재 활성 설정 확인

공식 문서가 가장 먼저 권하는 명령은 `/status`입니다.

여기서 확인할 수 있는 것:

- 어떤 설정 레이어가 활성화되었는지
- 각각 어디에서 왔는지
- 파싱 오류나 검증 오류가 있는지

로컬 설정이 안 먹는 것처럼 보일 때 가장 빠른 진단 경로입니다.

### 좋은 운영 방식

- 팀 기본값은 공유 프로젝트 설정에 두고
- 개인 오버라이드는 `settings.local.json`에 두고
- enforced policy는 managed settings에 두고
- 위험한 설정은 `CLAUDE.md`나 팀 문서에 이유를 남깁니다

### 관련 가이드

- [Settings System Guide](09-advanced-features.md#09-advanced-features-27-settings-system-guide)
- [Environment Variables](10-cli.md#10-cli-02-environment-variables)
- [Permissions and Security](09-advanced-features.md#09-advanced-features-21-권한-보안)

### 공식 출처

- [Claude Code settings](https://code.claude.com/docs/ko/configuration)

---

<a id="09-advanced-features-09-컨텍스트-윈도우-살펴보기"></a>

## 09-09. 컨텍스트 윈도우 살펴보기

Claude Code의 컨텍스트 윈도우는 현재 세션에서 Claude가 알고 있는 모든 것의 묶음입니다. 이 공간이 차오를수록 품질이 떨어지기 때문에, 실제로는 가장 중요한 운영 자원입니다.

### 무엇이 컨텍스트에 들어오나

세션 시점에 따라 다음이 컨텍스트에 포함될 수 있습니다.

- 시스템 프롬프트와 output style
- `CLAUDE.md`
- auto memory
- MCP 도구 이름
- skill 설명과 실제로 호출된 skill 본문
- 대화 기록
- Claude가 읽은 파일 내용
- 명령 출력
- subagent가 부모 세션으로 돌려준 요약

일부는 시작 전에 자동 로드되고, 일부는 파일 읽기나 skill 호출 이후에만 들어옵니다.

### 왜 중요한가

컨텍스트가 차기 시작하면:

- 초반 지시가 더 쉽게 희미해지고
- 불필요한 출력이 중요한 문맥과 경쟁하고
- Claude가 제약을 놓치거나 실수가 늘 수 있습니다

공식 문서도 컨텍스트를 가장 먼저 관리해야 할 자원으로 설명합니다.

### compaction은 무엇을 하나

세션이 너무 커지면 Claude Code는 자동으로 compact를 수행합니다. 먼저 오래된 tool 출력을 비우고, 필요하면 대화를 요약합니다.

직접 실행할 수도 있습니다.

```plaintext
/compact
/compact keep the API migration details and the failing test command
```

요약이 아니라 완전히 새로 시작하고 싶다면 `/clear`를 사용합니다.

### compaction 후 무엇이 남는가

공식 context 문서는 다시 주입되는 것과, 다시 트리거되기 전까지 사라지는 것을 구분합니다.

보통 유지되거나 다시 주입되는 것:

- 시스템 프롬프트와 output style
- 프로젝트 루트 `CLAUDE.md`와 비범위 규칙
- auto memory
- 토큰 한도 안의 invoked skill 본문

다시 트리거되기 전까지 사라지는 것:

- `paths:` frontmatter가 있는 경로 범위 규칙
- 하위 디렉터리의 nested `CLAUDE.md`

hooks는 메시지 히스토리가 아니라 코드 실행이므로 "컨텍스트에 남는다"는 개념이 다릅니다.

### 왜 subagent가 도움이 되나

subagent는 별도의 컨텍스트 윈도우에서 일합니다. 큰 조사 작업은 그 워커 안에 머물고, 부모 세션에는 요약만 돌아옵니다. 그래서 subagent는 컨텍스트 팽창을 막는 가장 강한 도구 중 하나입니다.

### 실전에서 컨텍스트를 줄이는 방법

- 작업 범위를 좁게 유지하기
- 서로 무관한 작업 사이에는 `/clear` 사용하기
- 긴 세션이 흔들리기 시작하면 `/compact` 하기
- 오래 남아야 하는 규칙은 `CLAUDE.md`로 옮기기
- 큰 skill은 중요한 지시를 파일 상단에 두기
- 큰 조사 작업은 subagent로 분리하기
- Claude가 직접 읽을 수 있는 파일은 긴 로그를 직접 붙여넣지 않기

### 실제 사용량 확인하기

가장 유용한 진단 명령은 다음입니다.

- `/context`: 범주별 사용량과 최적화 힌트
- `/memory`: 시작 시 어떤 memory 파일이 로드되었는지 확인

Claude가 명백한 제약을 자꾸 놓친다면, 모델 탓부터 하기 전에 `/context`를 먼저 확인하는 편이 낫습니다.

### 관련 가이드

- [How Claude Code Works](09-advanced-features.md#09-advanced-features-19-claude-code는-어떻게-동작하는가)
- [Best Practices](09-advanced-features.md#09-advanced-features-01-모범-사례)
- [Common Workflows](09-advanced-features.md#09-advanced-features-06-공통-워크플로)
- [Subagents](04-subagents.md)

### 공식 출처

- [Explore the context window](https://code.claude.com/docs/ko/context-window)

---

<a id="09-advanced-features-10-desktop-quickstart"></a>

## 09-10. Desktop Quickstart

이 문서는 Claude Code Desktop을 가장 빨리 실무에 올리는 짧은 시작 가이드입니다.

### Desktop은 언제 쓰는가

Desktop은 로컬 그래픽 작업 공간입니다. 다음이 필요하면 잘 맞습니다.

- 로컬 파일 접근
- 시각적 diff 검토
- live preview
- 하나의 UI 안에서 여러 세션 관리
- 로컬 scheduled task

웹은 cloud-first 브랜치 작업에 더 적합하고, 터미널은 가장 세밀한 제어가 필요할 때 더 적합합니다.

### 설치

`claude.ai`에서 Desktop 앱을 내려받습니다.

- macOS
- Windows

설치 후 Claude Code에 쓰는 것과 같은 Anthropic 계정으로 로그인합니다.

### 첫 코딩 세션 시작

1. 로컬 프로젝트 폴더 열기
2. `Code` 탭으로 이동
3. 권한 모드 선택
4. 구체적인 프롬프트 입력

처음 권장 모드:

- `Ask permissions`

속도를 높일 때:

- `Auto accept edits`
- `Plan`

### 컨텍스트 추가

Desktop은 다음을 지원합니다.

- 로컬 파일 `@mention`
- 이미지나 PDF 같은 파일 첨부

이 점이 로컬 파일 mention이 없는 cloud session과의 큰 차이입니다.

### 변경 검토

다음 상황에서는 Desktop의 visual diff가 특히 좋습니다.

- 여러 파일에 걸친 변경
- 인라인 코멘트가 필요한 리뷰
- raw patch보다 눈으로 보는 편이 빠른 UI 변경

### Live Preview 사용

앱이나 프론트엔드 작업에서는 로컬 dev server를 연결해 Desktop 안에서 실행 결과를 바로 확인할 수 있습니다.

전형적인 흐름:

1. dev server 설정 또는 실행
2. Claude가 코드 수정
3. preview에서 시각 검증
4. 반복

### PR과 CI 추적

Desktop은 구현, 리뷰, CI 수정 흐름을 앱 안에 붙여 둘 수 있습니다. 브라우저와 터미널을 계속 오가지 않아도 되는 것이 장점입니다.

### Schedule 탭 사용

Desktop은 다음 두 가지를 함께 노출합니다.

- 내 머신에서 도는 local scheduled task
- 클라우드에서 도는 remote routine

구분이 중요합니다.

- local task는 로컬 저장소와 로컬 도구를 사용
- remote routine은 cloud session과 fresh clone을 사용

### 언제 표면을 바꿔야 하나

- 로컬 시각 작업은 Desktop
- 가장 직접적인 제어는 터미널
- 오래 걸리는 클라우드 작업은 웹

### 관련 가이드

- [Desktop](09-advanced-features.md#09-advanced-features-12-claude-code-desktop-사용하기)
- [Desktop Scheduled Tasks](09-advanced-features.md#09-advanced-features-11-desktop-scheduled-tasks)
- [Claude Code On The Web](09-advanced-features.md#09-advanced-features-03-웹에서-claude-code-사용하기)

### 공식 출처

- [Get started with the desktop app](https://code.claude.com/docs/ko/desktop-quickstart)

---

<a id="09-advanced-features-11-desktop-scheduled-tasks"></a>

## 09-11. Desktop Scheduled Tasks

Desktop scheduled task는 Claude Code Desktop이 정해진 시각마다 새 세션을 자동으로 열어 주는 로컬 반복 실행 기능입니다. 로컬 파일, 로컬 도구, 로컬 인증 정보에 접근해야 하는 반복 작업에 적합합니다.

### 무엇에 쓰는가

공식 문서는 Desktop scheduled task의 대표 사례로 다음을 제시합니다.

- 매일 아침 코드 리뷰
- 의존성 점검
- 캘린더나 메일을 끌어오는 아침 브리핑

각 실행은 지정된 시각에 새로운 세션으로 시작됩니다.

### 세 가지 스케줄링 방식 비교

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

### Desktop 안의 local task와 remote task

Schedule 화면은 두 종류를 함께 보여줄 수 있습니다.

- `Local tasks`: 내 머신에서 실행
- `Remote tasks`: Anthropic 관리형 클라우드에서 실행되는 routine

한 화면에 보인다고 해서 같은 실행 모델이 아닙니다. local task는 routine이 아닙니다.

### Scheduled task 만들기

공식 문서는 대화형 생성도 지원하지만, 기본 흐름은 다음과 같습니다.

1. `Schedule` 페이지 열기
2. `New task` 클릭
3. 로컬 작업이면 `New local task` 선택
4. prompt, 폴더, schedule, permission mode 설정
5. 저장 후 `Run now`로 한 번 즉시 실행

마지막 단계가 중요합니다. 첫 무인 실행 때 막히지 않도록 권한과 실행 조건을 미리 확인해야 합니다.

### 주기 옵션

공식 문서가 제공하는 기본 주기:

- `Manual`
- `Hourly`
- `Daily`
- `Weekdays`
- `Weekly`

이 드롭다운으로 표현되지 않는 주기는 Desktop 세션에서 Claude에게 자연어로 바꾸라고 요청할 수 있습니다. 공식 예시는 6시간마다 테스트를 돌리는 식입니다.

### 실제 실행 방식

공식 문서 기준 핵심 실행 규칙:

- Desktop은 앱이 열려 있는 동안 매분 스케줄을 확인
- 실행 시마다 새 세션 생성
- 수동 세션과 scheduled run은 분리
- 로컬 task는 머신이 깨어 있어야 실행

즉, 이것은 로컬 자동화이지, 항상 보장되는 원격 인프라가 아닙니다.

### 놓친 실행

머신이 잠들어 있거나 앱이 닫혀 있으면 실행이 건너뛰어질 수 있습니다. task 상세 화면의 history에서 이런 실행 이력을 확인할 수 있습니다.

이 점이 routines와의 가장 큰 차이 중 하나입니다.

### 권한 모델

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

### 관리 기능

공식 문서에 따르면 task 상세 화면에서 다음이 가능합니다.

- 즉시 실행
- 반복 일시중지 및 재개
- prompt, 빈도, 폴더 등 수정
- 실행 이력 검토
- 저장된 권한 검토 및 철회
- 삭제

또한 Desktop 세션 안에서 Claude에게 scheduled task 목록 조회, 일시중지, 삭제를 자연어로 요청할 수도 있습니다.

### 디스크에서 prompt 수정

공식 Desktop 문서는 prompt 파일 경로를 다음처럼 안내합니다.

- `~/.claude/scheduled-tasks/<task-name>/SKILL.md`
- 또는 `CLAUDE_CONFIG_DIR` 아래 대응 경로

파일 형식:

- YAML frontmatter에 `name`, `description`
- 본문에 실제 prompt

동시에 공식 문서는 중요한 제한도 말합니다. schedule, folder, model, enabled 상태는 이 파일에 저장되지 않습니다. 이런 항목은 편집 UI 또는 Claude에게 요청하는 방식으로 바꿔야 합니다.

### 어떤 작업에 적합한가

Desktop scheduled task가 잘 맞는 경우:

- 현재 로컬 체크아웃 기준 테스트나 린트 반복 실행
- 워크스테이션 환경에 의존하는 저장소 유지보수 작업
- 로컬 도구나 자격 증명을 읽는 브리핑
- 커밋되지 않은 로컬 변경까지 포함해 봐야 하는 작업

반대로, 머신이 꺼져 있어도 반드시 돌아야 하는 작업에는 부적합합니다.

### 공식 참고 문서

- Desktop scheduled tasks: `https://code.claude.com/docs/ko/desktop-scheduled-tasks`
- Routines: `https://code.claude.com/docs/ko/web-scheduled-tasks`
- CLI scheduled tasks and `/loop`: `https://code.claude.com/docs/ko/scheduled-tasks`

---

<a id="09-advanced-features-12-claude-code-desktop-사용하기"></a>

## 09-12. Claude Code Desktop 사용하기

Claude Code Desktop은 Claude Code를 그래픽 워크스페이스로 제공하는 공식 실행 표면입니다. 여러 세션을 나란히 두고 작업하고, 시각적으로 diff를 검토하고, 로컬 저장소와 로컬 도구에 직접 접근해야 할 때 가장 유용합니다.

### Desktop이 추가하는 것

공식 quickstart는 Desktop의 핵심 가치를 다음처럼 설명합니다.

- 병렬 세션을 관리하는 사이드바
- 드래그 앤 드롭 레이아웃
- 통합 터미널과 파일 에디터
- 시각적 diff 리뷰
- 라이브 앱 프리뷰
- GitHub PR 모니터링과 auto-merge
- Scheduled tasks

즉, 단순히 CLI를 감싼 UI가 아니라 로컬 작업, 검토, 추적을 한곳에 묶는 작업 공간입니다.

### 세 개의 주요 탭

공식 quickstart는 Desktop을 세 탭으로 설명합니다.

- `Code`: Claude Code 세션 실행과 코드 변경 검토
- `Cowork`: 조사, 계획, 일반 협업용 공간
- `Schedule`: 반복 작업과 루틴 관리

중요한 점은 모든 요청이 곧바로 코드 세션이 되는 것은 아니라는 점입니다. Dispatch가 작업 성격을 판단해서 Code 세션으로 넘기기도 합니다.

### 로컬 코딩 세션 시작

#### 1. 폴더 열기

Claude가 작업할 로컬 프로젝트 폴더를 엽니다.

#### 2. 모드 선택

Desktop 세션은 프롬프트 옆 모드 선택기를 제공합니다. 공식 reference는 세션 도중에도 모드를 바꿀 수 있다고 설명합니다.

대표적인 선택:

- `Ask permissions`: 처음 쓰는 저장소에서 가장 안전
- `Auto accept edits`: 파일 수정과 일반 파일 시스템 조작을 더 빠르게 진행
- `Plan`: 수정 전에 접근 방식을 먼저 검토

세부 모드는 세션 유형에 따라 다르지만, 웹 클라우드 세션보다 Desktop 로컬 세션이 더 넓은 통제 범위를 제공합니다.

#### 3. 컨텍스트를 제대로 넣기

공식 reference가 강조하는 프롬프트 컨텍스트 기능:

- `@mention`으로 로컬 파일을 세션 컨텍스트에 추가
- 이미지, PDF 같은 파일 첨부

단, `@mention`은 remote 세션에서는 지원되지 않습니다. 로컬 Desktop 세션과 원격 루틴을 혼동하면 여기서 차이가 크게 납니다.

### 코드 작업 방식

Desktop은 다음 기능을 의도적으로 쓸 때 장점이 큽니다.

#### 프롬프트 박스

자연어로 지시를 보내고, 작업 중간에 중단해서 방향을 바꿀 수 있습니다. 공식 문서는 후속 입력에 맞춰 Claude가 현재 작업을 조정한다고 설명합니다.

#### Diff 검토

변경을 눈으로 검토해야 하는 작업이라면 Desktop이 강합니다. 수정 내용을 시각적으로 비교하는 흐름이 이미 제품 설계에 포함돼 있습니다.

#### 통합 터미널

빌드, 테스트, 디버깅 출력을 대화 바로 옆에서 확인할 수 있어 문맥 전환이 줄어듭니다.

#### 라이브 프리뷰

프론트엔드나 앱 작업에서는 수정 후 화면 변화를 바로 확인할 수 있다는 점이 실무적으로 큽니다.

### 권한 모드 실전 해석

공식 desktop reference는 권한 모드를 "편집, 명령 실행, 또는 둘 다를 어디까지 자동화할 것인가"의 문제로 설명합니다. 실전에서는 다음처럼 쓰는 편이 낫습니다.

- 저장소를 처음 볼 때는 `Ask permissions`
- 파일 수정 속도가 중요하지만 명령 실행은 보고 싶으면 `Auto accept edits`
- 문제 정의가 애매해서 접근 방식부터 보고 싶으면 `Plan`

반복 작업이 많아지면 승인을 많이 누르는 것보다, 저장소 지침과 프롬프트를 안정화하는 편이 더 효과적입니다.

### Dispatch와 연동

Desktop은 단순한 에디터가 아니라 Claude 앱 전체와 연결된 작업 표면입니다.

- 사용자가 직접 Dispatch에 Code 세션을 열라고 요청할 수 있고
- Dispatch가 개발 작업이라고 판단해서 Code 세션을 자동으로 열 수도 있으며
- 작업 완료나 승인 필요 상태를 푸시 알림으로 받을 수 있습니다

즉, Desktop은 실행기이면서 오케스트레이션 UI이기도 합니다.

### Pull Request와 CI 추적

공식 quickstart는 PR 모니터링과 auto-merge를 명시적으로 소개합니다. 의도된 흐름은 대체로 다음과 같습니다.

1. Claude가 브랜치를 준비
2. PR 생성
3. Desktop에서 CI 상태 추적
4. 필요하면 Claude가 실패를 수정하거나, 통과 후 merge 수행

브라우저와 터미널을 오가며 수동으로 추적하는 것보다 더 짧은 검토 루프를 만들 수 있습니다.

### 반복 작업과 Schedule 탭

Desktop의 `Schedule` 탭은 두 가지를 함께 보여줄 수 있습니다.

- 로컬 scheduled task
- Anthropic 관리형 클라우드에서 도는 remote routine

핵심 차이:

- 로컬 scheduled task는 내 파일과 도구에 접근하지만 앱이 열려 있고 머신이 깨어 있어야 함
- remote routine은 머신이 꺼져 있어도 돌지만 현재 로컬 체크아웃이 아니라 fresh clone 기준으로 실행됨

### 언제 Desktop이 맞는가

다음이 중요하면 Desktop을 고르는 편이 맞습니다.

- 로컬 저장소 직접 접근
- 시각적 diff 검토
- 통합 프리뷰와 터미널
- 한 화면에서 여러 세션 병렬 관리
- GUI 기반 스케줄링

반대로 클라우드 실행과 GitHub 중심 브랜치 분리가 더 중요하면 웹이 맞고, 가장 직접적인 통제와 최소 인터페이스가 중요하면 터미널 CLI가 맞습니다.

### 공식 참고 문서

- Desktop quickstart: `https://code.claude.com/docs/ko/desktop-quickstart`
- Desktop reference: `https://code.claude.com/docs/ko/desktop`
- Desktop scheduled tasks: `https://code.claude.com/docs/ko/desktop-scheduled-tasks`

---

<a id="09-advanced-features-13-실행-모드"></a>

## 09-13. 실행 모드

### Auto Mode

Auto Mode는 백그라운드 안전 분류기를 사용하여 각 작업을 실행 전에 검토하는 Research Preview 권한 모드입니다 (2026년 3월). Claude가 자율적으로 작업하면서 위험한 작업은 차단할 수 있게 합니다.

#### 요구 사항

- **플랜**: Team, Enterprise, 또는 API (Pro 또는 Max 플랜에서는 사용 불가)
- **모델**: Claude Sonnet 4.6, Opus 4.6, 또는 Opus 4.7
- **제공업체**: Anthropic API 전용 (Bedrock, Vertex, Foundry에서는 지원되지 않음)
- **분류기**: Claude Sonnet 4.6에서 실행 (추가 토큰 비용 발생)

#### Auto Mode 활성화

```bash
## Auto mode는 Shift+Tab 권한 순환에 포함되어 있음
## 직접 시작하려면 --permission-mode auto 사용
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

#### 분류기 작동 방식

백그라운드 분류기는 다음 결정 순서로 각 작업을 평가합니다:

1. **허용/거부 규칙** -- 명시적 권한 규칙이 먼저 확인됩니다
2. **읽기 전용/편집 자동 승인** -- 파일 읽기와 편집은 자동으로 통과합니다
3. **분류기** -- 백그라운드 분류기가 작업을 검토합니다
4. **대체** -- 연속 3회 또는 총 20회 차단 후 사용자에게 프롬프트로 전환합니다

#### 기본 차단 작업

Auto mode는 기본적으로 다음을 차단합니다:

| 차단 작업 | 예시 |
|----------------|---------|
| 파이프 투 셸 설치 | `curl \| bash` |
| 민감한 데이터 외부 전송 | API 키, 네트워크를 통한 자격 증명 |
| 프로덕션 배포 | 프로덕션을 대상으로 하는 배포 명령어 |
| 대량 삭제 | 대규모 디렉토리에 대한 `rm -rf` |
| IAM 변경 | 권한 및 역할 수정 |
| 메인 브랜치 강제 푸시 | `git push --force origin main` |

#### 기본 허용 작업

| 허용 작업 | 예시 |
|----------------|---------|
| 로컬 파일 작업 | 프로젝트 파일 읽기, 쓰기, 편집 |
| 선언된 의존성 설치 | 매니페스트 기반 `npm install`, `pip install` |
| 읽기 전용 HTTP | 문서 가져오기를 위한 `curl` |
| 현재 브랜치에 푸시 | `git push origin feature-branch` |

#### Auto Mode 설정

**기본 규칙을 JSON으로 출력**:
```bash
claude auto-mode defaults
```

**신뢰할 수 있는 인프라 구성**은 엔터프라이즈 배포를 위한 `autoMode.environment` 관리형 설정을 통해 수행합니다. 이를 통해 관리자가 신뢰할 수 있는 CI/CD 환경, 배포 대상, 인프라 패턴을 정의할 수 있습니다.

#### 대체 동작

분류기가 확신하지 못할 때, auto mode는 사용자에게 프롬프트를 전환합니다:
- **연속 3회** 분류기 차단 후
- 세션에서 **총 20회** 분류기 차단 후

이를 통해 분류기가 작업을 확신 있게 승인할 수 없을 때 사용자가 항상 제어권을 유지할 수 있습니다.

#### Auto Mode와 동등한 권한 시딩 (Team 플랜 불필요)

Team 플랜이 없거나 백그라운드 분류기 없이 더 간단한 접근 방식을 원하는 경우, `~/.claude/settings.json`에 보수적인 기본 안전 권한 규칙을 시딩할 수 있습니다. 이 스크립트는 읽기 전용 및 로컬 검사 규칙으로 시작한 다음, 원하는 경우에만 편집, 테스트, 로컬 git 쓰기, 패키지 설치, GitHub 쓰기 작업을 선택적으로 활성화할 수 있습니다.

**파일:** `09-advanced-features/setup-auto-mode-permissions.py`

```bash
## 변경 사항 미리보기 (변경 없음)
python3 09-advanced-features/setup-auto-mode-permissions.py --dry-run

## 보수적인 기본 규칙 적용
python3 09-advanced-features/setup-auto-mode-permissions.py

## 필요할 때만 추가 기능 활성화
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

### Background Tasks

Background tasks는 대화를 차단하지 않고 장시간 실행되는 작업을 수행할 수 있게 합니다.

#### Background Tasks란?

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

#### Background Tasks 시작

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

#### Background Tasks 관리

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

#### 예제: 병렬 개발

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

#### 설정

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

### Scheduled Tasks

Scheduled Tasks를 사용하면 반복 일정으로 또는 일회성 리마인더로 프롬프트를 자동 실행할 수 있습니다. 작업은 세션 범위입니다 — Claude Code가 활성화된 동안 실행되며 세션이 종료되면 삭제됩니다. v2.1.72+부터 사용 가능합니다.

#### `/loop` 명령어

```bash
## 명시적 간격
/loop 5m check if the deployment finished

## 자연어
/loop check build status every 30 minutes
```

정밀한 스케줄링을 위해 표준 5필드 cron 표현식도 지원됩니다.

#### 일회성 리마인더

특정 시간에 한 번 실행되는 리마인더를 설정합니다:

```
remind me at 3pm to push the release branch
in 45 minutes, run the integration tests
```

#### Scheduled tasks 관리

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

#### 동작 세부 사항

| 항목 | 세부 내용 |
|--------|--------|
| **반복 지터** | 간격의 최대 10% (최대 15분) |
| **일회성 지터** | :00/:30 경계에서 최대 90초 |
| **놓친 실행** | 보충 없음 — Claude Code가 실행 중이 아니면 건너뜀 |
| **영속성** | 재시작 시 유지되지 않음 |

#### 클라우드 Scheduled Tasks

`/schedule`을 사용하여 Anthropic 인프라에서 실행되는 클라우드 예약 작업을 생성합니다:

```
/schedule daily at 9am run the test suite and report failures
```

클라우드 예약 작업은 재시작 후에도 유지되며 Claude Code가 로컬에서 실행 중일 필요가 없습니다.

#### Scheduled tasks 비활성화

```bash
export CLAUDE_CODE_DISABLE_CRON=1
```

#### 예제: 배포 모니터링

```
/loop 5m check the deployment status of the staging environment.
        If the deploy succeeded, notify me and stop looping.
        If it failed, show the error logs.
```

> **팁**: Scheduled tasks는 세션 범위입니다. 재시작 후에도 유지되는 영구 자동화를 위해서는 CI/CD 파이프라인, GitHub Actions, 또는 데스크톱 앱 예약 작업을 대신 사용하세요.

---

### Headless Mode

Print mode(`claude -p`)는 대화형 입력 없이 Claude Code를 실행할 수 있어, 자동화 및 CI/CD에 적합합니다. 이전 `--headless` 플래그를 대체하는 비대화형 모드입니다.

#### Print Mode란?

Print mode는 다음을 가능하게 합니다:
- 자동화된 스크립트 실행
- CI/CD 통합
- 배치 처리
- 예약 작업

#### Print Mode 실행 (비대화형)

```bash
## 특정 작업 실행
claude -p "Run all tests"

## 파이프된 콘텐츠 처리
cat error.log | claude -p "Analyze these errors"

## CI/CD 통합 (GitHub Actions)
- name: AI Code Review
  run: claude -p "Review PR"
```

#### 추가 Print Mode 사용 예제

```bash
## 출력 캡처와 함께 특정 작업 실행
claude -p "Run all tests and generate coverage report"

## 구조화된 출력
claude -p --output-format json "Analyze code quality"

## stdin으로부터 입력
echo "Analyze code quality" | claude -p "explain this"
```

#### 예제: CI/CD 통합

**GitHub Actions**:
```yaml
## .github/workflows/code-review.yml
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

#### Print Mode 설정

Print mode(`claude -p`)는 자동화를 위한 여러 플래그를 지원합니다:

```bash
## 자율 턴 제한
claude -p --max-turns 5 "refactor this module"

## 구조화된 JSON 출력
claude -p --output-format json "analyze this codebase"

## 스키마 검증 포함
claude -p --json-schema '{"type":"object","properties":{"issues":{"type":"array"}}}' \
  "find bugs in this code"

## 세션 영속성 비활성화
claude -p --no-session-persistence "one-off analysis"
```

| 플래그 | 설명 | 예시 |
|------|-------------|---------|
| `--max-budget-usd` | 세션의 최대 비용 한도 설정 | `claude -p --max-budget-usd 5.00 "query"` |

---

### Advisor

> **참고:** Advisor 기능은 실험적이며 공식 문서에서 별도 페이지로 다루어지지 않을 수 있습니다. 최신 정보는 Claude Code 내에서 확인하세요.

Advisor는 저비용 **executor 모델**(Sonnet 또는 Haiku)과 고지능 **advisor 모델**(Opus 4.7)을 서버 사이드에서 결합하는 베타 도구(`advisor_20260301`)입니다. Executor가 작업을 처리하다가 전략적 결정이 필요한 시점에 자율적으로 `advisor()`를 호출하면, 서버가 별도의 Opus 추론을 실행하여 가이던스를 반환합니다. 이 모든 과정이 단일 API 요청 안에서 이루어집니다.

#### 작동 방식

1. Executor 모델이 일반 도구처럼 `advisor()`를 **자율적으로** 호출 (매 턴이 아닌 전략적 결정 시점에만)
2. Opus 4.7이 전체 대화 기록을 읽고 전략적 가이던스 반환 (400–700 토큰)
3. Advisor는 도구를 직접 호출하지 않고 사용자에게 직접 출력하지도 않음 — executor에게만 조언
4. API 응답에서 `server_tool_use` + `advisor_tool_result` 블록으로 표시

#### 활성화

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

#### 모델 호환성

| Executor | Advisor |
|----------|---------|
| `claude-haiku-4-5` | `claude-opus-4-7` |
| `claude-sonnet-4-6` | `claude-opus-4-7` |
| `claude-opus-4-6` | `claude-opus-4-7` |
| `claude-opus-4-7` | `claude-opus-4-7` |

#### 설정 옵션

| 파라미터 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `type` | string | 필수 | `"advisor_20260301"` |
| `name` | string | 필수 | `"advisor"` |
| `model` | string | 필수 | Advisor 모델 (예: `"claude-opus-4-7"`) |
| `max_uses` | integer | 무제한 | 요청당 호출 횟수 제한 |
| `caching` | object | off | `{"type": "ephemeral", "ttl": "5m"}` — advisor 프롬프트 캐싱 |

#### 성능

| 구성 | 벤치마크 | 개선 효과 |
|------|----------|----------|
| Sonnet + Opus advisor | SWE-bench Multilingual | Sonnet 단독 대비 +2.7pp, 비용 11.9% 절감 |
| Haiku + Opus advisor | BrowseComp | 41.2% vs 19.7% (단독), 비용 ~85% 절감 |

#### 요구 사항 및 제한

- **상태**: 베타 (API 사용 시 `advisor-tool-2026-03-01` beta header 필요)
- **제공자**: Anthropic API 전용 (Bedrock, Vertex, Foundry 미지원)
- **알려진 이슈**: Advisor 결과가 포함된 세션이 1–3일 후 암호화된 결과 TTL 만료로 복구 불가능해질 수 있음. `/clear`로 해결.

---

<a id="09-advanced-features-14-기능-개요"></a>

## 09-14. 기능 개요

이 페이지는 Claude Code의 확장 계층을 설명합니다. 내장 도구만으로 부족할 때 무엇을 추가해야 하는지 빠르게 판단할 수 있도록 정리한 문서입니다.

### 기본 개념

Claude Code는 모델과 내장 도구로 시작합니다. 그 위에 확장 기능이 에이전트 루프의 서로 다른 지점에 붙습니다.

- `CLAUDE.md`는 항상 로드되는 지속 문맥을 더합니다
- skills는 재사용 가능한 지식과 워크플로를 더합니다
- MCP는 외부 서비스와 도구를 연결합니다
- subagents는 격리된 작업을 수행하고 요약을 돌려줍니다
- agent teams는 여러 세션을 조정합니다
- hooks는 루프 바깥에서 결정적 스크립트를 실행합니다
- plugins는 이런 구성 요소를 패키징하고 배포합니다

### 목표에 맞는 기능 고르기

가장 작은 기능으로 문제를 해결하는 편이 좋습니다.

| 기능 | 적합한 용도 |
|---|---|
| `CLAUDE.md` | 프로젝트 규칙, 항상 지켜야 하는 지침 |
| Skills | 반복 프롬프트, 참고 지식, 재사용 워크플로 |
| Subagents | 문맥 격리, 병렬 조사, 전문 작업자 |
| Agent teams | 여러 세션 조정 |
| MCP | 외부 시스템, API, 브라우저, 데이터베이스 |
| Hooks | 이벤트 기반 결정적 자동화 |
| Plugins | 여러 저장소나 팀에 재사용할 배포 단위 |

### 점진적으로 키우기

공식 문서는 처음부터 모든 기능을 켜기보다 필요가 생길 때마다 추가하라고 권합니다.

대표적인 신호:

- Claude가 프로젝트 규칙을 두 번 이상 틀린다: `CLAUDE.md`
- 같은 시작 프롬프트를 계속 친다: skill
- Claude가 볼 수 없는 시스템의 데이터를 자꾸 복사해 준다: MCP
- 옆 작업이 메인 대화 문맥을 너무 많이 먹는다: subagent
- 매번 같은 후처리를 원한다: hook
- 다른 저장소에도 같은 구성을 배포하고 싶다: plugin

### 자주 헷갈리는 기능 구분

#### `CLAUDE.md` vs skills

- `CLAUDE.md`는 항상 켜져 있는 문맥
- skills는 필요할 때 쓰는 재사용 능력

#### Skills vs 슬래시 명령

- skills는 지시와 자산을 묶는 단위
- 슬래시 명령은 이름 붙은 진입점

#### MCP vs hooks

- MCP는 Claude에게 새 도구와 데이터 소스를 줍니다
- hooks는 모델 바깥에서 스크립트를 실행합니다

#### Subagents vs agent teams

- subagents는 하나의 워크플로 안에서 위임되는 하위 작업자
- agent teams는 여러 독립 세션을 조정하는 상위 구조

#### Plugins vs 나머지

- plugins는 패키징 계층입니다
- skills, hooks, subagents, MCP 서버를 설치 가능한 단위로 묶습니다

### 컨텍스트 비용을 고려해야 한다

모든 기능이 같은 비용을 갖지는 않습니다.

- `CLAUDE.md`는 지속적으로 로드됩니다
- skills는 필요할 때만 로드되어 더 가벼울 수 있습니다
- subagents는 상세 작업을 부모 문맥 밖으로 밀어냅니다
- MCP 도구 정의도 필요 시 지연 로딩되는 경우가 많습니다

즉, 메인 세션을 더 작게 유지하는 기능 선택이 중요합니다.

### 추천 도입 순서

대부분의 팀은 다음 순서가 실용적입니다.

1. `CLAUDE.md`
2. skills
3. subagents
4. MCP
5. hooks
6. plugins

이 순서는 공식 문서의 권장 흐름과도 잘 맞습니다.

### 관련 가이드

- [How Claude Code Works](09-advanced-features.md#09-advanced-features-19-claude-code는-어떻게-동작하는가)
- [Settings System Guide](09-advanced-features.md#09-advanced-features-27-settings-system-guide)
- [Channels Reference](09-advanced-features.md#09-advanced-features-02-channels-reference)
- [Subagents](04-subagents.md)
- [Skills](03-skills.md)
- [Plugins](07-plugins.md)

### 공식 출처

- [Extend Claude Code](https://code.claude.com/docs/ko/features-overview)

---

<a id="09-advanced-features-15-fullscreen-rendering"></a>

## 09-15. Fullscreen Rendering

Fullscreen rendering은 Claude Code의 대체 rendering path입니다. 긴 세션에서 flicker를 줄이고, 메모리 사용을 더 안정적으로 만들며, 마우스 상호작용을 개선합니다.

여기서 "fullscreen"은 터미널 drawing surface를 `vim`이나 `htop`처럼 Claude Code가 직접 사용하는 뜻이지, 터미널 창을 최대화한다는 뜻은 아닙니다.

### Why Use It

다음 같은 현상이 보일 때 fullscreen rendering을 켭니다:

- 긴 tool run 중 flicker가 심함
- streaming 출력 중 scroll 위치가 튐
- tmux나 integrated terminal에서 렌더링이 느림
- 긴 세션에서 시각적으로 불안정함

특히 다음 환경에서 도움이 됩니다:

- VS Code integrated terminal
- tmux
- iTerm2
- 렌더링 throughput이 병목인 다른 terminal

### Enable It

한 세션만:

```bash
CLAUDE_CODE_NO_FLICKER=1 claude
```

지속 설정:

```bash
export CLAUDE_CODE_NO_FLICKER=1
```

항상 쓰고 싶다면 shell profile에 export를 추가합니다.

### What Changes

Fullscreen rendering이 켜지면:

- input box가 하단에 고정됩니다
- 보이는 메시지만 렌더링됩니다
- 긴 세션에서 메모리 사용이 더 안정적입니다
- 대화가 terminal alternate screen buffer 안에서 동작합니다

이 마지막 점 때문에 사용 습관도 조금 달라집니다:

- native terminal search는 scrollback으로 내보내기 전까지 대화를 보지 못합니다
- mouse behavior를 terminal 대신 Claude Code가 처리합니다
- selection과 scrolling semantics가 기본 renderer와 다릅니다

### Mouse and Selection Behavior

Fullscreen rendering에서는 다음이 가능합니다:

- prompt 클릭으로 cursor 이동
- tool result expand/collapse
- clickable URL과 file path 열기
- 앱 안에서 text selection
- mouse wheel로 대화 스크롤

native terminal selection이 더 중요하다면, flicker-free rendering은 유지하면서 mouse capture만 끌 수 있습니다:

```bash
CLAUDE_CODE_NO_FLICKER=1 CLAUDE_CODE_DISABLE_MOUSE=1 claude
```

### Scrolling and Search

유용한 navigation shortcut:

| Shortcut | Action |
|---|---|
| `PgUp` / `PgDn` | 반 화면씩 스크롤 |
| `Ctrl+Home` | 처음으로 이동 |
| `Ctrl+End` | 최신 메시지로 이동 |
| `Ctrl+O` | transcript mode 열기 |

Transcript mode는 alternate-screen 제약을 우회하는 핵심 수단입니다:

- `/`로 transcript mode 안 검색
- `[`로 대화를 native terminal scrollback에 기록
- `v`로 `$VISUAL` 또는 `$EDITOR`에서 열기

`Cmd+F` 같은 terminal-native search에 의존한다면 transcript mode를 알아두는 것이 중요합니다.

### Adjust Scroll Speed

일부 terminal은 wheel event가 느립니다. 이럴 때 scroll distance를 올릴 수 있습니다:

```bash
export CLAUDE_CODE_SCROLL_SPEED=3
```

지원 범위는 `1`에서 `20`이며, 시작값으로는 `3`이 무난합니다.

### tmux Notes

일반 tmux에서는 잘 동작하지만 mouse mode를 켜는 것이 좋습니다:

```tmux
set -g mouse on
```

중요한 주의점:

- mouse wheel scrolling은 tmux mouse mode에 의존합니다
- iTerm2의 `tmux -CC`는 fullscreen rendering과 잘 맞지 않습니다
- outer terminal까지 notification이나 progress indicator를 전달해야 한다면 passthrough 설정도 필요할 수 있습니다

### When Not To Use It

다음 상황이면 끄는 편이 낫습니다:

- 현재 terminal이 이미 충분히 부드럽게 동작함
- native terminal copy/search에 많이 의존함
- mouse capture가 불편한 terminal setup을 사용 중임

### Troubleshooting

#### Search does not work with `Cmd+F`

alternate-screen mode에서는 정상입니다. 다음을 사용합니다:

- `Ctrl+O` 후 `/` 로 앱 내부 검색
- `Ctrl+O` 후 `[` 로 대화를 native scrollback으로 내보내기

#### Mouse selection feels wrong

다음을 시도합니다:

```bash
CLAUDE_CODE_NO_FLICKER=1 CLAUDE_CODE_DISABLE_MOUSE=1 claude
```

#### Wheel scrolling does nothing in tmux

다음을 확인합니다:

```tmux
set -g mouse on
```

#### Rendering still feels slow

다음 조합을 시도합니다:

- fullscreen rendering 켜기
- mouse가 필요 없으면 비활성화
- 적당한 `CLAUDE_CODE_SCROLL_SPEED`

### Try It Now

#### 1. Compare normal vs fullscreen rendering

한 번은 일반 모드로, 한 번은 아래처럼 실행합니다:

```bash
CLAUDE_CODE_NO_FLICKER=1 claude
```

Expected result:

- input이 하단에 고정됩니다
- streaming 출력 중 flicker가 줄어듭니다

#### 2. Export the transcript back to scrollback

Fullscreen rendering 상태에서:

- `Ctrl+O`
- `[`

Expected result:

- 일반 terminal 도구로 대화를 다시 검색할 수 있습니다

### Related Guides

- [고급 기능 README](09-advanced-features.md)
- [Terminal Configuration](09-advanced-features.md#09-advanced-features-29-terminal-configuration)
- [Sandboxing](09-advanced-features.md#sandboxing)

### Official Reference

- https://code.claude.com/docs/ko/fullscreen

---

<a id="09-advanced-features-16-github-actions"></a>

## 09-16. GitHub Actions

Claude Code GitHub Actions는 Claude를 GitHub Actions 워크플로우 안에서 실행해 이슈 처리, PR 작성, 코드 구현, 정기 리포트 같은 자동화를 구성할 수 있게 해 줍니다. 관리형 Code Review와 달리 실행이 GitHub Actions 러너 안에서 일어나므로, 트리거와 인증, 워크플로우 로직을 직접 통제하고 싶을 때 더 적합합니다.

### 개요

공식 통합의 중심은 `anthropics/claude-code-action@v1`입니다.

대표 사용 사례:

- 이슈나 PR의 `@claude` 멘션에 반응
- 이슈를 구현 PR로 전환
- 코드 리뷰 보조나 유지보수 작업 자동화
- 스케줄 기반 리포트나 정리 작업 실행

공식 문서 기준 핵심 특징:

- 로컬 Claude Code에서 `/install-github-app`로 빠른 설정 가능
- 저장소의 `CLAUDE.md` 지침을 따름
- 코드 실행은 GitHub 러너에서 이뤄짐
- Claude API 직접 사용뿐 아니라 AWS Bedrock, Google Vertex AI도 지원

### 빠른 설정

가장 빠른 시작 방법은 로컬 Claude Code에서 다음을 실행하는 것입니다.

```bash
/install-github-app
```

이 흐름은 GitHub App 설치와 필요한 시크릿 설정을 안내합니다.

공식 문서상 주의점:

- 저장소 관리자 권한이 필요합니다
- 빠른 설치 경로는 direct Claude API 사용자 기준입니다
- Bedrock과 Vertex AI는 별도의 제공자 인증 구성이 필요합니다

### 기본 워크플로우 구조

v1 액션은 단순한 입력 구조를 사용합니다.

- `prompt`: Claude에게 줄 지시문
- `claude_args`: Claude Code CLI 인자 전달
- `anthropic_api_key`: direct Claude API 사용 시 필요

최소 예시는 다음과 같습니다.

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    prompt: "Review this pull request for correctness and security issues"
    claude_args: "--max-turns 5"
```

이슈나 PR 댓글 기반 워크플로우에서는 `@claude` 멘션에 자동 반응하도록 구성할 수도 있습니다.

### Code Review와의 차이

GitHub Actions가 더 적합한 경우:

- Claude를 GitHub CI 안에서 실행하고 싶을 때
- PR 리뷰 외에도 구현, 리포트, 자동 커밋, 이슈 응답 같은 커스텀 자동화가 필요할 때
- Bedrock 또는 Vertex AI 기반으로 CI를 운영하고 싶을 때

관리형 Code Review가 더 적합한 경우:

- 호스팅된 PR 리뷰 기능만 필요할 때
- 조직 관리자가 빠르게 리뷰 기능만 롤아웃하고 싶을 때

둘은 대체 관계라기보다 보완 관계에 가깝습니다.

### 권장 운영 방식

#### `CLAUDE.md`를 간결하게 유지

공식 문서도 `CLAUDE.md`를 주요 제어 수단으로 봅니다. 저장소 규칙, 아키텍처 제약, 코드 스타일을 짧고 안정적으로 정리해 두면 액션 품질이 좋아집니다.

#### `claude_args`로 범위 제어

비용과 실행 시간을 관리하려면 CLI 인자를 적극적으로 사용합니다.

- `--max-turns`로 반복 횟수 제한
- 필요한 경우 모델 지정
- 허용/차단 도구 범위 설정

#### 트리거를 명시적으로 설계

비용이 큰 작업은 이벤트 필터, 브랜치 필터, concurrency 제어를 함께 써서 중복 실행을 줄이는 편이 좋습니다.

#### Claude의 결과물도 일반 코드처럼 리뷰

자동화로 생성된 커밋이라도 테스트, 리뷰, 승인 규칙은 그대로 유지하는 것이 안전합니다.

### Bedrock 및 Vertex AI

GitHub Actions는 AWS Bedrock과 Google Vertex AI 기반 실행도 지원합니다. 이는 기업 환경에서 클라우드 제공자 인증, 리전 제어, 내부 보안 정책에 맞추기 좋습니다.

실무적으로는 다음을 뜻합니다.

- direct API 키 대신 제공자 인증 구성이 필요
- 워크플로우의 시크릿 이름과 자격 증명 구성이 정확해야 함
- 선택한 리전과 모델 가용성이 맞아야 함

이미 조직이 Bedrock 또는 Vertex 중심으로 운영 중이라면 이 경로가 자연스럽습니다.

### v1 전환 시 주의점

베타 시절 예제를 쓰고 있다면 v1 규격으로 정리해야 합니다.

- `@beta`를 `@v1`로 변경
- 예전 prompt 입력 방식을 `prompt`로 통일
- CLI 옵션은 `claude_args`로 이동
- 구버전 `mode` 설정은 제거

오래된 베타 예제를 그대로 두면 가장 먼저 CI 설정에서 혼란이 생깁니다.

### 문제 해결

#### `@claude`에 반응하지 않음

다음을 확인합니다.

- GitHub App이 정상 설치되었는지
- 해당 이벤트용 워크플로우가 활성화되어 있는지
- direct API 사용 시 필요한 시크릿이 있는지
- 댓글이 `/claude`가 아니라 `@claude`인지

#### Claude가 만든 커밋에서 CI가 돌지 않음

다음을 확인합니다.

- GitHub App 또는 custom app 경로를 쓰는지
- 필요한 push / pull_request 이벤트 트리거가 포함되어 있는지
- 앱 권한이 원하는 CI 흐름을 허용하는지

#### 인증 오류

direct API라면:

- `ANTHROPIC_API_KEY`가 존재하고 유효한지 확인합니다

Bedrock / Vertex라면:

- 자격 증명과 시크릿 이름
- 제공자 인증 연결
- 리전과 모델 가용성

을 순서대로 점검합니다.

### 관련 링크

- [공식 GitHub Actions 문서](https://code.claude.com/docs/ko/github-actions)
- [Claude Code Action 저장소](https://github.com/anthropics/claude-code-action)
- [공식 Code Review 문서](https://code.claude.com/docs/ko/code-review)
- [AWS Bedrock](11-deployment-admin.md#11-deployment-admin-01-amazon-bedrock)
- [Google Vertex AI](11-deployment-admin.md#11-deployment-admin-05-google-vertex-ai)
- [지침과 메모 관리](02-memory.md)

---

<a id="09-advanced-features-17-github-enterprise-server"></a>

## 09-17. GitHub Enterprise Server

Claude Code는 self-hosted GitHub Enterprise Server 인스턴스와 연결할 수 있어서, `github.com`이 아니라 사내 GHES에 저장된 저장소에서도 Claude Code 웹 세션, 호스팅 Code Review, 내부 플러그인 마켓플레이스를 사용할 수 있습니다.

### 개요

공식 문서 기준 GitHub Enterprise Server 지원은 Team 및 Enterprise 플랜에서 제공됩니다.

관리자가 GHES 인스턴스를 Claude Code에 연결해 두면, 개발자는 저장소마다 별도 설정을 반복하지 않고 해당 인스턴스의 저장소를 사용할 수 있습니다.

공식 문서가 강조하는 지원 범위:

- GHES 저장소 대상 웹 세션
- GHES 저장소 대상 호스팅 Code Review
- GHES에 호스팅된 내부 plugin marketplace

이 문서는 GHES 저장소 연동 자체를 다룹니다. GHES 러너에서 GitHub Actions를 돌리는 별도 주제와는 다릅니다.

### 관리자 설정

설정은 조직 단위로 한 번 수행합니다.

1. `claude.ai/admin-settings/claude-code`를 엽니다.
2. GitHub Enterprise Server 섹션으로 이동합니다.
3. `Connect`를 누릅니다.
4. 연결 표시 이름과 GHES hostname을 입력합니다.
5. 사설 CA 또는 self-signed 인증서를 쓰는 경우 CA 인증서를 제공합니다.
6. GitHub Enterprise로 이동해 생성된 manifest로 GitHub App을 만듭니다.
7. Claude가 접근해야 할 저장소나 조직에 앱을 설치합니다.
8. Claude admin settings로 돌아와 필요한 기능을 활성화합니다.

브라우저 redirect 방식이 막힌 환경이라면 공식 문서에 manual setup 경로도 있습니다.

### GitHub App 권한

공식 문서 기준 생성되는 앱은 웹 세션, 리뷰, 관련 기능을 위해 다음 수준의 권한이 필요합니다.

- contents 읽기/쓰기
- pull requests 읽기/쓰기
- issues 읽기/쓰기
- checks 읽기/쓰기
- actions 읽기
- repository hooks 읽기/쓰기
- metadata 읽기

또한 pull request, issue comment, review comment, review, check run 이벤트를 구독합니다.

이 권한 범위는 단순 clone 용도보다 넓습니다. Claude가 브랜치를 푸시하고, PR 코멘트를 남기고, 체크 런을 게시해야 하기 때문입니다.

### 수동 설정

가이드형 연결이 불가능하다면 GHES에 앱을 수동으로 만든 뒤, Claude admin form에 자격 증명을 직접 입력할 수 있습니다.

공식 문서가 요구하는 주요 항목:

- hostname
- OAuth client ID / secret
- GitHub App ID
- client ID / secret
- webhook secret
- private key

보통은 네트워크 정책 때문에 redirect 기반 설정이 막힌 엔터프라이즈 환경에서 이 경로를 사용합니다.

### 개발자 입장에서의 사용 흐름

관리자 설정이 끝난 뒤에는 개발자 경험이 일반 GitHub 저장소와 비슷해집니다. 핵심은 저장소마다 Claude용 앱 설치나 별도 초기화를 반복하지 않는다는 점입니다.

대표 흐름:

- GHES 저장소에 대해 웹 세션 시작
- GHES PR에 대해 호스팅 Code Review 사용
- 같은 GHES 인스턴스의 내부 plugin marketplace 활용

개발자 관점에서 연결 문제가 생기면, 먼저 관리자가 GHES 연결을 완료했고 해당 저장소에 앱을 설치했는지 확인하는 것이 가장 빠릅니다.

### GHES의 Plugin Marketplace

Claude Code는 GHES에 호스팅된 plugin marketplace도 사용할 수 있습니다. 중요한 차이는 `owner/repo` 축약형이 아니라 전체 git URL을 써야 한다는 점입니다.

예시:

```bash
/plugin marketplace add git@github.example.com:platform/claude-plugins.git
/plugin marketplace add https://github.example.com/platform/claude-plugins.git
```

조직이 managed settings로 marketplace 소스를 제한한다면, 관리자가 `hostPattern` 규칙으로 GHES 호스트를 허용하거나 내부 marketplace를 미리 등록할 수 있습니다.

### 제한 사항과 적합한 환경

다음 조건이면 GHES 연동이 적합합니다.

- 코드가 사내 self-managed GitHub 인스턴스에 있어야 할 때
- `github.com`으로 옮기지 않고도 Claude Code 웹 세션이나 호스팅 리뷰를 쓰고 싶을 때
- 내부 플러그인 배포도 GHES 안에서 관리하고 싶을 때

다만 호스팅 기능이 정상 동작하려면 Anthropic 인프라에서 GHES 인스턴스로의 네트워크 도달성이 확보되어야 합니다.

### 문제 해결

#### 웹 세션이 저장소 clone에 실패함

`claude --remote`가 clone 오류를 내면 다음을 확인합니다.

- 관리자가 GHES 연결을 완료했는지
- 대상 저장소에 GitHub App이 설치되어 있는지
- Claude에 등록된 hostname과 git remote의 hostname이 일치하는지

#### marketplace 추가가 policy 오류로 막힘

`/plugin marketplace add`가 차단되면, 조직이 marketplace 소스를 제한 중일 가능성이 큽니다. 관리자가 managed settings에서 GHES hostname을 허용해야 합니다.

#### GHES 인스턴스에 도달하지 못함

호스팅 리뷰나 웹 세션이 시간 초과된다면, Anthropic 인프라에서 GHES 인스턴스로 접근 가능한지와 필요한 방화벽 인바운드 규칙이 열려 있는지 확인합니다.

### 관련 링크

- [공식 GHES 문서](https://code.claude.com/docs/ko/github-enterprise-server)
- [공식 Code Review 문서](https://code.claude.com/docs/ko/code-review)
- [Managed settings](11-deployment-admin.md#11-deployment-admin-10-서버-관리-설정)
- [플러그인과 마켓플레이스 참고](12-agent-sdk.md#12-agent-sdk-13-플러그인)

---

<a id="09-advanced-features-18-gitlab-ci-cd"></a>

## 09-18. GitLab CI/CD

Claude Code GitLab CI/CD는 Claude를 GitLab 파이프라인 안에서 실행해 이슈 처리, 머지 리퀘스트 작업, 구현 보조 자동화를 GitLab 러너 위에서 수행할 수 있게 해 줍니다. 공식 문서 기준 현재 beta이며, 통합 자체는 GitLab이 유지보수합니다.

### 개요

현재 공식 문서가 설명하는 핵심 구조는 다음과 같습니다.

- GitLab 이벤트나 수동 실행이 Claude 작업을 트리거
- 각 실행은 컨테이너화된 CI 환경에서 동작
- Claude의 쓰기 범위는 workspace 수준으로 제한
- 결과는 merge request 흐름을 통해 검토
- Claude API, AWS Bedrock, Google Vertex AI 지원

즉, GitLab 중심 개발 조직에서 Claude를 기존 CI/CD 거버넌스 안에 넣는 방식이라고 보면 됩니다.

### 동작 방식

큰 흐름은 이렇습니다.

1. GitLab이 MR 댓글, 수동 파이프라인 실행 같은 이벤트를 감지합니다.
2. 작업은 저장소와 토론 문맥을 수집합니다.
3. Claude Code가 CI 컨테이너 안에서 제한된 도구와 권한으로 실행됩니다.
4. 변경 사항은 merge request 흐름으로 제안됩니다.

공식 문서는 격리된 실행, 제한된 쓰기, MR 기반 검토를 반복해서 강조합니다. 즉 기본 브랜치를 몰래 수정하는 모델이 아닙니다.

### 설정 패턴

#### 빠른 시작

가장 빠른 방법은 `.gitlab-ci.yml`에 Claude 작업을 추가하고, job 안에서 Claude Code를 설치한 뒤, 필요한 자격 증명을 넣어 수동 실행 또는 MR 문맥에서 돌려 보는 것입니다.

공식 예제의 공통 패턴:

- `before_script`에서 Claude 설치
- 필요하면 GitLab MCP 서버 시작
- `claude -p`로 prompt 전달
- `--permission-mode acceptEdits` 사용
- `--allowedTools`를 명시적으로 지정

#### 운영 환경용 설정

지속 운영 관점에서는 일반적인 고권한 자동화처럼 다루는 편이 맞습니다.

- CI/CD 변수는 masked로 관리
- prompt와 저장소 규칙은 버전 관리
- runner, timeout, 네트워크 정책을 명시
- 가능하면 장기 비밀값보다 클라우드 제공자 연합 인증 사용

### 제공자 선택

#### Claude API

가장 단순한 경로는 `ANTHROPIC_API_KEY`를 GitLab CI/CD 변수로 두는 방식입니다.

#### AWS Bedrock

공식 문서는 정적 키보다 OIDC 기반 IAM role assume 방식을 권장합니다. 필요한 준비 작업:

- 대상 Claude 모델에 대한 Bedrock 접근 권한
- GitLab용 AWS OIDC provider
- 그 provider를 신뢰하는 IAM role
- Bedrock 호출에 필요한 최소 권한

대표 변수:

- `AWS_ROLE_TO_ASSUME`
- `AWS_REGION`

#### Google Vertex AI

공식 문서는 다운로드 키 대신 Workload Identity Federation을 사용합니다.

대표 준비 사항:

- Vertex AI API 활성화
- GitLab OIDC를 신뢰하는 Google Cloud 설정
- 필요한 Vertex 권한만 가진 전용 service account

대표 변수:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`

### 권장 운영 방식

#### `CLAUDE.md`를 짧고 명확하게 유지

공식 문서도 `CLAUDE.md`를 주요 제어 수단으로 봅니다. 저장소 규칙과 제약을 간결하게 넣는 편이 반복 실행 품질에 좋습니다.

#### 실행 시간과 비용을 제한

다음 항목을 명시적으로 제어하는 편이 좋습니다.

- `max_turns`
- job timeout
- runner concurrency
- prompt 범위

#### Claude 결과도 일반 MR처럼 리뷰

Claude가 만든 변경이라도 기존 승인 규칙, 테스트, 보호 브랜치 정책을 그대로 통과하게 두는 것이 안전합니다.

#### 장기 비밀값을 피함

저장소에 자격 증명을 넣지 말고 GitLab 변수와 제공자 연합 인증을 사용합니다.

### 보안과 거버넌스

공식 문서가 강조하는 운영 원칙:

- job은 격리된 컨테이너에서 실행
- 네트워크 접근은 runner 정책으로 제한 가능
- 쓰기 범위는 workspace 수준으로 제한
- 변경은 MR을 통해 공개적으로 검토
- 기존 GitLab 승인과 브랜치 보호 규칙이 그대로 적용

즉 Claude는 거버넌스를 우회하는 도구가 아니라, 기존 CI 통제 안에서 동작하는 자동화입니다.

### 비용과 성능

비용은 두 층위로 봐야 합니다.

- GitLab runner 사용 시간
- Claude 모델 토큰 사용량

공식 문서가 권장하는 최적화 방향:

- 넓은 질문보다 구체적인 prompt 사용
- timeout을 적절히 설정
- concurrency를 제한
- `CLAUDE.md`와 컨텍스트를 짧게 유지

### 문제 해결

#### `@claude`에 반응하지 않음

해당 이벤트가 GitLab 설정에 제대로 연결되어 있는지, 그리고 job이 이슈나 MR 문맥을 실제로 받고 있는지 확인합니다.

#### job이 코멘트를 쓰거나 MR을 열지 못함

다음을 확인합니다.

- `CI_JOB_TOKEN` 권한이 충분한지, 아니면 `api` scope가 있는 project access token을 써야 하는지
- `--allowedTools`에 `mcp__gitlab`이 포함되어 있는지
- job이 충분한 MR / 스레드 문맥과 함께 실행되는지

#### 인증 오류

direct API라면:

- `ANTHROPIC_API_KEY`가 유효한지 확인합니다

Bedrock / Vertex라면:

- OIDC 또는 WIF 구성
- role assume 또는 impersonation 연결
- 리전과 모델 가용성

을 순서대로 점검합니다.

### 관련 링크

- [공식 GitLab CI/CD 문서](https://code.claude.com/docs/ko/gitlab-ci-cd)
- [AWS Bedrock](11-deployment-admin.md#11-deployment-admin-01-amazon-bedrock)
- [Google Vertex AI](11-deployment-admin.md#11-deployment-admin-05-google-vertex-ai)
- [지침과 메모 관리](02-memory.md)

---

<a id="09-advanced-features-19-claude-code는-어떻게-동작하는가"></a>

## 09-19. Claude Code는 어떻게 동작하는가

Claude Code는 단순 챗봇이 아니라 에이전트형 코딩 환경입니다. 텍스트만 답하는 것이 아니라 파일을 읽고, 명령을 실행하고, 코드를 수정하고, 결과를 검증하면서 작업을 반복합니다.

### 에이전트 루프

대부분의 작업은 다음 세 단계를 반복합니다.

1. 문맥 수집
2. 행동 수행
3. 결과 검증

실제로는 세 단계가 깔끔히 분리되지 않습니다. 버그 수정 하나도 로그를 읽고, 코드를 찾고, 파일을 수정하고, 테스트를 다시 돌린 뒤, 필요하면 다시 조사 단계로 되돌아갑니다.

### 모델과 도구

Claude Code는 두 가지 축으로 움직입니다.

- 작업을 추론하는 Claude 모델
- 실제 행동을 수행하는 내장 도구

공식 문서는 내장 도구를 크게 다섯 범주로 설명합니다.

- 파일 작업
- 검색
- 실행
- 웹
- 코드 인텔리전스

모델은 방금 얻은 정보를 바탕으로 다음에 어떤 도구를 쓸지 결정합니다.

### Claude가 접근하는 것

프로젝트 디렉터리에서 `claude`를 실행하면 Claude Code는 보통 다음을 다룹니다.

- 현재 디렉터리 트리의 파일
- 터미널 명령과 로컬 개발 도구
- 현재 Git 상태
- `CLAUDE.md`에 있는 프로젝트 지침
- auto memory와 skills, MCP, subagents 같은 확장 기능

그래서 현재 파일 한 탭만 보는 인라인 보조도구와 달리, 여러 파일을 가로지르는 변경을 조정할 수 있습니다.

### 환경과 인터페이스

핵심 루프는 같지만 실행 환경은 달라질 수 있습니다.

- local: 내 머신에서 실행
- cloud: Anthropic 관리 VM에서 실행
- remote control: 웹 UI로 제어하지만 실제 실행은 로컬

인터페이스도 다양합니다.

- 터미널
- 데스크톱 앱
- IDE 통합
- claude.ai/code
- Slack
- CI/CD 환경

보이는 화면은 달라도, 밑바닥의 에이전트 루프는 동일합니다.

### 세션, 브랜치, 연속성

Claude Code는 세션 이력을 로컬에 저장해서 다음이 가능합니다.

- 이전 대화 계속하기
- 특정 세션 재개하기
- 세션을 포크해서 다른 경로를 시험하기

중요한 구분:

- 세션은 대화 기록을 보존합니다
- 체크포인트는 파일 상태를 보존합니다

같은 세션 ID를 두 터미널에서 동시에 재개하면 기록이 섞일 수 있습니다. 같은 출발점에서 병렬 작업을 하려면 포크가 더 깔끔합니다.

### 컨텍스트 윈도우

컨텍스트 윈도우에는 다음이 들어갑니다.

- 대화 기록
- Claude가 읽은 파일 내용
- 명령 출력
- `CLAUDE.md`
- auto memory
- 로드된 skill
- 시스템 지시문

컨텍스트가 차면 Claude Code는 자동으로 압축합니다. 오래된 도구 출력이 먼저 빠지고, 필요하면 대화가 요약됩니다. 오래 유지해야 하는 규칙은 채팅이 아니라 `CLAUDE.md`에 두는 편이 맞습니다.

특히 중요한 두 가지:

- skills는 필요할 때 로드됩니다
- subagents는 분리된 새 컨텍스트에서 일하고 요약만 돌려줍니다

그래서 긴 조사 작업일수록 subagent가 유용합니다.

### 안전 모델

Claude Code의 핵심 안전장치는 두 가지입니다.

- 파일 편집을 되돌리는 체크포인트
- 무엇을 묻고 무엇을 자동 수행할지 정하는 권한

체크포인트는 파일 편집만 되돌립니다. API 호출이나 배포 같은 외부 부작용은 같은 방식으로 롤백되지 않습니다.

### 더 잘 쓰는 방법

공식 가이드의 핵심은 다음 패턴으로 요약됩니다.

- Claude Code 사용법 자체를 Claude에게 물어본다
- 대화를 반복적으로 조정하는 방식으로 쓴다
- 잘못 가면 일찍 끊고 방향을 수정한다
- 파일, 제약, 기대 결과를 구체적으로 준다
- 검증 기준을 같이 준다
- 복잡한 일은 구현 전에 먼저 탐색한다
- 세부 절차를 지시하기보다 결과를 위임한다

### 관련 가이드

- [Best Practices](09-advanced-features.md#09-advanced-features-01-모범-사례)
- [Common Workflows](09-advanced-features.md#09-advanced-features-06-공통-워크플로)
- [Session and Interaction](09-advanced-features.md#09-advanced-features-26-세션-인터랙션)
- [Permissions and Security](09-advanced-features.md#09-advanced-features-21-권한-보안)

### 공식 출처

- [How Claude Code works](https://code.claude.com/docs/ko/how-claude-code-works)

---

<a id="09-advanced-features-20-output-styles"></a>

## 09-20. Output Styles

Output styles는 Claude Code의 핵심 CLI 동작은 유지하면서 응답 방식을 바꾸고 싶을 때 쓰는 기능입니다. 일회성 prompt tweak가 아니라, 세션 전반에 유지되는 응답 모드를 만들고 싶을 때 적합합니다.

### What Output Styles Are For

다음처럼 Claude Code가 일정한 응답 모드로 유지되길 원할 때 사용합니다:

- 코딩 중 구현 선택 이유를 더 설명하게 하기
- 코딩 작업을 학습용 흐름으로 바꾸기
- 비기본 응답 구조나 tone 적용하기
- `/config`에서 고를 수 있는 커스텀 작업 모드 만들기

Output styles는 일반 user instruction과 다릅니다. Claude Code가 시작할 때 쓰는 system-prompt layer를 바꾸기 때문입니다.

### Built-In Output Styles

Claude Code에는 기본으로 세 가지 style이 있습니다:

| Style | When to use it | What changes |
|---|---|---|
| `Default` | 일반적인 엔지니어링 작업 | 표준 Claude Code coding behavior를 사용 |
| `Explanatory` | 작업 중 설명을 더 받고 싶을 때 | 구현 reasoning과 설명을 더 많이 추가 |
| `Learning` | 참여형 학습 세션을 원할 때 | learn-by-doing 성격이 강해지고 `TODO(human)` 성격의 흐름이 생길 수 있음 |

그래도 소프트웨어 엔지니어링이 목적이라면 기본은 `Default` 또는 `Explanatory`가 안전합니다. `Learning`은 세션을 의도적으로 더 교육적으로 만들고 싶을 때 적합합니다.

### How Output Styles Work

Output styles는 일반 prompt처럼 덧붙는 게 아니라 Claude Code의 system prompt를 수정합니다.

핵심 동작:

- 선택한 output style은 새 세션이 시작될 때 적용됩니다
- 세션 도중 style을 바꿔도 현재 대화가 완전히 다시 구성되지는 않습니다
- custom style은 자기 instruction을 system prompt 끝에 추가합니다
- custom style은 기본 coding-specific instruction을 유지할 수도 있습니다

토큰 관점에서는:

- style instruction이 길수록 입력 토큰이 늘어납니다
- 첫 요청 이후에는 prompt caching이 반복 비용을 줄여줍니다
- 설명형 style은 출력 토큰도 더 많이 쓸 수 있습니다

### Change Your Output Style

가장 쉬운 방법은 `/config`입니다.

```bash
/config
```

그다음 `Output style`을 선택합니다.

직접 settings에 넣을 수도 있습니다:

```json
{
  "outputStyle": "Explanatory"
}
```

주요 위치:

- Local project: `.claude/settings.local.json`
- Project-shared: `.claude/settings.json`
- User-wide: `~/.claude/settings.json`

실험할 때는 local project scope가 가장 안전합니다.

### Create a Custom Output Style

Custom output styles는 다음 위치의 Markdown 파일입니다:

- User-wide: `~/.claude/output-styles/`
- Project-wide: `.claude/output-styles/`
- Plugin-provided: plugin 내부의 `output-styles/`

최소 예시:

```markdown
---
name: Architecture Reviewer
description: Focus on tradeoffs, risks, and boundary decisions.
keep-coding-instructions: true
---

## Architecture Reviewer

Prioritize:
- boundary clarity
- migration risk
- operational impact
- testability

Prefer short, high-signal responses with explicit tradeoffs.
```

#### Frontmatter

| Field | Purpose | Default |
|---|---|---|
| `name` | picker에 표시되는 이름 | file name 사용 가능 |
| `description` | `/config`에서 보이는 짧은 설명 | None |
| `keep-coding-instructions` | Claude Code의 coding-specific default instructions 유지 | `false` |

#### When to Set `keep-coding-instructions: true`

Claude Code를 계속 coding agent처럼 유지하면서 presentation이나 emphasis만 바꾸고 싶을 때 `true`로 둡니다.

예:

- architecture review mode
- concise code-explanation mode
- mentoring mode

반대로 일반 software-engineering behavior에서 일부러 벗어나고 싶다면 `false`가 맞습니다.

### Example Project Layout

```plaintext
.claude/
└── output-styles/
    ├── architecture-reviewer.md
    └── onboarding-mentor.md
```

### Comparisons

#### Output Styles vs `CLAUDE.md`

응답 방식을 바꾸고 싶다면 output styles를 사용합니다.

프로젝트의 durable instruction이 필요하다면 `CLAUDE.md`를 사용합니다. 예:

- coding standards
- architecture rules
- testing expectations
- deployment constraints

`CLAUDE.md`는 project memory이고, output styles는 response mode입니다.

#### Output Styles vs `--append-system-prompt`

`--append-system-prompt`는 한 세션 또는 한 CLI invocation용입니다.

Output styles는 재사용 가능하고 `/config`에서 선택 가능한 지속형 모드입니다.

#### Output Styles vs Agents

별도 model, tools, task boundary를 가진 전문 worker가 필요하면 agents를 사용합니다.

메인 agent의 tone, structure, working mode만 바꾸고 싶다면 output styles가 맞습니다.

#### Output Styles vs Skills

Skills는 task-specific workflow와 reusable capability bundle용입니다.

Output styles는 세션 전체의 persistent response behavior용입니다.

### Recommended Patterns

#### Pattern: Teaching Without Losing Coding Discipline

다음을 함께 씁니다:

- `keep-coding-instructions: true`
- 짧은 교육용 instruction set
- `Explanatory`에 가까운 응답 방식

이렇게 하면 verification과 coding discipline은 유지하면서 세션을 더 투명하게 만들 수 있습니다.

#### Pattern: Project-Specific Review Mode

프로젝트 수준에서 다음 같은 review mode를 하나 두는 것이 좋습니다:

- architecture review
- migration review
- release-readiness review

같은 manual prompt를 계속 기억할 필요 없이 팀 전체가 안정적인 모드를 쓸 수 있습니다.

### Common Mistakes

- project rule을 output styles에 넣고 `CLAUDE.md`를 비워 두는 것
- 기존 system prompt 전략을 긴 style 파일로 중복하는 것
- 세션 중간 style 변경이 현재 대화를 완전히 재구성할 거라고 기대하는 것
- coding agent로 남아야 하는데 `keep-coding-instructions`를 빼먹는 것

### Try It Now

#### 1. Switch to a built-in style

```bash
/config
```

`Output style`에서 `Explanatory`를 선택한 뒤 새 세션을 열고 file-level refactor를 설명해 달라고 요청합니다.

Expected result:

- Claude는 계속 코딩을 수행합니다
- `Default`보다 구현 reasoning을 더 많이 설명합니다

#### 2. Add a project style

```bash
mkdir -p .claude/output-styles
```

위 예시로 `.claude/output-styles/architecture-reviewer.md`를 만든 뒤 `/config`를 다시 엽니다.

Expected result:

- 새 style이 picker에 나타납니다
- 선택하면 세션이 architecture-focused review mode에 가까워집니다

### Related Guides

- [고급 기능 README](09-advanced-features.md)
- [메모리 가이드](02-memory.md)
- [Skills 가이드](03-skills.md)
- [Subagents 가이드](04-subagents.md)

### Official Reference

- https://code.claude.com/docs/ko/output-styles

---

<a id="09-advanced-features-21-권한-보안"></a>

## 09-21. 권한 & 보안

### 권한 모드

권한 모드는 Claude가 명시적 승인 없이 수행할 수 있는 작업을 제어합니다.

#### 사용 가능한 권한 모드

| 모드 | 동작 |
|---|---|
| `default` | 파일 읽기만 가능; 다른 모든 작업에 프롬프트 표시 |
| `acceptEdits` | 파일 읽기 및 편집 가능; 명령어에 프롬프트 표시 |
| `plan` | 파일 읽기만 가능 (조사 모드, 편집 없음) |
| `auto` | 백그라운드 안전 분류기 확인을 통한 모든 작업 (Research Preview) |
| `bypassPermissions` | 모든 작업, 권한 확인 없음 (위험) |
| `dontAsk` | 사전 승인된 도구만 실행; 나머지는 모두 거부 |

CLI에서 `Shift+Tab`으로 모드를 전환합니다. `--permission-mode` 플래그 또는 `permissions.defaultMode` 설정으로 기본값을 지정합니다.

#### 활성화 방법

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

#### 권한 모드 예제

##### Default 모드
Claude가 중요한 작업에 대해 확인을 요청합니다:

```
User: Fix the bug in auth.ts

Claude: I need to modify src/auth.ts to fix the bug.
The change will update the password validation logic.

Approve this change? (yes/no/show)
```

##### Plan 모드
실행 전에 구현 계획을 검토합니다:

```
User: /plan Implement user authentication system

Claude: I'll create a plan for implementing authentication.

### Implementation Plan
[Detailed plan with phases and steps]

Ready to proceed? (yes/no/modify)
```

##### Accept Edits 모드
파일 수정을 자동으로 수락합니다:

```
User: acceptEdits
User: Fix the bug in auth.ts

Claude: [Makes changes without asking]
```

#### 사용 사례

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

### Sandboxing

Sandboxing은 Claude Code가 실행하는 Bash 명령어에 대해 OS 수준의 파일 시스템 및 네트워크 격리를 제공합니다. 권한 규칙을 보완하며 추가 보안 계층을 제공합니다.

#### Sandboxing 활성화

**Slash command**:
```
/sandbox
```

**CLI 플래그**:
```bash
claude --sandbox       # Sandboxing 활성화
claude --no-sandbox    # Sandboxing 비활성화
```

#### 설정 항목

| 설정 | 설명 |
|---------|-------------|
| `sandbox.enabled` | sandboxing 활성화 또는 비활성화 |
| `sandbox.failIfUnavailable` | sandboxing을 활성화할 수 없을 때 실패 처리 |
| `sandbox.filesystem.allowWrite` | 쓰기 접근이 허용되는 경로 |
| `sandbox.filesystem.allowRead` | 읽기 접근이 허용되는 경로 |
| `sandbox.filesystem.denyRead` | 읽기 접근이 거부되는 경로 |
| `sandbox.enableWeakerNetworkIsolation` | macOS에서 약한 네트워크 격리 활성화 |

#### 설정 예제

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

#### 작동 방식

- Bash 명령어가 파일 시스템 접근이 제한된 sandbox 환경에서 실행됩니다
- 의도하지 않은 외부 연결을 방지하기 위해 네트워크 접근을 격리할 수 있습니다
- 심층 방어를 위해 권한 규칙과 함께 작동합니다
- macOS에서는 네트워크 제한을 위해 `sandbox.enableWeakerNetworkIsolation`을 사용합니다 (macOS에서는 전체 네트워크 격리를 사용할 수 없음)

#### 사용 사례

- 신뢰할 수 없거나 생성된 코드를 안전하게 실행
- 프로젝트 외부 파일에 대한 우발적 수정 방지
- 자동화 작업 중 네트워크 접근 제한

---

---

<a id="09-advanced-features-22-플래닝-모드-확장-사고"></a>

## 09-22. 플래닝 모드 & 확장 사고

### Plan Mode

Plan mode는 Claude가 구현하기 전에 복잡한 작업을 면밀히 검토하고, 검토 및 승인할 수 있는 상세한 계획을 생성할 수 있게 합니다.

#### Plan Mode란?

Plan mode는 두 단계 접근 방식입니다:
1. **계획 단계**: Claude가 작업을 분석하고 상세한 구현 계획을 생성합니다
2. **구현 단계**: 승인 후, Claude가 계획을 실행합니다

#### Plan Mode를 사용할 때

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

#### Plan Mode 활성화

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

#### Plan Mode의 이점

- **구조화된 구현 접근**: 구현 단계의 상세한 분석
- **검토 및 승인**: 실행 전에 계획을 검토하고 조정
- **위험 식별**: 구현 전에 잠재적 문제를 식별
- **명확한 단계**: 체계적인 구현 단계 및 마일스톤

#### 예제: 기능 구현

```
User: /plan Add a real-time notification system

Claude: I'll create a plan for implementing real-time notifications.

### Implementation Plan

#### Phase 1: Infrastructure Setup
1. Install WebSocket libraries (socket.io)
2. Set up WebSocket server
3. Configure connection management

#### Phase 2: Backend Implementation
4. Create notification service
5. Implement notification queue
6. Add database schema for notifications
7. Create API endpoints

#### Phase 3: Frontend Integration
8. Set up WebSocket client
9. Create notification UI components
10. Implement notification state management
11. Add notification permissions

#### Phase 4: Testing & Deployment
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

#### 계획 수정

```
User: Modify the plan - skip the queue for now, we'll add it later

Claude: Updated plan:
[Shows modified plan with queue removed]

User: Looks good, proceed

Claude: [Implements modified plan]
```

#### Plan Mode 설정

Plan mode는 CLI 플래그 또는 slash command로 활성화됩니다:

```bash
## CLI로 plan mode 활성화
claude --permission-mode plan

## 또는 REPL 내에서 /plan slash command 사용
/plan Implement user authentication system
```

**계획용 모델 별칭**: `opusplan`을 모델 별칭으로 사용하면 Opus로 계획을 수립하고 Sonnet으로 실행합니다:

```bash
claude --model opusplan "design and implement the new API"
```

**외부에서 계획 편집**: `Ctrl+G`를 눌러 현재 계획을 외부 편집기에서 상세하게 수정할 수 있습니다.

#### Ultraplan

`/ultraplan <prompt>`를 사용하면 엔드투엔드 계획 워크플로우를 실행할 수 있습니다: Claude가 상세한 계획을 작성하고, 브라우저에서 검토한 후, 원격으로 계획을 실행하거나 로컬 실행을 위해 터미널로 전송합니다.

---

### Extended Thinking

Extended thinking은 Claude가 솔루션을 제공하기 전에 복잡한 문제에 대해 더 많은 시간을 들여 추론할 수 있게 합니다.

#### Extended Thinking이란?

Extended thinking은 Claude가 다음을 수행하는 신중한 단계별 추론 프로세스입니다:
- 복잡한 문제를 분해합니다
- 여러 접근 방식을 고려합니다
- 트레이드오프를 평가합니다
- 엣지 케이스를 검토합니다

#### Extended Thinking 활성화

**키보드 단축키**:
- `Option + T` (macOS) / `Alt + T` (Windows/Linux) - Extended thinking 토글

**자동 활성화**:
- 모든 모델에서 기본적으로 활성화되며, `Alt+T` / `Option+T` 토글이나 설정을 통해 항상 켜둘 수 있습니다 (Opus 4.7, Opus 4.6, Sonnet 4.6, Haiku 4.5)
- Opus 4.7: 항상 adaptive reasoning을 사용합니다. 기본 노력 수준은 `xhigh`
- Opus 4.6: 노력 수준에 따른 적응형 추론: `low` (○), `medium` (◐), `high` (●)
- 기타 모델: 최대 31,999 토큰의 고정 예산

**설정 방법**:
- 토글: `Alt+T` / `Option+T`, 또는 `/config`를 통해
- 추론 보기: `Ctrl+O` (상세 모드)
- 노력 설정: `/effort` 명령어 또는 `--effort` 플래그

**사용자 정의 예산**:
```bash
export MAX_THINKING_TOKENS=1024
```

**노력 수준**:
```bash
export CLAUDE_CODE_EFFORT_LEVEL=high   # low (○), medium (◐), high (●), xhigh (Opus 4.7 default), or max
```

**CLI 플래그**:
```bash
claude --effort high "complex architectural review"
```

**Interactive effort slider:**
```bash
/effort          # 대화형 슬라이더 (방향키)
/effort xhigh    # 직접 설정
/effort auto     # 모델 기본값으로 리셋
```

#### Effort Levels

| Level | Opus 4.7 | Opus 4.6 / Sonnet 4.6 | Notes |
|-------|----------|----------------------|-------|
| `low` (○) | ✅ | ✅ | 지연 시간 민감 작업 |
| `medium` (◐) | ✅ | ✅ | 비용 민감 작업 |
| `high` (●) | ✅ | ✅ (4.6 기본값) | 균형 잡힌 |
| `xhigh` | ✅ **(4.7 기본값)** | ❌ (`high`로 폴백) | 신규 — Opus 4.7 전용 |
| `max` | ✅ | ✅ | 세션 전용; 가장 깊은 추론 |

> **참고:** Opus 4.7은 항상 adaptive reasoning을 사용합니다. `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` 환경 변수와 `MAX_THINKING_TOKENS` 고정 예산은 Opus 4.7에 적용되지 않습니다.

> **참고:** 프롬프트에서 "ultrathink" 키워드를 사용하면 딥 추론 모드가 활성화됩니다. 노력 수준 `low`, `medium`, `high`, `xhigh` (Opus 4.7 기본값), `max`는 Claude가 수행하는 추론의 양을 제어합니다.

> **참고**: v2.1.94부터 API 키, Bedrock/Vertex/Foundry, Team, Enterprise 사용자의 기본 노력 수준이 `medium`에서 `high`로 변경되었습니다 (Opus 4.6). Opus 4.7의 기본값은 `xhigh`입니다.

#### Extended Thinking의 이점

- **깊은 추론**: 복잡한 문제에 대해 더 많은 시간을 들여 사고합니다
- **더 나은 아키텍처 결정**: 포괄적인 평가를 통해 정보에 기반한 선택을 합니다
- **엣지 케이스 고려**: 잠재적인 문제와 시나리오를 면밀히 검토합니다
- **철저한 분석**: 복잡한 문제 해결에 대한 구조화된 접근

#### 예제: 아키텍처 결정

```
User: /think Should we use microservices or a monolith for our e-commerce platform?

Claude: Let me think through this architectural decision carefully...

<extended_thinking>
### Context Analysis
- Team size: 5 developers
- Expected traffic: 10k daily users initially
- Need to scale to 100k+ users
- Limited DevOps resources
- 6-month timeline to MVP

### Approach 1: Microservices
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

### Approach 2: Monolith
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

### Decision Factors
1. Team size (5 devs) → Favors monolith
2. DevOps resources (limited) → Favors monolith
3. Timeline (6 months) → Favors monolith
4. Future scale (100k users) → Achievable with monolith + caching
5. Complexity budget → Limited

### Recommendation
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

#### Extended Thinking 설정

Extended thinking은 환경 변수, 키보드 단축키, CLI 플래그로 제어됩니다:

```bash
## thinking 토큰 예산 설정 (Opus 4.7에는 적용되지 않음)
export MAX_THINKING_TOKENS=16000

## 노력 수준 설정: low (○), medium (◐), high (●), xhigh (Opus 4.7 기본값), or max
export CLAUDE_CODE_EFFORT_LEVEL=xhigh
```

세션 중에 `Alt+T` / `Option+T`로 토글하고, `/effort`로 노력 수준을 설정하거나, `/config`를 통해 구성할 수 있습니다.

---

---

<a id="09-advanced-features-23-plan-mode-예제"></a>

## 09-23. Plan Mode 예제

Claude Code에서 plan mode를 효과적으로 사용하는 것을 보여주는 실제 예제입니다.

### 예제 1: REST API 구축

#### Plan Mode 없이

```
User: Build a REST API for a blog

Claude: I'll create the API...
[Starts coding immediately, may miss requirements]
```

#### Plan Mode 사용

```
User: /plan Build a REST API for a blog

Claude: Let me create a comprehensive plan for the blog API.

### Blog REST API Implementation Plan

#### Phase 1: Project Setup (15 min)
1. Initialize Node.js project with Express
2. Set up TypeScript configuration
3. Install dependencies (express, pg, jwt, joi)
4. Configure environment variables
5. Set up project structure

#### Phase 2: Database Layer (30 min)
6. Design database schema
   - users table (id, email, password_hash, created_at)
   - posts table (id, user_id, title, content, published, created_at, updated_at)
   - comments table (id, post_id, user_id, content, created_at)
7. Create migration files
8. Set up database connection pool
9. Implement database models

#### Phase 3: Authentication (45 min)
10. Implement user registration endpoint
11. Implement login endpoint with JWT
12. Create authentication middleware
13. Add password hashing with bcrypt
14. Implement token refresh logic

#### Phase 4: Posts API (40 min)
15. GET /api/posts - List all published posts (with pagination)
16. GET /api/posts/:id - Get single post
17. POST /api/posts - Create new post (auth required)
18. PUT /api/posts/:id - Update post (auth required, ownership check)
19. DELETE /api/posts/:id - Delete post (auth required, ownership check)
20. GET /api/users/:id/posts - Get user's posts

#### Phase 5: Comments API (30 min)
21. GET /api/posts/:id/comments - Get post comments
22. POST /api/posts/:id/comments - Add comment (auth required)
23. DELETE /api/comments/:id - Delete comment (auth required, ownership check)

#### Phase 6: Validation & Error Handling (30 min)
24. Add request validation with Joi
25. Implement global error handler
26. Add input sanitization
27. Implement rate limiting

#### Phase 7: Testing (60 min)
28. Write unit tests for models
29. Write integration tests for auth endpoints
30. Write integration tests for posts endpoints
31. Write integration tests for comments endpoints
32. Achieve 80%+ code coverage

#### Phase 8: Documentation & Deployment (30 min)
33. Generate API documentation with Swagger
34. Create README with setup instructions
35. Add Docker configuration
36. Set up CI/CD pipeline

**Estimated Time**: 4.5 hours
**Files to Create**: ~25
**Key Technologies**: Express, PostgreSQL, JWT, TypeScript

**API Endpoints Summary**:
- Authentication: 2 endpoints
- Posts: 6 endpoints
- Comments: 3 endpoints
- Total: 11 endpoints

Ready to proceed? (yes/no/modify)

User: yes

Claude: Starting Phase 1: Project Setup...
[Implements each phase systematically]
```

### 예제 2: 데이터베이스 마이그레이션

#### Plan Mode 사용

```
User: /plan Migrate from MongoDB to PostgreSQL

Claude: This is a complex migration. Let me create a detailed plan.

### MongoDB to PostgreSQL Migration Plan

#### Phase 1: Analysis & Preparation (Day 1)
1. Analyze current MongoDB schema
2. Identify data relationships and constraints
3. Document current data volume and growth rate
4. Design equivalent PostgreSQL schema
5. Plan data type mappings
6. Identify potential migration challenges

#### Phase 2: PostgreSQL Setup (Day 1)
7. Set up PostgreSQL database
8. Create schema with tables, indexes, constraints
9. Set up connection pooling
10. Configure backup strategy

#### Phase 3: Dual-Write Implementation (Day 2-3)
11. Create database abstraction layer
12. Implement dual-write to both databases
13. Add data consistency checks
14. Deploy dual-write to staging
15. Monitor for issues

#### Phase 4: Data Migration (Day 4)
16. Create data export scripts for MongoDB
17. Create data import scripts for PostgreSQL
18. Implement data transformation logic
19. Run initial migration on copy of production data
20. Validate migrated data integrity

#### Phase 5: Gradual Cutover (Day 5-7)
21. Enable dual-write in production
22. Migrate historical data in batches
23. Continuously validate data consistency
24. Monitor both databases
25. Fix any data synchronization issues

#### Phase 6: PostgreSQL Primary (Day 8)
26. Switch read operations to PostgreSQL
27. Monitor query performance
28. Optimize slow queries
29. Continue dual-write for safety

#### Phase 7: MongoDB Retirement (Day 9-10)
30. Stop writing to MongoDB
31. Keep MongoDB as backup for 2 weeks
32. Remove MongoDB dependencies from code
33. Archive MongoDB data
34. Decommission MongoDB instance

**Estimated Time**: 10 days
**Risk Level**: High
**Rollback Strategy**: Keep MongoDB running with dual-write
**Success Criteria**:
- Zero data loss
- <5% performance regression
- All tests passing

**Key Risks**:
1. Data inconsistency during migration
2. Query performance degradation
3. Application downtime
4. Data loss

**Mitigation**:
- Dual-write pattern for safety
- Gradual cutover
- Continuous monitoring
- Quick rollback capability

Proceed with this plan? (yes/no/modify)

User: Modify - let's add a rollback plan for each phase

Claude: Updated plan with rollback procedures for each phase...
```

### 예제 3: 프론트엔드 리팩터링

```
User: /plan Refactor our React app from class components to hooks

Claude: I'll create a systematic refactoring plan.

### React Class to Hooks Migration Plan

#### Phase 1: Preparation & Analysis (2 hours)
1. Audit all class components (find all .jsx/.tsx files)
2. Categorize by complexity:
   - Simple (state only): ~15 components
   - Medium (lifecycle methods): ~23 components
   - Complex (multiple lifecycle, refs): ~8 components
3. Identify third-party libraries that need updates
4. Create component dependency graph
5. Plan migration order (leaf nodes first)

#### Phase 2: Setup & Tooling (1 hour)
6. Update React to v18+
7. Set up ESLint rules for hooks
8. Create conversion templates
9. Set up automated tests
10. Create checkpoint before starting

#### Phase 3: Migrate Simple Components (4 hours)
11. Convert simple stateful components (15 components)
12. Replace this.state with useState
13. Replace this.setState with state setters
14. Test each component after conversion
15. Update tests

#### Phase 4: Migrate Medium Components (8 hours)
16. Convert components with lifecycle methods (23 components)
17. Replace componentDidMount with useEffect
18. Replace componentDidUpdate with useEffect
19. Replace componentWillUnmount with useEffect cleanup
20. Test thoroughly

#### Phase 5: Migrate Complex Components (12 hours)
21. Convert complex components (8 components)
22. Replace refs with useRef
23. Extract custom hooks for shared logic
24. Handle edge cases (multiple useEffect)
25. Extensive testing

#### Phase 6: Shared Logic Extraction (6 hours)
26. Identify duplicated logic across components
27. Create custom hooks:
    - useAuth
    - useFetch
    - useLocalStorage
    - useDebounce
28. Refactor components to use custom hooks
29. Test custom hooks independently

#### Phase 7: Performance Optimization (4 hours)
30. Add React.memo where needed
31. Optimize with useCallback
32. Optimize with useMemo
33. Profile and fix performance regressions

#### Phase 8: Cleanup & Documentation (2 hours)
34. Remove unused class component utilities
35. Update documentation
36. Update coding guidelines
37. Create migration guide for team

**Estimated Time**: 5 days (39 hours)
**Files to Modify**: 46 components
**Risk Level**: Medium

**Migration Order**:
1. Leaf components (no dependencies)
2. Mid-level components
3. Top-level container components
4. App.jsx (last)

**Testing Strategy**:
- Unit tests for each component
- Integration tests for user flows
- Visual regression tests
- Performance benchmarks

**Success Metrics**:
- All tests passing
- No visual regressions
- Performance maintained or improved
- Bundle size not significantly increased

Proceed? (yes/no/modify)
```

### 예제 4: 보안 구현

```
User: /plan Implement comprehensive security for our web app

Claude: Let me create a thorough security implementation plan.

### Web Application Security Implementation Plan

#### Phase 1: Security Audit (Day 1)
1. Run automated security scanners (npm audit, Snyk)
2. Review dependencies for vulnerabilities
3. Check OWASP Top 10 compliance
4. Audit authentication flows
5. Review data handling practices
6. Document current security gaps

#### Phase 2: Authentication Hardening (Day 2-3)
7. Implement strong password requirements
8. Add password strength meter
9. Implement rate limiting on login
10. Add account lockout after failed attempts
11. Implement 2FA (TOTP)
12. Add session management improvements
13. Implement secure password reset flow

#### Phase 3: Authorization & Access Control (Day 3-4)
14. Implement RBAC (Role-Based Access Control)
15. Add permission checks on all endpoints
16. Implement principle of least privilege
17. Add audit logging for sensitive operations
18. Implement resource-level permissions

#### Phase 4: Data Protection (Day 4-5)
19. Implement encryption at rest (sensitive fields)
20. Ensure TLS/SSL for all communications
21. Implement secure session storage
22. Add PII data masking in logs
23. Implement data retention policies
24. Add secure file upload handling

#### Phase 5: Input Validation & Sanitization (Day 5-6)
25. Implement input validation on all endpoints
26. Add XSS protection (Content Security Policy)
27. Implement SQL injection prevention (parameterized queries)
28. Add CSRF protection
29. Implement request size limits
30. Add file upload type validation

#### Phase 6: Security Headers & Configuration (Day 6)
31. Add security headers:
    - Strict-Transport-Security
    - X-Content-Type-Options
    - X-Frame-Options
    - X-XSS-Protection
    - Content-Security-Policy
32. Configure CORS properly
33. Disable unnecessary HTTP methods
34. Remove server version headers

#### Phase 7: Monitoring & Logging (Day 7)
35. Implement security event logging
36. Add anomaly detection
37. Set up intrusion detection
38. Implement real-time alerting
39. Create security dashboard

#### Phase 8: Testing & Documentation (Day 8-9)
40. Perform penetration testing
41. Run security scanners
42. Test all security features
43. Create security documentation
44. Train team on security practices
45. Create incident response plan

#### Phase 9: Compliance & Policies (Day 10)
46. GDPR compliance check
47. Create privacy policy
48. Implement data subject rights
49. Add cookie consent
50. Create security policies documentation

**Estimated Time**: 10 days
**Risk Level**: Critical
**Priority**: High

**Security Improvements Summary**:
- Authentication: 7 enhancements
- Authorization: 5 enhancements
- Data Protection: 6 enhancements
- Input Validation: 6 enhancements
- Infrastructure: 9 enhancements
- Monitoring: 5 enhancements

**Compliance**: OWASP Top 10, GDPR

**Success Criteria**:
- Zero critical vulnerabilities
- All OWASP Top 10 mitigated
- Security score >90/100
- All pen test issues resolved

Proceed? (yes/no/modify)
```

### 예제 5: 성능 최적화

```
User: /plan Optimize our slow e-commerce website

Claude: Let me create a comprehensive performance optimization plan.

### E-commerce Performance Optimization Plan

#### Phase 1: Performance Audit (4 hours)
1. Run Lighthouse audit
2. Analyze Chrome DevTools performance profile
3. Measure Core Web Vitals:
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)
4. Identify performance bottlenecks
5. Create baseline performance metrics

**Current Metrics**:
- LCP: 4.2s (target: <2.5s)
- FID: 280ms (target: <100ms)
- CLS: 0.25 (target: <0.1)
- Page Load: 8.3s (target: <3s)

#### Phase 2: Image Optimization (6 hours)
6. Convert images to WebP format
7. Implement responsive images
8. Add lazy loading for images
9. Optimize image sizes (compression)
10. Implement CDN for images
11. Add image placeholders

**Expected Impact**: -40% load time

#### Phase 3: Code Splitting & Lazy Loading (8 hours)
12. Implement route-based code splitting
13. Lazy load non-critical components
14. Split vendor bundles
15. Optimize chunk sizes
16. Implement dynamic imports
17. Add preloading for critical resources

**Expected Impact**: -30% initial bundle size

#### Phase 4: Caching Strategy (6 hours)
18. Implement browser caching (Cache-Control)
19. Add service worker for offline support
20. Implement API response caching
21. Add Redis cache for database queries
22. Implement stale-while-revalidate
23. Configure CDN caching

**Expected Impact**: -50% API response time

#### Phase 5: Database Optimization (8 hours)
24. Add database indexes
25. Optimize slow queries (>100ms)
26. Implement query result caching
27. Add connection pooling
28. Denormalize where appropriate
29. Implement database read replicas

**Expected Impact**: -60% database query time

#### Phase 6: Frontend Optimization (10 hours)
30. Minimize and compress JavaScript
31. Minimize and compress CSS
32. Remove unused CSS (PurgeCSS)
33. Implement critical CSS
34. Defer non-critical JavaScript
35. Reduce DOM size
36. Optimize React rendering (memo, useMemo)
37. Implement virtual scrolling for long lists

**Expected Impact**: -35% JavaScript execution time

#### Phase 7: Network Optimization (4 hours)
38. Enable HTTP/2
39. Implement resource hints (preconnect, prefetch)
40. Reduce number of HTTP requests
41. Enable Brotli compression
42. Optimize third-party scripts

**Expected Impact**: -25% network time

#### Phase 8: Monitoring & Testing (4 hours)
43. Set up performance monitoring (Datadog/New Relic)
44. Add Real User Monitoring (RUM)
45. Create performance budgets
46. Set up automated Lighthouse CI
47. Test on real devices

**Estimated Time**: 50 hours (2 weeks)

**Target Metrics** (90th percentile):
- LCP: <2.0s (from 4.2s) ✅
- FID: <50ms (from 280ms) ✅
- CLS: <0.05 (from 0.25) ✅
- Page Load: <2.5s (from 8.3s) ✅

**Expected Revenue Impact**:
- 100ms faster = 1% conversion increase
- Target: 5.8s improvement = ~58% conversion increase
- Estimated additional revenue: Significant

**Priority Order**:
1. Image optimization (quick wins)
2. Code splitting (high impact)
3. Caching (high impact)
4. Database optimization (critical)
5. Frontend optimization (polish)

Proceed with this plan? (yes/no/modify)
```

### 핵심 요점

#### Plan Mode의 이점

1. **명확성**: 시작 전 명확한 로드맵
2. **추정**: 시간 및 노력 추정
3. **위험 평가**: 잠재적 문제를 조기에 식별
4. **우선순위 결정**: 논리적인 작업 순서
5. **승인**: 실행 전 검토 및 승인
6. **수정**: 피드백에 기반한 계획 조정

#### Plan Mode를 사용할 때

✅ **항상 사용하세요**:
- 다일 프로젝트
- 팀 협업
- 중요한 시스템 변경
- 새로운 개념 학습
- 복잡한 리팩터링

❌ **사용하지 마세요**:
- 버그 수정
- 작은 수정
- 간단한 질문
- 빠른 실험

#### 모범 사례

1. 승인 전에 **계획을 신중히 검토**하세요
2. 문제를 발견하면 **계획을 수정**하세요
3. 복잡한 작업을 **분해**하세요
4. **현실적인** 시간표를 추정하세요
5. **롤백** 전략을 포함하세요
6. **성공** 기준을 추가하세요
7. 각 단계에서 **테스트를 계획**하세요

---

---

<a id="09-advanced-features-24-플랫폼-통합"></a>

## 09-24. 플랫폼 & 통합

### Chrome 통합

Chrome 통합은 Claude Code를 Chrome 또는 Microsoft Edge 브라우저에 연결하여 실시간 웹 자동화 및 디버깅을 수행합니다. v2.0.73+부터 사용 가능한 베타 기능입니다 (Edge 지원은 v1.0.36+에서 추가).

#### Chrome 통합 활성화

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

#### 기능

| 기능 | 설명 |
|------------|-------------|
| **실시간 디버깅** | 콘솔 로그 읽기, DOM 요소 검사, JavaScript 실시간 디버그 |
| **디자인 검증** | 렌더링된 페이지를 디자인 목업과 비교 |
| **폼 유효성 검사** | 폼 제출, 입력 유효성 검사, 오류 처리 테스트 |
| **웹 앱 테스트** | 인증된 앱(Gmail, Google Docs, Notion 등)과 상호 작용 |
| **데이터 추출** | 웹 페이지에서 콘텐츠 스크랩 및 처리 |
| **세션 녹화** | 브라우저 상호 작용을 GIF 파일로 녹화 |

#### 사이트별 권한

Chrome 확장 프로그램이 사이트별 접근을 관리합니다. 확장 프로그램 팝업을 통해 언제든지 특정 사이트에 대한 접근 권한을 부여하거나 취소할 수 있습니다. Claude Code는 명시적으로 허용한 사이트만 상호 작용합니다.

#### 작동 방식

Claude Code는 보이는 창에서 브라우저를 제어합니다 — 실시간으로 작업이 일어나는 것을 볼 수 있습니다. 브라우저가 로그인 페이지나 CAPTCHA를 만나면, Claude가 일시 정지하고 수동으로 처리한 후 계속 진행합니다.

#### 알려진 제한 사항

- **브라우저 지원**: Chrome과 Edge만 지원 — Brave, Arc 및 기타 Chromium 브라우저는 지원되지 않음
- **WSL**: Windows Subsystem for Linux에서 사용 불가
- **서드파티 제공업체**: Bedrock, Vertex, Foundry API 제공업체에서는 지원되지 않음
- **서비스 워커 유휴**: 장시간 세션 동안 Chrome 확장 프로그램 서비스 워커가 유휴 상태가 될 수 있음

> **팁**: Chrome 통합은 베타 기능입니다. 향후 릴리스에서 브라우저 지원이 확대될 수 있습니다.

---

### Remote Control

Remote Control을 사용하면 로컬에서 실행 중인 Claude Code 세션을 휴대폰, 태블릿 또는 모든 브라우저에서 계속할 수 있습니다. 로컬 세션은 사용자의 머신에서 계속 실행됩니다 — 클라우드로 이동하지 않습니다. Pro, Max, Team, Enterprise 플랜에서 사용 가능합니다 (v2.1.51+).

#### Remote Control 시작

**CLI에서**:

```bash
## 기본 세션 이름으로 시작
claude remote-control

## 사용자 정의 이름으로 시작
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

#### 세션에 연결

다른 기기에서 연결하는 세 가지 방법:

1. **세션 URL** — 세션 시작 시 터미널에 출력됨; 모든 브라우저에서 열기
2. **QR 코드** — 시작 후 `스페이스바`를 눌러 스캔 가능한 QR 코드 표시
3. **이름으로 찾기** — claude.ai/code 또는 Claude 모바일 앱(iOS/Android)에서 세션 탐색

#### 보안

- 머신에 **인바운드 포트가 열리지 않음**
- TLS를 통한 **아웃바운드 HTTPS만** 사용
- **범위가 지정된 자격 증명** — 수명이 짧고 범위가 좁은 여러 토큰
- **세션 격리** — 각 원격 세션이 독립적

#### Remote Control과 웹상의 Claude Code 비교

| 항목 | Remote Control | 웹상의 Claude Code |
|--------|---------------|-------------------|
| **실행** | 사용자 머신에서 실행 | Anthropic 클라우드에서 실행 |
| **로컬 도구** | 로컬 MCP 서버, 파일, CLI에 대한 전체 접근 | 로컬 의존성 없음 |
| **사용 사례** | 다른 기기에서 로컬 작업 계속 | 모든 브라우저에서 새로 시작 |

#### 제한 사항

- Claude Code 인스턴스당 하나의 원격 세션
- 호스트 머신에서 터미널이 열려 있어야 함
- 네트워크에 접근할 수 없으면 약 10분 후 세션 시간 초과

#### 사용 사례

- 책상에서 떨어져 있을 때 모바일 기기나 태블릿에서 Claude Code 제어
- 로컬 도구 실행을 유지하면서 더 풍부한 claude.ai UI 사용
- 전체 로컬 개발 환경으로 이동 중 빠른 코드 리뷰

---

### 웹 세션

웹 세션을 사용하면 claude.ai/code의 브라우저에서 직접 Claude Code를 실행하거나, CLI에서 웹 세션을 생성할 수 있습니다.

#### 웹 세션 생성

```bash
## CLI에서 새 웹 세션 생성
claude --remote "implement the new API endpoints"
```

이렇게 하면 모든 브라우저에서 접근할 수 있는 claude.ai의 Claude Code 세션이 시작됩니다.

#### 웹 세션을 로컬에서 재개

웹에서 세션을 시작하고 로컬에서 계속하려면:

```bash
## 웹 세션을 로컬 터미널에서 재개
claude --teleport
```

또는 대화형 REPL 내에서:
```
/teleport
```

#### 사용 사례

- 한 머신에서 작업을 시작하고 다른 머신에서 계속
- 팀원과 세션 URL 공유
- 시각적 diff 검토에 웹 UI를 사용한 후 실행을 위해 터미널로 전환

---

### 데스크톱 앱

Claude Code 데스크톱 앱은 시각적 diff 검토, 병렬 세션, 통합 커넥터를 갖춘 독립 실행형 애플리케이션을 제공합니다. macOS 및 Windows에서 사용 가능합니다 (Pro, Max, Team, Enterprise 플랜).

#### 설치

[claude.ai](https://claude.ai)에서 플랫폼에 맞게 다운로드하세요:
- **macOS**: 유니버설 빌드 (Apple Silicon 및 Intel)
- **Windows**: x64 및 ARM64 설치 프로그램 제공

설치 지침은 [데스크톱 빠른 시작](https://code.claude.com/docs/ko/desktop-quickstart)을 참조하세요.

#### CLI에서 전환

현재 CLI 세션을 데스크톱 앱으로 전환합니다:

```
/desktop
```

#### 핵심 기능

| 기능 | 설명 |
|---------|-------------|
| **Diff 보기** | 인라인 코멘트가 포함된 파일별 시각적 검토; Claude가 코멘트를 읽고 수정 |
| **앱 미리보기** | 내장 브라우저로 개발 서버를 자동 시작하여 실시간 확인 |
| **PR 모니터링** | GitHub CLI 통합으로 CI 실패 자동 수정 및 체크 통과 시 자동 병합 |
| **병렬 세션** | 사이드바에서 Git worktree 격리를 사용한 다중 세션 |
| **예약 작업** | 앱이 열려 있는 동안 실행되는 반복 작업 (시간별, 일별, 평일, 주별) |
| **풍부한 렌더링** | 구문 강조가 포함된 코드, 마크다운, 다이어그램 렌더링 |

#### 앱 미리보기 설정

`.claude/launch.json`에서 개발 서버 동작을 구성합니다:

```json
{
  "command": "npm run dev",
  "port": 3000,
  "readyPattern": "ready on",
  "persistCookies": true
}
```

#### 커넥터

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

#### 원격 및 SSH 세션

- **원격 세션**: Anthropic 클라우드 인프라에서 실행; 앱을 닫아도 계속됩니다. claude.ai/code 또는 Claude 모바일 앱에서 접근 가능
- **SSH 세션**: SSH를 통해 원격 머신에 연결하여 원격 파일 시스템과 도구에 대한 전체 접근. Claude Code가 원격 머신에 설치되어 있어야 함

#### 데스크톱의 권한 모드

데스크톱 앱은 CLI와 동일한 4가지 권한 모드를 지원합니다:

| 모드 | 동작 |
|------|----------|
| **권한 요청** (기본) | 모든 편집과 명령어를 검토하고 승인 |
| **편집 자동 수락** | 파일 편집 자동 승인; 명령어는 수동 승인 필요 |
| **Plan mode** | 변경 전에 접근 방식 검토 |
| **권한 우회** | 자동 실행 (sandbox 전용, 관리자 제어) |

#### 엔터프라이즈 기능

- **관리 콘솔**: 조직의 Code 탭 접근 및 권한 설정 제어
- **MDM 배포**: macOS에서 MDM 또는 Windows에서 MSIX를 통한 배포
- **SSO 통합**: 조직 구성원에게 싱글 사인온 요구
- **관리형 설정**: 팀 구성 및 모델 가용성을 중앙에서 관리

---

### Git Worktree

Git Worktree를 사용하면 격리된 worktree에서 Claude Code를 시작하여, stash나 브랜치 전환 없이 다른 브랜치에서 병렬 작업을 수행할 수 있습니다.

#### Worktree에서 시작

```bash
## 격리된 worktree에서 Claude Code 시작
claude --worktree
## 또는
claude -w
```

#### Worktree 위치

Worktree는 다음 위치에 생성됩니다:
```
<repo>/.claude/worktrees/<name>
```

#### 모노레포를 위한 Sparse Checkout

`worktree.sparsePaths` 설정을 사용하여 모노레포에서 sparse-checkout을 수행하면, 디스크 사용량과 클론 시간을 줄일 수 있습니다:

```json
{
  "worktree": {
    "sparsePaths": ["packages/my-package", "shared/"]
  }
}
```

#### Worktree 도구 및 Hook

| 항목 | 설명 |
|------|-------------|
| `ExitWorktree` | 현재 worktree를 종료하고 정리하는 도구 |
| `WorktreeCreate` | Worktree 생성 시 발생하는 hook 이벤트 |
| `WorktreeRemove` | Worktree 제거 시 발생하는 hook 이벤트 |

#### 자동 정리

Worktree에서 변경이 없으면 세션 종료 시 자동으로 정리됩니다.

#### 사용 사례

- 메인 브랜치를 건드리지 않고 기능 브랜치에서 작업
- 작업 디렉토리에 영향을 주지 않고 격리된 환경에서 테스트 실행
- 일회용 환경에서 실험적 변경 시도
- 모노레포에서 특정 패키지만 sparse-checkout하여 더 빠른 시작

---

---

<a id="09-advanced-features-25-routines"></a>

## 09-25. Routines

Routine은 Claude Code의 클라우드 자동화 표면입니다. 공식 문서는 routine을 "프롬프트, 하나 이상의 저장소, 그리고 connector 집합을 묶어 한 번 저장해 두고 자동으로 실행하는 Claude Code 구성"으로 설명합니다.

현재 공식 페이지 제목은 `Automate work with routines`이며, docs map 상에서는 여전히 `web-scheduled-tasks` 계열로 보일 수 있습니다.

### 언제 routine을 써야 하는가

노트북이 닫혀 있어도 계속 돌아야 하는 작업이면 routine이 맞습니다. 대표적인 예:

- 야간 PR 리뷰
- 정기 backlog triage
- 문서 drift 점검
- API 호출로 시작하는 배포 검증
- GitHub 이벤트에 반응하는 저장소 유지보수

핵심은 "무인 실행 가능하고 결과가 명확한 반복 작업"입니다.

### Routine을 구성하는 것

공식 문서 기준 routine은 다음 요소를 저장합니다.

- prompt
- 선택 모델
- 하나 이상의 GitHub 저장소
- environment 설정
- 포함할 connector
- 하나 이상의 trigger

각 실행은 새 클라우드 세션으로 시작합니다. 이 세션은 셸 명령을 실행하고, 저장소에 커밋된 skill을 쓰고, 포함된 connector를 호출할 수 있습니다.

### Desktop scheduled task와의 차이

이 둘은 자주 혼동되지만 공식 문서는 차이를 명확히 구분합니다.

- routine은 Anthropic 관리형 클라우드에서 실행
- 컴퓨터가 꺼져 있어도 계속 동작
- 현재 로컬 체크아웃이 아니라 fresh clone 기준
- permission-mode 선택기와 승인 프롬프트가 없음

반대로 Desktop local scheduled task는 내 머신에서 실행되고 로컬 파일 접근이 가능하지만, 앱이 열려 있고 머신이 깨어 있어야 합니다.

### Routine 만들기

공식 문서는 세 가지 진입점을 제공합니다.

- 웹
- CLI
- Desktop 앱

세 경로 모두 같은 클라우드 계정에 저장됩니다.

#### 웹에서 만들기

공식 흐름:

1. `claude.ai/code/routines` 열기
2. `New routine` 클릭
3. 이름과 self-contained prompt 작성
4. 저장소 선택
5. environment와 connector 구성
6. trigger 추가
7. routine 생성

여기서는 프롬프트 품질이 특히 중요합니다. 중간에 사람 승인을 기대할 수 없기 때문에 성공 조건, 출력 형식, 부작용 여부를 모두 명시하는 편이 안전합니다.

#### CLI에서 만들기

공식 명령 표면은 `/schedule`입니다.

Anthropic이 문서에서 직접 보여주는 예:

- `/schedule`
- `/schedule daily PR review at 9am`
- `/schedule list`
- `/schedule update`
- `/schedule run`

CLI는 schedule 기반 routine 생성과 기존 routine 관리를 지원합니다. 다만 API trigger와 GitHub trigger의 세부 설정은 현재 공식 문서 기준 웹 UI에서 하는 흐름입니다.

#### Desktop에서 만들기

`Schedule` 페이지에서 `New task`를 누르고 `New remote task`를 선택합니다. Desktop은 local task와 routine을 한 화면에서 보여주지만, remote task는 웹과 같은 클라우드 routine 시스템에 저장됩니다.

### Trigger 종류

공식 문서는 현재 세 가지 trigger를 설명합니다.

#### Schedule trigger

매시간, 매일, 평일, 매주 같은 주기로 실행합니다. 시간은 사용자의 로컬 시간대로 입력되고 자동 변환됩니다. 공식 문서는 몇 분 정도 지연되어 시작될 수 있지만 해당 routine의 offset은 일관되게 유지된다고 설명합니다.

최소 주기는 1시간입니다. 더 세밀한 cron이 필요하면 기본 preset으로 만든 뒤 `/schedule update`로 조정하는 흐름이 권장됩니다.

#### API trigger

API trigger는 routine 전용 인증 HTTP 엔드포인트를 제공합니다. bearer token과 함께 POST하면 새 세션이 시작되고 session URL이 반환됩니다.

공식 문서가 상정하는 사용처:

- 알림 시스템
- 배포 파이프라인
- 내부 운영 도구
- 외부 서비스에서의 주문형 자동화

현재 토큰 생성과 폐기는 웹 UI 기준으로 설명됩니다.

#### GitHub trigger

GitHub trigger는 PR, release 같은 저장소 이벤트에 반응해 routine을 시작합니다. 리뷰 자동화, post-merge 유지보수, 릴리스 점검 같은 흐름에 적합합니다.

### 실행 모델과 범위 제어

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

### 실행과 관리

Routine 상세 화면에서 공식적으로 가능한 작업:

- 저장소, prompt, trigger, connector 확인
- `Run now`로 즉시 실행
- schedule 일시중지 및 재개
- routine 수정
- 지난 실행을 전체 세션으로 열어 검토

각 실행은 일반 Claude Code 세션처럼 열리므로, 결과를 이어서 대화하거나 PR을 만들 수 있습니다.

### 설계 실무 조언

#### 프롬프트는 독립적으로 완결되게 써라

Routine은 중간에 사람이 상황을 보정해 주는 흐름이 아닙니다. 무엇을 하고, 무엇을 만들고, 언제 실패로 간주할지 명확해야 합니다.

#### Connector는 최소한만 포함하라

공식 문서는 생성 시 연결된 MCP connector가 기본 포함될 수 있다고 설명합니다. 필요 없는 것은 제거하는 것이 맞습니다.

#### Fresh clone을 전제로 설계하라

생성물, 브랜치 규칙, setup 단계, repo-local skill 의존성이 있다면 저장소나 environment 안에서 명시적으로 보장해야 합니다.

### 공식 참고 문서

- Routines: `https://code.claude.com/docs/ko/web-scheduled-tasks`
- Web quickstart: `https://code.claude.com/docs/ko/web-quickstart`
- Desktop scheduled tasks: `https://code.claude.com/docs/ko/desktop-scheduled-tasks`

---

<a id="09-advanced-features-26-세션-인터랙션"></a>

## 09-26. 세션 & 인터랙션

### 세션 관리

여러 Claude Code 세션을 효과적으로 관리합니다.

#### 세션 관리 명령어

| 명령어 | 설명 |
|---------|-------------|
| `/resume` | ID 또는 이름으로 대화 재개 |
| `/rename` | 현재 세션 이름 지정 |
| `/fork` | 현재 세션을 새 브랜치로 분기 |
| `claude -c` | 가장 최근 대화 계속 |
| `claude -r "session"` | 이름 또는 ID로 세션 재개 |

#### 세션 재개

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

#### 세션 분기

원본을 잃지 않고 대안적 접근 방식을 시도하기 위해 세션을 분기합니다:

```
/fork
```

또는 CLI에서:
```bash
claude --resume auth-refactor --fork-session "try OAuth instead"
```

#### 세션 영속성

세션은 자동으로 저장되며 재개할 수 있습니다:

```bash
## 마지막 대화 계속
claude -c

## 이름 또는 ID로 특정 세션 재개
claude -r "auth-refactor"

## 실험을 위해 재개 후 분기
claude --resume auth-refactor --fork-session "alternative approach"
```

기존 세션을 새 세션으로 포크하려면 `--resume`과 함께 `--fork-session`을 사용합니다.

---

### 대화형 기능

#### 키보드 단축키

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
| `Option+O` (macOS) / `Alt+O` (Windows/Linux) | Fast mode 토글 |
| `Ctrl+X Ctrl+K` | 모든 백그라운드 agent 종료 |
| `Ctrl+X Ctrl+E` | 외부 편집기에서 열기 (Ctrl+G의 별칭) |

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

#### 테마와 표시 방식

Claude Code가 terminal theme 자체를 관리하지는 않지만, 터미널 안에서의 인터페이스 체감에는 영향을 줍니다.

다음처럼 구분해서 생각하면 됩니다:

- 폰트, 색상, 전체 theme는 terminal emulator가 담당
- `/config`, `/statusline`은 Claude 특화 UI 동작을 담당
- 긴 세션에서 화면이 불안정하면 fullscreen rendering을 사용

실무적으로는 terminal이 appearance를, Claude Code가 interaction behavior를 담당한다고 보면 됩니다.

#### 키 바인딩 사용자 정의

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

#### 사용 가능한 컨텍스트

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

#### 코드 지원

키 바인딩은 코드 시퀀스(다중 키 조합)를 지원합니다:

```
"ctrl+k ctrl+s"   → 두 키 시퀀스: ctrl+k를 누른 후 ctrl+s를 누름
"ctrl+shift+p"    → 동시 수정자 키
```

**키 입력 문법**:
- **수정자**: `ctrl`, `alt` (또는 `opt`), `shift`, `meta` (또는 `cmd`)
- **대문자는 Shift를 의미**: `K`는 `shift+k`와 동일
- **특수 키**: `escape`, `enter`, `return`, `tab`, `space`, `backspace`, `delete`, 방향 키

#### 예약 및 충돌 키

| 키 | 상태 | 참고 |
|-----|--------|-------|
| `Ctrl+C` | 예약됨 | 재바인딩 불가 (인터럽트) |
| `Ctrl+D` | 예약됨 | 재바인딩 불가 (종료) |
| `Ctrl+B` | 터미널 충돌 | tmux 접두사 키 |
| `Ctrl+A` | 터미널 충돌 | GNU Screen 접두사 키 |
| `Ctrl+Z` | 터미널 충돌 | 프로세스 일시 중지 |

> **팁**: 단축키가 작동하지 않으면 터미널 에뮬레이터나 멀티플렉서와의 충돌을 확인하세요.

**Transcript 검색** (v2.1.83+): transcript 모드에서 `/`를 눌러 대화 기록을 검색할 수 있습니다.

#### Transcript Viewer와 검색

Transcript 중심 탐색은 interactive mode의 별도 축입니다:

- `Ctrl+O`로 transcript/verbose 흐름 열기
- transcript mode 안에서 `/`로 검색
- `[`로 대화를 terminal scrollback으로 보내 native search 사용

일반 채팅 화면으로는 확인이 불편하거나, live prompt view와 다른 검색 동작이 필요할 때 transcript mode를 사용합니다.

#### 탭 완성

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

#### Quick Commands

Interactive mode는 plain prompt 입력만 있는 것이 아닙니다. 실무적으로는 quick command surface가 핵심 일부입니다:

- `/`로 slash command 탐색
- tab completion으로 명령 축소
- 자주 쓰는 동작에 대한 built-in shortcut과 mode toggle 사용

그래서 전체 command catalog는 slash-command guide에 있더라도, command surface 자체는 interactive reference 일부로 보는 것이 맞습니다.

#### 명령어 이력

이전 명령어에 접근합니다:

```
User: <↑>  # 이전 명령어
User: <↓>  # 다음 명령어
User: Ctrl+R  # 이력 검색

(reverse-i-search)`test': run all tests
```

#### 여러 줄 입력

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

#### 인라인 편집

전송 전에 명령어를 편집합니다:

```
User: Deploy to prodcution<Backspace><Backspace>uction

[Edit in-place before sending]
```

#### Vim Mode

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

#### Bash Mode

`!` 접두사로 셸 명령어를 직접 실행합니다:

```bash
! npm test
! git status
! cat src/index.js
```

#### Background Bash와 Background Tasks

다음 두 개념은 구분해야 합니다:

- `!`는 현재 interactive session 안에서 즉시 셸 명령을 실행
- background tasks는 메인 대화를 막지 않고 더 오래 지속되는 작업을 실행

즉시 한 번 실행할 셸 동작에는 `!`,
계속 돌려야 하는 명령이나 workflow에는 background task가 맞습니다.

컨텍스트를 전환하지 않고 빠른 명령어 실행에 사용하세요.

---

### 음성 입력

음성 입력은 Claude Code에 푸시 투 토크 음성 입력을 제공하여, 타이핑 대신 음성으로 프롬프트를 말할 수 있게 합니다.

#### 음성 입력 활성화

```
/voice
```

#### 기능

| 기능 | 설명 |
|---------|-------------|
| **푸시 투 토크** | 키를 누르고 있으면 녹음, 놓으면 전송 |
| **20개 언어** | 음성 인식이 20개 언어를 지원 |
| **사용자 정의 키 바인딩** | `/keybindings`를 통해 푸시 투 토크 키를 구성 |
| **계정 요구 사항** | STT 처리를 위해 Claude.ai 계정이 필요 |

#### 설정

`Space`를 길게 눌러 푸시 투 토크 음성 받아쓰기를 사용합니다 (`/keybindings`로 변경 가능).

키 바인딩 파일(`/keybindings`)에서 푸시 투 토크 키 바인딩을 사용자 정의합니다. 음성 입력은 음성 인식 처리에 Claude.ai 계정을 사용합니다.

---

### Task List

Task List 기능은 컨텍스트 압축(대화 이력이 컨텍스트 윈도우에 맞게 트리밍될 때)을 거쳐도 유지되는 영구 작업 추적을 제공합니다.

#### Task List 토글

세션 중에 `Ctrl+T`를 눌러 task list 보기를 켜거나 끕니다.

#### 영구 작업

작업은 컨텍스트 압축 간에 유지되어, 대화 컨텍스트가 트리밍될 때 장시간 실행 중인 작업 항목이 손실되지 않습니다. 이는 복잡한 다단계 구현에 특히 유용합니다.

#### 이름이 지정된 작업 디렉토리

`CLAUDE_CODE_TASK_LIST_ID` 환경 변수를 사용하여 세션 간에 공유되는 이름이 지정된 작업 디렉토리를 생성합니다:

```bash
export CLAUDE_CODE_TASK_LIST_ID=my-project-sprint-3
```

이를 통해 여러 세션이 동일한 task list를 공유할 수 있어, 팀 워크플로우나 다중 세션 프로젝트에 유용합니다.

---

### 프롬프트 제안

프롬프트 제안은 git 이력과 현재 대화 컨텍스트를 기반으로 회색 텍스트의 예제 명령어를 표시합니다.

#### 작동 방식

- 입력 프롬프트 아래에 회색 텍스트로 제안이 표시됩니다
- `Tab`을 눌러 제안을 수락합니다
- `Enter`를 눌러 수락하고 즉시 제출합니다
- 제안은 git 이력과 대화 상태에서 가져온 컨텍스트 인식 기능입니다

#### 프롬프트 제안 비활성화

```bash
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
```

---

---

<a id="09-advanced-features-27-settings-system-guide"></a>

## 09-27. Settings System Guide

Claude Code의 settings system은 단순한 `settings.json` 파일 하나가 아닙니다. 여러 scope, 관련 sidecar 파일, 기능별 저장 위치가 함께 작동하는 계층형 구성 모델입니다.

이 가이드는 settings system이 실제로 어떻게 동작하는지에 집중합니다:

- 어떤 scope를 써야 하는지
- precedence가 어떻게 작동하는지
- 어떤 기능이 scope model에 참여하는지
- 설정이 실제로 어디에 저장되는지

### Scope Model

Claude Code는 네 가지 주요 scope를 사용합니다:

| Scope | Primary location | Who it affects | Team-shared |
|---|---|---|---|
| `managed` | OS / server-managed policy locations | Everyone on the machine or org | Yes |
| `user` | `~/.claude/` | You, across all projects | No |
| `project` | `.claude/` in the repository | Everyone on the repo | Yes |
| `local` | `.claude/settings.local.json` | You, in this repo only | No |

각 scope는 이렇게 쓰는 것이 좋습니다:

- `managed`: 강제해야 하는 조직 정책
- `user`: 모든 프로젝트에서 쓰고 싶은 개인 기본값
- `project`: 저장소에 공유해야 하는 팀 규칙과 설정
- `local`: 한 저장소에서만 쓰는 개인 오버라이드

### When To Use Each Scope

#### Managed

다음처럼 우회되면 안 되는 설정은 managed scope를 사용합니다:

- 보안 정책
- 로그인 제한
- marketplace 제한
- 강제 sandboxing 또는 permission rules

정책이라면 여기 들어가야 합니다.

#### User

다음은 user scope에 둡니다:

- 선호 모델 기본값
- 개인 plugins와 agents
- 개인 environment defaults
- 나의 기본 작업 스타일

모든 repo에서 쓰고 싶지만 커밋하고 싶지 않다면 user scope입니다.

#### Project

다음은 project scope가 맞습니다:

- 팀 hooks
- 팀 plugins
- 공유 permission / MCP 설정
- 저장소 전체가 함께 가져가야 하는 동작

팀원이 repo를 clone했을 때 같이 따라와야 하면 project scope를 사용합니다.

#### Local

다음은 local scope가 맞습니다:

- machine-specific paths
- 임시 실험
- 커밋하고 싶지 않은 개인 오버라이드

팀원 환경에서 깨질 수 있거나 개인적으로만 유지해야 하면 local scope를 사용합니다.

### Precedence

같은 설정이 여러 위치에 있으면, 더 구체적이거나 더 권한이 강한 source가 우선합니다.

실무적으로 기억할 규칙:

- managed policy는 일반적으로 수정 가능한 settings보다 우선합니다
- project settings는 그 저장소 안에서 user defaults보다 우선합니다
- local project settings는 내 머신에서 shared project settings보다 우선합니다
- session-specific flags는 현재 실행에만 영향을 줄 수 있습니다

핵심 원칙은 이것입니다:

`policy beats preference, and local beats shared.`

### What Actually Uses Scopes

모든 Claude Code 기능이 같은 파일에 저장되는 것은 아닙니다.

| Feature | User location | Project location | Local location |
|---|---|---|---|
| General settings | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| Subagents | `~/.claude/agents/` | `.claude/agents/` | none |
| Plugins | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| MCP servers | `~/.claude.json` | `.mcp.json` | `~/.claude.json` per-project entry |
| `CLAUDE.md` memory | `~/.claude/CLAUDE.md` | `CLAUDE.md` or `.claude/CLAUDE.md` | `CLAUDE.local.md` |

여기서 중요한 점은 두 가지입니다:

- 모든 scoped feature가 `settings.json`에 저장되지는 않습니다
- 하나의 파일이 아니라 configuration system 전체를 기준으로 생각해야 합니다

### The Main Settings Files

#### User settings

```plaintext
~/.claude/settings.json
```

모든 프로젝트에 적용할 개인 기본값에 사용합니다.

#### Project settings

```plaintext
.claude/settings.json
```

저장소와 함께 이동해야 하는 공유 설정에 사용합니다.

#### Local project settings

```plaintext
.claude/settings.local.json
```

gitignored 되는 개인용 project override에 사용합니다.

#### Other important files

```plaintext
~/.claude.json
.mcp.json
CLAUDE.md
CLAUDE.local.md
```

이 파일들을 `settings.json`과 혼동하지 마세요:

- `~/.claude.json`은 추가 state와 user-level MCP 관련 구성을 저장합니다
- `.mcp.json`은 공유 project MCP 파일입니다
- `CLAUDE.md`는 강제 설정이 아니라 behavioral memory입니다

### What Goes Into `settings.json`

`settings.json`은 공식 hierarchical settings layer입니다. 대표적인 category는 다음과 같습니다:

- permissions
- environment variables
- model defaults
- plugin settings
- UI behavior
- hooks
- output style
- status line
- fast mode 및 thinking 관련 옵션

예시:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./secrets/**)"
    ]
  },
  "env": {
    "FOO": "bar"
  },
  "outputStyle": "Explanatory"
}
```

직접 settings를 편집할 때는 schema line을 유지하는 것이 좋습니다. VS Code 같은 editor에서 validation과 autocomplete가 좋아집니다.

### Permission Settings vs Permission Modes

이 둘은 관련은 있지만 같은 것은 아닙니다.

- `permission mode`는 세션 중 Claude가 어떻게 묻고 진행할지 결정합니다
- `permission rules`는 무엇을 allow, deny, escalate할지 정의합니다

settings-level permission 작업 예시:

- 특정 Bash 패턴 허용/차단
- managed-only permission rules 강제
- bypass behavior 비활성화

mode-level 작업 예시:

- `default`
- `plan`
- `acceptEdits`
- `auto`
- `bypassPermissions`

사용자의 작업 모드를 바꾸고 싶다면 `permission mode`,
정책을 정의하고 싶다면 settings 안의 `permission rules`를 떠올리면 됩니다.

### Sandbox Settings

Sandboxing은 settings가 실제 실행 가능 범위를 바꾸는 대표적 예입니다.

주요 sandbox 설정 개념:

- sandboxing 활성화/비활성화
- sandboxing을 켤 수 없으면 실패하게 하기
- read/write path 허용/차단
- macOS에서 weaker network isolation 동작 조정

이건 단순 UI 옵션이 아니라 실행 모델을 바꾸기 때문에 configuration system의 일부입니다.

### Hooks, Plugins, and Subagents

settings system은 이런 기능군이 어떻게 활성화되고 제약되는지도 제어합니다.

예:

- plugin allowlists와 marketplace restrictions
- managed hook restrictions
- 세션에 주입되는 environment variables
- Claude와 plugin surface가 함께 상속받는 기본 동작

각 기능 상세는 전용 가이드를 참고하세요:

- [Hook 가이드](06-hooks.md)
- [Plugin 가이드](07-plugins.md)
- [Subagent 가이드](04-subagents.md)

### Excluding Sensitive or Irrelevant Files

Configuration system은 exclusion 성격의 동작에도 영향을 줍니다.

예:

- 큰 저장소에서 불필요한 `CLAUDE.md` 파일 제외
- shared configuration 안에 irrelevant 또는 sensitive path가 섞이지 않도록 제어
- machine-specific 또는 secret-bearing override를 local-only file에 가두기

이 설정은 안전성과 context quality 둘 다에 영향을 줍니다.

### Verify Active Settings

활성 settings를 확인하는 실용적인 방법은 두 가지입니다.

#### 1. `/config` 사용

```bash
/config
```

사용자-facing 설정을 빠르게 확인하는 가장 쉬운 방법입니다.

#### 2. 관련 scope 파일 직접 확인

다음 파일을 확인합니다:

- `~/.claude/settings.json`
- `.claude/settings.json`
- `.claude/settings.local.json`
- `.mcp.json`
- `~/.claude.json`

문제가 생겼을 때는 "값이 틀렸다"보다 "더 구체적인 scope가 override하고 있다"가 더 흔한 원인입니다.

### Recommended Working Rules

#### Team rule

공유 repo 동작은 `.claude/settings.json`에 둡니다.

#### Personal rule

전역 개인 선호는 `~/.claude/settings.json`에 둡니다.

#### Safety rule

machine-specific 또는 experimental override는 `.claude/settings.local.json`에 둡니다.

#### Policy rule

정책을 user/project settings로 흉내 내지 마세요. 반드시 강제해야 한다면 managed scope에 둬야 합니다.

### Common Mistakes

- Claude Code 설정이 모두 한 파일에 있다고 생각하는 것
- machine-specific setting을 project scope에 넣는 것
- project settings가 항상 모든 것보다 우선한다고 가정하는 것
- `CLAUDE.md` behavioral guidance와 enforced settings를 혼동하는 것
- 실제로는 `.mcp.json`이나 `~/.claude.json`에 있는 문제를 엉뚱한 settings 파일에서 찾는 것

### Try It Now

#### 1. Inspect your three settings scopes

```bash
ls ~/.claude/settings.json .claude/settings.json .claude/settings.local.json
```

Expected result:

- 현재 프로젝트에서 어떤 scope가 존재하는지 확인할 수 있습니다

#### 2. Test precedence safely

user scope에 harmless한 값을 하나 두고, 같은 setting을 local project scope에서 override해 봅니다.

Expected result:

- 해당 repo에서는 local setting이 우선합니다

#### 3. Verify schema-aware editing in VS Code

다음을 추가합니다:

```json
"$schema": "https://json.schemastore.org/claude-code-settings.json"
```

Expected result:

- editor에서 autocomplete와 validation이 더 좋아집니다

### Related Guides

- [고급 기능 README](09-advanced-features.md)
- [Terminal Configuration](09-advanced-features.md#09-advanced-features-29-terminal-configuration)
- [Output Styles](09-advanced-features.md#09-advanced-features-20-output-styles)
- [CLI 참조](10-cli.md)
- [메모리 가이드](02-memory.md)

### Official Reference

- https://code.claude.com/docs/ko/settings

---

<a id="09-advanced-features-28-slack의-claude-code"></a>

## 09-28. Slack의 Claude Code

Slack의 Claude Code는 Slack 채널에서 바로 코딩 작업을 넘겨 Claude Code on the web 세션으로 실행하게 해 줍니다. `@Claude`를 멘션하면 Claude가 요청을 해석해 코드 작업이면 Claude Code로 라우팅합니다.

### 개요

이 통합은 Slack용 Claude 앱 위에서 동작하며, 개발 작업은 웹의 Claude Code 세션으로 넘깁니다. 이미 Slack 대화 안에 맥락이 있을 때 특히 유용합니다.

핵심 동작은 다음과 같습니다.

- `@Claude`가 코딩 의도를 자동 감지합니다.
- 스레드 또는 최근 채널 메시지에서 컨텍스트를 수집합니다.
- `claude.ai/code`에서 새 세션을 만듭니다.
- 진행 상태를 Slack 스레드에 다시 올립니다.
- 완료되면 요약과 작업 버튼을 제공합니다.

Slack의 Claude Code는 공개 채널과 비공개 채널에서만 동작하며, DM에서는 동작하지 않습니다.

### 사전 조건

| 항목 | 요구사항 |
|---|---|
| Claude 플랜 | Claude Code 액세스가 포함된 Pro, Max, Team, Enterprise |
| Claude Code on the web | 활성화되어 있어야 함 |
| GitHub | 최소 하나의 저장소를 연결하고 인증해야 함 |
| Slack 인증 | Slack 계정이 Claude 계정과 연결되어 있어야 함 |
| 관리자 권한 | 워크스페이스 관리자가 Claude 앱을 설치해야 함 |

### 설정 및 사용 흐름

1. Slack 워크스페이스 관리자가 Slack App Marketplace에서 Claude 앱을 설치합니다.
2. Slack의 Claude App Home에서 Claude 계정을 연결합니다.
3. Claude Code on the web에서 같은 계정으로 로그인하고 GitHub를 연결합니다.
4. 사용할 저장소를 하나 이상 인증합니다.
5. 라우팅 모드를 선택합니다.
   - `Code only`는 모든 `@mention`을 Claude Code 세션으로 보냅니다.
   - `Code + Chat`은 코드 작업과 일반 대화를 자동으로 구분합니다.
6. 채널에서 `/invite @Claude`로 Claude를 초대합니다.
7. 채널 또는 스레드에서 `@Claude`를 멘션해 작업을 시작합니다.
8. 결과는 `View Session`, `Create PR`, `Retry as Code`, `Change Repo`로 확인합니다.

### 제한 사항

- DM은 지원하지 않습니다.
- 현재는 GitHub 저장소만 지원합니다.
- 한 세션은 한 번에 하나의 PR만 만들 수 있습니다.
- 세션은 개인 Claude 플랜의 속도 제한을 사용합니다.
- Claude Code on the web 액세스가 필요합니다.
- 웹 액세스가 없으면 일반 Claude 채팅 응답만 받을 수 있습니다.

### 보안 참고

Slack 맥락은 신뢰 경계의 일부입니다.

- Claude는 스레드와 주변 채널 컨텍스트를 읽을 수 있으므로, 신뢰할 수 있는 대화에서만 사용해야 합니다.
- Claude는 초대된 채널에서만 응답하므로 채널 멤버십이 접근 제어 역할을 합니다.
- 비공개 채널도 지원되므로 노출 범위를 더 세밀하게 제한할 수 있습니다.
- 워크스페이스 관리자가 설치를 제어하며, Enterprise Grid에서는 조직 관리자가 어떤 워크스페이스에 앱을 허용할지 결정할 수 있습니다.
- Slack에서 만든 세션은 Claude Code on the web 기록에 남고, Team 또는 Enterprise에서는 조직에 보일 수 있습니다.

### 문제 해결

#### 세션이 시작되지 않음

- App Home에서 Claude 계정이 연결되어 있는지 확인합니다.
- Claude Code on the web 액세스가 켜져 있는지 확인합니다.
- GitHub 저장소가 최소 하나 연결되어 있는지 확인합니다.

#### 저장소가 보이지 않음

- Claude Code on the web에서 저장소를 연결합니다.
- GitHub 권한을 확인합니다.
- 필요하면 GitHub 연결을 끊었다가 다시 연결합니다.

#### 잘못된 저장소가 선택됨

- `Change Repo`를 사용합니다.
- 요청에 저장소 이름을 명시합니다.

#### 인증 오류

- App Home에서 Claude 연결을 끊었다가 다시 연결합니다.
- 브라우저가 올바른 Claude 계정으로 로그인되어 있는지 확인합니다.
- 현재 플랜에 Claude Code 액세스가 포함되어 있는지 확인합니다.

#### 세션이 만료됨

- `claude.ai/code`에서 과거 세션을 다시 열거나 이어서 작업할 수 있습니다.
- 전체 세션 기록은 웹에서 계속 접근할 수 있습니다.

### 관련 링크

- [공식 Slack 문서](https://code.claude.com/docs/ko/slack)
- [한국어 Slack 문서](https://code.claude.com/docs/ko/slack)
- [Claude Code on the web](https://claude.ai/code)
- [Slack App Marketplace](https://slack.com/apps)
- [Claude for Slack](https://support.claude.com)
- [Claude Code 개요](09-advanced-features.md)

---

<a id="09-advanced-features-29-terminal-configuration"></a>

## 09-29. Terminal Configuration

Claude Code는 여러 terminal에서 동작하지만, 실제 사용감은 terminal 설정에 크게 좌우됩니다. 이 가이드는 일상 사용에 가장 영향을 주는 항목만 다룹니다:

- 줄바꿈 입력
- notifications
- large input 처리
- fullscreen rendering으로의 handoff

### Themes and Appearance

Claude Code는 terminal application의 theme를 직접 바꾸지 않습니다. 다음은 terminal이 담당합니다:

- background / foreground colors
- font
- transparency
- terminal-level color theme

Claude Code 안에서 조절할 수 있는 항목은 따로 있습니다:

- `/config` 로 UI setting
- `/statusline` 으로 status line 설정

즉, 전역 appearance는 terminal theme로, Claude-specific behavior는 Claude Code settings로 제어하는 것이 맞습니다.

### Entering Line Breaks Reliably

전송하지 않고 줄바꿈만 넣는 방법은 여러 가지가 있습니다.

| Method | Notes |
|---|---|
| `\` then `Enter` | 어디서나 되는 빠른 escape |
| `Ctrl+J` | 어떤 terminal에서도 안정적인 line feed |
| `Shift+Enter` | iTerm2, WezTerm, Ghostty, Kitty에서 native 지원 |
| Custom keybinding | native 지원이 없는 terminal의 fallback |

#### `/terminal-setup`

실행:

```bash
/terminal-setup
```

이 command는 `Shift+Enter`를 수동 설정해야 하는 terminal에서 도움이 됩니다. 예:

- VS Code terminal
- Alacritty
- Zed
- Warp

`/terminal-setup`이 보이지 않는다면, 현재 terminal은 이미 기본 동작을 지원할 가능성이 큽니다.

#### macOS Terminal.app

`Option+Enter`를 더 유용하게 쓰려면:

1. `Settings -> Profiles -> Keyboard` 열기
2. `Use Option as Meta Key` 활성화

#### iTerm2

1. `Settings -> Profiles -> Keys` 열기
2. Meta-style 입력이 필요하면 left/right Option key를 `Esc+`로 설정

#### VS Code Terminal

macOS에서는 다음 setting이 도움이 됩니다:

```json
{
  "terminal.integrated.macOptionIsMeta": true
}
```

### Notifications

Claude Code는 작업을 마치고 다음 입력을 기다릴 때 notification event를 발생시킵니다. 이 알림을 어떻게 surface할지는 terminal setup에 달려 있습니다.

#### Native terminal notifications

지원이 좋은 편:

- Kitty
- Ghostty

iTerm2도 가능하지만 설정이 필요합니다:

1. `Settings -> Profiles -> Terminal` 열기
2. `Notification Center Alerts` 활성화
3. `Filter Alerts`에서 escape-sequence-generated alerts 허용

#### tmux passthrough

Claude Code가 tmux 안에서 실행되고 바깥 terminal이 notification을 지원한다면 passthrough를 허용합니다:

```tmux
set -g allow-passthrough on
```

이 설정이 없으면 바깥 terminal이 Claude의 notification sequence를 못 볼 수 있습니다.

#### Notification hooks

terminal-native notification이 불안정하면 hook를 사용합니다:

- 소리 재생
- desktop notification
- Slack 또는 다른 서비스로 알림

구체적인 패턴은 [Hook 가이드](06-hooks.md)를 참고하세요.

### Handling Large Inputs

긴 내용은 giant paste blob보다 file-based workflow가 훨씬 안전합니다.

권장 흐름:

1. 긴 내용을 파일에 저장
2. Claude에게 그 파일을 읽게 함
3. prompt box에는 짧고 타깃팅된 snippet만 붙임

좋은 예:

```bash
claude "Review the migration plan in docs/migration-plan.md"
```

```bash
cat logs/error.log | claude -p "Summarize the root cause"
```

파일 기반 접근이 가능할 때는 매우 긴 transcript나 code dump를 그대로 prompt box에 붙이지 않는 것이 좋습니다.

### Reduce Flicker and Memory Pressure

긴 세션에서 terminal이 불안정하다면 fullscreen rendering으로 넘깁니다:

```bash
CLAUDE_CODE_NO_FLICKER=1 claude
```

자세한 동작과 tradeoff는 [Fullscreen Rendering](09-advanced-features.md#09-advanced-features-15-fullscreen-rendering)을 참고하세요.

### Vim Mode

prompt 편집을 많이 하고 modal input을 선호한다면:

```bash
/config
```

또는 메인 advanced-features guide에 있는 Vim setting 경로를 사용합니다.

### Recommended Terminal Setups

#### Best out-of-the-box experience

- iTerm2
- WezTerm
- Ghostty
- Kitty

이쪽은 newline과 notification을 덜 손봐도 되는 편입니다.

#### Still workable, but likely to need tuning

- VS Code integrated terminal
- tmux
- Terminal.app

이런 환경에서는 보통 다음이 더 중요합니다:

- `/terminal-setup`
- fullscreen rendering
- 명시적인 notification configuration

### Try It Now

#### 1. Verify your newline workflow

Claude Code를 열고 다음을 테스트합니다:

- `Ctrl+J`
- `Shift+Enter`
- `Shift+Enter`가 안 되면 `/terminal-setup`

Expected result:

- prompt를 보내지 않고 줄바꿈만 넣을 수 있습니다

#### 2. Verify notifications

짧은 작업을 실행하고 Claude가 끝날 때까지 기다립니다.

Expected result:

- terminal-native notification이 뜨거나
- notification hook이 필요하다는 것을 확인합니다

### Related Guides

- [고급 기능 README](09-advanced-features.md)
- [Fullscreen Rendering](09-advanced-features.md#09-advanced-features-15-fullscreen-rendering)
- [Hook 가이드](06-hooks.md)
- [CLI 참조](10-cli.md)

### Official Reference

- https://code.claude.com/docs/ko/terminal-config

---

<a id="09-advanced-features-30-use-claude-code-in-vs-code"></a>

## 09-30. Use Claude Code in VS Code

VS Code 확장은 Claude Code의 핵심 기능을 IDE 안에서 자연스럽게 쓰고 싶을 때 가장 적합합니다. raw terminal만 쓸 때보다 editor-aware prompt, visible diff review, conversation management가 더 자연스럽습니다.

### What You Get in VS Code

확장은 VS Code 안에 Claude Code용 그래픽 surface를 추가합니다:

- 전용 Claude panel
- editor-aware prompts
- 파일과 폴더에 대한 `@` references
- 편집 전 side-by-side diff review
- tab 또는 window 단위의 여러 대화
- Claude Code settings 및 plugins와의 연동

즉, 완전히 다른 제품이 아니라 VS Code-native shell 위에서 돌아가는 Claude Code입니다.

### Prerequisites

설치 전에 다음을 확인합니다:

- 지원되는 VS Code build
- 확장에서 지원하는 로그인 또는 provider flow를 통한 Claude Code 접근

필요할 때는 VS Code integrated terminal에서 terminal-only Claude Code workflow도 계속 사용할 수 있습니다.

### Install the Extension

VS Code에서:

1. macOS는 `Cmd+Shift+X`, Windows/Linux는 `Ctrl+Shift+X`로 Extensions view를 엽니다
2. `Claude Code`를 검색합니다
3. 설치합니다

바로 보이지 않으면:

- VS Code를 재시작하거나
- `Developer: Reload Window`를 실행합니다

### Get Started

#### Open Claude

주요 진입점:

- editor toolbar의 Spark icon
- Activity Bar의 Spark icon
- Command Palette의 `Claude Code` command
- status bar의 Claude 항목

항상 보이는 쪽을 원하면 Activity Bar icon이 가장 안정적입니다.

#### Send a prompt

Claude는 editor selection context를 자동으로 봅니다. 현재 선택 영역을 명시적인 file-range reference로 넣고 싶다면:

- macOS: `Option+K`
- Windows/Linux: `Alt+K`

이렇게 하면 `@file#start-end` 형태의 reference를 prompt에 넣을 수 있습니다.

#### Review edits

Claude가 파일을 수정하려고 하면 VS Code는 side-by-side 비교 화면을 보여 주고, accept / reject / redirect를 선택하게 합니다.

이게 VS Code 확장의 가장 큰 장점 중 하나입니다. edit review가 IDE 문법에 맞게 동작합니다.

### Use the Prompt Box Well

Prompt box는 단순 텍스트 입력창보다 더 많은 역할을 합니다.

#### Permission modes

Prompt box의 mode controls로 현재 작업에서 Claude가 edit와 approval을 어떻게 다룰지 바꿀 수 있습니다.

#### Command menu

`/`를 입력하면 다음과 같은 command에 접근할 수 있습니다:

- model selection
- extended thinking
- usage views
- remote control
- MCP, hooks, memory, permissions, plugins 관련 command

#### Multi-line input

다음을 사용합니다:

- `Shift+Enter`로 전송 없이 줄바꿈

### Reference Files and Folders

명시적인 repo context를 주고 싶을 때는 `@` mention을 사용합니다.

예시:

```plaintext
Explain the logic in @src/auth
```

```plaintext
Review @server.ts#120-180
```

알아둘 점:

- fuzzy matching을 지원합니다
- 현재 editor selection은 자동으로 반영될 수 있습니다
- `Option+K` / `Alt+K`로 range reference를 직접 넣을 수 있습니다
- 첨부한 reference는 전송 전에 제거할 수 있습니다

### Resume Past Conversations

확장은 Claude panel 안에 conversation list를 유지합니다.

가능한 작업:

- 이전 세션 검색
- 로컬 세션 재개
- 세션 이름 변경
- 세션 제거

그래서 여러 작업을 병렬로 굴릴 때 raw terminal보다 VS Code가 더 편한 경우가 많습니다.

### Customize Your Workflow

#### Choose where Claude lives

Claude panel은 다음 위치에 둘 수 있습니다:

- 오른쪽 sidebar
- 왼쪽 sidebar
- editor area의 tab

메인 대화는 sidebar에 두고, side task는 tab으로 여는 방식이 실용적입니다.

#### Run multiple conversations

추가 세션은 다음으로 열 수 있습니다:

- 새 tab
- 새 window

각 대화는 독립된 context와 history를 가지므로, refactor / review / debugging을 분리하기 좋습니다.

#### Switch to terminal mode

CLI 스타일을 선호하면 extension의 terminal mode setting을 켜서 raw Claude Code와 비슷한 경험을 유지할 수 있습니다.

### Manage Plugins in VS Code

확장은 graphical plugin-management 흐름도 제공합니다.

할 수 있는 작업:

- plugin 설치
- enable / disable
- marketplace 관리
- install scope 선택

대표적인 scope:

- user
- project
- local

큰 plugin 변경 후에는 extension 쪽 reload 또는 restart가 필요한 경우가 있습니다.

### VS Code Commands and Shortcuts

유용한 extension-level command 예시는 다음과 같습니다:

| Command | Shortcut | What it does |
|---|---|---|
| Focus Input | `Cmd+Esc` / `Ctrl+Esc` | editor와 Claude 사이 포커스 전환 |
| Open in New Tab | `Cmd+Shift+Esc` / `Ctrl+Shift+Esc` | 새 대화 tab 시작 |
| New Conversation | `Cmd+N` / `Ctrl+N` when Claude is focused | 새 대화 시작 |
| Insert `@` reference | `Option+K` / `Alt+K` | 현재 파일/선택 영역 reference 삽입 |

주의할 점:

- 이것들은 VS Code extension command입니다
- terminal 전용 Claude Code command가 모두 같은 방식으로 노출되지는 않습니다

### Configure Settings

여기서는 두 가지 settings layer를 구분해서 생각해야 합니다.

#### VS Code extension settings

이 설정은 VS Code 안에서 확장 동작을 제어합니다. 예:

- panel placement
- UI defaults
- extension-specific workflow preferences

#### Claude Code settings

이 설정은 Claude Code 자체의 config 파일에 저장되며 CLI와 공유됩니다:

- allowed commands
- MCP configuration
- hooks
- environment variables
- output style

CLI와 extension에 공통으로 적용되는 동작을 원하면 extension-only setting이 아니라 Claude Code settings를 써야 합니다.

### VS Code Extension vs Claude Code CLI

둘은 경쟁 관계가 아니라 서로 장점이 다른 interface입니다.

#### Use the VS Code extension when you want:

- native diff review
- editor-aware prompting
- file / range references
- multi-tab conversation management
- 더 시각적인 plan review 흐름

#### Use the CLI in VS Code's terminal when you need:

- terminal-only commands
- `!` shell shortcuts
- raw CLI workflows
- 아직 extension UI에 노출되지 않은 동작

실제로는 둘을 같이 쓰는 사용자가 많습니다.

### Rewind with Checkpoints

Checkpoint 기반 rewind는 extension에서도 여전히 broader Claude Code workflow의 일부입니다. 동작 모델과 주의점은 전용 checkpoint guide를 참고하세요.

### Work with Git and External Tools

확장 안에서도 Claude Code의 다른 기능은 그대로 유효합니다:

- MCP integrations
- git workflows
- commit / PR preparation
- worktree 기반 병렬 작업

VS Code는 별도 product가 아니라 interface layer입니다.

### Security and Privacy Notes

CLI를 쓸 때와 같은 기준으로 extension도 다뤄야 합니다:

- 현재 permission mode 이해
- 제안된 edit 검토
- local CLI settings와 extension-only preference의 차이 이해
- plugins와 remote integration에 대한 주의

### Common Issues

#### Extension will not install

확인할 것:

- VS Code version
- window reload 여부
- extension 설치 완료 여부

#### Spark icon is missing

확인할 것:

- 파일이 열려 있는지
- panel이 다른 위치에 dock되어 있지 않은지
- Activity Bar icon이 있는지

#### Claude never responds

확인할 것:

- login state
- extension settings가 provider setup과 충돌하고 있지 않은지
- underlying Claude process가 정상적으로 시작되는지

### Try It Now

#### 1. Open Claude from the editor toolbar

코드 파일을 하나 열고 Spark icon을 눌러 현재 선택된 function을 설명해 달라고 요청합니다.

Expected result:

- selection context가 Claude에 전달됩니다
- raw terminal 대신 IDE-native response flow를 경험할 수 있습니다

#### 2. Insert a line-range reference

코드 블록을 선택한 뒤:

- macOS는 `Option+K`
- Windows/Linux는 `Alt+K`

Expected result:

- prompt에 정확한 file-and-range reference가 삽입됩니다

#### 3. Compare extension mode vs CLI mode

한 작업은 extension에서, 다른 작업은 VS Code integrated terminal의 Claude로 실행합니다.

Expected result:

- 그래픽 extension이 더 적합한 작업과 raw CLI가 더 적합한 작업을 구분할 수 있습니다

### Related Guides

- [고급 기능 README](09-advanced-features.md)
- [Settings System Guide](09-advanced-features.md#09-advanced-features-27-settings-system-guide)
- [Checkpoint 가이드](08-checkpoints.md)
- [CLI 참조](10-cli.md)
- [MCP 가이드](05-mcp.md)

### Official Reference

Claude Code docs navigation의 `Platforms and integrations -> Visual Studio Code`를 참고하세요.

---

<a id="09-advanced-features-31-claude-code-웹-시작하기"></a>

## 09-31. Claude Code 웹 시작하기

Claude Code 웹은 `claude.ai/code`에서 Anthropic 관리형 클라우드 인프라 위에 개발 세션을 띄우는 방식입니다. 노트북을 계속 켜 두지 않고 GitHub 저장소 기준으로 작업을 맡기고 싶을 때 가장 적합합니다.

### 언제 웹을 써야 하는가

다음이 필요하면 웹이 맞습니다.

- 접속을 끊어도 계속 진행되는 클라우드 세션
- 작업마다 분리된 세션과 브랜치
- 이슈나 알림 링크에서 바로 열 수 있는 브라우저 중심 흐름
- 여러 저장소에 공통으로 적용할 클라우드 환경

반대로 현재 로컬 체크아웃을 직접 만져야 하면 Desktop 로컬 세션이 더 적합하고, 설정과 도구를 가장 세밀하게 통제하려면 터미널 CLI가 맞습니다.

### 웹이 다른 실행 표면과 다른 점

공식 quickstart는 주요 표면을 다음처럼 구분합니다.

| 표면 | 코드 실행 위치 | 로컬 설정 사용 | GitHub 필요 여부 | 권한 모드 |
| --- | --- | --- | --- | --- |
| 웹 | Anthropic 클라우드 VM | 아니오, 저장소 기준 | 예, 단 `--remote` 번들 예외 존재 | `Auto accept edits`, `Plan` |
| Desktop 로컬 세션 | 사용자 머신 | 예 | 아니오 | 세션 유형에 따라 다름 |
| 터미널 CLI | 사용자 머신 | 예 | 아니오 | 로컬 전체 모드 |

공식 문서 기준 핵심 제약:

- 웹 세션은 기본적으로 기존 GitHub 저장소를 기준으로 동작합니다.
- 각 작업은 독립 세션과 독립 브랜치를 사용합니다.
- 클라우드 세션에는 `Ask permissions`, `Auto mode`, `Bypass permissions`가 없습니다.
- 네트워크 접근은 내 컴퓨터가 아니라 선택한 클라우드 환경이 결정합니다.

### 1회 설정

#### 1. `claude.ai/code`에 로그인

`https://claude.ai/code`를 열고 Anthropic 계정으로 로그인합니다.

#### 2. GitHub 연결

Claude GitHub App을 설치하고 Claude가 접근할 저장소를 승인합니다. 새 프로젝트를 웹에서 바로 시작하려면 먼저 GitHub에 빈 저장소를 만들어 두는 편이 안전합니다.

#### 3. 클라우드 환경 생성

환경은 Claude가 어디까지 접근할 수 있는지와 세션 시작 시 무엇을 실행할지를 정의합니다.

공식 quickstart가 강조하는 핵심 항목:

- `Name`: 환경 표시 이름
- `Network access`: 세션의 외부 네트워크 접근 범위
- `Setup script`: 세션 시작 전에 실행할 준비 스크립트
- 환경 변수 등 환경 화면에서 지정하는 실행 설정

기본 trusted 네트워크 프로필은 일반 인터넷 전체를 열지 않고도 주요 패키지 레지스트리에는 접근할 수 있게 설계되어 있습니다. 따라서 설치, 빌드, 생성 단계는 setup script 안에서 명시적으로 보장하는 것이 좋습니다.

### 첫 세션 시작

#### 1. 저장소 선택

하나 이상의 GitHub 저장소를 선택합니다. Claude는 작업 시작 전에 이를 클라우드 세션으로 clone합니다.

#### 2. 권한 모드 선택

웹 quickstart는 현재 두 가지 모드를 기준으로 설명합니다.

- `Auto accept edits`: 파일 수정과 브랜치 푸시를 승인 대기 없이 진행
- `Plan`: 수정 전에 접근 방식을 먼저 제안

웹 클라우드 세션은 자율 실행을 전제로 하므로 로컬 세션의 `Ask permissions` 같은 모드는 제공하지 않습니다.

#### 3. 프롬프트를 구체적으로 작성

공식 가이드는 파일명이나 함수명을 명시하고, 필요하면 오류를 붙이고, 증상만이 아니라 기대 동작을 설명하라고 권합니다.

좋은 예시:

- `tests/test_auth.py`의 실패 테스트를 고치고 원인을 설명해줘
- 로컬 개발 방법을 담은 `README`를 추가해줘
- `api/schema.ts` 계약에 맞게 로그인 폼 검증을 수정해줘

#### 4. 세션 결과 검토

제출 후 Claude는 다음 순서로 진행합니다.

1. 선택한 저장소 clone
2. 설정된 setup script 실행
3. 새 클라우드 세션 시작
4. 작업 전용 브랜치에서 작업

즉, 하나의 작업이 끝날 때까지 기다리지 않고도 별도 세션으로 다음 작업을 바로 시작할 수 있습니다.

### 외부 도구에서 세션 미리 채우기

공식 문서는 `claude.ai/code` URL 쿼리 파라미터로 prompt, repositories, environment를 미리 채울 수 있다고 설명합니다. 이 기능은 이슈 트래커, 내부 운영 도구, 버그 리포터와 연결할 때 특히 유용합니다.

전형적인 패턴:

- Claude Code 웹 링크 생성
- 이슈 본문이나 알림 내용을 프롬프트로 미리 삽입
- 대상 저장소와 환경을 선선택

이렇게 하면 사람이 매번 같은 초기 설정을 반복하지 않아도 됩니다.

### 운영 관점 조언

#### 먼저 환경을 설계하라

웹 세션 실패 원인은 대체로 setup script 누락, 비밀값 누락, 네트워크 범위 오설정입니다. 실제 운영 전에는 최소한 다음을 검증하는 편이 좋습니다.

- 의존성 설치
- 테스트 및 빌드 전제조건
- 환경 변수
- 외부 네트워크 규칙

#### 자율 실행을 전제로 프롬프트를 작성하라

웹 세션은 범위가 분명하고 성공 조건이 명시된 작업에 강합니다. 원하는 결과물, 수정 대상, 제약, 검증 기준을 함께 써야 품질이 안정됩니다.

#### 세션은 항상 일회성 환경으로 보라

로컬에서 이미 만들어 둔 캐시, 생성물, 임시 파일을 기대하면 안 됩니다. 필요한 것은 저장소나 setup script 안으로 끌어와야 합니다.

### 자주 생기는 오해

#### "내 로컬 Claude 설정을 그대로 쓴다"

아닙니다. 공식 비교 표는 웹 세션이 로컬 설정이 아니라 저장소와 클라우드 환경을 기준으로 동작한다고 분명히 말합니다.

#### "GitHub 없이도 일반적으로 쓸 수 있다"

대체로 아닙니다. 표준 웹 흐름은 GitHub 연결 저장소를 전제로 합니다. `--remote` 번들 같은 예외 흐름은 별도입니다.

#### "로컬과 같은 권한 모드가 다 있다"

아닙니다. 웹은 로컬 CLI나 Desktop 로컬 세션보다 좁은 권한 모델을 사용합니다.

### 공식 참고 문서

- Web quickstart: `https://code.claude.com/docs/ko/web-quickstart`
- Claude Code overview: `https://code.claude.com/docs/en`
- 비교용 Desktop quickstart: `https://code.claude.com/docs/ko/desktop-quickstart`
