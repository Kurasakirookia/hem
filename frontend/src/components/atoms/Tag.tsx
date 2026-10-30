import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Pink highlight chip for a date or a short status. Same colors in every tone. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block bg-soft px-2 py-1 font-sans text-xs font-semibold tracking-wide text-on-soft uppercase',
        className,
      )}
    >
      {children}
    </span>
  )
}
