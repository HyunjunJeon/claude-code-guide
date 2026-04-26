이 문서는 Claude 웹/데스크톱의 자동 Memory와 Claude Code의 CLAUDE.md를 7개 축(자동 합성, 프로젝트 간 공유, 팀 접근, 검색, 편집, 이식성, 영속성)으로 비교합니다. 두 환경 사이에서 어떤 정보를 어디에 저장할지 판단할 때 참조하세요. 특히 팀 단위로 Git에 추적되는 영구 정보가 필요한지, 개인용 24시간+ 합성 메모가 필요한지를 결정하는 데 유용합니다.

| 기능 | Claude 웹/데스크톱 | Claude Code (CLAUDE.md) |
|---------|-------------------|------------------------|
| 자동 합성 | 매 24시간 | 자동 memory |
| 프로젝트 간 | 공유 | 프로젝트별 |
| 팀 접근 | 공유 프로젝트 | Git 추적 |
| 검색 가능 | 내장 | `/memory`를 통해 |
| 편집 가능 | 채팅 내 | 직접 파일 편집 |
| 가져오기/내보내기 | 가능 | 복사/붙여넣기 |
| 영구 저장 | 24시간 이상 | 무기한 |

## Claude 웹/데스크톱의 Memory

### Memory 합성 타임라인

```mermaid
graph LR
    A["Day 1: User<br/>Conversations"] -->|24 hours| B["Day 2: Memory<br/>Synthesis"]
    B -->|Automatic| C["Memory Updated<br/>Summarized"]
    C -->|Loaded in| D["Day 2-N:<br/>New Conversations"]
    D -->|Add to| E["Memory"]
    E -->|24 hours later| F["Memory Refreshed"]
```

**Memory 요약 예시:** `claude-memory-of-user.md` 참조
