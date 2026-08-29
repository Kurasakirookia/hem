#!/usr/bin/env node
/**
 * Screenshot a route or an external URL at three viewports.
 *
 *   pnpm shot /                     a local route on the dev server
 *   pnpm shot /events               ditto
 *   pnpm shot https://example.com   an external reference
 *
 * Output lands in .harness/shots/ and is gitignored. These are working
 * images for looking at, not baselines. Baselines live with the e2e tests.
 */
import { mkdirSync, rmSync } from 'node:fs'
import { chromium } from '@playwright/test'

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

const target = process.argv[2]
if (!target) {
  console.error('usage: pnpm shot <route|url>   e.g. pnpm shot /  or  pnpm shot https://example.com')
  process.exit(1)
}

const isExternal = /^https?:\/\//.test(target)
const url = isExternal ? target : `http://localhost:${process.env.WEB_PORT ?? 5174}${target}`

const slug =
  (isExternal ? new URL(target).hostname : target.replace(/^\//, '') || 'home')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()

const outDir = new URL('../../.harness/shots/', import.meta.url).pathname
rmSync(`${outDir}${slug}`, { recursive: true, force: true })
mkdirSync(`${outDir}${slug}`, { recursive: true })

const browser = await chromium.launch()
try {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
    // Let entry animations settle so the shot is not caught mid-transition.
    await page.waitForTimeout(600)
    const file = `${outDir}${slug}/${vp.name}.png`
    await page.screenshot({ path: file, fullPage: true })
    await page.close()
    console.log(`  ${vp.name.padEnd(8)} ${file}`)
  }
} finally {
  await browser.close()
}
console.log(`\nshot: ${url}`)
