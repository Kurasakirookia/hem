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
  // motion=off freezes GSAP into its finished state. Playwright disables CSS
  // animations on its own but cannot touch JavaScript-driven ones, so without
  // this the screenshot lands on a random animation frame and the test is
  // flaky. It also skips the first-visit loading screen.
  await page.goto('/?motion=off')
  await page.waitForLoadState('networkidle')

  // Act + Assert
  // Baselines are platform specific. Current ones come from the host pair:
  // regenerate with `pnpm e2e:update`. Do not mix in `pnpm baseline`, the
  // docker pair. See docs/frontend-harness.md.
  await expect(page).toHaveScreenshot('home.png', { fullPage: true })
})
