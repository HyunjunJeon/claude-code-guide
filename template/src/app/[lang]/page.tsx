import { HeroSection } from "@/components/section/hero-section";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  return <HeroSection lang={lang === "en" ? "en" : "ko"} />;
}
