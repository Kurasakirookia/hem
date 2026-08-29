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

## Typography and color

To be filled in when the palette and fonts are decided. This section will
carry the actual values, the reasoning behind them, and the pairings that are
allowed.

## Component conventions

- An atom takes styling props, never business props. `<Button variant="ghost">`,
  not `<Button isEventCTA>`.
- If a component needs more than ~5 props, it is doing two jobs. Split it.
- Compose with `cn()` from `@/lib/cn` so consumer classes can override
  cleanly. Never concatenate class strings by hand.
- Every interactive element is keyboard reachable and has a visible focus
  state. The focus ring is already in `base.css`. Do not remove it.
