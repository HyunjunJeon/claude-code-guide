# Claude Code Guide

Claude Code의 주요 기능 영역을 단계별로 학습하는 한국어 가이드북입니다.

---

## 모듈

| # | 모듈 | 내용 |
|---|------|------|
| 01 | [Slash Commands](ko/01-slash-commands/) | 사용자 명령어 단축키 |
| 02 | [Memory](ko/02-memory/) | CLAUDE.md 기반 세션 간 컨텍스트 유지 |
| 03 | [Skills](ko/03-skills/) | 재사용 가능한 자동화 기능 |
| 04 | [Subagents](ko/04-subagents/) | 전문 AI 어시스턴트 위임 |
| 05 | [MCP](ko/05-mcp/) | 외부 도구 연결 프로토콜 |
| 06 | [Hooks](ko/06-hooks/) | 이벤트 기반 자동화 (26개 이벤트) |
| 07 | [Plugins](ko/07-plugins/) | 기능 번들 패키지 |
| 08 | [Checkpoints](ko/08-checkpoints/) | 세션 저장 및 되감기 |
| 09 | [Advanced](ko/09-advanced-features/) | 플래닝 모드, 백그라운드, 권한 등 |
| 10 | [CLI Reference](ko/10-cli/) | 터미널 명령어 레퍼런스 |
| 11 | [Deployment & Admin](ko/11-deployment-admin/) | Bedrock, Vertex, Foundry, 네트워크, 관리 정책 |
| 12 | [Agent SDK](ko/12-agent-sdk/) | SDK 기반 에이전트 개발 레퍼런스 |

## 로컬 개발

### 사이트 (Next.js)

```bash
npm install
npm run dev
# http://localhost:3000
```

### llms.txt 생성

```bash
uv run scripts/generate_llms_txt.py
```

### 품질 검사

```bash
pre-commit install
pre-commit run --all-files
```

## GitHub Pages 배포

GitHub Pages용 Actions 워크플로는 [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)에 추가되어 있습니다.

- `main` 브랜치 푸시 또는 수동 실행 시 정적 사이트를 빌드해 Pages에 배포합니다.
- `username.github.io` 저장소면 루트 경로로 배포합니다.
- 일반 저장소면 자동으로 `/<repo-name>`를 `basePath`로 잡아 프로젝트 페이지로 배포합니다.

처음 한 번은 GitHub 저장소 설정에서 `Pages -> Source`를 `GitHub Actions`로 바꿔야 합니다.

## 프로젝트 도구

| 도구 | 유형 | 용도 |
|------|------|------|
| `/doc-accuracy-tracker` | Skill | 공식 문서 실시간 조회 → 콘텐츠 정확성 감사 |
| `doc-accuracy-auditor` | Subagent | 백그라운드 위임 감사 (격리된 컨텍스트) |
| `/lesson-quiz [topic]` | Skill | 모듈별 이해도 퀴즈 |
| `/self-assessment` | Skill | 전체 기능 자가 진단 |

## 참고

- [Claude Code 공식 문서](https://code.claude.com/docs/ko/overview)
- [What's New](WHATS-NEW.md)
- [Legal and Compliance](LEGAL-AND-COMPLIANCE.md)
- [MCP Protocol](https://modelcontextprotocol.io)
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook)
