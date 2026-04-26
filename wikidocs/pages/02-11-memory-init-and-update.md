이 문서는 Claude Code의 Memory를 처음부터 만들고 이후 점진적으로 갱신하는 데 사용하는 세 가지 핵심 명령(`/init`, `#`, `/memory`)을 한 곳에 모아 설명합니다. 새 프로젝트에 CLAUDE.md를 처음 도입할 때, 대화 중 떠오른 규칙을 빠르게 저장하고 싶을 때, 또는 기존 Memory 파일을 편집기로 열어 대규모 정비를 하고 싶을 때 이 문서를 참조하세요. 각 명령의 사용법·예시 워크플로·적합한 사용 시점을 비교하면서 읽으면 어떤 명령이 어떤 작업에 어울리는지 직관적으로 파악할 수 있습니다.

## `/init` 명령

`/init` 명령은 Claude Code에서 프로젝트 memory를 설정하는 가장 빠른 방법입니다. 기본 프로젝트 문서가 포함된 CLAUDE.md 파일을 초기화합니다.

**사용법:**

```bash
/init
```

**기능:**

- 프로젝트에 새 CLAUDE.md 파일 생성 (일반적으로 `./CLAUDE.md` 또는 `./.claude/CLAUDE.md`)
- 프로젝트 규칙과 가이드라인 수립
- 세션 간 컨텍스트 지속을 위한 기반 설정
- 프로젝트 표준 문서화를 위한 템플릿 구조 제공

**향상된 대화형 모드:** `CLAUDE_CODE_NEW_INIT=1`을 설정하면 프로젝트 설정을 단계별로 안내하는 다단계 대화형 흐름이 활성화됩니다:

```bash
CLAUDE_CODE_NEW_INIT=1 claude
/init
```

**`/init` 사용 시기:**

- Claude Code로 새 프로젝트 시작
- 팀 코딩 표준 및 규칙 수립
- 코드베이스 구조에 대한 문서 생성
- 협업 개발을 위한 memory 계층 설정

**예시 워크플로:**

```markdown
# In your project directory
/init

# Claude creates CLAUDE.md with structure like:
# Project Configuration
## Project Overview
- Name: Your Project
- Tech Stack: [Your technologies]
- Team Size: [Number of developers]

## Development Standards
- Code style preferences
- Testing requirements
- Git workflow conventions
```

## `#`을 사용한 빠른 Memory 업데이트

대화 중 메시지를 `#`으로 시작하여 memory에 빠르게 정보를 추가할 수 있습니다:

**구문:**

```markdown
# Your memory rule or instruction here
```

**예시:**

```markdown
# Always use TypeScript strict mode in this project

# Prefer async/await over promise chains

# Run npm test before every commit

# Use kebab-case for file names
```

**작동 방식:**

1. `#` 뒤에 규칙을 입력하여 메시지 시작
2. Claude가 이를 memory 업데이트 요청으로 인식
3. Claude가 어떤 memory 파일을 업데이트할지 질문 (프로젝트 또는 개인)
4. 적절한 CLAUDE.md 파일에 규칙 추가
5. 이후 세션에서 이 컨텍스트를 자동으로 로드

**대안 패턴:**

```markdown
# new rule into memory
Always validate user input with Zod schemas

# remember this
Use semantic versioning for all releases

# add to memory
Database migrations must be reversible
```

## `/memory` 명령

`/memory` 명령은 Claude Code 세션 내에서 CLAUDE.md memory 파일을 직접 편집할 수 있는 접근을 제공합니다. 시스템 편집기에서 memory 파일을 열어 종합적인 편집이 가능합니다.

**사용법:**

```bash
/memory
```

**기능:**

- 시스템 기본 편집기에서 memory 파일 열기
- 대규모 추가, 수정, 재구성 수행 가능
- 계층 구조의 모든 memory 파일에 직접 접근
- 세션 간 영구 컨텍스트 관리 가능

**`/memory` 사용 시기:**

- 기존 memory 내용 검토
- 프로젝트 표준에 대한 대규모 업데이트
- Memory 구조 재구성
- 상세한 문서 또는 가이드라인 추가
- 프로젝트가 발전함에 따라 memory 유지 및 업데이트

**비교: `/memory` vs `/init`**

| 항목 | `/memory` | `/init` |
|--------|-----------|---------|
| **목적** | 기존 memory 파일 편집 | 새 CLAUDE.md 초기화 |
| **사용 시기** | 프로젝트 컨텍스트 업데이트/수정 | 새 프로젝트 시작 |
| **동작** | 편집기를 열어 변경 | 시작 템플릿 생성 |
| **워크플로** | 지속적인 유지보수 | 일회성 설정 |

**예시 워크플로:**

```markdown
# Open memory for editing
/memory

# Claude presents options:
# 1. Managed Policy Memory
# 2. Project Memory (./CLAUDE.md)
# 3. User Memory (~/.claude/CLAUDE.md)
# 4. Local Project Memory

# Choose option 2 (Project Memory)
# Your default editor opens with ./CLAUDE.md content

# Make changes, save, and close editor
# Claude automatically reloads the updated memory
```

**Memory Import 사용:**

CLAUDE.md 파일은 외부 콘텐츠를 포함하기 위해 `@path/to/file` 구문을 지원합니다:

```markdown
# Project Documentation
See @README.md for project overview
See @package.json for available npm commands
See @docs/architecture.md for system design

# Import from home directory using absolute path
@~/.claude/my-project-instructions.md
```

**Import 기능:**

- 상대 경로와 절대 경로 모두 지원 (예: `@docs/api.md` 또는 `@~/.claude/my-project-instructions.md`)
- 최대 깊이 5까지 재귀적 import 지원
- 외부 위치에서의 최초 import 시 보안을 위한 승인 대화 상자 표시
- 마크다운 코드 스팬이나 코드 블록 내에서는 import 지시문이 평가되지 않음 (예제에서 문서화해도 안전)
- 기존 문서를 참조하여 중복 방지
- 참조된 콘텐츠를 Claude의 컨텍스트에 자동 포함
