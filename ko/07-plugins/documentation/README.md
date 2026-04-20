
# Documentation Plugin

프로젝트를 위한 포괄적인 문서 생성 및 유지보수입니다.

## 기능

✅ API 문서 생성
✅ README 생성 및 업데이트
✅ 문서 동기화
✅ 코드 주석 개선
✅ 예제 생성

## 설치

```bash
/plugin install documentation
```

## 포함 항목

### Slash Commands
- `/generate-api-docs` - API 문서 생성
- `/generate-readme` - README 생성 또는 업데이트
- `/sync-docs` - 코드 변경 사항과 문서 동기화
- `/validate-docs` - 문서 검증

### Subagents
- `api-documenter` - API 문서 전문가
- `code-commentator` - 코드 주석 개선
- `example-generator` - 코드 예제 생성

### 템플릿
- `api-endpoint.md` - API 엔드포인트 문서 템플릿
- `function-docs.md` - 함수 문서 템플릿
- `adr-template.md` - 아키텍처 결정 기록(ADR) 템플릿

### MCP 서버
- 문서 동기화를 위한 GitHub 통합

## 사용법

### API 문서 생성
```
/generate-api-docs
```

### README 생성
```
/generate-readme
```

### 문서 동기화
```
/sync-docs
```

### 문서 검증
```
/validate-docs
```

## 요구사항

- Claude Code 1.0+
- GitHub 접근 (선택 사항)

## 예제 워크플로우

```
User: /generate-api-docs

Claude:
1. Scans all API endpoints in /src/api/
2. Delegates to api-documenter subagent
3. Extracts function signatures and JSDoc
4. Organizes by module/endpoint
5. Uses api-endpoint.md template
6. Generates comprehensive markdown docs
7. Includes curl, JavaScript, and Python examples

Result:
✅ API documentation generated
📄 Files created:
   - docs/api/users.md
   - docs/api/auth.md
   - docs/api/products.md
📊 Coverage: 23/23 endpoints documented
```

## 템플릿 사용법

### API 엔드포인트 템플릿
전체 예제가 포함된 REST API 엔드포인트 문서화에 사용합니다.

### 함수 문서 템플릿
개별 함수/메서드 문서화에 사용합니다.

### ADR 템플릿
아키텍처 결정 문서화에 사용합니다.

## 설정

문서 동기화를 위한 GitHub 토큰 설정:
```bash
export GITHUB_TOKEN="your_github_token"
```

## 모범 사례

- 문서를 코드 가까이에 유지
- 코드 변경 시 문서도 업데이트
- 실용적인 예제 포함
- 정기적으로 검증
- 일관성을 위해 템플릿 사용
