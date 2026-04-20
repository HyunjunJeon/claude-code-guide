import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Content lives in the repo root (same as cwd)
const CONTENT_ROOT = process.cwd();

// Validate content root at module load time — fail fast if cwd is wrong
if (!fs.existsSync(path.join(CONTENT_ROOT, "01-slash-commands"))) {
  throw new Error(
    `Content root not found: ${CONTENT_ROOT}. Run 'next build' from the project root.`
  );
}

export interface ModuleMeta {
  slug: string; // e.g. "01-slash-commands"
  number: string; // e.g. "01"
  title: string; // Extracted from README.md H1
  description: string; // First paragraph after H1
  subPages: SubPageMeta[];
}

export interface SubPageMeta {
  slug: string; // e.g. "commit"
  title: string; // Extracted from file H1
  filename: string; // e.g. "commit.md"
}

export interface PageContent {
  content: string; // Raw markdown content
  frontmatter: Record<string, unknown>;
  title: string;
  module: ModuleMeta;
}

const MODULE_DIRS = [
  "01-slash-commands",
  "02-memory",
  "03-skills",
  "04-subagents",
  "05-mcp",
  "06-hooks",
  "07-plugins",
  "08-checkpoints",
  "09-advanced-features",
  "10-cli",
] as const;

const MODULE_NAMES: Record<string, string> = {
  "01-slash-commands": "슬래시 명령어",
  "02-memory": "메모리 시스템",
  "03-skills": "스킬",
  "04-subagents": "서브에이전트",
  "05-mcp": "MCP (Model Context Protocol)",
  "06-hooks": "훅 시스템",
  "07-plugins": "플러그인",
  "08-checkpoints": "체크포인트",
  "09-advanced-features": "고급 기능",
  "10-cli": "CLI 레퍼런스",
};

function getContentDir(lang: "en" | "ko" = "ko"): string {
  return lang === "ko" ? path.join(CONTENT_ROOT, "ko") : CONTENT_ROOT;
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function extractDescription(content: string): string {
  // Get first paragraph after the H1
  const lines = content.split("\n");
  let foundH1 = false;
  let desc = "";

  for (const line of lines) {
    if (!foundH1 && line.startsWith("# ")) {
      foundH1 = true;
      continue;
    }
    if (foundH1) {
      if (line.trim() === "") {
        if (desc) break;
        continue;
      }
      if (line.startsWith("#") || line.startsWith("```")) break;
      desc += (desc ? " " : "") + line.trim();
    }
  }

  return desc.slice(0, 200);
}

function getSubPages(moduleDir: string, lang: "en" | "ko" = "ko"): SubPageMeta[] {
  const fullDir = path.join(getContentDir(lang), moduleDir);
  if (!fs.existsSync(fullDir)) return [];

  const entries = fs.readdirSync(fullDir);

  // Flat .md files (e.g. commit.md, optimize.md)
  const mdFiles = entries.filter(
    (f) =>
      f.endsWith(".md") &&
      f !== "README.md" &&
      !f.startsWith("_") &&
      !f.startsWith(".")
  );

  const pages: SubPageMeta[] = mdFiles.map((filename) => {
    const filePath = path.join(fullDir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const title = extractTitle(raw) || filename.replace(".md", "");
    return { slug: filename.replace(".md", ""), title, filename };
  });

  // Directory-based subpages (e.g. 07-plugins/devops-automation/README.md)
  const dirs = entries.filter((f) => {
    const full = path.join(fullDir, f);
    return (
      fs.statSync(full).isDirectory() &&
      !f.startsWith("_") &&
      !f.startsWith(".") &&
      fs.existsSync(path.join(full, "README.md"))
    );
  });

  for (const dirName of dirs) {
    const readmePath = path.join(fullDir, dirName, "README.md");
    const raw = fs.readFileSync(readmePath, "utf-8");
    const title = extractTitle(raw) || dirName;
    pages.push({ slug: dirName, title, filename: `${dirName}/README.md` });
  }

  return pages;
}

export function getModules(lang: "en" | "ko" = "ko"): ModuleMeta[] {
  const contentDir = getContentDir(lang);

  return MODULE_DIRS.map((dir) => {
    const readmePath = path.join(contentDir, dir, "README.md");
    let title = MODULE_NAMES[dir] || dir;
    let description = "";

    if (fs.existsSync(readmePath)) {
      const raw = fs.readFileSync(readmePath, "utf-8");
      const extracted = extractTitle(raw);
      if (extracted) title = extracted;
      description = extractDescription(raw);
    }

    return {
      slug: dir,
      number: dir.slice(0, 2),
      title,
      description,
      subPages: getSubPages(dir, lang),
    };
  });
}

export function getModuleBySlug(
  slug: string,
  lang: "en" | "ko" = "ko"
): ModuleMeta | null {
  const modules = getModules(lang);
  return modules.find((m) => m.slug === slug) || null;
}

export function getPageContent(
  moduleSlug: string,
  subPageSlug?: string,
  lang: "en" | "ko" = "ko"
): PageContent | null {
  const contentDir = getContentDir(lang);
  const filename = subPageSlug ? `${subPageSlug}.md` : "README.md";
  let filePath = path.join(contentDir, moduleSlug, filename);

  // Fallback: directory-based subpage (e.g. 07-plugins/devops-automation/README.md)
  if (subPageSlug && !fs.existsSync(filePath)) {
    const dirReadme = path.join(contentDir, moduleSlug, subPageSlug, "README.md");
    if (fs.existsSync(dirReadme)) {
      filePath = dirReadme;
    } else {
      return null;
    }
  } else if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data: frontmatter } = matter(raw);
  const title = extractTitle(raw);
  const module = getModuleBySlug(moduleSlug, lang);

  if (!module) return null;

  return {
    content,
    frontmatter,
    title,
    module,
  };
}

export function getAllSlugs(
  lang: "en" | "ko" = "ko"
): { moduleSlug: string; subPageSlug?: string }[] {
  const modules = getModules(lang);
  const slugs: { moduleSlug: string; subPageSlug?: string }[] = [];

  for (const mod of modules) {
    // Module README
    slugs.push({ moduleSlug: mod.slug });
    // Sub-pages
    for (const sub of mod.subPages) {
      slugs.push({ moduleSlug: mod.slug, subPageSlug: sub.slug });
    }
  }

  return slugs;
}
