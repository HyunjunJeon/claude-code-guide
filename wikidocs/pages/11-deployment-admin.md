# 11. Deployment Administration

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

1. [Authentication and IAM](11-deployment-admin.md#11-deployment-admin-02-인증-및-iam)
2. [Network Configuration](11-deployment-admin.md#11-deployment-admin-09-네트워크-구성)
3. [Server-Managed Settings](11-deployment-admin.md#11-deployment-admin-10-서버-관리-설정)
4. [Monitoring and Usage](11-deployment-admin.md#11-deployment-admin-08-monitoring-usage)
5. [Data Usage](11-deployment-admin.md#11-deployment-admin-03-data-usage)
6. [Zero Data Retention](11-deployment-admin.md#11-deployment-admin-11-zero-data-retention)

### 공급자별 경로

- AWS 중심 조직: [Amazon Bedrock](11-deployment-admin.md#11-deployment-admin-01-amazon-bedrock)
- GCP 중심 조직: [Google Vertex AI](11-deployment-admin.md#11-deployment-admin-05-google-vertex-ai)
- Azure 중심 조직: [Microsoft Foundry](11-deployment-admin.md#11-deployment-admin-07-microsoft-foundry)
- 여러 provider를 한 게이트웨이 뒤에 둘 때: [LLM Gateway](11-deployment-admin.md#11-deployment-admin-06-llm-gateway)

## 현재 모듈에 있는 문서

- [Amazon Bedrock](11-deployment-admin.md#11-deployment-admin-01-amazon-bedrock)
- [Authentication and IAM](11-deployment-admin.md#11-deployment-admin-02-인증-및-iam)
- [Data Usage](11-deployment-admin.md#11-deployment-admin-03-data-usage)
- [Dev Container Setup](11-deployment-admin.md#11-deployment-admin-04-development-containers)
- [Google Vertex AI](11-deployment-admin.md#11-deployment-admin-05-google-vertex-ai)
- [LLM Gateway](11-deployment-admin.md#11-deployment-admin-06-llm-gateway)
- [Microsoft Foundry](11-deployment-admin.md#11-deployment-admin-07-microsoft-foundry)
- [Monitoring and Usage](11-deployment-admin.md#11-deployment-admin-08-monitoring-usage)
- [Network Configuration](11-deployment-admin.md#11-deployment-admin-09-네트워크-구성)
- [Server-Managed Settings](11-deployment-admin.md#11-deployment-admin-10-서버-관리-설정)
- [Zero Data Retention](11-deployment-admin.md#11-deployment-admin-11-zero-data-retention)

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

- [Settings System Guide](09-advanced-features.md#09-advanced-features-27-settings-system-guide)
- [CLI 참조](10-cli.md)
- [문제 해결](10-cli.md#10-cli-07-문제-해결)

---

<a id="11-deployment-admin-01-amazon-bedrock"></a>

## 11-01. Amazon Bedrock

Amazon Bedrock는 Claude Code를 AWS 안에서 운영해야 할 때 적합합니다. IAM, CloudTrail, 리전 제어, Bedrock 과금 체계를 그대로 쓸 수 있습니다.

### 언제 쓰나

- AWS 중심 표준을 이미 갖고 있고, Claude Code도 같은 보안/감사/네트워크 경계 안에서 쓰고 싶을 때
- 팀 단위 배포에서 인퍼런스 프로파일, 가드레일, 중앙 비용 관리를 같이 묶어야 할 때
- 모델 호출을 AWS 리전과 계정 경계 안으로 유지해야 할 때

### 설정 경로

1. Bedrock 콘솔에서 팀이 필요한 Anthropic 모델 접근을 먼저 신청합니다.
2. Claude Code의 `/setup-bedrock` 위자드 또는 수동 환경변수 설정 중 하나를 선택합니다.
3. AWS 프로필, SSO, access key, 또는 Bedrock bearer token으로 인증을 준비합니다.
4. `CLAUDE_CODE_USE_BEDROCK=1` 과 `AWS_REGION=...` 을 설정합니다.
5. 팀 배포 전에는 모델 버전을 고정해 두어 이후 Anthropic 릴리스로 동작이 바뀌지 않게 합니다.

예시:

```sh
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export ANTHROPIC_DEFAULT_SONNET_MODEL='your-bedrock-model-or-inference-profile-id'
```

### 인증 및 설정 기본

- `AWS_REGION` 은 필수입니다. Claude Code는 `~/.aws/config` 에서 이 값을 읽지 않습니다.
- Claude Code는 AWS SDK의 기본 credential chain을 사용합니다.
- AWS 자격 증명이 인증을 담당하므로 `/login` 과 `/logout` 은 비활성화됩니다.
- AWS Organizations를 쓰는 경우, 관리 계정에서 `bedrock:PutUseCaseForModelAccess` 로 사용 사례 제출을 한 번 처리할 수 있습니다.

### 모델과 제공자 주의점

- Bedrock은 Converse API가 아니라 Invoke API 경로를 사용합니다.
- 버전 고정이 없으면 alias가 더 최신 모델로 바뀔 수 있고, 그 버전이 아직 계정에 활성화되지 않았을 수 있습니다.
- 일부 배포는 inference profile 또는 application inference profile 을 사용하므로, 실제로 노출되는 형식과 일치하는 모델 ID를 고정해야 합니다.
- Mantle은 Bedrock의 별도 엔드포인트이며, 자체 모델 목록과 Claude Code v2.1.94 이상이 필요합니다.

### 자주 보는 오류

- SSO나 프록시 때문에 브라우저가 반복해서 열리면 `awsAuthRefresh` 를 제거하거나, Claude Code를 띄우기 전에 `aws sso login` 을 먼저 실행하세요.
- `403` 이면 모델 접근이 아직 허용되지 않았거나 IAM 역할에 `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, `bedrock:ListInferenceProfiles` 가 빠졌을 가능성이 큽니다.
- Mantle에서 모델 ID를 포함한 `400` 이 나오면 Bedrock inference profile ID를 Mantle에 넘긴 경우일 가능성이 큽니다.
- 리전 또는 처리량 오류가 나면 `AWS_REGION` 을 바꾸거나, 해당 리전에서 지원되는 inference profile / 모델을 선택해야 합니다.

### 관련 링크

- Anthropic: [Claude Code on Amazon Bedrock](https://code.claude.com/docs/ko/amazon-bedrock)
- Anthropic: [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- AWS: [Amazon Bedrock 문서](https://docs.aws.amazon.com/bedrock/)
- AWS: [Bedrock inference profiles](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html)
- AWS: [Bedrock quotas and throttling](https://docs.aws.amazon.com/bedrock/latest/userguide/quotas.html)

---

<a id="11-deployment-admin-02-인증-및-iam"></a>

## 11-02. 인증 및 IAM

이 문서는 Claude Code 사용자가 어떻게 인증하는지, 조직 역할이 접근 제어에 어떤 영향을 주는지, 그리고 인터랙티브 사용, CI, 서비스 계정형 자동화에 어떤 자격 증명 경로를 써야 하는지를 정리합니다.

### 로그인 경로

대화형 사용은 일반적으로 `claude` 를 실행해서 브라우저 기반 로그인 흐름을 완료하는 방식입니다. Claude Code는 다음 계정 경로를 지원합니다.

- Claude Pro 또는 Max용 Claude.ai 계정
- Claude for Teams 또는 Claude for Enterprise 계정
- Claude Console 계정
- Amazon Bedrock, Google Vertex AI, Microsoft Foundry 같은 클라우드 공급자 인증

기본적인 실행 예시는 다음과 같습니다.

```bash
claude
```

로그아웃하거나 다시 인증하려면 다음을 사용합니다.

```plaintext
/logout
```

Claude Code 안에서는 `/login` 과 `/status` 로 재인증과 상태 확인을 할 수 있습니다.

### 조직 과 역할

팀 환경에서는 중앙 과금과 조직 관리가 필요한 경우 Claude for Teams 또는 Claude for Enterprise가 가장 단순한 선택입니다.

Claude Console 기반 접근에서는 역할 구분이 중요합니다.

- `Claude Code` 역할: Claude Code API 키만 만들 수 있음
- `Developer` 역할: 어떤 종류의 API 키든 만들 수 있음

즉, Claude Code 전용 키만 허용할지, 일반 개발자 키까지 허용할지 역할로 구분할 수 있습니다.

### 자격 증명 우선순위

여러 인증 수단이 있으면 Claude Code는 다음 순서로 선택합니다.

1. `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_VERTEX`, 또는 `CLAUDE_CODE_USE_FOUNDRY` 가 설정된 경우 클라우드 공급자 자격 증명
2. `ANTHROPIC_AUTH_TOKEN`
3. `ANTHROPIC_API_KEY`
4. `apiKeyHelper` 출력
5. `CLAUDE_CODE_OAUTH_TOKEN`
6. `/login` 으로 얻은 구독 OAuth 자격 증명

실무적으로 중요한 점은 다음과 같습니다.

- `ANTHROPIC_API_KEY` 가 설정되어 있고 승인되면, 로그인된 구독보다 이 값이 우선합니다.
- `ANTHROPIC_AUTH_TOKEN` 은 `Authorization: Bearer` 헤더를 쓰는 게이트웨이 또는 프록시에 적합합니다.

`apiKeyHelper`, `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN` 는 CLI 세션에만 적용됩니다. Claude Desktop 과 원격 세션은 OAuth만 사용합니다.

### 자격 증명 저장

Claude Code는 자격 증명을 안전하게 저장합니다.

- macOS: 암호화된 Keychain
- Linux, Windows: `~/.claude/.credentials.json`
- `CLAUDE_CONFIG_DIR` 가 있으면 해당 경로 아래 저장

문서 기준으로 Linux에서는 파일 권한이 `0600` 이고, Windows에서는 사용자 프로필 디렉터리의 접근 제어를 따릅니다.

### CI 와 서비스 계정형 사용

브라우저 로그인 없이 돌아가야 하는 환경에서는 비대화형 경로를 사용합니다.

- 구독 기반 자동화: `claude setup-token` 으로 장기 OAuth 토큰을 만들고 `CLAUDE_CODE_OAUTH_TOKEN` 으로 내보냅니다.
- API 키 기반 파이프라인: `ANTHROPIC_API_KEY` 를 마스킹된 시크릿으로 저장합니다.
- 클라우드 공급자 기반 자동화: 정적 키 대신 공급자 고유 인증 모델을 사용합니다.

실제로는 다음과 같은 패턴이 적합합니다.

- Google Vertex AI + Workload Identity Federation + 전용 서비스 계정
- AWS Bedrock + OIDC 기반 역할 위임
- GitLab CI/CD 또는 유사 러너에서 마스킹 변수와 최소 권한 역할 사용

Vertex AI 쪽은 다운로드 가능한 서비스 계정 키보다, 필요한 권한만 가진 전용 서비스 계정과 Workload Identity Federation을 쓰는 패턴이 권장됩니다.

### 확인 방법

현재 활성 인증 수단을 보려면:

```plaintext
/status
```

API 키가 잘못 고정된 경우에는 환경 변수를 제거하고 다시 시작합니다.

```bash
unset ANTHROPIC_API_KEY
claude
```

CI 나 스크립트에서는 실행 전에 토큰 또는 공급자 자격 증명이 제대로 주입되었는지 확인해야 합니다.

### 공식 문서 링크

- [인증](https://code.claude.com/docs/ko/authentication)
- [환경 변수](https://code.claude.com/docs/ko/env-vars)
- [Google Vertex AI에서 Claude Code 사용하기](https://code.claude.com/docs/ko/google-vertex-ai)
- [Claude Code GitLab CI/CD](https://code.claude.com/docs/ko/gitlab-ci-cd)
- [Claude Code 설정](https://code.claude.com/docs/ko/settings)

---

<a id="11-deployment-admin-03-data-usage"></a>

## 11-03. Data Usage

이 페이지는 계정 유형, 실행 방식, 텔레메트리 경로에 따라 Claude Code 데이터가 어떻게 처리되는지 요약합니다. 관리형 환경에 Claude Code를 도입하기 전에 가장 먼저 읽어야 할 문서입니다.

### 학습 정책

공식 문서는 소비자 계정과 상업용 계정을 분리해서 설명합니다.

- Free, Pro, Max 사용자는 모델 개선을 위한 데이터 사용 여부를 직접 선택할 수 있습니다.
- Team, Enterprise, API, 서드파티 플랫폼, Claude Gov는 상업용 약관을 따르며 기본적으로 모델 학습에 사용되지 않습니다.

즉, Claude Code도 어떤 계정과 플랫폼으로 사용하느냐에 따라 데이터 정책이 달라집니다.

### 보존 기본값

공식 기본값은 계정 유형에 따라 다릅니다.

- 소비자 사용자:
  - 모델 개선 허용 시 5년
  - 허용하지 않으면 30일
- 상업용 사용자:
  - 기본 30일

또한 로컬 Claude Code 클라이언트는 세션 재개를 위해 `~/.claude/projects/` 아래에 세션 기록을 기본 30일 동안 평문으로 저장합니다. 이 정리 기간은 조정할 수 있습니다.

### 로컬 실행과 클라우드 실행

#### 로컬 Claude Code

로컬에서 실행할 때는:

- 프롬프트와 모델 출력이 네트워크로 전송되고
- 전송 중에는 TLS로 암호화되며
- 세션 재개를 위한 로컬 기록이 머신에 남습니다

#### Claude Code on the web

웹에서 실행할 때는:

- 저장소가 Anthropic 관리형 격리 VM에 clone되고
- 코드와 세션 데이터가 계정 유형에 맞는 보존 정책을 따르며
- GitHub 인증은 secure proxy를 통해 처리되고
- outbound 네트워크 트래픽은 Anthropic 보안 프록시를 거칩니다

### 텔레메트리와 선택적 로깅

공식 문서는 다음 세 층을 분리해서 봅니다.

- 기본 제품 데이터 흐름
- 운영 텔레메트리
- 피드백 제출

대표적인 제어값:

- `DISABLE_TELEMETRY`
- `DISABLE_ERROR_REPORTING`
- `DISABLE_FEEDBACK_COMMAND=1`

Bedrock, Vertex, Foundry에서는 비필수 텔레메트리가 기본적으로 꺼져 있습니다.

### 도입 전에 확인할 것

조직에 Claude Code를 넓게 배포하기 전에 다음을 검토하세요.

- 계정 유형과 학습 정책
- 기본 보존 기간
- 로컬 세션 기록 저장 허용 여부
- 웹 세션 허용 여부
- 텔레메트리와 피드백 opt-out 정책
- MCP 서버나 게이트웨이 같은 서드파티 통합

### ZDR과의 관계

기본 상업용 보존 정책보다 더 강한 보장이 필요하면 ZDR 문서를 함께 읽어야 합니다. Claude Code ZDR은 Anthropic direct platform의 Enterprise 기능이며, Bedrock, Vertex, Foundry에는 자동으로 적용되지 않습니다.

### 관련 링크

- [공식 data usage 문서](https://code.claude.com/docs/ko/data-usage)
- [Zero Data Retention](11-deployment-admin.md#11-deployment-admin-11-zero-data-retention)
- [Monitoring Usage](11-deployment-admin.md#11-deployment-admin-08-monitoring-usage)
- [Legal and compliance](https://code.claude.com/docs/ko/legal-and-compliance)

---

<a id="11-deployment-admin-04-development-containers"></a>

## 11-04. Development Containers

Claude Code의 reference devcontainer는 일관되고 조금 더 격리된 개발 환경이 필요한 팀을 위한 구성입니다. 재현 가능한 툴체인, 더 안전한 무인 실행, 빠른 온보딩이 필요할 때 특히 유용합니다.

### 개요

공식 devcontainer 구성은 다음을 제공합니다.

- 미리 설정된 Node.js 환경
- git, 셸 보조 도구, 검색 도구 같은 개발 편의 기능
- 더 강한 네트워크 경계를 위한 방화벽 규칙
- VS Code Dev Containers 통합
- 컨테이너 재시작 후에도 유지되는 세션 상태

이 참조 컨테이너는 팀이 보다 통제된 환경에서 다음 명령을 실행할 수 있도록 설계되어 있습니다.

```bash
claude --dangerously-skip-permissions
```

### 언제 써야 하나

다음이 필요할 때 devcontainer가 적합합니다.

- macOS, Windows, Linux 전반에 걸친 일관된 온보딩
- 무인 Claude Code 실행을 위한 더 안전한 공간
- 로컬 개발과 CI 유사 환경의 툴체인 통일
- 팀 표준 Claude Code 실행 환경

### 설정 흐름

1. VS Code와 Dev Containers 확장을 설치합니다.
2. 공식 reference devcontainer 저장소를 clone하거나 필요한 설정을 가져옵니다.
3. 저장소를 VS Code에서 엽니다.
4. 컨테이너에서 다시 열기(Reopen in Container)를 실행합니다.
5. 컨테이너 터미널에서 `claude`를 실행합니다.

컨테이너가 빌드되면 Claude Code는 이미 설치되어 있고, 프로젝트 파일은 컨테이너 안에 마운트됩니다.

### 보안 모델

host에서 직접 실행하는 것보다는 낫지만, 완전한 보호를 보장하지는 않습니다.

devcontainer가 주는 것:

- 환경 격리
- 방화벽 기반의 outbound 제한
- 반복 가능한 설정
- host 워크스테이션과의 분리

보장하지 않는 것:

- `--dangerously-skip-permissions`를 사용할 때 악성 저장소로부터의 완전한 보호
- 컨테이너 안에서 접근 가능한 모든 자격 증명 보호

공식 문서도 신뢰하지 않는 저장소에 대해서는 devcontainer 안에서도 자격 증명 유출 위험이 남는다고 분명히 경고합니다.

### 핵심 파일

reference 구성의 중심은 세 파일입니다.

- `devcontainer.json`
- `Dockerfile`
- `init-firewall.sh`

역할 분리는 다음과 같습니다.

- `devcontainer.json`: 편집기와 마운트 동작 제어
- `Dockerfile`: 이미지와 도구 정의
- `init-firewall.sh`: 네트워크 경계 강제

### 문제 해결

#### 컨테이너는 뜨는데 Claude Code가 없음

공식 reference setup을 기준으로 비교하거나, 이미지 빌드 과정에서 Claude Code 설치 단계가 빠지지 않았는지 확인하세요. 팀 커스터마이징 과정에서 자주 빠집니다.

#### 컨테이너 안에서 네트워크 호출이 실패함

먼저 방화벽 스크립트와 프록시 설정을 확인하세요. 보안 중심 환경에서는 Anthropic 장애가 아니라 의도된 제한인 경우가 많습니다.

#### `--dangerously-skip-permissions`가 여전히 불안함

정상입니다. devcontainer는 blast radius를 줄여 주지만, 신뢰하지 않는 저장소를 안전하게 만들어 주지는 않습니다. 여전히 trusted repo에서만 사용해야 합니다.

### 관련 링크

- [공식 devcontainer 문서](https://code.claude.com/docs/ko/devcontainer)
- [Reference devcontainer repository](https://github.com/anthropics/claude-code)
- [Network Configuration](11-deployment-admin.md#11-deployment-admin-09-네트워크-구성)
- [LLM Gateway](11-deployment-admin.md#11-deployment-admin-06-llm-gateway)

---

<a id="11-deployment-admin-05-google-vertex-ai"></a>

## 11-05. Google Vertex AI

Google Vertex AI는 Claude Code를 GCP 안에서 운영해야 할 때 적합합니다. Google Cloud 인증, Model Garden, 프로젝트 단위 과금과 할당량 관리를 그대로 활용할 수 있습니다.

### 언제 쓰나

- GCP 중심 표준을 이미 갖고 있고, Claude Code도 같은 프로젝트/ID 경계 안에서 쓰고 싶을 때
- 중앙 과금, 할당량 관리, 리전별 엔드포인트 제어가 필요할 때
- Vertex AI의 감사/보안 경계를 유지하면서 Claude Code를 배포하고 싶을 때

### 설정 경로

1. 대상 프로젝트에서 Vertex AI API를 활성화합니다.
2. Model Garden에서 팀이 필요한 Claude 모델 접근을 신청합니다.
3. `/setup-vertex` 위자드 또는 수동 환경변수 설정 중 하나를 선택합니다.
4. `CLAUDE_CODE_USE_VERTEX=1`, `CLOUD_ML_REGION=...`, `ANTHROPIC_VERTEX_PROJECT_ID=...` 를 설정합니다.
5. 팀 배포 전에는 모델 버전을 고정해 두어 이후 Anthropic 릴리스로 동작이 바뀌지 않게 합니다.

예시:

```sh
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=global
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-4-6'
```

### 인증 및 설정 기본

- Claude Code는 표준 Google Cloud 인증을 사용합니다.
- `gcloud` 의 Application Default Credentials, 서비스 계정 키 파일, 또는 이미 환경에 들어 있는 자격 증명을 사용할 수 있습니다.
- Claude Code는 기본적으로 `ANTHROPIC_VERTEX_PROJECT_ID` 를 프로젝트 ID로 사용하며, 필요하면 `GCLOUD_PROJECT`, `GOOGLE_CLOUD_PROJECT`, `GOOGLE_APPLICATION_CREDENTIALS` 로 덮어쓸 수 있습니다.
- 인증은 Google Cloud 자격 증명이 담당하므로 `/login` 과 `/logout` 은 비활성화됩니다.
- 프롬프트 캐싱을 끄고 싶으면 `DISABLE_PROMPT_CACHING=1` 을 설정합니다.

### 모델과 제공자 주의점

- Vertex AI는 global endpoint와 regional endpoint를 모두 지원하지만, 모든 Claude 모델 버전이 모든 곳에서 동작하는 것은 아닙니다.
- global endpoint 가 편해도, 일부 모델은 regional endpoint 가 필요합니다.
- 여러 사용자에게 배포할 때는 `sonnet` 나 `opus` 같은 alias 대신 모델 버전을 고정하는 편이 안전합니다.
- Claude Code는 시작 시 모델 가용성을 확인하고, 필요하면 현재 세션에서만 이전 버전으로 내려갈 수 있습니다.

### 자주 보는 오류

- `404` model-not-found 오류는 보통 Model Garden에서 모델이 아직 활성화되지 않았거나, 리전이 틀렸거나, global endpoint 를 지원하지 않는 모델을 쓴 경우입니다.
- `429` 는 대개 quota 문제이거나 선택한 리전에서 해당 모델을 충분히 쓸 수 없다는 뜻입니다.
- 시작 시 pin 업데이트 안내가 나오면, Claude Code가 프로젝트에서 더 최신 모델을 볼 수 있다는 뜻이므로 고정값을 다시 잡아야 합니다.
- 위자드가 끝나지 않으면 billing, Vertex AI API 활성화, Claude 모델 접근 승인 상태를 다시 확인하세요.

### 관련 링크

- Anthropic: [Claude Code on Google Vertex AI](https://code.claude.com/docs/ko/google-vertex-ai)
- Anthropic: [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- Google Cloud: [Vertex AI 문서](https://cloud.google.com/vertex-ai/docs)
- Google Cloud: [Vertex AI Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
- Google Cloud: [Vertex AI quotas and limits](https://cloud.google.com/vertex-ai/quotas)
- Google Cloud: [Vertex AI pricing](https://cloud.google.com/vertex-ai/pricing)

---

<a id="11-deployment-admin-06-llm-gateway"></a>

## 11-06. LLM Gateway

LLM gateway는 Claude Code가 Anthropic, Bedrock, Vertex에 직접 붙는 대신 중앙 프록시를 통해 모델에 접근하도록 만들 때 사용합니다. 중앙 인증, 모델 라우팅, 비용 통제, 감사 정책이 필요할 때 특히 유용합니다.

### 개요

LLM gateway는 Claude Code와 실제 모델 제공자 사이의 중간 계층입니다. 주된 목적은 다음과 같습니다.

- API 자격 증명 중앙화
- 속도 제한과 예산 정책 적용
- 제공자 간 모델 라우팅
- 사용량과 감사 메타데이터 수집
- 기업 네트워크 정책 강제

Claude Code는 게이트웨이가 공식 문서에서 요구하는 API 동작을 제대로 보존할 때만 안정적으로 동작합니다.

### 게이트웨이 요구사항

게이트웨이는 최소한 다음 API 형태 중 하나를 노출해야 합니다.

1. Anthropic Messages API
2. Bedrock InvokeModel
3. Vertex rawPredict

중요한 호환성 규칙:

- 헤더 기반 API에서는 `anthropic-beta`, `anthropic-version` 헤더를 그대로 전달해야 합니다.
- 본문 기반 API에서는 `anthropic_beta`, `anthropic_version` 필드를 보존해야 합니다.
- 스트리밍 기능을 쓸 계획이면 스트리밍 응답도 깨지지 않아야 합니다.

이 필드가 빠지면 Claude Code 기능 일부가 줄어들거나 요청이 실패할 수 있습니다.

### 기본 설정

실무에서는 보통 다음 네 가지를 먼저 맞춥니다.

- base URL
- 인증 토큰 또는 헤더 헬퍼
- 모델 이름 매핑
- 제공자별 프로토콜 플래그

예시:

```bash
export ANTHROPIC_BASE_URL=https://gateway.example.com
export ANTHROPIC_AUTH_TOKEN=token-from-gateway
```

게이트웨이가 사용자 정의 모델 이름을 노출한다면 `sonnet`, `opus` 같은 별칭이 올바른 이름으로 해석되도록 모델 설정도 함께 맞춰야 합니다.

### 모델 선택

게이트웨이가 제공자 고유 모델명을 숨길 때 모델 선택이 특히 헷갈릴 수 있습니다. 다음을 함께 확인하세요.

- 게이트웨이가 외부에 노출하는 모델 이름
- Claude Code 별칭이 그 이름에 어떻게 매핑되는지
- 게이트웨이가 Anthropic, Bedrock, Vertex 중 어떤 요청 형식을 기대하는지

Anthropic 스타일 endpoint 뒤에서 Bedrock 또는 Vertex를 감추는 구성에서는 실험 베타를 꺼야 하는 경우가 있습니다.

```bash
export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1
```

게이트웨이가 해당 베타 동작을 안전하게 전달하지 못할 때만 사용하세요.

### LiteLLM 참고

공식 문서는 LiteLLM을 흔한 예시로 언급하지만, 기본 권장안처럼 취급하지는 않습니다. 직접 보안과 운영 책임을 져야 하는 서드파티 인프라로 보는 것이 맞습니다.

공식 문서의 중요한 경고:

- LiteLLM PyPI `1.82.7`, `1.82.8`은 악성 코드가 포함된 버전이므로 사용하면 안 됩니다.

해당 버전을 사용했다면 관련 자격 증명을 즉시 회전해야 합니다.

### 보안 참고

- 프록시나 게이트웨이 비밀값을 저장소 파일에 하드코딩하지 마세요.
- 정적 시크릿보다 짧은 수명의 토큰이나 헬퍼 스크립트를 선호하세요.
- 게이트웨이가 프롬프트 본문, 도구 입력, 응답 내용을 저장하는지 확인하세요.
- 요청을 재작성하는 게이트웨이라면 Claude Code 기능 헤더를 제거하지 않는지 점검하세요.

### 문제 해결

#### `Extra inputs are not permitted`

게이트웨이가 `anthropic-beta` 헤더를 제거했거나 요청 형식을 바꿨을 때 자주 나타납니다. 먼저 게이트웨이 포워딩 동작을 수정해야 합니다.

#### 직접 연결은 되는데 게이트웨이 뒤에서만 실패함

다음을 순서대로 확인하세요.

- base URL
- 인증 헤더 형식
- 모델 이름 매핑
- 스트리밍 지원
- 버전/베타 헤더 전달

#### 게이트웨이 뒤에서 기능이 줄어듦

게이트웨이 프로토콜이 공식 지원 형식과 정확히 맞는지 비교하세요. 제공자 API를 부분적으로만 흉내 내는 프록시는 완전 실패 대신 기능 저하를 일으키는 경우가 많습니다.

### 관련 링크

- [공식 LLM gateway 문서](https://code.claude.com/docs/ko/llm-gateway)
- [Network Configuration](11-deployment-admin.md#11-deployment-admin-09-네트워크-구성)
- [Data Usage](11-deployment-admin.md#11-deployment-admin-03-data-usage)
- [문제 해결](10-cli.md#10-cli-07-문제-해결)

---

<a id="11-deployment-admin-07-microsoft-foundry"></a>

## 11-07. Microsoft Foundry

Microsoft Foundry는 Claude Code를 Azure 안에서 운영해야 할 때 적합합니다. Microsoft Entra ID, Azure RBAC, Azure 과금 체계를 그대로 활용할 수 있습니다.

### 언제 쓰나

- Azure 중심 표준을 이미 갖고 있고, Claude Code도 같은 ID/리소스 경계 안에서 쓰고 싶을 때
- 중앙 과금, 역할 기반 접근 제어, Azure 네이티브 모니터링이 필요할 때
- Claude Code를 Azure 보안 및 규정 경계 안에 두고 싶을 때

### 설정 경로

1. Microsoft Foundry 포털에서 Claude 리소스를 만듭니다.
2. 필요한 Claude 모델에 대해 배포를 생성합니다.
3. API key 인증 또는 Microsoft Entra ID 인증 중 하나를 선택합니다.
4. `CLAUDE_CODE_USE_FOUNDRY=1` 과 `ANTHROPIC_FOUNDRY_RESOURCE=...` 또는 전체 base URL 을 설정합니다.
5. 팀 배포 전에는 모델 버전을 고정해 두어 이후 Anthropic 릴리스로 동작이 바뀌지 않게 합니다.

예시:

```sh
export CLAUDE_CODE_USE_FOUNDRY=1
export ANTHROPIC_FOUNDRY_RESOURCE=your-resource
export ANTHROPIC_FOUNDRY_API_KEY=your-azure-api-key
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-4-6'
```

### 인증 및 설정 기본

- `ANTHROPIC_FOUNDRY_API_KEY` 가 있으면 Claude Code가 그 값을 직접 사용합니다.
- 키가 없으면 Azure SDK의 default credential chain 을 사용하며, 로컬 환경에서는 보통 `az login` 이 포함됩니다.
- Azure 자격 증명이 인증을 담당하므로 `/login` 과 `/logout` 은 비활성화됩니다.
- `ANTHROPIC_FOUNDRY_BASE_URL` 로 전체 Azure 엔드포인트나 게이트웨이를 지정할 수 있습니다.

### 모델과 제공자 주의점

- Foundry에서 Claude 모델을 쓰려면 현재 Enterprise 또는 MCA-E 구독이 필요합니다.
- Claude Code를 쓰기 전에 Foundry 포털에서 Claude 배포를 먼저 만들어야 합니다.
- 여러 사용자에게 배포할 때는 `sonnet`, `opus`, `haiku` 같은 alias 대신 모델 버전을 고정하는 편이 안전합니다.
- 기본 역할인 `Azure AI User` 와 `Cognitive Services User` 에는 Claude 모델 호출에 필요한 권한이 포함됩니다.
- 더 좁은 권한이 필요하면 `Microsoft.CognitiveServices/accounts/providers/*` 데이터 액션만 허용하는 커스텀 역할을 만듭니다.

### 자주 보는 오류

- `ChainedTokenCredential authentication failed` 는 Entra ID가 아직 설정되지 않았거나 `ANTHROPIC_FOUNDRY_API_KEY` 가 빠졌을 때 흔합니다.
- `401` 또는 `403` 는 리소스는 있지만 Azure RBAC 역할이 부족하다는 뜻인 경우가 많습니다.
- Claude Code가 배포를 못 찾으면 리소스 이름과 배포 이름이 Foundry에서 만든 값과 정확히 일치하는지 확인하세요.
- `/status` 에 Foundry가 안 보이면 Claude Code를 띄운 같은 셸에서 `CLAUDE_CODE_USE_FOUNDRY=1` 이 export 되었는지 확인하세요.

### 관련 링크

- Anthropic: [Claude Code on Microsoft Foundry](https://code.claude.com/docs/ko/microsoft-foundry)
- Anthropic: [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- Microsoft: [Microsoft Foundry에서 Claude 모델 배포 및 사용](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-claude)
- Microsoft: [Microsoft Foundry용 Claude Code 설정](https://learn.microsoft.com/azure/foundry/foundry-models/how-to/configure-claude-code)
- Microsoft: [Foundry 모델 카탈로그](https://ai.azure.com/catalog/models)
- Microsoft: [Foundry 모델 제품 페이지](https://azure.microsoft.com/en-us/products/ai-foundry/models/)

---

<a id="11-deployment-admin-08-monitoring-usage"></a>

## 11-08. Monitoring Usage

Claude Code는 OpenTelemetry를 통해 사용량과 활동 텔레메트리를 내보낼 수 있습니다. 조직 수준에서 채택률, 비용, 도구 사용, 세션 행동을 추적하는 핵심 경로입니다.

### 개요

공식 문서 기준으로 모니터링 신호는 세 가지입니다.

- metrics
- logs/events
- traces

이 경로로 다음 질문에 답할 수 있습니다.

- 어떤 팀이 Claude Code를 많이 쓰는가?
- 어디에서 비용이 급증하는가?
- 어떤 도구가 많이 호출되는가?
- 어떤 세션이 실제 코드, 커밋, PR을 많이 만들고 있는가?

### 빠른 시작

최소 설정은 다음과 같습니다.

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
claude
```

인증이 필요한 collector라면:

```bash
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer your-token"
```

### 관리자 관점

관리형 팀에서는 각 개발자가 직접 설정하게 두기보다 managed settings로 중앙 배포하는 것이 공식 권장 경로입니다.

이 방식의 장점:

- 조직 전체에 일관된 모니터링 적용
- 사용자가 설정을 임의로 우회하기 어려움
- 팀/부서 속성을 중앙에서 같이 부여 가능

### 측정할 수 있는 것

공식 문서가 강조하는 대표 지표는 다음과 같습니다.

- token usage
- session count
- lines of code changed
- commit count
- pull request count
- cost usage
- API errors와 retry exhaustion

이 지표는 다음에 유용합니다.

- 채택률 추적
- 예산 모니터링
- 이상 행동 알림
- 팀/코스트센터 단위 세분화

### 보안과 프라이버시

텔레메트리는 기본적으로 최소 수집 쪽에 가깝습니다.

- 사용자 프롬프트 본문은 기본적으로 기록되지 않음
- 도구 파라미터는 기본적으로 기록되지 않음
- 도구 입출력 본문은 기본적으로 기록되지 않음
- 원시 API 요청/응답 바디는 기본적으로 기록되지 않음

이 항목들은 `OTEL_LOG_*` 플래그를 명시적으로 켰을 때만 수집됩니다. 따라서 이 부분이 가장 큰 프라이버시 경계입니다.

또한 공식 문서는 다음도 주의하라고 설명합니다.

- OAuth 기반 텔레메트리에 `user.email`이 포함될 수 있음
- metrics cardinality를 통제해야 함
- content-heavy tracing은 민감한 코드와 명령 출력까지 노출할 수 있음

### Tracing

Tracing은 베타 기능이며 추가 활성화가 필요합니다.

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1
export OTEL_TRACES_EXPORTER=otlp
```

이렇게 하면 하나의 사용자 프롬프트가 어떤 API 호출과 도구 실행으로 이어졌는지 연결해서 볼 수 있습니다.

### 문제 해결

#### 텔레메트리가 전혀 들어오지 않음

다음을 확인하세요.

- `CLAUDE_CODE_ENABLE_TELEMETRY=1`
- exporter 종류
- OTLP endpoint
- 인증 헤더
- collector까지의 네트워크 경로

#### 데이터가 너무 민감함

`OTEL_LOG_USER_PROMPTS`, `OTEL_LOG_TOOL_DETAILS`, `OTEL_LOG_TOOL_CONTENT`, `OTEL_LOG_RAW_API_BODIES`가 켜졌는지 확인하세요. 이 플래그들이 수집 범위를 크게 바꿉니다.

#### metrics cardinality가 너무 큼

세션 ID나 account UUID 같은 고카디널리티 속성을 줄여 백엔드 부담을 낮추세요.

### 관련 링크

- [공식 monitoring 문서](https://code.claude.com/docs/ko/monitoring-usage)
- [Server-Managed Settings](11-deployment-admin.md#11-deployment-admin-10-서버-관리-설정)
- [Data Usage](11-deployment-admin.md#11-deployment-admin-03-data-usage)
- [Zero Data Retention](11-deployment-admin.md#11-deployment-admin-11-zero-data-retention)

---

<a id="11-deployment-admin-09-네트워크-구성"></a>

## 11-09. 네트워크 구성

이 문서는 Claude Code가 기업 네트워크에서 기대하는 설정을 정리합니다. 프록시 라우팅, 외부 허용 목록, TLS 신뢰, 커스텀 인증서, 그리고 실제로 동작하는지 확인하는 방법까지 포함합니다.

### 접근해야 하는 대상

최소한 다음 대상은 접근 가능해야 합니다.

- `api.anthropic.com`: Claude API
- `claude.ai`: Claude.ai 계정 인증
- `platform.claude.com`: Claude Console 계정 인증

설치나 사용 방식에 따라 추가로 필요할 수 있습니다.

- `storage.googleapis.com`: 네이티브 설치 프로그램과 자동 업데이트
- `downloads.claude.ai`: 설치 스크립트, 버전 포인터, 매니페스트, 서명 키, 플러그인 다운로드
- `bridge.claudeusercontent.com`: Chrome 통합용 WebSocket 브리지

Claude Code on the web 또는 Code Review를 GitHub Enterprise Cloud와 함께 쓴다면, GitHub IP allow list 상속 관련 동작도 고려해야 합니다.

### 프록시 설정

Claude Code는 표준 프록시 환경 변수를 따릅니다.

```bash
export HTTPS_PROXY=https://proxy.example.com:8080
export HTTP_PROXY=http://proxy.example.com:8080
export NO_PROXY="localhost 192.168.1.1 example.com .example.com"
```

가능하면 `HTTPS_PROXY` 를 우선 사용하세요. `NO_PROXY` 는 공백 또는 쉼표로 구분할 수 있고, `*` 는 모든 프록시를 우회합니다. Claude Code는 SOCKS 프록시를 지원하지 않습니다.

프록시가 기본 인증을 요구하면 URL 안에 자격 증명을 넣을 수 있습니다.

```bash
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

NTLM, Kerberos 같은 고급 인증이 필요하면 해당 인증 방식을 지원하는 LLM 게이트웨이를 쓰는 편이 낫습니다.

### TLS 와 인증서

기본적으로 Claude Code는 번들된 Mozilla CA 세트와 OS 신뢰 저장소를 둘 다 신뢰합니다. 엔터프라이즈 TLS 검사 프록시가 있다면, 운영체제 신뢰 저장소에 사내 루트 인증서를 넣는 것만으로 충분한 경우가 많습니다.

유용한 설정은 다음과 같습니다.

```bash
export CLAUDE_CODE_CERT_STORE=bundled
export CLAUDE_CODE_CERT_STORE=system
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

주의할 점:

- `CLAUDE_CODE_CERT_STORE` 는 환경 변수나 `settings.json` 의 `env` 블록에서 설정할 수 있습니다.
- Node.js 런타임에서는 커스텀 CA를 직접 신뢰시키려면 `NODE_EXTRA_CA_CERTS` 를 사용합니다.
- 클라이언트 인증서가 필요하면 `CLAUDE_CODE_CLIENT_CERT`, `CLAUDE_CODE_CLIENT_KEY`, `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` 로 mTLS를 구성할 수 있습니다.

### 확인 명령

먼저 환경 변수를 확인합니다.

```bash
env | grep -E 'HTTP_PROXY|HTTPS_PROXY|NO_PROXY|CLAUDE_CODE_CERT_STORE|NODE_EXTRA_CA_CERTS|CLAUDE_CODE_CLIENT_CERT|CLAUDE_CODE_CLIENT_KEY'
```

기본 엔드포인트에 직접 연결되는지 확인합니다.

```bash
curl -I https://api.anthropic.com
```

프록시 경유를 시험하려면:

```bash
HTTPS_PROXY=https://proxy.example.com:8080 curl -I https://api.anthropic.com
```

인증서 체인을 확인해야 하면 `openssl s_client` 로 같은 호스트를 점검하고, 사내 신뢰 저장소와 비교하세요.

Claude Code 안에서는 다음을 실행합니다.

```plaintext
/status
```

이 명령은 현재 활성 인증과 관리형 설정 소스를 보여주므로, 기대한 네트워크 경로를 실제로 쓰고 있는지 확인하는 데 유용합니다.

### 문제 해결

- 로그인 화면은 뜨는데 끝까지 완료되지 않으면, 먼저 프록시 인증과 TLS 검사 설정을 확인하세요.
- 업데이트나 플러그인이 실패하면 `storage.googleapis.com` 과 `downloads.claude.ai` 를 점검하세요.
- Claude.ai 로그인이 제한망에서 실패하면 `claude.ai` 와 `platform.claude.com` 이 허용 목록에 있는지 확인하세요.
- 특정 셸에서만 실패하면, 셸별로 상속되는 환경 변수를 비교하세요.

### 공식 문서 링크

- [기업 네트워크 구성](https://code.claude.com/docs/ko/network-config)
- [인증](https://code.claude.com/docs/ko/authentication)
- [Claude Code 설정](https://code.claude.com/docs/ko/settings)

---

<a id="11-deployment-admin-10-서버-관리-설정"></a>

## 11-10. 서버 관리 설정

이 문서는 Anthropic 서버에서 Claude.ai 관리자 콘솔을 통해 전달되는 관리형 설정만 다룹니다. 일반 설정 가이드와는 목적이 다릅니다. 사용자/프로젝트/로컬 설정의 전체 구조는 별도의 설정 문서를 참고하세요. 서버 관리 설정은 MDM이 없거나, 관리되지 않는 장치의 사용자에게도 조직 전체 정책을 강제해야 할 때 적합합니다.

### 개요

서버 관리 설정은 JSON 형식의 중앙 정책입니다. Claude Code는 시작 시점과 실행 중에 Anthropic 서버에서 이 설정을 받아 적용하며, 조직에서 가장 우선순위가 높은 관리형 소스로 취급합니다.

다음과 같은 경우에 사용합니다.

- 조직 전체에 동일한 보안 정책을 강제해야 할 때
- 권한, 훅, 환경 변수, 관리 전용 설정을 중앙에서 배포해야 할 때
- 장치 관리 도구 없이도 정책을 배포해야 할 때

이미 MDM 또는 OS 정책으로 장치를 관리한다면, 더 강한 로컬 강제력을 제공하는 엔드포인트 관리 설정이 더 적합합니다.

### 요구사항

- Claude for Teams 또는 Claude for Enterprise
- 해당 플랜에서 지원되는 Claude Code 버전
- `api.anthropic.com` 네트워크 접근

### 설정과의 차이

일반 설정 문서는 사용자 설정, 프로젝트 설정, 로컬 설정, 관리형 설정의 전체 우선순위를 설명합니다. 이 페이지는 그중 서버에서 전달되는 관리형 소스만 설명합니다.

핵심 차이점은 다음과 같습니다.

- 서버 관리 설정은 Claude.ai 관리자 콘솔에서 전달됩니다.
- 사용자, 프로젝트, 명령행 설정으로 덮어쓸 수 없습니다.
- 시작 시 가져오고, 실행 중 주기적으로 갱신합니다.
- 엔드포인트 관리 설정과는 별개입니다.

### 설정 방법

1. Claude.ai 관리자 설정을 엽니다.
2. Claude Code 관리 설정 메뉴로 이동합니다.
3. 정책 JSON을 입력합니다.
4. 저장 후 배포합니다.

형식은 `settings.json`과 동일하므로 권한, 환경 변수, 훅, 기타 지원 옵션을 같은 방식으로 사용할 수 있습니다. 또한 `allowManagedPermissionRulesOnly` 나 `forceRemoteSettingsRefresh` 같은 관리 전용 키도 넣을 수 있습니다.

예시:

```json
{
  "permissions": {
    "deny": [
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true
}
```

### 우선순위 와 전달

관리형 설정은 Claude Code 설정 계층에서 최상위입니다. 관리형 설정 안에서는 서버 관리 설정이 엔드포인트 관리 설정보다 먼저 확인됩니다. 서버 관리 설정에 키가 하나라도 있으면 엔드포인트 관리 설정은 무시됩니다. 서버 관리 설정이 비어 있을 때만 엔드포인트 관리 설정으로 넘어갑니다.

동작 특성도 기억해야 합니다.

- Claude Code는 시작 시 설정을 가져오고, 실행 중에는 약 1시간 간격으로 갱신합니다.
- 최초 실행에서는 가져오기가 끝나기 전까지 정책이 즉시 적용되지 않을 수 있습니다.
- 캐시가 있으면 다음 실행부터 즉시 적용됩니다.
- 대부분의 변경은 재시작 없이 반영되지만, 일부 고급 설정은 전체 재시작이 필요합니다.

중간의 비강제 상태를 허용할 수 없다면 `forceRemoteSettingsRefresh: true` 를 설정해 원격 정책을 새로 받지 못하면 시작하지 않도록 만들 수 있습니다.

### 접근 제어

다음 Claude.ai 역할만 서버 관리 설정을 관리할 수 있습니다.

- Primary Owner
- Owner

정책은 조직 전체에 적용되므로 변경 권한은 신뢰할 수 있는 사람에게만 줘야 합니다.

### 제한 사항

- 정책은 조직 전체에 동일하게 적용되며, 그룹별 분리는 아직 지원되지 않습니다.
- MCP 서버 구성은 서버 관리 설정으로 배포할 수 없습니다.
- 서버 관리 설정은 `api.anthropic.com` 에 직접 연결해야 하며, 서드파티 모델 공급자나 커스텀 `ANTHROPIC_BASE_URL` 에서는 사용할 수 없습니다.

### 확인 방법

실무에서 가장 간단한 확인 방법은 다음과 같습니다.

```bash
claude
```

Claude Code 안에서:

```plaintext
/status
/permissions
```

`/status` 로 어떤 관리형 소스가 활성화되었는지 확인하고, `/permissions` 로 실제 적용된 권한 규칙을 확인합니다. 시작 시 경고나 승인 대화상자가 떠야 하는 정책이라면, 사용자가 재시작했을 때 바로 보이는지도 확인합니다.

### 공식 문서 링크

- [서버 관리 설정](https://code.claude.com/docs/ko/server-managed-settings)
- [Claude Code 설정](https://code.claude.com/docs/ko/settings)
- [인증](https://code.claude.com/docs/ko/authentication)

---

<a id="11-deployment-admin-11-zero-data-retention"></a>

## 11-11. Zero Data Retention

Claude Code의 Zero Data Retention(ZDR)은 Anthropic direct platform의 Enterprise 기능입니다. Claude Code 추론에 대한 Anthropic의 보존 동작을 바꾸지만, 주변의 모든 기능과 통합까지 자동으로 retention-free로 만들어 주는 것은 아닙니다.

### 개요

Claude for Enterprise에서 Claude Code에 ZDR이 켜지면:

- 프롬프트와 모델 응답이 실시간으로 처리되고
- 응답 반환 후 Anthropic에 저장되지 않으며
- 법적 의무나 오남용 대응 예외는 여전히 존재합니다

공식 문서는 ZDR과 함께 다음 관리 기능도 언급합니다.

- 사용자별 비용 통제
- analytics
- server-managed settings
- audit logging

### 범위

ZDR은 Claude for Enterprise의 Claude Code 추론에 적용됩니다.

조직 단위로 활성화되며, 새 조직이 자동으로 상속하지는 않습니다. 따라서 조직이 늘어날 때마다 account team을 통해 별도 활성화가 필요합니다.

### 무엇을 덮는가

ZDR이 덮는 범위:

- Claude Code 터미널 추론
- Claude Code 세션 중 생성된 모델 응답
- 해당 Enterprise 구성을 통해 쓰는 모든 Claude 모델

### 무엇을 덮지 않는가

공식 문서가 명시적으로 제외하는 항목:

- `claude.ai`의 일반 채팅
- Cowork 세션
- analytics 메타데이터
- 사용자/seat 관리 기록
- MCP 서버와 외부 도구 같은 서드파티 통합

핵심 해석은 이렇습니다. ZDR은 Anthropic 추론 보존 정책을 바꾸는 것이지, 워크플로우 전체의 모든 데이터 경로를 없애 주는 것이 아닙니다.

### ZDR에서 비활성화되는 기능

프롬프트나 completion 저장이 필요한 기능은 자동으로 꺼집니다.

- Claude Code on the web
- Desktop remote sessions
- `/feedback`

사용자가 이런 기능을 호출하면 조직 정책 때문에 허용되지 않는다는 오류가 반환됩니다.

### 정책 위반 예외

ZDR이 켜져 있어도 법적 요구나 정책 위반 대응을 위해 데이터가 보존될 수 있습니다. 공식 문서는 그런 경우 세션 입력과 출력이 최대 2년까지 보존될 수 있다고 설명합니다.

### ZDR 요청 방법

ZDR은 self-serve 토글이 아닙니다. 공식 경로는 Anthropic account team을 통해 자격 검토 후 활성화하는 방식입니다.

### 관련 링크

- [공식 zero data retention 문서](https://code.claude.com/docs/ko/zero-data-retention)
- [Data Usage](11-deployment-admin.md#11-deployment-admin-03-data-usage)
- [Monitoring Usage](11-deployment-admin.md#11-deployment-admin-08-monitoring-usage)
- [Server-Managed Settings](11-deployment-admin.md#11-deployment-admin-10-서버-관리-설정)
