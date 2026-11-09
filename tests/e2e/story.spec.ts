import { expect, test, type Page } from '@playwright/test';
import { skipLaunch } from './helpers';

test.beforeEach(async ({ page }) => skipLaunch(page));

const goTo = async (page: Page, screens: number) => {
  await page.evaluate((u) => window.scrollTo(0, window.innerHeight * u), screens);
  await page.waitForTimeout(1500);
};

test.describe('guided story (desktop)', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, 'mobile frames are covered separately');

  test('every chapter shows up as you scroll', async ({ page }) => {
    await page.goto('/');
    const checks: [number, string][] = [
      [3.6, 'Guidance'],
      [8.6, 'Apps live'],
      [10.2, 'Borderless'],
      [12.0, 'Story'],
      [14.6, 'Fuze'],
      [16.3, 'websites'],
      [17.95, "Let's build"],
    ];
    for (const [screens, text] of checks) {
      await goTo(page, screens);
      await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
    }
  });

  test('Index travels to a chapter', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Index' }).click();
    await page.getByRole('button', { name: /Work/ }).click();
    await expect(page.getByRole('button', { name: /Filozo/ })).toBeVisible({ timeout: 8000 });
  });

  test('a case study opens, slides to the next one, and closes with Esc', async ({ page }) => {
    await page.goto('/');
    await goTo(page, 10.2);
    await page.getByRole('button', { name: /Filozo/ }).click();
    const dialog = page.getByRole('dialog', { name: 'Filozo' });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('button', { name: /Work/ }).first()).toBeFocused();
    await dialog.getByRole('button', { name: /Next project/ }).click();
    await expect(page.getByRole('dialog', { name: 'Borderless' })).toBeVisible({ timeout: 4000 });
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden({ timeout: 4000 });
    await expect(page.getByRole('button', { name: /Borderless/ })).toBeVisible();
  });

  test('Contact links to email and copies the address', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await goTo(page, 18);
    await expect(page.getByRole('link', { name: /Say hello/ })).toHaveAttribute(
      'href',
      'mailto:479jaasim@gmail.com',
    );
    await page.getByRole('button', { name: '479jaasim@gmail.com' }).click();
    await expect(page.getByRole('status')).toHaveText('Copied');
  });

  test('scrolling stays smooth: no long tasks while moving through the story', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      (window as unknown as { __long: number[] }).__long = [];
      new PerformanceObserver((l) =>
        l
          .getEntries()
          .forEach((e) => (window as unknown as { __long: number[] }).__long.push(e.duration)),
      ).observe({ entryTypes: ['longtask'] });
    });
    const total = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight,
    );
    for (let i = 0; i <= 120; i++) {
      await page.mouse.wheel(0, total / 120);
      await page.waitForTimeout(20);
    }
    const long = await page.evaluate(() =>
      (window as unknown as { __long: number[] }).__long.filter((d) => d > 120),
    );
    expect(long).toEqual([]);
  });
});
