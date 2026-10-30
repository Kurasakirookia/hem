import { ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/atoms/Button'
import { Container } from '@/components/atoms/Container'
import { Section } from '@/components/atoms/Section'
import { Title } from '@/components/atoms/Title'
import { Reveal } from '@/components/motion/Reveal'
import { connect } from '@/content/home'

/** Closing call to action. The last thing before the footer. */
export function Connect() {
  return (
    <Section id="connect" tone="grid" className="text-center">
      <Container>
        <Reveal>
          <Title as="h2" size="hero">
            {connect.title}
          </Title>
          <Title as="p" size="sm" className="mt-6 text-muted">
            {connect.subtext}
          </Title>
          <Button className="mt-12">
            {connect.cta} <ArrowRight />
          </Button>
        </Reveal>
      </Container>
    </Section>
  )
}
