import type { Metadata } from "next";
import { getModuleMetadata, getModuleStaticParams, renderModulePage } from "@/lib/module-route-helpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getModuleStaticParams("ko");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return getModuleMetadata("ko", slug);
}

export default async function KoModulePage({ params }: PageProps) {
  const { slug } = await params;
  return renderModulePage("ko", slug);
}
