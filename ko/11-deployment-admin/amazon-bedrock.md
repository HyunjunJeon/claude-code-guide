# Amazon Bedrock

Amazon Bedrock는 Claude Code를 AWS 안에서 운영해야 할 때 적합합니다. IAM, CloudTrail, 리전 제어, Bedrock 과금 체계를 그대로 쓸 수 있습니다.

## 언제 쓰나

- AWS 중심 표준을 이미 갖고 있고, Claude Code도 같은 보안/감사/네트워크 경계 안에서 쓰고 싶을 때
- 팀 단위 배포에서 인퍼런스 프로파일, 가드레일, 중앙 비용 관리를 같이 묶어야 할 때
- 모델 호출을 AWS 리전과 계정 경계 안으로 유지해야 할 때

## 설정 경로

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

## 인증 및 설정 기본

- `AWS_REGION` 은 필수입니다. Claude Code는 `~/.aws/config` 에서 이 값을 읽지 않습니다.
- Claude Code는 AWS SDK의 기본 credential chain을 사용합니다.
- AWS 자격 증명이 인증을 담당하므로 `/login` 과 `/logout` 은 비활성화됩니다.
- AWS Organizations를 쓰는 경우, 관리 계정에서 `bedrock:PutUseCaseForModelAccess` 로 사용 사례 제출을 한 번 처리할 수 있습니다.

## 모델과 제공자 주의점

- Bedrock은 Converse API가 아니라 Invoke API 경로를 사용합니다.
- 버전 고정이 없으면 alias가 더 최신 모델로 바뀔 수 있고, 그 버전이 아직 계정에 활성화되지 않았을 수 있습니다.
- 일부 배포는 inference profile 또는 application inference profile 을 사용하므로, 실제로 노출되는 형식과 일치하는 모델 ID를 고정해야 합니다.
- Mantle은 Bedrock의 별도 엔드포인트이며, 자체 모델 목록과 Claude Code v2.1.94 이상이 필요합니다.

## 자주 보는 오류

- SSO나 프록시 때문에 브라우저가 반복해서 열리면 `awsAuthRefresh` 를 제거하거나, Claude Code를 띄우기 전에 `aws sso login` 을 먼저 실행하세요.
- `403` 이면 모델 접근이 아직 허용되지 않았거나 IAM 역할에 `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, `bedrock:ListInferenceProfiles` 가 빠졌을 가능성이 큽니다.
- Mantle에서 모델 ID를 포함한 `400` 이 나오면 Bedrock inference profile ID를 Mantle에 넘긴 경우일 가능성이 큽니다.
- 리전 또는 처리량 오류가 나면 `AWS_REGION` 을 바꾸거나, 해당 리전에서 지원되는 inference profile / 모델을 선택해야 합니다.

## 관련 링크

- Anthropic: [Claude Code on Amazon Bedrock](https://code.claude.com/docs/ko/amazon-bedrock)
- Anthropic: [Enterprise deployment overview](https://code.claude.com/docs/ko/third-party-integrations)
- AWS: [Amazon Bedrock 문서](https://docs.aws.amazon.com/bedrock/)
- AWS: [Bedrock inference profiles](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html)
- AWS: [Bedrock quotas and throttling](https://docs.aws.amazon.com/bedrock/latest/userguide/quotas.html)
