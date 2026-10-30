import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { Tone } from './Section'

/**
 * Thin outlined box. The outline follows the tone, maroon on cream and pink
 * on maroon, so it reads anywhere.
 *
 * Set `tone` to give the box its own scheme, for a cream card sitting on a
 * maroon band.
 */
export function Frame({
  children,
  className,
  tone,
}: {
  children: ReactNode
  className?: string
  tone?: Tone
}) {
  return (
    <div data-tone={tone} className={cn('border border-line-strong p-6', className)}>
      {children}
    </div>
  )
}
