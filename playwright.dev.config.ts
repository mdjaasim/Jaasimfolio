import { defineConfig } from '@playwright/test';

/** Runs the same site through `next dev`, where React and next/image enforce extra rules that the production build skips. */
export default defineConfig({
  testDir: 'tests/dev',
  timeout: 120_000,
  webServer: {
    command: 'npx next dev -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  use: { baseURL: 'http://localhost:3000' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, hasTouch: true } },
  ],
});
