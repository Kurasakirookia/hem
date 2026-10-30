import { Edge } from '@/components/atoms/Edge'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Title } from '@/components/atoms/Title'
import { nav } from '@/content/home'

/**
 * Pink bar with a scalloped bottom edge. Links on both sides, wordmark in the
 * middle. On a narrow screen the links hide and only the wordmark stays,
 * until there is a real menu to open.
 *
 * Not fixed. It lives inside ScrollSmoother, which transforms its content, so
 * a fixed bar would have to sit outside it. That is not needed yet.
 */

type NavLink = (typeof nav.left)[number] | (typeof nav.right)[number]

function Links({ links, className }: { links: readonly NavLink[]; className?: string }) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.href} className="underline-offset-4 hover:underline">
            <Eyebrow as="span">{link.label}</Eyebrow>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Navbar() {
  return (
    <header data-testid="navbar" className="relative text-soft" style={{ zIndex: 'var(--z-nav)' }}>
      <nav className="bg-soft text-on-soft">
        <div className="mx-auto grid max-w-content grid-cols-3 items-center px-gutter py-4">
          <Links links={nav.left} className="hidden gap-8 md:flex" />
          <a href="#top" className="col-start-2 justify-self-center">
            <Title as="p" size="md">
              {nav.wordmark}
            </Title>
          </a>
          <Links links={nav.right} className="hidden justify-end gap-8 md:flex" />
        </div>
      </nav>
      <Edge variant="scallop" className="absolute top-full" />
    </header>
  )
}
