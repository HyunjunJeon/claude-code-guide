
# PR Review Plugin

보안, 테스트, 문서 확인을 포함한 완전한 PR 리뷰 워크플로우입니다.

## 기능

✅ 보안 분석
✅ 테스트 커버리지 확인
✅ 문서 검증
✅ 코드 품질 평가
✅ 성능 영향 분석

## 설치

```bash
/plugin install pr-review
```

## 포함 항목

### Slash Commands
- `/review-pr` - 포괄적인 PR 리뷰
- `/check-security` - 보안 중심 리뷰
- `/check-tests` - 테스트 커버리지 분석

### Subagents
- `security-reviewer` - 보안 취약점 탐지
- `test-checker` - 테스트 커버리지 분석
- `performance-analyzer` - 성능 영향 평가

### MCP 서버
- PR 데이터를 위한 GitHub 통합

### Hooks
- `pre-review.js` - 리뷰 전 검증

## 사용법

### 기본 PR 리뷰
```
/review-pr
```

### 보안 검사만
```
/check-security
```

### 테스트 커버리지 검사
```
/check-tests
```

## 요구사항

- Claude Code 1.0+
- GitHub 접근
- Git 저장소

## 설정

GitHub 토큰을 설정합니다:
```bash
export GITHUB_TOKEN="your_github_token"
```

## 예제 워크플로우

```
User: /review-pr

Claude:
1. Runs pre-review hook (validates git repo)
2. Fetches PR data via GitHub MCP
3. Delegates security review to security-reviewer subagent
4. Delegates testing to test-checker subagent
5. Delegates performance to performance-analyzer subagent
6. Synthesizes all findings
7. Provides comprehensive review report

Result:
✅ Security: No critical issues found
⚠️  Testing: Coverage is 65%, recommend 80%+
✅ Performance: No significant impact
📝 Recommendations: Add tests for edge cases
```
