/**
 * GSAP setup. Imported once, from SmoothScroll.
 *
 * Plugins register here and nowhere else. Registering per component causes
 * duplicate registration warnings and wastes work on every mount.
 */
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// SplitText and Draggable are available but not registered, because nothing
// uses them yet. Add them here when something does.
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MorphSVGPlugin, Physics2DPlugin)

/**
 * True when motion must not run.
 *
 * Two reasons. The visitor asked for reduced motion, or a screenshot is being
 * taken. Playwright freezes CSS animations automatically but cannot freeze
 * GSAP, because that is JavaScript writing inline styles frame by frame. So
 * visual baselines would be flaky without this.
 *
 * Every motion component must check it and render the finished state
 * immediately. Append ?motion=off to any URL to see that state by hand.
 */
export const isMotionOff = (): boolean => {
  if (typeof window === 'undefined') return true
  const asked = new URLSearchParams(window.location.search).get('motion') === 'off'
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return asked || reduced
}

export { gsap, ScrollTrigger, ScrollSmoother, MorphSVGPlugin, Physics2DPlugin }
