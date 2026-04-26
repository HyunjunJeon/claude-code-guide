Hooks는 Claude Code 세션의 특정 이벤트에 반응해 자동으로 실행되는 스크립트·웹훅·LLM 평가입니다. 결정론적인 자동화·검증·권한 통제를 코드로 표현할 수 있게 해 주며, "프롬프트로는 보장할 수 없는 동작"을 보장하는 유일한 메커니즘입니다.

[TOC]

## 언제 읽으면 좋은가

- Claude의 특정 동작 전후에 자동 검증이나 포매팅을 강제하고 싶을 때
- 도구 사용 권한을 코드로 통제하고 감사 로그를 남기고 싶을 때
- 세션 종료 시 자동 정리, 알림, 또는 컨텍스트 추적을 자동화하고 싶을 때
- 팀 표준(예: 커밋 전 lint, 위험 명령 차단)을 hook으로 코드화하고 싶을 때

## 이 장의 핵심 주제

| 주제 | 왜 중요한가 | 먼저 볼 페이지 |
| --- | --- | --- |
| 기본 개념 | hook이 무엇이고 어떻게 이벤트 루프에 끼어드는가 | [hooks-overview.md](06-11-hooks-overview.md) · [hook-types.md](06-07-hook-types.md) |
| 설정·관리 | settings.json 구조와 우선순위, 비활성화 절차 | [hooks-configuration.md](06-08-hooks-configuration.md) · [hooks-management.md](06-10-hooks-management.md) |
| 이벤트 | 27개 hook 이벤트 전체 레퍼런스 | [hook-events.md](06-04-hook-events.md) |
| 입력·출력 | stdin JSON, 종료 코드, 환경 변수 | [hook-io.md](06-06-hook-io.md) · [hook-env-vars.md](06-03-hook-env-vars.md) |
| 고급 | LLM 평가·async·plugin·MCP·컴포넌트 범위 | [prompt-based-hooks.md](06-16-prompt-based-hooks.md) · [async-hooks.md](06-01-async-hooks.md) · [plugin-hooks.md](06-15-plugin-hooks.md) · [mcp-tool-hooks.md](06-13-mcp-tool-hooks.md) · [component-scope-hooks.md](06-02-component-scope-hooks.md) · [permission-request-event.md](06-14-permission-request-event.md) |
| 운영 | 보안·디버깅·예제 모음 | [hooks-security.md](06-12-hooks-security.md) · [hooks-debugging.md](06-09-hooks-debugging.md) · [hook-examples.md](06-05-hook-examples.md) |

## 빠른 시작

`Bash` 도구가 호출되기 직전에 검증 스크립트를 실행하는 최소 예시입니다. `~/.claude/settings.json` 또는 `.claude/settings.json`에 다음을 추가합니다.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate-bash.py\"",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

스크립트는 stdin으로 JSON을 받고, 종료 코드 0(허용)·2(차단) 중 하나를 반환하면 됩니다. 더 풍부한 입출력 제어가 필요하면 [hook-io.md](06-06-hook-io.md)와 [hook-examples.md](06-05-hook-examples.md)를 참고하세요.

## 자주 하는 실수

- **async hook으로 차단을 시도** — `"async": true`는 gating에 쓸 수 없습니다. 차단이 필요하면 `PreToolUse` 같은 동기 이벤트를 쓰세요.
- **stdin 대신 명령 인수로 데이터 전달 시도** — 모든 hook은 stdin으로 JSON을 받습니다. 인수가 아닙니다.
- **종료 코드 무시** — 0(성공), 2(차단), 그 외(비차단 오류)의 의미가 다릅니다. 차단하려면 반드시 2를 반환해야 합니다.
- **경로 하드코딩** — `$CLAUDE_PROJECT_DIR`을 사용하지 않으면 다른 워크트리·디렉토리에서 hook가 깨집니다.
- **HTTP hook URL에 환경 변수를 그냥 보간** — 명시적 `allowedEnvVars` 목록이 없으면 환경 변수가 보간되지 않습니다(보안 보호).

## 관련 장

- [공식 Hooks 문서](https://code.claude.com/docs/ko/hooks) — 전체 hooks 참조
- [CLI 참조](https://code.claude.com/docs/ko/cli-reference) — 명령줄 인터페이스 문서
- [01. Slash Commands](01-slash-commands.md) — hook과 함께 자주 결합되는 사용자 정의 명령
- [03. Skills](03-skills.md) — 컴포넌트 frontmatter에 hook을 첨부할 수 있는 단위
- [04. Subagents](04-subagents.md) — agent hook과 SubagentStop의 대상
- [07. Plugins](07-plugins.md) — `hooks/hooks.json`으로 hook을 번들링하는 방법
- [08. Checkpoints](08-checkpoints.md) — 대화 상태 저장 및 복원
- [09. 고급 기능](09-advanced-features.md) — 자동 모드 권한 시드 등 hook과 결합하는 운영 기능

---
