import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser = await puppeteer.launch({
  executablePath: edgePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 1500));
await page.evaluate(() => window.scrollTo(0, 900));
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: path.join(dir, 'products-1.png') });
await page.evaluate(() => window.scrollTo(0, 1800));
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: path.join(dir, 'fullset-1.png') });
await browser.close();
console.log('Done');
