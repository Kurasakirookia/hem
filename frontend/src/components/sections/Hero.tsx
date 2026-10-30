import { useEffect, useRef } from 'react'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Title } from '@/components/atoms/Title'
import { EASE, LEAVES } from '@/design-system/motion'
import { gsap, isMotionOff } from '@/components/motion/gsap'
import { hero } from '@/content/home'
import { cn } from '@/lib/cn'

/**
 * Title in the middle, pink leaves blown across it.
 *
 * Leaves launch with Physics2D, so they travel on a real trajectory with
 * gravity rather than a canned tween. A slow flip on the Y axis on top of
 * that makes them flutter as they fall.
 *
 * With motion off the leaves stay where they start, scattered at the left.
 */

const LEAF_COUNT = 18

/** Physics2D launch values. Speed in px/s, angle in degrees, gravity in px/s². */
const LAUNCH = { speedMin: 70, speedSpread: 140, angleMin: -8, angleSpread: 26, gravity: 28 }

/** Two pinks so the drift has depth. Sizes vary for the same reason. */
const SHADES = ['text-leaf', 'text-soft'] as const
const SIZES = ['size-4', 'size-5', 'size-6'] as const

/** Leaf drawn in a 20 by 28 box. A pointed body, one side a little fuller
 *  so it does not look stamped out, a midrib, and a short stem. */
const LEAF = {
  body: 'M10 1C16.5 5 18 13 10 22C3 14 3.5 6 10 1Z',
  midrib: 'M10 4L10 21',
  stem: 'M10 22L10 27',
}

/** Deterministic pseudo random, so the layout is the same on every reload. */
function seeded(i: number, salt: number): number {
  return (Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453) % 1
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMotionOff() || !root.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-title]', {
        opacity: 0,
        y: 30,
        duration: 1.1,
        ease: EASE.out,
        delay: 0.15,
      })

      gsap.utils.toArray<SVGElement>('[data-leaf]').forEach((leaf, i) => {
        gsap.set(leaf, { xPercent: -50, yPercent: -50, opacity: 0 })

        gsap.to(leaf, {
          rotationY: 180,
          duration: LEAVES.flutter * (0.8 + Math.abs(seeded(i, 17)) * 0.4),
          ease: EASE.inOut,
          repeat: -1,
          yoyo: true,
        })

        gsap
          .timeline({ repeat: -1, delay: Math.abs(seeded(i, 3)) * LEAVES.startSpread })
          .to(leaf, { opacity: 1, duration: LEAVES.fadeIn })
          .to(
            leaf,
            {
              duration: LEAVES.fallMin + Math.abs(seeded(i, 5)) * LEAVES.fallSpread,
              physics2D: {
                velocity: LAUNCH.speedMin + Math.abs(seeded(i, 7)) * LAUNCH.speedSpread,
                angle: LAUNCH.angleMin + seeded(i, 11) * LAUNCH.angleSpread,
                gravity: LAUNCH.gravity,
              },
              rotation: seeded(i, 13) * 720,
              ease: EASE.linear,
            },
            0,
          )
          .to(leaf, { opacity: 0, duration: LEAVES.fadeOut }, `-=${LEAVES.fadeOut}`)
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      id="top"
      data-tone="grid"
      data-testid="hero"
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-gutter"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {Array.from({ length: LEAF_COUNT }, (_, i) => (
          <svg
            key={i}
            data-leaf
            viewBox="0 0 20 28"
            className={cn('absolute block', SIZES[i % SIZES.length], SHADES[i % SHADES.length])}
            style={{
              left: `${Math.abs(seeded(i, 1)) * 20 - 12}%`,
              top: `${15 + Math.abs(seeded(i, 2)) * 70}%`,
            }}
          >
            <path d={LEAF.body} fill="currentColor" />
            <path d={LEAF.midrib} className="stroke-bg" strokeWidth={0.8} fill="none" />
            <path d={LEAF.stem} stroke="currentColor" strokeWidth={1.2} fill="none" />
          </svg>
        ))}
      </div>

      <div className="relative text-center">
        <div data-hero-title>
          <Title as="h1" size="hero">
            {hero.title}
          </Title>
        </div>
        <Eyebrow className="mt-6 text-muted">{hero.caption}</Eyebrow>
      </div>
    </div>
  )
}
