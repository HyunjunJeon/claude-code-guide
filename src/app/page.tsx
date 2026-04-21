import type { Metadata } from "next";
import { RootRedirect } from "@/components/root-redirect";

export const metadata: Metadata = {
  title: "Redirecting — Claude Code Guide",
};

export default function HomeRedirectPage() {
  return <RootRedirect />;
}
