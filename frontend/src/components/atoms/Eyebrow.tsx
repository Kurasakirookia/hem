import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Small uppercase label that sits above a title or names a thing. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('font-sans text-xs font-semibold tracking-wide uppercase', className)}>
      {children}
    </p>
  )
}
