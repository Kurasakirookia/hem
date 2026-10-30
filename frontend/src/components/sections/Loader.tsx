import { useEffect, useRef, useState } from 'react'
import { EASE } from '@/design-system/motion'
import { gsap, isMotionOff } from '@/components/motion/gsap'

/**
 * First visit loading screen. Vectors carry it.
 *
 * Nested shapes grow from a seed, rotate, morph point count, then collapse.
 * Greybox stand-in for the real illustration.
 *
 * Shows once per browser session. A returning visitor in the same tab goes
 * straight to the page, because sitting through this on every navigation
 * would be punishing.
 */

const SESSION_KEY = 'hem:loader-seen'

/** Star path with `points` spikes. Radii are fractions of the 100 unit box. */
function star(points: number, outer: number, inner: number): string {
  const cx = 50
  const cy = 50
  const step = Math.PI / points
  const coords: string[] = []
  for (let i = 0; i < points * 2; i += 1) {
    const r = i % 2 === 0 ? outer : inner
    const angle = i * step - Math.PI / 2
    coords.push(`${(cx + r * Math.cos(angle)).toFixed(2)} ${(cy + r * Math.sin(angle)).toFixed(2)}`)
  }
  return `M${coords.join(' L')} Z`
}

const BURST = star(22, 48, 33)
const STAR_4 = star(4, 42, 12)
const STAR_5 = star(5, 42, 16)

/** Four overlapping circles, the clover behind everything. Drawn as circles
 *  rather than one arc path, because arcs whose radius is smaller than the
 *  chord get silently reshaped by the renderer. */
const CLOVER = [
  { cx: 50, cy: 32, r: 25 },
  { cx: 68, cy: 50, r: 25 },
  { cx: 50, cy: 68, r: 25 },
  { cx: 32, cy: 50, r: 25 },
]

export function Loader({ onDone }: { onDone?: () => void }) {
  const [hidden, setHidden] = useState(() => {
    if (typeof window === 'undefined') return true
    if (isMotionOff()) return true
    return sessionStorage.getItem(SESSION_KEY) === '1'
  })
  const root = useRef<HTMLDivElement>(null)
  const blob = useRef<SVGGElement>(null)
  const burst = useRef<SVGPathElement>(null)
  const shape = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (hidden) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, '1')
          setHidden(true)
          onDone?.()
        },
      })

      tl.from([blob.current, burst.current, shape.current], {
          scale: 0.04,
          duration: 0.9,
          ease: EASE.expo,
          stagger: 0.06,
        })
        .to(burst.current, { rotate: 140, duration: 1.4, ease: 'none' }, 0)
        .to(blob.current, { rotate: -70, duration: 1.4, ease: 'none' }, 0)
        .to(shape.current, { morphSVG: STAR_5, rotate: 190, duration: 0.9, ease: EASE.inOut }, 0.45)
        .to(
          [blob.current, burst.current, shape.current],
          { scale: 0.02, duration: 0.5, ease: 'power2.in', stagger: 0.04 },
          1.25,
        )
        .to(root.current, { autoAlpha: 0, duration: 0.3 }, '-=0.2')
    }, root)

    return () => ctx.revert()
  }, [hidden, onDone])

  if (hidden) return null

  return (
    <div
      ref={root}
      data-testid="loader"
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
    >
      {/* transform-box: view-box makes every transform resolve against the
          viewBox rather than each shape's own bounding box, so `center` is
          the middle of the artwork for all three layers. Without it GSAP and
          the browser disagree about the origin and the shapes fly off. */}
      <svg
        viewBox="0 0 100 100"
        className="w-1/2 max-w-prose [&_*]:origin-center [&_*]:[transform-box:view-box]"
        aria-hidden="true"
      >
        <g ref={blob} className="fill-soft">
          {CLOVER.map((c) => (
            <circle key={`${c.cx}-${c.cy}`} cx={c.cx} cy={c.cy} r={c.r} />
          ))}
        </g>
        <path ref={burst} d={BURST} className="fill-brand" />
        <path ref={shape} d={STAR_4} className="fill-accent" />
      </svg>
      <span className="sr-only">Loading</span>
    </div>
  )
}
