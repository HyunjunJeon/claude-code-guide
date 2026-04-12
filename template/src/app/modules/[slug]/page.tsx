import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getPageContent, getModules } from "@/lib/content";
import { createMdxComponents } from "@/components/docs/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const modules = getModules("ko");
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageContent(slug);
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.title} — Claude Code Guide`,
    description: page.module.description,
  };
}

export default async function ModulePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageContent(slug);

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
    <article className="doc-content" data-module={slug}>
      {content}
    </article>
  );
}
