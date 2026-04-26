이 페이지는 MCP 서버가 노출한 프롬프트가 Claude Code에서 `/mcp__<server>__<prompt>` 형식의 슬래시 커맨드로 자동 노출되는 동작을 설명한다. 이미 만들어 둔 MCP 프롬프트를 별도 설정 없이 명령처럼 호출하고 싶을 때 본다. 자체 슬래시 커맨드를 직접 정의하는 방법은 [01. Slash Commands](01-slash-commands.md)를 참고한다.

MCP 서버는 Claude Code에서 slash command로 나타나는 프롬프트를 노출할 수 있습니다. 프롬프트는 다음 명명 규칙을 사용하여 접근할 수 있습니다:

```text
/mcp__<server>__<prompt>
```

예를 들어, `github`라는 이름의 서버가 `review`라는 프롬프트를 노출하면, `/mcp__github__review`로 호출할 수 있습니다.
