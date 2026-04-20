
# 플래닝 모드 & 확장 사고

## Plan Mode

Plan mode는 Claude가 구현하기 전에 복잡한 작업을 면밀히 검토하고, 검토 및 승인할 수 있는 상세한 계획을 생성할 수 있게 합니다.

### Plan Mode란?

Plan mode는 두 단계 접근 방식입니다:
1. **계획 단계**: Claude가 작업을 분석하고 상세한 구현 계획을 생성합니다
2. **구현 단계**: 승인 후, Claude가 계획을 실행합니다

### Plan Mode를 사용할 때

✅ 다음 경우에 plan mode를 사용하세요:
- 복잡한 다중 파일 리팩터링
- 새로운 기능 구현
- 아키텍처 변경
- 데이터베이스 마이그레이션
- 대규모 API 재설계

❌ 다음 경우에는 plan mode를 사용하지 마세요:
- 단순한 버그 수정
- 포맷팅 변경
- 단일 파일 편집
- 간단한 질문

### Plan Mode 활성화

**Slash command**:
```bash
/plan Implement user authentication system
```

**CLI 플래그**:
```bash
claude --permission-mode plan
```

**기본값으로 설정**:
```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

**키보드 단축키**:
- `Shift + Tab` - 권한 모드 전환 (plan 포함)
- `Alt + M` - 권한 모드 전환 (Windows/Linux)

### Plan Mode의 이점

- **구조화된 구현 접근**: 구현 단계의 상세한 분석
- **검토 및 승인**: 실행 전에 계획을 검토하고 조정
- **위험 식별**: 구현 전에 잠재적 문제를 식별
- **명확한 단계**: 체계적인 구현 단계 및 마일스톤

### 예제: 기능 구현

```
User: /plan Add a real-time notification system

Claude: I'll create a plan for implementing real-time notifications.

## Implementation Plan

### Phase 1: Infrastructure Setup
1. Install WebSocket libraries (socket.io)
2. Set up WebSocket server
3. Configure connection management

### Phase 2: Backend Implementation
4. Create notification service
5. Implement notification queue
6. Add database schema for notifications
7. Create API endpoints

### Phase 3: Frontend Integration
8. Set up WebSocket client
9. Create notification UI components
10. Implement notification state management
11. Add notification permissions

### Phase 4: Testing & Deployment
12. Write unit tests
13. Write integration tests
14. Update documentation
15. Deploy to staging

Estimated time: 3-4 hours
Files to modify: 12
New files to create: 8

Ready to proceed? (yes/no/modify plan)

User: yes

Claude: [Begins implementation following the plan]
```

### 계획 수정

```
User: Modify the plan - skip the queue for now, we'll add it later

Claude: Updated plan:
[Shows modified plan with queue removed]

User: Looks good, proceed

Claude: [Implements modified plan]
```

### Plan Mode 설정

Plan mode는 CLI 플래그 또는 slash command로 활성화됩니다:

```bash
# CLI로 plan mode 활성화
claude --permission-mode plan

# 또는 REPL 내에서 /plan slash command 사용
/plan Implement user authentication system
```

**계획용 모델 별칭**: `opusplan`을 모델 별칭으로 사용하면 Opus로 계획을 수립하고 Sonnet으로 실행합니다:

```bash
claude --model opusplan "design and implement the new API"
```

**외부에서 계획 편집**: `Ctrl+G`를 눌러 현재 계획을 외부 편집기에서 상세하게 수정할 수 있습니다.

### Ultraplan

`/ultraplan <prompt>`를 사용하면 엔드투엔드 계획 워크플로우를 실행할 수 있습니다: Claude가 상세한 계획을 작성하고, 브라우저에서 검토한 후, 원격으로 계획을 실행하거나 로컬 실행을 위해 터미널로 전송합니다.

---

## Extended Thinking

Extended thinking은 Claude가 솔루션을 제공하기 전에 복잡한 문제에 대해 더 많은 시간을 들여 추론할 수 있게 합니다.

### Extended Thinking이란?

Extended thinking은 Claude가 다음을 수행하는 신중한 단계별 추론 프로세스입니다:
- 복잡한 문제를 분해합니다
- 여러 접근 방식을 고려합니다
- 트레이드오프를 평가합니다
- 엣지 케이스를 검토합니다

### Extended Thinking 활성화

**키보드 단축키**:
- `Option + T` (macOS) / `Alt + T` (Windows/Linux) - Extended thinking 토글

**자동 활성화**:
- 모든 모델에서 기본적으로 활성화되며, `Alt+T` / `Option+T` 토글이나 설정을 통해 항상 켜둘 수 있습니다 (Opus 4.7, Opus 4.6, Sonnet 4.6, Haiku 4.5)
- Opus 4.7: 항상 adaptive reasoning을 사용합니다. 기본 노력 수준은 `xhigh`
- Opus 4.6: 노력 수준에 따른 적응형 추론: `low` (○), `medium` (◐), `high` (●)
- 기타 모델: 최대 31,999 토큰의 고정 예산

**설정 방법**:
- 토글: `Alt+T` / `Option+T`, 또는 `/config`를 통해
- 추론 보기: `Ctrl+O` (상세 모드)
- 노력 설정: `/effort` 명령어 또는 `--effort` 플래그

**사용자 정의 예산**:
```bash
export MAX_THINKING_TOKENS=1024
```

**노력 수준**:
```bash
export CLAUDE_CODE_EFFORT_LEVEL=high   # low (○), medium (◐), high (●), xhigh (Opus 4.7 default), or max
```

**CLI 플래그**:
```bash
claude --effort high "complex architectural review"
```

**Interactive effort slider:**
```bash
/effort          # 대화형 슬라이더 (방향키)
/effort xhigh    # 직접 설정
/effort auto     # 모델 기본값으로 리셋
```

### Effort Levels

| Level | Opus 4.7 | Opus 4.6 / Sonnet 4.6 | Notes |
|-------|----------|----------------------|-------|
| `low` (○) | ✅ | ✅ | 지연 시간 민감 작업 |
| `medium` (◐) | ✅ | ✅ | 비용 민감 작업 |
| `high` (●) | ✅ | ✅ (4.6 기본값) | 균형 잡힌 |
| `xhigh` | ✅ **(4.7 기본값)** | ❌ (`high`로 폴백) | 신규 — Opus 4.7 전용 |
| `max` | ✅ | ✅ | 세션 전용; 가장 깊은 추론 |

> **참고:** Opus 4.7은 항상 adaptive reasoning을 사용합니다. `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` 환경 변수와 `MAX_THINKING_TOKENS` 고정 예산은 Opus 4.7에 적용되지 않습니다.

> **참고:** 프롬프트에서 "ultrathink" 키워드를 사용하면 딥 추론 모드가 활성화됩니다. 노력 수준 `low`, `medium`, `high`, `xhigh` (Opus 4.7 기본값), `max`는 Claude가 수행하는 추론의 양을 제어합니다.

> **참고**: v2.1.94부터 API 키, Bedrock/Vertex/Foundry, Team, Enterprise 사용자의 기본 노력 수준이 `medium`에서 `high`로 변경되었습니다 (Opus 4.6). Opus 4.7의 기본값은 `xhigh`입니다.

### Extended Thinking의 이점

- **깊은 추론**: 복잡한 문제에 대해 더 많은 시간을 들여 사고합니다
- **더 나은 아키텍처 결정**: 포괄적인 평가를 통해 정보에 기반한 선택을 합니다
- **엣지 케이스 고려**: 잠재적인 문제와 시나리오를 면밀히 검토합니다
- **철저한 분석**: 복잡한 문제 해결에 대한 구조화된 접근

### 예제: 아키텍처 결정

```
User: /think Should we use microservices or a monolith for our e-commerce platform?

Claude: Let me think through this architectural decision carefully...

<extended_thinking>
## Context Analysis
- Team size: 5 developers
- Expected traffic: 10k daily users initially
- Need to scale to 100k+ users
- Limited DevOps resources
- 6-month timeline to MVP

## Approach 1: Microservices
Pros:
+ Independent scaling
+ Technology flexibility
+ Team independence
+ Fault isolation

Cons:
- Operational complexity
- Network overhead
- Distributed tracing needed
- Requires DevOps expertise
- Slower initial development

## Approach 2: Monolith
Pros:
+ Simpler deployment
+ Faster initial development
+ Easier debugging
+ Lower operational overhead
+ Single codebase

Cons:
- Scaling challenges later
- All-or-nothing deployments
- Technology lock-in
- Potential for tight coupling

## Decision Factors
1. Team size (5 devs) → Favors monolith
2. DevOps resources (limited) → Favors monolith
3. Timeline (6 months) → Favors monolith
4. Future scale (100k users) → Achievable with monolith + caching
5. Complexity budget → Limited

## Recommendation
Start with a **modular monolith**:
- Single deployment unit
- Clear module boundaries
- Clean interfaces between modules
- Prepare for future extraction to microservices if needed

This gives you:
✓ Fast initial development
✓ Low operational complexity
✓ Option to extract services later
✓ Clear architecture

Migration path: When you reach 50k+ users or specific modules need independent scaling, extract those modules into microservices.
</extended_thinking>

**Recommendation**: Implement a modular monolith with clean module boundaries.

This approach balances your current constraints (team size, timeline, DevOps resources) with future scalability needs. You can migrate specific modules to microservices later when there's a clear business need.
```

### Extended Thinking 설정

Extended thinking은 환경 변수, 키보드 단축키, CLI 플래그로 제어됩니다:

```bash
# thinking 토큰 예산 설정 (Opus 4.7에는 적용되지 않음)
export MAX_THINKING_TOKENS=16000

# 노력 수준 설정: low (○), medium (◐), high (●), xhigh (Opus 4.7 기본값), or max
export CLAUDE_CODE_EFFORT_LEVEL=xhigh
```

세션 중에 `Alt+T` / `Option+T`로 토글하고, `/effort`로 노력 수준을 설정하거나, `/config`를 통해 구성할 수 있습니다.

---
