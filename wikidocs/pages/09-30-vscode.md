VS Code 확장은 Claude Code의 핵심 기능을 IDE 안에서 자연스럽게 쓰고 싶을 때 가장 적합합니다. raw terminal만 쓸 때보다 editor-aware prompt, visible diff review, conversation management가 더 자연스럽습니다.

## What You Get in VS Code

확장은 VS Code 안에 Claude Code용 그래픽 surface를 추가합니다:

- 전용 Claude panel
- editor-aware prompts
- 파일과 폴더에 대한 `@` references
- 편집 전 side-by-side diff review
- tab 또는 window 단위의 여러 대화
- Claude Code settings 및 plugins와의 연동

즉, 완전히 다른 제품이 아니라 VS Code-native shell 위에서 돌아가는 Claude Code입니다.

## Prerequisites

설치 전에 다음을 확인합니다:

- 지원되는 VS Code build
- 확장에서 지원하는 로그인 또는 provider flow를 통한 Claude Code 접근

필요할 때는 VS Code integrated terminal에서 terminal-only Claude Code workflow도 계속 사용할 수 있습니다.

## Install the Extension

VS Code에서:

1. macOS는 `Cmd+Shift+X`, Windows/Linux는 `Ctrl+Shift+X`로 Extensions view를 엽니다
2. `Claude Code`를 검색합니다
3. 설치합니다

바로 보이지 않으면:

- VS Code를 재시작하거나
- `Developer: Reload Window`를 실행합니다

## Get Started

### Open Claude

주요 진입점:

- editor toolbar의 Spark icon
- Activity Bar의 Spark icon
- Command Palette의 `Claude Code` command
- status bar의 Claude 항목

항상 보이는 쪽을 원하면 Activity Bar icon이 가장 안정적입니다.

### Send a prompt

Claude는 editor selection context를 자동으로 봅니다. 현재 선택 영역을 명시적인 file-range reference로 넣고 싶다면:

- macOS: `Option+K`
- Windows/Linux: `Alt+K`

이렇게 하면 `@file#start-end` 형태의 reference를 prompt에 넣을 수 있습니다.

### Review edits

Claude가 파일을 수정하려고 하면 VS Code는 side-by-side 비교 화면을 보여 주고, accept / reject / redirect를 선택하게 합니다.

이게 VS Code 확장의 가장 큰 장점 중 하나입니다. edit review가 IDE 문법에 맞게 동작합니다.

## Use the Prompt Box Well

Prompt box는 단순 텍스트 입력창보다 더 많은 역할을 합니다.

### Permission modes

Prompt box의 mode controls로 현재 작업에서 Claude가 edit와 approval을 어떻게 다룰지 바꿀 수 있습니다.

### Command menu

`/`를 입력하면 다음과 같은 command에 접근할 수 있습니다:

- model selection
- extended thinking
- usage views
- remote control
- MCP, hooks, memory, permissions, plugins 관련 command

### Multi-line input

다음을 사용합니다:

- `Shift+Enter`로 전송 없이 줄바꿈

## Reference Files and Folders

명시적인 repo context를 주고 싶을 때는 `@` mention을 사용합니다.

예시:

```plaintext
Explain the logic in @src/auth
```

```plaintext
Review @server.ts#120-180
```

알아둘 점:

- fuzzy matching을 지원합니다
- 현재 editor selection은 자동으로 반영될 수 있습니다
- `Option+K` / `Alt+K`로 range reference를 직접 넣을 수 있습니다
- 첨부한 reference는 전송 전에 제거할 수 있습니다

## Resume Past Conversations

확장은 Claude panel 안에 conversation list를 유지합니다.

가능한 작업:

- 이전 세션 검색
- 로컬 세션 재개
- 세션 이름 변경
- 세션 제거

그래서 여러 작업을 병렬로 굴릴 때 raw terminal보다 VS Code가 더 편한 경우가 많습니다.

## Customize Your Workflow

### Choose where Claude lives

Claude panel은 다음 위치에 둘 수 있습니다:

- 오른쪽 sidebar
- 왼쪽 sidebar
- editor area의 tab

메인 대화는 sidebar에 두고, side task는 tab으로 여는 방식이 실용적입니다.

### Run multiple conversations

추가 세션은 다음으로 열 수 있습니다:

- 새 tab
- 새 window

각 대화는 독립된 context와 history를 가지므로, refactor / review / debugging을 분리하기 좋습니다.

### Switch to terminal mode

CLI 스타일을 선호하면 extension의 terminal mode setting을 켜서 raw Claude Code와 비슷한 경험을 유지할 수 있습니다.

## Manage Plugins in VS Code

확장은 graphical plugin-management 흐름도 제공합니다.

할 수 있는 작업:

- plugin 설치
- enable / disable
- marketplace 관리
- install scope 선택

대표적인 scope:

- user
- project
- local

큰 plugin 변경 후에는 extension 쪽 reload 또는 restart가 필요한 경우가 있습니다.

## VS Code Commands and Shortcuts

유용한 extension-level command 예시는 다음과 같습니다:

| Command | Shortcut | What it does |
|---|---|---|
| Focus Input | `Cmd+Esc` / `Ctrl+Esc` | editor와 Claude 사이 포커스 전환 |
| Open in New Tab | `Cmd+Shift+Esc` / `Ctrl+Shift+Esc` | 새 대화 tab 시작 |
| New Conversation | `Cmd+N` / `Ctrl+N` when Claude is focused | 새 대화 시작 |
| Insert `@` reference | `Option+K` / `Alt+K` | 현재 파일/선택 영역 reference 삽입 |

주의할 점:

- 이것들은 VS Code extension command입니다
- terminal 전용 Claude Code command가 모두 같은 방식으로 노출되지는 않습니다

## Configure Settings

여기서는 두 가지 settings layer를 구분해서 생각해야 합니다.

### VS Code extension settings

이 설정은 VS Code 안에서 확장 동작을 제어합니다. 예:

- panel placement
- UI defaults
- extension-specific workflow preferences

### Claude Code settings

이 설정은 Claude Code 자체의 config 파일에 저장되며 CLI와 공유됩니다:

- allowed commands
- MCP configuration
- hooks
- environment variables
- output style

CLI와 extension에 공통으로 적용되는 동작을 원하면 extension-only setting이 아니라 Claude Code settings를 써야 합니다.

## VS Code Extension vs Claude Code CLI

둘은 경쟁 관계가 아니라 서로 장점이 다른 interface입니다.

### Use the VS Code extension when you want:

- native diff review
- editor-aware prompting
- file / range references
- multi-tab conversation management
- 더 시각적인 plan review 흐름

### Use the CLI in VS Code's terminal when you need:

- terminal-only commands
- `!` shell shortcuts
- raw CLI workflows
- 아직 extension UI에 노출되지 않은 동작

실제로는 둘을 같이 쓰는 사용자가 많습니다.

## Rewind with Checkpoints

Checkpoint 기반 rewind는 extension에서도 여전히 broader Claude Code workflow의 일부입니다. 동작 모델과 주의점은 전용 checkpoint guide를 참고하세요.

## Work with Git and External Tools

확장 안에서도 Claude Code의 다른 기능은 그대로 유효합니다:

- MCP integrations
- git workflows
- commit / PR preparation
- worktree 기반 병렬 작업

VS Code는 별도 product가 아니라 interface layer입니다.

## Security and Privacy Notes

CLI를 쓸 때와 같은 기준으로 extension도 다뤄야 합니다:

- 현재 permission mode 이해
- 제안된 edit 검토
- local CLI settings와 extension-only preference의 차이 이해
- plugins와 remote integration에 대한 주의

## Common Issues

### Extension will not install

확인할 것:

- VS Code version
- window reload 여부
- extension 설치 완료 여부

### Spark icon is missing

확인할 것:

- 파일이 열려 있는지
- panel이 다른 위치에 dock되어 있지 않은지
- Activity Bar icon이 있는지

### Claude never responds

확인할 것:

- login state
- extension settings가 provider setup과 충돌하고 있지 않은지
- underlying Claude process가 정상적으로 시작되는지

## Try It Now

### 1. Open Claude from the editor toolbar

코드 파일을 하나 열고 Spark icon을 눌러 현재 선택된 function을 설명해 달라고 요청합니다.

Expected result:

- selection context가 Claude에 전달됩니다
- raw terminal 대신 IDE-native response flow를 경험할 수 있습니다

### 2. Insert a line-range reference

코드 블록을 선택한 뒤:

- macOS는 `Option+K`
- Windows/Linux는 `Alt+K`

Expected result:

- prompt에 정확한 file-and-range reference가 삽입됩니다

### 3. Compare extension mode vs CLI mode

한 작업은 extension에서, 다른 작업은 VS Code integrated terminal의 Claude로 실행합니다.

Expected result:

- 그래픽 extension이 더 적합한 작업과 raw CLI가 더 적합한 작업을 구분할 수 있습니다

## Related Guides

- 고급 기능 README
- [Settings System Guide](https://wikidocs.net/345696)
- Checkpoint 가이드
- CLI 참조
- MCP 가이드

## Official Reference

Claude Code docs navigation의 `Platforms and integrations -> Visual Studio Code`를 참고하세요.
