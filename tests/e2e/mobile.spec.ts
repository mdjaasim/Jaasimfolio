import { expect, test, type Page } from '@playwright/test';
import { skipLaunch } from './helpers';

test.describe('mobile frames', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 768, 'mobile project only');
  test.beforeEach(async ({ page }) => skipLaunch(page));

  const goTo = async (page: Page, screens: number) => {
    await page.evaluate((u) => window.scrollTo(0, window.innerHeight * u), screens);
    await page.waitForTimeout(1500);
  };

  test('the story plays as scroll-driven frames', async ({ page }) => {
    await page.goto('/');
    const checks: [number, string][] = [
      [3.6, 'Complex programs'],
      [8.6, 'Apps live'],
      [10.2, 'Borderless'],
      [14.4, 'Fuze'],
      [16.4, 'websites'],
      [18, "Let's build"],
    ];
    for (const [screens, text] of checks) {
      await goTo(page, screens);
      await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
    }
  });

  test('nothing overflows the screen sideways', async ({ page }) => {
    await page.goto('/');
    for (const u of [0, 1.5, 4, 10.2, 18]) {
      await goTo(page, u);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    }
  });

  test('the case study fits a phone', async ({ page }) => {
    await page.goto('/');
    await goTo(page, 10.2);
    await page.getByRole('button', { name: /Borderless/ }).click();
    const title = page.getByRole('dialog').getByRole('heading', { name: 'Borderless' });
    await expect(title).toBeVisible();
    const box = await title.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  });
});
