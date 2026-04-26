# 지원 파일

이 문서는 SKILL.md 외에 templates·examples·references·scripts 디렉토리를 어떻게 구성하면 좋은지 설명합니다.
스킬 본문이 길어져 500줄을 넘을 위험이 있을 때, 또는 같은 템플릿을 여러 번 채워야 할 때 활용합니다.
지원 파일은 레벨 3에서만 로드되므로 컨텍스트를 절약하면서도 필요할 때 깊이를 제공합니다.

스킬은 `SKILL.md` 외에 디렉토리에 여러 파일을 포함할 수 있습니다. 이러한 지원 파일(템플릿, 예제, 스크립트, 참조 문서)을 통해 메인 스킬 파일을 집중적으로 유지하면서 Claude에 필요에 따라 로드할 수 있는 추가 리소스를 제공합니다.

```
my-skill/
├── SKILL.md              # 주요 지시사항 (필수, 500줄 미만 유지)
├── templates/            # Claude가 채울 템플릿
│   └── output-format.md
├── examples/             # 예상 형식을 보여주는 예제 출력
│   └── sample-output.md
├── references/           # 도메인 지식 및 사양
│   └── api-spec.md
└── scripts/              # Claude가 실행할 수 있는 스크립트
    └── validate.sh
```

지원 파일 가이드라인:

- `SKILL.md`를 **500줄** 미만으로 유지하십시오. 상세한 참조 자료, 대규모 예제, 사양은 별도 파일로 이동하십시오.
- `SKILL.md`에서 추가 파일을 **상대 경로**로 참조하십시오 (예: `[API reference](references/api-spec.md)`).
- 지원 파일은 레벨 3(필요 시)에서 로드되므로 Claude가 실제로 읽을 때까지 컨텍스트를 소비하지 않습니다.
