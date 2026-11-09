import { expect, test } from '@playwright/test';
import { skipLaunch } from './helpers';

test.describe('hello', () => {
  test.beforeEach(async ({ page }) => skipLaunch(page));

  test('asks for a name and greets the visitor on Enter', async ({ page }) => {
    await page.goto('/');
    const field = page.getByLabel('Your first name');
    await field.fill('Priya');
    await field.press('Enter');
    await expect(page.getByText('Priya.')).toBeVisible();
    await expect(page.getByText('Hello,')).toBeVisible();
  });

  test('commits the name when the field loses focus and remembers it', async ({ page }) => {
    await page.goto('/');
    const field = page.getByLabel('Your first name');
    await field.fill('Sam');
    await field.blur();
    await expect(page.getByText('Sam.')).toBeVisible();
    await page.reload();
    await expect(page.getByText('Sam.')).toBeVisible();
  });

  test('strips characters that are not part of a name', async ({ page }) => {
    await page.goto('/');
    const field = page.getByLabel('Your first name');
    await field.fill('A1<b>d');
    await expect(field).toHaveValue('Abd');
  });
});

test('the launch plays once, writes the name, then hands over to Hello', async ({ page }) => {
  test.setTimeout(30_000);
  await page.goto('/');
  await expect(page.getByLabel('Your first name')).not.toBeFocused();
  await page.waitForTimeout(8_000);
  await expect(page.getByText('MOHAMED JAASIM').first()).toBeAttached();
  await expect(page.getByLabel('Your first name')).toBeFocused({ timeout: 6_000 });
  await page.reload();
  await expect(page.getByLabel('Your first name')).toBeVisible({ timeout: 2_000 });
});
