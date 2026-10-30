import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Small uppercase label that sits above a title or names a thing. */
export function Eyebrow({
  children,
  as: Tag = 'p',
  className,
}: {
  children: ReactNode
  /** span inside links and inline text, where a p is not allowed. */
  as?: 'p' | 'span'
  className?: string
}) {
  return (
    <Tag className={cn('font-sans text-xs font-semibold tracking-wide uppercase', className)}>
      {children}
    </Tag>
  )
}
