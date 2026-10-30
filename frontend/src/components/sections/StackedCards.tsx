import { useEffect, useRef } from 'react'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Title } from '@/components/atoms/Title'
import { ScrollTrigger, gsap, isMotionOff } from '@/components/motion/gsap'
import { stackedCards } from '@/content/home'

/**
 * Cards rise from the bottom and stack, each one masking the last.
 *
 * Each card gets its own pin. When a card reaches the top of the viewport it
 * is held there until the whole section ends. The next card keeps scrolling
 * normally, so it travels up and covers the one already pinned. Later cards
 * sit above earlier ones simply by being later in the DOM.
 *
 * Two things this deliberately does not do.
 *
 * It does not use position: sticky. ScrollSmoother transforms the content
 * wrapper, and sticky resolves against the nearest transformed ancestor, so
 * it silently does nothing.
 *
 * It does not animate the cards on one shared timeline. That moves them
 * within a single container, which makes them slide past each other instead
 * of covering each other.
 *
 * Each card is nudged down slightly more than the last, so the top edge of
 * the card underneath stays visible and the stack reads as a stack.
 */
export function StackedCards() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMotionOff() || !root.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-stack-card]').forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: root.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <Section flush>
      <div ref={root} data-testid="stacked-cards" className="relative mt-16">
        {stackedCards.map((card, i) => (
          <div key={card.id} data-stack-card className="flex h-svh items-center">
            <Container className="w-full">
              <article
                style={{
                  height: 'var(--space-stack-card)',
                  marginTop: `calc(${i} * var(--space-8))`,
                }}
                className="flex flex-col justify-between border border-line bg-bg-subtle p-8 md:p-12"
              >
                <span className="font-mono text-xs tracking-wide text-muted">{card.index}</span>
                <div>
                  <Title as="h3" size="md">
                    {card.title}
                  </Title>
                  <p className="mt-4 max-w-prose text-lg text-muted">{card.body}</p>
                </div>
              </article>
            </Container>
          </div>
        ))}
      </div>

      <Container>
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            data-testid="know-more"
            className="border border-text px-8 py-4 font-mono text-xs tracking-wide uppercase transition-colors hover:bg-text hover:text-inverse"
          >
            Know more
          </button>
        </div>
      </Container>
    </Section>
  )
}
