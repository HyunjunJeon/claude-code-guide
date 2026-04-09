<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../../resources/logos/claude-howto-logo.svg">
</picture>

# Terminal Configuration

Claude Code는 여러 terminal에서 동작하지만, 실제 사용감은 terminal 설정에 크게 좌우됩니다. 이 가이드는 일상 사용에 가장 영향을 주는 항목만 다룹니다:

- 줄바꿈 입력
- notifications
- large input 처리
- fullscreen rendering으로의 handoff

## Themes and Appearance

Claude Code는 terminal application의 theme를 직접 바꾸지 않습니다. 다음은 terminal이 담당합니다:

- background / foreground colors
- font
- transparency
- terminal-level color theme

Claude Code 안에서 조절할 수 있는 항목은 따로 있습니다:

- `/config` 로 UI setting
- `/statusline` 으로 status line 설정

즉, 전역 appearance는 terminal theme로, Claude-specific behavior는 Claude Code settings로 제어하는 것이 맞습니다.

## Entering Line Breaks Reliably

전송하지 않고 줄바꿈만 넣는 방법은 여러 가지가 있습니다.

| Method | Notes |
|---|---|
| `\` then `Enter` | 어디서나 되는 빠른 escape |
| `Ctrl+J` | 어떤 terminal에서도 안정적인 line feed |
| `Shift+Enter` | iTerm2, WezTerm, Ghostty, Kitty에서 native 지원 |
| Custom keybinding | native 지원이 없는 terminal의 fallback |

### `/terminal-setup`

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

### macOS Terminal.app

`Option+Enter`를 더 유용하게 쓰려면:

1. `Settings -> Profiles -> Keyboard` 열기
2. `Use Option as Meta Key` 활성화

### iTerm2

1. `Settings -> Profiles -> Keys` 열기
2. Meta-style 입력이 필요하면 left/right Option key를 `Esc+`로 설정

### VS Code Terminal

macOS에서는 다음 setting이 도움이 됩니다:

```json
{
  "terminal.integrated.macOptionIsMeta": true
}
```

## Notifications

Claude Code는 작업을 마치고 다음 입력을 기다릴 때 notification event를 발생시킵니다. 이 알림을 어떻게 surface할지는 terminal setup에 달려 있습니다.

### Native terminal notifications

지원이 좋은 편:

- Kitty
- Ghostty

iTerm2도 가능하지만 설정이 필요합니다:

1. `Settings -> Profiles -> Terminal` 열기
2. `Notification Center Alerts` 활성화
3. `Filter Alerts`에서 escape-sequence-generated alerts 허용

### tmux passthrough

Claude Code가 tmux 안에서 실행되고 바깥 terminal이 notification을 지원한다면 passthrough를 허용합니다:

```tmux
set -g allow-passthrough on
```

이 설정이 없으면 바깥 terminal이 Claude의 notification sequence를 못 볼 수 있습니다.

### Notification hooks

terminal-native notification이 불안정하면 hook를 사용합니다:

- 소리 재생
- desktop notification
- Slack 또는 다른 서비스로 알림

구체적인 패턴은 [Hook 가이드](../06-hooks/README.md)를 참고하세요.

## Handling Large Inputs

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

## Reduce Flicker and Memory Pressure

긴 세션에서 terminal이 불안정하다면 fullscreen rendering으로 넘깁니다:

```bash
CLAUDE_CODE_NO_FLICKER=1 claude
```

자세한 동작과 tradeoff는 [Fullscreen Rendering](./fullscreen-rendering.md)을 참고하세요.

## Vim Mode

prompt 편집을 많이 하고 modal input을 선호한다면:

```bash
/config
```

또는 메인 advanced-features guide에 있는 Vim setting 경로를 사용합니다.

## Recommended Terminal Setups

### Best out-of-the-box experience

- iTerm2
- WezTerm
- Ghostty
- Kitty

이쪽은 newline과 notification을 덜 손봐도 되는 편입니다.

### Still workable, but likely to need tuning

- VS Code integrated terminal
- tmux
- Terminal.app

이런 환경에서는 보통 다음이 더 중요합니다:

- `/terminal-setup`
- fullscreen rendering
- 명시적인 notification configuration

## Try It Now

### 1. Verify your newline workflow

Claude Code를 열고 다음을 테스트합니다:

- `Ctrl+J`
- `Shift+Enter`
- `Shift+Enter`가 안 되면 `/terminal-setup`

Expected result:

- prompt를 보내지 않고 줄바꿈만 넣을 수 있습니다

### 2. Verify notifications

짧은 작업을 실행하고 Claude가 끝날 때까지 기다립니다.

Expected result:

- terminal-native notification이 뜨거나
- notification hook이 필요하다는 것을 확인합니다

## Related Guides

- [고급 기능 README](./README.md)
- [Fullscreen Rendering](./fullscreen-rendering.md)
- [Hook 가이드](../06-hooks/README.md)
- [CLI 참조](../10-cli/README.md)

## Official Reference

- https://code.claude.com/docs/en/terminal-config
