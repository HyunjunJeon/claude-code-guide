import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const MODULE_DIR_RE = /^\d{2}-[a-z0-9-]+$/;

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function findContentRoot(startDir) {
  let currentDir = startDir;

  while (true) {
    if (await pathExists(path.join(currentDir, "ko", "README.md"))) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error("`ko/README.md`를 포함한 콘텐츠 루트를 찾지 못했습니다.");
    }
    currentDir = parentDir;
  }
}

function normalizeWhitespace(value) {
  return value.replace(/\r\n/g, "\n").trim();
}

function extractTitle(content, fallback) {
  const match = normalizeWhitespace(content).match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function extractDescription(content) {
  const paragraphs = normalizeWhitespace(content)
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  for (const paragraph of paragraphs) {
    if (
      paragraph.startsWith("#") ||
      paragraph.startsWith(">") ||
      paragraph.startsWith("```") ||
      paragraph.startsWith("|") ||
      paragraph.startsWith("- ") ||
      paragraph.startsWith("* ") ||
      paragraph.startsWith("![" )
    ) {
      continue;
    }

    return paragraph.replace(/\s+/g, " ");
  }

  return "";
}

async function readMarkdownDoc(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const content = normalizeWhitespace(parsed.content);

  return {
    content,
    frontmatter: parsed.data,
    title: extractTitle(content, path.basename(filePath, path.extname(filePath))),
    description: extractDescription(content),
  };
}

async function getModuleSubpages(moduleDir) {
  const entries = await fs.readdir(moduleDir, { withFileTypes: true });
  const subpages = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md") {
      const relPath = entry.name;
      const slug = entry.name.replace(/\.md$/, "");
      const filePath = path.join(moduleDir, relPath);
      const doc = await readMarkdownDoc(filePath);

      subpages.push({
        slug,
        title: doc.title,
        filename: relPath,
        page: doc,
      });
      continue;
    }

    if (entry.isDirectory()) {
      const relPath = path.join(entry.name, "README.md");
      const filePath = path.join(moduleDir, relPath);
      if (!(await pathExists(filePath))) {
        continue;
      }

      const doc = await readMarkdownDoc(filePath);
      subpages.push({
        slug: entry.name,
        title: doc.title,
        filename: relPath,
        page: doc,
      });
    }
  }

  return subpages;
}

function buildLlmsText(modules) {
  const lines = [
    "# Claude Code 가이드북",
    "",
    "> Claude Code의 주요 기능을 한국어로 정리한 학습 가이드입니다.",
    "",
    "## Modules",
    "",
  ];

  for (const module of modules) {
    lines.push(`- [${module.number}. ${module.title}](/ko/modules/${module.slug}/)`);
    for (const subPage of module.subPages) {
      lines.push(`  - [${subPage.title}](/ko/modules/${module.slug}/${subPage.slug}/)`);
    }
  }

  lines.push(
    "",
    "## Links",
    "",
    "- [홈](/ko/)",
    "- [모듈 인덱스](/ko/modules/)"
  );

  return `${lines.join("\n")}\n`;
}

async function main() {
  const outputRoot = process.cwd();
  const contentRoot = await findContentRoot(outputRoot);
  const contentBaseDir = path.join(contentRoot, "ko");
  const moduleNames = (await fs.readdir(contentBaseDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && MODULE_DIR_RE.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  const modules = [];
  const pages = {};

  for (const moduleName of moduleNames) {
    const moduleDir = path.join(contentBaseDir, moduleName);
    const readmePath = path.join(moduleDir, "README.md");
    const modulePage = await readMarkdownDoc(readmePath);
    const subPages = await getModuleSubpages(moduleDir);

    modules.push({
      slug: moduleName,
      number: moduleName.slice(0, 2),
      title: modulePage.title,
      description: modulePage.description,
      subPages: subPages.map(({ slug, title, filename }) => ({
        slug,
        title,
        filename,
      })),
    });

    pages[moduleName] = {
      content: modulePage.content,
      frontmatter: modulePage.frontmatter,
      title: modulePage.title,
      moduleSlug: moduleName,
    };

    for (const subPage of subPages) {
      pages[`${moduleName}/${subPage.slug}`] = {
        content: subPage.page.content,
        frontmatter: subPage.page.frontmatter,
        title: subPage.title,
        moduleSlug: moduleName,
      };
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    modulesByLang: {
      ko: modules,
    },
    pagesByLang: {
      ko: pages,
    },
  };

  const manifestPath = path.join(outputRoot, "src", "generated", "content-manifest.json");
  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const llmsPath = path.join(outputRoot, "public", "llms.txt");
  await fs.mkdir(path.dirname(llmsPath), { recursive: true });
  await fs.writeFile(llmsPath, buildLlmsText(modules));

  console.log(`Generated Korean-only manifest: ${path.relative(outputRoot, manifestPath)}`);
  console.log(`Generated Korean-only llms.txt: ${path.relative(outputRoot, llmsPath)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
