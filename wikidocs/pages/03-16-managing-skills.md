이 문서는 설치된 스킬을 보고·테스트·업데이트하고 Claude의 호출 권한을 제한하는 일상 운영 방법을 정리합니다.
스킬을 처음 배포한 직후, 또는 권한 정책을 손보거나 잘못 호출되는 스킬을 차단해야 할 때 봅니다.
`/permissions`의 `Skill(...)` 규칙은 슬래시 명령과 동일한 패턴으로 동작합니다.

## 사용 가능한 스킬 보기

Claude에 직접 물어보십시오:

```
What Skills are available?
```

또는 파일 시스템을 확인하십시오:

```bash
# 개인 스킬 목록
ls ~/.claude/skills/

# 프로젝트 스킬 목록
ls .claude/skills/
```

## 스킬 테스트

두 가지 테스트 방법이 있습니다:

**설명과 일치하는 요청을 통해 Claude가 자동으로 호출하게 합니다**:

```
Can you help me review this code for security issues?
```

**또는 스킬 이름으로 직접 호출합니다**:

```
/code-review src/auth/login.ts
```

## 스킬 업데이트

`SKILL.md` 파일을 직접 편집하십시오. 변경 사항은 다음 Claude Code 시작 시 적용됩니다.

```bash
# 개인 스킬
code ~/.claude/skills/my-skill/SKILL.md

# 프로젝트 스킬
code .claude/skills/my-skill/SKILL.md
```

## Claude의 스킬 접근 제한

Claude가 호출할 수 있는 스킬을 제어하는 세 가지 방법이 있습니다:

**모든 스킬 비활성화** `/permissions`에서:

```
# 거부 규칙에 추가:
Skill
```

**특정 스킬 허용 또는 거부**:

```
# 특정 스킬만 허용
Skill(commit)
Skill(review-pr *)

# 특정 스킬 거부
Skill(deploy *)
```

**개별 스킬 숨기기** frontmatter에 `disable-model-invocation: true`를 추가합니다.
