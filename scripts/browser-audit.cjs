const playwright = require(process.env.PLAYWRIGHT_MODULE || "playwright-core");
const assert = require("node:assert/strict");
const base = process.env.AUDIT_URL || "http://127.0.0.1:3149";

async function main() {
  const engine = process.env.BROWSER_ENGINE || "chromium";
  const channel = engine === "chromium" ? process.env.BROWSER_CHANNEL || "chrome" : undefined;
  const browser = await playwright[engine].launch({ channel, timeout: 90000 });
  try {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of ["/", "/menu", "/our-story", "/kinderhome", "/gallery", "/visit"]) {
      const response = await page.goto(base + route, { waitUntil: "domcontentloaded" });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('link[rel="canonical"]').count(), 1, route);
      for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
        await page.setViewportSize({ width, height: 850 });
        try {
          await page.waitForFunction(() => document.documentElement.scrollWidth <= innerWidth, null, { timeout: 3000 });
        } catch (error) {
          const overflowing = await page.evaluate(() => [...document.querySelectorAll("body *")]
            .filter(element => element.getBoundingClientRect().right > innerWidth + 1)
            .slice(0, 8).map(element => element.tagName + "." + element.className));
          throw new Error(route + " at " + width + "px overflows: " + overflowing.join(", "), { cause: error });
        }
      }
      console.log(route, "passed all nine width checks");
      if (route === "/") {
        const hero = page.locator("video").first();
        assert.ok(await hero.evaluate(video => video.paused && !!video.poster));
        await page.setViewportSize({ width: 390, height: 844 });
        await page.getByRole("button", { name: "Open navigation menu" }).click();
        await page.getByRole("button", { name: "Close menu", exact: true }).click();
        await page.getByRole("button", { name: "Open navigation menu" }).click();
        await page.getByRole("dialog", { name: "Mobile Navigation" }).getByRole("link", { name: /Our Story/i }).click();
        await page.waitForURL(base + "/our-story");
        await page.goBack();
        await page.waitForURL(base + "/");
      }
      if (route === "/menu") {
        const search = page.getByPlaceholder("Search dishes, drinks, or bakes...");
        await search.fill("espresso");
        await search.fill("");
        assert.ok(await page.getByText(/prices exclude VAT/i).count());
      }
      if (route === "/gallery") {
        await page.getByRole("button", { name: /View full size/ }).first().click();
        await page.getByRole("dialog", { name: "Image Lightbox" }).waitFor();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("Escape");
        assert.equal(await page.getByRole("dialog", { name: "Image Lightbox" }).count(), 0);
      }
      if (route === "/visit") assert.ok(await page.locator('a[href="tel:+2347070000046"]').count());
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
