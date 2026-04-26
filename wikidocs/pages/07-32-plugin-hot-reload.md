이 문서는 plugin 개발 중 파일을 수정하면 Claude Code가 자동으로 변경을 감지하고, 강제 리로드를 위해 `/reload-plugins`를 실행하는 방법을 설명합니다. 세션을 재시작하지 않고도 plugin 매니페스트, 명령, 에이전트, skill, hook, MCP/LSP 설정을 다시 읽고 싶을 때 참고하세요. 빠른 반복 개발에 핵심적인 명령입니다.

Plugin은 개발 중 핫 리로드를 지원합니다. plugin 파일을 수정하면 Claude Code가 자동으로 변경을 감지할 수 있습니다. 강제로 리로드하려면:

```bash
/reload-plugins
```

이 명령은 세션을 재시작하지 않고 모든 plugin 매니페스트, 명령, 에이전트, skill, hooks, MCP/LSP 설정을 다시 읽습니다.
