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
