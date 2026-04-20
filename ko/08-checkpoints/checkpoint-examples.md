# Checkpoint 예제

Claude Code에서 checkpoint을 효과적으로 사용하는 실제 예제입니다.

참고: Checkpoint은 모든 사용자 프롬프트마다 자동으로 생성됩니다. 수동으로 저장할 필요가 없습니다. Rewind하려면 `Esc`를 두 번 누르거나(`Esc+Esc`) `/rewind`를 사용하여 checkpoint 브라우저를 여세요.

## 예제 1: 데이터베이스 마이그레이션

### 시나리오
MySQL에서 PostgreSQL로 마이그레이션해야 하지만, 직접 마이그레이션과 점진적 이중 쓰기 방식 모두를 탐색하고 싶습니다.

### 워크플로우

```
User: Let's implement a direct migration from MySQL to PostgreSQL
      [Checkpoint A created automatically]

Claude: I'll implement the direct migration...
[Changes database driver, updates queries, modifies schema]

User: Run the tests
      [Checkpoint B created automatically]

Claude: Running tests...
❌ 15 tests failing - connection pool issues

User: This approach has issues. Let's try the dual-write pattern instead.
[User presses Esc+Esc, selects Checkpoint A, chooses "Restore code and conversation"]

User: Now implement a dual-write pattern where we write to both databases

Claude: I'll implement dual-write migration...
[Implements dual-write layer, gradual migration strategy]

User: Run the tests

Claude: Running tests...
✅ All tests passing

User: The dual-write approach is clearly safer. Let's commit this.
```

## 예제 2: 성능 최적화

### 시나리오
여러 성능 최적화 전략을 시도해야 합니다.

### 워크플로우

```
User: Let's optimize the API response time. Current: 450ms
      [Checkpoint "Baseline" created automatically]

Claude: I'll add database query caching...
[Implements Redis caching]

User: Run performance tests

Claude: Results: 280ms average response time (38% improvement)

User: Let me try a different approach.
[User presses Esc+Esc, selects "Baseline" checkpoint, chooses "Restore code and conversation"]

User: Try database query optimization instead

Claude: I'll optimize database queries...
[Adds indexes, optimizes N+1 queries]

User: Run performance tests

Claude: Results: 180ms average response time (60% improvement)

User: Let me also try a third approach.
[User presses Esc+Esc, selects "Baseline" checkpoint, chooses "Restore code and conversation"]

User: Try response compression and CDN

Claude: I'll add compression and CDN...
[Implements gzip, sets up CDN]

User: Run performance tests

Claude: Results: 320ms average response time (29% improvement)

User: Query optimization was the best. Let me go back and combine it with caching.
[User presses Esc+Esc, selects the checkpoint after query optimization, chooses "Restore code and conversation"]

User: Now add Redis caching on top of these optimized queries

Claude: [Adds Redis caching on top of optimized queries]

User: Run performance tests

Claude: Results: 95ms average response time (79% improvement) 🎉

User: Perfect! This is the winner. Let's commit this.
```

## 예제 3: UI/UX 반복 작업

### 시나리오
대시보드의 다양한 레이아웃을 시도합니다.

### 워크플로우

```
User: Let's redesign the dashboard with a sidebar layout
      [Checkpoint "Start" created automatically]

Claude: [Implements sidebar layout]

User: Show me a screenshot

Claude: [Shows screenshot]

User: The sidebar feels cramped. Let's try a top navigation instead.
[User presses Esc+Esc, selects "Start" checkpoint, chooses "Restore code and conversation"]

User: Try a top navigation layout

Claude: [Implements top navigation]

User: Show me a screenshot

Claude: [Shows screenshot]

User: Better, but let's try a card-based grid layout
[User presses Esc+Esc, selects "Start" checkpoint, chooses "Restore code and conversation"]

User: Try a card-based grid layout

Claude: [Implements card grid]

User: Show me a screenshot

Claude: [Shows screenshot]

User: This is great! But can we combine the top nav with the card grid?
[User presses Esc+Esc, selects the checkpoint after the card grid, chooses "Restore code and conversation"]

User: Add top navigation to the card grid layout

Claude: [Adds top navigation to card grid]

User: Perfect! This is the final design.
```

## 예제 4: 디버깅 세션

### 시나리오
여러 가설을 세워 까다로운 버그를 추적합니다.

### 워크플로우

```
User: There's a memory leak in the application
      [Checkpoint "Before debugging" created automatically]

Claude: Let me investigate...
[Analyzes code]

User: I think it's in the event listeners. Let's fix those.

Claude: [Fixes event listener cleanup]

User: Run memory profiler

Claude: Still leaking memory - event listeners weren't the issue

User: Let me go back and try a different hypothesis.
[User presses Esc+Esc, selects "Before debugging" checkpoint, chooses "Restore code and conversation"]

User: Maybe it's the database connections?

Claude: [Implements connection pooling fixes]

User: Run memory profiler

Claude: Still leaking - not the connections either

User: Let me go back and try another angle.
[User presses Esc+Esc, selects "Before debugging" checkpoint, chooses "Restore code and conversation"]

User: Let's check for circular references

Claude: [Finds and fixes circular references in cache]

User: Run memory profiler

Claude: ✅ Memory leak fixed! The circular references in the caching layer were the culprit.

User: Excellent! Let's commit this fix.
```

## 예제 5: API 디자인 발전

### 시나리오
여러 차례 반복하며 REST API를 설계합니다.

### 워크플로우

```
User: Create a REST API for our blog platform
      [Checkpoint "Before API design" created automatically]

Claude: [Creates basic CRUD API]

User: This is too simple. Let's add pagination and filtering

Claude: [Adds pagination and filtering]

User: We need better resource relationships

Claude: [Implements HATEOAS links]

User: Actually, let's try GraphQL instead of REST
[User presses Esc+Esc, selects "Before API design" checkpoint, chooses "Restore code and conversation"]

User: Implement a GraphQL API for our blog platform instead

Claude: [Implements GraphQL API]

User: I think REST is better for our use case.
[User presses Esc+Esc, selects the checkpoint after HATEOAS, chooses "Restore code and conversation"]

User: Let's finalize the REST approach.
```

## 예제 6: 설정 관리

### 시나리오
다양한 설정 접근 방식을 테스트합니다.

### 워크플로우

```
User: Move configuration to environment variables
      [Checkpoint "Original config" created automatically]

Claude: [Implements env var configuration]

User: Test in development

Claude: Works locally but deployment issues in production

User: Let me try a different approach.
[User presses Esc+Esc, selects "Original config" checkpoint, chooses "Restore code and conversation"]

User: Try a config file approach with validation

Claude: [Implements YAML config with JSON schema validation]

User: Test in development

Claude: ✅ Works well, good validation errors

User: Can we also support env vars for sensitive values?

Claude: [Adds env var override for secrets]

User: Test deployment

Claude: ✅ All environments working correctly

User: Perfect! This is production-ready.
```

## 예제 7: 테스트 전략

### 시나리오
포괄적인 테스트를 구현합니다.

### 워크플로우

```
User: Add unit tests for the auth module
      [Checkpoint created automatically]

Claude: [Adds Jest unit tests]

User: Run tests

Claude: 45 tests passing, 78% coverage

User: Add integration tests too

Claude: [Adds integration tests]

User: Run tests

Claude: 89 tests passing, 92% coverage, but tests are slow (3 minutes)

User: The tests are too slow. Let's optimize.

Claude: [Optimizes test setup, adds parallel execution]

User: Run tests

Claude: 89 tests passing, 92% coverage, 35 seconds ✅

User: Great! Now add E2E tests for critical paths

Claude: [Adds Playwright E2E tests]

User: Run all tests

Claude: 112 tests passing, 94% coverage, 2 minutes

User: Perfect balance of coverage and speed!
```

## 예제 8: Checkpoint에서 요약 사용

### 시나리오
긴 디버깅 세션 후, 컨텍스트를 유지하면서 대화를 압축하고 싶습니다.

### 워크플로우

```
User: [After 20+ messages of debugging and exploration]

[User presses Esc+Esc, selects an early checkpoint, chooses "Summarize from here"]
[Optionally provides instructions: "Focus on what we tried and what worked"]

Claude: [Generates a summary of the conversation from that point forward]
[Original messages are preserved in the transcript]
[The summary replaces the visible conversation, reducing context window usage]

User: Now let's continue with the approach that worked.
```

## 핵심 요점

1. **Checkpoint은 자동입니다**: 모든 사용자 프롬프트가 checkpoint을 생성합니다 — 수동 저장이 필요 없습니다
2. **Esc+Esc 또는 /rewind 사용**: checkpoint 브라우저에 접근하는 두 가지 방법입니다
3. **올바른 복원 옵션 선택**: 필요에 따라 코드, 대화, 둘 다, 또는 요약을 선택하세요
4. **실험을 두려워하지 마세요**: Checkpoint 덕분에 과감한 변경도 안전하게 시도할 수 있습니다
5. **Git과 함께 사용**: 탐색에는 checkpoint을, 확정된 작업에는 git을 사용하세요
6. **긴 세션 요약**: "여기서부터 요약"을 사용하여 대화를 관리 가능하게 유지하세요

---
