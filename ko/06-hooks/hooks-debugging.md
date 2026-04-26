# 디버깅

Hook이 의도대로 동작하지 않을 때 가장 빠르게 원인을 찾는 방법을 정리합니다. 디버그 모드, 독립 실행 테스트, 자주 발생하는 문제와 해결 패턴을 함께 다룹니다.

## 디버그 모드 활성화

상세한 hook 로그를 보려면 디버그 플래그로 Claude를 실행합니다:

```bash
claude --debug
```

## 상세 모드

Claude Code에서 `Ctrl+O`를 사용하여 상세 모드를 활성화하고 hook 실행 진행 상황을 확인합니다.

## Hooks 독립적으로 테스트

```bash
# Test with sample JSON input
echo '{"tool_name": "Bash", "tool_input": {"command": "ls -la"}}' | python3 .claude/hooks/validate-bash.py

# Check exit code
echo $?
```

## Hook 실행 세부사항

| 항목 | 동작 |
|--------|----------|
| **타임아웃** | 기본 60초, 명령별 설정 가능 |
| **병렬화** | 매칭되는 모든 hooks가 병렬로 실행 |
| **중복 제거** | 동일한 hook 명령은 중복 제거됨 |
| **환경** | 현재 디렉토리와 Claude Code 환경에서 실행 |
| **Async hooks** | 독립적으로 계속 실행되며, gating control flow에는 부적합 |

## 문제 해결

### Hook이 실행되지 않음

- JSON 설정 구문이 올바른지 확인
- matcher 패턴이 도구 이름과 일치하는지 확인
- 스크립트가 존재하고 실행 가능한지 확인: `chmod +x script.sh`
- `claude --debug`로 hook 실행 로그 확인
- hook이 stdin에서 JSON을 읽는지 확인 (명령 인수가 아님)

### Hook이 예기치 않게 차단함

- 샘플 JSON으로 hook 테스트: `echo '{"tool_name": "Write", ...}' | ./hook.py`
- 종료 코드 확인: 허용은 0, 차단은 2
- stderr 출력 확인 (종료 코드 2에서 표시됨)

### JSON 파싱 오류

- 항상 stdin에서 읽기 (명령 인수가 아님)
- 적절한 JSON 파싱 사용 (문자열 조작이 아님)
- 누락된 필드를 우아하게 처리

## 설치

### 1단계: Hooks 디렉토리 생성

```bash
mkdir -p ~/.claude/hooks
```

### 2단계: 예제 Hooks 복사

```bash
cp 06-hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh
```

### 3단계: 설정에서 구성

위에 표시된 hook 설정으로 `~/.claude/settings.json` 또는 `.claude/settings.json`을 편집합니다.
