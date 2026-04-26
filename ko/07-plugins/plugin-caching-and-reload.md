# 캐싱과 Reload 의미

이 문서는 hot-reload가 단순히 plugin 정의를 다시 읽을 뿐, 빌드 산출물이나 외부 의존성을 재생성해 주지 않는다는 점을 명확히 합니다. plugin이 컴파일된 asset이나 외부 패키지에 의존할 때 reload만으로 충분하지 않은 이유와 그 해결법을 알고 싶을 때 참고하세요. 영구 상태는 shipped tree가 아니라 `${CLAUDE_PLUGIN_DATA}`에 둬야 한다는 원칙도 함께 다룹니다.

Hot-reload는 plugin runtime cache를 이해하는 일을 대신해 주지 않습니다.

실무 가이드:

- manifest와 component 정의는 `/reload-plugins`로 다시 읽을 수 있음
- plugin이 compiled asset을 가리킨다면, reload 전에 생성된 build output이 실제로 존재해야 함
- 영구 상태는 shipped plugin tree가 아니라 `${CLAUDE_PLUGIN_DATA}`에 둬야 함
- 외부 패키지 설치나 generated file에 의존한다면, reload 전에 그 의존성을 따로 새로고침해야 함

즉, reload는 Claude Code의 plugin 정의 인식을 갱신할 뿐이고, plugin을 대신 rebuild해 주지는 않습니다.
