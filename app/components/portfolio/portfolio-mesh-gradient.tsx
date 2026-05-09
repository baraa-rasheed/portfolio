"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "~/lib/utils"

/**
 * Drifting mesh used behind the whole site (`PortfolioPageAmbience`) and reused
 * when the workbench is minimized — keeps visuals consistent.
 */
export function PortfolioMeshGradient({
  className,
}: {
  className?: string
}) {
  const reduced = useReducedMotion()

  return (
    <div className={cn("pointer-events-none overflow-hidden", className)}>
      <motion.div
        aria-hidden
        className="portfolio-mesh-blob absolute -top-1/4 -left-1/4 size-[70vmax] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.7 0.18 250 / 0.7), transparent 70%)",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "12%", "-6%", "0%"],
                y: ["0%", "-8%", "10%", "0%"],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="portfolio-mesh-blob absolute top-1/3 right-[-15%] size-[60vmax] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.66 0.22 295 / 0.65), transparent 70%)",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "-10%", "8%", "0%"],
                y: ["0%", "12%", "-6%", "0%"],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      <motion.div
        aria-hidden
        className="portfolio-mesh-blob absolute -bottom-1/4 left-1/4 size-[55vmax] rounded-full opacity-55 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.78 0.16 175 / 0.55), transparent 70%)",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "8%", "-12%", "0%"],
                y: ["0%", "-6%", "8%", "0%"],
              }
        }
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]",
          "[background-image:radial-gradient(rgba(0,0,0,0.55)_1px,transparent_1px)]",
          "[background-size:3px_3px]"
        )}
      />
    </div>
  )
}
