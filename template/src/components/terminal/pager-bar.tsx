"use client";

interface PagerBarProps {
  current: number;
  total: number;
  scrollPct?: number;
  isTreeView?: boolean;
}

export function PagerBar({ current, total, scrollPct, isTreeView }: PagerBarProps) {
  if (total === 0) return null;

  // Use scrollPct if available (scroll-driven), otherwise fall back to section-based
  const pct = scrollPct ?? Math.round((current / total) * 100);
  const filled = Math.round(pct / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);

  return (
    <div data-testid="pager-bar" className="flex items-center justify-between px-4 py-1.5 bg-[#1A1A1A] border-t border-[#333] font-mono text-[0.7rem] shrink-0">
      <span className="text-[#22C55E]">
        :({pct}%) {bar}
      </span>
      <span className="text-[#555]">
        {isTreeView
          ? "목차 보기 — 클릭하여 이동 | Space 계속"
          : current < total
            ? "Space 다음 섹션 | /tree 목차 | /all 전체"
            : "— END —"}
      </span>
    </div>
  );
}
