import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Horizontal bounds and gutters. Every section's content sits in one. */
export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode
  className?: string
  /** Full bleed width, gutters only. For carousels and grids. */
  wide?: boolean
}) {
  return (
    <div className={cn('mx-auto w-full px-gutter', wide ? 'max-w-none' : 'max-w-content', className)}>
      {children}
    </div>
  )
}
