# 코드 리뷰 발견 사항 템플릿

코드 리뷰 중 발견된 각 문제를 문서화할 때 이 템플릿을 사용합니다.

---

## 문제: [제목]

### 심각도
- [ ] Critical (배포 차단)
- [ ] High (머지 전 수정 필요)
- [ ] Medium (곧 수정 필요)
- [ ] Low (있으면 좋음)

### 카테고리
- [ ] 보안
- [ ] 성능
- [ ] 코드 품질
- [ ] 유지보수성
- [ ] 테스트
- [ ] 디자인 패턴
- [ ] 문서화

### 위치
**파일:** `src/components/UserCard.tsx`

**줄:** 45-52

**함수/메서드:** `renderUserDetails()`

### 문제 설명

**무엇:** 문제가 무엇인지 설명합니다.

**왜 중요한지:** 영향을 설명하고 왜 수정이 필요한지 설명합니다.

**현재 동작:** 문제가 있는 코드 또는 동작을 보여줍니다.

**예상 동작:** 대신 어떻게 되어야 하는지 설명합니다.

### 코드 예시

#### 현재 (문제가 있는 코드)

```typescript
// N+1 쿼리 문제를 보여줍니다
const users = fetchUsers();
users.forEach(user => {
  const posts = fetchUserPosts(user.id); // 사용자당 쿼리 발생!
  renderUserPosts(posts);
});
```

#### 제안된 수정

```typescript
// JOIN 쿼리로 최적화
const usersWithPosts = fetchUsersWithPosts();
usersWithPosts.forEach(({ user, posts }) => {
  renderUserPosts(posts);
});
```

### 영향 분석

| 측면 | 영향 | 심각도 |
|--------|--------|----------|
| 성능 | 20명의 사용자에 대해 100+ 쿼리 | High |
| 사용자 경험 | 느린 페이지 로드 | High |
| 확장성 | 규모가 커지면 문제 발생 | Critical |
| 유지보수성 | 디버깅 어려움 | Medium |

### 관련 문제

- `AdminUserList.tsx` 120줄에 유사한 문제
- 관련 PR: #456
- 관련 이슈: #789

### 추가 리소스

- [N+1 Query Problem](https://en.wikipedia.org/wiki/N%2B1_problem)
- [Database Join Documentation](https://docs.example.com/joins)

### 리뷰어 메모

- 이 코드베이스에서 흔히 발견되는 패턴입니다
- 코드 스타일 가이드에 추가하는 것을 고려하십시오
- 헬퍼 함수를 만드는 것이 좋을 수 있습니다

### 작성자 응답 (피드백용)

*코드 작성자가 작성:*

- [ ] 수정이 커밋에 구현됨: `abc123`
- [ ] 수정 상태: 완료 / 진행 중 / 논의 필요
- [ ] 질문 또는 우려 사항: (설명)

---

## 발견 사항 통계 (리뷰어용)

여러 발견 사항을 검토할 때 추적합니다:

- **총 발견된 문제:** X
- **Critical:** X
- **High:** X
- **Medium:** X
- **Low:** X

**권장 사항:** Approve / Request Changes / Needs Discussion

**전반적인 코드 품질:** 1-5점
