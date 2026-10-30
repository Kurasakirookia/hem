/**
 * Every word on the home page. Placeholder, but written as real copy rather
 * than lorem, because fake text of the wrong length hides layout problems.
 *
 * Titles and subtexts render in Dirtyline. The typed case picks the
 * letterform, so the mixed case below is deliberate artwork, not a typo.
 * Do not normalise it. See docs/design-system.md.
 */

export const hero = {
  title: 'wE MAke tHE nIGHt',
  caption: 'event design and production',
} as const

export const carousel = {
  cards: [
    { id: 'c1', label: 'Winter Gala' },
    { id: 'c2', label: 'Product Launch' },
    { id: 'c3', label: 'Rooftop Session' },
    { id: 'c4', label: 'Annual Summit' },
    { id: 'c5', label: 'Founders Dinner' },
    { id: 'c6', label: 'Street Festival' },
  ],
} as const

export const about = {
  title: 'abOUt uS',
  body: [
    'We plan and run events for people who care how the room feels. Corporate launches, weddings, festivals, private dinners.',
    'The work is half logistics and half taste. We handle the vendors, the timing and the crew, so the people who booked us can be present at their own event.',
  ],
} as const

export const workIntro = {
  title: 'hOW wE wORk',
  subtext: 'thREE stAGes, eVEry tIME',
} as const

export const stackedCards = [
  {
    id: 's1',
    index: '01',
    title: 'wE lIStEn',
    body: 'A first conversation about the room, the guests and the budget. No templates, no packages.',
  },
  {
    id: 's2',
    index: '02',
    title: 'wE dESIgn',
    body: 'Layout, lighting, sound and flow, drawn before anything is booked, so you see the evening before it happens.',
  },
  {
    id: 's3',
    index: '03',
    title: 'wE rUN iT',
    body: 'Crew on site from load in to load out. You get an event, not a project to manage.',
  },
] as const

export const servicesIntro = {
  title: 'whAT wE dO',
  subtext: 'fOUr thINgs, dONe pROPerly',
} as const

export const serviceGrid = [
  { id: 'g1', title: 'cORPorATe', body: 'Launches, summits, award nights and internal celebrations.' },
  { id: 'g2', title: 'wEDDIngs', body: 'Full production, from the venue walkthrough to the last song.' },
  { id: 'g3', title: 'fESTIvals', body: 'Multi stage builds, vendor coordination and crowd flow.' },
  { id: 'g4', title: 'pRIVate', body: 'Dinners, anniversaries and parties at a smaller scale.' },
] as const

export const connect = {
  title: 'lETs cONNect',
  subtext: 'tELl uS abOUt yOUr nIGHt',
  cta: 'Start a conversation',
} as const

export const footer = {
  wordmark: 'hEM',
  columns: [
    { id: 'f1', heading: 'Pages', links: ['Home', 'Events', 'Services'] },
    { id: 'f2', heading: 'Contact', links: ['hello@example.com', '+00 000 000 0000'] },
    { id: 'f3', heading: 'Social', links: ['Instagram', 'LinkedIn'] },
  ],
  note: 'Placeholder content. Nothing here is final.',
} as const
