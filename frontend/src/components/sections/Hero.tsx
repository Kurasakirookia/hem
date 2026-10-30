import { useEffect, useRef } from 'react'
import { Title } from '@/components/atoms/Title'
import { EASE } from '@/design-system/motion'
import { gsap, isMotionOff } from '@/components/motion/gsap'
import { hero } from '@/content/home'

/**
 * Title in the middle, elements blown across it.
 *
 * The blown pieces are greybox leaf shapes launched with Physics2D, so they
 * travel on a real trajectory with gravity rather than a canned tween. Real
 * artwork replaces the shapes, not the motion.
 */

const LEAF_COUNT = 18

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

      gsap.utils.toArray<HTMLElement>('[data-leaf]').forEach((leaf, i) => {
        gsap.set(leaf, { xPercent: -50, yPercent: -50, opacity: 0 })
        gsap
          .timeline({ repeat: -1, delay: Math.abs(seeded(i, 3)) * 6 })
          .to(leaf, { opacity: 1, duration: 0.4 })
          .to(
            leaf,
            {
              duration: 7 + Math.abs(seeded(i, 5)) * 4,
              physics2D: {
                velocity: 90 + Math.abs(seeded(i, 7)) * 160,
                angle: -8 + seeded(i, 11) * 26,
                gravity: 34,
              },
              rotation: seeded(i, 13) * 720,
              ease: 'none',
            },
            0,
          )
          .to(leaf, { opacity: 0, duration: 1.2 }, '-=1.4')
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      data-testid="hero"
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-gutter"
    >
      {/* Blown elements. Greybox stand-in for the real artwork. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {Array.from({ length: LEAF_COUNT }, (_, i) => (
          <span
            key={i}
            data-leaf
            className="absolute block size-6 rounded-lg bg-placeholder"
            style={{
              left: `${Math.abs(seeded(i, 1)) * 20 - 12}%`,
              top: `${15 + Math.abs(seeded(i, 2)) * 70}%`,
            }}
          />
        ))}
      </div>

      <div className="relative text-center">
        <div data-hero-title>
          <Title as="h1" size="hero">
            {hero.title}
          </Title>
        </div>
        <p className="mt-6 font-mono text-xs tracking-wide text-muted uppercase">{hero.caption}</p>
      </div>
    </div>
  )
}
