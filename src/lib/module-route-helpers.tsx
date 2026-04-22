import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllSlugs, getModules, getPageContent } from "@/lib/content";
import { createMdxComponents } from "@/components/docs/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";

export type Lang = "ko";

export function getModuleStaticParams(lang: Lang) {
  return getModules(lang).map((module) => ({ slug: module.slug }));
}

export function getSubpageStaticParams(lang: Lang) {
  return getAllSlugs(lang)
    .filter((slug) => slug.subPageSlug)
    .map((slug) => ({
      slug: slug.moduleSlug,
      subpage: slug.subPageSlug as string,
    }));
}

export function getModuleMetadata(lang: Lang, slug: string): Metadata {
  const page = getPageContent(slug, undefined, lang);
  if (!page) return { title: "Not Found" };

  return {
    title: `${page.title} — Claude Code Guide`,
    description: page.module.description,
  };
}

export function getSubpageMetadata(lang: Lang, slug: string, subpage: string): Metadata {
  const page = getPageContent(slug, subpage, lang);
  if (!page) return { title: "Not Found" };

  return {
    title: `${page.title} — ${page.module.title} — Claude Code Guide`,
  };
}

export async function renderModulePage(lang: Lang, slug: string) {
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

  return <article className="doc-content" data-module={slug}>{content}</article>;
}

export async function renderSubpagePage(lang: Lang, slug: string, subpage: string) {
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
