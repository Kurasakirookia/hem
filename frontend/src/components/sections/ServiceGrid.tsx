import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Title } from '@/components/atoms/Title'
import { Reveal } from '@/components/motion/Reveal'
import { serviceGrid } from '@/content/home'

/**
 * Two by two grid of square cards. Zero radius, hard edges, sharing hairlines
 * so the four read as one block rather than four floating tiles.
 */
export function ServiceGrid() {
  return (
    <Section flush>
      <Container className="mt-16">
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {serviceGrid.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.06}>
              <article
                style={{ borderRadius: 'var(--radius-none)' }}
                className="flex h-full flex-col justify-between bg-bg p-8 md:p-12"
                data-testid="grid-card"
              >
                <span className="font-mono text-xs tracking-wide text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mt-16">
                  <Title as="h3" size="sm">
                    {card.title}
                  </Title>
                  <p className="mt-3 text-muted">{card.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
