이 문서는 channel-oriented workflow를 plugin으로 어떻게 구성하는지, 그리고 왜 별도의 `channels` 블록이 아니라 일반 plugin primitive(MCP server, hook, 명령, 설정)를 조합해야 하는지 설명합니다. release channel이나 communication channel 정책에 참여하는 plugin을 만들 때 참고하세요. 정책 게이팅은 prose가 아니라 managed settings(`allowedChannelPlugins`)로 명시해야 한다는 점이 핵심입니다.

Plugin은 channel-oriented workflow도 패키징할 수 있지만, channel 동작이 임의의 side concept로 따로 존재하는 것은 아닙니다. 실무적으로는 다른 고급 plugin과 같은 구성 요소를 사용합니다:

- 번들된 MCP server
- plugin이 관리하는 설정
- inbound event에 반응하는 선택적 hooks, commands, skills

특정 release channel 또는 communication channel 정책에 참여하는 plugin이라면, 그 정책은 prose가 아니라 managed settings로 명시하는 것이 좋습니다. `allowedChannelPlugins`는 channel-specific plugin governance의 핵심 정책 지점입니다.

## Channel-oriented plugin reference

독립된 `channels` 블록이 `plugin.json`에 따로 있는 것은 아닙니다. channel-capable plugin은 일반 plugin primitive를 조합해서 만듭니다:

| Concern | Where it lives | Notes |
|---|---|---|
| Channel transport/server | 번들된 MCP server | MCP server가 channel 동작을 선언하고 구현 |
| Channel-facing commands | `commands/` | channel workflow용 선택적 사용자 진입점 |
| Inbound event reactions | `hooks/` 또는 MCP server logic | 반응이 Claude 쪽인지 server 쪽인지에 따라 다름 |
| Durable state | `${CLAUDE_PLUGIN_DATA}` | channel cache, cursor, runtime state 저장 |
| Policy gating | Managed settings | `allowedChannelPlugins`가 핵심 governance control |

실무적으로는:

- 실제 구성요소는 plugin 구조 안에 ship하고
- 허용 여부는 managed settings로 제어하며
- 실제 동작이 MCP, hooks, policy에 있을 때 manifest에 가짜 schema key를 새로 만들지 않는 것이 맞습니다
