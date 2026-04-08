---
name: Setup CI/CD Pipeline
description: Implement pre-commit hooks and GitHub Actions for quality assurance
tags: ci-cd, devops, automation
---

# CI/CD 파이프라인 설정

프로젝트 유형에 맞는 종합적인 DevOps 품질 게이트를 구현합니다:

1. **프로젝트 분석**: 언어, 프레임워크, 빌드 시스템, 기존 도구 감지
2. **pre-commit hook 구성** 언어별 도구 포함:
   - 포맷팅: Prettier/Black/gofmt/rustfmt 등
   - 린팅: ESLint/Ruff/golangci-lint/Clippy 등
   - 보안: Bandit/gosec/cargo-audit/npm audit 등
   - 타입 검사: TypeScript/mypy/flow (해당하는 경우)
   - 테스트: 관련 테스트 스위트 실행
3. **GitHub Actions 워크플로 생성** (.github/workflows/):
   - push/PR 시 pre-commit 검사 미러링
   - 다중 버전/플랫폼 매트릭스 (해당하는 경우)
   - 빌드 및 테스트 검증
   - 배포 단계 (필요시)
4. **파이프라인 검증**: 로컬 테스트, 테스트 PR 생성, 모든 검사 통과 확인

무료/오픈소스 도구를 사용합니다. 기존 구성을 존중합니다. 실행 속도를 빠르게 유지합니다.

---
**최종 업데이트**: 2026년 4월
