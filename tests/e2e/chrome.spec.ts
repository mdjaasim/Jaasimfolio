import { expect, test } from '@playwright/test';
import { skipLaunch } from './helpers';

test.beforeEach(async ({ page }) => skipLaunch(page));

test('index overlay opens, traps Esc, and restores focus', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Index' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Index' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('free scroll preference persists across reloads', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Index' }).click();
  await page.getByRole('button', { name: /^free/i }).click();
  await expect(page.getByRole('button', { name: /^free/i })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.reload();
  await page.getByRole('button', { name: 'Index' }).click();
  await expect(page.getByRole('button', { name: /^free/i })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('unknown routes show the 404 scene with a way home', async ({ page }) => {
  await page.goto('/does-not-exist/');
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  await page.getByRole('link', { name: 'Back home' }).click();
  await expect(page).toHaveURL('/');
});
