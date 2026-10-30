import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Display heading in Orange Avenue.
 *
 * Copy arrives already cased from content/. This component must never apply
 * text-transform, because uppercase drops the lowercase ligatures.
 * See docs/design-system.md.
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
