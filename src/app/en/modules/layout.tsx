import { ModulesLayoutShell } from "@/components/modules-layout-shell";

export default function EnModulesLayout({ children }: { children: React.ReactNode }) {
  return <ModulesLayoutShell lang="en">{children}</ModulesLayoutShell>;
}
