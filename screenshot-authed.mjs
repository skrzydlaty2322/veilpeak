import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const outDir = path.join(process.cwd(), "temporary screenshots");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function nextPath(label) {
  const files = fs.readdirSync(outDir).filter((f) => f.startsWith(label));
  return path.join(outDir, `${label}-${files.length + 1}.png`);
}

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Login
await page.goto("http://localhost:3000/admin/login", { waitUntil: "networkidle2" });
await page.type('input[type="password"]', "veilpeak2025");
await page.click('button[type="submit"]');
await page.waitForNavigation({ waitUntil: "networkidle2" });

const urls = [
  ["orders", "http://localhost:3000/admin/orders"],
  ["products", "http://localhost:3000/admin/products"],
];

for (const [label, url] of urls) {
  await page.goto(url, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 800));
  const p = nextPath(label);
  await page.screenshot({ path: p });
  console.log(`Screenshot saved: ${p}`);
}

// Screenshot products with modal open
await page.goto("http://localhost:3000/admin/products", { waitUntil: "networkidle2" });
await page.waitForSelector("button", { timeout: 5000 });
// Click "Add product" button
const buttons = await page.$$("button");
for (const btn of buttons) {
  const text = await btn.evaluate((el) => el.textContent);
  if (text && text.includes("Add product")) {
    await btn.click();
    break;
  }
}
await new Promise((r) => setTimeout(r, 500));
const modalPath = nextPath("products-modal");
await page.screenshot({ path: modalPath });
console.log(`Screenshot saved: ${modalPath}`);

await browser.close();
