import { cn } from '@/lib/cn'

/**
 * A grey box standing in for artwork.
 *
 * Skeleton phase only. Every one of these is a decision still to be made, so
 * the label says what belongs there. Delete these when real artwork lands,
 * rather than restyling them.
 */
export function Placeholder({
  label,
  className,
  aspect = 'media',
}: {
  label: string
  className?: string
  aspect?: 'media' | 'card-tall' | 'card-square' | 'none'
}) {
  const ratio = aspect === 'none' ? undefined : { aspectRatio: `var(--aspect-${aspect})` }

  return (
    <div
      style={ratio}
      className={cn('flex w-full items-center justify-center bg-placeholder', className)}
    >
      <span className="font-mono text-xs tracking-wide text-muted uppercase">{label}</span>
    </div>
  )
}
