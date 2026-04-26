Python은 자동화 백엔드, 평가 시스템, 리서치 도구, 운영 워크플로처럼 이미 Python 위에 있는 환경에 잘 맞습니다.

## 왜 고를까

다음이 필요하면 Python SDK가 적합합니다.

- 기존 Python 서비스와의 쉬운 통합
- 데이터나 ML 워크플로를 둘러싼 오케스트레이션
- 세션을 이어 가는 명확한 클라이언트 객체
- 사내 자동화를 위한 익숙한 패키징

## 기본 형태

Python에서는 클라이언트 객체를 유지한 채 여러 쿼리를 보내는 구성이 흔합니다.

```python
from claude_agent_sdk import ClaudeSDKClient

client = ClaudeSDKClient()
result = client.query(
    prompt="Summarize the recent release notes",
    allowed_tools=["Read", "WebFetch"],
)
print(result)
```

## 강점

- 오케스트레이션 중심 시스템에 잘 맞습니다.
- 평가, 분석, 노트북 워크플로와 자연스럽게 연결됩니다.
- 세션 지향 클라이언트 모델이 분명합니다.

## 흔한 실수

- Python 세션이 디스크에 저장된다는 점을 놓치는 것
- 노트북 실험을 운영 보안 경계와 같은 수준으로 생각하는 것
- 운영 작업에 너무 많은 도구를 허용하는 것

## 관련 링크

- 세션
- 구조화된 출력
- 공식 가이드: https://code.claude.com/docs/ko/agent-sdk/python
