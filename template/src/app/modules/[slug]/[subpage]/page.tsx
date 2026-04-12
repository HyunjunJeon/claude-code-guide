import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getPageContent, getAllSlugs } from "@/lib/content";
import { createMdxComponents } from "@/components/docs/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string; subpage: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("ko");
  return slugs
    .filter((s) => s.subPageSlug)
    .map((s) => ({ slug: s.moduleSlug, subpage: s.subPageSlug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, subpage } = await params;
  const page = getPageContent(slug, subpage);
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.title} — ${page.module.title} — Claude Code Guide`,
  };
}

export default async function SubPage({ params }: PageProps) {
  const { slug, subpage } = await params;
  const page = getPageContent(slug, subpage);

  if (!page) notFound();

  const { content } = await compileMDX({
    source: page.content,
    components: createMdxComponents(slug),
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
