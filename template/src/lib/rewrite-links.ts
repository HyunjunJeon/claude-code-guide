/**
 * Rewrites filesystem-relative markdown links to Next.js app routes.
 *
 * Examples:
 *   ../06-hooks/README.md        → /modules/06-hooks
 *   ../06-hooks/README.md#sec    → /modules/06-hooks#sec
 *   ./terminal-configuration.md  → /modules/{current}/terminal-configuration
 *   ./README.md                  → /modules/{current}
 *   ./README.md#sandboxing       → /modules/{current}#sandboxing
 *   ../../02-memory/             → /modules/02-memory
 *   ../../02-memory/README.md    → /modules/02-memory
 */
export function rewriteLink(href: string, currentModule?: string): string {
  // Skip external, anchor-only, and absolute links
  if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("/modules/")) {
    return href;
  }

  // Extract hash fragment
  const hashIdx = href.indexOf("#");
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
  const path = hashIdx >= 0 ? href.slice(0, hashIdx) : href;

  // Pattern: ../XX-module-name/README.md or ../XX-module-name/page.md
  const crossModuleMatch = path.match(
    /(?:\.\.\/)+(\d{2}-[a-z-]+)\/?(?:README\.md)?$/
  );
  if (crossModuleMatch) {
    return `/modules/${crossModuleMatch[1]}${hash}`;
  }

  // Pattern: ../XX-module-name/subpage.md
  const crossModuleSubMatch = path.match(
    /(?:\.\.\/)+(\d{2}-[a-z-]+)\/([^/]+)\.md$/
  );
  if (crossModuleSubMatch) {
    return `/modules/${crossModuleSubMatch[1]}/${crossModuleSubMatch[2]}${hash}`;
  }

  // Pattern: ./README.md (same module root)
  if (path === "./README.md" || path === "README.md") {
    return currentModule ? `/modules/${currentModule}${hash}` : href;
  }

  // Pattern: ./subpage.md (same module sub-page)
  const sameModuleMatch = path.match(/^\.\/([^/]+)\.md$/);
  if (sameModuleMatch) {
    return currentModule
      ? `/modules/${currentModule}/${sameModuleMatch[1]}${hash}`
      : href;
  }

  // Pattern: ../../02-memory/ (directory reference)
  const dirMatch = path.match(/(?:\.\.\/)+(\d{2}-[a-z-]+)\/?$/);
  if (dirMatch) {
    return `/modules/${dirMatch[1]}${hash}`;
  }

  // Pattern: subpage.md (bare filename, same module)
  const bareMatch = path.match(/^([^./][^/]*)\.md$/);
  if (bareMatch) {
    return currentModule
      ? `/modules/${currentModule}/${bareMatch[1]}${hash}`
      : href;
  }

  return href;
}
