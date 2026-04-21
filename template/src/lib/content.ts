import manifest from "@/generated/content-manifest.json";

export interface ModuleMeta {
  slug: string;
  number: string;
  title: string;
  description: string;
  subPages: SubPageMeta[];
}

export interface SubPageMeta {
  slug: string;
  title: string;
  filename: string;
}

export interface PageContent {
  content: string;
  frontmatter: Record<string, unknown>;
  title: string;
  module: ModuleMeta;
}

type Lang = "en" | "ko";

interface ManifestPageEntry {
  content: string;
  frontmatter: Record<string, unknown>;
  title: string;
  moduleSlug: string;
}

interface ManifestShape {
  generatedAt: string;
  modulesByLang: Record<Lang, ModuleMeta[]>;
  pagesByLang: Record<Lang, Record<string, ManifestPageEntry>>;
}

const contentManifest = manifest as ManifestShape;

export function getModules(lang: Lang = "ko"): ModuleMeta[] {
  return contentManifest.modulesByLang[lang];
}

export function getModuleBySlug(slug: string, lang: Lang = "ko"): ModuleMeta | null {
  return getModules(lang).find((module) => module.slug === slug) || null;
}

export function getPageContent(
  moduleSlug: string,
  subPageSlug?: string,
  lang: Lang = "ko"
): PageContent | null {
  const key = subPageSlug ? `${moduleSlug}/${subPageSlug}` : moduleSlug;
  const pageEntry = contentManifest.pagesByLang[lang][key];
  const module = getModuleBySlug(moduleSlug, lang);

  if (!pageEntry || !module) return null;

  return {
    content: pageEntry.content,
    frontmatter: pageEntry.frontmatter,
    title: pageEntry.title,
    module,
  };
}

export function getAllSlugs(
  lang: Lang = "ko"
): { moduleSlug: string; subPageSlug?: string }[] {
  const slugs: { moduleSlug: string; subPageSlug?: string }[] = [];

  for (const module of getModules(lang)) {
    slugs.push({ moduleSlug: module.slug });
    for (const subPage of module.subPages) {
      slugs.push({ moduleSlug: module.slug, subPageSlug: subPage.slug });
    }
  }

  return slugs;
}
