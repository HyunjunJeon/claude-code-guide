# 모듈식 규칙 시스템

이 문서는 `.claude/rules/` 디렉터리를 활용해 CLAUDE.md를 모듈별로 쪼개는 방법을 다룹니다. 규칙이 많아져 단일 파일이 비대해지거나, 특정 경로(예: `src/api/**`)에만 적용되는 컨벤션을 분리하고 싶을 때 필요합니다. YAML frontmatter, 하위 디렉터리 구성, 심볼릭 링크를 통한 다중 프로젝트 공유까지 한 번에 정리합니다.

`.claude/rules/` 디렉터리 구조를 사용하여 체계적이고 경로별 규칙을 생성합니다. 규칙은 프로젝트 수준과 사용자 수준 모두에서 정의할 수 있습니다:

```
your-project/
├── .claude/
│   ├── CLAUDE.md
│   └── rules/
│       ├── code-style.md
│       ├── testing.md
│       ├── security.md
│       └── api/                  # Subdirectories supported
│           ├── conventions.md
│           └── validation.md

~/.claude/
├── CLAUDE.md
└── rules/                        # User-level rules (all projects)
    ├── personal-style.md
    └── preferred-patterns.md
```

규칙은 하위 디렉터리를 포함하여 `rules/` 디렉터리 내에서 재귀적으로 탐색됩니다. `~/.claude/rules/`의 사용자 수준 규칙은 프로젝트 수준 규칙보다 먼저 로드되어, 프로젝트가 오버라이드할 수 있는 개인 기본값을 제공합니다.

## YAML Frontmatter를 사용한 경로별 규칙

특정 파일 경로에만 적용되는 규칙을 정의합니다:

```markdown
---
paths: src/api/**/*.ts
---

# API Development Rules

- All API endpoints must include input validation
- Use Zod for schema validation
- Document all parameters and response types
- Include error handling for all operations
```

**Glob 패턴 예시:**

- `**/*.ts` - 모든 TypeScript 파일
- `src/**/*` - src/ 하위의 모든 파일
- `src/**/*.{ts,tsx}` - 여러 확장자
- `{src,lib}/**/*.ts, tests/**/*.test.ts` - 여러 패턴

## 하위 디렉터리 및 심볼릭 링크

`.claude/rules/`의 규칙은 두 가지 구성 기능을 지원합니다:

- **하위 디렉터리**: 규칙은 재귀적으로 탐색되므로 주제별 폴더로 구성할 수 있습니다 (예: `rules/api/`, `rules/testing/`, `rules/security/`)
- **심볼릭 링크**: 여러 프로젝트 간에 규칙을 공유하기 위해 심볼릭 링크가 지원됩니다. 예를 들어 중앙 위치의 공유 규칙 파일을 각 프로젝트의 `.claude/rules/` 디렉터리에 심볼릭 링크할 수 있습니다
