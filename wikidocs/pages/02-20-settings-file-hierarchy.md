이 문서는 Claude Code의 설정 파일이 어떤 우선순위로 병합되는지를 정리합니다. `autoMemoryDirectory`나 `claudeMdExcludes` 같은 옵션이 어디에서 적용되는지 추적해야 할 때 참고하세요. 조직 정책을 사용자나 프로젝트 설정이 덮어쓰는 사고를 방지하려면, 표에 정리된 5단계 계층을 기준으로 설정 위치를 선택해야 합니다.

Claude Code 설정(`autoMemoryDirectory`, `claudeMdExcludes` 및 기타 구성 포함)은 5단계 계층에서 결정되며, 상위 수준이 우선합니다:

| 수준 | 위치 | 범위 |
|-------|----------|-------|
| 1 (최고) | 관리 정책 (시스템 수준) | 조직 전체 적용 |
| 2 | `managed-settings.d/` (v2.1.83+) | 모듈식 정책 드롭인, 알파벳순 병합 |
| 3 | `~/.claude/settings.json` | 사용자 설정 |
| 4 | `.claude/settings.json` | 프로젝트 수준 (git에 커밋) |
| 5 (최저) | `.claude/settings.local.json` | 로컬 오버라이드 (git 무시) |

**플랫폼별 구성 (v2.1.51+):**

설정은 다음을 통해서도 구성할 수 있습니다:
- **macOS**: Property list (plist) 파일
- **Windows**: Windows 레지스트리

이러한 플랫폼 네이티브 메커니즘은 JSON 설정 파일과 함께 읽히며 동일한 우선순위 규칙을 따릅니다.
