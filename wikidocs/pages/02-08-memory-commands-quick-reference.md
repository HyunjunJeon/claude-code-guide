이 표는 CLAUDE.md를 만들고 다듬는 데 사용하는 모든 명령과 단축 입력을 한 자리에 정리한 치트시트입니다. 새 프로젝트를 초기화할 때, 대화 중에 규칙을 즉시 저장하고 싶을 때, 또는 외부 문서를 Memory에 끌어오고 싶을 때 이 표에서 알맞은 명령을 골라 쓰세요. 각 명령의 "사용 시기" 컬럼이 어떤 상황에 어떤 도구가 적절한지 빠르게 판단하도록 도와줍니다.

| Command | 용도 | 사용법 | 사용 시기 |
|---------|---------|-------|-------------|
| `/init` | 프로젝트 memory 초기화 | `/init` | 새 프로젝트 시작, 최초 CLAUDE.md 설정 |
| `/memory` | 편집기에서 memory 파일 편집 | `/memory` | 대규모 업데이트, 재구성, 내용 검토 |
| `#` 접두사 | 빠른 한 줄 memory 추가 | `# Your rule here` | 대화 중 빠른 규칙 추가 |
| `# new rule into memory` | 명시적 memory 추가 | `# new rule into memory<br>Your detailed rule` | 복잡한 여러 줄 규칙 추가 |
| `# remember this` | 자연어 memory | `# remember this<br>Your instruction` | 대화형 memory 업데이트 |
| `@path/to/file` | 외부 콘텐츠 가져오기 | `@README.md` 또는 `@docs/api.md` | CLAUDE.md에서 기존 문서 참조 |
