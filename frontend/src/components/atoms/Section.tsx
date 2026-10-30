import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Color scheme for a band. Defined in tokens.css under TONES. */
export type Tone = 'cream' | 'grid' | 'maroon'

/**
 * One full-width band of a page, carrying the vertical rhythm.
 *
 * `flush` removes the top padding, for a section that continues the one above
 * it rather than starting a new beat.
 *
 * `tone` repaints the band and everything inside it. Leave it unset to
 * inherit from the parent.
 */
export function Section({
  children,
  className,
  id,
  flush = false,
  tone,
}: {
  children: ReactNode
  className?: string
  id?: string
  flush?: boolean
  tone?: Tone
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn('w-full', flush ? 'pb-section' : 'py-section', className)}
    >
      {children}
    </section>
  )
}
