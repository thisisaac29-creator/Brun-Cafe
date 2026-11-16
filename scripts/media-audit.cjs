const assert = require("node:assert/strict");
const playwright = require(process.env.PLAYWRIGHT_MODULE || "playwright-core");
const base = process.env.AUDIT_URL || "http://127.0.0.1:3163";

async function check() {
  const engine = process.env.BROWSER_ENGINE || "chromium";
  const channel = engine === "chromium" ? process.env.BROWSER_CHANNEL || "chrome" : undefined;
  const browser = await playwright[engine].launch({ channel });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const requests = new Set();
    page.on("request", request => {
      const path = new URL(request.url()).pathname;
      if (path.endsWith(".mp4")) requests.add(path);
    });
    await page.goto(base, { waitUntil: "domcontentloaded" });
    const videos = page.locator("main video");
    const moving = video => !video.paused && video.currentTime > 0;
    await page.waitForFunction(moving, await videos.first().elementHandle());
    const expectedHero = "/video/brun-hero-interior-mobile.mp4";
    assert.equal(await videos.first().evaluate(video => new URL(video.currentSrc).pathname), expectedHero);
    if (engine !== "webkit" || requests.size) assert.deepEqual([...requests], [expectedHero]);
    for (const offscreen of (await videos.all()).slice(1)) {
      assert.ok(await offscreen.evaluate(video => video.paused && video.readyState === 0));
    }
    assert.equal(await videos.count(), 4);
    await page.getByRole("button", { name: "Pause cinematic footage" }).click();
    assert.ok(await videos.first().evaluate(video => video.paused));
    for (const name of [/Coffee & Pastries/, /The Bakery Hearth/]) {
      await page.getByRole("button", { name }).click();
      await page.waitForFunction(moving, await videos.first().elementHandle());
    }
    for (const video of (await videos.all()).slice(1)) {
      await video.evaluate(el => el.scrollIntoView({ block: "center", behavior: "instant" }));
      await page.waitForFunction(moving, await video.elementHandle());
      assert.ok(await video.evaluate(el => el.poster.length > 0));
    }
    assert.ok(await videos.first().evaluate(video => video.paused));
    const featured = page.locator("section").filter({ has: page.getByRole("button", { name: "All Signatures" }) });
    const headings = featured.locator("h3");
    const before = await headings.count();
    await featured.getByRole("button", { name: "Coffee & Drinks" }).click();
    await page.waitForFunction(count => {
      const section = [...document.querySelectorAll("section")].find(el => el.textContent.includes("All Signatures"));
      return section && section.querySelectorAll("h3").length < count;
    }, before);
    assert.ok(await headings.count() > 0);
    await page.locator("[data-map-viewport]").scrollIntoViewIfNeeded();
    await page.locator('iframe[title*="Google Maps"][src^="https://maps.google.com/"]').waitFor();
    console.log("Featured filtering and nearby map activation passed");
    console.log("Mobile playback, switcher, pause and all three lower-page videos passed", [...requests]);
    await page.close();
    const saved = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await saved.addInitScript(() => Object.defineProperty(navigator, "connection", { value: { saveData: true } }));
    let transferred = false;
    saved.on("request", request => { if (request.url().includes(".mp4")) transferred = true; });
    await saved.goto(base);
    await saved.waitForFunction(() => sessionStorage.getItem("brun_loader_seen"));
    assert.equal(transferred, false);
    await saved.getByRole("button", { name: "Play cinematic footage" }).click();
    await saved.waitForFunction(moving, await saved.locator("video").first().elementHandle());
    console.log("Save-Data respected and explicit playback passed");
  } finally {
    await browser.close();
  }
}
check().catch(error => { console.error(error); process.exitCode = 1; });

