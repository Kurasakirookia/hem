import { Section } from '@/components/atoms/Section'
import { Container } from '@/components/atoms/Container'
import { Title } from '@/components/atoms/Title'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Centred title with a subtext under it. Introduces the section that follows,
 * so it sits directly above a continuation section with no bottom padding.
 *
 * Both lines are Title, so both arrive already cased from content/.
 */
export function CenteredIntro({
  title,
  subtext,
  id,
}: {
  title: string
  subtext: string
  id?: string
}) {
  return (
    <Section id={id} className="pb-0 text-center">
      <Container>
        <Reveal>
          <Title as="h2" size="lg">
            {title}
          </Title>
          <Title as="p" size="sm" className="mt-4 text-muted">
            {subtext}
          </Title>
        </Reveal>
      </Container>
    </Section>
  )
}
