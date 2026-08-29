import { createBrowserRouter, type RouteObject } from 'react-router'
import Home from '@/pages/Home'

// Pages get added here as they are built. Planned: Events, Services.
const routes: RouteObject[] = [{ path: '/', element: <Home /> }]

// Dev only. import.meta.env.DEV is false at build time, so this branch and the
// page it imports are dropped from the production bundle.
if (import.meta.env.DEV) {
  const { default: Inventory } = await import('@/pages/Inventory')
  routes.push({ path: '/inventory', element: <Inventory /> })
}

export const router = createBrowserRouter(routes)
