import { Edge } from '@/components/atoms/Edge'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Title } from '@/components/atoms/Title'
import { nav } from '@/content/home'
import { cn } from '@/lib/cn'

/**
 * Maroon bar with cream text and a scalloped bottom edge. Links on both sides, wordmark in the
 * middle. On a narrow screen the links hide and only the wordmark stays,
 * until there is a real menu to open.
 *
 * Not fixed. It lives inside ScrollSmoother, which transforms its content, so
 * a fixed bar would have to sit outside it. That is not needed yet.
 *
 * The default focus ring is maroon, which vanishes on this bar, so links
 * here use a cream ring instead.
 */

const FOCUS = 'focus-visible:outline-bg'

type NavLink = (typeof nav.left)[number] | (typeof nav.right)[number]

function Links({ links, className }: { links: readonly NavLink[]; className?: string }) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.href} className={cn('underline-offset-4 hover:underline', FOCUS)}>
            <Eyebrow as="span">{link.label}</Eyebrow>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Navbar() {
  return (
    <header data-testid="navbar" className="relative" style={{ zIndex: 'var(--z-nav)' }}>
      <nav className="bg-bg-inverse text-bg">
        <div className="mx-auto grid max-w-content grid-cols-3 items-center px-gutter py-4">
          <Links links={nav.left} className="hidden gap-8 md:flex" />
          <a href="#top" className={cn('col-start-2 justify-self-center', FOCUS)}>
            <Title as="p" size="md">
              {nav.wordmark}
            </Title>
          </a>
          <Links links={nav.right} className="hidden justify-end gap-8 md:flex" />
        </div>
      </nav>
      <Edge variant="scallop" className="absolute top-full text-bg-inverse" />
    </header>
  )
}
