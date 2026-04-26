이 문서는 plugin을 마켓플레이스에 게시하기 위한 8단계 절차와 제출 시 README에 포함해야 할 형식을 정리합니다. 자신의 plugin을 다른 사용자가 단일 명령으로 설치할 수 있도록 공개하려는 단계에 와 있다면 참고하세요. 매니페스트, README, 로컬 테스트, 검토·승인, 게시 순서를 따르면 채택률을 높일 수 있습니다.

**게시 단계:**

1. 모든 구성요소가 포함된 plugin 구조 생성
2. `.claude-plugin/plugin.json` 매니페스트 작성
3. 문서가 포함된 `README.md` 생성
4. `claude --plugin-dir ./my-plugin`으로 로컬 테스트
5. plugin 마켓플레이스에 제출
6. 검토 및 승인 받기
7. 마켓플레이스에 게시됨
8. 사용자가 단일 명령으로 설치 가능

**제출 예시:**

```markdown
# PR Review Plugin

## Description
Complete PR review workflow with security, testing, and documentation checks.

## What's Included
- 3 slash commands for different review types
- 3 specialized subagents
- GitHub and CodeQL MCP integration
- Automated security scanning hooks

## Installation
```bash
/plugin install pr-review
```

## Features
✅ Security analysis
✅ Test coverage checking
✅ Documentation verification
✅ Code quality assessment
✅ Performance impact analysis

## Usage
```bash
/review-pr
/check-security
/check-tests
```

## Requirements
- Claude Code 1.0+
- GitHub access
- CodeQL (optional)
```
