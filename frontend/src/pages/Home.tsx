import { Edge } from '@/components/atoms/Edge'
import { About } from '@/components/sections/About'
import { CardCarousel } from '@/components/sections/CardCarousel'
import { CenteredIntro } from '@/components/sections/CenteredIntro'
import { Connect } from '@/components/sections/Connect'
import { Footer } from '@/components/sections/Footer'
import { Hero } from '@/components/sections/Hero'
import { Loader } from '@/components/sections/Loader'
import { Navbar } from '@/components/sections/Navbar'
import { ServiceGrid } from '@/components/sections/ServiceGrid'
import { StackedCards } from '@/components/sections/StackedCards'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { servicesIntro, workIntro } from '@/content/home'

/**
 * Section order. Each CenteredIntro is followed by the section it introduces,
 * which is marked `flush` so the two read as one beat rather than two.
 *
 * Checker strips mark every change between cream and maroon.
 */
export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <CardCarousel />
          <About />

          <Edge variant="checker" className="bg-soft text-brand" />
          <div data-tone="maroon">
            <CenteredIntro title={workIntro.title} subtext={workIntro.subtext} id="work" />
            <StackedCards />
          </div>
          <Edge variant="checker" className="bg-soft text-brand" />

          <CenteredIntro title={servicesIntro.title} subtext={servicesIntro.subtext} id="services" />
          <ServiceGrid />

          <Connect />
        </main>
        <Edge variant="checker" className="bg-soft text-brand" />
        <Footer />
      </SmoothScroll>
    </>
  )
}
