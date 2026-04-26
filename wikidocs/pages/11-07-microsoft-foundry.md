Microsoft Foundry는 Claude Code를 Azure 안에서 운영해야 할 때 적합합니다. Microsoft Entra ID, Azure RBAC, Azure 과금 체계를 그대로 활용할 수 있습니다.

## 언제 쓰나

- Azure 중심 표준을 이미 갖고 있고, Claude Code도 같은 ID/리소스 경계 안에서 쓰고 싶을 때
- 중앙 과금, 역할 기반 접근 제어, Azure 네이티브 모니터링이 필요할 때
- Claude Code를 Azure 보안 및 규정 경계 안에 두고 싶을 때

## 설정 경로

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

## 인증 및 설정 기본

- `ANTHROPIC_FOUNDRY_API_KEY` 가 있으면 Claude Code가 그 값을 직접 사용합니다.
- 키가 없으면 Azure SDK의 default credential chain 을 사용하며, 로컬 환경에서는 보통 `az login` 이 포함됩니다.
- Azure 자격 증명이 인증을 담당하므로 `/login` 과 `/logout` 은 비활성화됩니다.
- `ANTHROPIC_FOUNDRY_BASE_URL` 로 전체 Azure 엔드포인트나 게이트웨이를 지정할 수 있습니다.

## 모델과 제공자 주의점

- Foundry에서 Claude 모델을 쓰려면 현재 Enterprise 또는 MCA-E 구독이 필요합니다.
- Claude Code를 쓰기 전에 Foundry 포털에서 Claude 배포를 먼저 만들어야 합니다.
- 여러 사용자에게 배포할 때는 `sonnet`, `opus`, `haiku` 같은 alias 대신 모델 버전을 고정하는 편이 안전합니다.
- 기본 역할인 `Azure AI User` 와 `Cognitive Services User` 에는 Claude 모델 호출에 필요한 권한이 포함됩니다.
- 더 좁은 권한이 필요하면 `Microsoft.CognitiveServices/accounts/providers/*` 데이터 액션만 허용하는 커스텀 역할을 만듭니다.

## 자주 보는 오류

- `ChainedTokenCredential authentication failed` 는 Entra ID가 아직 설정되지 않았거나 `ANTHROPIC_FOUNDRY_API_KEY` 가 빠졌을 때 흔합니다.
- `401` 또는 `403` 는 리소스는 있지만 Azure RBAC 역할이 부족하다는 뜻인 경우가 많습니다.
- Claude Code가 배포를 못 찾으면 리소스 이름과 배포 이름이 Foundry에서 만든 값과 정확히 일치하는지 확인하세요.
- `/status` 에 Foundry가 안 보이면 Claude Code를 띄운 같은 셸에서 `CLAUDE_CODE_USE_FOUNDRY=1` 이 export 되었는지 확인하세요.

## 관련 링크

- Anthropic: [Claude Code on Microsoft Foundry](https://code.claude.com/docs/ko/microsoft-foundry)
- Anthropic: [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- Microsoft: [Microsoft Foundry에서 Claude 모델 배포 및 사용](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-claude)
- Microsoft: [Microsoft Foundry용 Claude Code 설정](https://learn.microsoft.com/azure/foundry/foundry-models/how-to/configure-claude-code)
- Microsoft: [Foundry 모델 카탈로그](https://ai.azure.com/catalog/models)
- Microsoft: [Foundry 모델 제품 페이지](https://azure.microsoft.com/en-us/products/ai-foundry/models/)
