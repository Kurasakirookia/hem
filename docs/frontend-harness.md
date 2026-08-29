# Frontend Harness

The gates that make a generated page match its reference, and keep it
matching. Read this before building a page or component from a design.

## The problem it solves

An agent writing UI works blind. It emits JSX, never sees the result, and has
no way to tell whether it matched the reference. Every gate here exists to
close that gap.

## Gate 1: see the output

```bash
pnpm shot /                     a local route
pnpm shot /inventory            ditto
pnpm shot https://example.com   an external reference
```

Screenshots land in `.harness/shots/<slug>/` at mobile 390, tablet 768, and
desktop 1440. The folder is gitignored. These are working images to look at,
not baselines.

The loop is: build, shoot, look at the image, compare against the reference,
fix, repeat. Do not skip the looking step. That is the entire point.

The same command captures an external URL, so it doubles as the reference
capture tool for sites.

## Gate 2: references live in the repo

One reference is a pair of files.

```
design/refs/hero.png    gitignored. binary, and often not ours to commit.
design/refs/hero.md     committed. small, and where the real value sits.
```

The spec is what survives. It records the source, so a URL can be recaptured
and a pasted image is at least accounted for. Work from the spec, not from
raw pixels. Start from `design/refs/_template.md`.

| Reference type | Capture path |
|---|---|
| Pasted image | Save it here, write the spec beside it |
| URL | `pnpm shot <url>`, then write the spec |
| Figma | Figma MCP returns real values rather than pixels. Prefer it. |

## Gate 3: automatic checks

Split by speed. A slow hook gets bypassed with `--no-verify` and then
protects nothing.

**Pre-commit, sub-second:** the token check and oxlint. Wired through git's
own `core.hooksPath` pointing at `.githooks/`, so there is no husky and no
dependency. Escape hatch for drafts is `git commit --no-verify`.

**On demand:** `pnpm verify` runs the token check, oxlint, typecheck, then
both unit suites.

The token check is `scripts/check-tokens.mjs`. It scans `components/` and
`pages/` for hex colours, rgb and hsl literals, font-family declarations,
arbitrary Tailwind values, and raw px. oxlint cannot express this rule, and
its custom rule support is experimental, so a small grep script does it
instead. Escape hatch is a `token-exempt` comment on the line. Use it rarely.

## Gate 4: the inventory route

`/inventory`, dev only. Registered behind `import.meta.env.DEV`, so the
branch and the page are dropped from the production bundle. Verified: the
build is byte-identical with and without it.

It does two jobs. It renders every design token, which makes the system
visible instead of theoretical. It lists every component with its variants
and states, so nobody rebuilds a Button that already exists, and so hover,
focus, disabled, and empty states become visible rather than forgotten.

Add a component by appending to `COMPONENTS` in `src/pages/Inventory.tsx`.

## Gate 5: visual regression

Commands come in pairs, one pair per environment. **Pick an environment and
stay in it.** Generating a baseline in one and comparing in the other
produces false diffs.

```bash
# host, fast, this machine only
pnpm e2e            run against the baselines
pnpm e2e:update     accept current output as the new baseline

# docker, slower, stable across machines and CI
pnpm e2e:docker     run against the baselines
pnpm baseline       accept current output as the new baseline
```

Baselines live in `frontend/e2e/__snapshots__/` and **are committed**. They
are the thing comparisons run against, so without them in git there is no
test. They are small and they are our own output, which is why they are the
exception to the no-images rule.

Two things to know.

**The default threshold is too loose.** Playwright defaults to `threshold:
0.2`, a per-pixel colour tolerance. A background changed from white to a soft
cream passed unnoticed under it. The config now sets `threshold: 0.02` with
`maxDiffPixelRatio: 0.01`, which catches subtle colour drift while still
absorbing antialiasing noise. Verified both ways: the cream change fails, the
revert passes.

**Baselines are platform specific.** Font rendering differs between
environments, so a baseline made in one can fail in another. Current
baselines were generated on the host, which is fine while this is a
one machine project.

Dockerising the app for deployment does not solve this. What solves it is
generating and comparing in the same environment. When CI or a second machine
joins, switch to the docker pair: run `pnpm baseline` once to regenerate, then
use `pnpm e2e:docker` from then on. Do not mix the pairs.

The docker path has not been exercised on this machine yet, because the
Playwright image is a multi-gigabyte pull. Expect the first run to be slow.

## When to run which gate

Gates should scale to blast radius. Running everything on a typo is waste.

| What changed | Token check | Unit tests | Screenshot loop | Visual regression |
|---|---|---|---|---|
| New component from a reference | yes | if it has logic | yes, full loop | create a baseline |
| A token value | yes | no | no | yes, all of them. This is the case it exists for. |
| Logic, hook, or util | yes | yes | no | no |
| Copy or content | yes | no | no | affected routes only |
| Refactor with no visual intent | yes | yes | no | yes, to prove nothing moved |
| Backend only | no | pytest | no | no |
