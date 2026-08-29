/**
 * Dev-only inventory. Never registered in a production build.
 *
 * Two jobs. It shows every design token so the system is visible rather than
 * theoretical, and it lists every component with its variants and states so
 * nobody rebuilds one that already exists.
 *
 * Add a component by appending to COMPONENTS below.
 */

const COLORS = [
  '--color-bg',
  '--color-bg-subtle',
  '--color-bg-inverse',
  '--color-surface',
  '--color-text',
  '--color-text-muted',
  '--color-text-inverse',
  '--color-brand',
  '--color-accent',
  '--color-line',
  '--color-line-strong',
]

const TYPE = [
  '--text-xs',
  '--text-sm',
  '--text-base',
  '--text-lg',
  '--text-xl',
  '--text-2xl',
  '--text-3xl',
  '--text-display',
]

const SPACE = [
  '--space-2',
  '--space-4',
  '--space-8',
  '--space-16',
  '--space-24',
  '--space-section',
]

const RADIUS = ['--radius-none', '--radius-sm', '--radius-md', '--radius-lg']

/** Components render here as they are built: [name, node]. */
const COMPONENTS: [string, React.ReactNode][] = []

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="mb-4 font-mono text-sm tracking-wide uppercase text-muted">{title}</h2>
      {children}
    </section>
  )
}

export default function Inventory() {
  return (
    <main className="mx-auto max-w-content px-gutter py-8" data-testid="inventory">
      <h1 className="font-mono text-sm tracking-wide uppercase">Inventory</h1>

      <Section title="Color">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {COLORS.map((name) => (
            <div key={name}>
              <div
                className="aspect-video w-full rounded-sm border border-line"
                style={{ background: `var(${name})` }}
              />
              <p className="mt-2 font-mono text-xs text-muted">{name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type scale">
        <div className="space-y-3">
          {TYPE.map((name) => (
            <div key={name} className="flex items-baseline gap-4">
              <span className="w-32 shrink-0 font-mono text-xs text-muted">{name}</span>
              <span style={{ fontSize: `var(${name})` }} className="truncate">
                Grid Systems
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing">
        <div className="space-y-2">
          {SPACE.map((name) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-32 shrink-0 font-mono text-xs text-muted">{name}</span>
              <div className="h-3 bg-accent" style={{ width: `var(${name})` }} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <div className="flex flex-wrap gap-4">
          {RADIUS.map((name) => (
            <div key={name}>
              <div
                className="size-16 border border-line-strong bg-bg-subtle"
                style={{ borderRadius: `var(${name})` }}
              />
              <p className="mt-2 font-mono text-xs text-muted">{name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Components">
        {COMPONENTS.length === 0 ? (
          <p className="text-muted">None yet. Append to COMPONENTS in this file.</p>
        ) : (
          <div className="space-y-8">
            {COMPONENTS.map(([name, node]) => (
              <div key={name}>
                <p className="mb-3 font-mono text-xs text-muted">{name}</p>
                {node}
              </div>
            ))}
          </div>
        )}
      </Section>
    </main>
  )
}
