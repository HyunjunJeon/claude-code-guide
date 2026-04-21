# 문제 해결

이 문서는 설치나 환경 문제를 다룹니다. `API Error: 500`, `529 Overloaded`, `429`, `Prompt is too long` 같은 실행 중 API 오류는 오류 참고 문서를 보세요.

## 설치 문제

### 설치 후 `claude`를 찾지 못할 때

설치가 끝났는데 셸이 `claude`를 못 찾으면 `PATH`와 설치 위치를 확인하세요.

```bash
echo $PATH | tr ':' '\n' | grep local/bin
ls -la "$(which claude)"
```

macOS와 Linux에서는 보통 `~/.local/bin`에 설치됩니다. 빠져 있으면 셸 설정에 추가하세요.

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Windows PowerShell에서는 다음으로 확인할 수 있습니다.

```powershell
echo $Env:Path -split ';' | Select-String local\\bin
```

### WSL 설치나 Node 오류

WSL에서 OS 감지 문제나 `exec: node: not found`가 보이면 WSL이 Linux 바이너리를 쓰는지 확인하세요.

```bash
which npm
which node
```

출력이 `/mnt/c/`를 가리키면 Windows 쪽 Node를 물고 있는 것입니다. WSL 안에 Node를 다시 설치하고, 필요하면 다음처럼 다시 설치하세요.

```bash
npm config set os linux
npm install -g @anthropic-ai/claude-code --force --no-os-check
```

`sudo npm install -g`는 쓰지 마세요.

### 권한 또는 바이너리 문제

npm 설치가 끝났는데도 바이너리가 실패하면 네이티브 설치 경로를 쓰거나, 다시 설치해 보세요.

```bash
claude doctor
curl -fsSL https://claude.ai/install.sh | bash
```

macOS, Linux, WSL에서는 npm 권한이나 optional dependency 문제가 있을 때 네이티브 설치가 유용합니다.

## 인증 문제

### 로그인 실패가 반복될 때

가장 먼저 아래 순서로 재시도하세요.

```text
/logout
claude
```

그다음 다시 로그인합니다. 브라우저가 자동으로 안 열리면 프롬프트에서 `c`를 눌러 OAuth URL을 복사한 뒤 수동으로 여세요.

### OAuth 코드 오류

잘못된 코드 오류는 코드가 잘리거나 만료됐다는 뜻인 경우가 많습니다. 브라우저가 열린 직후 빨리 다시 시도하세요. 원격 SSH 세션이라면 원격 머신이 아니라 로컬 브라우저에서 URL을 여세요.

### 로그인 후 `403 Forbidden`

로그인은 됐는데 요청이 거부되면 다음을 확인하세요.

- 구독이 활성 상태인지
- Console 계정에 `Claude Code` 또는 `Developer` 역할이 있는지
- 기업용 프록시가 API 요청을 방해하지 않는지

### 토큰 만료 또는 자주 다시 로그인함

다시 `/login`을 실행하세요. 계속 반복되면 시스템 시간이 맞는지 확인하고, macOS에서는 Keychain 접근도 확인하세요.

```bash
security unlock-keychain ~/Library/Keychains/login.keychain-db
```

`claude doctor`로 자격 증명 저장 문제를 점검할 수 있습니다.

### API 키가 구독 로그인보다 우선하는 경우

유료 구독이 있는데도 다른 조직처럼 동작하면 `ANTHROPIC_API_KEY`가 쉘 프로필에 남아 있는지 확인하세요. 있으면 제거하고 `/status`로 현재 인증 방식을 확인하세요.

## 네트워크와 프록시 문제

### 설치나 업데이트 다운로드 실패

다운로드 호스트에 접근되는지 확인하세요.

```bash
curl -sI https://storage.googleapis.com
```

프록시 뒤에 있으면 Claude Code를 시작하기 전에 프록시 변수를 설정하세요.

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
```

### API 연결 문제

같은 셸에서 API 도달 여부를 확인하세요.

```bash
curl -I https://api.anthropic.com
```

Windows PowerShell에서는 alias 충돌을 피하려고 `curl.exe`를 쓰세요.

```powershell
curl.exe -I https://api.anthropic.com
```

TLS 검사 장비가 있다면 Node에 조직의 CA 번들을 지정해야 할 수 있습니다.

## 제공자와 모델 접근 문제

### 선택한 모델을 사용할 수 없음

모델이 없거나 접근 권한이 없다는 메시지가 보이면 다음 순서로 확인하세요.

1. `--model` 플래그
2. `ANTHROPIC_MODEL` 환경 변수
3. 설정 파일

사용 가능한 모델을 고르려면 `/model`을 사용하고, 가능하면 버전 고정 ID 대신 `sonnet`이나 `opus` 같은 별칭을 쓰세요.

### Pro 플랜에 없는 모델

Opus 같은 모델이 플랜에 포함되지 않으면 `/model`로 지원 모델을 고르세요. 최근 업그레이드했다면 `/logout` 후 `/login`을 다시 해서 권한을 새로 받아오세요.

### 구독이 있는데도 조직 비활성화 메시지가 뜰 때

대부분 오래된 `ANTHROPIC_API_KEY`가 구독 로그인보다 우선해서 생깁니다. 현재 셸과 셸 프로필에서 해당 변수를 제거하고 다시 실행하세요.

## 품질과 검색 문제

### 출력 품질이 갑자기 나빠진 것 같을 때

다음 순서로 확인하세요.

- `/model`로 모델이 맞는지 확인
- `/effort`로 reasoning level 확인
- `/context`로 세션이 너무 꽉 찼는지 확인
- `/compact` 또는 `/clear`로 오래된 컨텍스트 정리
- 잘못된 턴이 끼어 있으면 `/rewind`

큰 `CLAUDE.md`, 사용하지 않는 MCP 서버, 오래된 지시문도 품질을 떨어뜨릴 수 있습니다.

### 검색이나 `@file`이 불안정할 때

시스템 `ripgrep`을 설치하고 필요하면 번들 버전을 끄세요.

```bash
brew install ripgrep
winget install BurntSushi.ripgrep.MSVC
sudo apt install ripgrep
```

그다음:

```bash
export USE_BUILTIN_RIPGREP=0
```

### 마크다운 생성 문제

코드 펜스 언어 태그가 빠지거나 간격이 이상하면 파일을 직접 수정하게 하거나 포맷팅 훅을 추가하세요. 범위를 좁혀 다시 요청한 뒤 렌더링 결과를 확인하는 것도 좋습니다.

## 언제 상향 보고할지

`/doctor`로 설치 유형, 설정, MCP 구성, 키바인딩, 기타 로컬 문제를 점검할 수 있습니다. 제품 버그처럼 보이면 `/feedback`을 사용하세요. 지역 제한이나 서비스 장애가 의심되면 `status.claude.com`을 확인하세요.

## 공식 출처

- https://code.claude.com/docs/ko/troubleshooting
- https://code.claude.com/docs/ko/getting-started
- https://code.claude.com/docs/ko/settings
- https://code.claude.com/docs/ko/mcp
- https://code.claude.com/docs/ko/permissions
