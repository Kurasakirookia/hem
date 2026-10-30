import { useEffect, useRef } from 'react'
import { Container } from '@/components/atoms/Container'
import { Placeholder } from '@/components/atoms/Placeholder'
import { Section } from '@/components/atoms/Section'
import { gsap, isMotionOff } from '@/components/motion/gsap'
import { carousel } from '@/content/home'

/**
 * Tall cards travelling left to right, continuously.
 *
 * Runs on its own clock. Nothing here is tied to scroll position, so the
 * strip keeps moving whether or not the reader does.
 *
 * The row is rendered twice. Moving the track by exactly half its width lands
 * the second copy where the first started, so the loop has no seam and no
 * index bookkeeping. Cards travel right, so the track starts shifted left and
 * animates back to zero.
 */

const LOOP_SECONDS = 29

export function CardCarousel() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMotionOff() || !track.current) return
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        track.current,
        { xPercent: -50 },
        { xPercent: 0, duration: LOOP_SECONDS, ease: 'none', repeat: -1 },
      )

      // Slow to a stop on hover so a card can actually be read.
      const el = root.current!
      const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.6 })
      const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6 })
      el.addEventListener('pointerenter', slow)
      el.addEventListener('pointerleave', resume)
      return () => {
        el.removeEventListener('pointerenter', slow)
        el.removeEventListener('pointerleave', resume)
      }
    }, root)
    return () => ctx.revert()
  }, [])

  const cards = [...carousel.cards, ...carousel.cards]

  return (
    <Section className="overflow-hidden">
      <div ref={root} data-testid="carousel">
        <div ref={track} className="flex w-max gap-6">
          {cards.map((card, i) => (
            <article key={`${card.id}-${i}`} className="w-64 shrink-0 md:w-80">
              <Placeholder label={card.label} aspect="card-tall" />
              <p className="mt-4 font-mono text-xs tracking-wide text-muted uppercase">
                {card.label}
              </p>
            </article>
          ))}
        </div>
      </div>
      <Container className="mt-10">
        <p className="font-mono text-xs tracking-wide text-muted uppercase">Selected work</p>
      </Container>
    </Section>
  )
}
