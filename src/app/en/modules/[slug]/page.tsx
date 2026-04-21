import type { Metadata } from "next";
import { getModuleMetadata, getModuleStaticParams, renderModulePage } from "@/lib/module-route-helpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getModuleStaticParams("en");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return getModuleMetadata("en", slug);
}

export default async function EnModulePage({ params }: PageProps) {
  const { slug } = await params;
  return renderModulePage("en", slug);
}
