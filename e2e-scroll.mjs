import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto("http://localhost:3333/ko/modules/01-slash-commands/", { waitUntil: "load" });
await page.waitForTimeout(2000);

// Screenshot before scroll
await page.screenshot({ path: "e2e-scroll-before.png" });

// Try to get pager text
const pagerBefore = await page.locator('[data-testid="pager-bar"]').textContent().catch(() => null);
console.log("Pager BEFORE:", (pagerBefore || "not found").trim().slice(0, 60));

// Check if the scroll container exists and its dimensions
const scrollInfo = await page.evaluate(() => {
  const els = document.querySelectorAll(".overflow-y-auto");
  const results = [];
  els.forEach((el, i) => {
    results.push({
      index: i,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      scrollable: el.scrollHeight > el.clientHeight,
      className: el.className.slice(0, 80),
    });
  });
  return results;
});
console.log("Scroll containers:", JSON.stringify(scrollInfo, null, 2));

// Scroll using mouse wheel on the content area (center of page)
await page.mouse.move(640, 400);
for (let i = 0; i < 20; i++) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(150);
}

await page.waitForTimeout(500);

// Screenshot after scroll
await page.screenshot({ path: "e2e-scroll-after.png" });

// Get pager text after scroll
const pagerAfter = await page.locator('[data-testid="pager-bar"]').textContent().catch(() => null);
console.log("Pager AFTER:", (pagerAfter || "not found").trim().slice(0, 60));

// Also check window scroll position
const scrollPos = await page.evaluate(() => ({
  windowScrollY: window.scrollY,
  docScrollTop: document.documentElement.scrollTop,
  docScrollHeight: document.documentElement.scrollHeight,
  windowHeight: window.innerHeight,
}));
console.log("Window scroll:", JSON.stringify(scrollPos));

await browser.close();
console.log("Done!");
