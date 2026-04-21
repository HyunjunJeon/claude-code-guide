# Claude Code 공식 문서 패리티 보강 계획

- 작성일: 2026-04-21
- 기준 문서 맵: `Claude code docs map` (Last updated: 2026-04-20 21:18:54 UTC)
- 목표: **`JetBrains IDEs`를 제외한 공식 Claude Code 문서 범위를 저장소에 수용할 수 있는 실행 계획 수립**

## 1. 목표와 범위

### 목표

현재 저장소를 다음 상태까지 끌어올린다.

1. `JetBrains IDEs`를 제외한 공식 Claude Code 문서 범주를 모두 저장소의 사용자-facing 콘텐츠로 대응한다.
2. 각 공식 페이지가 최소 1개의 영문 문서와 1개의 한글 문서에 매핑된다.
3. 패리티 근거 산출물(매트릭스, 섹션 감사, 스코프 결정)이 저장소 내부에 커밋된 상태가 된다.
4. 사이트, EPUB, 색인 문서, `llms.txt` 생성 흐름이 새 콘텐츠 구조를 반영한다.

### 명시적 제외 범위

- `JetBrains IDEs`

이 항목은 "미완료"가 아니라 **현재 패리티 대상에서 제외된 범위**로 운영 문서에 명시해야 한다. 그렇지 않으면 strong-claim gate를 영구적으로 막는다.

### 공식 기준 페이지군

이번 계획은 다음 공식 범주를 대상으로 한다.

- Getting started
- Core concepts
- Use Claude Code
- Platforms and integrations
- Deployment
- Administration
- Configuration / Reference 보강
- Agent SDK
- What's New
- Resources

공식 참조:

- Docs map: https://code.claude.com/docs/ko/claude_code_docs_map
- Quickstart: https://code.claude.com/docs/ko/quickstart
- How Claude Code works: https://code.claude.com/docs/ko/how-claude-code-works
- Context window: https://code.claude.com/docs/ko/context-window
- Computer use: https://code.claude.com/docs/ko/computer-use
- Slack: https://code.claude.com/docs/ko/slack
- Troubleshooting: https://code.claude.com/docs/ko/troubleshooting
- Tools reference: https://code.claude.com/docs/ko/tools-reference
- Amazon Bedrock: https://code.claude.com/docs/ko/amazon-bedrock
- Server-managed settings: https://code.claude.com/docs/ko/server-managed-settings
- Network config: https://code.claude.com/docs/ko/network-config
- Agent SDK overview: https://code.claude.com/docs/ko/agent-sdk/overview
- What's new: https://code.claude.com/docs/ko/whats-new

## 2. 핵심 전략

### 권장 전략: 기존 10개 모듈은 유지하되, 부족한 축만 신규 모듈 2개로 분리

기존 10개 모듈만으로 모든 누락 범위를 억지로 흡수하면 `09-advanced-features`와 `10-cli`가 과도하게 비대해진다. 반대로 `00-getting-started`까지 새로 만들면 사이트, EPUB, 색인, 명령바까지 광범위하게 흔들린다.

가장 현실적인 절충안은 아래다.

1. **기존 10개 모듈 유지**
2. **Getting started / Core concepts / Platforms 일부 / Troubleshooting / Reference 보강은 기존 모듈로 흡수**
3. **Deployment + Administration 전용 모듈 추가**
4. **Agent SDK 전용 모듈 추가**

### 권장 정보 구조

- 기존 유지:
  - `09-advanced-features`
  - `10-cli`
- 신규 추가:
  - `11-deployment-admin`
  - `12-agent-sdk`

이 구조의 장점:

- 공식 문서 계층과 저장소 계층의 의미 대응이 좋아진다.
- `09`와 `10`을 쓰레기통 폴더처럼 만들지 않는다.
- 이후 공식 문서 증가에도 수용력이 높다.
- 패리티 매트릭스 작성과 유지보수가 쉬워진다.

## 3. 선행 기술 작업

신규 모듈 2개를 추가하려면 콘텐츠만 쓰는 것으로 끝나지 않는다. 아래 코드를 먼저 열어야 한다.

### 코드/스크립트 수정 대상

- [src/lib/content.ts](/Users/jhj/Desktop/personal/claude-code-guide-book/src/lib/content.ts:36)
  - `MODULE_DIRS`
  - `MODULE_NAMES`
- [src/lib/config.tsx](/Users/jhj/Desktop/personal/claude-code-guide-book/src/lib/config.tsx:24)
  - 사이트 소개 문구
  - 모듈 카드
  - 상단 내비게이션
- [src/components/terminal/command-bar.tsx](/Users/jhj/Desktop/personal/claude-code-guide-book/src/components/terminal/command-bar.tsx:7)
  - `/11`, `/12` 단축 매핑 추가 여부 결정
- [scripts/build_epub.py](/Users/jhj/Desktop/personal/claude-code-guide-book/scripts/build_epub.py:387)
  - 챕터 순서
- `scripts/generate_llms_txt.py`
  - `MODULE_DIRS`
- 루트 문서:
  - [README.md](/Users/jhj/Desktop/personal/claude-code-guide-book/README.md:9)
  - [INDEX.md](/Users/jhj/Desktop/personal/claude-code-guide-book/INDEX.md:17)
  - [CATALOG.md](/Users/jhj/Desktop/personal/claude-code-guide-book/CATALOG.md:1)

### 선행 운영 작업

아래 문서는 본격 집필 전에 먼저 정리해야 한다.

1. `docs/PARITY-OPERATIONS.md`에 `JetBrains IDEs`를 현재 범위 제외로 명시
2. 누락된 패리티 매트릭스를 `docs/` 아래 커밋 산출물로 복구
3. strong claim을 막는 공개 문구를 safe claim으로 조정

## 4. 작업 스트림

## Workstream A — 패리티 운영 체계 복구

### 목적

콘텐츠를 써도 "검증"이 가능해야 한다. 지금은 `.omx` 매트릭스가 저장소 밖에 있어서 재현성이 없다.

### 산출물

- `docs/claude-code-feature-doc-coverage-matrix-20260421.md`
- `docs/audits/`
  - `hooks.md`
  - `mcp.md`
  - `plugins.md`
  - `configuration.md`
  - `subagents.md`
  - `reference-remainder.md`
- `docs/SCOPE-DECISION-20260421.md`
  - `JetBrains IDEs` 제외 근거

### 완료 기준

- 모든 공식 페이지가 `covered` / `partial` / `missing` / `out-of-scope` 중 하나로 분류됨
- `JetBrains IDEs`는 `out-of-scope`로 명시됨
- strong claim 허용 여부를 저장소 안 파일만으로 판정 가능함

## Workstream B — Getting started + Core concepts 보강

### 목적

현재 저장소는 "기능별 사용법"은 강하지만, 공식 문서의 입문 흐름과 개념 층이 비어 있다.

### 권장 배치

신규 모듈을 만들지 않고 아래처럼 기존 모듈 안으로 수용한다.

#### `10-cli/`

- `quickstart.md`
- `changelog.md`

#### `09-advanced-features/`

- `how-claude-code-works.md`
- `features-overview.md`
- `claude-directory.md`
- `context-window.md`
- `common-workflows.md`
- `best-practices.md`

### 대응할 공식 페이지

- `quickstart`
- `changelog`
- `how-claude-code-works`
- `features-overview`
- `claude-directory`
- `context-window`
- `common-workflows`
- `best-practices`

### 집필 기준

- 개념 설명과 실습 예시를 같이 둔다.
- 기존 문서와 중복되는 부분은 복붙하지 말고 cross-link로 정리한다.
- `planning-and-thinking.md`, `session-and-interaction.md`, `permissions-and-security.md`와의 관계를 명시한다.

### 완료 기준

- 공식 Core concepts 범주에서 `JetBrains`와 무관한 미대응 페이지가 사라짐
- 각 페이지에 공식 원문 링크와 `last_verified` 메타데이터를 둠

## Workstream C — Platforms and integrations 잔여분 보강

### 목적

현재 `09-advanced-features/platforms.md`는 개요형으로는 좋지만, 공식 문서의 독립 페이지 수준 깊이는 부족하다.

### 권장 배치

#### `09-advanced-features/`

- `web-quickstart.md`
- `claude-code-on-the-web.md`
- `routines.md`
- `ultraplan.md`
- `ultrareview.md`
- `desktop-quickstart.md`
- `desktop.md`
- `desktop-scheduled-tasks.md`
- `computer-use.md`
- `slack.md`
- `code-review.md`
- `github-actions.md`
- `github-enterprise-server.md`
- `gitlab-ci-cd.md`

### 대응할 공식 페이지

- `web-quickstart`
- `claude-code-on-the-web`
- `routines`
- `ultraplan`
- `ultrareview`
- `desktop-quickstart`
- `desktop`
- `desktop-scheduled-tasks`
- `computer-use`
- `slack`
- `code-review`
- `github-actions`
- `github-enterprise-server`
- `gitlab-ci-cd`

### 특별 주의

- `computer-use`는 macOS/플랜/interactive-only 제약을 명확히 적어야 한다.
- `slack`은 채널 기반 접근 제어, 웹 세션 handoff, 저장소 선택, 권한 모델을 반드시 포함해야 한다.
- `web`/`desktop`은 기존 `platforms.md` 내용을 개요로 유지하고, 세부는 각 페이지로 분해한다.

### 완료 기준

- `platforms.md`는 허브 페이지 역할로 재정리됨
- `computer-use`, `slack`이 더 이상 패리티 블로커가 아님

## Workstream D — Deployment + Administration 모듈 신설

### 목적

이 범주는 현재 저장소에서 가장 부족하다. `09`나 `10`에 흡수하면 구조가 무너진다.

### 신규 모듈

- `11-deployment-admin/README.md`
- `ko/11-deployment-admin/README.md`

### 하위 페이지

- `amazon-bedrock.md`
- `google-vertex-ai.md`
- `microsoft-foundry.md`
- `network-config.md`
- `llm-gateway.md`
- `devcontainer.md`
- `server-managed-settings.md`
- `monitoring-usage.md`
- `data-usage.md`
- `zero-data-retention.md`
- `authentication-and-iam.md`

한글 대응 파일도 동일하게 생성한다.

### 대응할 공식 페이지

- `amazon-bedrock`
- `google-vertex-ai`
- `microsoft-foundry`
- `network-config`
- `llm-gateway`
- `devcontainer`
- `server-managed-settings`
- `monitoring-usage`
- `data-usage`
- `zero-data-retention`
- `iam`

### 집필 기준

- 각 공급자 문서는 "빠른 설정", "수동 설정", "제약사항", "문제 해결"을 동일한 틀로 맞춘다.
- `server-managed-settings`는 기존 `settings-system-guide.md`와 차이를 분명히 한다.
- `data-usage`, `zero-data-retention`, `monitoring-usage`는 엔터프라이즈 독자 관점으로 쓴다.

### 완료 기준

- 공식 Deployment / Administration 범주에서 `JetBrains`와 무관한 `missing`이 없음
- 신규 모듈이 사이트와 EPUB에 포함됨

## Workstream E — Reference 보강

### 목적

현재 `10-cli/README.md`는 좋지만, 공식 reference가 분리한 페이지 수준의 탐색성과 정밀함은 부족하다.

### 권장 배치

#### `10-cli/`

- `tools-reference.md`
- `env-vars.md`
- `errors.md`
- `troubleshooting.md`
- `authentication-precedence.md`

필요 시 `README.md`는 허브형으로 바꾼다.

### 대응할 공식 페이지

- `tools-reference`
- `env-vars`
- `errors`
- `troubleshooting`
- `iam`의 CLI/인증 우선순위 관련 내용 일부

### 특별 주의

- `troubleshooting`은 설치, 인증, 네트워크, 키체인, WSL, 응답 품질 저하를 분리해야 한다.
- `errors`는 "런타임 오류" 문서로 유지하고 설치 오류는 `troubleshooting`으로 보내야 한다.
- `tools-reference`는 permission rules, subagent tool lists, hook matchers에 연결해야 한다.

### 완료 기준

- `10-cli/README.md`가 너무 많은 내용을 떠안지 않음
- 검색/링크 단위가 공식 페이지와 거의 1:1 대응됨

## Workstream F — Agent SDK 전용 모듈 신설

### 목적

Agent SDK는 Claude Code의 "부록"이 아니라 독립 문서군이다. 별도 모듈 없이는 장기적으로 유지가 어렵다.

### 신규 모듈

- `12-agent-sdk/README.md`
- `ko/12-agent-sdk/README.md`

### 하위 페이지

- `overview.md`
- `agent-loop.md`
- `sessions.md`
- `streaming-vs-single-mode.md`
- `user-input.md`
- `streaming-output.md`
- `structured-outputs.md`
- `custom-tools.md`
- `mcp.md`
- `tool-search.md`
- `subagents.md`
- `modifying-system-prompts.md`
- `slash-commands.md`
- `skills.md`
- `plugins.md`
- `permissions.md`
- `hooks.md`
- `file-checkpointing.md`
- `cost-tracking.md`
- `observability.md`
- `todo-tracking.md`
- `hosting.md`
- `secure-deployment.md`
- `typescript.md`
- `typescript-v2-preview.md`
- `python.md`
- `migration-guide.md`

한글 대응 파일도 동일하게 생성한다.

### 대응할 공식 페이지

공식 Agent SDK 범주 전체. `JetBrains`와 무관한 가장 큰 누락 묶음이다.

### 집필 기준

- "Claude Code 사용자" 관점이 아니라 "SDK로 에이전트 빌더" 관점으로 문체를 분리한다.
- Python과 TypeScript 예제는 최소 실행 예제 + 권한/세션/출력 제어 예제를 각각 둔다.
- 기존 저장소의 Skills/Subagents/Plugins/Hooks 설명과 중복되는 경우, "CLI 관점"과 "SDK 관점"을 비교 표로 연결한다.

### 완료 기준

- Agent SDK 범주가 더 이상 `미충족`이 아님
- 영문/한글 모두 최소 overview + reference skeleton + example code를 갖춤

## Workstream G — What's New + Resources

### 목적

패리티는 한 번 맞추고 끝이 아니다. 변경 추적과 컴플라이언스/리소스 링크도 사용자-facing 산출물로 남겨야 한다.

### 산출물

- 루트:
  - `WHATS-NEW.md`
  - `ko/WHATS-NEW.md`
- 리소스 페이지 보강:
  - `resources.md` 개편 또는 `13-resources` 신설 여부 결정
- 법무/컴플라이언스:
  - `LEGAL-AND-COMPLIANCE.md`
  - `ko/LEGAL-AND-COMPLIANCE.md`

### 대응할 공식 페이지

- `whats-new`
- `legal-and-compliance`
- 기타 Resources 링크 집합

### 완료 기준

- 사용자가 공식 변경사항과 운영 관련 리소스를 저장소 안에서 추적 가능함
- 릴리스 이후 패리티 갱신 프로세스가 문서화됨

## 5. 실행 순서

### Phase 0 — 운영/구조 선행 작업

1. `JetBrains IDEs` 범위 제외 결정 문서화
2. 패리티 매트릭스 복구
3. 공개 문구 safe claim으로 정리
4. 신규 모듈 11/12를 사이트, EPUB, 색인 시스템에 연결

### Phase 1 — 패리티 블로커 제거

1. `computer-use`
2. `slack`
3. `tools-reference`
4. `errors`
5. `troubleshooting`

이 단계가 끝나야 "핵심 누락"이 해소된다.

### Phase 2 — 개념층 보강

1. `quickstart`
2. `how-claude-code-works`
3. `features-overview`
4. `claude-directory`
5. `context-window`
6. `common-workflows`
7. `best-practices`

### Phase 3 — Deployment / Administration

1. 공급자 3종
2. network / gateway / devcontainer
3. server-managed settings
4. monitoring / data usage / ZDR / IAM

### Phase 4 — Agent SDK

1. `overview` + `sessions` + `permissions` + `hooks`
2. I/O / tools / MCP / subagents
3. prompts / skills / plugins
4. cost / observability / todo tracking
5. hosting / secure deployment / TS / Python / migration

### Phase 5 — What's New / Resources / 최종 패리티 검증

1. `WHATS-NEW.md`
2. legal/compliance
3. 최종 매트릭스 갱신
4. README / INDEX / CATALOG / 사이트 문구 재검증

## 6. 작업량 산정 원칙

정확한 시간 추정보다 더 중요한 것은 "문서군 단위 배치"다. 그래도 우선순위를 위해 아래처럼 본다.

- 소형 페이지:
  - `errors`, `env-vars`, `quickstart`, `changelog`
- 중형 페이지:
  - `computer-use`, `slack`, `best-practices`, `common-workflows`
- 대형 페이지:
  - `tools-reference`, `troubleshooting`, `how-claude-code-works`
- 초대형 스트림:
  - `11-deployment-admin`
  - `12-agent-sdk`

즉, 콘텐츠 양보다 구조 작업이 먼저다.

## 7. 각 단계의 검증 기준

### 문서 단위

- 영문 문서 존재
- 한글 문서 존재
- 루트 허브 페이지에서 링크됨
- 공식 원문 URL 명시
- 마지막 검증 날짜 명시
- 기존 관련 문서로 역링크 연결

### 사이트 단위

- `npm run lint` 통과
- `npm run build` 통과
- 신규 모듈 / 하위 페이지 정적 생성 확인

### 문서 산출물 단위

- `README.md`
- `INDEX.md`
- `CATALOG.md`
- `public/llms.txt`
- EPUB

이 다섯 산출물이 새 구조를 반영해야 한다.

### 패리티 단위

- 매트릭스에 `missing`이 남아 있지 않아야 함
- 단, `JetBrains IDEs`는 `out-of-scope` 처리
- `partial`은 명시적 사유가 있어야 함

## 8. 리스크와 대응

### 리스크 1 — 콘텐츠보다 정보 구조 변경 비용이 더 큼

대응:

- `00` 모듈은 만들지 않는다.
- 신규 모듈은 2개로 제한한다.

### 리스크 2 — `09`와 `10`이 비대해질 수 있음

대응:

- Deployment/Admin과 Agent SDK는 별도 모듈로 분리한다.

### 리스크 3 — 한글 번역 품질이 영문 완료 속도를 늦춤

대응:

- 영문 초안 완료 직후 같은 스트림 안에서 한글 동시 생산
- "영문 완료 후 전체 번역" 방식 금지

### 리스크 4 — strong claim을 너무 일찍 복구할 수 있음

대응:

- 패리티 매트릭스 최종 갱신 전에는 문구 복구 금지

## 9. 즉시 실행할 첫 10개 작업

1. `docs/PARITY-OPERATIONS.md` 수정: `JetBrains IDEs`를 현재 범위 제외로 명시
2. 커밋된 패리티 매트릭스 파일 복구
3. `README.md`, `src/lib/config.tsx`의 강한 문구 safe claim으로 하향
4. `11-deployment-admin/` 및 `ko/11-deployment-admin/` 뼈대 생성
5. `12-agent-sdk/` 및 `ko/12-agent-sdk/` 뼈대 생성
6. `src/lib/content.ts`에 신규 모듈 연결
7. `scripts/build_epub.py`와 `scripts/generate_llms_txt.py`에 신규 모듈 반영
8. `09-advanced-features/computer-use.md` 초안 작성
9. `09-advanced-features/slack.md` 초안 작성
10. `10-cli/tools-reference.md`, `10-cli/troubleshooting.md`, `10-cli/errors.md` 초안 작성

## 10. 최종 판정 기준

아래 조건이 모두 충족되면 `JetBrains IDEs`를 제외한 범위에 대해 "실질적 패리티 달성"으로 본다.

1. 공식 문서 맵 기준 해당 범주의 각 페이지가 저장소 파일에 매핑됨
2. 영문/한글 모두 존재함
3. 사이트와 EPUB에서 접근 가능함
4. 매트릭스에 `missing`이 없음
5. `JetBrains IDEs`는 `out-of-scope`로 문서화됨
6. 공개 문구가 현재 패리티 상태와 모순되지 않음

이 계획의 핵심은 "많이 쓰기"가 아니라 "패리티가 닫히는 구조를 먼저 만드는 것"이다.
