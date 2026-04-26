## 사용자 입력

```plaintext
$ARGUMENTS
```

진행하기 전에 사용자 입력을 **반드시** 고려해야 합니다. 사용자는 다음을 제공해야 합니다:
- **아이디어/주제**: 블로그 포스트의 주요 개념 또는 테마
- **리소스**: URL, 파일, 또는 참조할 자료 (선택 사항이지만 권장)
- **대상 독자**: 블로그 포스트의 대상 (선택 사항)
- **톤/스타일**: 격식체, 비격식체, 기술적 등 (선택 사항)

**중요**: 사용자가 **기존 블로그 포스트**의 업데이트를 요청하는 경우, 0-8단계를 건너뛰고 **9단계**에서 바로 시작하십시오. 먼저 기존 초안 파일을 읽은 다음 반복 프로세스를 진행합니다.

## 실행 흐름

다음 단계를 순서대로 따르십시오. **단계를 건너뛰거나 표시된 곳에서 사용자 승인 없이 진행하지 마십시오.**

### 0단계: 프로젝트 폴더 생성

1. `YYYY-MM-DD-short-topic-name` 형식으로 폴더 이름을 생성합니다
   - 오늘 날짜를 사용합니다
   - 주제에서 짧고 URL 친화적인 슬러그를 만듭니다 (소문자, 하이픈, 최대 5단어)

2. 폴더 구조를 생성합니다:
   ```
   blog-posts/
   └── YYYY-MM-DD-short-topic-name/
       └── resources/
   ```

3. 진행하기 전에 사용자에게 폴더 생성을 확인합니다.

### 1단계: 리서치 및 리소스 수집

1. 블로그 포스트 디렉토리에 `resources/` 하위 폴더를 생성합니다

2. 제공된 각 리소스에 대해:
   - **URL**: 핵심 정보를 가져와 마크다운 파일로 `resources/`에 저장합니다
   - **파일**: 읽고 `resources/`에 요약합니다
   - **주제**: 웹 검색을 사용하여 최신 정보를 수집합니다

3. 각 리소스에 대해 `resources/`에 요약 파일을 생성합니다:
   - `resources/source-1-[short-name].md`
   - `resources/source-2-[short-name].md`
   - 등

4. 각 요약에는 다음이 포함되어야 합니다:
   ```markdown
   # Source: [Title/URL]

   ## Key Points
   - Point 1
   - Point 2

   ## Relevant Quotes/Data
   - Quote or statistic 1
   - Quote or statistic 2

   ## How This Relates to Topic
   Brief explanation of relevance
   ```

5. 사용자에게 리서치 요약을 제시합니다.

### 2단계: 브레인스토밍 및 명확화

1. 아이디어와 조사된 리소스를 기반으로 다음을 제시합니다:
   - 리서치에서 식별된 **주요 테마**
   - 블로그 포스트의 **잠재적 관점**
   - 다루어야 할 **핵심 포인트**
   - 명확화가 필요한 정보의 **공백**

2. 명확화 질문을 합니다:
   - 독자에게 전달하고 싶은 주요 시사점은 무엇입니까?
   - 리서치에서 강조하고 싶은 특정 포인트가 있습니까?
   - 목표 길이는? (짧음: 500-800단어, 중간: 1000-1500, 긴: 2000+)
   - 제외하고 싶은 포인트가 있습니까?

3. **진행하기 전에 사용자 응답을 기다립니다.**

### 3단계: 아웃라인 제안

1. 다음을 포함하는 구조화된 아웃라인을 작성합니다:

   ```markdown
   # Blog Post Outline: [Title]

   ## Meta Information
   - **Target Audience**: [who]
   - **Tone**: [style]
   - **Target Length**: [word count]
   - **Main Takeaway**: [key message]

   ## Proposed Structure

   ### Hook/Introduction
   - Opening hook idea
   - Context setting
   - Thesis statement

   ### Section 1: [Title]
   - Key point A
   - Key point B
   - Supporting evidence from [source]

   ### Section 2: [Title]
   - Key point A
   - Key point B

   [Continue for all sections...]

   ### Conclusion
   - Summary of key points
   - Call to action or final thought

   ## Sources to Cite
   - Source 1
   - Source 2
   ```

2. 사용자에게 아웃라인을 제시하고 **승인 또는 수정을 요청합니다**.

### 4단계: 승인된 아웃라인 저장

1. 사용자가 아웃라인을 승인하면 블로그 포스트 폴더에 `OUTLINE.md`로 저장합니다.

2. 아웃라인이 저장되었음을 확인합니다.

### 5단계: 아웃라인 커밋 (git 저장소인 경우)

1. 현재 디렉토리가 git 저장소인지 확인합니다.

2. 예인 경우:
   - 새 파일을 스테이징합니다: 블로그 포스트 폴더, 리소스, OUTLINE.md
   - 커밋 메시지로 커밋합니다: `docs: Add outline for blog post - [topic-name]`
   - 원격에 푸시합니다

3. git 저장소가 아닌 경우 이 단계를 건너뛰고 사용자에게 알립니다.

### 6단계: 초안 작성

1. 승인된 아웃라인을 기반으로 전체 블로그 포스트 초안을 작성합니다.

2. OUTLINE.md의 구조를 정확히 따릅니다.

3. 다음을 포함합니다:
   - 흥미로운 도입부와 도입 문구
   - 명확한 섹션 헤더
   - 리서치에서 나온 근거와 예시
   - 섹션 간 자연스러운 전환
   - 시사점이 있는 강력한 결론
   - **인용**: 모든 비교, 통계, 데이터 포인트, 사실적 주장은 원본 출처를 반드시 인용해야 합니다

4. 초안을 블로그 포스트 폴더에 `draft-v0.1.md`로 저장합니다.

5. 형식:
   ```markdown
   # [Blog Post Title]

   *[Optional: subtitle or tagline]*

   [Full content with inline citations...]

   ---

   ## References
   - [1] Source 1 Title - URL or Citation
   - [2] Source 2 Title - URL or Citation
   - [3] Source 3 Title - URL or Citation
   ```

6. **인용 요구사항**:
   - 모든 데이터 포인트, 통계 또는 비교에는 인라인 인용이 있어야 합니다
   - 번호가 매겨진 참조 [1], [2] 등 또는 이름이 있는 인용 [Source Name]을 사용합니다
   - 인용을 끝부분의 References 섹션에 연결합니다
   - 예: "Studies show that 65% of developers prefer TypeScript [1]"
   - 예: "React outperforms Vue in rendering speed by 20% [React Benchmarks 2024]"

### 7단계: 초안 커밋 (git 저장소인 경우)

1. git 저장소인지 확인합니다.

2. 예인 경우:
   - 초안 파일을 스테이징합니다
   - 커밋 메시지로 커밋합니다: `docs: Add draft v0.1 for blog post - [topic-name]`
   - 원격에 푸시합니다

3. git 저장소가 아닌 경우 건너뛰고 사용자에게 알립니다.

### 8단계: 리뷰를 위해 초안 제시

1. 사용자에게 초안 내용을 제시합니다.

2. 피드백을 요청합니다:
   - 전반적인 인상은?
   - 확장 또는 축소가 필요한 섹션은?
   - 톤 조정이 필요합니까?
   - 누락된 정보가 있습니까?
   - 특정 편집 또는 재작성이 필요합니까?

3. **사용자 응답을 기다립니다.**

### 9단계: 반복 또는 확정

**사용자가 변경을 요청하는 경우:**
1. 요청된 모든 수정 사항을 기록합니다
2. 다음 조정 사항과 함께 6단계로 돌아갑니다:
   - 버전 번호 증가 (v0.2, v0.3 등)
   - 모든 피드백 반영
   - `draft-v[X.Y].md`로 저장
   - 7-8단계 반복

**사용자가 승인하는 경우:**
1. 최종 초안 버전을 확인합니다
2. 사용자가 요청하면 선택적으로 `final.md`로 이름을 변경합니다
3. 블로그 포스트 작성 프로세스를 요약합니다:
   - 생성된 총 버전 수
   - 버전 간 주요 변경 사항
   - 최종 단어 수
   - 생성된 파일

## 버전 추적

모든 초안은 증분 버전 관리로 보존됩니다:
- `draft-v0.1.md` - 초기 초안
- `draft-v0.2.md` - 첫 번째 피드백 반영 후
- `draft-v0.3.md` - 두 번째 피드백 반영 후
- 등

이를 통해 블로그 포스트의 진화를 추적하고 필요 시 되돌릴 수 있습니다.

## 출력 파일 구조

```
blog-posts/
└── YYYY-MM-DD-topic-name/
    ├── resources/
    │   ├── source-1-name.md
    │   ├── source-2-name.md
    │   └── ...
    ├── OUTLINE.md
    ├── draft-v0.1.md
    ├── draft-v0.2.md (반복 시)
    └── draft-v0.3.md (추가 반복 시)
```

## 품질을 위한 팁

- **도입 문구**: 질문, 놀라운 사실, 또는 공감 가능한 시나리오로 시작합니다
- **흐름**: 각 문단이 다음 문단으로 연결되어야 합니다
- **근거**: 리서치 데이터로 주장을 뒷받침합니다
- **인용**: 다음의 경우 항상 출처를 인용합니다:
  - 모든 통계 및 데이터 포인트 (예: "According to [Source], 75% of...")
  - 제품, 서비스, 접근 방식 간의 비교 (예: "X performs 2x faster than Y [Source]")
  - 시장 동향, 연구 결과, 벤치마크에 대한 사실적 주장
  - 인라인 인용 형식 사용: [Source Name] 또는 [Author, Year]
- **보이스**: 전체적으로 일관된 톤을 유지합니다
- **길이**: 목표 단어 수를 준수합니다
- **가독성**: 짧은 문단과 적절한 곳에 글머리 기호를 사용합니다
- **CTA**: 명확한 행동 촉구 또는 생각을 자극하는 질문으로 마무리합니다

## 참고 사항

- 지정된 체크포인트에서 항상 사용자 승인을 기다립니다
- 기록을 위해 모든 초안 버전을 보존합니다
- URL이 제공될 때 최신 정보를 위해 웹 검색을 사용합니다
- 리소스가 부족한 경우 사용자에게 추가 자료를 요청하거나 추가 리서치를 제안합니다
- 대상 독자에 따라 톤을 조정합니다 (기술적, 일반적, 비즈니스 등)
