# 설치 안내

이 문서는 마켓플레이스, 로컬 경로, GitHub에서 plugin을 설치하고 목록 조회·업데이트·비활성화·제거하는 슬래시 커맨드를 단계별 안내로 정리합니다. 일상적인 plugin 운영 작업을 빠르게 찾고 싶을 때 참고하세요. 각 항목은 한 줄짜리 명령과 짧은 설명으로 구성되어 즉시 복붙해 사용할 수 있습니다.

## 마켓플레이스에서 설치

1. **사용 가능한 plugin 탐색:**

   ```bash
   /plugin list
   ```

2. **plugin 세부정보 보기:**

   ```bash
   /plugin info plugin-name
   ```

3. **plugin 설치:**

   ```bash
   /plugin install plugin-name
   ```

## 로컬 경로에서 설치

```bash
/plugin install ./path/to/plugin-directory
```

## GitHub에서 설치

```bash
/plugin install github:username/repo
```

## 설치된 Plugin 목록 보기

```bash
/plugin list --installed
```

## Plugin 업데이트

```bash
/plugin update plugin-name
```

## Plugin 비활성화/활성화

```bash
# Temporarily disable
/plugin disable plugin-name

# Re-enable
/plugin enable plugin-name
```

## Plugin 제거

```bash
/plugin remove plugin-name
```
