import { chromium } from "playwright";

const BASE = "http://localhost:3333";
const results = [];

async function check(page, name, url, assertions) {
  try {
    await page.goto(url, { waitUntil: "load", timeout: 15000 });
    const errors = [];

    for (const [label, fn] of Object.entries(assertions)) {
      try {
        const ok = await fn(page);
        if (!ok) errors.push(label);
      } catch (e) {
        errors.push(`${label}: ${e.message.slice(0, 80)}`);
      }
    }

    if (errors.length === 0) {
      results.push(`✓ ${name}`);
      console.log(`✓ ${name} — ${url}`);
    } else {
      results.push(`✗ ${name}: ${errors.join(", ")}`);
      console.log(`✗ ${name} — ${errors.join(", ")}`);
    }
  } catch (e) {
    results.push(`✗ ${name}: ${e.message.slice(0, 100)}`);
    console.log(`✗ ${name} — ${e.message.slice(0, 100)}`);
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();

  console.log("\n🖥  Template E2E Verification (post-migration)\n");

  // ═══ 1. Root redirect ═══
  await check(page, "루트 → /ko/ 리다이렉트", BASE, {
    "리다이렉트 동작": async (p) => {
      await p.waitForTimeout(1000);
      return p.url().includes("/ko");
    },
  });

  // ═══ 2. Korean homepage ═══
  await check(page, "KO 홈페이지", `${BASE}/ko/`, {
    "제목 포함": async (p) => {
      const text = await p.textContent("body");
      return text.includes("터미널에서") || text.includes("Claude Code Guide");
    },
    "모듈 카드 10개": async (p) => {
      const text = await p.textContent("body");
      return text.includes("슬래시 명령어") && text.includes("CLI 레퍼런스");
    },
    "트래픽 라이트": async (p) => {
      const dots = await p.$$('.rounded-full');
      return dots.length >= 3;
    },
    "네비바 존재": async (p) => {
      return (await p.$("header")) !== null;
    },
    "언어 전환 버튼": async (p) => {
      const text = await p.textContent("header");
      return text.includes("EN");
    },
  });

  // ═══ 3. English homepage ═══
  await check(page, "EN 홈페이지", `${BASE}/en/`, {
    "페이지 로드": async (p) => {
      const text = await p.textContent("body");
      return text.includes("Claude Code Guide");
    },
    "KO 전환 버튼": async (p) => {
      const text = await p.textContent("header");
      return text.includes("KO");
    },
  });

  // ═══ 4. KO Module 01 ═══
  await check(page, "KO 모듈 01 (슬래시 명령어)", `${BASE}/ko/modules/01-slash-commands/`, {
    "콘텐츠 길이 > 500": async (p) => {
      const text = await p.textContent("body");
      return text.length > 500;
    },
    "사이드바 모듈 10개": async (p) => {
      const links = await p.$$('aside a[href*="/modules/"]');
      return links.length >= 10;
    },
    "터미널 헤더": async (p) => {
      const dots = await p.$$('.rounded-full');
      return dots.length >= 3;
    },
    "H1 또는 H2 존재": async (p) => {
      return (await p.$("h1, h2")) !== null;
    },
    "코드 블록 터미널 스타일": async (p) => {
      return (await p.$(".terminal-code-wrapper")) !== null;
    },
    "사이드바 링크 ko prefix": async (p) => {
      const link = await p.$('aside a[href*="/modules/"]');
      const href = await link.getAttribute("href");
      return href.startsWith("/ko/");
    },
  });

  // ═══ 5. EN Module 01 ═══
  await check(page, "EN 모듈 01 (Slash Commands)", `${BASE}/en/modules/01-slash-commands/`, {
    "영어 콘텐츠": async (p) => {
      const text = await p.textContent("article");
      return text.includes("Slash") || text.includes("command") || text.includes("Command");
    },
    "사이드바 en prefix": async (p) => {
      const link = await p.$('aside a[href*="/modules/"]');
      const href = await link.getAttribute("href");
      return href.startsWith("/en/");
    },
  });

  // ═══ 6. Subpage ═══
  await check(page, "KO 서브페이지 (commit)", `${BASE}/ko/modules/01-slash-commands/commit/`, {
    "article 존재": async (p) => (await p.$("article")) !== null,
    "콘텐츠 > 100자": async (p) => (await p.textContent("article")).length > 100,
  });

  // ═══ 7. Module 05 (MCP - has tables) ═══
  await check(page, "KO 모듈 05 (MCP 테이블)", `${BASE}/ko/modules/05-mcp/`, {
    "MCP 콘텐츠": async (p) => {
      const text = await p.textContent("body");
      return text.includes("MCP") || text.includes("Model Context Protocol");
    },
    "테이블 존재": async (p) => (await p.$$("table")).length >= 1,
  });

  // ═══ 8. 07-plugins nested subpages ═══
  await check(page, "KO 07-plugins/devops-automation", `${BASE}/ko/modules/07-plugins/devops-automation/`, {
    "article 존재": async (p) => (await p.$("article")) !== null,
    "DevOps 콘텐츠": async (p) => {
      const text = await p.textContent("article");
      return text.includes("DevOps") || text.includes("deploy") || text.includes("배포") || text.length > 200;
    },
  });

  await check(page, "EN 07-plugins/pr-review", `${BASE}/en/modules/07-plugins/pr-review/`, {
    "article 존재": async (p) => (await p.$("article")) !== null,
    "PR Review 콘텐츠": async (p) => {
      const text = await p.textContent("article");
      return text.includes("PR") || text.includes("review") || text.includes("Review");
    },
  });

  await check(page, "KO 07-plugins/documentation", `${BASE}/ko/modules/07-plugins/documentation/`, {
    "article 존재": async (p) => (await p.$("article")) !== null,
    "Documentation 콘텐츠": async (p) => (await p.textContent("article")).length > 100,
  });

  // ═══ 9. Mermaid diagram rendering ═══
  await check(page, "Mermaid 다이어그램 렌더링", `${BASE}/ko/modules/06-hooks/`, {
    "훅 콘텐츠": async (p) => {
      const text = await p.textContent("body");
      return text.includes("훅") || text.includes("Hook") || text.includes("hook");
    },
    "Mermaid SVG": async (p) => {
      await p.waitForTimeout(4000); // Mermaid client-side rendering
      const svg = await p.$("svg");
      return svg !== null;
    },
  });

  // ═══ 10. Image loading ═══
  await check(page, "이미지 경로 재작성", `${BASE}/ko/modules/01-slash-commands/`, {
    "img 태그 존재": async (p) => (await p.$$("article img")).length >= 1,
    "img src /images/ prefix": async (p) => {
      const img = await p.$("article img");
      if (!img) return false;
      const src = await img.getAttribute("src");
      return src && src.startsWith("/images/");
    },
  });

  // ═══ 11. Module index page ═══
  await check(page, "KO 모듈 인덱스", `${BASE}/ko/modules/`, {
    "기능 개요": async (p) => {
      const text = await p.textContent("body");
      return text.includes("기능 개요") || text.includes("학습 경로");
    },
    "비교 테이블": async (p) => (await p.$$("table")).length >= 1,
    "모듈 링크 ko prefix": async (p) => (await p.$('a[href*="/ko/modules/01"]')) !== null,
  });

  // ═══ 12. 404 page ═══
  await check(page, "404 페이지", `${BASE}/nonexistent-page/`, {
    "404 콘텐츠": async (p) => {
      const text = await p.textContent("body");
      return text.includes("404") || text.includes("Not Found") || text.includes("not found");
    },
  });

  // ═══ 13. All 10 modules — KO ═══
  const moduleSlugs = [
    "01-slash-commands", "02-memory", "03-skills", "04-subagents", "05-mcp",
    "06-hooks", "07-plugins", "08-checkpoints", "09-advanced-features", "10-cli",
  ];
  for (const slug of moduleSlugs) {
    await check(page, `KO ${slug}`, `${BASE}/ko/modules/${slug}/`, {
      "article": async (p) => (await p.$("article")) !== null,
      "콘텐츠 > 100자": async (p) => (await p.textContent("article")).length > 100,
    });
  }

  // ═══ 14. All 10 modules — EN ═══
  for (const slug of moduleSlugs) {
    await check(page, `EN ${slug}`, `${BASE}/en/modules/${slug}/`, {
      "article": async (p) => (await p.$("article")) !== null,
      "콘텐츠 > 100자": async (p) => (await p.textContent("article")).length > 100,
    });
  }

  // ═══ Screenshots ═══
  await page.goto(`${BASE}/ko/`, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "e2e-home.png", fullPage: false });
  console.log("\n📸 홈페이지: e2e-home.png");

  await page.goto(`${BASE}/ko/modules/01-slash-commands/`, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "e2e-module.png", fullPage: false });
  console.log("📸 모듈 페이지: e2e-module.png");

  await page.goto(`${BASE}/ko/modules/06-hooks/`, { waitUntil: "load" });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: "e2e-mermaid.png", fullPage: false });
  console.log("📸 Mermaid: e2e-mermaid.png");

  await browser.close();

  // Summary
  const passed = results.filter((r) => r.startsWith("✓")).length;
  const failed = results.filter((r) => r.startsWith("✗")).length;
  console.log(`\n═══ 결과: ${passed} 통과, ${failed} 실패 (총 ${results.length}) ═══\n`);

  if (failed > 0) {
    console.log("실패 목록:");
    results.filter((r) => r.startsWith("✗")).forEach((r) => console.log(`  ${r}`));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Fatal:", e.message);
  process.exit(1);
});
