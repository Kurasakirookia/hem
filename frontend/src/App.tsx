import { IconContext } from '@phosphor-icons/react'
import { RouterProvider } from 'react-router/dom'
import { ICON_DEFAULTS } from '@/design-system/icons'
import { router } from '@/routes'

export default function App() {
  return (
    <IconContext.Provider value={ICON_DEFAULTS}>
      <RouterProvider router={router} />
    </IconContext.Provider>
  )
}
