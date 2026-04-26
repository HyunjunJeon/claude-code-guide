`/ultraplan`은 로컬 CLI에서 시작한 planning 작업을 Claude Code on the web으로 넘겨서 브라우저에서 계획을 검토하게 하고, 이후 클라우드에서 실행하거나 다시 터미널로 되돌려 로컬에서 구현하게 하는 기능입니다.

## 무엇인가

Ultraplan은 큰 작업이나 애매한 작업을 위한 research preview 계획 워크플로입니다. 전체 계획을 터미널에서만 다듬는 대신, 브라우저의 더 풍부한 리뷰 화면에서 계획을 다듬을 수 있게 해 줍니다.

공식 문서는 이를 `/ultrareview`의 planning 대응 기능으로 설명합니다.

## 요구사항

- Claude Code `v2.1.91` 이상
- Claude Code on the web 계정
- GitHub 저장소

Anthropic 클라우드 인프라에서 동작하므로 다음 경로에서는 사용할 수 없습니다.

- Amazon Bedrock
- Google Vertex AI
- Microsoft Foundry

또한 계정의 기본 cloud environment를 사용하며, 없으면 첫 실행 때 자동 생성됩니다.

## 실행 방법

세 가지 방식이 있습니다.

1. `/ultraplan <prompt>` 실행
2. 일반 프롬프트 안에 `ultraplan` 키워드 포함
3. 로컬 plan 승인 대화상자에서 web refine 옵션 선택

예시:

```plaintext
/ultraplan migrate the auth service from sessions to JWTs
```

## CLI 상태 흐름

실행 후 터미널에는 백그라운드 상태 표시가 나타납니다.

- `◇ ultraplan`: Claude가 조사하고 계획을 작성 중
- `◇ ultraplan needs your input`: 추가 설명이 필요함
- `◆ ultraplan ready`: 브라우저에서 검토 가능

`/tasks`로 현재 ultraplan 작업을 보고, 세션 링크를 열거나, 중지할 수 있습니다. 중지하면 클라우드 세션이 archive되고 상태 표시가 사라집니다.

## 브라우저에서 계획 검토

계획이 준비되면 웹 세션을 열어 검토합니다. 공식 문서가 강조하는 검토 기능:

- 특정 구간에 인라인 코멘트
- 이모지 반응
- 아웃라인 사이드바

즉, ultraplan의 핵심 가치는 "코딩 전에 계획 자체를 더 정교하게 리뷰할 수 있다"는 점입니다.

## 어디서 실행할지 선택

계획이 충분히 좋아지면 두 가지 경로가 있습니다.

### 웹에서 바로 실행

같은 클라우드 세션에서 계획을 승인하고 구현까지 이어갑니다. 저장소와 환경이 이미 web workflow에 잘 맞을 때 유리합니다.

### 터미널로 다시 보내기

계획을 승인하고 로컬 CLI로 teleport해서 구현합니다. 이 경우 터미널은 다음 선택지를 보여줍니다.

- `Implement here`
- `Start new session`
- `Cancel` 후 계획 파일로 저장

새 세션을 시작하면 Claude가 이전 대화로 돌아갈 수 있도록 `claude --resume` 명령을 출력합니다.

## 언제 써야 하나

다음 상황에 잘 맞습니다.

- 작업이 크고 구현 전에 계획 리뷰가 필요할 때
- 계획 문서에 구간별 코멘트를 달고 싶을 때
- 터미널 planning 흐름이 답답할 때
- 최종 실행 위치를 로컬과 클라우드 사이에서 고르고 싶을 때

작업이 작다면 일반 local plan mode가 더 단순합니다.

## 흔한 실수

- GitHub 기반 web 설정 없이 동작할 거라고 기대하는 것
- ultraplan 시작 시 Remote Control이 끊긴다는 점을 놓치는 것
- 클라우드 세션에서 Bedrock/Vertex/Foundry 경로도 쓸 수 있다고 생각하는 것
- 브라우저 검토 단계를 부가 기능으로만 보는 것

## 관련 가이드

- Web Quickstart
- Planning and Thinking
- Ultrareview

## 공식 출처

- [Plan in the cloud with ultraplan](https://code.claude.com/docs/ko/ultraplan)
