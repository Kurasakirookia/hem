/**
 * pm2 process manifest — the single source of truth for dev ports and URLs.
 *
 *   pm2 start ecosystem.config.cjs     start everything
 *   pm2 logs                    tail all output
 *   pm2 logs hem-web            tail one process
 *   pm2 restart hem-api         restart one
 *   pm2 delete ecosystem.config.cjs    stop and remove all
 *
 * Ports are defined here and passed down as env, so changing a port is a
 * one-line edit in this file. vite.config.ts reads WEB_PORT and API_PORT;
 * the backend reads CORS_ORIGINS.
 *
 * Ports sit off the 5173/8000 defaults to avoid colliding with other
 * projects on the same machine.
 */

const path = require('node:path')
const log = (f) => path.join(__dirname, 'logs', f) // absolute, so per-app cwd cannot scatter them

const WEB_PORT = 5174
const API_PORT = 8001

const WEB_URL = `http://localhost:${WEB_PORT}`
const API_URL = `http://localhost:${API_PORT}`

/** Shared across every process. `interpreter: 'none'` is required because
 *  these scripts are binaries, not JS files — without it pm2 hands them to
 *  node and they fail instantly. */
const base = {
  interpreter: 'none',
  watch: false, // vite and uvicorn own their own reload; pm2 watching too causes double restarts
  autorestart: true,
  min_uptime: '5s', // under this, a restart counts as a crash
  max_restarts: 5, // then stop, instead of looping forever on a broken config
  time: true, // timestamp every log line
  merge_logs: true,
}

module.exports = {
  apps: [
    {
      ...base,
      name: 'hem-api',
      cwd: './backend',
      script: 'uv',
      args: `run uvicorn app.main:app --reload --port ${API_PORT}`,
      env: {
        CORS_ORIGINS: JSON.stringify([WEB_URL]),
        ENVIRONMENT: 'development',
      },
      out_file: log('api.log'),
      error_file: log('api.error.log'),
    },
    {
      ...base,
      name: 'hem-web',
      cwd: './frontend',
      script: 'pnpm',
      args: 'dev',
      env: {
        WEB_PORT: String(WEB_PORT),
        API_PORT: String(API_PORT),
      },
      out_file: log('web.log'),
      error_file: log('web.error.log'),
    },
  ],
}

// Exported so tooling and docs can read the URLs from one place.
module.exports.urls = { WEB_URL, API_URL, API_DOCS: `${API_URL}/api/docs` }
