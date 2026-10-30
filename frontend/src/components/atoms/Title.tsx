import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Display heading in Dirtyline.
 *
 * Dirtyline renders everything as capitals, and the typed case picks the
 * letterform: lowercase gives the plain block form, uppercase gives the
 * decorative swash form. So copy arrives already cased from content/, and
 * this component must never apply text-transform. See docs/design-system.md.
 */
export function Title({
  children,
  as: Tag = 'h2',
  size = 'lg',
  className,
}: {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p'
  size?: 'sm' | 'md' | 'lg' | 'hero'
  className?: string
}) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    hero: 'text-display',
  }
  return (
    <Tag className={cn('font-hero normal-case leading-tight', sizes[size], className)}>
      {children}
    </Tag>
  )
}
