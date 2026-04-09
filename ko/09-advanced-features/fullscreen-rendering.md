<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../../resources/logos/claude-howto-logo.svg">
</picture>

# Fullscreen Rendering

Fullscreen rendering은 Claude Code의 대체 rendering path입니다. 긴 세션에서 flicker를 줄이고, 메모리 사용을 더 안정적으로 만들며, 마우스 상호작용을 개선합니다.

여기서 "fullscreen"은 터미널 drawing surface를 `vim`이나 `htop`처럼 Claude Code가 직접 사용하는 뜻이지, 터미널 창을 최대화한다는 뜻은 아닙니다.

## Why Use It

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

## Enable It

한 세션만:

```bash
CLAUDE_CODE_NO_FLICKER=1 claude
```

지속 설정:

```bash
export CLAUDE_CODE_NO_FLICKER=1
```

항상 쓰고 싶다면 shell profile에 export를 추가합니다.

## What Changes

Fullscreen rendering이 켜지면:

- input box가 하단에 고정됩니다
- 보이는 메시지만 렌더링됩니다
- 긴 세션에서 메모리 사용이 더 안정적입니다
- 대화가 terminal alternate screen buffer 안에서 동작합니다

이 마지막 점 때문에 사용 습관도 조금 달라집니다:

- native terminal search는 scrollback으로 내보내기 전까지 대화를 보지 못합니다
- mouse behavior를 terminal 대신 Claude Code가 처리합니다
- selection과 scrolling semantics가 기본 renderer와 다릅니다

## Mouse and Selection Behavior

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

## Scrolling and Search

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

## Adjust Scroll Speed

일부 terminal은 wheel event가 느립니다. 이럴 때 scroll distance를 올릴 수 있습니다:

```bash
export CLAUDE_CODE_SCROLL_SPEED=3
```

지원 범위는 `1`에서 `20`이며, 시작값으로는 `3`이 무난합니다.

## tmux Notes

일반 tmux에서는 잘 동작하지만 mouse mode를 켜는 것이 좋습니다:

```tmux
set -g mouse on
```

중요한 주의점:

- mouse wheel scrolling은 tmux mouse mode에 의존합니다
- iTerm2의 `tmux -CC`는 fullscreen rendering과 잘 맞지 않습니다
- outer terminal까지 notification이나 progress indicator를 전달해야 한다면 passthrough 설정도 필요할 수 있습니다

## When Not To Use It

다음 상황이면 끄는 편이 낫습니다:

- 현재 terminal이 이미 충분히 부드럽게 동작함
- native terminal copy/search에 많이 의존함
- mouse capture가 불편한 terminal setup을 사용 중임

## Troubleshooting

### Search does not work with `Cmd+F`

alternate-screen mode에서는 정상입니다. 다음을 사용합니다:

- `Ctrl+O` 후 `/` 로 앱 내부 검색
- `Ctrl+O` 후 `[` 로 대화를 native scrollback으로 내보내기

### Mouse selection feels wrong

다음을 시도합니다:

```bash
CLAUDE_CODE_NO_FLICKER=1 CLAUDE_CODE_DISABLE_MOUSE=1 claude
```

### Wheel scrolling does nothing in tmux

다음을 확인합니다:

```tmux
set -g mouse on
```

### Rendering still feels slow

다음 조합을 시도합니다:

- fullscreen rendering 켜기
- mouse가 필요 없으면 비활성화
- 적당한 `CLAUDE_CODE_SCROLL_SPEED`

## Try It Now

### 1. Compare normal vs fullscreen rendering

한 번은 일반 모드로, 한 번은 아래처럼 실행합니다:

```bash
CLAUDE_CODE_NO_FLICKER=1 claude
```

Expected result:

- input이 하단에 고정됩니다
- streaming 출력 중 flicker가 줄어듭니다

### 2. Export the transcript back to scrollback

Fullscreen rendering 상태에서:

- `Ctrl+O`
- `[`

Expected result:

- 일반 terminal 도구로 대화를 다시 검색할 수 있습니다

## Related Guides

- [고급 기능 README](./README.md)
- [Terminal Configuration](./terminal-configuration.md)
- [Sandboxing](./README.md#sandboxing)

## Official Reference

- https://code.claude.com/docs/en/fullscreen
