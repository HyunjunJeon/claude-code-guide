# 설치 안내

이 문서는 이 폴더의 예제 subagent를 자기 환경에 설치하는 세 가지 방법(`/agents` 명령어·프로젝트 복사·사용자 디렉토리 복사)을 정리합니다.
예제 파일을 처음 가져다 쓸 때 또는 팀에 공유 환경을 만들 때 봅니다.
설치 후 `/agents`로 인식 여부를 확인하는 단계를 빠뜨리지 마세요.

## 방법 1: /agents 명령어 사용 (권장)

```bash
/agents
```

그런 다음:

1. 'Create New Agent' 선택
2. 프로젝트 레벨 또는 사용자 레벨 선택
3. subagent를 상세하게 설명
4. 접근을 부여할 도구 선택 (또는 비워두어 모든 도구 상속)
5. 저장 후 사용

## 방법 2: 프로젝트에 복사

agent 파일을 프로젝트의 `.claude/agents/` 디렉토리에 복사합니다:

```bash
# Navigate to your project
cd /path/to/your/project

# Create agents directory if it doesn't exist
mkdir -p .claude/agents

# Copy all agent files from this folder
cp /path/to/04-subagents/*.md .claude/agents/

# Remove the README (not needed in .claude/agents)
rm .claude/agents/README.md
```

## 방법 3: 사용자 디렉토리에 복사

모든 프로젝트에서 사용 가능한 agent:

```bash
# Create user agents directory
mkdir -p ~/.claude/agents

# Copy agents
cp /path/to/04-subagents/code-reviewer.md ~/.claude/agents/
cp /path/to/04-subagents/debugger.md ~/.claude/agents/
# ... copy others as needed
```

## 확인

설치 후 agent가 인식되는지 확인합니다:

```bash
/agents
```

내장 agent와 함께 설치한 agent가 나열되어야 합니다.
