# 사용 가능한 MCP 서버 테이블

이 페이지는 자주 쓰는 MCP 서버(Filesystem, GitHub, Slack, Database, Google Docs, Asana, Stripe, Memory)의 용도·주요 도구·인증 방식·실시간 여부를 한 표로 정리한다. "어떤 서버부터 붙일까"를 빠르게 결정해야 할 때 본다. 각 서버의 구체적인 설정 예시는 [mcp-examples.md](mcp-examples.md)에서 다룬다.

| MCP 서버 | 용도 | 주요 도구 | 인증 | 실시간 |
|------------|---------|--------------|------|-----------|
| **Filesystem** | 파일 작업 | read, write, delete | OS 권한 | 예 |
| **GitHub** | 저장소 관리 | list_prs, create_issue, push | OAuth | 예 |
| **Slack** | 팀 커뮤니케이션 | send_message, list_channels | 토큰 | 예 |
| **Database** | SQL 쿼리 | query, insert, update | 자격 증명 | 예 |
| **Google Docs** | 문서 접근 | read, write, share | OAuth | 예 |
| **Asana** | 프로젝트 관리 | create_task, update_status | API 키 | 예 |
| **Stripe** | 결제 데이터 | list_charges, create_invoice | API 키 | 예 |
| **Memory** | 영구 메모리 | store, retrieve, delete | 로컬 | 아니오 |
