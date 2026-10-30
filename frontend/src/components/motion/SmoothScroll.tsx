import { useEffect, useRef, type ReactNode } from 'react'
import { ScrollSmoother, isMotionOff } from './gsap'

/**
 * Wraps the whole page in ScrollSmoother.
 *
 * The wrapper and content divs are required by ScrollSmoother, which needs a
 * fixed outer element and a transformed inner one. Do not remove them.
 *
 * ScrollSmoother replaces Lenis here. Both do smooth scrolling, but this one
 * is built alongside ScrollTrigger, so pinned sections need no wiring.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMotionOff()) return
    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current!,
      content: content.current!,
      smooth: 1.2,
      effects: true, // enables data-speed and data-lag on children
    })
    return () => {
      smoother.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  )
}
