Hook은 settings 파일뿐 아니라 skill·agent·command의 frontmatter에 직접 첨부할 수 있습니다. 이렇게 하면 자동화가 사용되는 코드와 같은 위치에 살아 있게 됩니다.

Hooks를 특정 컴포넌트(skill, agent, command)의 frontmatter에 첨부할 수 있습니다:

**SKILL.md, agent.md 또는 command.md에서:**

```yaml
---
name: secure-operations
description: Perform operations with security checks
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/check.sh"
          once: true  # Only run once per session
---
```

**컴포넌트 hooks에서 지원되는 이벤트:** `PreToolUse`, `PostToolUse`, `Stop`

이를 통해 관련 코드를 함께 유지하면서 해당 컴포넌트에서 직접 hooks를 정의할 수 있습니다.

## Subagent Frontmatter의 Hooks

subagent의 frontmatter에 `Stop` hook이 정의되면 해당 subagent에 범위가 지정된 `SubagentStop` hook으로 자동 변환됩니다. 이를 통해 메인 세션이 중지될 때가 아니라 특정 subagent가 완료될 때만 stop hook이 실행됩니다.

```yaml
---
name: code-review-agent
description: Automated code review subagent
hooks:
  Stop:
    - hooks:
        - type: prompt
          prompt: "Verify the code review is thorough and complete."
  # The above Stop hook auto-converts to SubagentStop for this subagent
---
```
