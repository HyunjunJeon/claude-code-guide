"use client";

import Link from "next/link";
import { MermaidDiagram } from "@/components/docs/mermaid-diagram";
import { siteConfig } from "@/lib/config";

type Lang = "en" | "ko";

const DIAGRAM_BEGINNER = `graph LR
  A["<b>01 Slash Commands</b><br/>사용자 명령어 단축키<br/><i>mkdir .claude/commands/</i>"]
  B["<b>02 Memory</b><br/>세션 간 컨텍스트 유지<br/><i>CLAUDE.md 파일 작성</i>"]
  C["<b>10 CLI Reference</b><br/>터미널 명령어 레퍼런스<br/><i>claude -p, --output-format</i>"]

  A -->|"명령어 학습 후"| B
  A -->|"CLI로 확장"| C

  style A fill:#0a1f0a,stroke:#22C55E,stroke-width:2px,color:#D8D8D8
  style B fill:#0a1f0a,stroke:#22C55E,stroke-width:2px,color:#D8D8D8
  style C fill:#0a1f0a,stroke:#22C55E,stroke-width:2px,color:#D8D8D8
`;

const DIAGRAM_CORE = `graph LR
  D["<b>03 Skills</b><br/>재사용 가능한 자동화<br/><i>SKILL.md + 스크립트 번들</i>"]
  E["<b>06 Hooks</b><br/>이벤트 기반 자동화<br/><i>PreToolUse, PostToolUse 등</i>"]
  F["<b>08 Checkpoints</b><br/>세션 저장 및 되감기<br/><i>Esc×2로 rewind</i>"]

  D -->|"자동화 확장"| E
  D -->|"안전한 실험"| F

  style D fill:#0a0f1f,stroke:#60A5FA,stroke-width:2px,color:#D8D8D8
  style E fill:#0a0f1f,stroke:#60A5FA,stroke-width:2px,color:#D8D8D8
  style F fill:#0a0f1f,stroke:#60A5FA,stroke-width:2px,color:#D8D8D8
`;

const DIAGRAM_ADVANCED = `graph LR
  G["<b>04 Subagents</b><br/>전문 AI 어시스턴트 위임<br/><i>코드리뷰, 보안감사, 테스트</i>"]
  H["<b>05 MCP</b><br/>외부 도구 연결<br/><i>GitHub, DB, API 서버</i>"]
  I["<b>07 Plugins</b><br/>기능 번들 패키지<br/><i>명령어+에이전트+훅 통합</i>"]
  J["<b>09 Advanced</b><br/>고급 기능<br/><i>Plan모드, 백그라운드, 권한</i>"]
  K["<b>11 Deployment</b><br/>배포와 관리<br/><i>Bedrock, Vertex, 정책</i>"]
  L["<b>12 Agent SDK</b><br/>SDK 기반 에이전트 개발<br/><i>세션, 도구, 스트리밍</i>"]

  G -->|"외부 연동"| H
  H -->|"패키지화"| I
  G -->|"워크플로 최적화"| J
  J -->|"운영 환경 확장"| K
  G -->|"커스텀 에이전트 구축"| L

  style G fill:#1a0a2e,stroke:#A78BFA,stroke-width:2px,color:#D8D8D8
  style H fill:#1a0a2e,stroke:#A78BFA,stroke-width:2px,color:#D8D8D8
  style I fill:#1a0a2e,stroke:#A78BFA,stroke-width:2px,color:#D8D8D8
  style J fill:#1a0a2e,stroke:#A78BFA,stroke-width:2px,color:#D8D8D8
  style K fill:#1a0a2e,stroke:#A78BFA,stroke-width:2px,color:#D8D8D8
  style L fill:#1a0a2e,stroke:#A78BFA,stroke-width:2px,color:#D8D8D8
`;

const FEATURE_TABLE = [
  { num: "01", name: "Slash Commands", invoke: "수동 (/cmd)", persist: "세션", best: "빠른 단축키, 반복 작업 자동화" },
  { num: "02", name: "Memory", invoke: "자동 로딩", persist: "영구", best: "프로젝트 표준, 개인 설정 유지" },
  { num: "03", name: "Skills", invoke: "자동 감지", persist: "파일시스템", best: "재사용 가능한 워크플로 자동화" },
  { num: "04", name: "Subagents", invoke: "자동 위임", persist: "격리된 컨텍스트", best: "코드 리뷰, 테스트, 보안 감사" },
  { num: "05", name: "MCP", invoke: "자동 쿼리", persist: "실시간", best: "GitHub, DB, 외부 API 연동" },
  { num: "06", name: "Hooks", invoke: "이벤트 트리거", persist: "설정 파일", best: "자동 포맷팅, 보안 스캔, 알림" },
  { num: "07", name: "Plugins", invoke: "설치 명령", persist: "모든 기능", best: "PR 리뷰, DevOps 등 완전한 솔루션" },
  { num: "08", name: "Checkpoints", invoke: "자동/수동", persist: "세션 기반", best: "안전한 실험, 접근법 비교" },
  { num: "09", name: "Advanced", invoke: "다양", persist: "다양", best: "플래닝 모드, 백그라운드 작업" },
  { num: "10", name: "CLI Reference", invoke: "터미널 명령", persist: "스크립트", best: "CI/CD 통합, 배치 처리" },
  { num: "11", name: "Deployment & Admin", invoke: "환경 설정", persist: "조직 정책", best: "공급자 설정, 네트워크, 관리 정책" },
  { num: "12", name: "Agent SDK", invoke: "코드 작성", persist: "라이브러리", best: "커스텀 에이전트, 세션, 스트리밍" },
];

export function ModulesIndex({ lang }: { lang: Lang }) {
  return (
    <article className="doc-content">
      <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#E8E8E8] mb-2">
        Claude Code 기능 개요
      </h1>
      <p className="text-sm text-[#888] font-mono mb-8">
        12개 주요 기능 영역의 학습 경로와 비교 — 기초부터 운영과 SDK까지 단계별로 학습하세요.
      </p>

      <h2 className="text-lg font-bold font-mono text-[#D8D8D8] mb-3" id="learning-path">
        학습 경로
      </h2>
      <p className="text-xs text-[#888] font-mono mb-6">
        기초 → 핵심 → 고급 순서로 진행하세요. 각 단계의 모듈과 관계를 확인할 수 있습니다.
      </p>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
          <span className="font-mono text-sm font-semibold text-[#22C55E]">기초</span>
          <span className="font-mono text-xs text-[#555]">— 30분~1시간 | Claude Code 첫 사용자</span>
        </div>
        <MermaidDiagram chart={DIAGRAM_BEGINNER} fontSize={18} fullWidth />
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-[#60A5FA]" />
          <span className="font-mono text-sm font-semibold text-[#60A5FA]">핵심</span>
          <span className="font-mono text-xs text-[#555]">— 2~3시간 | CLAUDE.md 사용 경험자</span>
        </div>
        <MermaidDiagram chart={DIAGRAM_CORE} fontSize={18} fullWidth />
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-[#A78BFA]" />
          <span className="font-mono text-sm font-semibold text-[#A78BFA]">고급</span>
          <span className="font-mono text-xs text-[#555]">— 5시간+ | MCP/Hooks 설정 경험자</span>
        </div>
        <MermaidDiagram chart={DIAGRAM_ADVANCED} fontSize={18} fullWidth />
      </div>

      <h2 className="text-lg font-bold font-mono text-[#D8D8D8] mt-10 mb-3" id="feature-comparison">
        기능 비교
      </h2>
      <div className="overflow-x-auto rounded-lg border border-[#333]">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="bg-[#1A1A1A] border-b border-[#333]">
              <th className="px-3 py-2.5 text-left text-[#22C55E] font-semibold">#</th>
              <th className="px-3 py-2.5 text-left text-[#22C55E] font-semibold">기능</th>
              <th className="px-3 py-2.5 text-left text-[#22C55E] font-semibold">호출 방식</th>
              <th className="px-3 py-2.5 text-left text-[#22C55E] font-semibold">지속성</th>
              <th className="px-3 py-2.5 text-left text-[#22C55E] font-semibold">주요 활용</th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_TABLE.map((row, idx) => (
              <tr
                key={row.num}
                className={`border-b border-[#333] hover:bg-[rgba(34,197,94,0.05)] transition-colors ${
                  idx % 2 === 0 ? "bg-[#0F0F0F]" : "bg-[#141414]"
                }`}
              >
                <td className="px-3 py-2.5 text-[#555]">{row.num}</td>
                <td className="px-3 py-2.5">
                  <Link
                    href={`/${lang}/modules/${siteConfig.modules[idx]?.slug || ""}`}
                    className="text-[#60A5FA] hover:text-[#22C55E] transition-colors"
                  >
                    {row.name}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-[#888]">{row.invoke}</td>
                <td className="px-3 py-2.5 text-[#888]">{row.persist}</td>
                <td className="px-3 py-2.5 text-[#888]">{row.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 p-4 rounded-lg border border-[#333] bg-[#1A1A1A]">
        <p className="text-sm font-mono text-[#D8D8D8] mb-2">어디서부터 시작할지 모르겠다면?</p>
        <p className="text-xs font-mono text-[#888]">
          <Link href={`/${lang}/modules/01-slash-commands`} className="text-[#22C55E] hover:text-[#4ADE80] transition-colors">
            01 Slash Commands
          </Link>
          {" "}부터 시작하세요. 15분이면 첫 번째 명령어를 만들 수 있습니다.
        </p>
      </div>
    </article>
  );
}
