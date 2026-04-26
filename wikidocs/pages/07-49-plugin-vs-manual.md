이 문서는 슬래시 커맨드, 서브에이전트, MCP, hook을 수동으로 하나씩 설정할 때(2시간 이상)와 plugin으로 묶어 단일 명령으로 설치할 때(2분)의 차이를 비교합니다. 팀에 동일한 환경을 보급해야 하는 경우 plugin이 왜 운영 비용을 줄이는지 설득해야 할 때 참고하세요. 수동 설정의 누적 작업과 일관성 문제를 plugin이 어떻게 해결하는지 한눈에 보여 줍니다.

**수동 설정 (2시간 이상):**

- slash command를 하나씩 설치
- subagent를 개별적으로 생성
- MCP를 별도로 설정
- hooks를 수동으로 설정
- 모든 것을 문서화
- 팀과 공유 (올바르게 설정하기를 기대)

**Plugin 사용 (2분):**

```bash
/plugin install pr-review
# ✅ Everything installed and configured
# ✅ Ready to use immediately
# ✅ Team can reproduce exact setup
```
