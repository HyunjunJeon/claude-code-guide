# Memory 위치 테이블

이 문서는 Claude Code가 인식하는 모든 Memory 파일 위치와 그 우선순위를 한눈에 정리합니다. 어떤 CLAUDE.md가 충돌 시 우선 적용되는지, 어느 범위(조직/팀/개인)에서 공유되는지를 빠르게 확인할 때 사용합니다. 새로운 정책이나 규칙을 어디에 둘지 결정하기 전에 이 표를 참조해 적절한 계층을 선택하세요.

| 위치 | 범위 | 우선순위 | 공유 | 접근 | 용도 |
|----------|-------|----------|--------|--------|----------|
| `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | 관리 정책 | 1 (최고) | 조직 | 시스템 | 회사 전체 정책 |
| `/etc/claude-code/CLAUDE.md` (Linux/WSL) | 관리 정책 | 1 (최고) | 조직 | 시스템 | 조직 표준 |
| `C:\Program Files\ClaudeCode\CLAUDE.md` (Windows) | 관리 정책 | 1 (최고) | 조직 | 시스템 | 기업 가이드라인 |
| `managed-settings.d/*.md` (정책 옆) | 관리 드롭인 | 1.5 | 조직 | 시스템 | 모듈식 정책 파일 (v2.1.83+) |
| `./CLAUDE.md` 또는 `./.claude/CLAUDE.md` | 프로젝트 Memory | 2 | 팀 | Git | 팀 표준, 공유 아키텍처 |
| `./.claude/rules/*.md` | 프로젝트 규칙 | 3 | 팀 | Git | 경로별, 모듈식 규칙 |
| `~/.claude/CLAUDE.md` | 사용자 Memory | 4 | 개인 | 파일시스템 | 개인 설정 (모든 프로젝트) |
| `~/.claude/rules/*.md` | 사용자 규칙 | 5 | 개인 | 파일시스템 | 개인 규칙 (모든 프로젝트) |
| `./CLAUDE.local.md` | 프로젝트 로컬 | 6 | 개인 | Git (무시) | 개인 프로젝트별 설정 |
| `~/.claude/projects/<project>/memory/` | 자동 Memory | 7 (최저) | 개인 | 파일시스템 | Claude의 자동 메모 및 학습 |
