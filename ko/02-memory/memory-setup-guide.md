# Memory 설치 가이드

이 문서는 프로젝트 Memory, 개인 Memory, 디렉터리별 Memory를 처음부터 설치하는 절차를 묶어 제공합니다. 새 프로젝트나 새 머신에서 Memory 환경을 처음 구축하거나, 디렉터리 단위로 다른 규칙을 적용하고 싶을 때 그대로 따라 하면 됩니다. `/init` 자동화부터 수동 생성, `#` 단축 입력까지 가용한 세 가지 경로 중 상황에 맞는 방식을 선택해 적용합니다.

## 프로젝트 Memory 설정

### 방법 1: `/init` 명령 사용 (권장)

프로젝트 memory를 설정하는 가장 빠른 방법입니다:

1. **프로젝트 디렉터리로 이동:**
   ```bash
   cd /path/to/your/project
   ```

2. **Claude Code에서 init 명령 실행:**
   ```bash
   /init
   ```

3. **Claude가 CLAUDE.md를 생성하고 채움** 템플릿 구조로

4. **생성된 파일을 커스터마이즈** 프로젝트 필요에 맞게

5. **git에 커밋:**
   ```bash
   git add CLAUDE.md
   git commit -m "Initialize project memory with /init"
   ```

### 방법 2: 수동 생성

수동 설정을 선호하는 경우:

1. **프로젝트 루트에 CLAUDE.md 생성:**
   ```bash
   cd /path/to/your/project
   touch CLAUDE.md
   ```

2. **프로젝트 표준 추가:**
   ```bash
   cat > CLAUDE.md << 'EOF'
   # Project Configuration

   ## Project Overview
   - **Name**: Your Project Name
   - **Tech Stack**: List your technologies
   - **Team Size**: Number of developers

   ## Development Standards
   - Your coding standards
   - Naming conventions
   - Testing requirements
   EOF
   ```

3. **git에 커밋:**
   ```bash
   git add CLAUDE.md
   git commit -m "Add project memory configuration"
   ```

### 방법 3: `#`을 사용한 빠른 업데이트

CLAUDE.md가 존재하면 대화 중 빠르게 규칙을 추가할 수 있습니다:

```markdown
# Use semantic versioning for all releases

# Always run tests before committing

# Prefer composition over inheritance
```

Claude가 어떤 memory 파일을 업데이트할지 묻습니다.

## 개인 Memory 설정

1. **~/.claude 디렉터리 생성:**
   ```bash
   mkdir -p ~/.claude
   ```

2. **개인 CLAUDE.md 생성:**
   ```bash
   touch ~/.claude/CLAUDE.md
   ```

3. **설정 추가:**
   ```bash
   cat > ~/.claude/CLAUDE.md << 'EOF'
   # My Development Preferences

   ## About Me
   - Experience Level: [Your level]
   - Preferred Languages: [Your languages]
   - Communication Style: [Your style]

   ## Code Preferences
   - [Your preferences]
   EOF
   ```

## 디렉터리별 Memory 설정

1. **특정 디렉터리에 memory 생성:**
   ```bash
   mkdir -p /path/to/directory/.claude
   touch /path/to/directory/CLAUDE.md
   ```

2. **디렉터리별 규칙 추가:**
   ```bash
   cat > /path/to/directory/CLAUDE.md << 'EOF'
   # [Directory Name] Standards

   This file overrides root CLAUDE.md for this directory.

   ## [Specific Standards]
   EOF
   ```

3. **버전 관리에 커밋:**
   ```bash
   git add /path/to/directory/CLAUDE.md
   git commit -m "Add [directory] memory configuration"
   ```

## 설정 확인

1. **Memory 위치 확인:**
   ```bash
   # Project root memory
   ls -la ./CLAUDE.md

   # Personal memory
   ls -la ~/.claude/CLAUDE.md
   ```

2. **Claude Code가 자동으로 로드** 세션 시작 시 이러한 파일들을 로드합니다

3. **Claude Code로 테스트** 프로젝트에서 새 세션을 시작하여 확인합니다
