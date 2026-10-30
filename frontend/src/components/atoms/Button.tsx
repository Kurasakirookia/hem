import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const VARIANTS = {
  solid: 'border-brand bg-brand text-inverse hover:bg-transparent hover:text-brand',
  outline: 'border-brand text-brand hover:bg-brand hover:text-inverse',
} as const

/**
 * Small uppercase button. Colors come from the tone, so a solid button is
 * maroon on cream and pink on maroon.
 *
 * Renders a link when `href` is set, so navigation stays a real anchor.
 */
export function Button({
  children,
  variant = 'solid',
  href,
  onClick,
  className,
}: {
  children: ReactNode
  variant?: keyof typeof VARIANTS
  href?: string
  onClick?: () => void
  className?: string
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 border px-5 py-3 font-sans text-xs font-semibold tracking-wide uppercase transition-colors',
    VARIANTS[variant],
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
