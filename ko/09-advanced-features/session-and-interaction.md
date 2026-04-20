
# 세션 & 인터랙션

## 세션 관리

여러 Claude Code 세션을 효과적으로 관리합니다.

### 세션 관리 명령어

| 명령어 | 설명 |
|---------|-------------|
| `/resume` | ID 또는 이름으로 대화 재개 |
| `/rename` | 현재 세션 이름 지정 |
| `/fork` | 현재 세션을 새 브랜치로 분기 |
| `claude -c` | 가장 최근 대화 계속 |
| `claude -r "session"` | 이름 또는 ID로 세션 재개 |

### 세션 재개

**마지막 대화 계속**:
```bash
claude -c
```

**이름이 지정된 세션 재개**:
```bash
claude -r "auth-refactor" "finish this PR"
```

**현재 세션 이름 변경** (REPL 내부):
```
/rename auth-refactor
```

### 세션 분기

원본을 잃지 않고 대안적 접근 방식을 시도하기 위해 세션을 분기합니다:

```
/fork
```

또는 CLI에서:
```bash
claude --resume auth-refactor --fork-session "try OAuth instead"
```

### 세션 영속성

세션은 자동으로 저장되며 재개할 수 있습니다:

```bash
# 마지막 대화 계속
claude -c

# 이름 또는 ID로 특정 세션 재개
claude -r "auth-refactor"

# 실험을 위해 재개 후 분기
claude --resume auth-refactor --fork-session "alternative approach"
```

기존 세션을 새 세션으로 포크하려면 `--resume`과 함께 `--fork-session`을 사용합니다.

---

## 대화형 기능

### 키보드 단축키

Claude Code는 효율성을 위한 키보드 단축키를 지원합니다. 공식 문서의 전체 참조입니다:

| 단축키 | 설명 |
|----------|-------------|
| `Ctrl+C` | 현재 입력/생성 취소 |
| `Ctrl+D` | Claude Code 종료 |
| `Ctrl+G` | 외부 편집기에서 계획 편집 |
| `Ctrl+L` | 터미널 화면 지우기 |
| `Ctrl+O` | 상세 출력 토글 (추론 보기) |
| `Ctrl+R` | 이력 역방향 검색 |
| `Ctrl+T` | Task list 보기 토글 |
| `Ctrl+B` | 실행 중인 작업을 백그라운드로 전환 |
| `Esc+Esc` | 코드/대화 rewind |
| `Shift+Tab` / `Alt+M` | 권한 모드 전환 |
| `Option+P` / `Alt+P` | 모델 전환 |
| `Option+T` / `Alt+T` | Extended thinking 토글 |
| `Option+O` (macOS) / `Alt+O` (Windows/Linux) | Fast mode 토글 |
| `Ctrl+X Ctrl+K` | 모든 백그라운드 agent 종료 |
| `Ctrl+X Ctrl+E` | 외부 편집기에서 열기 (Ctrl+G의 별칭) |

**줄 편집 (표준 readline 단축키):**

| 단축키 | 동작 |
|----------|--------|
| `Ctrl + A` | 줄 시작으로 이동 |
| `Ctrl + E` | 줄 끝으로 이동 |
| `Ctrl + K` | 줄 끝까지 잘라내기 |
| `Ctrl + U` | 줄 시작까지 잘라내기 |
| `Ctrl + W` | 뒤쪽 단어 삭제 |
| `Ctrl + Y` | 붙여넣기 (yank) |
| `Tab` | 자동 완성 |
| `↑ / ↓` | 명령어 이력 |

### 테마와 표시 방식

Claude Code가 terminal theme 자체를 관리하지는 않지만, 터미널 안에서의 인터페이스 체감에는 영향을 줍니다.

다음처럼 구분해서 생각하면 됩니다:

- 폰트, 색상, 전체 theme는 terminal emulator가 담당
- `/config`, `/statusline`은 Claude 특화 UI 동작을 담당
- 긴 세션에서 화면이 불안정하면 fullscreen rendering을 사용

실무적으로는 terminal이 appearance를, Claude Code가 interaction behavior를 담당한다고 보면 됩니다.

### 키 바인딩 사용자 정의

`/keybindings`를 실행하면 `~/.claude/keybindings.json`이 열려 사용자 정의 키보드 단축키를 만들 수 있습니다 (v2.1.18+).

**설정 형식**:

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null,
        "ctrl+k ctrl+s": "chat:stash"
      }
    },
    {
      "context": "Confirmation",
      "bindings": {
        "ctrl+a": "confirmation:yes"
      }
    }
  ]
}
```

바인딩을 `null`로 설정하면 기본 단축키의 바인딩이 해제됩니다.

### 사용 가능한 컨텍스트

키 바인딩은 특정 UI 컨텍스트에 범위가 지정됩니다:

| 컨텍스트 | 주요 동작 |
|---------|-------------|
| **Chat** | `submit`, `cancel`, `cycleMode`, `modelPicker`, `thinkingToggle`, `undo`, `externalEditor`, `stash`, `imagePaste` |
| **Confirmation** | `yes`, `no`, `previous`, `next`, `nextField`, `cycleMode`, `toggleExplanation` |
| **Global** | `interrupt`, `exit`, `toggleTodos`, `toggleTranscript` |
| **Autocomplete** | `accept`, `dismiss`, `next`, `previous` |
| **HistorySearch** | `search`, `previous`, `next` |
| **Settings** | 컨텍스트별 설정 네비게이션 |
| **Tabs** | 탭 전환 및 관리 |
| **Help** | 도움말 패널 네비게이션 |

`Transcript`, `Task`, `ThemePicker`, `Attachments`, `Footer`, `MessageSelector`, `DiffDialog`, `ModelPicker`, `Select`를 포함하여 총 18개의 컨텍스트가 있습니다.

### 코드 지원

키 바인딩은 코드 시퀀스(다중 키 조합)를 지원합니다:

```
"ctrl+k ctrl+s"   → 두 키 시퀀스: ctrl+k를 누른 후 ctrl+s를 누름
"ctrl+shift+p"    → 동시 수정자 키
```

**키 입력 문법**:
- **수정자**: `ctrl`, `alt` (또는 `opt`), `shift`, `meta` (또는 `cmd`)
- **대문자는 Shift를 의미**: `K`는 `shift+k`와 동일
- **특수 키**: `escape`, `enter`, `return`, `tab`, `space`, `backspace`, `delete`, 방향 키

### 예약 및 충돌 키

| 키 | 상태 | 참고 |
|-----|--------|-------|
| `Ctrl+C` | 예약됨 | 재바인딩 불가 (인터럽트) |
| `Ctrl+D` | 예약됨 | 재바인딩 불가 (종료) |
| `Ctrl+B` | 터미널 충돌 | tmux 접두사 키 |
| `Ctrl+A` | 터미널 충돌 | GNU Screen 접두사 키 |
| `Ctrl+Z` | 터미널 충돌 | 프로세스 일시 중지 |

> **팁**: 단축키가 작동하지 않으면 터미널 에뮬레이터나 멀티플렉서와의 충돌을 확인하세요.

**Transcript 검색** (v2.1.83+): transcript 모드에서 `/`를 눌러 대화 기록을 검색할 수 있습니다.

### Transcript Viewer와 검색

Transcript 중심 탐색은 interactive mode의 별도 축입니다:

- `Ctrl+O`로 transcript/verbose 흐름 열기
- transcript mode 안에서 `/`로 검색
- `[`로 대화를 terminal scrollback으로 보내 native search 사용

일반 채팅 화면으로는 확인이 불편하거나, live prompt view와 다른 검색 동작이 필요할 때 transcript mode를 사용합니다.

### 탭 완성

Claude Code는 지능적인 탭 완성을 제공합니다:

```
User: /rew<TAB>
→ /rewind

User: /plu<TAB>
→ /plugin

User: /plugin <TAB>
→ /plugin install
→ /plugin enable
→ /plugin disable
```

### Quick Commands

Interactive mode는 plain prompt 입력만 있는 것이 아닙니다. 실무적으로는 quick command surface가 핵심 일부입니다:

- `/`로 slash command 탐색
- tab completion으로 명령 축소
- 자주 쓰는 동작에 대한 built-in shortcut과 mode toggle 사용

그래서 전체 command catalog는 slash-command guide에 있더라도, command surface 자체는 interactive reference 일부로 보는 것이 맞습니다.

### 명령어 이력

이전 명령어에 접근합니다:

```
User: <↑>  # 이전 명령어
User: <↓>  # 다음 명령어
User: Ctrl+R  # 이력 검색

(reverse-i-search)`test': run all tests
```

### 여러 줄 입력

복잡한 쿼리의 경우 여러 줄 모드를 사용합니다:

```bash
User: \
> Long complex prompt
> spanning multiple lines
> \end
```

**예시:**

```
User: \
> Implement a user authentication system
> with the following requirements:
> - JWT tokens
> - Email verification
> - Password reset
> - 2FA support
> \end

Claude: [Processes the multi-line request]
```

### 인라인 편집

전송 전에 명령어를 편집합니다:

```
User: Deploy to prodcution<Backspace><Backspace>uction

[Edit in-place before sending]
```

### Vim Mode

Vi/Vim 키 바인딩을 텍스트 편집에 활성화합니다:

**활성화**:
- `/vim` 명령어 또는 `/config`를 사용하여 활성화
- `Esc`로 NORMAL 모드, `i/a/o`로 INSERT 모드 전환

**네비게이션 키**:
- `h` / `l` - 좌/우 이동
- `j` / `k` - 하/상 이동
- `w` / `b` / `e` - 단어 단위 이동
- `0` / `$` - 줄 시작/끝으로 이동
- `gg` / `G` - 텍스트 시작/끝으로 점프

**텍스트 객체**:
- `iw` / `aw` - 내부/주변 단어
- `i"` / `a"` - 내부/주변 따옴표 문자열
- `i(` / `a(` - 내부/주변 괄호

### Bash Mode

`!` 접두사로 셸 명령어를 직접 실행합니다:

```bash
! npm test
! git status
! cat src/index.js
```

### Background Bash와 Background Tasks

다음 두 개념은 구분해야 합니다:

- `!`는 현재 interactive session 안에서 즉시 셸 명령을 실행
- background tasks는 메인 대화를 막지 않고 더 오래 지속되는 작업을 실행

즉시 한 번 실행할 셸 동작에는 `!`,
계속 돌려야 하는 명령이나 workflow에는 background task가 맞습니다.

컨텍스트를 전환하지 않고 빠른 명령어 실행에 사용하세요.

---

## 음성 입력

음성 입력은 Claude Code에 푸시 투 토크 음성 입력을 제공하여, 타이핑 대신 음성으로 프롬프트를 말할 수 있게 합니다.

### 음성 입력 활성화

```
/voice
```

### 기능

| 기능 | 설명 |
|---------|-------------|
| **푸시 투 토크** | 키를 누르고 있으면 녹음, 놓으면 전송 |
| **20개 언어** | 음성 인식이 20개 언어를 지원 |
| **사용자 정의 키 바인딩** | `/keybindings`를 통해 푸시 투 토크 키를 구성 |
| **계정 요구 사항** | STT 처리를 위해 Claude.ai 계정이 필요 |

### 설정

`Space`를 길게 눌러 푸시 투 토크 음성 받아쓰기를 사용합니다 (`/keybindings`로 변경 가능).

키 바인딩 파일(`/keybindings`)에서 푸시 투 토크 키 바인딩을 사용자 정의합니다. 음성 입력은 음성 인식 처리에 Claude.ai 계정을 사용합니다.

---

## Task List

Task List 기능은 컨텍스트 압축(대화 이력이 컨텍스트 윈도우에 맞게 트리밍될 때)을 거쳐도 유지되는 영구 작업 추적을 제공합니다.

### Task List 토글

세션 중에 `Ctrl+T`를 눌러 task list 보기를 켜거나 끕니다.

### 영구 작업

작업은 컨텍스트 압축 간에 유지되어, 대화 컨텍스트가 트리밍될 때 장시간 실행 중인 작업 항목이 손실되지 않습니다. 이는 복잡한 다단계 구현에 특히 유용합니다.

### 이름이 지정된 작업 디렉토리

`CLAUDE_CODE_TASK_LIST_ID` 환경 변수를 사용하여 세션 간에 공유되는 이름이 지정된 작업 디렉토리를 생성합니다:

```bash
export CLAUDE_CODE_TASK_LIST_ID=my-project-sprint-3
```

이를 통해 여러 세션이 동일한 task list를 공유할 수 있어, 팀 워크플로우나 다중 세션 프로젝트에 유용합니다.

---

## 프롬프트 제안

프롬프트 제안은 git 이력과 현재 대화 컨텍스트를 기반으로 회색 텍스트의 예제 명령어를 표시합니다.

### 작동 방식

- 입력 프롬프트 아래에 회색 텍스트로 제안이 표시됩니다
- `Tab`을 눌러 제안을 수락합니다
- `Enter`를 눌러 수락하고 즉시 제출합니다
- 제안은 git 이력과 대화 상태에서 가져온 컨텍스트 인식 기능입니다

### 프롬프트 제안 비활성화

```bash
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
```

---
