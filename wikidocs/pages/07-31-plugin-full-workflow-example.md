이 문서는 PR Review plugin이 사용자 명령(`/review-pr`) 한 번으로 hook·MCP·여러 서브에이전트를 어떻게 순차적으로 실행해 종합 결과를 제시하는지 한눈에 보여 줍니다. plugin이 실제 운영에서 어떤 사용자 경험을 만들어내는지 이해하고 싶을 때 참고하세요. 자신의 plugin을 설계할 때 비슷한 통합 흐름을 그려 보면 사용자가 받을 가치가 명확해집니다.

## PR Review Plugin 전체 워크플로우

```text
1. User: /review-pr

2. Plugin executes:
   ├── pre-review.js hook validates git repo
   ├── GitHub MCP fetches PR data
   ├── security-reviewer subagent analyzes security
   ├── test-checker subagent verifies coverage
   └── performance-analyzer subagent checks performance

3. Results synthesized and presented:
   ✅ Security: No critical issues
   ⚠️  Testing: Coverage 65% (recommend 80%+)
   ✅ Performance: No significant impact
   📝 12 recommendations provided
```
