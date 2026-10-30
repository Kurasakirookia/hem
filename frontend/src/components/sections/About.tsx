import { Container } from '@/components/atoms/Container'
import { Placeholder } from '@/components/atoms/Placeholder'
import { Section } from '@/components/atoms/Section'
import { Title } from '@/components/atoms/Title'
import { Reveal } from '@/components/motion/Reveal'
import { about } from '@/content/home'

/**
 * Centred, matching the rhythm of the other text sections.
 *
 * A small vector sits at the right edge of the section. On a narrow screen
 * there is no room beside the text, so the same element falls back to sitting
 * centred underneath rather than being duplicated or hidden.
 */
export function About() {
  return (
    <Section id="about" className="relative">
      <Container>
        <Reveal className="text-center">
          <Title as="h2" size="lg">
            {about.title}
          </Title>
          <div className="mx-auto mt-8 max-w-prose space-y-5 text-lg text-muted">
            {about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div
          data-speed="0.9"
          className="mx-auto mt-16 w-32 md:absolute md:top-1/2 md:right-gutter md:mt-0 md:-translate-y-1/2"
        >
          <Placeholder label="vector" aspect="card-square" />
        </div>
      </Container>
    </Section>
  )
}
