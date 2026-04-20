import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getPageContent, getModules } from "@/lib/content";
import { createMdxComponents } from "@/components/docs/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { notFound } from "next/navigation";

type Lang = "en" | "ko";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ["en", "ko"] as Lang[]) {
    const modules = getModules(lang);
    for (const m of modules) {
      params.push({ lang, slug: m.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = (rawLang === "en" ? "en" : "ko") as Lang;
  const page = getPageContent(slug, undefined, lang);
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.title} — Claude Code Guide`,
    description: page.module.description,
  };
}

export default async function ModulePage({ params }: PageProps) {
  const { lang: rawLang, slug } = await params;
  const lang = (rawLang === "en" ? "en" : "ko") as Lang;
  const page = getPageContent(slug, undefined, lang);

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
    <article className="doc-content" data-module={slug}>
      {content}
    </article>
  );
}
