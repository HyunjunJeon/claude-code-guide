import { Navbar } from "@/components/section/navbar";

export function LocaleLayoutShell({
  children,
}: {
  lang: "ko";
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#22C55E] focus:text-[#0F0F0F] focus:font-mono focus:text-sm focus:rounded"
      >
        본문으로 건너뛰기
      </a>
      <Navbar lang="ko" />
      {children}
    </>
  );
}
