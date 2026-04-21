# Claude Code Guide Book 검증 보고서

- 검증 일시: 2026-04-21
- 검증 대상: `/Users/jhj/Desktop/personal/claude-code-guide-book`
- 검증 기준: 현재 저장소 산출물 + 공식 Claude Code 문서(2026-04-20 기준 문서 맵)

## 1. 최종 판정

**판정 요약**

- 핵심 기능 학습용 가이드북으로서는 **상당히 잘 구성되어 있음**
- 그러나 현재 상태를 두고 "Claude Code의 모든 내용을 적절하게 담고 있다"고 **검증 통과시키기는 어려움**
- 따라서 완전성 기준의 검증 결과는 **불합격**
- 다만 "Claude Code의 주요 기능 영역을 폭넓게 다루는 실전 가이드"라는 표현은 **유효**

핵심 이유는 공식 Claude Code 문서 범위가 현재 저장소의 10개 모듈 범위를 넘어섰기 때문입니다. 공식 문서 맵은 `Getting started`, `Core concepts`, `Use Claude Code`, `Platforms and integrations`, `Agents`, `Tools and plugins`, `Automation`, `Troubleshooting`, `Deployment`, `Administration`, `Configuration`, `Reference`, `Agent SDK`, `What's New`, `Resources`까지 포함합니다.

공식 기준:

- Claude Code docs map: https://code.claude.com/docs/ko/claude_code_docs_map
- Overview: https://code.claude.com/docs/en
- Quickstart: https://code.claude.com/docs/ko/quickstart

## 2. 이번 검증에서 확인한 현재 상태

### 저장소 범위

현재 저장소는 루트 기준 **10개 모듈 체계**로 정리되어 있습니다.

- `01-slash-commands`
- `02-memory`
- `03-skills`
- `04-subagents`
- `05-mcp`
- `06-hooks`
- `07-plugins`
- `08-checkpoints`
- `09-advanced-features`
- `10-cli`

근거:

- [README.md](/Users/jhj/Desktop/personal/claude-code-guide-book/README.md:9)
- [src/lib/content.ts](/Users/jhj/Desktop/personal/claude-code-guide-book/src/lib/content.ts:30)

문서 수 기준으로는 영문 46페이지, 한글 46페이지가 정적 사이트에 연결되어 있습니다.

### 빌드/검증 상태

- `npm run lint` 통과
- `npm run build` 통과
- 정적 페이지 99개 생성 확인
- EPUB 관련 Python 테스트 30개 통과

검증 중 관찰한 부가 사항:

- Next.js 빌드는 성공했지만 `src/lib/content.ts`의 동적 파일 시스템 접근 때문에 Turbopack NFT 경고 1건이 발생했습니다.
- `uv run --project scripts pytest tests` 방식은 패키징 설정과 충돌해 실패했습니다.
- 대신 [scripts/README.md](/Users/jhj/Desktop/personal/claude-code-guide-book/scripts/README.md:87)에 적힌 `uv run --with ... pytest scripts/tests/ -v` 방식으로는 30개 테스트가 모두 통과했습니다.

## 3. 범주별 검증 결과

| 공식 문서 범주 | 판정 | 메모 |
|---|---|---|
| Getting started | 부분 충족 | 루트 README와 CLI 문서에 설치/로그인 단편은 있으나, 공식 `Quickstart`/`Changelog` 수준의 독립 가이드는 없음 |
| Core concepts | 부분 충족 | Memory, Skills, Subagents 등은 강함. 하지만 `How Claude Code works`, `.claude directory`, `context window`에 대응하는 독립 문서가 없음 |
| Use Claude Code | 부분 충족 | Memory, permission mode, workflows 일부는 존재. 하지만 공식 문서의 사용 패턴 전체를 체계적으로 매핑한 구조는 아님 |
| Platforms and integrations | 부분 충족 | Chrome, Remote Control, Web, Desktop, VS Code는 있음. JetBrains, Slack, Computer use는 빠져 있음 |
| Agents / Tools / Plugins / Automation | 강함 | Skills, Subagents, MCP, Hooks, Plugins, Channels, CLI 관련 실전 문서는 잘 정리됨 |
| Troubleshooting | 약함 | 개별 페이지 안의 소규모 트러블슈팅은 있으나, 공식 수준의 통합 문제 해결 섹션은 없음 |
| Deployment | 약함 | Bedrock/Vertex/Foundry/LLM gateway/devcontainer/network config에 대한 독립 가이드가 없음 |
| Administration | 약함 | Managed settings 일부는 있으나 setup/auth/security/data usage/zero retention/monitoring/costs/analytics 전반은 미흡 |
| Configuration | 부분~강함 | permissions, terminal, fullscreen, output styles, settings-system은 잘 되어 있음 |
| Reference | 부분 충족 | CLI, commands, hooks, channels, checkpoints는 강함. tools reference / env vars / interactive mode 전면 대응은 부족 |
| Agent SDK | 미충족 | 독립 문서 또는 모듈이 없음 |
| What's New / Resources | 미충족 | 공식 변경사항 추적용 문서가 현재 사용자-facing 산출물로는 없음 |

## 4. 주요 검증 실패 사유

### 4.1 공식 문서 범위 대비 저장소 범위가 더 좁음

공식 문서 맵은 현재 Claude Code를 단순 기능 설명이 아니라 다음 계층까지 포함해 다룹니다.

- 설치/로그인/빠른 시작
- 플랫폼별 사용
- 운영/배포/관리
- 참조 문서
- Agent SDK

반면 현재 저장소는 10개 기능형 모듈 중심 구조입니다. 이 구조는 교육용으로는 좋지만, 공식 문서 전체 범위를 모두 수용하는 구조는 아닙니다.

근거:

- 공식 문서 맵: https://code.claude.com/docs/ko/claude_code_docs_map
- 루트 모듈 구조: [README.md](/Users/jhj/Desktop/personal/claude-code-guide-book/README.md:9)

### 4.2 저장소 내부 문서도 아직 "빠진 공식 항목"을 인정하고 있음

프로젝트 내부 운영 문서 자체가 strong claim을 금지하고 있으며, 누락 항목으로 다음을 명시합니다.

- `Computer use`
- `JetBrains IDEs`
- `Claude Code in Slack`

근거:

- [docs/PARITY-OPERATIONS.md](/Users/jhj/Desktop/personal/claude-code-guide-book/docs/PARITY-OPERATIONS.md:53)

또한 작업 목록에서도 VS Code만 먼저 반영하고, JetBrains와 Slack은 후속 작업으로 남겨두고 있습니다.

- [docs/TASKS-20260401.md](/Users/jhj/Desktop/personal/claude-code-guide-book/docs/TASKS-20260401.md:287)

공식 문서 기준:

- JetBrains IDEs: https://code.claude.com/docs/ko/jetbrains
- Claude Code in Slack: https://code.claude.com/docs/ko/slack
- Computer use: https://code.claude.com/docs/ko/computer-use

### 4.3 공개 문구가 현재 패리티 상태보다 강함

프로젝트 운영 문서는 패리티 게이트가 통과되지 않았을 때 "모든 기능", "complete coverage" 같은 표현을 쓰지 말라고 명시합니다. 그런데 실제 사이트 설명은 다음과 같이 더 강한 문구를 사용합니다.

> Claude Code의 모든 기능을 마스터하기 위한 실전 가이드

근거:

- 금지 기준: [docs/PARITY-OPERATIONS.md](/Users/jhj/Desktop/personal/claude-code-guide-book/docs/PARITY-OPERATIONS.md:65)
- 현재 설명: [src/lib/config.tsx](/Users/jhj/Desktop/personal/claude-code-guide-book/src/lib/config.tsx:24)

이 표현은 현재 검증 결과와 충돌합니다.

### 4.4 패리티 운영 체계의 "근거 파일"이 실제 워크트리에 없음

`docs/PARITY-OPERATIONS.md`는 패리티 소스 오브 트루스로 `.omx/plans/claude-code-feature-doc-coverage-matrix-20260409.md`를 가리키고 있습니다. 그러나 현재 워크트리에는 `.omx/` 자체가 없습니다.

근거:

- 참조 위치: [docs/PARITY-OPERATIONS.md](/Users/jhj/Desktop/personal/claude-code-guide-book/docs/PARITY-OPERATIONS.md:12)
- 실제 상태: `.omx` 디렉터리 부재 확인

즉, "완전성 검증"을 재현 가능하게 만드는 핵심 매트릭스가 저장소에 없습니다. 이 상태에서는 검증 프로세스 자체가 끊겨 있습니다.

### 4.5 Agent SDK와 운영/배포 문서군이 사실상 비어 있음

공식 문서는 이제 Claude Code 자체뿐 아니라 Agent SDK를 독립 축으로 다루고 있습니다. SDK는 overview, sessions, tools, hooks, permissions, skills, plugins, cost tracking, observability, TypeScript/Python 레퍼런스까지 별도 체계를 가집니다.

공식 기준:

- Agent SDK overview: https://code.claude.com/docs/ko/agent-sdk/overview

현재 저장소에는 이에 대응하는 모듈 또는 독립 문서군이 없습니다. 같은 맥락으로 Deployment / Administration 범주도 부족합니다.

공식 예시:

- Amazon Bedrock: https://code.claude.com/docs/ko/amazon-bedrock
- Server-managed settings: https://code.claude.com/docs/ko/server-managed-settings
- Monitoring usage: https://code.claude.com/docs/ko/monitoring-usage
- Troubleshooting: https://code.claude.com/docs/ko/troubleshooting
- Tools reference: https://code.claude.com/docs/ko/tools-reference
- Environment variables: https://code.claude.com/docs/ko/env-vars
- Interactive mode: https://code.claude.com/docs/ko/interactive-mode

## 5. 별도 확인된 문서/운영 이슈

### 5.1 로컬 개발 안내가 현재 앱 구조와 어긋남

루트 README는 사이트 개발 절차를 `cd template && npm install && npm run dev`로 안내합니다. 하지만 현재 실제 앱은 루트의 `package.json`, `src/`, `public/`, `next.config.ts`를 기준으로 빌드되고 있습니다.

근거:

- 개발 안내: [README.md](/Users/jhj/Desktop/personal/claude-code-guide-book/README.md:24)
- 실제 앱 엔트리: [package.json](/Users/jhj/Desktop/personal/claude-code-guide-book/package.json:1)

즉, 검증 관점에서 README의 개발 가이드는 최신 상태가 아닐 가능성이 높습니다.

### 5.2 테스트 실행 경로에 혼동 여지 있음

Python 스크립트 테스트 자체는 통과하지만, `scripts/pyproject.toml` 기준의 editable build 경로가 `uv run --project scripts ...` 방식과 충돌합니다. 검증 명령 표준을 하나로 정리할 필요가 있습니다.

근거:

- 테스트 실행 안내: [scripts/README.md](/Users/jhj/Desktop/personal/claude-code-guide-book/scripts/README.md:87)

## 6. 권고 사항

### 즉시 조치

1. 사이트/문서의 강한 완전성 문구를 safe claim으로 낮출 것
2. 누락된 패리티 매트릭스를 `docs/` 아래의 커밋된 산출물로 복구할 것
3. README의 로컬 개발 절차를 현재 루트 Next.js 구조에 맞게 수정할 것

### 콘텐츠 보강 우선순위

1. `Computer use`
2. `JetBrains IDEs`
3. `Claude Code in Slack`
4. `Troubleshooting`
5. `Deployment` 계열
6. `Administration` 계열
7. `Agent SDK`

### 공개 포지셔닝 권장 문구

현재 상태에 가장 맞는 표현은 아래 수준입니다.

- Claude Code의 주요 기능 영역을 폭넓게 다루는 실전 가이드
- 핵심 워크플로우와 확장 기능을 중심으로 정리한 학습용 레퍼런스
- 공식 문서 전 범위가 아니라, 실사용 가치가 높은 기능군에 집중한 가이드북

## 7. 결론 한 줄

이 저장소는 **Claude Code 핵심 기능을 배우기 위한 가이드북으로는 충분히 가치가 높지만**, **2026-04-21 현재 공식 Claude Code 전체 문서 범위를 모두 적절히 담고 있다고 검증할 수는 없습니다.**
