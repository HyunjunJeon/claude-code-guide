# 번들 스킬

이 문서는 Claude Code에 기본 내장되어 별도 설치 없이 쓸 수 있는 스킬을 정리합니다.
"내가 만들 필요 없이 바로 쓸 수 있는 스킬이 뭐가 있지?"라는 질문에 답합니다.
번들 스킬도 커스텀 스킬과 동일한 SKILL.md 형식을 따르므로 만드는 법을 익힐 때 좋은 참고가 됩니다.

Claude Code에는 설치 없이 항상 사용할 수 있는 여러 내장 스킬이 포함되어 있습니다:

| 스킬 | 설명 |
|-------|-------------|
| `/simplify` | 변경된 파일의 재사용성, 품질, 효율성을 검토합니다; 3개의 병렬 리뷰 에이전트를 생성합니다 |
| `/batch <instruction>` | git worktree를 사용하여 코드베이스 전반에 걸친 대규모 병렬 변경을 오케스트레이션합니다 |
| `/debug [description]` | 디버그 로그를 읽어 현재 세션의 문제를 해결합니다 |
| `/loop [interval] <prompt>` | 주어진 간격으로 프롬프트를 반복 실행합니다 (예: `/loop 5m check the deploy`) |
| `/claude-api` | Claude API/SDK 레퍼런스를 로드합니다; `anthropic`/`@anthropic-ai/sdk` import 시 자동 활성화됩니다 |

이 스킬들은 설치나 설정 없이 바로 사용할 수 있습니다. 커스텀 스킬과 동일한 SKILL.md 형식을 따릅니다.
