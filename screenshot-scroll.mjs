import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'temporary screenshots');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const browser = await puppeteer.launch({
  executablePath: edgePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

// Use 'domcontentloaded' to avoid HMR re-navigations blocking us
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
await new Promise(r => setTimeout(r, 4000));  // Give React/Framer time to mount

const scrollSteps = [
  { scroll: 900, label: 'manifesto-header' },
  { scroll: 1900, label: 'manifesto-grid' },
  { scroll: 2900, label: 'manifesto-pillars' },
  { scroll: 3800, label: 'manifesto-cta' },
];

for (const { scroll, label } of scrollSteps) {
  // Re-evaluate scroll each time in case page is still valid
  const ok = await page.evaluate((y) => {
    window.scrollTo({ top: y, behavior: 'instant' });
    return true;
  }, scroll).catch(() => false);

  if (!ok) { console.log('scroll failed at', scroll); continue; }
  await new Promise(r => setTimeout(r, 800));

  const out = path.join(outDir, `${label}.png`);
  await page.screenshot({ path: out }).catch(e => console.log('shot err', e.message));
  console.log('Saved:', out);
}

await browser.close();
