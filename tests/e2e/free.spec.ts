import { expect, test } from '@playwright/test';
import { skipLaunch, startFree } from './helpers';

test.describe('free scroll', () => {
  test.beforeEach(async ({ page }) => {
    await skipLaunch(page);
    await startFree(page);
  });

  test('every chapter is an ordinary section reachable by scrolling', async ({ page }) => {
    await page.goto('/');
    for (const id of ['hello', 'craft', 'numbers', 'work', 'lab', 'path', 'about', 'contact']) {
      await expect(page.locator(`#chapter-${id}`)).toBeAttached();
    }
    await page.locator('#chapter-contact').scrollIntoViewIfNeeded();
    await expect(page.getByRole('link', { name: /Say hello/ })).toBeVisible();
    await expect(page.locator('header')).toHaveAttribute('data-tone', 'yellow');
  });

  test('the header turns light on dark chapters and back', async ({ page }) => {
    await page.goto('/');
    await page
      .locator('#chapter-craft')
      .evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 40));
    await expect(page.locator('header')).toHaveAttribute('data-tone', 'dark');
    await page
      .locator('#chapter-numbers')
      .evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 40));
    await expect(page.locator('header')).toHaveAttribute('data-tone', 'light');
  });

  test('Index travels to a chapter and the pace switch returns to the guided story', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Index' }).click();
    await page.getByRole('button', { name: /Path/ }).click();
    await expect(page.getByRole('heading', { name: 'ZYSI Tech' })).toBeInViewport({
      timeout: 6000,
    });
    await page.getByRole('button', { name: 'Index' }).click();
    await page.getByRole('button', { name: /^(guided|Guided)/i }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.locator('#chapter-craft')).toHaveCount(0);
  });

  test('numbers count up when they scroll into view', async ({ page }) => {
    await page.goto('/');
    await page.locator('#chapter-numbers').scrollIntoViewIfNeeded();
    await expect(page.getByLabel('4', { exact: true })).toHaveText('4', { timeout: 4000 });
  });

  test('a case study opens from the Work list', async ({ page }) => {
    await page.goto('/');
    await page.locator('#chapter-work').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: /Fuze/ }).click();
    await expect(page.getByRole('dialog', { name: 'Fuze' })).toBeVisible();
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('uses the free layout, no ball cursor, and a short launch', async ({ page }) => {
    const t0 = Date.now();
    await page.goto('/');
    await expect(page.getByLabel('Your first name')).toBeFocused({ timeout: 4000 });
    expect(Date.now() - t0).toBeLessThan(4000);
    await expect(page.locator('#chapter-craft')).toBeAttached();
    expect(await page.evaluate(() => document.documentElement.dataset.cursor)).toBeUndefined();
  });
});
