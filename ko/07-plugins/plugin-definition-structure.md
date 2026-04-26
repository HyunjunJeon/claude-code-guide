# Plugin 정의 구조

이 문서는 plugin의 핵심 매니페스트인 `.claude-plugin/plugin.json` 파일의 구조와 필수 필드를 설명합니다. plugin을 처음 만들 때 가장 먼저 작성해야 하는 파일이므로 이 형식을 익혀 두면 시작 시간이 단축됩니다. 이름·설명·버전·작성자·라이선스 같은 메타데이터를 어떻게 채워야 마켓플레이스에서 표시되는지 확인할 때 참고하세요.

Plugin 매니페스트는 `.claude-plugin/plugin.json`에서 JSON 형식을 사용합니다:

```json
{
  "name": "my-first-plugin",
  "description": "A greeting plugin",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  },
  "homepage": "https://example.com",
  "repository": "https://github.com/user/repo",
  "license": "MIT"
}
```
