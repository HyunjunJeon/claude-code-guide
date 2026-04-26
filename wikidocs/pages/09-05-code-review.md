Claude Code Code Review는 Anthropic 호스팅 인프라에서 GitHub 풀 리퀘스트를 분석하고, 문제를 찾으면 해당 변경 라인에 인라인 코멘트를 남기는 관리형 PR 리뷰 기능입니다. 로컬 CLI 명령이 아니라 조직 단위로 켜는 호스팅 리뷰 워크플로우라는 점이 핵심입니다.

## 개요

공식 문서 기준으로 Code Review는 Team 및 Enterprise 플랜에서 제공되는 research preview입니다. 조직에 Zero Data Retention이 활성화되어 있으면 사용할 수 없습니다.

주요 동작:

- PR diff와 저장소 주변 문맥을 함께 분석
- 문제가 발견된 라인에 인라인 코멘트 작성
- `Claude Code Review` 체크 런을 생성
- 자동 또는 수동 트리거 지원
- `CLAUDE.md`와 `REVIEW.md`로 리뷰 기준 조정 가능

이 기능은 PR을 직접 approve 하거나 block 하지 않습니다. 리뷰 결과는 참고용이며, 최종 병합 정책은 기존 브랜치 보호 규칙과 리뷰 프로세스가 담당합니다.

## 리뷰가 동작하는 방식

리뷰가 시작되면 Claude는 여러 에이전트를 사용해 PR diff와 관련 코드 문맥을 병렬로 분석합니다. 이후 검증 단계가 후보 이슈를 한 번 더 걸러서, 실제로 의미 있는 결과만 GitHub에 게시하도록 설계되어 있습니다.

공식 severity 범주는 다음과 같습니다.

- `Important`: 병합 전에 고쳐야 할 가능성이 높은 버그
- `Nit`: 고치면 좋지만 보통 블로커는 아닌 이슈
- `Pre-existing`: 이번 PR이 아니라 기존 코드에 있던 문제

문제가 없으면 인라인 코멘트 대신 짧은 확인 메시지가 남습니다.

## 설정 흐름

설정은 저장소마다 개발자가 하는 작업이 아니라, 관리자가 조직 단위로 한 번 수행합니다.

1. `claude.ai/admin-settings/claude-code`를 엽니다.
2. Code Review 섹션에서 설정을 시작합니다.
3. Claude GitHub App을 설치합니다.
4. 리뷰할 저장소에 앱 접근 권한을 부여합니다.
5. 저장소별 리뷰 트리거 방식을 선택합니다.

공식 문서 기준으로 GitHub App은 contents, issues, pull requests 등에 읽기/쓰기 권한을 요청합니다. 이는 인라인 리뷰, 체크 런 작성, 관련 자동화까지 커버하기 위한 범위입니다.

## 트리거 방식

저장소별로 세 가지 방식 중 하나를 선택할 수 있습니다.

- `Once after PR creation`: PR이 열리거나 ready 상태가 될 때 한 번 실행
- `After every push`: PR 브랜치에 push가 있을 때마다 재실행
- `Manual`: 사람이 명시적으로 요청할 때만 실행

수동 트리거 명령:

- `@claude review`: 지금 리뷰를 실행하고 이후 push에도 계속 리뷰
- `@claude review once`: 현재 상태만 한 번 리뷰

이 명령은 인라인 답글이 아니라 PR의 top-level comment로 남기는 편이 안전합니다.

## 리뷰 기준 커스터마이징

Claude는 두 개의 파일을 참고해 리뷰 기준을 조정합니다.

- `CLAUDE.md`: Claude Code 전반에 적용되는 공통 프로젝트 지침
- `REVIEW.md`: 리뷰 파이프라인에 더 강한 우선순위로 주입되는 리뷰 전용 지침

실무적으로는 이렇게 나누는 것이 좋습니다.

- 일반 개발 세션에도 적용되어야 하는 규칙은 `CLAUDE.md`
- 리뷰에서만 강조할 severity 규칙, 예외, 리포팅 방식은 `REVIEW.md`

노이즈가 많은 저장소일수록 `REVIEW.md`를 짧고 구체적으로 두는 편이 효과적입니다.

## 체크 런과 자동화

모든 리뷰는 `Claude Code Review` 체크 런을 남깁니다. GitHub가 특정 라인에 인라인 코멘트를 못 붙이더라도, 체크 런 요약과 annotation은 남아 있을 수 있습니다.

운영상 중요한 점:

- 체크 런 결과는 neutral이라 기본적으로 병합을 막지 않습니다
- 병합 게이트로 쓰고 싶다면, 별도 워크플로우에서 체크 출력 내용을 읽어 정책화해야 합니다

즉, 이 기능은 기존 브랜치 보호를 대체하기보다 보강하는 방향에 가깝습니다.

## 비용과 적합한 사용처

비용은 PR 크기와 복잡도에 따라 커집니다. 트리거 방식도 총비용에 직접 영향을 줍니다.

- PR당 한 번 리뷰가 가장 저렴
- push마다 리뷰는 가장 빠른 피드백 루프
- Manual은 비용 통제에 유리

다음 조건이면 Code Review가 잘 맞습니다.

- GitHub.com 저장소를 쓰고 있고
- Anthropic이 호스팅하는 관리형 리뷰를 원하며
- 별도 CI 러너에 Claude를 직접 올리고 싶지는 않을 때

반대로 자신의 CI 인프라에서 Claude를 실행하고 싶다면 GitHub Actions 또는 GitLab CI/CD가 더 맞습니다.

## 문제 해결

### 리뷰가 시작되지 않음

다음을 확인합니다.

- 저장소가 Claude Code admin settings에 포함되어 있는지
- Claude GitHub App이 해당 저장소에 설치되어 있는지
- PR이 열려 있는지
- 저장소의 트리거 방식이 기대한 것과 일치하는지

Manual 모드라면 `@claude review` 또는 `@claude review once`를 top-level comment로 남깁니다.

### 리뷰가 실패하거나 시간 초과됨

실패한 리뷰는 병합을 막지 않지만 자동 재시도도 기본 동작은 아닙니다. 보통은 `@claude review once`로 다시 요청하거나, push-triggered 저장소라면 새 커밋을 올려 재실행합니다.

### 인라인 코멘트가 보이지 않음

`Claude Code Review` 체크 런의 상세 페이지를 먼저 확인합니다. diff 라인이 이동했거나 오래된 경우 GitHub가 인라인 코멘트를 거부해도, 체크 런 요약과 annotation은 남아 있을 수 있습니다.

### 리뷰 결과가 너무 시끄러움

`CLAUDE.md`를 정리하고, `REVIEW.md`에서 무엇을 `Important`로 볼지 더 명확히 정의합니다.

## 관련 링크

- [공식 Code Review 문서](https://code.claude.com/docs/ko/code-review)
- [공식 GitHub Actions 문서](https://code.claude.com/docs/ko/github-actions)
- [공식 GitHub Enterprise Server 문서](https://code.claude.com/docs/ko/github-enterprise-server)
- [공식 GitLab CI/CD 문서](https://code.claude.com/docs/ko/gitlab-ci-cd)
- [Zero Data Retention](11-11-zero-data-retention.md)
- [지침과 메모 관리](02-memory.md)
