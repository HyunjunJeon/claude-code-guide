import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

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
  "11-deployment-admin",
  "12-agent-sdk",
];

const MODULE_NAMES = {
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
  "11-deployment-admin": "배포와 관리",
  "12-agent-sdk": "Agent SDK",
};

function getContentDir(lang) {
  return lang === "ko" ? path.join(repoRoot, "ko") : repoRoot;
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function extractDescription(content) {
  const lines = content.split("\n");
  let foundH1 = false;
  let desc = "";

  for (const line of lines) {
    if (!foundH1 && line.startsWith("# ")) {
      foundH1 = true;
      continue;
    }
    if (!foundH1) continue;

    if (line.trim() === "") {
      if (desc) break;
      continue;
    }

    if (line.startsWith("#") || line.startsWith("```")) break;
    desc += (desc ? " " : "") + line.trim();
  }

  return desc.slice(0, 200);
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

function addPageEntry(pages, key, raw, moduleSlug) {
  const { content, data: frontmatter } = matter(raw);
  pages[key] = {
    content,
    frontmatter,
    title: extractTitle(raw),
    moduleSlug,
  };
}

function buildManifestForLang(lang) {
  const contentDir = getContentDir(lang);
  const modules = [];
  const pages = {};

  for (const dir of MODULE_DIRS) {
    const moduleDir = path.join(contentDir, dir);
    const readmePath = path.join(moduleDir, "README.md");
    const subPages = [];
    let title = MODULE_NAMES[dir] || dir;
    let description = "";

    if (fs.existsSync(readmePath)) {
      const raw = readUtf8(readmePath);
      const extracted = extractTitle(raw);
      if (extracted) title = extracted;
      description = extractDescription(raw);
      addPageEntry(pages, dir, raw, dir);
    }

    if (fs.existsSync(moduleDir)) {
      const entries = fs.readdirSync(moduleDir).sort();

      for (const entry of entries) {
        if (
          entry.endsWith(".md") &&
          entry !== "README.md" &&
          !entry.startsWith("_") &&
          !entry.startsWith(".")
        ) {
          const slug = entry.replace(/\.md$/, "");
          const raw = readUtf8(path.join(moduleDir, entry));
          subPages.push({
            slug,
            title: extractTitle(raw) || slug,
            filename: entry,
          });
          addPageEntry(pages, `${dir}/${slug}`, raw, dir);
        }
      }

      for (const entry of entries) {
        const fullPath = path.join(moduleDir, entry);
        const nestedReadme = path.join(fullPath, "README.md");
        if (
          fs.existsSync(fullPath) &&
          fs.statSync(fullPath).isDirectory() &&
          !entry.startsWith("_") &&
          !entry.startsWith(".") &&
          fs.existsSync(nestedReadme)
        ) {
          const raw = readUtf8(nestedReadme);
          subPages.push({
            slug: entry,
            title: extractTitle(raw) || entry,
            filename: `${entry}/README.md`,
          });
          addPageEntry(pages, `${dir}/${entry}`, raw, dir);
        }
      }
    }

    modules.push({
      slug: dir,
      number: dir.slice(0, 2),
      title,
      description,
      subPages,
    });
  }

  return { modules, pages };
}

function writeManifest(relativePath, manifest) {
  const target = path.join(repoRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Generated ${relativePath}`);
}

const en = buildManifestForLang("en");
const ko = buildManifestForLang("ko");

const manifest = {
  generatedAt: new Date().toISOString(),
  modulesByLang: {
    en: en.modules,
    ko: ko.modules,
  },
  pagesByLang: {
    en: en.pages,
    ko: ko.pages,
  },
};

writeManifest("src/generated/content-manifest.json", manifest);
writeManifest("template/src/generated/content-manifest.json", manifest);
