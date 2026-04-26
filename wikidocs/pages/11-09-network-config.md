이 문서는 Claude Code가 기업 네트워크에서 기대하는 설정을 정리합니다. 프록시 라우팅, 외부 허용 목록, TLS 신뢰, 커스텀 인증서, 그리고 실제로 동작하는지 확인하는 방법까지 포함합니다.

## 접근해야 하는 대상

최소한 다음 대상은 접근 가능해야 합니다.

- `api.anthropic.com`: Claude API
- `claude.ai`: Claude.ai 계정 인증
- `platform.claude.com`: Claude Console 계정 인증

설치나 사용 방식에 따라 추가로 필요할 수 있습니다.

- `storage.googleapis.com`: 네이티브 설치 프로그램과 자동 업데이트
- `downloads.claude.ai`: 설치 스크립트, 버전 포인터, 매니페스트, 서명 키, 플러그인 다운로드
- `bridge.claudeusercontent.com`: Chrome 통합용 WebSocket 브리지

Claude Code on the web 또는 Code Review를 GitHub Enterprise Cloud와 함께 쓴다면, GitHub IP allow list 상속 관련 동작도 고려해야 합니다.

## 프록시 설정

Claude Code는 표준 프록시 환경 변수를 따릅니다.

```bash
export HTTPS_PROXY=https://proxy.example.com:8080
export HTTP_PROXY=http://proxy.example.com:8080
export NO_PROXY="localhost 192.168.1.1 example.com .example.com"
```

가능하면 `HTTPS_PROXY` 를 우선 사용하세요. `NO_PROXY` 는 공백 또는 쉼표로 구분할 수 있고, `*` 는 모든 프록시를 우회합니다. Claude Code는 SOCKS 프록시를 지원하지 않습니다.

프록시가 기본 인증을 요구하면 URL 안에 자격 증명을 넣을 수 있습니다.

```bash
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

NTLM, Kerberos 같은 고급 인증이 필요하면 해당 인증 방식을 지원하는 LLM 게이트웨이를 쓰는 편이 낫습니다.

## TLS 와 인증서

기본적으로 Claude Code는 번들된 Mozilla CA 세트와 OS 신뢰 저장소를 둘 다 신뢰합니다. 엔터프라이즈 TLS 검사 프록시가 있다면, 운영체제 신뢰 저장소에 사내 루트 인증서를 넣는 것만으로 충분한 경우가 많습니다.

유용한 설정은 다음과 같습니다.

```bash
export CLAUDE_CODE_CERT_STORE=bundled
export CLAUDE_CODE_CERT_STORE=system
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

주의할 점:

- `CLAUDE_CODE_CERT_STORE` 는 환경 변수나 `settings.json` 의 `env` 블록에서 설정할 수 있습니다.
- Node.js 런타임에서는 커스텀 CA를 직접 신뢰시키려면 `NODE_EXTRA_CA_CERTS` 를 사용합니다.
- 클라이언트 인증서가 필요하면 `CLAUDE_CODE_CLIENT_CERT`, `CLAUDE_CODE_CLIENT_KEY`, `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` 로 mTLS를 구성할 수 있습니다.

## 확인 명령

먼저 환경 변수를 확인합니다.

```bash
env | grep -E 'HTTP_PROXY|HTTPS_PROXY|NO_PROXY|CLAUDE_CODE_CERT_STORE|NODE_EXTRA_CA_CERTS|CLAUDE_CODE_CLIENT_CERT|CLAUDE_CODE_CLIENT_KEY'
```

기본 엔드포인트에 직접 연결되는지 확인합니다.

```bash
curl -I https://api.anthropic.com
```

프록시 경유를 시험하려면:

```bash
HTTPS_PROXY=https://proxy.example.com:8080 curl -I https://api.anthropic.com
```

인증서 체인을 확인해야 하면 `openssl s_client` 로 같은 호스트를 점검하고, 사내 신뢰 저장소와 비교하세요.

Claude Code 안에서는 다음을 실행합니다.

```plaintext
/status
```

이 명령은 현재 활성 인증과 관리형 설정 소스를 보여주므로, 기대한 네트워크 경로를 실제로 쓰고 있는지 확인하는 데 유용합니다.

## 문제 해결

- 로그인 화면은 뜨는데 끝까지 완료되지 않으면, 먼저 프록시 인증과 TLS 검사 설정을 확인하세요.
- 업데이트나 플러그인이 실패하면 `storage.googleapis.com` 과 `downloads.claude.ai` 를 점검하세요.
- Claude.ai 로그인이 제한망에서 실패하면 `claude.ai` 와 `platform.claude.com` 이 허용 목록에 있는지 확인하세요.
- 특정 셸에서만 실패하면, 셸별로 상속되는 환경 변수를 비교하세요.

## 공식 문서 링크

- [기업 네트워크 구성](https://code.claude.com/docs/ko/network-config)
- [인증](https://code.claude.com/docs/ko/authentication)
- [Claude Code 설정](https://code.claude.com/docs/ko/settings)
