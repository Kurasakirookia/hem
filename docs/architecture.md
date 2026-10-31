# Architecture

How this repo is laid out and where new code goes. Read before creating any
file or folder.

## Tree

```
hem/
├── CLAUDE.md                    # index + non-negotiables
├── ecosystem.config.cjs         # pm2 manifest: every dev process, ports, URLs
├── docs/                        # this folder
├── .agents/skills/              # design skills the harness loads
│
├── frontend/                    # Vite 8 · React 19 · TS 6 · Tailwind 4
│   ├── public/fonts/            # self-hosted woff2
│   ├── e2e/                     # Playwright specs
│   └── src/
│       ├── design-system/
│       │   ├── tokens.css       # ← SINGLE SOURCE OF TRUTH
│       │   ├── theme.css        # tokens → Tailwind utilities
│       │   ├── base.css         # element defaults
│       │   └── motion.ts        # GSAP-side mirror of motion tokens
│       ├── components/
│       │   ├── atoms/           # Button Text Heading Icon Input Divider
│       │   ├── molecules/       # Card FormField NavLink EventTile
│       │   ├── sections/        # Navbar Footer Hero EventGrid ServiceList
│       │   └── motion/          # gsap SmoothScroll Reveal
│       ├── pages/               # one file per route
│       ├── content/             # copy + event data as typed TS
│       ├── hooks/
│       ├── lib/                 # api.ts cn.ts
│       ├── types/
│       ├── routes.tsx  App.tsx  main.tsx  index.css
│
└── backend/                     # FastAPI · SQLAlchemy 2 · psycopg3 (uv)
    ├── app/  main.py config.py db.py models.py
    ├── tests/
    └── .env.example
```

## Running it

pm2 manages every dev process from one manifest. The root `package.json`
wraps the common calls, so everything runs from the repo root:

```bash
pnpm dev     # pm2 start ecosystem.config.cjs
pnpm logs    # pm2 logs
pnpm status  # pm2 list
pnpm stop    # pm2 delete ecosystem.config.cjs
```

Use pm2 directly when you want one process rather than all of them:
`pm2 logs hem-web`, `pm2 restart hem-api`.

One-shot tasks stay out of pm2. `pnpm build`, `pnpm test`, and `pnpm e2e` run
in the foreground, because a task that exits does not belong to a process
manager. Under pm2 they would return no exit code and write their output to a
log file, so a failing test would look like a success.

The root `package.json` holds scripts only. It declares no dependencies, so
there is no `node_modules` at the root.

**The filename must end in `.config.cjs`.** pm2 only treats a file as a
manifest if it matches `*.config.{js,cjs,mjs}`, `.json`, or `.yaml`. Named
`ecosystem.cjs`, pm2 silently runs it as a plain node script and you get one
process called "ecosystem" instead of your apps.

### Adding a process

Append an entry to `apps` in the manifest, spreading `base`:

```js
{ ...base, name: 'hem-worker', cwd: './backend', script: 'uv',
  args: 'run python -m app.worker', out_file: log('worker.log') }
```

Postgres is the exception. It joins as a Docker Compose service, not a pm2
app. It is a daemon with its own lifecycle, not a watch process.

### Why the manifest is configured the way it is

| Setting | Reason |
|---|---|
| `interpreter: 'none'` | `uv` and `pnpm` are binaries, not JS. Without this pm2 hands them to node and they die instantly. |
| `watch: false` | Vite and uvicorn own their reload. pm2 watching too causes double restarts. |
| `min_uptime: '5s'` + `max_restarts: 5` | A process that dies instantly (port taken, bad config) stops after 5 tries instead of looping forever. |
| `time: true` | Timestamps every log line. |
| Ports as consts at the top | `vite.config.ts` reads `WEB_PORT`/`API_PORT` from the env pm2 passes; the backend reads `CORS_ORIGINS`. One edit changes the port everywhere. |

Ports are **5174** (web) and **8001** (api), deliberately off the 5173/8000
defaults so HEM does not fight other projects on the same machine.

Logs land in `logs/` at the repo root (gitignored). uvicorn writes to stderr,
so backend output is in `api.error.log`. That is normal, not an error.

A bare `pnpm dev` still works without pm2; `vite.config.ts` falls back to the
same default ports.

### Why routes survive a port change

`ecosystem.config.cjs` owns the ports, but it is **not** what keeps routes
working when you change one. That comes from `lib/api.ts` using relative
paths:

```ts
api('/events')                              // resolves against the page origin
fetch('http://localhost:8001/api/events')   // breaks on the next port edit
```

The browser resolves `/api/events` against whatever origin the page is
served from, so the frontend never knows the backend's port exists. Vite's
proxy forwards it in dev; a reverse proxy will forward it in production.

**Rule: every frontend request goes through `api()` from `@/lib/api`.** No
absolute URLs, no `import.meta.env.VITE_API_URL`, no ports in component code.
Break this and editing the manifest silently stops propagating. The call
keeps working in dev, because today's port happens to match.

### The endpoint registry

Relative paths solve the *origin* drifting. They do not solve the *path*
drifting: rename `/api/events` on the backend and the frontend keeps calling
the old one until a user finds it.

`ENDPOINTS` in `lib/api.ts` is the fix. Every backend path is declared once,
and `api()` only accepts a value from it:

```ts
export const ENDPOINTS = { health: '/health' } as const
type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS]
export async function api<T>(path: Endpoint, init?: RequestInit): Promise<T>
```

A typo or a stale path is a **compile error**, so `pnpm build` fails instead
of shipping it:

```
error TS2345: Argument of type '"/helth"' is not assignable to
parameter of type '"/health"'.
```

Renaming a route is now one edit here, and TypeScript points at every caller.

**Why not env vars or a YAML file for this:** env is for what differs
*between environments*: DB URL, secrets, log level. A route path is
identical in dev and prod, so putting it in env only creates a way for it to
be wrong in one of them. YAML read at runtime gives no type checking at all,
which is the entire benefit being sought.

**Upgrade path.** FastAPI already publishes an OpenAPI schema at
`/api/openapi.json`. Once there are roughly five or more endpoints, or the
first time a response *shape* change breaks the frontend, generate the client
instead of hand-maintaining it:

```
pnpm add -D openapi-typescript      # types from the live schema
pnpm add openapi-fetch              # typed client over them
```

That extends the compile-time guarantee from paths to request and response
bodies. It is not worth a codegen step for one endpoint. Add it at the
threshold, not before.

This is also what keeps deployment open. Serve the static frontend and the
API under one origin behind a reverse proxy and relative paths keep working
unchanged. Split them across two origins and you need a base URL and CORS,
which is a decision to make deliberately, not to drift into.

## Why Vite, not Next

FastAPI owns the backend, so Next's server half is dead weight, and GSAP /
react-three-fiber are simpler without SSR hydration fights. The cost is no
SSR for SEO. That is solvable later with `vite-plugin-prerender`, since every page
is static content.

## Why Tailwind 4, not 3

v4 config is CSS-first: `@theme` reads the token file directly. That is the
propagation mechanism. There is no JS config duplicating the palette.

## Where things go

Consult this before creating any file. If the answer is "nowhere obvious",
that is a signal the thing may not need to exist.

| You need to add | It goes in |
|---|---|
| A color, size, font, radius, duration | `design-system/tokens.css`, nowhere else |
| A styled primitive with no business meaning | `components/atoms/` |
| 2–4 atoms composed into a reusable unit | `components/molecules/` |
| A full-width band of a page | `components/sections/` |
| A reusable animation behaviour | `components/motion/` |
| A route | `pages/` + one line in `routes.tsx` |
| Event copy, service descriptions, testimonials | `content/`, never inline in JSX |
| A shared pure function | `lib/` |
| Stateful reusable logic | `hooks/` |
| A server endpoint | `backend/app/main.py` until it is too big (see below) |

## Import rules

- Always `@/` for cross-folder imports (`@/components/atoms/Button`).
  Relative paths only within the same folder.
- **No barrel `index.ts` files.** They break tree-shaking and turn a one-line
  change into a five-file diff. Import from the source file.
- Dependency direction is one-way: `atoms → molecules → sections → pages`.
  An atom must never import a molecule. Nothing imports from `pages/`.
- Nothing outside `design-system/` and `content/` holds a literal value.

## What was deliberately left out

Not oversights. Add them when the stated trigger fires, not before.

| Omitted | Add when |
|---|---|
| `organisms/`, `templates/` | Never. It is atomic-design ceremony. `sections/` is what this site has. |
| `store/` (Redux/Zustand) | React state and router loaders stop being enough |
| Per-domain `services/`, `api/` folders | `lib/api.ts` serves more than a handful of endpoints |
| Barrel `index.ts` files | Never |

## Backend

It exists for what genuinely needs a server. Right now: a health check.
Likely next: a contact form, then event content.

- **Config:** everything through `app/config.py` (pydantic-settings). A
  missing secret fails at **startup**, not at first request. No secret ever
  in source; mirror every variable in `.env.example`.
- **Validation:** every request body is a Pydantic schema. Never trust a
  payload.
- **Sessions:** always via the `get_db` dependency. Never construct a session
  inside a route.
- **Errors:** raise `HTTPException` with a safe message. Log detail
  server-side; never leak a stack trace or SQL to the client.
- **Rate limit** any endpoint that writes or sends mail before it ships.

Sync SQLAlchemy, not async. A portfolio site's write volume does not justify
the complexity.

### Grow it only when it hurts

| Split out | When |
|---|---|
| `routers/` | `main.py` passes ~150 lines |
| `schemas.py` | more than ~3 schemas |
| `crud.py` / `services/` | query logic repeats across routes |
| Alembic | the first schema change after a table exists |

Do not create these in advance.

## Auth

**There is none, and none is needed.** The site is public.

If an admin area is added later (to manage events without a deploy), it will
be **admin-only, single role, one user**, meaning the group's own staff. No public
signup, no user accounts, no roles matrix, no permissions system.

Do not scaffold auth, a users table, a login page, or a roles enum before
that work is actually requested. Speculative auth is the single most common
source of bloat in a project this size.

## Portability

The frontend is hosted on Cloudflare. The backend is not hosted yet. See
[`deployment.md`](deployment.md). Platform code stays in the deploy config
and CI, never in app code.

The rules that keep every option open:

- The backend stays **Dockerfile-able**: no reliance on a platform runtime.
- **All** configuration comes from environment variables, via `config.py`.
  Zero hardcoded URLs, ports, or origins.
- **Never import a platform SDK** (Vercel, Netlify, Render, Supabase client).
  Postgres is reached through SQLAlchemy, nothing else.
- The frontend builds to static files with no server requirement.

Hold this line and changing host later is a config change, not a rewrite.
