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

**GSAP + Lenis. No framer-motion.** It overlaps GSAP ~80%, and two animation
runtimes on one page cause jank.

- All durations and easings come from `motion.ts`. Never a literal in a tween.
- Register GSAP plugins **once**, at app entry. Not per component.
- Always kill tweens and ScrollTriggers on unmount, or navigation leaks them.
- `prefers-reduced-motion` is handled globally in `base.css`. JS-driven
  motion must check it too. Never animate through it.
- Lenis owns scrolling. Do not set `scroll-behavior: smooth` anywhere.
- 3D (`@react-three/fiber`) is lazy-loaded per route. It is ~600kb and must
  never land in the main bundle.

## Typography

Three fonts, three jobs. Do not use one in another's place.

| Token | Font | Used for |
|---|---|---|
| `--font-hero` | Dirtyline 36daysoftype | Hero headlines and the wordmark, nothing else |
| `--font-display` | pending | Section headings |
| `--font-sans` | pending, Switzer | Body and UI |
| `--font-mono` | system mono | Metadata, labels, captions |

Every font must allow **commercial web use**. This site advertises a
business, so a personal-use licence does not apply. Keep the licence file
beside the font in `public/fonts`. See the README there.

### Writing hero copy in Dirtyline

Dirtyline renders everything as capitals, but **the case you type picks the
letterform**:

| Typed | Renders as |
|---|---|
| `dirtyline` | plain block capitals, no decoration |
| `DIRTYLINE` | decorative swash capitals throughout |
| `dIRtY LiNE` | a mix, decoration only where a capital was typed |

So hero copy is typed in deliberate mixed case, and the mixing is a design
decision rather than a typo. Write it into `content/` exactly as it should
render.

Two rules follow:

**Never apply `text-transform` to hero text.** `uppercase` would make every
letter decorative and `lowercase` would flatten all of it. Either way the
effect is destroyed.

**Never let a copy edit silently normalise the case.** A well meaning fix
from `wE mAKe EVenTs` to `We Make Events` changes the artwork.

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
