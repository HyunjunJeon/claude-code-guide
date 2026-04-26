이 문서는 subagent 설계와 시스템 프롬프트, 도구 접근 전략에 대한 실전 권장사항을 정리합니다.
새 subagent를 만들기 직전, 또는 기존 subagent의 효과가 기대보다 낮다고 느낄 때 점검 체크리스트로 쓰세요.
"집중된 책임 + 상세한 프롬프트 + 최소 도구"라는 세 가지 원칙이 거의 모든 케이스에 통합니다.

## 설계 원칙

**권장:**

- Claude가 생성한 agent로 시작하기 - Claude로 초기 subagent를 생성한 후 반복하여 커스터마이징
- 집중된 subagent 설계 - 하나가 모든 것을 하기보다 단일하고 명확한 책임
- 상세한 프롬프트 작성 - 구체적인 지시, 예시 및 제약 조건 포함
- 도구 접근 제한 - subagent의 목적에 필요한 도구만 부여
- 버전 관리 - 팀 협업을 위해 프로젝트 subagent를 버전 관리에 체크인

**비권장:**

- 동일한 역할의 중복 subagent 생성
- subagent에 불필요한 도구 접근 부여
- 단순한 단일 단계 작업에 subagent 사용
- 하나의 subagent 프롬프트에 관심사 혼합
- 필요한 컨텍스트 전달 누락

## 시스템 프롬프트 모범 사례

1. **역할을 구체적으로 명시**

   ```
   You are an expert code reviewer specializing in [specific areas]
   ```

2. **우선순위를 명확하게 정의**

   ```
   Review priorities (in order):
   1. Security Issues
   2. Performance Problems
   3. Code Quality
   ```

3. **출력 형식 지정**

   ```
   For each issue provide: Severity, Category, Location, Description, Fix, Impact
   ```

4. **실행 단계 포함**

   ```
   When invoked:
   1. Run git diff to see recent changes
   2. Focus on modified files
   3. Begin review immediately
   ```

## 도구 접근 전략

1. **제한적으로 시작**: 필수 도구만으로 시작
2. **필요시에만 확장**: 요구 사항에 따라 도구 추가
3. **가능하면 읽기 전용**: 분석 agent에는 Read/Grep 사용
4. **샌드박스 실행**: Bash 명령을 특정 패턴으로 제한
