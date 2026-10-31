# Deployment

## Where it runs

| Part | Host | Status |
|---|---|---|
| Frontend | Cloudflare Workers, static assets, free plan | Live as a preview at https://hem.slv-events.workers.dev |
| Backend | Google Cloud Run, Postgres on Neon | Not hosted yet |
| Images | In the repo, served with the frontend | Move to Cloudflare R2 when the gallery grows |
| Domain | none yet | Add when the site goes live |

The preview has `noindex` in `frontend/index.html`, so search engines skip
it. Remove that tag when the real domain goes live.

## How a deploy happens

There is no manual deploy. Push to `main`, and the `deploy` job in
`.github/workflows/ci.yml` runs after the frontend, backend and e2e jobs pass.
It builds the frontend and runs `wrangler deploy`. A failed check means no
deploy.

Cloudflare's own "Connect to Git" is not used. GitHub Actions is the one
place that decides what ships.

The Worker is configured in `frontend/wrangler.jsonc`. It serves `dist/` and
sends unknown paths to `index.html`, so the router handles them.

## Secrets

Set in GitHub: repo Settings, Secrets and variables, Actions. Only the repo
owner can add or change them.

| Name | What |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token with the "Edit Cloudflare Workers" template |
| `CLOUDFLARE_ACCOUNT_ID` | From the Cloudflare dashboard, Workers and Pages |

Never put either in the repo or in chat. To rotate, create a new token in
Cloudflare, replace the secret, then delete the old token.

## Rolling back

Cloudflare keeps past versions. In the dashboard: Workers and Pages, `hem`,
Deployments, then roll back. Or revert the commit on `main`, which deploys
the previous code.

## Logs

Static files are served without running any Worker code, so there are no
per-request logs. Request counts and errors are in the dashboard: Workers
and Pages, `hem`, Metrics. Real request logs come with the backend.
