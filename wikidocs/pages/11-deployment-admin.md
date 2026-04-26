이 장은 Claude Code를 개인 도구가 아니라 조직 표준 개발 환경으로 배포할 때 필요한 운영 관점을 정리합니다.  
공급자 선택, 인증, 중앙 정책, 네트워크 경계, 사용량 가시성, 보안과 법무까지 운영자가 먼저 알아야 할 판단 기준을 한 번에 보는 모듈입니다.

## 언제 읽으면 좋은가

- 팀 또는 조직에 Claude Code를 도입하려고 할 때
- Anthropic 직접 사용과 Bedrock, Vertex AI, Foundry 중 어디로 갈지 결정해야 할 때
- 권한 정책, sandbox, MCP, plugin source를 중앙에서 통제하려고 할 때
- 비용, usage monitoring, analytics, 법적 요구사항까지 같이 검토해야 할 때

## 먼저 잡아야 할 5가지 결정

| 결정 | 질문 | 먼저 볼 문서 |
| --- | --- | --- |
| API provider | 어디에서 인증하고 어디로 과금할 것인가 | `authentication-and-iam.md`, `amazon-bedrock.md`, `google-vertex-ai.md`, `microsoft-foundry.md` |
| 정책 전달 | 관리형 설정을 어떤 경로로 배포할 것인가 | `server-managed-settings.md` |
| 네트워크 경계 | 프록시, 인증서, allowlist, 게이트웨이를 어떻게 둘 것인가 | `network-config.md`, `llm-gateway.md` |
| 가시성 | usage monitoring, analytics, 비용 추적을 어떻게 볼 것인가 | `monitoring-usage.md` |
| 데이터/보안 | retention, security, compliance 요구사항을 어떻게 만족할 것인가 | `data-usage.md`, `zero-data-retention.md` |

## 운영자 시작 맵

가장 짧은 시작 경로는 아래 순서가 좋습니다.

1. 인증 경로와 공급자를 결정합니다.
2. 네트워크와 게이트웨이 제약을 먼저 확인합니다.
3. 관리형 설정으로 어떤 정책을 강제할지 정합니다.
4. usage monitoring, analytics, 비용 추적 방법을 정합니다.
5. 데이터 사용, ZDR, 보안, 법무 조건을 확인한 뒤 온보딩합니다.

실제로는 공식 `admin-setup` 문서가 이 판단 순서를 그대로 따릅니다.  
이 모듈은 그 결정 지도를 Claude Code 운영 관점에서 풀어 쓴 버전이라고 보면 됩니다.

## 배포 옵션 한눈에 보기

공식 문서 기준으로는 대부분의 조직에 `Claude for Teams` 또는 `Claude for Enterprise`가 기본 추천 경로입니다.  
별도 인프라 없이 Claude Code와 Claude on the web을 같이 쓰고, 중앙 과금과 관리 기능을 함께 가져갈 수 있기 때문입니다.

| 경로 | 적합한 경우 | 운영 관점 포인트 |
| --- | --- | --- |
| Claude for Teams / Enterprise | 대부분의 조직, 빠른 도입 | 중앙 과금, 웹/CLI 동시 사용, Enterprise는 SSO와 관리 정책 강화 |
| Claude Console | API 중심 팀, 개인 또는 소규모 실험 | PAYG, Console usage/cost 관리 |
| Amazon Bedrock | AWS 중심 조직 | AWS 인증, 리전, CloudTrail, Cost Explorer와 정합성 |
| Google Vertex AI | GCP 중심 조직 | GCP IAM과 Billing, Workload Identity 활용 |
| Microsoft Foundry | Azure 중심 조직 | Entra ID, Azure 과금 및 정책 체계 활용 |

## 정책은 어디서 강제하나

공식 `admin-setup` 기준으로 Claude Code의 관리형 정책은 여러 경로로 내려보낼 수 있고, 우선순위가 다릅니다.

| 전달 경로 | 우선순위 | 언제 적합한가 |
| --- | --- | --- |
| Server-managed settings | 최고 | Claude for Teams / Enterprise를 쓰고 중앙 콘솔에서 배포할 때 |
| macOS plist / Windows HKLM | 높음 | OS 정책으로 강하게 잠그고 싶을 때 |
| 파일 기반 managed settings | 중간 | 클라우드 공급자 혼합 환경, WSL, 이미지 배포 환경 |
| Windows HKCU | 낮음 | 강제라기보다 기본값 배포에 가까울 때 |

운영에서 중요한 포인트는 다음입니다.

- 관리형 값은 로컬 개발자 설정보다 우선합니다.
- `permissions.allow`, `permissions.deny` 같은 배열 설정은 소스별로 병합됩니다.
- 권한 정책만으로는 충분하지 않을 수 있고, 네트워크 경계는 sandbox 도 같이 봐야 합니다.
- plugin marketplace, MCP 서버, hook URL 같은 외부 연결점도 같이 통제해야 합니다.

## 운영 가시성: monitoring, analytics, costs

이 영역은 공식 문서에서 분리돼 있지만, 운영자는 한 덩어리로 보는 편이 낫습니다.

| 항목 | 무엇을 보는가 | 적용 범위 |
| --- | --- | --- |
| Monitoring | 세션, tool, token 이벤트를 OpenTelemetry로 내보냄 | 모든 provider |
| Analytics | 사용자별 usage, adoption, contribution, leaderboard, CSV export | Anthropic 직접 경로 중심 |
| Costs | `/usage`, Console spend limits, workspace rate limit, 클라우드 과금 확인 | Anthropic 직접 경로 + 각 클라우드 과금 체계 |

실무적으로는 다음처럼 해석하면 됩니다.

- Anthropic 직접 경로에서는 `analytics` 와 `costs` 기능을 적극적으로 활용합니다.
- Team/Enterprise는 `claude.ai/analytics/claude-code`에서 adoption과 contribution을 볼 수 있습니다.
- Claude Console은 별도 workspace와 usage/cost reporting을 중심으로 봅니다.
- Bedrock, Vertex AI, Foundry는 비용을 각 클라우드의 native billing 도구에서 보는 쪽이 기본입니다.

## 보안, 데이터, 법무에서 먼저 볼 것

이 모듈의 운영 문서는 단순 설정 레퍼런스가 아니라 보안 경계 문서이기도 합니다.

| 영역 | 먼저 이해할 것 | 현재 모듈에서 연결되는 문서 |
| --- | --- | --- |
| Security | read-only 기본 권한, 승인 구조, sandbox 경계, prompt injection 방어 | `server-managed-settings.md`, `network-config.md` |
| Data usage | Anthropic가 무엇을 수집하고 무엇을 학습에 쓰지 않는지 | `data-usage.md` |
| Zero Data Retention | 요청 후 저장하지 않는 운영 모델과 제약 | `zero-data-retention.md` |
| Legal / compliance | 약관, BAA, usage policy, trust center 확인 | 공식 `legal-and-compliance` 문서 |

공식 문서 기준으로 보안 쪽 핵심은 이렇습니다.

- Claude Code는 기본적으로 read-only 권한 모델에서 시작합니다.
- 추가 작업은 명시적 승인 기반으로 올라갑니다.
- sandbox는 권한 프롬프트를 줄이는 기능이 아니라, 파일 시스템과 네트워크 경계를 강제하는 보안 장치입니다.
- 민감 코드 환경에서는 managed settings, sandbox, gateway, auditability를 같이 설계해야 합니다.

의료나 규제 환경에서는 `BAA + ZDR` 조합이 실제로 중요한 기준점이 됩니다.  
즉 "ZDR을 켰는가"가 법무/컴플라이언스 검토에서 독립 변수로 취급됩니다.

## 이 모듈에서 우선 읽을 문서

### 기본 경로

1. Authentication and IAM
2. Network Configuration
3. Server-Managed Settings
4. Monitoring and Usage
5. Data Usage
6. Zero Data Retention

### 공급자별 경로

- AWS 중심 조직: Amazon Bedrock
- GCP 중심 조직: Google Vertex AI
- Azure 중심 조직: Microsoft Foundry
- 여러 provider를 한 게이트웨이 뒤에 둘 때: LLM Gateway

## 현재 모듈에 있는 문서

- Amazon Bedrock
- Authentication and IAM
- Data Usage
- Dev Container Setup
- Google Vertex AI
- LLM Gateway
- Microsoft Foundry
- Monitoring and Usage
- Network Configuration
- Server-Managed Settings
- Zero Data Retention

## 이 모듈에서 아직 공식 문서를 직접 보조해야 하는 주제

현재 이 책은 메인 모듈 위주로 정리 중이기 때문에, 아래 항목은 공식 문서를 같이 보는 편이 좋습니다.

- 조직 도입 의사결정 맵: `admin-setup`
- provider 비교: `third-party-integrations`
- adoption / contribution metrics: `analytics`
- 비용 최적화와 spend limit: `costs`
- 보안 원칙과 prompt injection 방어: `security`
- 약관, BAA, usage policy: `legal-and-compliance`

## 운영 체크리스트

- 어떤 provider와 billing model을 쓸지 결정했는가
- 네트워크 경계와 프록시 요구사항을 검토했는가
- managed settings 전달 경로를 정했는가
- plugin, MCP, hook, sandbox 정책을 강제할 수 있는가
- `/status` 로 활성화된 managed settings source를 확인했는가
- usage monitoring / analytics / cost tracking 방법을 정했는가
- ZDR, BAA, usage policy, trust center 검토가 끝났는가

## Official reference

- [Admin setup](https://code.claude.com/docs/ko/admin-setup)
- [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- [Authentication](https://code.claude.com/docs/ko/authentication)
- [Amazon Bedrock](https://code.claude.com/docs/ko/amazon-bedrock)
- [Google Vertex AI](https://code.claude.com/docs/ko/google-vertex-ai)
- [Microsoft Foundry](https://code.claude.com/docs/ko/microsoft-foundry)
- [Server-managed settings](https://code.claude.com/docs/ko/server-managed-settings)
- [Network config](https://code.claude.com/docs/ko/network-config)
- [Analytics](https://code.claude.com/docs/ko/analytics)
- [Costs](https://code.claude.com/docs/ko/costs)
- [Security](https://code.claude.com/docs/ko/security)
- [Legal and compliance](https://code.claude.com/docs/ko/legal-and-compliance)

## 관련 가이드

- Settings System Guide
- CLI 참조
- 문제 해결
