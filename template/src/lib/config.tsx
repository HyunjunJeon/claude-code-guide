import { cn } from "@/lib/utils";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-[#22C55E] to-[#22D3EE] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
};

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Claude Code Guide",
  description:
    "Claude Code의 모든 기능을 마스터하기 위한 실전 가이드. 터미널에서 배우는 AI 코딩의 미래.",
  cta: "시작하기",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "Claude Code",
    "AI Coding",
    "Tutorial",
    "Developer Guide",
    "Slash Commands",
    "MCP",
  ],
  links: {
    github: "https://github.com/HyunjunJeon/claude-code-guide-book",
  },
  nav: {
    links: [
      { id: 1, name: "학습 시작", href: "/modules" },
      { id: 2, name: "고급 기능", href: "/modules/09-advanced-features" },
      { id: 3, name: "CLI 레퍼런스", href: "/modules/10-cli" },
    ],
  },
  hero: {
    badge: "Claude Code Guide",
    title: "터미널로 시작하는",
    titleHighlight: "Claude Code 가이드북.",
    description:
      "Slash Commands부터 MCP, Hooks, Plugins까지 —\nClaude Code의 핵심 기능을 단계별로 학습합니다.",
    cta: {
      primary: {
        text: "학습 시작",
        href: "/modules",
      },
      secondary: {
        text: "GitHub",
        href: "https://github.com/HyunjunJeon/claude-code-guide-book",
      },
    },
    terminalCommand: "claude --list-modules",
  },
  modules: [
    {
      number: "01",
      slug: "01-slash-commands",
      title: "슬래시 명령어",
      description: "55+ 내장 명령어와 커스텀 스킬로 워크플로우 자동화",
      icon: "terminal",
    },
    {
      number: "02",
      slug: "02-memory",
      title: "메모리 시스템",
      description: "CLAUDE.md 계층 구조로 프로젝트 컨텍스트 영속화",
      icon: "brain",
    },
    {
      number: "03",
      slug: "03-skills",
      title: "스킬",
      description: "재사용 가능한 자동 실행 능력 정의 및 공유",
      icon: "sparkles",
    },
    {
      number: "04",
      slug: "04-subagents",
      title: "서브에이전트",
      description: "전문화된 에이전트 위임으로 병렬 작업 수행",
      icon: "users",
    },
    {
      number: "05",
      slug: "05-mcp",
      title: "MCP",
      description: "Model Context Protocol로 외부 도구 및 데이터 통합",
      icon: "plug",
    },
    {
      number: "06",
      slug: "06-hooks",
      title: "훅 시스템",
      description: "26가지 이벤트로 도구 실행 전후 자동화",
      icon: "webhook",
    },
    {
      number: "07",
      slug: "07-plugins",
      title: "플러그인",
      description: "스킬 + MCP + 훅을 하나의 패키지로 번들링",
      icon: "package",
    },
    {
      number: "08",
      slug: "08-checkpoints",
      title: "체크포인트",
      description: "세션 스냅샷과 되돌리기로 안전한 실험",
      icon: "save",
    },
    {
      number: "09",
      slug: "09-advanced-features",
      title: "고급 기능",
      description: "플래닝 모드, 권한, 백그라운드 에이전트",
      icon: "settings",
    },
    {
      number: "10",
      slug: "10-cli",
      title: "CLI 레퍼런스",
      description: "커맨드라인 옵션과 설정 완전 가이드",
      icon: "code",
    },
  ],
  footer: {
    copyright: "Claude Code Guide",
    links: [
      { name: "GitHub", href: "https://github.com/HyunjunJeon/claude-code-guide-book" },
      { name: "License", href: "https://github.com/HyunjunJeon/claude-code-guide-book/blob/main/LICENSE" },
    ],
  },
};
