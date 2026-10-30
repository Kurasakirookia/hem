import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Title } from '@/components/atoms/Title'
import { Reveal } from '@/components/motion/Reveal'
import { connect } from '@/content/home'

/** Closing call to action. The last thing before the footer. */
export function Connect() {
  return (
    <Section id="connect" className="border-t border-line text-center">
      <Container>
        <Reveal>
          <Title as="h2" size="hero">
            {connect.title}
          </Title>
          <Title as="p" size="sm" className="mt-6 text-muted">
            {connect.subtext}
          </Title>
          <button
            type="button"
            className="mt-12 border border-text px-8 py-4 font-mono text-xs tracking-wide uppercase transition-colors hover:bg-text hover:text-inverse"
          >
            {connect.cta}
          </button>
        </Reveal>
      </Container>
    </Section>
  )
}
