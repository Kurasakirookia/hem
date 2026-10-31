# HEM Portfolio Site

A portfolio and services site for an event management group.

The work is frontend led. The look is modern and premium, carried by
typography, illustration, and motion. The backend is small on
purpose: FastAPI and Postgres, used only where a server is actually needed.

The site advertises and it proves, in equal measure. See Pages below.

One property matters more than the rest. A design decision changes in one
place and propagates everywhere. Every rule here protects that, or stops the
codebase from bloating.

## Writing style

Applies to everything written here: chat replies, docs, code comments, commit
messages, and site copy.

Use simple English. Short sentences. Natural tone. Direct phrasing.

Avoid contractions, corporate jargon, marketing language, hype, academic
explanations, long dashes, and the polished AI tone.

Humor is fine when it fits.

Keep paragraphs short. Keep filler low. Skip long introductions. Skip
unnecessary apologies. Say the thing, then stop.

## Documentation map

The docs in `docs/` hold the rules. This file does not repeat them, so that
there is only ever one copy to keep true. Read the relevant file before doing
that kind of work. Do not work from memory.

| Document | Read before | Owns the rules on |
|---|---|---|
| [`architecture.md`](docs/architecture.md) | Creating any file or folder, or touching the backend | Folder layout, where new code goes, import direction, barrel files, content placement, API calls and endpoints, ports, auth, backend growth, portability |
| [`naming-conventions.md`](docs/naming-conventions.md) | Naming any file, symbol, token, or table | File names, code casing, token names, backend names, routes |
| [`design-system.md`](docs/design-system.md) | Writing any styling, color, type, or motion | Tokens as the single source, the banned-literals list, adding a token, motion, component conventions |
| [`frontend-harness.md`](docs/frontend-harness.md) | Building any page or component from a reference | The screenshot loop, design references, the token gate, the inventory route, visual regression |
| [`deployment.md`](docs/deployment.md) | Touching hosting, CI deploy, secrets, or the domain | Where each part runs, how a deploy happens, secrets, rollback |
| [`testing.md`](docs/testing.md) | Writing or changing tests | Test layers, coverage targets, what not to test |
| [`engineering-principles.md`](docs/engineering-principles.md) | Adding a dependency, abstraction, or pattern | The ladder, standing bans, the dependency gate, sizing limits |

These are links, not `@` references. An `@path` loads every file into context
every session, which is the bloat this split exists to prevent.

If a task seems to need a documented rule broken, stop and raise it. That is
a design decision, not a drive-by edit.

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing advertisement. Illustration and typography carry it. Minimal copy. |
| `/events` | Past events and highlights. Gallery led. This is the proof. |
| `/services` | What the group sells. |

Not decided yet, so do not create these: About, Contact, per-event detail
routes such as `/events/:slug`.

## Commands

Everything runs from the repo root.

```bash
pnpm dev            # start everything: web :5174 + api :8001
pnpm logs           # tail all output
pnpm status         # what is running
pnpm restart        # restart both
pnpm stop           # stop and remove

pnpm build          # frontend production build
pnpm test           # frontend and backend suites
pnpm verify         # tokens, lint, typecheck, tests. the full gate.

pnpm shot /         # screenshot a route or a URL at 3 viewports
pnpm e2e            # playwright, including visual regression
pnpm e2e:update     # accept new baseline. only with human sign off.
```

The first group wraps pm2. The second group does not, because build and test
are one-shot tasks that exit. Under pm2 they would lose their exit code and
send output to a log file instead of your terminal.

For one process at a time, use pm2 directly: `pm2 logs hem-web`,
`pm2 restart hem-api`.

Dev ports and URLs live in `ecosystem.config.cjs`. Change one there and it
propagates. See [`architecture.md`](docs/architecture.md).
