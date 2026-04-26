이 문서는 plugin 설치·제거·활성화·비활성화·검증·업데이트를 실행할 수 있는 `claude plugin` CLI 서브커맨드 전체 목록을 제공합니다. 셸 스크립트나 CI에서 plugin 작업을 자동화할 때 어떤 명령을 사용할 수 있는지 빠르게 확인할 때 참고하세요. CLI 명령은 슬래시 커맨드와 동일한 기능을 비대화형으로 수행합니다.

모든 plugin 작업은 CLI 명령으로 사용할 수 있습니다:

```bash
claude plugin install <name>@<marketplace>   # Install from a marketplace
claude plugin remove <name>               # Remove a plugin
claude plugin list                           # List installed plugins
claude plugin enable <name>                  # Enable a disabled plugin
claude plugin disable <name>                 # Disable a plugin
claude plugin validate                       # Validate plugin structure
claude plugin update                         # Update installed plugins
```
