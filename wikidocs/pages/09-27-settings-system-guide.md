Claude Code의 settings system은 단순한 `settings.json` 파일 하나가 아닙니다. 여러 scope, 관련 sidecar 파일, 기능별 저장 위치가 함께 작동하는 계층형 구성 모델입니다.

이 가이드는 settings system이 실제로 어떻게 동작하는지에 집중합니다:

- 어떤 scope를 써야 하는지
- precedence가 어떻게 작동하는지
- 어떤 기능이 scope model에 참여하는지
- 설정이 실제로 어디에 저장되는지

## Scope Model

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

## When To Use Each Scope

### Managed

다음처럼 우회되면 안 되는 설정은 managed scope를 사용합니다:

- 보안 정책
- 로그인 제한
- marketplace 제한
- 강제 sandboxing 또는 permission rules

정책이라면 여기 들어가야 합니다.

### User

다음은 user scope에 둡니다:

- 선호 모델 기본값
- 개인 plugins와 agents
- 개인 environment defaults
- 나의 기본 작업 스타일

모든 repo에서 쓰고 싶지만 커밋하고 싶지 않다면 user scope입니다.

### Project

다음은 project scope가 맞습니다:

- 팀 hooks
- 팀 plugins
- 공유 permission / MCP 설정
- 저장소 전체가 함께 가져가야 하는 동작

팀원이 repo를 clone했을 때 같이 따라와야 하면 project scope를 사용합니다.

### Local

다음은 local scope가 맞습니다:

- machine-specific paths
- 임시 실험
- 커밋하고 싶지 않은 개인 오버라이드

팀원 환경에서 깨질 수 있거나 개인적으로만 유지해야 하면 local scope를 사용합니다.

## Precedence

같은 설정이 여러 위치에 있으면, 더 구체적이거나 더 권한이 강한 source가 우선합니다.

실무적으로 기억할 규칙:

- managed policy는 일반적으로 수정 가능한 settings보다 우선합니다
- project settings는 그 저장소 안에서 user defaults보다 우선합니다
- local project settings는 내 머신에서 shared project settings보다 우선합니다
- session-specific flags는 현재 실행에만 영향을 줄 수 있습니다

핵심 원칙은 이것입니다:

`policy beats preference, and local beats shared.`

## What Actually Uses Scopes

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

## The Main Settings Files

### User settings

```plaintext
~/.claude/settings.json
```

모든 프로젝트에 적용할 개인 기본값에 사용합니다.

### Project settings

```plaintext
.claude/settings.json
```

저장소와 함께 이동해야 하는 공유 설정에 사용합니다.

### Local project settings

```plaintext
.claude/settings.local.json
```

gitignored 되는 개인용 project override에 사용합니다.

### Other important files

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

## What Goes Into `settings.json`

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

## Permission Settings vs Permission Modes

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

## Sandbox Settings

Sandboxing은 settings가 실제 실행 가능 범위를 바꾸는 대표적 예입니다.

주요 sandbox 설정 개념:

- sandboxing 활성화/비활성화
- sandboxing을 켤 수 없으면 실패하게 하기
- read/write path 허용/차단
- macOS에서 weaker network isolation 동작 조정

이건 단순 UI 옵션이 아니라 실행 모델을 바꾸기 때문에 configuration system의 일부입니다.

## Hooks, Plugins, and Subagents

settings system은 이런 기능군이 어떻게 활성화되고 제약되는지도 제어합니다.

예:

- plugin allowlists와 marketplace restrictions
- managed hook restrictions
- 세션에 주입되는 environment variables
- Claude와 plugin surface가 함께 상속받는 기본 동작

각 기능 상세는 전용 가이드를 참고하세요:

- [Hook 가이드](https://wikidocs.net/344613)
- [Plugin 가이드](https://wikidocs.net/345638)
- [Subagent 가이드](https://wikidocs.net/345414)

## Excluding Sensitive or Irrelevant Files

Configuration system은 exclusion 성격의 동작에도 영향을 줍니다.

예:

- 큰 저장소에서 불필요한 `CLAUDE.md` 파일 제외
- shared configuration 안에 irrelevant 또는 sensitive path가 섞이지 않도록 제어
- machine-specific 또는 secret-bearing override를 local-only file에 가두기

이 설정은 안전성과 context quality 둘 다에 영향을 줍니다.

## Verify Active Settings

활성 settings를 확인하는 실용적인 방법은 두 가지입니다.

### 1. `/config` 사용

```bash
/config
```

사용자-facing 설정을 빠르게 확인하는 가장 쉬운 방법입니다.

### 2. 관련 scope 파일 직접 확인

다음 파일을 확인합니다:

- `~/.claude/settings.json`
- `.claude/settings.json`
- `.claude/settings.local.json`
- `.mcp.json`
- `~/.claude.json`

문제가 생겼을 때는 "값이 틀렸다"보다 "더 구체적인 scope가 override하고 있다"가 더 흔한 원인입니다.

## Recommended Working Rules

### Team rule

공유 repo 동작은 `.claude/settings.json`에 둡니다.

### Personal rule

전역 개인 선호는 `~/.claude/settings.json`에 둡니다.

### Safety rule

machine-specific 또는 experimental override는 `.claude/settings.local.json`에 둡니다.

### Policy rule

정책을 user/project settings로 흉내 내지 마세요. 반드시 강제해야 한다면 managed scope에 둬야 합니다.

## Common Mistakes

- Claude Code 설정이 모두 한 파일에 있다고 생각하는 것
- machine-specific setting을 project scope에 넣는 것
- project settings가 항상 모든 것보다 우선한다고 가정하는 것
- `CLAUDE.md` behavioral guidance와 enforced settings를 혼동하는 것
- 실제로는 `.mcp.json`이나 `~/.claude.json`에 있는 문제를 엉뚱한 settings 파일에서 찾는 것

## Try It Now

### 1. Inspect your three settings scopes

```bash
ls ~/.claude/settings.json .claude/settings.json .claude/settings.local.json
```

Expected result:

- 현재 프로젝트에서 어떤 scope가 존재하는지 확인할 수 있습니다

### 2. Test precedence safely

user scope에 harmless한 값을 하나 두고, 같은 setting을 local project scope에서 override해 봅니다.

Expected result:

- 해당 repo에서는 local setting이 우선합니다

### 3. Verify schema-aware editing in VS Code

다음을 추가합니다:

```json
"$schema": "https://json.schemastore.org/claude-code-settings.json"
```

Expected result:

- editor에서 autocomplete와 validation이 더 좋아집니다

## Related Guides

- [고급 기능 README](https://wikidocs.net/345672)
- [Terminal Configuration](https://wikidocs.net/345700)
- [Output Styles](https://wikidocs.net/345357)
- [CLI 참조](https://wikidocs.net/345354)
- [메모리 가이드](https://wikidocs.net/345360)

## Official Reference

- https://code.claude.com/docs/ko/settings
