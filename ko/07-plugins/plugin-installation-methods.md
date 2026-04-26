# 설치 방법

이 문서는 plugin을 설치하는 모든 경로(마켓플레이스, 로컬 디렉토리, GitHub 저장소)와 활성화/비활성화 명령을 한곳에 모았습니다. 어떤 환경에서 어떤 명령을 사용할지 빠르게 찾을 때 참고하세요. 로컬 개발용 `--plugin-dir` 플래그는 게시 전 테스트에서 특히 유용합니다.

## 마켓플레이스에서 설치

```bash
# CLI에서 설치 (정식 명령어):
claude plugin install plugin-name@marketplace-name
```

## 활성화 / 비활성화 (자동 감지된 범위로)

```bash
/plugin enable plugin-name
/plugin disable plugin-name
```

## 로컬 Plugin (개발용)

```bash
# CLI flag for local testing (repeatable for multiple plugins)
claude --plugin-dir ./path/to/plugin
claude --plugin-dir ./plugin-a --plugin-dir ./plugin-b
```

## Git 저장소에서 설치

```bash
/plugin install github:username/repo
```
