import { Container } from '@/components/atoms/Container'
import { Title } from '@/components/atoms/Title'
import { footer } from '@/content/home'

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-subtle py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          <Title as="p" size="md">
            {footer.wordmark}
          </Title>

          {footer.columns.map((column) => (
            <div key={column.id}>
              <p className="font-mono text-xs tracking-wide text-muted uppercase">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted transition-colors hover:text-text">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-16 font-mono text-xs text-muted">{footer.note}</p>
      </Container>
    </footer>
  )
}
