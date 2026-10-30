#!/usr/bin/env node
/**
 * Screenshot a route at several scroll positions, so scroll-driven motion can
 * actually be looked at. `pnpm shot` only captures a static full page, which
 * says nothing about what happens while scrolling.
 *
 *   pnpm shot:scroll /                   6 frames down the page
 *   pnpm shot:scroll / stacked-cards     frames around one element
 *
 * The second argument is a data-testid. When given, frames are taken around
 * that element instead of spread over the whole page.
 */
import { mkdirSync, rmSync } from 'node:fs'
import { chromium } from '@playwright/test'

const route = process.argv[2] ?? '/'
const testid = process.argv[3]
const FRAMES = 6
const SETTLE = 900

const url = `http://localhost:${process.env.WEB_PORT ?? 5174}${route}`
const slug = (testid ?? (route.replace(/^\//, '') || 'home')).replace(/[^a-z0-9]+/gi, '-')
const out = new URL(`../../.harness/shots/scroll-${slug}/`, import.meta.url).pathname

rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(4500) // let any loading screen finish

  let start = 0
  let step = 0
  if (testid) {
    const box = await page.locator(`[data-testid="${testid}"]`).boundingBox()
    if (!box) throw new Error(`no element with data-testid="${testid}"`)
    console.log(`${testid}: y=${Math.round(box.y)} height=${Math.round(box.height)}`)
    start = Math.max(0, box.y - 500)
    step = (box.height + 900) / (FRAMES - 1)
  } else {
    const height = await page.evaluate(() => document.body.scrollHeight)
    step = (height - 900) / (FRAMES - 1)
  }

  for (let i = 0; i < FRAMES; i += 1) {
    const y = Math.round(start + i * step)
    await page.evaluate((v) => window.scrollTo(0, v), y)
    await page.waitForTimeout(SETTLE)
    await page.screenshot({ path: `${out}${String(i).padStart(2, '0')}-y${y}.png` })
    console.log(`  frame ${i}  scrollY ${y}`)
  }
} finally {
  await browser.close()
}
console.log(`\nscroll shots: ${out}`)
