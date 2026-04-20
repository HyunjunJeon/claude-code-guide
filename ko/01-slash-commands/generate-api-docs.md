---
description: Create comprehensive API documentation from source code
---

# API 문서 생성기

다음 과정으로 API 문서를 생성합니다:

1. `/src/api/`의 모든 파일 스캔
2. 함수 시그니처와 JSDoc 주석 추출
3. 엔드포인트/모듈별로 정리
4. 예제가 포함된 마크다운 생성
5. 요청/응답 스키마 포함
6. 오류 문서 추가

출력 형식:
- `/docs/api.md`에 마크다운 파일
- 모든 엔드포인트에 curl 예제 포함
- TypeScript 타입 추가

---
