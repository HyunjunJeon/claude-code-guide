이 문서는 Claude Code 설정 시스템 전체를 다룹니다. 설정이 어디에 있고, 어떤 소스가 우선하며, 충돌을 어떻게 해석해야 하는지에 초점을 둡니다.

## 설정 우선순위

공식 configuration 문서는 다음 순서를 정의합니다.

1. managed settings
2. command-line arguments
3. 로컬 프로젝트 설정: `.claude/settings.local.json`
4. 공유 프로젝트 설정: `.claude/settings.json`
5. 사용자 설정: `~/.claude/settings.json`

즉, 조직 정책이 가장 강하고, 현재 세션의 CLI 플래그도 로컬 파일보다 강합니다.

## 왜 중요한가

"Claude가 내 설정을 무시했다"는 문제의 상당수는 실제로 우선순위 문제입니다.

대표적인 예:

- 사용자 설정은 허용하지만 프로젝트 설정이 차단함
- 현재 세션 플래그가 파일 설정을 덮어씀
- managed settings가 로컬 커스터마이징을 막고 있음

## 배열 병합

공식 문서가 특별히 강조하는 규칙:

- 배열형 설정은 스코프를 넘어 병합되고 deduplicate되며, 단순 교체되지 않습니다

영향을 받는 대표 항목:

- sandbox write path
- permission allow rule
- 일부 hook allowlist

즉, 우선순위가 낮은 스코프도 항목을 추가할 수 있습니다.

## 주요 설정 계열

configuration 페이지는 많은 키를 다루지만, 운영상 특히 중요한 계열은 다음입니다.

- `permissions`
- `hooks`
- `env`
- `sandbox`
- 모델 선택과 로그인 제한
- plugin 및 managed policy 제어

전체 시스템을 이해하려면 먼저 이 계열부터 보는 편이 좋습니다.

## 현재 활성 설정 확인

공식 문서가 가장 먼저 권하는 명령은 `/status`입니다.

여기서 확인할 수 있는 것:

- 어떤 설정 레이어가 활성화되었는지
- 각각 어디에서 왔는지
- 파싱 오류나 검증 오류가 있는지

로컬 설정이 안 먹는 것처럼 보일 때 가장 빠른 진단 경로입니다.

## 좋은 운영 방식

- 팀 기본값은 공유 프로젝트 설정에 두고
- 개인 오버라이드는 `settings.local.json`에 두고
- enforced policy는 managed settings에 두고
- 위험한 설정은 `CLAUDE.md`나 팀 문서에 이유를 남깁니다

## 관련 가이드

- [Settings System Guide](09-27-settings-system-guide.md)
- [Environment Variables](10-02-env-vars.md)
- [Permissions and Security](09-21-permissions-and-security.md)

## 공식 출처

- [Claude Code settings](https://code.claude.com/docs/ko/configuration)
