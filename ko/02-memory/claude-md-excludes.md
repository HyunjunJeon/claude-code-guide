# `claudeMdExcludes`로 CLAUDE.md 파일 제외하기

이 문서는 특정 CLAUDE.md 파일이 컨텍스트로 로드되지 않도록 차단하는 `claudeMdExcludes` 설정을 다룹니다. 모노레포나 벤더 코드가 섞인 리포지토리처럼 관련 없는 지시사항이 컨텍스트 윈도우를 잠식할 때 사용하세요. `~/.claude/settings.json` 또는 프로젝트 `.claude/settings.json`에 글롭 패턴 배열을 추가하는 방식으로 설정합니다.

대규모 모노레포에서는 일부 CLAUDE.md 파일이 현재 작업과 관련이 없을 수 있습니다. `claudeMdExcludes` 설정을 사용하면 특정 CLAUDE.md 파일을 건너뛰어 컨텍스트에 로드되지 않게 할 수 있습니다:

```jsonc
// In ~/.claude/settings.json or .claude/settings.json
{
  "claudeMdExcludes": [
    "packages/legacy-app/CLAUDE.md",
    "vendors/**/CLAUDE.md"
  ]
}
```

패턴은 프로젝트 루트에 대한 상대 경로로 매칭됩니다. 다음과 같은 경우에 특히 유용합니다:

- 일부만 관련 있는 여러 하위 프로젝트가 있는 모노레포
- 벤더 또는 서드파티 CLAUDE.md 파일이 포함된 리포지토리
- 오래되었거나 관련 없는 지시사항을 제외하여 Claude 컨텍스트 윈도우의 노이즈 줄이기
