import { useEffect, useRef } from 'react'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Title } from '@/components/atoms/Title'
import { EASE, PETALS } from '@/design-system/motion'
import { gsap, isMotionOff } from '@/components/motion/gsap'
import { hero } from '@/content/home'
import { cn } from '@/lib/cn'

/**
 * Title in the middle, cherry blossom petals blown across it.
 *
 * Petals launch with Physics2D, so they travel on a real trajectory with
 * gravity rather than a canned tween. A slow flip on the Y axis on top of
 * that makes them flutter as they fall.
 *
 * With motion off the petals stay where they start, scattered at the left.
 */

const PETAL_COUNT = 18

/** Physics2D launch values. Speed in px/s, angle in degrees, gravity in px/s². */
const LAUNCH = { speedMin: 70, speedSpread: 140, angleMin: -8, angleSpread: 26, gravity: 28 }

/** Two pinks so the drift has depth. Sizes vary for the same reason. */
const SHADES = ['text-petal', 'text-soft'] as const
const SIZES = ['size-4', 'size-5', 'size-6'] as const

/** One cherry blossom petal: a rounded teardrop with a notch at the tip. */
const PETAL_PATH =
  'M10 24C3 18 0 10 3 4C5 1 8 1 10 4C12 1 15 1 17 4C20 10 17 18 10 24Z'

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

      gsap.utils.toArray<SVGElement>('[data-petal]').forEach((petal, i) => {
        gsap.set(petal, { xPercent: -50, yPercent: -50, opacity: 0 })

        gsap.to(petal, {
          rotationY: 180,
          duration: PETALS.flutter * (0.8 + Math.abs(seeded(i, 17)) * 0.4),
          ease: EASE.inOut,
          repeat: -1,
          yoyo: true,
        })

        gsap
          .timeline({ repeat: -1, delay: Math.abs(seeded(i, 3)) * PETALS.startSpread })
          .to(petal, { opacity: 1, duration: PETALS.fadeIn })
          .to(
            petal,
            {
              duration: PETALS.fallMin + Math.abs(seeded(i, 5)) * PETALS.fallSpread,
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
          .to(petal, { opacity: 0, duration: PETALS.fadeOut }, `-=${PETALS.fadeOut}`)
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
        {Array.from({ length: PETAL_COUNT }, (_, i) => (
          <svg
            key={i}
            data-petal
            viewBox="0 0 20 24"
            className={cn('absolute block', SIZES[i % SIZES.length], SHADES[i % SHADES.length])}
            style={{
              left: `${Math.abs(seeded(i, 1)) * 20 - 12}%`,
              top: `${15 + Math.abs(seeded(i, 2)) * 70}%`,
            }}
          >
            <path d={PETAL_PATH} fill="currentColor" />
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
