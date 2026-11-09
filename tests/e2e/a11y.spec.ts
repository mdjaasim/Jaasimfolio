import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { skipLaunch, startFree } from './helpers';

const audit = async (page: Page) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  return results.violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`,
  );
};

test.beforeEach(async ({ page }) => skipLaunch(page));

test('guided story has no detectable accessibility violations at each chapter', async ({
  page,
  viewport,
}) => {
  test.slow();
  await page.goto('/');
  for (const u of [0, 2.2, 4.4, 8.6, 10.2, 12, 14.6, 16.3, 18]) {
    await page.evaluate((s) => window.scrollTo(0, window.innerHeight * s), u);
    await page.waitForTimeout(1300);
    expect(await audit(page), `u=${u} @${viewport?.width}`).toEqual([]);
  }
});

test('free scroll has no detectable accessibility violations', async ({ page }) => {
  test.slow();
  await startFree(page);
  await page.goto('/');
  await page.waitForTimeout(500);
  for (const id of ['hello', 'craft', 'numbers', 'work', 'lab', 'path', 'about', 'contact']) {
    await page.locator(`#chapter-${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    expect(await audit(page), id).toEqual([]);
  }
});

test('overlays have no detectable accessibility violations', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Index' }).click();
  await page.waitForTimeout(1500);
  expect(await audit(page), 'index').toEqual([]);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 10.2));
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: /Filozo/ }).click();
  await page.waitForTimeout(1800);
  expect(await audit(page), 'case').toEqual([]);
});

test('404 has no detectable accessibility violations', async ({ page }) => {
  await page.goto('/nope/');
  await page.waitForTimeout(1200);
  expect(await audit(page)).toEqual([]);
});
