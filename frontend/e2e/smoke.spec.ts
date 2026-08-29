import { expect, test } from '@playwright/test'

/** Routes that must always render. Add each page here as it is built. */
const ROUTES = ['/']

for (const route of ROUTES) {
  test(`renders ${route} without console errors`, async ({ page }) => {
    // Arrange
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(err.message))

    // Act
    const res = await page.goto(route)

    // Assert
    expect(res?.status()).toBe(200)
    await expect(page.locator('body')).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('home matches its visual baseline', async ({ page }) => {
  // Arrange
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  // Act + Assert
  // Baselines are platform specific. Regenerate with `pnpm baseline`, which
  // runs in Docker so the result matches everywhere.
  await expect(page).toHaveScreenshot('home.png', { fullPage: true })
})
