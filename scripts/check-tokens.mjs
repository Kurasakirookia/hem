#!/usr/bin/env node
/**
 * Gate: no literal design values inside components.
 *
 * Components must reference tokens, never bake in a value. This is what keeps
 * a token edit propagating everywhere. See docs/design-system.md.
 *
 * Escape hatch: put `token-exempt` in a comment on the same line. Use it
 * rarely, and say why.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const SCANNED = ['frontend/src/components', 'frontend/src/pages']
const EXTENSIONS = /\.(tsx|ts|css)$/

const RULES = [
  { name: 'hex color', re: /#[0-9a-fA-F]{3,8}\b/ },
  { name: 'rgb/hsl literal', re: /\b(rgb|rgba|hsl|hsla)\s*\(/ },
  { name: 'font-family', re: /font-family\s*:/ },
  { name: 'arbitrary tailwind value', re: /\b[a-z][a-z-]*-\[[^\]]+\]/ },
  { name: 'raw px value', re: /\b\d+(\.\d+)?px\b/ },
]

function walk(dir) {
  let out = []
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out // folder does not exist yet
  }
  for (const entry of entries) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out = out.concat(walk(full))
    else if (EXTENSIONS.test(entry)) out.push(full)
  }
  return out
}

const violations = []
for (const dir of SCANNED) {
  for (const file of walk(join(ROOT, dir))) {
    const lines = readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, i) => {
      if (line.includes('token-exempt')) return
      for (const rule of RULES) {
        if (rule.re.test(line)) {
          violations.push({
            file: relative(ROOT, file),
            line: i + 1,
            rule: rule.name,
            text: line.trim().slice(0, 90),
          })
        }
      }
    })
  }
}

if (violations.length === 0) {
  console.log('tokens: clean')
  process.exit(0)
}

console.error(`\ntokens: ${violations.length} literal value(s) found\n`)
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  ${v.rule}`)
  console.error(`    ${v.text}\n`)
}
console.error('Use a token from design-system/tokens.css, or add one.')
console.error('See docs/design-system.md. Escape hatch: a `token-exempt` comment.\n')
process.exit(1)
