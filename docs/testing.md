# Testing

## Layers

| Layer | Tool | Location | Covers |
|---|---|---|---|
| Unit | Vitest | `*.test.ts` beside source | `lib/`, `hooks/`, pure logic |
| E2E | Playwright | `frontend/e2e/*.spec.ts` | Real user flows in a real browser |
| Backend | pytest | `backend/tests/` | Endpoints, validation, DB behaviour |

## Coverage

**80% minimum on logic**: `lib/`, `hooks/`, and the whole backend.

Presentational components are covered by Playwright instead of unit tests.
Chasing line coverage on JSX produces brittle tests that break on every
design change and protect nothing. On a design-led site the browser is the
only honest assertion.

Everything runs from the repo root. `pnpm verify` is the full gate:
token check, lint, typecheck, then both unit suites.

## CI

`.github/workflows/ci.yml` runs on every push to `main` and every pull
request. Three jobs run in parallel. Any failed step fails the run.

| Job | Steps, in order | Catches |
|---|---|---|
| frontend | frozen install, token gate, oxlint, typecheck, Vitest with coverage, build, `pnpm audit` | Lockfile drift, literal design values, lint and type errors, untested logic, broken builds, vulnerable dependencies |
| backend | frozen install, `ruff check`, `ruff format --check`, pytest with coverage, `pip-audit` | Lockfile drift, lint and format issues, broken endpoints, untested code, vulnerable dependencies |
| e2e | Playwright smoke tests in the Playwright Docker image | Pages that fail to load or throw console errors |

Coverage is enforced, not reported. Vitest's thresholds live in
`vite.config.ts`, pytest's `fail_under` in `pyproject.toml`. Both are 80%.
Raise a gap with a test, never by lowering the number.

The audits fail on high and critical findings only.

**The visual baseline does not run in CI yet.** See Gate 5 in
[`frontend-harness.md`](frontend-harness.md) for why, and how to turn it on.

Dependabot opens grouped update pull requests weekly for npm, uv and GitHub
Actions. See `.github/dependabot.yml`.

Locally, `pnpm verify` covers most of the frontend and backend jobs. It does
not run coverage, the build or the audits.

## Approach

Follow TDD for logic and endpoints:

1. Write the failing test (RED)
2. Minimal implementation (GREEN)
3. Refactor (IMPROVE)

Structure every test as Arrange–Act–Assert, and name it after the behaviour:

```ts
test('falls back to the event date when no slug is present', () => {})
test('returns 422 when the contact form email is malformed', () => {})
```

## What Playwright covers

- Every route renders without error
- Navigation works, including browser back
- The contact form submits and shows validation errors
- Mobile viewport is not broken
- No console errors on any page

Select with `data-testid`, never with class names. Classes change with every
restyle. See [`naming-conventions.md`](naming-conventions.md).

## Do not write

- Snapshot tests of markup
- Tests asserting class names or token values
- A test per prop combination
- Tests for framework behaviour (that React renders, that the router routes)

Test behaviour, not styling. A test that breaks when the design changes but
the behaviour does not is a liability.

## Backend specifics

- Test the endpoint through `TestClient`, not the function directly. That is
  what covers validation, status codes, and serialisation.
- Assert on status code **and** payload shape.
- Every validation rule gets a rejection test, not just a happy path.
