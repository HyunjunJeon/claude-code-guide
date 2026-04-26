# Plugin 테스트

이 문서는 plugin을 마켓플레이스에 게시하기 전에 `--plugin-dir` CLI 플래그로 로컬에서 검증하는 방법을 설명합니다. 하나 이상의 plugin을 동시에 로드해 슬래시 커맨드, 서브에이전트, MCP 서버, hook, LSP 설정이 의도대로 동작하는지 확인할 때 참고하세요. 게시 전 마지막 회귀 검증 단계로 사용하면 사용자가 마주칠 오류를 미리 잡을 수 있습니다.

게시 전에 `--plugin-dir` CLI 플래그(여러 plugin에 대해 반복 가능)를 사용하여 로컬에서 plugin을 테스트합니다:

```bash
claude --plugin-dir ./my-plugin
claude --plugin-dir ./my-plugin --plugin-dir ./another-plugin
```

이렇게 하면 plugin이 로드된 상태로 Claude Code가 시작되어 다음을 확인할 수 있습니다:

- 모든 slash command가 사용 가능한지 확인
- subagent와 에이전트가 올바르게 작동하는지 테스트
- MCP 서버가 올바르게 연결되는지 확인
- hook 실행 검증
- LSP 서버 설정 확인
- 설정 오류가 있는지 확인
