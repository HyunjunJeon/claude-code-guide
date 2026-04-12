"use client";

interface PromptLineProps {
  path?: string;
}

export function PromptLine({ path = "~" }: PromptLineProps) {
  const displayPath = path.startsWith("/modules/")
    ? `~/${path.replace("/modules/", "")}`
    : path === "~"
      ? "~"
      : `~${path}`;

  return (
    <div className="font-mono text-sm mb-4 flex items-center flex-wrap gap-0">
      <span className="text-[#22C55E] font-semibold">user</span>
      <span className="text-[#555]">@</span>
      <span className="text-[#22D3EE] font-semibold">claude-code</span>
      <span className="text-[#555]">:</span>
      <span className="text-[#60A5FA]">{displayPath}</span>
      <span className="text-[#888] mx-1">$</span>
      <span className="text-[#D8D8D8]">cat README.md</span>
      <span className="w-2 h-4 bg-[#22C55E] ml-0.5 animate-[blink_0.8s_step-end_infinite] inline-block" />
    </div>
  );
}
