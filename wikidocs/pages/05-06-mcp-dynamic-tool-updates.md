이 페이지는 MCP 서버가 도구 목록을 추가/제거/수정할 때 Claude Code가 자동으로 따라잡는 `list_changed` 알림을 설명한다. 자체 MCP 서버를 운영하거나 개발 중인 도구를 hot-reload하고 싶을 때 알아 두면 좋다. 짧은 페이지이므로 mcp-tool-search.md, mcp-tool-restrictions.md와 함께 읽으면 도구 lifecycle 전체가 잡힌다.

Claude Code는 MCP `list_changed` 알림을 지원합니다. MCP 서버가 사용 가능한 도구를 동적으로 추가, 제거 또는 수정하면, Claude Code가 업데이트를 수신하고 도구 목록을 자동으로 조정합니다 -- 재연결이나 재시작이 필요 없습니다.
