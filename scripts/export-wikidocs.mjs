import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const MODULE_DIR_RE = /^\d{2}-[a-z0-9-]+$/;
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif"]);

// 위키북스 1:1 분할 대상 모듈. 옵트인된 모듈은 ko/<module>/<sub>.md 한 개당
// 위키북스 페이지 한 개로 익스포트되며, TOC.md에 들여쓰기로 계층화된다.
// sub-file이 없는 모듈을 포함해도 무해 — getModuleSubpages가 빈 배열을 반환하면
// 메인 페이지만 단일 출력되어 비분할 동작과 동일하다.
const SPLIT_MODULES = new Set([
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
]);

const rootDir = process.cwd();
const contentDir = path.join(rootDir, "ko");
const outputDir = path.join(rootDir, "wikidocs");
const pagesDir = path.join(outputDir, "pages");
const assetsDir = path.join(outputDir, "assets");
const overridesDir = path.join(rootDir, "wikidocs-overrides");
const wikidocsBookTitle = "Claude Code 빠르게 마스터 하기";
const wikidocsLivePageUrls = new Map([
  ["09-01-best-practices.md", "https://wikidocs.net/345349"],
  ["09-06-common-workflows.md", "https://wikidocs.net/345348"],
  ["09-19-how-claude-code-works.md", "https://wikidocs.net/345346"],
  ["09-21-permissions-and-security.md", "https://wikidocs.net/345697"],
  ["09-26-session-and-interaction.md", "https://wikidocs.net/345358"],
]);
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
const stableModuleOutputNames = new Map([
  // Preserve the original WikiDocs page id for the first generated page.
  ["01-slash-commands", "01-getting-started.md"],
]);
const WIKIDOCS_SECTIONS = [
  {
    title: "00. Claude Code 시작하기",
    outputName: "00-start-here.md",
    children: [
      "10-05-quickstart.md",
      "09-19-how-claude-code-works.md",
      "09-14-features-overview.md",
      "09-06-common-workflows.md",
      "09-01-best-practices.md",
    ],
  },
  {
    title: "01. CLI와 Slash Command",
    outputName: "01-interaction.md",
    children: [
      "01-getting-started.md",
      "01-01-ultraplan.md",
      "01-02-ultrareview.md",
      "10-cli.md",
      "10-04-interactive-mode.md",
      "10-06-tools-reference.md",
      "09-20-output-styles.md",
      "09-26-session-and-interaction.md",
      "10-01-changelog.md",
    ],
  },
  {
    title: "02. Memory",
    outputName: "02-memory.md",
    children: [
      "02-13-memory-overview.md",
      "02-08-memory-commands-quick-reference.md",
      "02-11-memory-init-and-update.md",
      "02-15-memory-setup-guide.md",
      "02-06-memory-architecture.md",
      "02-10-memory-hierarchy.md",
      "02-12-memory-location-table.md",
      "02-20-settings-file-hierarchy.md",
      "02-17-modular-rules-system.md",
      "02-03-claude-md-excludes.md",
      "02-16-memory-update-lifecycle.md",
      "02-02-auto-memory.md",
      "02-04-claude-memory-of-user.md",
      "02-01-add-dir-flag.md",
      "02-19-project-claude.md",
      "02-18-personal-claude.md",
      "02-05-directory-api-claude.md",
      "02-14-memory-practical-examples.md",
      "02-09-memory-comparison.md",
      "02-07-memory-best-practices.md",
    ],
  },
  {
    title: "03. Skills",
    outputName: "03-skills.md",
    children: [
      "03-15-how-skills-work.md",
      "03-24-skill-loading-process.md",
      "03-26-skill-types-and-locations.md",
      "03-23-skill-content-types.md",
      "03-25-skill-supporting-files.md",
      "03-12-creating-custom-skills.md",
      "03-16-managing-skills.md",
      "03-11-controlling-skill-invocation.md",
      "03-32-string-substitution.md",
      "03-14-dynamic-context-injection.md",
      "03-21-running-skills-in-subagents.md",
      "03-22-sharing-skills.md",
      "03-06-bundled-skills.md",
      "03-27-skills-best-practices.md",
      "03-29-skills-security.md",
      "03-30-skills-troubleshooting.md",
      "03-31-skills-vs-other-features.md",
      "03-28-skills-real-world-examples.md",
      "03-01-blog-draft-skill.md",
      "03-02-blog-draft-templates-draft-template.md",
      "03-03-blog-draft-templates-outline-template.md",
      "03-04-brand-voice-skill.md",
      "03-05-brand-voice-tone-examples.md",
      "03-07-claude-md-skill.md",
      "03-08-code-review-skill.md",
      "03-09-code-review-templates-finding-template.md",
      "03-10-code-review-templates-review-checklist.md",
      "03-13-doc-generator-skill.md",
      "03-17-refactor-skill.md",
      "03-18-refactor-references-code-smells.md",
      "03-19-refactor-references-refactoring-catalog.md",
      "03-20-refactor-templates-refactoring-plan.md",
    ],
  },
  {
    title: "04. Subagents",
    outputName: "04-subagents.md",
    children: [
      "04-23-subagents-benefits.md",
      "04-22-subagents-architecture.md",
      "04-08-context-management.md",
      "04-25-subagents-configuration.md",
      "04-26-subagents-file-locations.md",
      "04-27-subagents-installation.md",
      "04-04-builtin-subagents.md",
      "04-02-agent-teams.md",
      "04-01-agent-teams-experimental.md",
      "04-15-managing-subagents.md",
      "04-29-using-subagents.md",
      "04-30-when-to-use-subagents.md",
      "04-06-cli-agents-command.md",
      "04-12-example-subagents.md",
      "04-03-background-subagents.md",
      "04-18-resumable-agents.md",
      "04-20-subagent-chaining.md",
      "04-21-subagent-persistent-memory.md",
      "04-31-worktree-isolation.md",
      "04-14-limiting-subagent-creation.md",
      "04-17-plugin-subagent-security.md",
      "04-24-subagents-best-practices.md",
      "04-05-clean-code-reviewer.md",
      "04-07-code-reviewer.md",
      "04-09-data-scientist.md",
      "04-10-debugger.md",
      "04-11-documentation-writer.md",
      "04-13-implementation-agent.md",
      "04-16-performance-optimizer.md",
      "04-19-secure-reviewer.md",
      "04-28-test-engineer.md",
    ],
  },
  {
    title: "05. MCP",
    outputName: "05-mcp.md",
    children: [
      "05-16-mcp-overview.md",
      "05-02-mcp-architecture.md",
      "05-07-mcp-ecosystem.md",
      "05-11-mcp-installation.md",
      "05-27-mcp-setup-guide.md",
      "05-05-mcp-configuration-process.md",
      "05-13-mcp-management.md",
      "05-23-mcp-scopes.md",
      "05-26-mcp-server-deduplication.md",
      "05-14-mcp-oauth.md",
      "05-09-mcp-environment-variables.md",
      "05-21-mcp-resource-mentions.md",
      "05-30-mcp-tool-search.md",
      "05-15-mcp-output-limits.md",
      "05-06-mcp-dynamic-tool-updates.md",
      "05-29-mcp-tool-restrictions.md",
      "05-04-mcp-code-execution.md",
      "05-01-mcp-apps.md",
      "05-08-mcp-elicitation.md",
      "05-18-mcp-prompts-as-slash-commands.md",
      "05-17-mcp-plugin-servers.md",
      "05-28-mcp-subagent-scope.md",
      "05-24-mcp-serve.md",
      "05-20-mcp-request-response.md",
      "05-25-mcp-server-catalog.md",
      "05-10-mcp-examples.md",
      "05-33-mcp-wikidocs-case.md",
      "05-32-mcp-vs-memory.md",
      "05-12-mcp-managed-config.md",
      "05-03-mcp-best-practices.md",
      "05-31-mcp-troubleshooting.md",
      "05-19-mcp-related-concepts.md",
      "05-22-mcp-resources.md",
    ],
  },
  {
    title: "06. Hooks",
    outputName: "06-hooks.md",
    children: [
      "06-11-hooks-overview.md",
      "06-04-hook-events.md",
      "06-07-hook-types.md",
      "06-08-hooks-configuration.md",
      "06-10-hooks-management.md",
      "06-06-hook-io.md",
      "06-03-hook-env-vars.md",
      "06-14-permission-request-event.md",
      "06-16-prompt-based-hooks.md",
      "06-01-async-hooks.md",
      "06-02-component-scope-hooks.md",
      "06-13-mcp-tool-hooks.md",
      "06-15-plugin-hooks.md",
      "06-05-hook-examples.md",
      "06-12-hooks-security.md",
      "06-09-hooks-debugging.md",
    ],
  },
  {
    title: "07. Plugins 핵심",
    outputName: "07-plugins.md",
    children: [
      "07-09-discover-plugins.md",
      "07-23-plugin-architecture.md",
      "07-29-plugin-definition-structure.md",
      "07-44-plugin-structure-example.md",
      "07-30-plugin-feature-comparison.md",
      "07-58-when-to-create-plugin.md",
      "07-49-plugin-vs-manual.md",
      "07-57-standalone-vs-plugin.md",
      "07-33-plugin-installation-guide.md",
      "07-35-plugin-installation-methods.md",
      "07-34-plugin-installation-lifecycle.md",
      "07-36-plugin-loading-process.md",
      "07-25-plugin-caching-and-reload.md",
      "07-32-plugin-hot-reload.md",
      "07-48-plugin-updates.md",
      "07-39-plugin-options.md",
      "07-22-persistent-plugin-data.md",
      "07-40-plugin-paths-and-resolution.md",
      "07-28-plugin-configuration.md",
      "07-37-plugin-managed-settings.md",
      "07-26-plugin-channels.md",
      "07-27-plugin-cli-commands.md",
      "07-42-plugin-publishing.md",
      "07-38-plugin-marketplaces.md",
      "07-21-inline-plugins.md",
      "07-47-plugin-types-and-distribution.md",
      "07-45-plugin-testing.md",
      "07-46-plugin-troubleshooting.md",
      "07-43-plugin-security.md",
      "07-24-plugin-best-practices.md",
      "07-41-plugin-practical-examples.md",
      "07-31-plugin-full-workflow-example.md",
    ],
  },
  {
    title: "08. Plugin 실전 예제",
    outputName: "08-plugin-examples.md",
    children: [
      "07-01-devops-automation-readme.md",
      "07-02-devops-automation-agents-alert-analyzer.md",
      "07-03-devops-automation-agents-deployment-specialist.md",
      "07-04-devops-automation-agents-incident-commander.md",
      "07-05-devops-automation-commands-deploy.md",
      "07-06-devops-automation-commands-incident.md",
      "07-07-devops-automation-commands-rollback.md",
      "07-08-devops-automation-commands-status.md",
      "07-10-documentation-readme.md",
      "07-11-documentation-agents-api-documenter.md",
      "07-12-documentation-agents-code-commentator.md",
      "07-13-documentation-agents-example-generator.md",
      "07-14-documentation-commands-generate-api-docs.md",
      "07-15-documentation-commands-generate-readme.md",
      "07-16-documentation-commands-sync-docs.md",
      "07-17-documentation-commands-validate-docs.md",
      "07-18-documentation-templates-adr-template.md",
      "07-19-documentation-templates-api-endpoint.md",
      "07-20-documentation-templates-function-docs.md",
      "07-50-pr-review-readme.md",
      "07-51-pr-review-agents-performance-analyzer.md",
      "07-52-pr-review-agents-security-reviewer.md",
      "07-53-pr-review-agents-test-checker.md",
      "07-54-pr-review-commands-check-security.md",
      "07-55-pr-review-commands-check-tests.md",
      "07-56-pr-review-commands-review-pr.md",
    ],
  },
  {
    title: "09. Checkpoints & Rewind",
    outputName: "08-checkpoints.md",
    children: [
      "08-02-checkpointing-core.md",
      "08-03-rewind-workflows.md",
      "08-04-checkpoints-git-and-sdk.md",
      "08-01-checkpoint-examples.md",
    ],
  },
  {
    title: "10. 고급 워크플로",
    outputName: "09-advanced-workflows.md",
    children: [
      "09-advanced-features.md",
      "09-13-execution-modes.md",
      "09-22-planning-and-thinking.md",
      "09-23-planning-mode-examples.md",
      "09-05-code-review.md",
      "09-25-routines.md",
      "09-11-desktop-scheduled-tasks.md",
      "09-15-fullscreen-rendering.md",
    ],
  },
  {
    title: "11. 플랫폼과 통합",
    outputName: "10-platforms-integrations.md",
    children: [
      "09-24-platforms.md",
      "10-remote-control.md",
      "09-31-web-quickstart.md",
      "09-03-claude-code-on-the-web.md",
      "09-10-desktop-quickstart.md",
      "09-12-desktop.md",
      "09-30-vscode.md",
      "09-28-slack.md",
      "09-16-github-actions.md",
      "09-18-gitlab-ci-cd.md",
      "09-17-github-enterprise-server.md",
      "09-07-computer-use.md",
      "09-02-channels-reference.md",
    ],
  },
  {
    title: "12. 설정·권한·보안",
    outputName: "11-configuration-security.md",
    children: [
      "09-08-configuration.md",
      "09-27-settings-system-guide.md",
      "09-21-permissions-and-security.md",
      "09-04-claude-directory.md",
      "09-09-context-window.md",
      "09-29-terminal-configuration.md",
      "10-02-env-vars.md",
      "10-03-errors.md",
      "10-07-troubleshooting.md",
    ],
  },
  {
    title: "13. Deployment Administration",
    outputName: "11-deployment-admin.md",
    children: [
      "11-02-authentication-and-iam.md",
      "11-01-amazon-bedrock.md",
      "11-05-google-vertex-ai.md",
      "11-07-microsoft-foundry.md",
      "11-06-llm-gateway.md",
      "11-09-network-config.md",
      "11-10-server-managed-settings.md",
      "11-08-monitoring-usage.md",
      "11-03-data-usage.md",
      "11-11-zero-data-retention.md",
      "11-04-devcontainer.md",
    ],
  },
  {
    title: "14. Agent SDK",
    outputName: "12-agent-sdk.md",
    children: [
      "12-11-overview.md",
      "12-01-agent-loop.md",
      "12-16-sessions.md",
      "12-12-permissions.md",
      "12-03-custom-tools.md",
      "12-19-streaming-output.md",
      "12-20-streaming-vs-single-mode.md",
      "12-21-structured-outputs.md",
      "12-05-hooks.md",
      "12-07-mcp.md",
      "12-13-plugins.md",
      "12-17-skills.md",
      "12-18-slash-commands.md",
      "12-22-subagents.md",
      "12-24-tool-search.md",
      "12-23-todo-tracking.md",
      "12-04-file-checkpointing.md",
      "12-02-cost-tracking.md",
      "12-10-observability.md",
      "12-06-hosting.md",
      "12-15-secure-deployment.md",
      "12-08-migration-guide.md",
      "12-09-modifying-system-prompts.md",
      "12-14-python.md",
      "12-26-typescript.md",
      "12-25-typescript-v2-preview.md",
      "12-27-user-input.md",
    ],
  },
];
const WIKIDOCS_SECTION_DESCRIPTIONS = new Map([
  ["00-start-here.md", "설치 후 첫 작업까지 이어지는 큰 그림과 기본 워크플로"],
  ["01-interaction.md", "CLI, 대화형 모드, slash command, 출력 형식"],
  ["02-memory.md", "CLAUDE.md와 자동 Memory로 지속 컨텍스트 관리"],
  ["03-skills.md", "재사용 가능한 지식과 워크플로를 skill로 패키징"],
  ["04-subagents.md", "격리된 전문 agent와 Agent teams로 병렬 작업 분리"],
  ["05-mcp.md", "외부 도구, API, 실시간 데이터를 연결하는 표준 프로토콜"],
  ["06-hooks.md", "이벤트 기반 자동화, 검증, 권한 통제"],
  ["07-plugins.md", "plugin 개념, 설치, 운영, 보안, 배포"],
  ["08-plugin-examples.md", "DevOps, 문서화, PR 리뷰 plugin 실전 예제"],
  ["08-checkpoints.md", "자동 checkpoint, rewind, git·SDK 비교"],
  ["09-advanced-workflows.md", "planning, routines, code review, 실행 모드 등 고급 흐름"],
  ["10-platforms-integrations.md", "Remote Control, Web, Desktop, IDE, Slack, CI/CD 통합"],
  ["11-configuration-security.md", "설정 계층, 권한, 보안, context window, 문제 해결"],
  ["11-deployment-admin.md", "조직 배포, 공급자 선택, 네트워크, 데이터 정책"],
  ["12-agent-sdk.md", "Claude Code agent loop를 앱과 백엔드에 임베드하는 SDK"],
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
      outputName:
        stableModuleOutputNames.get(moduleName) ??
        `${slugifyFilename(path.relative(rootDir, modulePath))}.md`,
      title: `${moduleNumber}. ${moduleDoc.title.replace(/^\d+[\s.-]+/, "")}`,
      originalTitle: moduleDoc.title,
      level: 0,
      children: [],
      subpages: [],
    };
    routeMapEntries.push([path.normalize(modulePath), modulePage.outputName]);
    pages.push(modulePage);

    const isSplitModule = SPLIT_MODULES.has(moduleName);
    const subpagePaths = await getModuleSubpages(moduleDir);
    let subpageIndex = 1;

    for (const subpagePath of subpagePaths) {
      const subpageDoc = await readMarkdownDoc(subpagePath);
      const legacyOutputName = `${slugifyFilename(path.relative(rootDir, subpagePath))}.md`;
      if (excludedWikidocsPages.has(legacyOutputName)) {
        continue;
      }
      const index = String(subpageIndex).padStart(2, "0");

      if (isSplitModule) {
        // 모듈 내 상대경로 전체를 슬러그화하여 nested dir의 SKILL.md 등이
        // 동일 basename으로 충돌하지 않도록 보장한다.
        // 예: brand-voice/SKILL.md → brand-voice-skill
        //     blog-draft/templates/draft-template.md → blog-draft-templates-draft-template
        const relWithinModule = path.relative(moduleDir, subpagePath).replace(/\.md$/i, "");
        const subFilenameSlug = slugifyFilename(relWithinModule);
        const outputName = `${moduleNumber}-${index}-${subFilenameSlug}.md`;
        const subpage = {
          sourcePath: subpagePath,
          outputName,
          title: `${moduleNumber}-${index}. ${subpageDoc.title}`,
          originalTitle: subpageDoc.title,
          level: 0,
          parentOutputName: modulePage.outputName,
          children: [],
          subpages: [],
        };
        pages.push(subpage);
        modulePage.subpages.push(subpage);
        routeMapEntries.push([path.normalize(subpagePath), outputName]);
      } else {
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
      }
      subpageIndex += 1;
    }
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

function stripWikidocsLocalMarkdownLinks(content) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part;
      }

      return part.replace(
        /(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
        (fullMatch, marker, text, target) => {
          if (marker === "!" || isExternalTarget(target)) {
            return fullMatch;
          }

          const { pathname } = splitHash(target);
          if (path.extname(pathname).toLowerCase() !== ".md") {
            return fullMatch;
          }

          return text;
        }
      );
    })
    .join("");
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
        const livePageUrl = wikidocsLivePageUrls.get(pageName);
        if (livePageUrl) {
          rewrittenPart += `[${text}](${livePageUrl}${hash})`;
          continue;
        }
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

function stripDisplayNumber(title) {
  return title.replace(/^\d{1,2}(?:-\d{1,2})?[\s.-]+/, "").trim();
}

function sectionNumber(title) {
  const match = title.match(/^(\d{1,2})\./);
  if (!match) {
    throw new Error(`섹션 번호를 찾지 못했습니다: ${title}`);
  }
  return match[1];
}

function formatChildTitle(sectionTitle, index, page) {
  const section = sectionNumber(sectionTitle);
  const item = String(index + 1).padStart(2, "0");
  return `${section}-${item}. ${stripDisplayNumber(page.originalTitle || page.title)}`;
}

function addReference(refs, outputName, context) {
  if (!refs.has(outputName)) {
    refs.set(outputName, []);
  }
  refs.get(outputName).push(context);
}

function buildWikidocsNavigation(pages) {
  const pageByOutputName = new Map();
  const duplicatePageNames = [];

  for (const page of pages) {
    if (pageByOutputName.has(page.outputName)) {
      duplicatePageNames.push(page.outputName);
    }
    pageByOutputName.set(page.outputName, page);
  }

  if (duplicatePageNames.length) {
    throw new Error(`중복된 출력 페이지가 있습니다: ${duplicatePageNames.join(", ")}`);
  }

  const refs = new Map();
  const navigation = WIKIDOCS_SECTIONS.map((section) => {
    const sectionPage = pageByOutputName.get(section.outputName);
    if (!sectionPage) {
      throw new Error(`WikiDocs 섹션 페이지를 찾지 못했습니다: ${section.outputName}`);
    }

    addReference(refs, section.outputName, section.title);

    const children = section.children.map((outputName, index) => {
      const page = pageByOutputName.get(outputName);
      if (!page) {
        throw new Error(`${section.title} 섹션의 하위 페이지를 찾지 못했습니다: ${outputName}`);
      }

      addReference(refs, outputName, `${section.title} > ${outputName}`);
      return {
        page,
        title: formatChildTitle(section.title, index, page),
      };
    });

    return {
      page: sectionPage,
      title: section.title,
      children,
    };
  });

  const duplicatedRefs = [...refs.entries()]
    .filter(([, contexts]) => contexts.length > 1)
    .map(([outputName, contexts]) => `${outputName} (${contexts.join("; ")})`);
  if (duplicatedRefs.length) {
    throw new Error(`WikiDocs 목차에 중복 배치된 페이지가 있습니다:\n${duplicatedRefs.join("\n")}`);
  }

  const missingRefs = pages
    .map((page) => page.outputName)
    .filter((outputName) => !refs.has(outputName))
    .sort();
  if (missingRefs.length) {
    throw new Error(`WikiDocs 목차에 누락된 페이지가 있습니다:\n${missingRefs.join("\n")}`);
  }

  return navigation;
}

async function collectVirtualSectionPages(existingPages) {
  const existingOutputNames = new Set(existingPages.map((page) => page.outputName));
  const virtualPages = [];
  const virtualOutputNames = new Set();

  for (const section of WIKIDOCS_SECTIONS) {
    virtualOutputNames.add(section.outputName);
    for (const childOutputName of section.children) {
      virtualOutputNames.add(childOutputName);
    }
  }

  for (const outputName of virtualOutputNames) {
    if (existingOutputNames.has(outputName)) {
      continue;
    }

    const overridePath = path.join(overridesDir, "pages", outputName);
    if (!(await pathExists(overridePath))) {
      throw new Error(`가상 WikiDocs 페이지 override를 찾지 못했습니다: ${path.relative(rootDir, overridePath)}`);
    }

    const overrideDoc = await readMarkdownDoc(overridePath);
    virtualPages.push({
      sourcePath: overridePath,
      outputName,
      title: overrideDoc.title,
      originalTitle: overrideDoc.title,
      level: 0,
      children: [],
      subpages: [],
    });
    existingOutputNames.add(outputName);
  }

  return virtualPages;
}

function buildReadme(navigation) {
  const lines = [
    `# ${wikidocsBookTitle}`,
    "",
    "`claude`를 처음 실행하는 단계부터 Memory, Skill, Subagent, MCP, Hooks, Plugin, 배포와 Agent SDK까지 학습 흐름대로 정리한 Claude Code 가이드입니다.",
    "",
    "---",
    "",
    "## 학습 경로",
    "",
    "| 순서 | 주제 | 설명 |",
    "|------|------|------|",
  ];

  for (const section of navigation) {
    const order = sectionNumber(section.title);
    const topic = stripDisplayNumber(section.title);
    const description = WIKIDOCS_SECTION_DESCRIPTIONS.get(section.page.outputName) || "";
    lines.push(`| ${order} | ${topic} | ${description} |`);
  }

  return `${lines.join("\n")}\n`;
}

function buildToc(navigation) {
  const lines = ["# 목차", ""];

  for (const section of navigation) {
    lines.push(`- [${section.title}](pages/${section.page.outputName})`);
    for (const child of section.children) {
      lines.push(`  - [${child.title}](pages/${child.page.outputName})`);
    }
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
  pages.push(...(await collectVirtualSectionPages(pages)));
  pages.sort((a, b) => a.outputName.localeCompare(b.outputName));
  const wikidocsNavigation = buildWikidocsNavigation(pages);
  const pageMap = new Map(routeMapEntries);
  const assetMap = await copyAssets(pages);
  const warnings = [];

  await fs.writeFile(path.join(outputDir, "README.md"), buildReadme(wikidocsNavigation));
  await fs.writeFile(path.join(outputDir, "TOC.md"), buildToc(wikidocsNavigation));

  for (const page of pages) {
    const overrideDoc = await readOverrideDoc(page.outputName);
    const doc = overrideDoc || (await readMarkdownDoc(page.sourcePath));
    const rewrittenContent = stripWikidocsLocalMarkdownLinks(
      overrideDoc
        ? doc.content
        : await rewriteMarkdownLinks(doc.content, page.sourcePath, pageMap, assetMap, warnings)
    );
    const mergedSections = [];

    for (const child of page.children) {
      const childDoc = await readMarkdownDoc(child.sourcePath);
      const childRewritten = stripWikidocsLocalMarkdownLinks(
        await rewriteMarkdownLinks(childDoc.content, child.sourcePath, pageMap, assetMap, warnings)
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
