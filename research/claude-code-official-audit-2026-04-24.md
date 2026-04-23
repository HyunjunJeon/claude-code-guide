# Claude Code 공식 문서/릴리즈 노트/Anthropic Blog 대조 조사

기준일: 2026-04-24

## 기준 소스

- 공식 문서 sitemap: https://code.claude.com/docs/sitemap.xml
- 공식 문서 overview: https://code.claude.com/docs/en/overview
- 공식 changelog: https://code.claude.com/docs/en/changelog
- 최신 weekly digest:
  - https://code.claude.com/docs/en/whats-new/2026-w13
  - https://code.claude.com/docs/en/whats-new/2026-w14
  - https://code.claude.com/docs/en/whats-new/2026-w15
- 운영/보안/설정 관련 공식 문서:
  - https://code.claude.com/docs/en/admin-setup
  - https://code.claude.com/docs/en/third-party-integrations
  - https://code.claude.com/docs/en/analytics
  - https://code.claude.com/docs/en/costs
  - https://code.claude.com/docs/en/security
  - https://code.claude.com/docs/en/legal-and-compliance
  - https://code.claude.com/docs/en/auto-mode-config
  - https://code.claude.com/docs/en/model-config
  - https://code.claude.com/docs/en/debug-your-config
  - https://code.claude.com/docs/en/plugin-dependencies
  - https://code.claude.com/docs/en/plugins-reference
  - https://code.claude.com/docs/en/remote-control
  - https://code.claude.com/docs/en/jetbrains
  - https://code.claude.com/docs/en/headless
- Anthropic/Claude 블로그 및 엔지니어링 글:
  - https://code.claude.com/docs/en/best-practices
  - https://claude.com/blog/how-anthropic-teams-use-claude-code
  - https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously
  - https://www.anthropic.com/engineering/claude-code-sandboxing
  - https://www.anthropic.com/engineering/claude-code-auto-mode
  - https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
  - https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  - https://www.anthropic.com/engineering/built-multi-agent-research-system
  - https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk
  - https://www.anthropic.com/research/building-effective-agents
  - https://claude.com/blog/code-review
  - https://claude.com/blog/introducing-routines-in-claude-code
  - https://www.anthropic.com/news/claude-code-on-the-web

## 총평

현재 `ko/` 문서는 큰 뼈대는 이미 잘 잡혀 있습니다.  
특히 slash commands, memory, skills, subagents, MCP, hooks, checkpoints, CLI, deployment/admin, Agent SDK 축은 책의 기본 골격으로 충분합니다.

다만 2026년 4월 기준 공식 문서와 비교하면 다음 3가지가 약합니다.

1. 운영자/조직 배포 문서의 체계화
2. 설정/권한/자동화 세부 레퍼런스의 분리
3. 최근 릴리즈 기능과 Anthropic 내부 운영 노하우의 반영

즉, "틀린 책"은 아닙니다.  
지금은 "핵심은 맞는데 최신 공식 문서 지형과 1:1 대응은 아직 부족한 상태"로 보는 게 정확합니다.

## 현재 강한 영역

다음은 이미 공식 문서의 핵심 영역을 상당히 잘 커버합니다.

- `01-slash-commands`
- `02-memory`
- `03-skills`
- `04-subagents`
- `05-mcp`
- `06-hooks`
- `08-checkpoints`
- `10-cli`
- `11-deployment-admin`
- `12-agent-sdk`

특히 최근 기능 중에서도 다음은 이미 어느 정도 반영되어 있습니다.

- `/ultraplan`
- `/powerup` 명령 존재
- computer use
- PowerShell tool 언급
- `managed-settings.d/`
- `PermissionDenied`, `CwdChanged`, `FileChanged` hook
- remote control 개념
- voice dictation / keybindings / statusline의 기초 언급

## 부분 커버된 항목

아래는 공식 문서에는 독립 페이지가 있는데, 현재는 다른 문서 안에 흡수되어 있거나 설명이 얕은 항목입니다.

| 공식 주제 | 현재 상태 | 로컬 위치 |
| --- | --- | --- |
| Permission modes / Permissions / Sandboxing / Security / Settings | 한데 묶여 있음 | `09-advanced-features/permissions-and-security.md`, `09-advanced-features/configuration.md`, `09-advanced-features/settings-system-guide.md` |
| Platforms / Chrome / Remote Control / Web / Desktop / VS Code | 일부만 통합 설명 | `09-advanced-features/platforms.md`, `09-advanced-features/claude-code-on-the-web.md`, `09-advanced-features/desktop*.md`, `09-advanced-features/vscode.md` |
| Keybindings / Voice dictation / Statusline | 명령/섹션 수준 언급 | `09-advanced-features/session-and-interaction.md`, `09-advanced-features/terminal-configuration.md`, `01-slash-commands/README.md` |
| Headless -> programmatic mode | print mode 설명은 있음 | `09-advanced-features/execution-modes.md`, `10-cli/README.md` |
| Plugin marketplaces | 일부 설명만 있음 | `07-plugins/README.md`, `09-advanced-features/github-enterprise-server.md` |
| Auto mode | 개념 설명은 있음, 설정 문서 부족 | `09-advanced-features/execution-modes.md`, `09-advanced-features/best-practices.md` |
| Fast mode | 명령/설정 수준 언급 | `01-slash-commands/README.md`, `10-cli/README.md`, `09-advanced-features/settings-system-guide.md` |

## 명확히 부족하거나 없는 항목

### P0: 메인 모듈에 바로 넣어야 하는 항목

이 항목들은 공식 문서 기준으로 독립 주제성이 있고, 현재 책에서도 빠진 티가 납니다.

#### 운영/조직 배포

- `admin-setup`
- `third-party-integrations`
- `analytics`
- `costs`
- `security`
- `legal-and-compliance`

권장 위치:

- `11-deployment-admin` 메인 페이지에 먼저 통합
- 이후 필요하면 하위 문서로 분리

#### 설정/디버깅/모델

- `auto-mode-config`
- `model-config`
- `debug-your-config`

권장 위치:

- `09-advanced-features` 메인 페이지에 1차 통합

#### Plugins

- `plugin-dependencies`
- `plugins-reference`
- `plugin-marketplaces` 독립 설명 강화

권장 위치:

- `07-plugins` 메인 페이지에 우선 통합

#### 플랫폼/IDE

- `jetbrains`

권장 위치:

- `09-advanced-features`에 "IDE 통합" 섹션 추가

### P1: 공식 문서는 독립 페이지인데 현재는 얕거나 흩어진 항목

- `remote-control`
- `keybindings`
- `statusline`
- `voice-dictation`
- `channels` (현재 `channels-reference`만 강함)
- `headless` / programmatic mode 설명 정리

이 항목들은 당장 새 파일로 쪼개지 않아도 됩니다.  
현재 사용자 요구대로라면 우선 메인 모듈 페이지에 subsection으로 흡수해도 충분합니다.

### P2: 최신 릴리즈 기준으로 아직 반영 약한 항목

특히 `What's New` 2026년 13~15주차 기준으로 아래는 보강 필요합니다.

- Monitor tool
- `/team-onboarding`
- `/autofix-pr`
- PR auto-fix on web
- transcript search
- MCP tool별 결과 크기 override
- plugin `bin/` executables on `PATH`

현재 확인 기준으로는 위 항목들이 `ko/` 문서에서 거의 직접적으로 설명되지 않거나, 있어도 실전 사용법 수준까지는 올라오지 않았습니다.

## 최근 릴리즈 노트 기준 판단

### 이미 반영된 쪽

- auto mode 개념
- computer use
- Ultraplan
- PowerShell tool
- `managed-settings.d/`
- hook 이벤트 확장 일부

### 아직 보강이 필요한 쪽

- Week 13 (2026-03-23 ~ 2026-03-27)
  - transcript search
  - PR auto-fix on web
- Week 14 (2026-03-30 ~ 2026-04-03)
  - Monitor tool과는 별개인 `/powerup`은 명령만 있고 기능 설명은 약함
  - MCP result-size override
  - plugin executables on `PATH`
- Week 15 (2026-04-06 ~ 2026-04-10)
  - Monitor tool
  - `/team-onboarding`
  - `/autofix-pr`

## Anthropic Blog / Engineering 글을 반영하는 방식

블로그 글은 전부 본문으로 가져오면 책이 산만해집니다.  
다음처럼 "부록"으로 묶는 게 맞습니다.

### 부록 A: Anthropic 내부 실전 운영 패턴

다음 글을 바탕으로 "실무에서 Claude Code를 어떻게 굴리는가"를 정리합니다.

- Best Practices for Claude Code
- How Anthropic teams use Claude Code
- Claude Code on the web
- Code Review
- Introducing routines in Claude Code

추천 부록 내용:

- 팀 온보딩 패턴
- 병렬 세션 운용 방식
- 문서/CLAUDE.md를 지속적으로 개선하는 루프
- 비개발 직군 활용 사례
- PR/CI 자동화 운영 방식

### 부록 B: 자율성/안전/거버넌스

- Enabling Claude Code to work more autonomously
- Beyond permission prompts: making Claude Code more secure and autonomous
- Claude Code auto mode: a safer way to skip permissions

추천 부록 내용:

- permission mode 선택 기준
- sandbox와 auto mode의 차이
- bypass permissions를 언제 금지해야 하는지
- 조직 정책과 개인 설정의 경계

### 부록 C: 에이전트 설계 원리

- Building effective agents
- Effective context engineering for AI agents
- Equipping agents for the real world with Agent Skills
- How we built our multi-agent research system
- Building agents with the Claude Agent SDK

추천 부록 내용:

- 단일 에이전트 vs 다중 에이전트
- context engineering 핵심 원칙
- skill이 필요한 경우와 hook/MCP/subagent와의 경계
- Claude Code를 "코딩 도구" 이상으로 쓰는 방식

### 부록 D: 생각/계획/검증 철학

- The "think" tool: Enabling Claude to stop and think

추천 부록 내용:

- plan mode / extended thinking을 실무에서 어떻게 구분할지
- 긴 작업을 맡길 때 검증 루프를 어떻게 설계할지

## 추천 반영 순서

### 1차: 메인 모듈 보강

서브 페이지를 늘리지 말고, 기존 메인 페이지에 다음 섹션을 먼저 추가합니다.

#### `09-advanced-features`

- auto mode config
- model config
- remote control
- keybindings
- voice dictation
- statusline
- channels guide
- JetBrains
- fast mode
- Monitor tool / `/team-onboarding` / `/autofix-pr` 간단 정리

#### `11-deployment-admin`

- admin setup
- third-party integrations overview
- analytics
- costs
- security
- legal and compliance

#### `07-plugins`

- plugin marketplaces
- plugin dependencies
- plugins reference

#### `10-cli` / `12-agent-sdk`

- headless -> programmatic mode rename 반영
- Agent SDK quickstart 성격의 입문 섹션 보강

### 2차: 부록 모듈 신설

위키독스용으로는 나중에 `13-appendix` 같은 모듈을 추가하는 편이 자연스럽습니다.

권장 초안:

- `13-appendix/anthropic-best-practices.md`
- `13-appendix/how-anthropic-teams-use-claude-code.md`
- `13-appendix/autonomy-safety-notes.md`
- `13-appendix/context-engineering-notes.md`
- `13-appendix/multi-agent-patterns.md`
- `13-appendix/routines-and-code-review.md`

### 3차: 릴리즈 유지보수 체계

공식 changelog는 너무 길고, weekly digest는 실제로 중요한 것만 뽑아 줍니다.  
그래서 유지보수는 아래 기준이 좋습니다.

- 주간: `What's New` 확인
- 월간: changelog 훑어서 빠진 항목만 보강
- 분기별: Anthropic Blog/Engineering 글에서 appendix 거리 추가

## 결론

현재 책은 폐기할 수준이 아니라, "핵심 구조는 좋고 최신 공식 문서 대응을 보강해야 하는 상태"입니다.

가장 먼저 손봐야 할 것은 다음입니다.

1. `11-deployment-admin` 운영 문서군 보강
2. `09-advanced-features`의 설정/자동화/입력/원격 제어 세부화
3. `07-plugins`의 marketplace/dependency/reference 보강
4. Anthropic Blog 기반 부록 모듈 설계

이 순서로 가면 메인 본문을 먼저 안정화한 뒤, 부록은 나중에 확장할 수 있습니다.
