## 사용자 입력

```plaintext
$ARGUMENTS
```

진행하기 전에 사용자 입력을 **반드시** 고려해야 합니다 (비어있지 않은 경우). 사용자는 다음을 지정할 수 있습니다:
- `create` - 새 CLAUDE.md를 처음부터 작성합니다
- `update` - 기존 CLAUDE.md를 개선합니다
- `audit` - 현재 CLAUDE.md 품질을 분석하고 보고합니다
- 특정 경로를 지정하여 생성/업데이트합니다 (예: 디렉토리별 지시사항을 위한 `src/api/CLAUDE.md`)

## 핵심 원칙

**LLM은 상태를 유지하지 않습니다**: CLAUDE.md는 모든 대화에 자동으로 포함되는 유일한 파일입니다. AI 에이전트를 코드베이스에 온보딩하는 주요 문서 역할을 합니다.

### 골든 룰

1. **적을수록 좋습니다**: 프론티어 LLM은 ~150-200개의 지시사항을 따를 수 있습니다. Claude Code의 시스템 프롬프트는 이미 ~50개를 사용합니다. CLAUDE.md를 집중적이고 간결하게 유지하십시오.

2. **보편적 적용 가능성**: 모든 세션에 관련된 정보만 포함합니다. 작업별 지시사항은 별도 파일에 넣습니다.

3. **Claude를 린터로 사용하지 마십시오**: 스타일 가이드라인은 컨텍스트를 부풀리고 지시 따르기 성능을 저하시킵니다. 결정적 도구(prettier, eslint 등)를 대신 사용하십시오.

4. **절대 자동 생성하지 마십시오**: CLAUDE.md는 AI 하니스의 가장 높은 레버리지 포인트입니다. 신중한 고려를 통해 수동으로 작성하십시오.

## 실행 흐름

### 1. 프로젝트 분석

먼저 현재 프로젝트 상태를 분석합니다:

1. 기존 CLAUDE.md 파일을 확인합니다:
   - 루트 레벨: `./CLAUDE.md` 또는 `.claude/CLAUDE.md`
   - 디렉토리별: `**/CLAUDE.md`
   - 글로벌 사용자 구성: `~/.claude/CLAUDE.md`

2. 프로젝트 구조를 파악합니다:
   - 기술 스택 (언어, 프레임워크)
   - 프로젝트 유형 (모노레포, 단일 앱, 라이브러리)
   - 개발 도구 (패키지 매니저, 빌드 시스템, 테스트 러너)

3. 기존 문서를 검토합니다:
   - README.md
   - CONTRIBUTING.md
   - package.json, pyproject.toml, Cargo.toml 등

### 2. 콘텐츠 전략 (WHAT, WHY, HOW)

CLAUDE.md를 세 가지 차원으로 구조화합니다:

#### WHAT - 기술 및 구조
- 기술 스택 개요
- 프로젝트 구성 (특히 모노레포에서 중요)
- 주요 디렉토리와 그 목적

#### WHY - 목적 및 맥락
- 프로젝트가 무엇을 하는지
- 특정 아키텍처 결정이 왜 내려졌는지
- 각 주요 컴포넌트의 책임

#### HOW - 워크플로 및 관례
- 개발 워크플로 (bun vs node, pip vs uv 등)
- 테스트 절차 및 명령어
- 검증 및 빌드 방법
- 중요한 "함정" 또는 비직관적 요구사항

### 3. 점진적 공개 전략

대규모 프로젝트의 경우 `agent_docs/` 폴더 생성을 권장합니다:

```
agent_docs/
  |- building_the_project.md
  |- running_tests.md
  |- code_conventions.md
  |- architecture_decisions.md
```

CLAUDE.md에서 다음과 같은 지시사항으로 이 파일들을 참조합니다:
```markdown
For detailed build instructions, refer to `agent_docs/building_the_project.md`
```

**중요**: 오래된 컨텍스트를 방지하기 위해 코드 조각 대신 `file:line` 참조를 사용하십시오.

### 4. 품질 제약 조건

CLAUDE.md를 생성하거나 업데이트할 때:

1. **목표 길이**: 300줄 미만 (이상적으로 100줄 미만)
2. **스타일 규칙 없음**: 린팅/포매팅 지시사항을 제거합니다
3. **작업별 지시사항 없음**: 별도 파일로 이동합니다
4. **코드 조각 없음**: 파일 참조를 대신 사용합니다
5. **중복 정보 없음**: package.json이나 README에 있는 내용을 반복하지 마십시오

### 5. 필수 섹션

잘 구조화된 CLAUDE.md는 다음을 포함해야 합니다:

```markdown
# Project Name

Brief one-line description.

## Tech Stack
- Primary language and version
- Key frameworks/libraries
- Database/storage (if any)

## Project Structure
[Only for monorepos or complex structures]
- `apps/` - Application entry points
- `packages/` - Shared libraries

## Development Commands
- Install: `command`
- Test: `command`
- Build: `command`

## Critical Conventions
[Only non-obvious, high-impact conventions]
- Convention 1 with brief explanation
- Convention 2 with brief explanation

## Known Issues / Gotchas
[Things that consistently trip up developers]
- Issue 1
- Issue 2
```

### 6. 피해야 할 안티 패턴

**포함하지 말아야 할 것:**
- 코드 스타일 가이드라인 (린터 사용)
- Claude 사용 방법에 대한 문서
- 명백한 패턴에 대한 긴 설명
- 복사-붙여넣기한 코드 예제
- 일반적인 모범 사례 ("write clean code")
- 특정 작업에 대한 지시사항
- 자동 생성된 콘텐츠
- 광범위한 TODO 목록

### 7. 검증 체크리스트

최종화 전에 확인합니다:

- [ ] 300줄 미만 (가급적 100줄 미만)
- [ ] 모든 줄이 모든 세션에 적용됨
- [ ] 스타일/포매팅 규칙 없음
- [ ] 코드 조각 없음 (파일 참조 사용)
- [ ] 명령어가 작동하는지 확인됨
- [ ] 복잡한 프로젝트에 점진적 공개 사용
- [ ] 중요한 함정이 문서화됨
- [ ] README.md와 중복 없음

## 출력 형식

### `create` 또는 기본값의 경우:

1. 프로젝트를 분석합니다
2. 위 구조에 따라 CLAUDE.md 초안을 작성합니다
3. 리뷰를 위해 초안을 제시합니다
4. 승인 후 적절한 위치에 작성합니다

### `update`의 경우:

1. 기존 CLAUDE.md를 읽습니다
2. 모범 사례에 대해 감사합니다
3. 다음을 식별합니다:
   - 제거할 콘텐츠 (스타일 규칙, 코드 조각, 작업별)
   - 축약할 콘텐츠
   - 누락된 필수 정보
4. 리뷰를 위해 변경 사항을 제시합니다
5. 승인 후 변경 사항을 적용합니다

### `audit`의 경우:

1. 기존 CLAUDE.md를 읽습니다
2. 다음을 포함하는 보고서를 생성합니다:
   - 현재 줄 수 vs 목표
   - 보편적으로 적용 가능한 콘텐츠의 비율
   - 발견된 안티 패턴 목록
   - 개선 권장 사항
3. 파일을 수정하지 말고 보고서만 작성합니다

## AGENTS.md 처리

사용자가 AGENTS.md 생성/업데이트를 요청하는 경우:

AGENTS.md는 전문화된 에이전트 동작을 정의하는 데 사용됩니다. 프로젝트 컨텍스트를 위한 CLAUDE.md와 달리 AGENTS.md는 다음을 정의합니다:
- 커스텀 에이전트 역할 및 기능
- 에이전트별 지시사항 및 제약 조건
- 멀티 에이전트 시나리오를 위한 워크플로 정의

유사한 원칙을 적용합니다:
- 집중적이고 간결하게 유지합니다
- 점진적 공개를 사용합니다
- 콘텐츠를 내장하는 대신 외부 문서를 참조합니다

## 참고 사항

- 포함하기 전에 항상 명령어가 작동하는지 확인합니다
- 의심스러우면 빼십시오 - 적을수록 좋습니다
- 시스템 리마인더는 Claude에게 CLAUDE.md가 "관련이 있을 수도 있고 없을 수도 있다"고 알려줍니다 - 노이즈가 많을수록 더 무시됩니다
- 모노레포는 명확한 WHAT/WHY/HOW 구조에서 가장 큰 이점을 얻습니다
- 디렉토리별 CLAUDE.md 파일은 더욱 집중적이어야 합니다
