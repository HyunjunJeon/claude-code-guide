이 페이지는 위키독스(WikiDocs) MCP 서버를 Claude Code에 등록해 책·페이지·블로그를 자동으로 조회·작성·수정하는 실전 사례를 정리한다. 이 가이드 자체가 위키독스에 게시된다는 점에서 MCP가 실제로 어떻게 운영 콘텐츠와 맞물리는지 보기 좋은 예다. 큰 문서를 부분적으로 끌어오는 권장 호출 패턴까지 다루므로 [mcp-code-execution.md](https://wikidocs.net/345461)와 함께 읽으면 좋다.

위키독스(WikiDocs) 플랫폼이 자체 MCP 서버를 제공해 Claude Code, Claude Desktop, Cursor, Codex 같은 MCP 지원 도구에서 위키독스 책과 페이지를 직접 조회·작성·수정할 수 있다. 이 가이드 자체가 위키독스에 게시되는 책이라는 점에서 좋은 실전 사례다.

## 무엇을 할 수 있나

총 14개 도구를 제공한다.

| 영역 | 대표 도구 | 용도 |
| --- | --- | --- |
| 책 관리 | `list_books`, `create_book`, `get_book`, `get_book_toc` | 내 책 목록·생성·구조 조회 |
| 페이지 관리 | `create_page`, `get_page`, `update_page`, `upload_page_image` | 페이지 단위 작성·수정·이미지 업로드 |
| 블로그 관리 | `list_blogs`, `create_blog`, `update_blog`, `upload_blog_image` 외 | 위키독스 블로그 자동 발행 |

## Claude Code에 등록하는 법

```bash
claude mcp add --transport http wikidocs https://wikidocs.net/mcp \
  --header "Authorization: Token <발급받은 토큰>"
```

토큰은 위키독스 → 계정설정 → API 토큰에서 발급한다. 비밀번호처럼 다루어야 하며 본인 저자 책과 본인 블로그만 접근 가능하다.

## 권장 호출 패턴

큰 책에서 무턱대고 `get_book`을 부르면 응답이 매우 커진다. 위키독스 가이드는 다음 흐름을 권한다.

1. `get_book_toc`로 구조부터 파악
2. 필요한 페이지 ID만 골라 `get_page`로 조회
3. `update_page`는 부분 수정 방식이므로 변경할 필드만 보낸다

이는 본 가이드의 [코드 실행으로 컨텍스트 팽창 해결](https://wikidocs.net/345461) 원칙과도 같은 맥락이다. MCP 서버가 무엇을 반환하든 한 번에 다 받지 말고 토큰 단위로 끊어서 가져오는 것이 운영의 정석이다.

## 우리 책 콘텐츠와의 연계

이 책의 콘텐츠 흐름은 다음 두 갈래 중 하나로 다룰 수 있다.

- **GitHub 연동 흐름** (현재 사용): `wikidocs/` 폴더를 main에 push → 위키독스 webhook이 자동 동기화. 콘텐츠는 git이 진실 공급원.
- **MCP 흐름** (보완용): 페이지 단위로 수정/조회를 자동화하고 싶을 때. 예: AI 교정 결과를 `update_page`로 일괄 반영, 새 챕터를 `create_page`로 자동 추가.

두 방식을 같이 쓸 때는 **GitHub가 우선**이라는 합의를 명확히 해야 한다. MCP로 수정한 결과가 다음 webhook 동기화에서 덮어쓰여 사라질 수 있다.

자세한 설치/사용 방법은 위키독스 공식 문서 [위키독스 MCP](https://wikidocs.net/289752)를 참고한다.
