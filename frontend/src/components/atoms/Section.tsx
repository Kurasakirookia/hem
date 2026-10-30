import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * One full-width band of a page, carrying the vertical rhythm.
 *
 * `flush` removes the top padding, for a section that continues the one above
 * it rather than starting a new beat.
 */
export function Section({
  children,
  className,
  id,
  flush = false,
}: {
  children: ReactNode
  className?: string
  id?: string
  flush?: boolean
}) {
  return (
    <section id={id} className={cn('w-full', flush ? 'pb-section' : 'py-section', className)}>
      {children}
    </section>
  )
}
