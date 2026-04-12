import { getModules } from "@/lib/content";
import { TerminalContent } from "@/components/terminal/terminal-content";

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const modules = getModules("ko");

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Terminal Shell */}
      <div className="mx-auto max-w-7xl border border-[#333] rounded-xl overflow-hidden shadow-2xl mt-4 mb-8 lg:mx-4 xl:mx-auto">
        {/* Terminal Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1A1A1A] border-b border-[#333] select-none sticky top-0 z-20">
          {/* Traffic light dots */}
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 flex items-center justify-between ml-2">
            <span className="font-mono text-xs text-[#888]">
              claude-code-guide
            </span>
            <span className="font-mono text-[0.65rem] text-[#555] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse" />
              online
            </span>
          </div>
        </div>

        {/* Content area with sidebar */}
        <div className="flex" style={{ height: "calc(100vh - 52px)" }}>
          {/* Sidebar — module navigation */}
          <aside className="hidden lg:block w-60 border-r border-[#333] bg-[#0F0F0F] overflow-y-auto shrink-0">
            <div className="p-4">
              <div className="font-mono text-[0.65rem] uppercase tracking-widest text-[#555] mb-4">
                Modules
              </div>
              <nav className="space-y-0.5">
                {modules.map((mod) => (
                  <a
                    key={mod.slug}
                    href={`/modules/${mod.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-mono text-[#888] hover:text-[#22C55E] hover:bg-[rgba(34,197,94,0.08)] transition-colors"
                  >
                    <span className="text-[#555] text-xs w-5">
                      {mod.number}
                    </span>
                    <span className="truncate text-xs">{mod.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content with terminal interaction */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <TerminalContent>
              {children}
            </TerminalContent>
          </main>
        </div>
      </div>
    </div>
  );
}
