import type { IconProps } from '@phosphor-icons/react'

/**
 * Defaults for every Phosphor icon, applied once through IconContext in
 * App.tsx. Change the weight here and every icon on the site follows.
 *
 * color: currentColor, so an icon takes the text color around it and flips
 *        with the tone. Never pass a color to an icon.
 * size:  1em, so an icon scales with the text beside it. Size it with a
 *        text class on the parent, not a size prop.
 * weight: regular matches the 1px maroon lines. Thin, light, bold, fill and
 *        duotone also exist.
 */
export const ICON_DEFAULTS: IconProps = {
  color: 'currentColor',
  size: '1em',
  weight: 'regular',
}
