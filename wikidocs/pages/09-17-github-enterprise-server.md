Claude Code는 self-hosted GitHub Enterprise Server 인스턴스와 연결할 수 있어서, `github.com`이 아니라 사내 GHES에 저장된 저장소에서도 Claude Code 웹 세션, 호스팅 Code Review, 내부 플러그인 마켓플레이스를 사용할 수 있습니다.

## 개요

공식 문서 기준 GitHub Enterprise Server 지원은 Team 및 Enterprise 플랜에서 제공됩니다.

관리자가 GHES 인스턴스를 Claude Code에 연결해 두면, 개발자는 저장소마다 별도 설정을 반복하지 않고 해당 인스턴스의 저장소를 사용할 수 있습니다.

공식 문서가 강조하는 지원 범위:

- GHES 저장소 대상 웹 세션
- GHES 저장소 대상 호스팅 Code Review
- GHES에 호스팅된 내부 plugin marketplace

이 문서는 GHES 저장소 연동 자체를 다룹니다. GHES 러너에서 GitHub Actions를 돌리는 별도 주제와는 다릅니다.

## 관리자 설정

설정은 조직 단위로 한 번 수행합니다.

1. `claude.ai/admin-settings/claude-code`를 엽니다.
2. GitHub Enterprise Server 섹션으로 이동합니다.
3. `Connect`를 누릅니다.
4. 연결 표시 이름과 GHES hostname을 입력합니다.
5. 사설 CA 또는 self-signed 인증서를 쓰는 경우 CA 인증서를 제공합니다.
6. GitHub Enterprise로 이동해 생성된 manifest로 GitHub App을 만듭니다.
7. Claude가 접근해야 할 저장소나 조직에 앱을 설치합니다.
8. Claude admin settings로 돌아와 필요한 기능을 활성화합니다.

브라우저 redirect 방식이 막힌 환경이라면 공식 문서에 manual setup 경로도 있습니다.

## GitHub App 권한

공식 문서 기준 생성되는 앱은 웹 세션, 리뷰, 관련 기능을 위해 다음 수준의 권한이 필요합니다.

- contents 읽기/쓰기
- pull requests 읽기/쓰기
- issues 읽기/쓰기
- checks 읽기/쓰기
- actions 읽기
- repository hooks 읽기/쓰기
- metadata 읽기

또한 pull request, issue comment, review comment, review, check run 이벤트를 구독합니다.

이 권한 범위는 단순 clone 용도보다 넓습니다. Claude가 브랜치를 푸시하고, PR 코멘트를 남기고, 체크 런을 게시해야 하기 때문입니다.

## 수동 설정

가이드형 연결이 불가능하다면 GHES에 앱을 수동으로 만든 뒤, Claude admin form에 자격 증명을 직접 입력할 수 있습니다.

공식 문서가 요구하는 주요 항목:

- hostname
- OAuth client ID / secret
- GitHub App ID
- client ID / secret
- webhook secret
- private key

보통은 네트워크 정책 때문에 redirect 기반 설정이 막힌 엔터프라이즈 환경에서 이 경로를 사용합니다.

## 개발자 입장에서의 사용 흐름

관리자 설정이 끝난 뒤에는 개발자 경험이 일반 GitHub 저장소와 비슷해집니다. 핵심은 저장소마다 Claude용 앱 설치나 별도 초기화를 반복하지 않는다는 점입니다.

대표 흐름:

- GHES 저장소에 대해 웹 세션 시작
- GHES PR에 대해 호스팅 Code Review 사용
- 같은 GHES 인스턴스의 내부 plugin marketplace 활용

개발자 관점에서 연결 문제가 생기면, 먼저 관리자가 GHES 연결을 완료했고 해당 저장소에 앱을 설치했는지 확인하는 것이 가장 빠릅니다.

## GHES의 Plugin Marketplace

Claude Code는 GHES에 호스팅된 plugin marketplace도 사용할 수 있습니다. 중요한 차이는 `owner/repo` 축약형이 아니라 전체 git URL을 써야 한다는 점입니다.

예시:

```bash
/plugin marketplace add git@github.example.com:platform/claude-plugins.git
/plugin marketplace add https://github.example.com/platform/claude-plugins.git
```

조직이 managed settings로 marketplace 소스를 제한한다면, 관리자가 `hostPattern` 규칙으로 GHES 호스트를 허용하거나 내부 marketplace를 미리 등록할 수 있습니다.

## 제한 사항과 적합한 환경

다음 조건이면 GHES 연동이 적합합니다.

- 코드가 사내 self-managed GitHub 인스턴스에 있어야 할 때
- `github.com`으로 옮기지 않고도 Claude Code 웹 세션이나 호스팅 리뷰를 쓰고 싶을 때
- 내부 플러그인 배포도 GHES 안에서 관리하고 싶을 때

다만 호스팅 기능이 정상 동작하려면 Anthropic 인프라에서 GHES 인스턴스로의 네트워크 도달성이 확보되어야 합니다.

## 문제 해결

### 웹 세션이 저장소 clone에 실패함

`claude --remote`가 clone 오류를 내면 다음을 확인합니다.

- 관리자가 GHES 연결을 완료했는지
- 대상 저장소에 GitHub App이 설치되어 있는지
- Claude에 등록된 hostname과 git remote의 hostname이 일치하는지

### marketplace 추가가 policy 오류로 막힘

`/plugin marketplace add`가 차단되면, 조직이 marketplace 소스를 제한 중일 가능성이 큽니다. 관리자가 managed settings에서 GHES hostname을 허용해야 합니다.

### GHES 인스턴스에 도달하지 못함

호스팅 리뷰나 웹 세션이 시간 초과된다면, Anthropic 인프라에서 GHES 인스턴스로 접근 가능한지와 필요한 방화벽 인바운드 규칙이 열려 있는지 확인합니다.

## 관련 링크

- [공식 GHES 문서](https://code.claude.com/docs/ko/github-enterprise-server)
- [공식 Code Review 문서](https://code.claude.com/docs/ko/code-review)
- [Managed settings](11-10-server-managed-settings.md)
- [플러그인과 마켓플레이스 참고](12-13-plugins.md)
