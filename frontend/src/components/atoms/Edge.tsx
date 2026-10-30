import { cn } from '@/lib/cn'

const VARIANTS = {
  scallop: 'edge-scallop',
  holes: 'edge-holes',
  checker: 'edge-checker',
} as const

/**
 * Decorative strip between two bands. Pure CSS, see design-system/patterns.css.
 *
 * Paints in the current text color, so pick it with a class:
 * `<Edge variant="scallop" className="text-soft" />`. For checker, the
 * background color fills the other squares: `className="bg-soft text-brand"`.
 */
export function Edge({
  variant,
  className,
}: {
  variant: keyof typeof VARIANTS
  className?: string
}) {
  return <div aria-hidden="true" className={cn('w-full', VARIANTS[variant], className)} />
}
