/** Thin fetch wrapper. Vite proxies /api to FastAPI in dev. */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`${init?.method ?? 'GET'} /api${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}
