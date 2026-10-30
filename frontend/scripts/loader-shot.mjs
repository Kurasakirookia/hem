#!/usr/bin/env node
/** Frames from the first-visit loading screen. Fresh context each run, so the
 *  session flag is empty and the loader plays. */
import { mkdirSync, rmSync } from 'node:fs'
import { chromium } from '@playwright/test'

const out = new URL('../../.harness/shots/loader/', import.meta.url).pathname
rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(`http://localhost:${process.env.WEB_PORT ?? 5174}/`)
  for (let i = 0; i < 6; i += 1) {
    await page.screenshot({ path: `${out}${String(i).padStart(2, '0')}.png` })
    await page.waitForTimeout(330)
  }
} finally {
  await browser.close()
}
console.log(`loader shots: ${out}`)
