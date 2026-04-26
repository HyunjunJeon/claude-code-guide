이 페이지는 동일한 MCP 서버가 local·project·user 여러 범위에 정의됐을 때 어느 설정이 우선하는지를 정리한다. 팀 공유 설정을 개인 환경에서 살짝 override하고 싶을 때 동작 규칙을 확인하기 위해 본다. 범위별 위치와 사용 패턴은 [mcp-scopes.md](05-23-mcp-scopes.md), 설정 명령 자체는 [mcp-installation.md](05-11-mcp-installation.md)에서 다룬다.

동일한 MCP 서버가 여러 범위(local, project, user)에서 정의되면 로컬 설정이 우선합니다. 이를 통해 충돌 없이 프로젝트 레벨 또는 사용자 레벨 MCP 설정을 로컬 커스터마이징으로 재정의할 수 있습니다.
