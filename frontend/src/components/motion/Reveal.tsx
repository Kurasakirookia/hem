import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { DURATION, EASE, REVEAL_DISTANCE, REVEAL_START } from '@/design-system/motion'
import { gsap, isMotionOff } from './gsap'

type RevealProps = {
  children: ReactNode
  /** Seconds to wait after the trigger fires. Use to stagger siblings. */
  delay?: number
  as?: ElementType
  className?: string
}

/**
 * Fade and rise when scrolled into view. The workhorse of the page.
 *
 * Starts from the finished state in the DOM, so when motion is off the
 * content is simply visible. Nothing is hidden by default, which also means
 * the page reads correctly with JavaScript disabled.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const el = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isMotionOff() || !el.current) return
    const ctx = gsap.context(() => {
      gsap.from(el.current, {
        opacity: 0,
        y: REVEAL_DISTANCE,
        duration: DURATION.reveal,
        delay,
        ease: EASE.out,
        scrollTrigger: { trigger: el.current, start: REVEAL_START, once: true },
      })
    })
    return () => ctx.revert() // kills the tween and its ScrollTrigger
  }, [delay])

  return (
    <Tag ref={el} className={className}>
      {children}
    </Tag>
  )
}
