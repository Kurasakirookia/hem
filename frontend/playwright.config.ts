import { defineConfig, devices } from '@playwright/test'

const PORT = process.env.WEB_PORT ?? '5174'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  expect: {
    toHaveScreenshot: {
      // Playwright defaults to threshold 0.2, which is a loose per-pixel colour
      // tolerance. It lets a real palette shift through unnoticed. 0.02 catches
      // subtle colour drift, and the pixel ratio still absorbs antialiasing.
      threshold: 0.02,
      maxDiffPixelRatio: 0.01,
    },
  },
  // Reuses the pm2 dev server if it is already up, otherwise starts one.
  webServer: {
    command: 'pnpm dev',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
  // Baselines are platform specific. Generate them with `pnpm baseline`,
  // which runs in the Playwright Docker image so they match everywhere.
  snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}',
})
