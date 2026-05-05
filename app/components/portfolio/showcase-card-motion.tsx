"use client"

import { type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "~/lib/utils"

/**
 * Spring tuned for a Moti-like settle on the web. Moti targets RN + Reanimated; this app uses
 * Motion (`motion/react`) for pointer-driven scale in the DOM.
 */
export const showcaseCardSpring = {
  type: "spring" as const,
  stiffness: 460,
  damping: 34,
  mass: 0.72,
}

export function useShowcaseCardHoverMotion(enabled = true, scale = 1.022) {
  const reduced = useReducedMotion()
  return {
    initial: false as const,
    whileHover: enabled && !reduced ? { scale } : undefined,
    transition: showcaseCardSpring,
  }
}

type ShowcaseCardMotionProps = {
  children: ReactNode
  enableHoverMotion?: boolean
  className?: string
  hoverScale?: number
}

export function ShowcaseCardMotion({
  children,
  enableHoverMotion = true,
  className,
  hoverScale = 1.022,
}: ShowcaseCardMotionProps) {
  const hover = useShowcaseCardHoverMotion(enableHoverMotion, hoverScale)

  return (
    <motion.div
      role="presentation"
      className={cn("w-full self-stretch", className)}
      {...hover}
    >
      {children}
    </motion.div>
  )
}
