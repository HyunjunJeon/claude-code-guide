import { LocaleLayoutShell } from "@/components/locale-layout-shell";

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayoutShell lang="ko">{children}</LocaleLayoutShell>;
}
