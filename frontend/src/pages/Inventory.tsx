/**
 * Dev-only inventory. Never registered in a production build.
 *
 * Two jobs. It shows every design token so the system is visible rather than
 * theoretical, and it lists every component with its variants and states so
 * nobody rebuilds one that already exists.
 *
 * Add a component by appending to COMPONENTS below.
 */
import type { ReactNode } from 'react'
import { Button } from '@/components/atoms/Button'
import { Edge } from '@/components/atoms/Edge'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Frame } from '@/components/atoms/Frame'
import { Tag } from '@/components/atoms/Tag'

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
  '--color-soft',
  '--color-text-on-soft',
  '--color-line',
  '--color-line-strong',
  '--color-grid-line',
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

const RADIUS = ['--radius-none', '--radius-sm', '--radius-md', '--radius-lg', '--radius-pill']

/** Renders a sample once per tone, so every component is checked on both. */
function OnTones({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {(['cream', 'maroon'] as const).map((tone) => (
        <div key={tone} data-tone={tone} className="flex flex-wrap items-start gap-4 p-6">
          {children}
        </div>
      ))}
    </div>
  )
}

/** Components render here as they are built. */
const COMPONENTS: { name: string; node: ReactNode }[] = [
  {
    name: 'Section tones: cream, grid, maroon',
    node: (
      <div className="grid gap-4 sm:grid-cols-3">
        {(['cream', 'grid', 'maroon'] as const).map((tone) => (
          <div key={tone} data-tone={tone} className="border border-line p-6">
            <Eyebrow>{tone}</Eyebrow>
            <p className="mt-2 text-muted">Muted body text.</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Edge: scallop, holes, checker',
    node: (
      <div className="space-y-8">
        <div>
          <div className="h-8 bg-soft" />
          <Edge variant="scallop" className="text-soft" />
        </div>
        <Edge variant="holes" className="text-brand" />
        <Edge variant="checker" className="bg-soft text-brand" />
      </div>
    ),
  },
  {
    name: 'Frame',
    node: (
      <OnTones>
        <Frame>
          <Tag>Today, Mar 3</Tag>
          <p className="mt-3 text-muted">Outline follows the tone.</p>
        </Frame>
        <Frame tone="cream">
          <p className="text-muted">tone=cream, for a card on maroon.</p>
        </Frame>
      </OnTones>
    ),
  },
  { name: 'Eyebrow', node: <OnTones><Eyebrow>Where to find us</Eyebrow></OnTones> },
  {
    name: 'Button: solid, outline',
    node: (
      <OnTones>
        <Button>Find us today</Button>
        <Button variant="outline">Know more</Button>
      </OnTones>
    ),
  },
  { name: 'Tag', node: <OnTones><Tag>Today, Mar 3</Tag></OnTones> },
]

function Section({ title, children }: { title: string; children: ReactNode }) {
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

      <Section title="Hero font: Orange Avenue">
        <p className="mb-4 max-w-prose text-muted">
          Display serif with built-in ligatures. Titles are written in title
          case. Never apply uppercase, it drops the ligatures.
        </p>
        <div className="space-y-6">
          {[
            ['title case', 'We Make the Night'],
            ['ligatures', 'the ff st ta th oo ca TH'],
            ['all caps, avoid', 'WE MAKE THE NIGHT'],
            ['lowercase', 'orange avenue'],
          ].map(([label, text]) => (
            <div key={label}>
              <p className="font-mono text-xs text-muted">{label}</p>
              <p style={{ fontFamily: 'var(--font-hero)' }} className="text-3xl">
                {text}
              </p>
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
            {COMPONENTS.map(({ name, node }) => (
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
