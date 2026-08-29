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

Vitest is wired: `pnpm test` (once) or `pnpm test:watch`. Playwright is not
installed yet.

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
