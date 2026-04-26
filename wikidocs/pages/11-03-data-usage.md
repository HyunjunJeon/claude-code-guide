이 페이지는 계정 유형, 실행 방식, 텔레메트리 경로에 따라 Claude Code 데이터가 어떻게 처리되는지 요약합니다. 관리형 환경에 Claude Code를 도입하기 전에 가장 먼저 읽어야 할 문서입니다.

## 학습 정책

공식 문서는 소비자 계정과 상업용 계정을 분리해서 설명합니다.

- Free, Pro, Max 사용자는 모델 개선을 위한 데이터 사용 여부를 직접 선택할 수 있습니다.
- Team, Enterprise, API, 서드파티 플랫폼, Claude Gov는 상업용 약관을 따르며 기본적으로 모델 학습에 사용되지 않습니다.

즉, Claude Code도 어떤 계정과 플랫폼으로 사용하느냐에 따라 데이터 정책이 달라집니다.

## 보존 기본값

공식 기본값은 계정 유형에 따라 다릅니다.

- 소비자 사용자:
  - 모델 개선 허용 시 5년
  - 허용하지 않으면 30일
- 상업용 사용자:
  - 기본 30일

또한 로컬 Claude Code 클라이언트는 세션 재개를 위해 `~/.claude/projects/` 아래에 세션 기록을 기본 30일 동안 평문으로 저장합니다. 이 정리 기간은 조정할 수 있습니다.

## 로컬 실행과 클라우드 실행

### 로컬 Claude Code

로컬에서 실행할 때는:

- 프롬프트와 모델 출력이 네트워크로 전송되고
- 전송 중에는 TLS로 암호화되며
- 세션 재개를 위한 로컬 기록이 머신에 남습니다

### Claude Code on the web

웹에서 실행할 때는:

- 저장소가 Anthropic 관리형 격리 VM에 clone되고
- 코드와 세션 데이터가 계정 유형에 맞는 보존 정책을 따르며
- GitHub 인증은 secure proxy를 통해 처리되고
- outbound 네트워크 트래픽은 Anthropic 보안 프록시를 거칩니다

## 텔레메트리와 선택적 로깅

공식 문서는 다음 세 층을 분리해서 봅니다.

- 기본 제품 데이터 흐름
- 운영 텔레메트리
- 피드백 제출

대표적인 제어값:

- `DISABLE_TELEMETRY`
- `DISABLE_ERROR_REPORTING`
- `DISABLE_FEEDBACK_COMMAND=1`

Bedrock, Vertex, Foundry에서는 비필수 텔레메트리가 기본적으로 꺼져 있습니다.

## 도입 전에 확인할 것

조직에 Claude Code를 넓게 배포하기 전에 다음을 검토하세요.

- 계정 유형과 학습 정책
- 기본 보존 기간
- 로컬 세션 기록 저장 허용 여부
- 웹 세션 허용 여부
- 텔레메트리와 피드백 opt-out 정책
- MCP 서버나 게이트웨이 같은 서드파티 통합

## ZDR과의 관계

기본 상업용 보존 정책보다 더 강한 보장이 필요하면 ZDR 문서를 함께 읽어야 합니다. Claude Code ZDR은 Anthropic direct platform의 Enterprise 기능이며, Bedrock, Vertex, Foundry에는 자동으로 적용되지 않습니다.

## 관련 링크

- [공식 data usage 문서](https://code.claude.com/docs/ko/data-usage)
- [Zero Data Retention](11-11-zero-data-retention.md)
- [Monitoring Usage](11-08-monitoring-usage.md)
- [Legal and compliance](https://code.claude.com/docs/ko/legal-and-compliance)
