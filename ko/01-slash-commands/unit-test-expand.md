---
name: Expand Unit Tests
description: Increase test coverage by targeting untested branches and edge cases
---

# 단위 테스트 확장

프로젝트의 테스트 프레임워크에 맞게 기존 단위 테스트를 확장합니다:

1. **커버리지 분석**: 커버리지 리포트를 실행하여 테스트되지 않은 분기, 엣지 케이스, 낮은 커버리지 영역 식별
2. **간격 식별**: 논리적 분기, 오류 경로, 경계 조건, null/빈 입력에 대한 코드 검토
3. **테스트 작성** 프로젝트의 프레임워크 사용:
   - Jest/Vitest/Mocha (JavaScript/TypeScript)
   - pytest/unittest (Python)
   - Go testing/testify (Go)
   - Rust test framework (Rust)
4. **특정 시나리오 대상**:
   - 오류 처리 및 예외
   - 경계값 (min/max, 빈 값, null)
   - 엣지 케이스 및 코너 케이스
   - 상태 전환 및 부작용
5. **개선 확인**: 커버리지를 다시 실행하여 측정 가능한 증가 확인

새로운 테스트 코드 블록만 제시합니다. 기존 테스트 패턴과 명명 규칙을 따릅니다.

---
