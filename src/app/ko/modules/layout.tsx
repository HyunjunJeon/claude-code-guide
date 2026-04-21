import { ModulesLayoutShell } from "@/components/modules-layout-shell";

export default function KoModulesLayout({ children }: { children: React.ReactNode }) {
  return <ModulesLayoutShell lang="ko">{children}</ModulesLayoutShell>;
}
