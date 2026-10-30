# style-nectar

**Source:** pasted 2026-10-30. "Fun, Modern, Playful Website Design and
Layout for Candy Subscription Brand", by ATNN Design Studio, for Nectar.
**Image:** `style-nectar.jpg` (gitignored)
**Applies to:** the whole site, as a style reference only

This is a **style** reference, not a layout one. HEM keeps its own layout
and section order. We take the colors, the edges, the lines, and the
component look.

## Layout

Not taken. Our layout stays.

## Typography

| Role in the reference | HEM token |
|---|---|
| Elegant serif titles ("Where to Find Us Today") | `--font-hero`, Orange Avenue. Already close. |
| Tiny uppercase spaced labels ("CATCH US IF YOU CANDY!") | `--font-sans` + `--tracking-wide` + `--text-xs`. Replaces our mono captions. |
| Body text, small sans | `--font-sans`, Switzer |
| Giant chunky footer wordmark | Skipped for now |

## Spacing

Generous section padding, tight inside cards. Our `--space-section` rhythm
already fits.

## Color

Sampled from the image.

| Reference | Hex | Token |
|---|---|---|
| Cream page | `#fdf8f2` | `--color-bg` |
| Maroon bands, text, lines | `#801026` | `--color-brand`, `--color-text`, `--color-bg-inverse`, `--color-line-strong` |
| Pink fills, text on maroon | `#f5d5da` | `--color-soft`, `--color-text-inverse` |
| Periwinkle callout and bottom bar | `#c0c5fd` | `--color-accent` |
| Faint lavender graph paper lines | about `#dcdbf5` | `--color-grid-line` |

Contrast checked: maroon on cream 9.8:1, pink on maroon 7.6:1, maroon on
periwinkle 6.3:1. Periwinkle on cream is only 1.6:1, so it is never used for
text or the focus ring.

## Components seen

| Piece | HEM plan |
|---|---|
| Graph paper background | `Section` tone `grid`, pure CSS |
| Scalloped edge under the nav | `Edge` variant `scallop` |
| Punched holes along a card top | `Edge` variant `holes` |
| Checkerboard strip between sections | `Edge` variant `checker` |
| 1px maroon outlined boxes | `Frame` |
| Small uppercase labels | `Eyebrow` |
| Solid and outline small buttons | `Button` |
| Pink highlight chip | `Tag` |
| Rounded image card with serif title | `MediaCard` |
| Periwinkle pill bar | `CalloutBar` |
| Social icons | Phosphor icons through `IconContext` |

## Motion

The reference is static. Our existing motion stays.

## States

Buttons: solid maroon fills, outline buttons fill maroon on hover. Focus
ring is maroon, because periwinkle fails contrast.

## Responsive

Not shown in the reference. Judge per section with `pnpm shot`.

## Notes

Not copied, on purpose:
- The Nectar wordmark, stickers, candy illustrations and photos. They belong
  to the client and the studio.
- The page layout. HEM keeps its own.
- The hand-drawn arrow and circle annotations. Maybe later, drawn on with
  GSAP.
- Olive green. It only appears as a photo background.
- Flat design: no shadows anywhere.
