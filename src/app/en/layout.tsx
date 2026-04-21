import { LocaleLayoutShell } from "@/components/locale-layout-shell";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayoutShell lang="en">{children}</LocaleLayoutShell>;
}
