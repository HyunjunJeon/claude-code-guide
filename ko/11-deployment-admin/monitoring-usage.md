# Monitoring Usage

Claude Code는 OpenTelemetry를 통해 사용량과 활동 텔레메트리를 내보낼 수 있습니다. 조직 수준에서 채택률, 비용, 도구 사용, 세션 행동을 추적하는 핵심 경로입니다.

## 개요

공식 문서 기준으로 모니터링 신호는 세 가지입니다.

- metrics
- logs/events
- traces

이 경로로 다음 질문에 답할 수 있습니다.

- 어떤 팀이 Claude Code를 많이 쓰는가?
- 어디에서 비용이 급증하는가?
- 어떤 도구가 많이 호출되는가?
- 어떤 세션이 실제 코드, 커밋, PR을 많이 만들고 있는가?

## 빠른 시작

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

## 관리자 관점

관리형 팀에서는 각 개발자가 직접 설정하게 두기보다 managed settings로 중앙 배포하는 것이 공식 권장 경로입니다.

이 방식의 장점:

- 조직 전체에 일관된 모니터링 적용
- 사용자가 설정을 임의로 우회하기 어려움
- 팀/부서 속성을 중앙에서 같이 부여 가능

## 측정할 수 있는 것

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

## 보안과 프라이버시

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

## Tracing

Tracing은 베타 기능이며 추가 활성화가 필요합니다.

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1
export OTEL_TRACES_EXPORTER=otlp
```

이렇게 하면 하나의 사용자 프롬프트가 어떤 API 호출과 도구 실행으로 이어졌는지 연결해서 볼 수 있습니다.

## 문제 해결

### 텔레메트리가 전혀 들어오지 않음

다음을 확인하세요.

- `CLAUDE_CODE_ENABLE_TELEMETRY=1`
- exporter 종류
- OTLP endpoint
- 인증 헤더
- collector까지의 네트워크 경로

### 데이터가 너무 민감함

`OTEL_LOG_USER_PROMPTS`, `OTEL_LOG_TOOL_DETAILS`, `OTEL_LOG_TOOL_CONTENT`, `OTEL_LOG_RAW_API_BODIES`가 켜졌는지 확인하세요. 이 플래그들이 수집 범위를 크게 바꿉니다.

### metrics cardinality가 너무 큼

세션 ID나 account UUID 같은 고카디널리티 속성을 줄여 백엔드 부담을 낮추세요.

## 관련 링크

- [공식 monitoring 문서](https://code.claude.com/docs/ko/monitoring-usage)
- [Server-Managed Settings](./server-managed-settings.md)
- [Data Usage](./data-usage.md)
- [Zero Data Retention](./zero-data-retention.md)
