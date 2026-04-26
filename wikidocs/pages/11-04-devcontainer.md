Claude Code의 reference devcontainer는 일관되고 조금 더 격리된 개발 환경이 필요한 팀을 위한 구성입니다. 재현 가능한 툴체인, 더 안전한 무인 실행, 빠른 온보딩이 필요할 때 특히 유용합니다.

## 개요

공식 devcontainer 구성은 다음을 제공합니다.

- 미리 설정된 Node.js 환경
- git, 셸 보조 도구, 검색 도구 같은 개발 편의 기능
- 더 강한 네트워크 경계를 위한 방화벽 규칙
- VS Code Dev Containers 통합
- 컨테이너 재시작 후에도 유지되는 세션 상태

이 참조 컨테이너는 팀이 보다 통제된 환경에서 다음 명령을 실행할 수 있도록 설계되어 있습니다.

```bash
claude --dangerously-skip-permissions
```

## 언제 써야 하나

다음이 필요할 때 devcontainer가 적합합니다.

- macOS, Windows, Linux 전반에 걸친 일관된 온보딩
- 무인 Claude Code 실행을 위한 더 안전한 공간
- 로컬 개발과 CI 유사 환경의 툴체인 통일
- 팀 표준 Claude Code 실행 환경

## 설정 흐름

1. VS Code와 Dev Containers 확장을 설치합니다.
2. 공식 reference devcontainer 저장소를 clone하거나 필요한 설정을 가져옵니다.
3. 저장소를 VS Code에서 엽니다.
4. 컨테이너에서 다시 열기(Reopen in Container)를 실행합니다.
5. 컨테이너 터미널에서 `claude`를 실행합니다.

컨테이너가 빌드되면 Claude Code는 이미 설치되어 있고, 프로젝트 파일은 컨테이너 안에 마운트됩니다.

## 보안 모델

host에서 직접 실행하는 것보다는 낫지만, 완전한 보호를 보장하지는 않습니다.

devcontainer가 주는 것:

- 환경 격리
- 방화벽 기반의 outbound 제한
- 반복 가능한 설정
- host 워크스테이션과의 분리

보장하지 않는 것:

- `--dangerously-skip-permissions`를 사용할 때 악성 저장소로부터의 완전한 보호
- 컨테이너 안에서 접근 가능한 모든 자격 증명 보호

공식 문서도 신뢰하지 않는 저장소에 대해서는 devcontainer 안에서도 자격 증명 유출 위험이 남는다고 분명히 경고합니다.

## 핵심 파일

reference 구성의 중심은 세 파일입니다.

- `devcontainer.json`
- `Dockerfile`
- `init-firewall.sh`

역할 분리는 다음과 같습니다.

- `devcontainer.json`: 편집기와 마운트 동작 제어
- `Dockerfile`: 이미지와 도구 정의
- `init-firewall.sh`: 네트워크 경계 강제

## 문제 해결

### 컨테이너는 뜨는데 Claude Code가 없음

공식 reference setup을 기준으로 비교하거나, 이미지 빌드 과정에서 Claude Code 설치 단계가 빠지지 않았는지 확인하세요. 팀 커스터마이징 과정에서 자주 빠집니다.

### 컨테이너 안에서 네트워크 호출이 실패함

먼저 방화벽 스크립트와 프록시 설정을 확인하세요. 보안 중심 환경에서는 Anthropic 장애가 아니라 의도된 제한인 경우가 많습니다.

### `--dangerously-skip-permissions`가 여전히 불안함

정상입니다. devcontainer는 blast radius를 줄여 주지만, 신뢰하지 않는 저장소를 안전하게 만들어 주지는 않습니다. 여전히 trusted repo에서만 사용해야 합니다.

## 관련 링크

- [공식 devcontainer 문서](https://code.claude.com/docs/ko/devcontainer)
- [Reference devcontainer repository](https://github.com/anthropics/claude-code)
- [Network Configuration](11-09-network-config.md)
- [LLM Gateway](11-06-llm-gateway.md)
