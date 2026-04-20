import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-lg border border-[#333] bg-[#0A0A0A] overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border-b border-[#333]">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="flex-1 text-center text-xs text-[#555] font-mono">
            error
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono">
          <div className="flex items-center gap-1.5 mb-4 text-sm">
            <span className="text-[#22C55E] font-semibold">user</span>
            <span className="text-[#555]">@</span>
            <span className="text-[#22D3EE] font-semibold">claude-code</span>
            <span className="text-[#555]">:</span>
            <span className="text-[#60A5FA]">~</span>
            <span className="text-[#888]">$</span>
            <span className="text-[#D8D8D8] ml-1">cat page.md</span>
          </div>

          <div className="text-[#FF5F56] text-sm mb-2">
            Error 404: page not found
          </div>
          <div className="text-[#888] text-xs mb-6">
            요청한 페이지가 존재하지 않습니다.
          </div>

          <div className="flex items-center gap-1.5 text-sm mb-2">
            <span className="text-[#888]">$</span>
            <span className="text-[#D8D8D8]">
              Available commands:
            </span>
          </div>
          <div className="space-y-1 text-xs ml-4 mb-6">
            <div>
              <Link href="/" className="text-[#22C55E] hover:text-[#4ADE80]">
                /home
              </Link>
              <span className="text-[#555]"> — 홈으로 돌아가기</span>
            </div>
            <div>
              <Link
                href="/modules/01-slash-commands"
                className="text-[#22C55E] hover:text-[#4ADE80]"
              >
                /01
              </Link>
              <span className="text-[#555]"> — 첫 번째 모듈부터 시작</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
