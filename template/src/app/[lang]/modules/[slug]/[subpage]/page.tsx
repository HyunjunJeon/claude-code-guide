import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getPageContent, getAllSlugs } from "@/lib/content";
import { createMdxComponents } from "@/components/docs/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { notFound } from "next/navigation";

type Lang = "en" | "ko";

interface PageProps {
  params: Promise<{ lang: string; slug: string; subpage: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { lang: string; slug: string; subpage: string }[] = [];
  for (const lang of ["en", "ko"] as Lang[]) {
    const slugs = getAllSlugs(lang);
    for (const s of slugs) {
      if (s.subPageSlug) {
        params.push({ lang, slug: s.moduleSlug, subpage: s.subPageSlug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang: rawLang, slug, subpage } = await params;
  const lang = (rawLang === "en" ? "en" : "ko") as Lang;
  const page = getPageContent(slug, subpage, lang);
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.title} — ${page.module.title} — Claude Code Guide`,
  };
}

export default async function SubPage({ params }: PageProps) {
  const { lang: rawLang, slug, subpage } = await params;
  const lang = (rawLang === "en" ? "en" : "ko") as Lang;
  const page = getPageContent(slug, subpage, lang);

  if (!page) notFound();

  const { content } = await compileMDX({
    source: page.content,
    components: createMdxComponents(slug, lang),
    options: {
      mdxOptions: {
        format: "md",
        remarkPlugins: [...mdxOptions.remarkPlugins],
        rehypePlugins: [...mdxOptions.rehypePlugins] as never[],
      },
    },
  });

  return (
    <article className="doc-content" data-module={slug} data-subpage={subpage}>
      {content}
    </article>
  );
}
