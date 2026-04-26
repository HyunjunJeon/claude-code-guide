import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const MODULE_DIR_RE = /^\d{2}-[a-z0-9-]+$/;
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif"]);

const rootDir = process.cwd();
const contentDir = path.join(rootDir, "ko");
const outputDir = path.join(rootDir, "wikidocs");
const pagesDir = path.join(outputDir, "pages");
const assetsDir = path.join(outputDir, "assets");
const overridesDir = path.join(rootDir, "wikidocs-overrides");
const wikidocsBookTitle = "Claude Code 빠르게 마스터 하기";
const excludedWikidocsPages = new Set([
  "01-slash-commands-commit.md",
  "01-slash-commands-doc-refactor.md",
  "01-slash-commands-generate-api-docs.md",
  "01-slash-commands-optimize.md",
  "01-slash-commands-pr.md",
  "01-slash-commands-push-all.md",
  "01-slash-commands-setup-ci-cd.md",
  "01-slash-commands-unit-test-expand.md",
]);

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function normalizeMarkdown(value) {
  return value.replace(/\r\n/g, "\n").trim();
}

function slugifyFilename(value) {
  return value
    .replace(/\\/g, "/")
    .replace(/^ko\//, "")
    .replace(/\/README\.md$/i, "")
    .replace(/\.md$/i, "")
    .replace(/\//g, "-")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function extractTitle(content, fallback) {
  const match = normalizeMarkdown(content).match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function stripFirstHeading(content) {
  return normalizeMarkdown(content).replace(/^#\s+.+\n+/, "");
}

function stripLanguageSwitcher(content) {
  return content
    .split("\n")
    .filter((line) => !line.startsWith("🌐 **Language:**"))
    .join("\n")
    .trim();
}

function toAnchorId(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=\[\]{}|\\:;"'<>,.?/]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function shiftHeadings(content, depth) {
  return content.replace(/^(#{1,6})(\s+)/gm, (_, hashes, spacing) => {
    return `${"#".repeat(Math.min(6, hashes.length + depth))}${spacing}`;
  });
}

async function readMarkdownDoc(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const content = normalizeMarkdown(parsed.content);

  return {
    content,
    title: extractTitle(content, path.basename(filePath, path.extname(filePath))),
  };
}

async function readOverrideDoc(outputName) {
  const overridePath = path.join(overridesDir, "pages", outputName);
  if (!(await pathExists(overridePath))) {
    return null;
  }

  const raw = await fs.readFile(overridePath, "utf8");
  return {
    content: normalizeMarkdown(raw),
    title: extractTitle(raw, path.basename(overridePath, path.extname(overridePath))),
  };
}

async function collectMarkdownRecursively(dir, excludeNames = new Set()) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.endsWith(".md") && !excludeNames.has(entry.name)) {
      results.push(fullPath);
    } else if (entry.isDirectory()) {
      results.push(...(await collectMarkdownRecursively(fullPath)));
    }
  }

  return results;
}

async function getModuleSubpages(moduleDir) {
  const entries = await fs.readdir(moduleDir, { withFileTypes: true });
  const subpages = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md") {
      subpages.push(path.join(moduleDir, entry.name));
      continue;
    }

    if (entry.isDirectory()) {
      const subDir = path.join(moduleDir, entry.name);
      const readmePath = path.join(subDir, "README.md");
      const skillPath = path.join(subDir, "SKILL.md");

      let entryFileName = null;
      if (await pathExists(readmePath)) {
        entryFileName = "README.md";
        subpages.push(readmePath);
      } else if (await pathExists(skillPath)) {
        entryFileName = "SKILL.md";
        subpages.push(skillPath);
      }

      const exclude = entryFileName ? new Set([entryFileName]) : new Set();
      const nested = await collectMarkdownRecursively(subDir, exclude);
      subpages.push(...nested);
    }
  }

  return subpages;
}

async function collectPages() {
  const moduleNames = (await fs.readdir(contentDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && MODULE_DIR_RE.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  const pages = [];
  const routeMapEntries = [];

  for (const moduleName of moduleNames) {
    const moduleDir = path.join(contentDir, moduleName);
    const modulePath = path.join(moduleDir, "README.md");
    const moduleDoc = await readMarkdownDoc(modulePath);
    const moduleNumber = moduleName.slice(0, 2);
    const modulePage = {
      sourcePath: modulePath,
      outputName: `${slugifyFilename(path.relative(rootDir, modulePath))}.md`,
      title: `${moduleNumber}. ${moduleDoc.title.replace(/^\d+[\s.-]+/, "")}`,
      originalTitle: moduleDoc.title,
      level: 0,
      children: [],
    };
    routeMapEntries.push([path.normalize(modulePath), modulePage.outputName]);

    const subpagePaths = await getModuleSubpages(moduleDir);
    let subpageIndex = 1;

    for (const subpagePath of subpagePaths) {
      const subpageDoc = await readMarkdownDoc(subpagePath);
      const outputName = `${slugifyFilename(path.relative(rootDir, subpagePath))}.md`;
      if (excludedWikidocsPages.has(outputName)) {
        continue;
      }
      const index = String(subpageIndex).padStart(2, "0");
      const subpage = {
        sourcePath: subpagePath,
        title: `${moduleNumber}-${index}. ${subpageDoc.title}`,
        originalTitle: subpageDoc.title,
        level: 1,
        anchor: `${moduleName}-${index}-${toAnchorId(subpageDoc.title)}`,
      };

      modulePage.children.push(subpage);
      routeMapEntries.push([
        path.normalize(subpagePath),
        `${modulePage.outputName}#${subpage.anchor}`,
      ]);
      subpageIndex += 1;
    }

    pages.push(modulePage);
  }

  return {
    pages: pages.sort((a, b) => a.outputName.localeCompare(b.outputName)),
    routeMapEntries,
  };
}

function splitHash(target) {
  const hashIndex = target.indexOf("#");
  if (hashIndex === -1) {
    return { pathname: target, hash: "" };
  }

  return {
    pathname: target.slice(0, hashIndex),
    hash: target.slice(hashIndex),
  };
}

function isExternalTarget(target) {
  return /^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target);
}

async function resolveMarkdownTarget(sourcePath, pathname) {
  const decodedPathname = decodeURIComponent(pathname);
  let absoluteTarget = path.resolve(path.dirname(sourcePath), decodedPathname);

  if (await pathExists(absoluteTarget)) {
    const stat = await fs.stat(absoluteTarget);
    if (stat.isDirectory()) {
      absoluteTarget = path.join(absoluteTarget, "README.md");
    }
  } else if (!path.extname(absoluteTarget)) {
    const directoryReadme = path.join(absoluteTarget, "README.md");
    const markdownFile = `${absoluteTarget}.md`;
    if (await pathExists(directoryReadme)) {
      absoluteTarget = directoryReadme;
    } else if (await pathExists(markdownFile)) {
      absoluteTarget = markdownFile;
    }
  }

  if (!(await pathExists(absoluteTarget))) {
    const parts = decodedPathname.split(/[\\/]+/).filter(Boolean);
    const moduleIndex = parts.findIndex((part) => MODULE_DIR_RE.test(part));

    if (moduleIndex !== -1) {
      const moduleRelativePath = parts.slice(moduleIndex).join("/");
      const moduleTarget = path.join(contentDir, moduleRelativePath);
      const moduleReadme = path.join(moduleTarget, "README.md");
      const moduleMarkdown = `${moduleTarget}.md`;

      if (await pathExists(moduleReadme)) {
        absoluteTarget = moduleReadme;
      } else if (await pathExists(moduleMarkdown)) {
        absoluteTarget = moduleMarkdown;
      }
    }
  }

  return path.normalize(absoluteTarget);
}

async function resolveImageTarget(sourcePath, pathname) {
  const lookupPath = path.normalize(path.resolve(path.dirname(sourcePath), decodeURIComponent(pathname)));
  if (await pathExists(lookupPath)) {
    return { lookupPath, sourceAssetPath: lookupPath };
  }

  const relativeSourceDir = path.relative(contentDir, path.dirname(sourcePath));
  const moduleName = relativeSourceDir.split(path.sep)[0];
  const publicImagePath = path.join(rootDir, "public", "images", moduleName, path.basename(pathname));

  if (MODULE_DIR_RE.test(moduleName) && (await pathExists(publicImagePath))) {
    return { lookupPath, sourceAssetPath: publicImagePath };
  }

  return { lookupPath, sourceAssetPath: lookupPath };
}

async function rewriteMarkdownLinks(content, sourcePath, pageMap, assetMap, warnings, pagePrefix = "") {
  const parts = content.split(/(```[\s\S]*?```)/g);

  const rewrittenParts = [];

  for (const part of parts) {
    if (part.startsWith("```")) {
      rewrittenParts.push(part);
      continue;
    }

    let rewrittenPart = "";
    let lastIndex = 0;
    const linkPattern = /(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

    for (const match of part.matchAll(linkPattern)) {
      const [fullMatch, marker, text, target] = match;
      rewrittenPart += part.slice(lastIndex, match.index);
      lastIndex = match.index + fullMatch.length;

      if (part[match.index - 1] === "`" && part[lastIndex] === "`") {
        rewrittenPart += fullMatch;
        continue;
      }

        if (isExternalTarget(target)) {
        rewrittenPart += fullMatch;
        continue;
        }

        const { pathname, hash } = splitHash(target);
        if (!pathname) {
        rewrittenPart += fullMatch;
        continue;
        }

        const extension = path.extname(pathname).toLowerCase();

        if (marker === "!" || IMAGE_EXTENSIONS.has(extension)) {
        const { lookupPath } = await resolveImageTarget(sourcePath, pathname);
          const assetName = assetMap.get(lookupPath);
          if (!assetName) {
          warnings.push(`이미지 파일을 찾지 못했습니다: ${path.relative(rootDir, lookupPath)} (${path.relative(rootDir, sourcePath)})`);
          rewrittenPart += fullMatch;
          continue;
          }
        rewrittenPart += `![${text}](../assets/${assetName}${hash})`;
        continue;
        }

      const resolvedTarget = await resolveMarkdownTarget(sourcePath, pathname);
      const pageName = pageMap.get(resolvedTarget);
        if (pageName) {
        rewrittenPart += `[${text}](${pagePrefix}${pageName}${hash})`;
        continue;
        }

      if (target.includes("WHATS-NEW.md")) {
        rewrittenPart += text;
        continue;
      }

        warnings.push(`문서 링크를 변환하지 못했습니다: ${target} (${path.relative(rootDir, sourcePath)})`);
      rewrittenPart += fullMatch;
    }

    rewrittenPart += part.slice(lastIndex);
    rewrittenParts.push(rewrittenPart);
  }

  return rewrittenParts.join("");
}

async function copyAssets(pages) {
  const assetMap = new Map();
  const usedNames = new Set();

  for (const page of pages) {
    const sourcePaths = [page.sourcePath, ...page.children.map((child) => child.sourcePath)];

    for (const sourcePath of sourcePaths) {
      const raw = await fs.readFile(sourcePath, "utf8");
      const matches = raw.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g);

      for (const match of matches) {
        const { pathname } = splitHash(match[1]);
        const extension = path.extname(pathname).toLowerCase();
        if (!IMAGE_EXTENSIONS.has(extension) || isExternalTarget(pathname)) {
          continue;
        }

        const { lookupPath, sourceAssetPath } = await resolveImageTarget(sourcePath, pathname);
        if (!(await pathExists(sourceAssetPath))) {
          continue;
        }

        let assetName = path.basename(sourceAssetPath).replace(/[^A-Za-z0-9._-]+/g, "-").toLowerCase();
        if (usedNames.has(assetName)) {
          const parsed = path.parse(assetName);
          const prefix = slugifyFilename(path.relative(contentDir, path.dirname(sourceAssetPath)));
          assetName = `${prefix}-${parsed.name}${parsed.ext}`;
        }

        usedNames.add(assetName);
        assetMap.set(lookupPath, assetName);
        await fs.copyFile(sourceAssetPath, path.join(assetsDir, assetName));
      }
    }
  }

  return assetMap;
}

function buildToc(pagesByTreeOrder) {
  const lines = ["# 목차", ""];

  for (const page of pagesByTreeOrder) {
    lines.push(`- [${page.title}](pages/${page.outputName})`);
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  if (!(await pathExists(path.join(contentDir, "README.md")))) {
    throw new Error("ko/README.md를 찾지 못했습니다. 프로젝트 루트에서 실행하세요.");
  }

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(pagesDir, { recursive: true });
  await fs.mkdir(assetsDir, { recursive: true });

  const { pages, routeMapEntries } = await collectPages();
  const treePages = pages.filter((page) => page.level === 0).sort((a, b) => a.outputName.localeCompare(b.outputName));
  const pageMap = new Map(routeMapEntries);
  const assetMap = await copyAssets(pages);
  const warnings = [];

  const rootDoc = await readMarkdownDoc(path.join(contentDir, "README.md"));
  const rewrittenRootContent = await rewriteMarkdownLinks(
    stripLanguageSwitcher(rootDoc.content),
    path.join(contentDir, "README.md"),
    pageMap,
    assetMap,
    warnings,
    "pages/"
  );
  await fs.writeFile(
    path.join(outputDir, "README.md"),
    `# ${wikidocsBookTitle}\n\n${stripFirstHeading(rewrittenRootContent)}\n`
  );

  await fs.writeFile(path.join(outputDir, "TOC.md"), buildToc(treePages));

  for (const page of pages) {
    const overrideDoc = await readOverrideDoc(page.outputName);
    const doc = overrideDoc || (await readMarkdownDoc(page.sourcePath));
    const rewrittenContent = overrideDoc
      ? doc.content
      : await rewriteMarkdownLinks(doc.content, page.sourcePath, pageMap, assetMap, warnings);
    const mergedSections = [];

    for (const child of page.children) {
      const childDoc = await readMarkdownDoc(child.sourcePath);
      const childRewritten = await rewriteMarkdownLinks(
        childDoc.content,
        child.sourcePath,
        pageMap,
        assetMap,
        warnings
      );
      const childBody = shiftHeadings(stripFirstHeading(childRewritten), 1);
      mergedSections.push(
        `<a id="${child.anchor}"></a>\n\n## ${child.title}\n\n${childBody}`
      );
    }

    const mergedContent = [
      stripFirstHeading(rewrittenContent),
      ...mergedSections,
    ]
      .filter(Boolean)
      .join("\n\n---\n\n");

    // WikiDocs displays the page title from TOC.md, and its guide
    // recommends starting body content at H2 (H1 in body is treated
    // as an ebook chapter). Emit body only.
    const pageContent = `${mergedContent.trim()}\n`;
    await fs.writeFile(path.join(pagesDir, page.outputName), pageContent);
  }

  const uniqueWarnings = [...new Set(warnings)].sort();
  const report = [
    "# Wikidocs Export Report",
    "",
    `- Pages: ${pages.length}`,
    `- Assets: ${assetMap.size}`,
    `- Warnings: ${uniqueWarnings.length}`,
    "",
    "## Warnings",
    "",
    ...(uniqueWarnings.length ? uniqueWarnings.map((warning) => `- ${warning}`) : ["- 없음"]),
    "",
  ].join("\n");
  await fs.writeFile(path.join(outputDir, "EXPORT_REPORT.md"), report);

  console.log(`Exported ${pages.length} pages to ${path.relative(rootDir, outputDir)}`);
  console.log(`Copied ${assetMap.size} assets`);
  console.log(`Warnings: ${uniqueWarnings.length}`);
  if (uniqueWarnings.length) {
    console.log(`See ${path.relative(rootDir, path.join(outputDir, "EXPORT_REPORT.md"))}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
