import { createBrowserRouter } from 'react-router'
import Home from '@/pages/Home'

// Pages get added here as they are built. Planned: Work, WorkDetail,
// Services, About, Contact — final list depends on the site's page map.
export const router = createBrowserRouter([{ path: '/', element: <Home /> }])
