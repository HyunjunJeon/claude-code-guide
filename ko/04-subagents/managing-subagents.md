# Subagent 관리

이 문서는 `/agents` 대화식 메뉴와 직접 파일 관리 두 가지 방법으로 subagent를 만들고 수정하는 방법을 설명합니다.
새 subagent를 만들거나 기존 subagent의 도구·우선순위를 점검할 때 쓰세요.
`/agents`가 권장 경로지만, CI나 스크립트에서 자동화할 때는 직접 파일 관리가 필요합니다.

## `/agents` 명령어 사용 (권장)

```bash
/agents
```

이 명령어는 다음을 위한 대화식 메뉴를 제공합니다:

- 사용 가능한 모든 subagent 보기 (내장, 사용자, 프로젝트)
- 가이드 설정으로 새 subagent 생성
- 기존 커스텀 subagent 및 도구 접근 편집
- 커스텀 subagent 삭제
- 중복이 있을 때 어떤 subagent가 활성인지 확인

## 직접 파일 관리

```bash
# Create a project subagent
mkdir -p .claude/agents
cat > .claude/agents/test-runner.md << 'EOF'
---
name: test-runner
description: Use proactively to run tests and fix failures
---

You are a test automation expert. When you see code changes, proactively
run the appropriate tests. If tests fail, analyze the failures and fix
them while preserving the original test intent.
EOF

# Create a user subagent (available in all projects)
mkdir -p ~/.claude/agents
```
