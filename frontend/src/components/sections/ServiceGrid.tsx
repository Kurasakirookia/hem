import { Container } from '@/components/atoms/Container'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Section } from '@/components/atoms/Section'
import { Title } from '@/components/atoms/Title'
import { Reveal } from '@/components/motion/Reveal'
import { serviceGrid } from '@/content/home'

/**
 * Two by two grid of square cards. Zero radius, hard edges, sharing solid
 * hairlines so the four read as one block, like a printed calendar.
 */
export function ServiceGrid() {
  return (
    <Section flush>
      <Container className="mt-16">
        <div className="grid grid-cols-1 gap-px border border-line-strong bg-line-strong sm:grid-cols-2">
          {serviceGrid.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.06}>
              <article
                className="flex h-full flex-col justify-between bg-bg p-8 md:p-12"
                data-testid="grid-card"
              >
                <Eyebrow className="text-muted">{String(i + 1).padStart(2, '0')}</Eyebrow>
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
