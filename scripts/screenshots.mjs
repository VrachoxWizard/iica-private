import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("screenshots", { recursive: true });
const browser = await chromium.launch();

async function shot(url, name, width, closeModal = false) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  if (closeModal) {
    const close = page.locator(".close, button.close, [aria-label='Close']").first();
    if (await close.count()) {
      await close.click({ timeout: 2000 }).catch(() => {});
    }
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  await page.close();
}

await shot("http://localhost:3001/", "ours-home-full-1440", 1440, true);
await shot("http://localhost:3001/", "ours-home-full-375", 375, true);
await shot("https://iica-esg.com/", "live-home-full-1440", 1440, true);
await shot("https://iica-esg.com/", "live-home-full-375", 375, true);
await browser.close();
