import type { Page } from '@playwright/test';

/** Skip the launch (it plays once per session) so tests can reach the page straight away. */
export async function skipLaunch(page: Page): Promise<void> {
  await page.addInitScript(() => window.sessionStorage.setItem('jaasim:launch-seen', '1'));
}
