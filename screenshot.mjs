import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const url    = process.argv[2] || 'http://localhost:3000';
const label  = process.argv[3] || 'screenshot';
const mobile = process.argv[3] === 'mobile';

let n = 1;
while (fs.existsSync(path.join(dir, `${label}-${n}.png`))) n++;
const outPath = path.join(dir, `${label}-${n}.png`);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const browser = await puppeteer.launch({
  executablePath: edgePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();

if (mobile) {
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
} else {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
}

await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();

console.log('Screenshot saved:', outPath);
