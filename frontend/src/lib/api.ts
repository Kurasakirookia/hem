/**
 * Every backend path lives here, once.
 *
 * Paths are relative on purpose — the browser resolves them against the page
 * origin, so the frontend never knows the API's host or port. Changing a port
 * in ecosystem.config.cjs cannot break a call.
 *
 * Rename a path: edit it here. TypeScript then flags every call site.
 * Never inline a path string at a call site, and never build an absolute URL.
 */
export const ENDPOINTS = {
  health: '/health',
} as const

type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS]

/** Thin fetch wrapper. Vite proxies /api to FastAPI in dev; a reverse proxy
 *  does the same in production. */
export async function api<T>(path: Endpoint, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`${init?.method ?? 'GET'} /api${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}
