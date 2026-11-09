import { expect, test, type Page } from '@playwright/test';

/** Collects everything the browser would show a developer in the console while using the site. */
function watch(page: Page) {
  const problems: string[] = [];
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    const text = m.text();
    if (m.type() !== 'error' && m.type() !== 'warning') return;
    // Dev server only: it preloads the stylesheets of code-split overlays and the error page. The production build does not.
    if (text.includes('was preloaded using link preload but not used')) return;
    // next/image guesses LCP from whatever is largest after the test scrolls to a section; these photos are lazy on purpose.
    if (text.includes('was detected as the Largest Contentful Paint')) return;
    // The 404 test visits a missing page on purpose.
    if (text.includes('status of 404') && page.url().includes('does-not-exist')) return;
    problems.push(`${m.type()}: ${text.slice(0, 300)}`);
  });
  page.on('response', (r) => {
    if (r.status() >= 400 && !r.url().includes('does-not-exist'))
      problems.push(`HTTP ${r.status()} ${r.url()}`);
  });
  return problems;
}

const settle = (page: Page, ms = 1300) => page.waitForTimeout(ms);

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('jaasim:launch-seen', '1'));
});

test('no console errors or warnings while moving through the whole guided story', async ({
  page,
}) => {
  const problems = watch(page);
  await page.goto('/');
  await settle(page, 2500);
  for (const u of [
    0, 1.2, 2.2, 3.6, 4.4, 5.4, 6.4, 7.5, 8.6, 9.6, 10.2, 11.5, 12.6, 14, 14.6, 15.6, 16.3, 17, 18,
  ]) {
    await page.evaluate((s) => window.scrollTo(0, window.innerHeight * s), u);
    await settle(page);
  }
  expect(problems).toEqual([]);
});

test('no console errors in overlays, the name field and the 404', async ({ page }) => {
  const problems = watch(page);
  await page.goto('/');
  await settle(page, 2500);
  await page.getByLabel('Your first name').fill('Priya');
  await page.getByLabel('Your first name').press('Enter');
  await settle(page);
  await page.getByRole('button', { name: 'Index' }).click();
  await settle(page, 1800);
  await page.keyboard.press('Escape');
  await settle(page, 1200);
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 10.2));
  await settle(page, 1800);
  await page.getByRole('button', { name: /Filozo/ }).click();
  await settle(page, 1800);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: /Next project/ })
    .click();
  await settle(page, 2200);
  await page.keyboard.press('Escape');
  await settle(page, 1500);
  await page.goto('/does-not-exist/');
  await settle(page, 1500);
  expect(problems).toEqual([]);
});

test('no console errors in free scroll', async ({ page }) => {
  const problems = watch(page);
  await page.addInitScript(() => localStorage.setItem('jaasim:mode', 'free'));
  await page.goto('/');
  await settle(page, 2500);
  for (const id of ['hello', 'craft', 'numbers', 'work', 'lab', 'path', 'about', 'contact']) {
    await page.locator(`#chapter-${id}`).scrollIntoViewIfNeeded();
    await settle(page, 900);
  }
  await page.locator('#chapter-work').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /Fuze/ }).click();
  await settle(page, 1800);
  expect(problems).toEqual([]);
});

test('no console errors during the launch and under reduced motion', async ({ page, browser }) => {
  const problems = watch(page);
  await page.addInitScript(() => sessionStorage.removeItem('jaasim:launch-seen'));
  await page.goto('/');
  await page.waitForTimeout(10_500);
  expect(problems).toEqual([]);

  const ctx = await browser.newContext({
    reducedMotion: 'reduce',
    baseURL: 'http://localhost:3000',
  });
  const rm = await ctx.newPage();
  const rmProblems = watch(rm);
  await rm.goto('/');
  await rm.waitForTimeout(2500);
  expect(rmProblems).toEqual([]);
  await ctx.close();
});
