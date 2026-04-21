# 서버 관리 설정

이 문서는 Anthropic 서버에서 Claude.ai 관리자 콘솔을 통해 전달되는 관리형 설정만 다룹니다. 일반 설정 가이드와는 목적이 다릅니다. 사용자/프로젝트/로컬 설정의 전체 구조는 별도의 설정 문서를 참고하세요. 서버 관리 설정은 MDM이 없거나, 관리되지 않는 장치의 사용자에게도 조직 전체 정책을 강제해야 할 때 적합합니다.

## 개요

서버 관리 설정은 JSON 형식의 중앙 정책입니다. Claude Code는 시작 시점과 실행 중에 Anthropic 서버에서 이 설정을 받아 적용하며, 조직에서 가장 우선순위가 높은 관리형 소스로 취급합니다.

다음과 같은 경우에 사용합니다.

- 조직 전체에 동일한 보안 정책을 강제해야 할 때
- 권한, 훅, 환경 변수, 관리 전용 설정을 중앙에서 배포해야 할 때
- 장치 관리 도구 없이도 정책을 배포해야 할 때

이미 MDM 또는 OS 정책으로 장치를 관리한다면, 더 강한 로컬 강제력을 제공하는 엔드포인트 관리 설정이 더 적합합니다.

## 요구사항

- Claude for Teams 또는 Claude for Enterprise
- 해당 플랜에서 지원되는 Claude Code 버전
- `api.anthropic.com` 네트워크 접근

## 설정과의 차이

일반 설정 문서는 사용자 설정, 프로젝트 설정, 로컬 설정, 관리형 설정의 전체 우선순위를 설명합니다. 이 페이지는 그중 서버에서 전달되는 관리형 소스만 설명합니다.

핵심 차이점은 다음과 같습니다.

- 서버 관리 설정은 Claude.ai 관리자 콘솔에서 전달됩니다.
- 사용자, 프로젝트, 명령행 설정으로 덮어쓸 수 없습니다.
- 시작 시 가져오고, 실행 중 주기적으로 갱신합니다.
- 엔드포인트 관리 설정과는 별개입니다.

## 설정 방법

1. Claude.ai 관리자 설정을 엽니다.
2. Claude Code 관리 설정 메뉴로 이동합니다.
3. 정책 JSON을 입력합니다.
4. 저장 후 배포합니다.

형식은 `settings.json`과 동일하므로 권한, 환경 변수, 훅, 기타 지원 옵션을 같은 방식으로 사용할 수 있습니다. 또한 `allowManagedPermissionRulesOnly` 나 `forceRemoteSettingsRefresh` 같은 관리 전용 키도 넣을 수 있습니다.

예시:

```json
{
  "permissions": {
    "deny": [
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true
}
```

## 우선순위 와 전달

관리형 설정은 Claude Code 설정 계층에서 최상위입니다. 관리형 설정 안에서는 서버 관리 설정이 엔드포인트 관리 설정보다 먼저 확인됩니다. 서버 관리 설정에 키가 하나라도 있으면 엔드포인트 관리 설정은 무시됩니다. 서버 관리 설정이 비어 있을 때만 엔드포인트 관리 설정으로 넘어갑니다.

동작 특성도 기억해야 합니다.

- Claude Code는 시작 시 설정을 가져오고, 실행 중에는 약 1시간 간격으로 갱신합니다.
- 최초 실행에서는 가져오기가 끝나기 전까지 정책이 즉시 적용되지 않을 수 있습니다.
- 캐시가 있으면 다음 실행부터 즉시 적용됩니다.
- 대부분의 변경은 재시작 없이 반영되지만, 일부 고급 설정은 전체 재시작이 필요합니다.

중간의 비강제 상태를 허용할 수 없다면 `forceRemoteSettingsRefresh: true` 를 설정해 원격 정책을 새로 받지 못하면 시작하지 않도록 만들 수 있습니다.

## 접근 제어

다음 Claude.ai 역할만 서버 관리 설정을 관리할 수 있습니다.

- Primary Owner
- Owner

정책은 조직 전체에 적용되므로 변경 권한은 신뢰할 수 있는 사람에게만 줘야 합니다.

## 제한 사항

- 정책은 조직 전체에 동일하게 적용되며, 그룹별 분리는 아직 지원되지 않습니다.
- MCP 서버 구성은 서버 관리 설정으로 배포할 수 없습니다.
- 서버 관리 설정은 `api.anthropic.com` 에 직접 연결해야 하며, 서드파티 모델 공급자나 커스텀 `ANTHROPIC_BASE_URL` 에서는 사용할 수 없습니다.

## 확인 방법

실무에서 가장 간단한 확인 방법은 다음과 같습니다.

```bash
claude
```

Claude Code 안에서:

```text
/status
/permissions
```

`/status` 로 어떤 관리형 소스가 활성화되었는지 확인하고, `/permissions` 로 실제 적용된 권한 규칙을 확인합니다. 시작 시 경고나 승인 대화상자가 떠야 하는 정책이라면, 사용자가 재시작했을 때 바로 보이는지도 확인합니다.

## 공식 문서 링크

- [서버 관리 설정](https://code.claude.com/docs/ko/server-managed-settings)
- [Claude Code 설정](https://code.claude.com/docs/ko/settings)
- [인증](https://code.claude.com/docs/ko/authentication)
