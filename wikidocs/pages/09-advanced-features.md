Plan mode, extended thinking, auto mode, background tasks, 권한 모드, print mode(비대화형), 세션 관리, 대화형 기능, channel, 음성 입력, remote control, 웹 세션, 데스크톱 앱, task list, 프롬프트 제안, git worktree, sandboxing, 관리형 설정, 그리고 구성을 포함하는 Claude Code의 고급 기능에 대한 종합 가이드입니다.

[TOC]

## 언제 읽으면 좋은가

- 기본 명령과 메모리, 스킬, MCP를 이미 한 번 써봤을 때
- 장시간 작업이나 자동화를 안정적으로 굴리고 싶을 때
- 팀 환경에서 권한, sandbox, 관리형 설정 같은 운영 감각을 잡고 싶을 때
- 음성, 데스크톱, 웹, 원격 제어처럼 다양한 채널에서 Claude Code를 쓰고 싶을 때

**관련 가이드:**

- [How Claude Code Works](https://wikidocs.net/345346)
- [Features Overview](https://wikidocs.net/345347)
- [`.claude` 디렉터리 살펴보기](https://wikidocs.net/345698)
- [컨텍스트 윈도우 살펴보기](https://wikidocs.net/345699)
- [공통 워크플로](https://wikidocs.net/345348)
- [모범 사례](https://wikidocs.net/345349)
- [Settings System Guide](https://wikidocs.net/345696)
- [Output Styles](https://wikidocs.net/345357)
- [Fullscreen Rendering](https://wikidocs.net/345679)
- [Terminal Configuration](https://wikidocs.net/345700)
- [Channels Reference](https://wikidocs.net/345693)
- [Computer Use](https://wikidocs.net/345692)
- [Slack의 Claude Code](https://wikidocs.net/345688)
- [Use Claude Code in VS Code](https://wikidocs.net/345687)
- [Claude Code 웹 시작하기](https://wikidocs.net/345683)
- [웹에서 Claude Code 사용하기](https://wikidocs.net/345684)
- [Claude Code Desktop](https://wikidocs.net/345686)
- [Desktop Quickstart](https://wikidocs.net/345685)
- [Desktop Scheduled Tasks](https://wikidocs.net/345678)
- [Routines](https://wikidocs.net/345677)
- [Code Review](https://wikidocs.net/345676)
- [GitHub Actions](https://wikidocs.net/345689)
- [GitHub Enterprise Server](https://wikidocs.net/345691)
- [GitLab CI/CD](https://wikidocs.net/345690)

## 목차

1. [개요](#개요)
2. [How Claude Code Works](https://wikidocs.net/345346)
3. [Features Overview](https://wikidocs.net/345347)
4. [`.claude` 디렉터리 살펴보기](https://wikidocs.net/345698)
5. [컨텍스트 윈도우 살펴보기](https://wikidocs.net/345699)
6. [플래닝 모드 & 확장 사고](https://wikidocs.net/345674)
7. [실행 모드](https://wikidocs.net/345673) — Auto Mode, Background Tasks, Scheduled Tasks, Headless Mode
8. [권한 & 보안](https://wikidocs.net/345697) — 권한 모드, Sandboxing
9. [세션 & 인터랙션](https://wikidocs.net/345358) — 세션 관리, 대화형 기능, 음성 입력, Task List, 프롬프트 제안
10. [공통 워크플로](https://wikidocs.net/345348)
11. [모범 사례](https://wikidocs.net/345349)
12. [플랫폼 & 통합](https://wikidocs.net/345681) — Chrome 통합, Remote Control, 웹 세션, 데스크톱 앱, Git Worktree
13. [Claude Code 웹 시작하기](https://wikidocs.net/345683)
14. [웹에서 Claude Code 사용하기](https://wikidocs.net/345684)
15. [Claude Code Desktop](https://wikidocs.net/345686)
16. [Desktop Quickstart](https://wikidocs.net/345685)
17. [Desktop Scheduled Tasks](https://wikidocs.net/345678)
18. [Routines](https://wikidocs.net/345677)
19. [Computer Use](https://wikidocs.net/345692)
20. [Slack의 Claude Code](https://wikidocs.net/345688)
21. [Code Review](https://wikidocs.net/345676)
22. [GitHub Actions](https://wikidocs.net/345689)
23. [GitHub Enterprise Server](https://wikidocs.net/345691)
24. [GitLab CI/CD](https://wikidocs.net/345690)
25. [Configuration](https://wikidocs.net/345695)
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

전체 빌더 지향 참조는 [Channels Reference](https://wikidocs.net/345693)를 참조하세요.

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

[[TIP("참고")]]
Agent Teams는 실험적 기능이며 향후 릴리스에서 변경될 수 있습니다. 전체 참조는 [code.claude.com/docs/ko/agent-teams](https://code.claude.com/docs/ko/agent-teams)를 참조하세요.
[[/TIP]]

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
- [Settings System Guide](https://wikidocs.net/345696) - scope, precedence, settings file의 실제 동작 정리
- [Output Styles](https://wikidocs.net/345357) - built-in style, custom style, 비교 기준 정리
- [Fullscreen Rendering](https://wikidocs.net/345679) - flicker 감소와 alternate-screen 동작 정리
- [Terminal Configuration](https://wikidocs.net/345700) - 줄바꿈, notifications, tmux 관련 설정 정리
- [Channels Reference](https://wikidocs.net/345693) - channel 기반 event stream의 builder-oriented 가이드
- [Use Claude Code in VS Code](https://wikidocs.net/345687) - VS Code 확장 중심 IDE workflow 가이드
- [Checkpoint 가이드](https://wikidocs.net/345666) - 세션 관리 및 rewind
- [Slash Command](https://wikidocs.net/345351) - 명령어 참조
- [메모리 가이드](https://wikidocs.net/345360) - 영구 컨텍스트
- [Skill 가이드](https://wikidocs.net/345381) - 자율 기능
- [Subagent 가이드](https://wikidocs.net/345414) - 위임 작업 실행
- [MCP 가이드](https://wikidocs.net/345445) - 외부 데이터 접근
- [Hook 가이드](https://wikidocs.net/344613) - 이벤트 기반 자동화
- [Plugin 가이드](https://wikidocs.net/345638) - 번들 확장
- [공식 Scheduled Tasks 문서](https://code.claude.com/docs/ko/scheduled-tasks)
- [공식 Chrome 통합 문서](https://code.claude.com/docs/ko/chrome)
- [공식 Remote Control 문서](https://code.claude.com/docs/ko/remote-control)
- [공식 키 바인딩 문서](https://code.claude.com/docs/ko/keybindings)
- [공식 데스크톱 앱 문서](https://code.claude.com/docs/ko/desktop)
- [공식 Agent Teams 문서](https://code.claude.com/docs/ko/agent-teams)
