# `--add-dir`로 추가 디렉터리 포함

이 문서는 현재 작업 디렉터리 바깥에 있는 CLAUDE.md를 함께 로드하기 위해 `--add-dir` 플래그와 그에 필요한 환경 변수를 어떻게 함께 설정하는지 설명합니다. 모노레포의 인접 패키지 컨텍스트나 별도 저장소의 표준을 같은 세션에서 참조해야 할 때 활용하세요. CLI 한 줄에 디렉터리 경로를 추가하기만 하면 해당 위치의 Memory가 현재 세션의 컨텍스트에 합류합니다.

`--add-dir` 플래그를 사용하면 Claude Code가 현재 작업 디렉터리 외의 추가 디렉터리에서 CLAUDE.md 파일을 로드할 수 있습니다. 모노레포나 다중 프로젝트 설정에서 다른 디렉터리의 컨텍스트가 필요할 때 유용합니다.

이 기능을 활성화하려면 환경 변수를 설정합니다:

```bash
CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1
```

그런 다음 플래그와 함께 Claude Code를 실행합니다:

```bash
claude --add-dir /path/to/other/project
```

Claude가 현재 작업 디렉터리의 memory 파일과 함께 지정된 추가 디렉터리의 CLAUDE.md를 로드합니다.
