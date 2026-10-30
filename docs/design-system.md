# Design System

The palette, type scale, spacing rhythm, and motion values live in
`frontend/src/design-system/`. This document is the contract around them.

> **Current status:** the token *structure* is final; the *values* are
> placeholders. The real palette and fonts are being decided and will be
> documented here. Build components against the token *names* now. They will
> not change when the values land.

## How propagation works

```
tokens.css          declares every value as a CSS custom property
    ↓
theme.css           maps tokens into Tailwind via @theme inline
    ↓
utilities           compile to var() references, not literals
```

`max-w-content` compiles to `max-width: var(--width-content)`. Because the
utility points at the variable rather than a baked value, **editing
`tokens.css` restyles the entire site with zero component edits**. That is
the whole design, and every rule below protects it.

| Change | Files touched |
|---|---|
| Swap accent color | `tokens.css` |
| Swap heading font | `tokens.css` + drop the woff2 in `public/fonts/` |
| Change button radius everywhere | `tokens.css` |
| Change all scroll-reveal timing | `motion.ts` |
| Restyle every card | `molecules/Card.tsx` |

## The forbidden list

**In any file under `components/`, `pages/`, or `sections/`:**

- a raw hex, `rgb()`, or `hsl()` value
- a raw `px` / `rem` size for spacing, type, or radius
- a `font-family` declaration
- an animation duration or easing curve
- an arbitrary Tailwind value, such as `text-[#1a1a1a]`, `p-[37px]`,
  `duration-[420ms]`

Use the token, or add a token. Those are the only two options. If a design
needs a value the system does not have, that is a design-system
conversation, not an inline exception.

## Adding a token

1. Declare it in `tokens.css` under the right category.
2. Map it in `theme.css` if it should become a Tailwind utility.
3. Mirror it in `motion.ts` if GSAP needs it.

Never skip step one. A token that exists only in `theme.css` breaks
propagation.

## The files

| File | Owns |
|---|---|
| `tokens.css` | Every value. The single source of truth. |
| `theme.css` | The tokens → Tailwind utility mapping. No values of its own. |
| `base.css` | Element defaults: body type, heading families, selection, focus ring, reduced-motion kill switch. |
| `motion.ts` | GSAP-side mirror of the motion tokens, in seconds. |

## Motion

**GSAP only. No framer-motion, no Lenis.** framer-motion overlaps GSAP by
about 80%, and two animation runtimes on one page cause jank. Lenis was
removed in favour of ScrollSmoother, which is built alongside ScrollTrigger,
so pinned sections need no wiring between the two.

GSAP 3.15 ships every plugin free: ScrollTrigger, ScrollSmoother, MorphSVG,
SplitText, Physics2D, Flip and the rest. Register a plugin in
`components/motion/gsap.ts` when something starts using it.

- All durations and easings come from `motion.ts`. Never a literal in a tween.
- Register GSAP plugins **once**, in `components/motion/gsap.ts`. Not per
  component.
- Wrap every tween in `gsap.context()` scoped to a ref, and `ctx.revert()` on
  unmount. That kills the tweens and their ScrollTriggers together.
- Always kill tweens and ScrollTriggers on unmount, or navigation leaks them.
- `prefers-reduced-motion` is handled globally in `base.css`. JS-driven
  motion must check it too. Never animate through it.
- ScrollSmoother owns scrolling. Do not set `scroll-behavior: smooth`
  anywhere, and do not use `position: sticky` inside it. ScrollSmoother
  transforms the content wrapper, and sticky resolves against the nearest
  transformed ancestor, so it silently does nothing. Use ScrollTrigger `pin`.
- Transforms on SVG children need `transform-box: view-box` plus
  `transform-origin: center`, or GSAP and the browser disagree about the
  origin and shapes fly off screen.
- Every motion component must check `isMotionOff()` and render the finished
  state when it returns true. That covers both reduced motion and screenshots.
- 3D (`@react-three/fiber`) is lazy-loaded per route. It is ~600kb and must
  never land in the main bundle.

## Typography

Three fonts, three jobs. Do not use one in another's place.

| Token | Font | Used for |
|---|---|---|
| `--font-hero` | Orange Avenue | Every `Title`: hero, section titles, wordmark |
| `--font-display` | pending | Not used yet |
| `--font-sans` | Switzer | Body and UI |
| `--font-mono` | system mono | Metadata, labels, captions |

Every font must allow **commercial web use**. This site advertises a
business, so a personal-use licence does not apply. Keep the licence file
beside the font in `public/fonts`. See the README there.

**Exception:** Orange Avenue is the personal-use demo build, allowed for the
PoC only. It blocks a public launch until the licence is bought. See
`public/fonts/README.md`.

### Writing titles in Orange Avenue

Orange Avenue is a display serif with built-in ligatures (`th`, `ff`, `st`,
`TH` and more). The browser applies them on its own.

Write titles in `content/` in title case, exactly as they should render.

**Never apply `text-transform: uppercase` to titles.** Almost every ligature
is a lowercase pair, so all caps throws most of them away.

## Color

To be filled in when the palette is decided. The skeleton phase runs on
greys, blacks and whites only, so layout and hierarchy are judged without
colour. Token names will not change when the real palette lands, only the
values.

## Component conventions

- An atom takes styling props, never business props. `<Button variant="ghost">`,
  not `<Button isEventCTA>`.
- If a component needs more than ~5 props, it is doing two jobs. Split it.
- Compose with `cn()` from `@/lib/cn` so consumer classes can override
  cleanly. Never concatenate class strings by hand.
- Every interactive element is keyboard reachable and has a visible focus
  state. The focus ring is already in `base.css`. Do not remove it.
