# LLM Gateway

LLM gateway는 Claude Code가 Anthropic, Bedrock, Vertex에 직접 붙는 대신 중앙 프록시를 통해 모델에 접근하도록 만들 때 사용합니다. 중앙 인증, 모델 라우팅, 비용 통제, 감사 정책이 필요할 때 특히 유용합니다.

## 개요

LLM gateway는 Claude Code와 실제 모델 제공자 사이의 중간 계층입니다. 주된 목적은 다음과 같습니다.

- API 자격 증명 중앙화
- 속도 제한과 예산 정책 적용
- 제공자 간 모델 라우팅
- 사용량과 감사 메타데이터 수집
- 기업 네트워크 정책 강제

Claude Code는 게이트웨이가 공식 문서에서 요구하는 API 동작을 제대로 보존할 때만 안정적으로 동작합니다.

## 게이트웨이 요구사항

게이트웨이는 최소한 다음 API 형태 중 하나를 노출해야 합니다.

1. Anthropic Messages API
2. Bedrock InvokeModel
3. Vertex rawPredict

중요한 호환성 규칙:

- 헤더 기반 API에서는 `anthropic-beta`, `anthropic-version` 헤더를 그대로 전달해야 합니다.
- 본문 기반 API에서는 `anthropic_beta`, `anthropic_version` 필드를 보존해야 합니다.
- 스트리밍 기능을 쓸 계획이면 스트리밍 응답도 깨지지 않아야 합니다.

이 필드가 빠지면 Claude Code 기능 일부가 줄어들거나 요청이 실패할 수 있습니다.

## 기본 설정

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

## 모델 선택

게이트웨이가 제공자 고유 모델명을 숨길 때 모델 선택이 특히 헷갈릴 수 있습니다. 다음을 함께 확인하세요.

- 게이트웨이가 외부에 노출하는 모델 이름
- Claude Code 별칭이 그 이름에 어떻게 매핑되는지
- 게이트웨이가 Anthropic, Bedrock, Vertex 중 어떤 요청 형식을 기대하는지

Anthropic 스타일 endpoint 뒤에서 Bedrock 또는 Vertex를 감추는 구성에서는 실험 베타를 꺼야 하는 경우가 있습니다.

```bash
export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1
```

게이트웨이가 해당 베타 동작을 안전하게 전달하지 못할 때만 사용하세요.

## LiteLLM 참고

공식 문서는 LiteLLM을 흔한 예시로 언급하지만, 기본 권장안처럼 취급하지는 않습니다. 직접 보안과 운영 책임을 져야 하는 서드파티 인프라로 보는 것이 맞습니다.

공식 문서의 중요한 경고:

- LiteLLM PyPI `1.82.7`, `1.82.8`은 악성 코드가 포함된 버전이므로 사용하면 안 됩니다.

해당 버전을 사용했다면 관련 자격 증명을 즉시 회전해야 합니다.

## 보안 참고

- 프록시나 게이트웨이 비밀값을 저장소 파일에 하드코딩하지 마세요.
- 정적 시크릿보다 짧은 수명의 토큰이나 헬퍼 스크립트를 선호하세요.
- 게이트웨이가 프롬프트 본문, 도구 입력, 응답 내용을 저장하는지 확인하세요.
- 요청을 재작성하는 게이트웨이라면 Claude Code 기능 헤더를 제거하지 않는지 점검하세요.

## 문제 해결

### `Extra inputs are not permitted`

게이트웨이가 `anthropic-beta` 헤더를 제거했거나 요청 형식을 바꿨을 때 자주 나타납니다. 먼저 게이트웨이 포워딩 동작을 수정해야 합니다.

### 직접 연결은 되는데 게이트웨이 뒤에서만 실패함

다음을 순서대로 확인하세요.

- base URL
- 인증 헤더 형식
- 모델 이름 매핑
- 스트리밍 지원
- 버전/베타 헤더 전달

### 게이트웨이 뒤에서 기능이 줄어듦

게이트웨이 프로토콜이 공식 지원 형식과 정확히 맞는지 비교하세요. 제공자 API를 부분적으로만 흉내 내는 프록시는 완전 실패 대신 기능 저하를 일으키는 경우가 많습니다.

## 관련 링크

- [공식 LLM gateway 문서](https://code.claude.com/docs/ko/llm-gateway)
- [Network Configuration](./network-config.md)
- [Data Usage](./data-usage.md)
- [문제 해결](../10-cli/troubleshooting.md)
