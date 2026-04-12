"use client";

interface Section {
  id: string;
  title: string;
  element: HTMLElement;
}

interface TreeViewProps {
  sections: Section[];
  visibleCount: number;
  onSelect: (idx: number) => void;
}

export function TreeView({ sections, visibleCount, onSelect }: TreeViewProps) {
  return (
    <div className="py-2">
      {sections.map((sec, idx) => (
        <button
          key={sec.id}
          onClick={() => onSelect(idx)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-left font-mono text-sm transition-colors hover:bg-[rgba(34,197,94,0.08)] group"
          style={{
            opacity: 0,
            transform: "translateX(-10px)",
            animation: `treeReveal 0.2s ease ${idx * 40}ms forwards`,
          }}
        >
          <span className="text-[#22C55E] text-xs w-4 text-center group-hover:text-[#4ADE80]">
            {idx < visibleCount ? "✓" : "▶"}
          </span>
          <span className="text-[#555] text-xs w-6">{idx + 1}.</span>
          <span
            className={`${
              idx < visibleCount ? "text-[#888]" : "text-[#D8D8D8]"
            } group-hover:text-[#22C55E] transition-colors`}
          >
            {sec.title}
          </span>
        </button>
      ))}

      <style jsx>{`
        @keyframes treeReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
