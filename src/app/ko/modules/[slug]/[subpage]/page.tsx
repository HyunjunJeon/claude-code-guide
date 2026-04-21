import type { Metadata } from "next";
import { getSubpageMetadata, getSubpageStaticParams, renderSubpagePage } from "@/lib/module-route-helpers";

interface PageProps {
  params: Promise<{ slug: string; subpage: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getSubpageStaticParams("ko");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, subpage } = await params;
  return getSubpageMetadata("ko", slug, subpage);
}

export default async function KoSubpage({ params }: PageProps) {
  const { slug, subpage } = await params;
  return renderSubpagePage("ko", slug, subpage);
}
