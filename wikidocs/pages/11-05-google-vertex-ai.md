Google Vertex AI는 Claude Code를 GCP 안에서 운영해야 할 때 적합합니다. Google Cloud 인증, Model Garden, 프로젝트 단위 과금과 할당량 관리를 그대로 활용할 수 있습니다.

## 언제 쓰나

- GCP 중심 표준을 이미 갖고 있고, Claude Code도 같은 프로젝트/ID 경계 안에서 쓰고 싶을 때
- 중앙 과금, 할당량 관리, 리전별 엔드포인트 제어가 필요할 때
- Vertex AI의 감사/보안 경계를 유지하면서 Claude Code를 배포하고 싶을 때

## 설정 경로

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

## 인증 및 설정 기본

- Claude Code는 표준 Google Cloud 인증을 사용합니다.
- `gcloud` 의 Application Default Credentials, 서비스 계정 키 파일, 또는 이미 환경에 들어 있는 자격 증명을 사용할 수 있습니다.
- Claude Code는 기본적으로 `ANTHROPIC_VERTEX_PROJECT_ID` 를 프로젝트 ID로 사용하며, 필요하면 `GCLOUD_PROJECT`, `GOOGLE_CLOUD_PROJECT`, `GOOGLE_APPLICATION_CREDENTIALS` 로 덮어쓸 수 있습니다.
- 인증은 Google Cloud 자격 증명이 담당하므로 `/login` 과 `/logout` 은 비활성화됩니다.
- 프롬프트 캐싱을 끄고 싶으면 `DISABLE_PROMPT_CACHING=1` 을 설정합니다.

## 모델과 제공자 주의점

- Vertex AI는 global endpoint와 regional endpoint를 모두 지원하지만, 모든 Claude 모델 버전이 모든 곳에서 동작하는 것은 아닙니다.
- global endpoint 가 편해도, 일부 모델은 regional endpoint 가 필요합니다.
- 여러 사용자에게 배포할 때는 `sonnet` 나 `opus` 같은 alias 대신 모델 버전을 고정하는 편이 안전합니다.
- Claude Code는 시작 시 모델 가용성을 확인하고, 필요하면 현재 세션에서만 이전 버전으로 내려갈 수 있습니다.

## 자주 보는 오류

- `404` model-not-found 오류는 보통 Model Garden에서 모델이 아직 활성화되지 않았거나, 리전이 틀렸거나, global endpoint 를 지원하지 않는 모델을 쓴 경우입니다.
- `429` 는 대개 quota 문제이거나 선택한 리전에서 해당 모델을 충분히 쓸 수 없다는 뜻입니다.
- 시작 시 pin 업데이트 안내가 나오면, Claude Code가 프로젝트에서 더 최신 모델을 볼 수 있다는 뜻이므로 고정값을 다시 잡아야 합니다.
- 위자드가 끝나지 않으면 billing, Vertex AI API 활성화, Claude 모델 접근 승인 상태를 다시 확인하세요.

## 관련 링크

- Anthropic: [Claude Code on Google Vertex AI](https://code.claude.com/docs/ko/google-vertex-ai)
- Anthropic: [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- Google Cloud: [Vertex AI 문서](https://cloud.google.com/vertex-ai/docs)
- Google Cloud: [Vertex AI Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
- Google Cloud: [Vertex AI quotas and limits](https://cloud.google.com/vertex-ai/quotas)
- Google Cloud: [Vertex AI pricing](https://cloud.google.com/vertex-ai/pricing)
