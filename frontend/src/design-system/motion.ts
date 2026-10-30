/** GSAP-side mirror of the motion tokens in tokens.css.
 *  Seconds, because GSAP takes seconds. Keep in sync with tokens.css. */
export const DURATION = {
  fast: 0.18,
  base: 0.32,
  slow: 0.7,
  reveal: 1.1,
} as const

export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
  /** Constant speed. For physics and loops, where easing would fight. */
  linear: 'none',
} as const

/** Hero cherry blossom petals, in seconds. Each petal falls for
 *  fallMin plus up to fallSpread, so no two land in step. */
export const PETALS = {
  fadeIn: 0.4,
  fadeOut: 1.2,
  fallMin: 7,
  fallSpread: 4,
  /** Up to this long before a petal first appears. */
  startSpread: 6,
  /** One half turn of the flutter. */
  flutter: 1.4,
} as const

/** How far a revealed element travels, in pixels. */
export const REVEAL_DISTANCE = 40

/** Shared ScrollTrigger start point so every reveal fires at the same
 *  place in the viewport. */
export const REVEAL_START = 'top 82%'
