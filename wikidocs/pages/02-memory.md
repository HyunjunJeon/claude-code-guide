Memory는 Claude가 세션과 대화 간에 컨텍스트를 유지할 수 있게 하는 핵심 기능입니다. claude.ai의 자동 합성과 달리 Claude Code는 파일 시스템 기반 CLAUDE.md를 사용하며, 조직 정책부터 개인 설정까지 8단계 계층으로 정밀 제어할 수 있습니다.

이 장은 CLAUDE.md를 처음 만드는 법부터 모듈식 규칙·자동 Memory·엔터프라이즈 정책까지 Memory 운영의 전 영역을 다룹니다. 각 sub-page는 한 가지 주제를 자기완결적으로 정리하므로, 아래 핵심 주제 표에서 필요한 페이지로 바로 이동해 읽어도 무방합니다.

## 언제 읽으면 좋은가

- 팀 표준이나 코드 스타일을 Claude가 매번 잊지 않게 하고 싶을 때
- 여러 프로젝트에서 개인 개발 설정을 일관되게 적용하고 싶을 때
- 디렉터리별로 다른 규칙(예: API 폴더 vs UI 폴더)을 자동 적용하고 싶을 때
- 긴 대화 중간에 자주 반복하는 지시사항을 영구 컨텍스트로 만들고 싶을 때

## 이 장의 핵심 주제

| 주제 | 무엇인가 | 먼저 볼 페이지 |
| --- | --- | --- |
| 개요 | Memory 기능과 CLAUDE.md의 핵심 가치 | memory-overview.md |
| 명령 치트시트 | `/init`, `#`, `/memory` 한눈 정리 | memory-commands-quick-reference.md |
| 초기화·업데이트 | Memory를 만들고 점진적으로 갱신하는 세 가지 핵심 명령 | memory-init-and-update.md |
| 아키텍처 | Memory 시스템의 계층적 구조 다이어그램 | memory-architecture.md |
| Memory 계층 | 8단계 우선순위와 충돌 해소 규칙 | memory-hierarchy.md |
| 위치 테이블 | 어떤 CLAUDE.md가 어느 범위에서 적용되는지 | memory-location-table.md |
| 설정 파일 계층 | `claudeMdExcludes` 등 옵션이 어디에서 적용되는지 | settings-file-hierarchy.md |
| 모듈식 규칙 | `.claude/rules/`로 규칙을 모듈별로 쪼개기 | modular-rules-system.md |
| `claudeMdExcludes` | 특정 CLAUDE.md를 컨텍스트 로딩에서 제외 | claude-md-excludes.md |
| 업데이트 라이프사이클 | "Remember:" 지시 후 갱신되는 절차 | memory-update-lifecycle.md |
| 자동 Memory | Claude가 스스로 학습한 패턴을 저장하는 기능 | auto-memory.md |
| `--add-dir` | 작업 디렉터리 외부의 CLAUDE.md도 함께 로드 | add-dir-flag.md |
| 실용 예시 | 프로젝트·디렉터리·개인 메모리 4개 완성형 예시 | memory-practical-examples.md |
| 자동 Memory 샘플 | 24시간 합성 후 생성되는 사용자 프로필 형식 | claude-memory-of-user.md |
| 환경 비교 | Claude 웹/데스크톱 vs Claude Code Memory | memory-comparison.md |
| 모범 사례 | 권장·비권장 패턴과 보안 함정 정리 | memory-best-practices.md |
| 설치 가이드 | 새 프로젝트나 새 머신에서 Memory 설정 | memory-setup-guide.md |

## 빠른 시작

```bash
# 1. 현재 프로젝트를 분석해 CLAUDE.md 자동 생성
/init

# 2. 대화 중 떠오른 규칙을 즉시 Memory에 추가 (`#`으로 시작)
# Always use TypeScript strict mode in this project
# Run npm test before every commit

# 3. 기존 Memory 파일을 편집기로 열어 직접 수정
/memory
```

세 명령의 차이와 각 명령에 어울리는 상황은 memory-init-and-update.md를, 모든 단축 입력의 한눈 정리는 memory-commands-quick-reference.md를 참고하세요.

## 자주 하는 실수

- **시크릿을 CLAUDE.md에 저장**: 비밀번호·토큰을 직접 넣으면 git에 커밋된 채 새어나갑니다. 환경 변수 이름만 적고 값은 외부에서 주입하세요.
- **모호한 지시**: "코드 잘 짜줘"처럼 측정 불가능한 규칙은 Claude가 적용 여부를 판단할 수 없습니다. 검증 가능한 규칙(예: "테스트 파일은 `*.test.ts`로 끝낸다")으로 적습니다.
- **README 내용 복붙**: 이미 git에 있는 문서를 CLAUDE.md에 복사하면 두 곳을 동기화해야 합니다. `@docs/README.md` import 구문으로 참조하세요.
- **계층 혼동**: 조직 정책을 `~/.claude/CLAUDE.md`에 넣거나 사용자 메모리를 관리 정책 위치에 두면 우선순위가 뒤집힙니다. memory-hierarchy.md의 8단계 표를 먼저 확인하세요.
- **자동 Memory와 수동 CLAUDE.md 혼동**: 자동 Memory는 Claude가 학습한 패턴을 자동 기록하는 별도 디렉터리로, 사용자가 직접 작성하는 CLAUDE.md와 다릅니다. 차이는 memory-comparison.md에서 비교합니다.

## 관련 장

### 다른 모듈

- Slash Command — `/init`·`/memory` 등 Memory 관련 명령 전체
- [Skill](https://wikidocs.net/345381) — Memory 컨텍스트를 활용한 자동화 워크플로
- MCP Protocol — Memory와 함께 사용하는 외부 데이터 접근

### 공식 문서

- [Memory 문서](https://code.claude.com/docs/ko/memory) — Anthropic 공식 레퍼런스
- [Slash Command 레퍼런스](https://code.claude.com/docs/ko/interactive-mode) — `/init`·`/memory` 포함 모든 내장 명령
- [CLI 레퍼런스](https://code.claude.com/docs/ko/cli-reference) — 명령줄 인터페이스 문서
