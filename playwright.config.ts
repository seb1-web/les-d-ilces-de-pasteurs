import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  retries: 0,
  outputDir: 'artifacts/e2e/results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'artifacts/e2e/report', open: 'never' }],
    ['json', { outputFile: 'artifacts/e2e/results.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    channel: 'chrome',
    headless: true,
    viewport: { width: 1440, height: 1000 },
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
