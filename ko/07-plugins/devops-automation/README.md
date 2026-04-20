
# DevOps Automation Plugin

배포, 모니터링, 인시던트 대응을 위한 완전한 DevOps 자동화입니다.

## 기능

✅ 자동화된 배포
✅ 롤백 절차
✅ 시스템 상태 모니터링
✅ 인시던트 대응 워크플로우
✅ Kubernetes 통합

## 설치

```bash
/plugin install devops-automation
```

## 포함 항목

### Slash Commands
- `/deploy` - 프로덕션 또는 스테이징에 배포
- `/rollback` - 이전 버전으로 롤백
- `/status` - 시스템 상태 확인
- `/incident` - 프로덕션 인시던트 처리

### Subagents
- `deployment-specialist` - 배포 운영
- `incident-commander` - 인시던트 조율
- `alert-analyzer` - 시스템 상태 분석

### MCP 서버
- Kubernetes 통합

### 스크립트
- `deploy.sh` - 배포 자동화
- `rollback.sh` - 롤백 자동화
- `health-check.sh` - 상태 확인 유틸리티

### Hooks
- `pre-deploy.js` - 배포 전 검증
- `post-deploy.js` - 배포 후 작업

## 사용법

### 스테이징에 배포
```
/deploy staging
```

### 프로덕션에 배포
```
/deploy production
```

### 롤백
```
/rollback production
```

### 상태 확인
```
/status
```

### 인시던트 처리
```
/incident
```

## 요구사항

- Claude Code 1.0+
- Kubernetes CLI (kubectl)
- 클러스터 접근 설정 완료

## 설정

Kubernetes 설정을 구성합니다:
```bash
export KUBECONFIG=~/.kube/config
```

## 예제 워크플로우

```
User: /deploy production

Claude:
1. Runs pre-deploy hook (validates kubectl, cluster connection)
2. Delegates to deployment-specialist subagent
3. Runs deploy.sh script
4. Monitors deployment progress via Kubernetes MCP
5. Runs post-deploy hook (waits for pods, smoke tests)
6. Provides deployment summary

Result:
✅ Deployment complete
📦 Version: v2.1.0
🚀 Pods: 3/3 ready
⏱️  Time: 2m 34s
```
