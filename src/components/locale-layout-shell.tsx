import { Navbar } from "@/components/section/navbar";

type Lang = "en" | "ko";

const SKIP_LABELS: Record<Lang, string> = {
  ko: "본문으로 건너뛰기",
  en: "Skip to content",
};

export function LocaleLayoutShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#22C55E] focus:text-[#0F0F0F] focus:font-mono focus:text-sm focus:rounded"
      >
        {SKIP_LABELS[lang]}
      </a>
      <Navbar lang={lang} />
      {children}
    </>
  );
}
