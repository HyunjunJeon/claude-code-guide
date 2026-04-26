# `claude agents` CLI 명령어

이 문서는 `claude agents` CLI 명령어로 모든 소스의 agent 정의를 한눈에 보는 방법을 설명합니다.
"내 환경에 어떤 agent가 등록돼 있고 누가 누구를 가리고 있는지" 확인할 때 씁니다.
재정의(override) 표시는 우선순위 충돌 디버깅에 특히 유용합니다.

`claude agents` 명령어는 소스별로 그룹화하여 구성된 모든 agent를 나열합니다 (내장, 사용자 레벨, 프로젝트 레벨):

```bash
claude agents
```

이 명령어는:

- 모든 소스의 사용 가능한 모든 agent를 표시합니다
- 소스 위치별로 agent를 그룹화합니다
- 더 높은 우선순위 레벨의 agent가 더 낮은 레벨의 agent를 가리는 경우 **재정의**를 표시합니다 (예: 사용자 레벨 agent와 같은 이름의 프로젝트 레벨 agent)
