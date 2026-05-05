"use client"

import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { cn } from "~/lib/utils"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  /** Extra delay before the reveal transition starts (used for staggering). */
  delayMs?: number
  direction?: "up" | "left" | "right"
  /**
   * Controlled mode: parent toggles visibility (no internal IntersectionObserver).
   * When omitted, visibility is driven by entering the viewport.
   */
  revealed?: boolean
}

function workbenchScrollRoot(): HTMLElement | null {
  if (typeof document === "undefined") return null
  return document.querySelector(
    "[data-portfolio-scroll-root]"
  ) as HTMLElement | null
}

function isLgWorkbench(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(min-width: 1024px)").matches
}

/** Whether `el` is already meaningfully visible in the relevant scrollport (viewport vs workbench). */
function isAlreadyRevealed(el: HTMLElement, root: HTMLElement | null): boolean {
  const rect = el.getBoundingClientRect()
  if (!root) {
    const vh = window.innerHeight
    return rect.top < vh * 0.9 && rect.bottom > vh * 0.12
  }
  const rr = root.getBoundingClientRect()
  const visibleTop = Math.max(rect.top, rr.top)
  const visibleBottom = Math.min(rect.bottom, rr.bottom)
  const overlap = visibleBottom - visibleTop
  const minOverlap = Math.min(Math.max(rect.height * 0.06, 32), rect.height)
  return overlap >= minOverlap && rect.bottom > rr.top + 24 && rect.top < rr.bottom - 24
}

/**
 * Fade + slide in when the element enters the scrollport (mobile: document;
 * desktop workbench: `[data-portfolio-scroll-root]`). Respects reduced motion.
 */
export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  direction = "up",
  revealed,
}: ScrollRevealProps) {
  const isControlled = revealed !== undefined
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(() => {
    if (isControlled) {
      return !!revealed
    }
    return true
  })
  const [runsScrollAnimation, setRunsScrollAnimation] = useState(false)

  useLayoutEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (isControlled) {
      if (reduced) {
        setRunsScrollAnimation(false)
        setVisible(true)
        return
      }
      setRunsScrollAnimation(true)
      setVisible(!!revealed)
      return
    }

    if (typeof window === "undefined" || reduced) {
      return
    }

    const el = ref.current
    if (!el) {
      return
    }

    const root = isLgWorkbench() ? workbenchScrollRoot() : null
    const alreadyVisible = isAlreadyRevealed(el, root)

    setRunsScrollAnimation(!alreadyVisible)
    if (!alreadyVisible) {
      setVisible(false)
    }
  }, [isControlled, revealed])

  useEffect(() => {
    if (isControlled) {
      return
    }

    if (!runsScrollAnimation || visible) {
      return
    }

    const el = ref.current
    if (!el) {
      return
    }

    const mq = window.matchMedia("(min-width: 1024px)")
    let observer: IntersectionObserver | null = null

    const connect = (): void => {
      observer?.disconnect()
      const rootEl = mq.matches ? workbenchScrollRoot() : null
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer?.disconnect()
          }
        },
        {
          root: rootEl ?? null,
          rootMargin: rootEl ? "0px 0px -10% 0px" : "0px 0px -14% 0px",
          threshold: [0, 0.08],
        }
      )
      observer.observe(el)
    }

    connect()

    const onMq = (): void => {
      if (!visible) connect()
    }
    mq.addEventListener("change", onMq)

    return () => {
      mq.removeEventListener("change", onMq)
      observer?.disconnect()
    }
  }, [isControlled, runsScrollAnimation, visible])

  const offset =
    direction === "up"
      ? "translate-y-6"
      : direction === "left"
        ? "-translate-x-6"
        : "translate-x-6"

  return (
    <div
      ref={ref}
      style={
        runsScrollAnimation && visible && delayMs > 0
          ? ({ transitionDelay: `${delayMs}ms` } as const)
          : undefined
      }
      className={cn(
        runsScrollAnimation &&
          "transition-[opacity,transform] duration-[440ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:will-change-[opacity,transform]",
        "motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none motion-reduce:will-change-auto",
        visible
          ? "translate-x-0 translate-y-0 opacity-100 motion-safe:will-change-auto"
          : cn("opacity-0", offset),
        className
      )}
    >
      {children}
    </div>
  )
}
