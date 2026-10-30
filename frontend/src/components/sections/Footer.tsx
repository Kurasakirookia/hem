import { InstagramLogo, LinkedinLogo, type Icon } from '@phosphor-icons/react'
import { Container } from '@/components/atoms/Container'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Title } from '@/components/atoms/Title'
import { footer } from '@/content/home'

/** Links that get an icon beside them. Any other link is text only. */
const LINK_ICONS: Partial<Record<string, Icon>> = {
  Instagram: InstagramLogo,
  LinkedIn: LinkedinLogo,
}

/** Maroon band, link columns, then a periwinkle strip for the small print. */
export function Footer() {
  return (
    <footer data-tone="maroon" className="pt-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          <Title as="p" size="md">
            {footer.wordmark}
          </Title>

          {footer.columns.map((column) => (
            <div key={column.id}>
              <Eyebrow className="text-muted">{column.heading}</Eyebrow>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => {
                  const LinkIcon = LINK_ICONS[link]
                  return (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                      >
                        {LinkIcon && <LinkIcon />}
                        {link}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="mt-16 bg-accent py-3 text-on-soft">
        <Container>
          <Eyebrow>{footer.note}</Eyebrow>
        </Container>
      </div>
    </footer>
  )
}
