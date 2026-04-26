Claude Code의 Zero Data Retention(ZDR)은 Anthropic direct platform의 Enterprise 기능입니다. Claude Code 추론에 대한 Anthropic의 보존 동작을 바꾸지만, 주변의 모든 기능과 통합까지 자동으로 retention-free로 만들어 주는 것은 아닙니다.

## 개요

Claude for Enterprise에서 Claude Code에 ZDR이 켜지면:

- 프롬프트와 모델 응답이 실시간으로 처리되고
- 응답 반환 후 Anthropic에 저장되지 않으며
- 법적 의무나 오남용 대응 예외는 여전히 존재합니다

공식 문서는 ZDR과 함께 다음 관리 기능도 언급합니다.

- 사용자별 비용 통제
- analytics
- server-managed settings
- audit logging

## 범위

ZDR은 Claude for Enterprise의 Claude Code 추론에 적용됩니다.

조직 단위로 활성화되며, 새 조직이 자동으로 상속하지는 않습니다. 따라서 조직이 늘어날 때마다 account team을 통해 별도 활성화가 필요합니다.

## 무엇을 덮는가

ZDR이 덮는 범위:

- Claude Code 터미널 추론
- Claude Code 세션 중 생성된 모델 응답
- 해당 Enterprise 구성을 통해 쓰는 모든 Claude 모델

## 무엇을 덮지 않는가

공식 문서가 명시적으로 제외하는 항목:

- `claude.ai`의 일반 채팅
- Cowork 세션
- analytics 메타데이터
- 사용자/seat 관리 기록
- MCP 서버와 외부 도구 같은 서드파티 통합

핵심 해석은 이렇습니다. ZDR은 Anthropic 추론 보존 정책을 바꾸는 것이지, 워크플로우 전체의 모든 데이터 경로를 없애 주는 것이 아닙니다.

## ZDR에서 비활성화되는 기능

프롬프트나 completion 저장이 필요한 기능은 자동으로 꺼집니다.

- Claude Code on the web
- Desktop remote sessions
- `/feedback`

사용자가 이런 기능을 호출하면 조직 정책 때문에 허용되지 않는다는 오류가 반환됩니다.

## 정책 위반 예외

ZDR이 켜져 있어도 법적 요구나 정책 위반 대응을 위해 데이터가 보존될 수 있습니다. 공식 문서는 그런 경우 세션 입력과 출력이 최대 2년까지 보존될 수 있다고 설명합니다.

## ZDR 요청 방법

ZDR은 self-serve 토글이 아닙니다. 공식 경로는 Anthropic account team을 통해 자격 검토 후 활성화하는 방식입니다.

## 관련 링크

- [공식 zero data retention 문서](https://code.claude.com/docs/ko/zero-data-retention)
- [Data Usage](https://wikidocs.net/345713)
- [Monitoring Usage](https://wikidocs.net/345712)
- [Server-Managed Settings](https://wikidocs.net/345711)
