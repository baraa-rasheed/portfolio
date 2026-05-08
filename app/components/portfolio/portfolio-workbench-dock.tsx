"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { SITE } from "~/constants/portfolio"
import { cn } from "~/lib/utils"

import { usePortfolioLayout } from "./portfolio-layout-context"

/**
 * Backdrop shown ONLY when the workbench is minimized — fills the empty space
 * with a slow, drifting mesh gradient and a tiny "press Esc / click anywhere
 * to restore" hint. Click or Esc returns to the workspace.
 */
export function PortfolioWorkbenchMinimizedBackdrop() {
  const { workbenchMinimized, setWorkbenchMinimized } = usePortfolioLayout()
  const reduced = useReducedMotion()

  const restore = React.useCallback(() => {
    setWorkbenchMinimized(false)
  }, [setWorkbenchMinimized])

  // Esc to restore. Bound only while minimized.
  React.useEffect(() => {
    if (!workbenchMinimized) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        restore()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [workbenchMinimized, restore])

  return (
    <AnimatePresence>
      {workbenchMinimized ? (
        <motion.div
          key="workbench-minimized-backdrop"
          role="button"
          tabIndex={-1}
          aria-label="Restore workspace"
          onClick={restore}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 0.85, 0.25, 1] }}
          className={cn(
            // Fills the viewport behind the dock pill (z-40 < dock z-50).
            // Cursor reads `pointer` so it's obvious the whole surface is a
            // restore target.
            "fixed inset-0 z-40 hidden cursor-pointer overflow-hidden lg:block",
            "bg-[#f5f7fb] dark:bg-[#0c0d10]"
          )}
        >
          {/* Drifting mesh gradient — 3 large soft blobs animating in a slow
              loop. Pure CSS keyframes via motion's animate prop so they pause
              when reduced motion is requested. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-1/4 -left-1/4 size-[70vmax] rounded-full opacity-70 blur-3xl"
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
            className="pointer-events-none absolute top-1/3 right-[-15%] size-[60vmax] rounded-full opacity-60 blur-3xl"
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
            className="pointer-events-none absolute -bottom-1/4 left-1/4 size-[55vmax] rounded-full opacity-55 blur-3xl"
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

          {/* Subtle grain noise to keep the gradient from looking too plastic */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]",
              "[background-image:radial-gradient(rgba(0,0,0,0.55)_1px,transparent_1px)]",
              "[background-size:3px_3px]"
            )}
          />

          {/* Restore hint — top center, doesn't compete with the dock pill */}
          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.35, duration: 0.4 }}
            className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2"
          >
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-md",
                "border-foreground/10 bg-white/55 text-foreground/75",
                "dark:border-white/10 dark:bg-white/[0.06] dark:text-foreground/80"
              )}
            >
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
                Workspace minimized
              </span>
              <span aria-hidden className="text-foreground/30">·</span>
              <span className="text-[11px]">Press</span>
              <kbd
                className={cn(
                  "inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md border px-1 font-mono text-[10px] font-semibold",
                  "border-foreground/15 bg-foreground/[0.06]",
                  "dark:border-white/15 dark:bg-white/[0.08]"
                )}
              >
                Esc
              </kbd>
              <span className="text-[11px]">or click anywhere to restore</span>
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * Floating "dock" pill that appears at the bottom-left of the viewport when
 * the workbench is minimized — click to restore. Visible on `lg` only since
 * the minimize chrome itself is `lg`-only.
 */
export function PortfolioWorkbenchDock() {
  const { workbenchMinimized, setWorkbenchMinimized } = usePortfolioLayout()
  const reduced = useReducedMotion()

  const restore = React.useCallback(() => {
    setWorkbenchMinimized(false)
  }, [setWorkbenchMinimized])

  return (
    <AnimatePresence>
      {workbenchMinimized ? (
        <motion.div
          key="workbench-dock"
          initial={
            reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.6 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reduced ? { opacity: 0 } : { opacity: 0, y: 80, scale: 0.6 }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                  mass: 0.7,
                  delay: 0.18,
                }
          }
          className={cn(
            // Position: bottom-left of viewport, lg-only (mobile has no
            // minimize affordance anyway).
            "pointer-events-auto fixed bottom-6 left-6 z-50 hidden lg:block"
          )}
        >
          <button
            type="button"
            onClick={restore}
            aria-label={`Restore ${SITE.name} workspace`}
            className={cn(
              "group/dock flex items-center gap-2.5 rounded-full border px-3.5 py-2 backdrop-blur-2xl",
              "border-white/45 bg-white/65 text-foreground shadow-[0_8px_24px_-10px_rgba(18,52,120,0.35),0_22px_60px_-16px_rgba(18,52,120,0.25)]",
              "transition-[transform,box-shadow,background-color] duration-200 ease-out",
              "hover:-translate-y-0.5 hover:bg-white/85",
              "hover:shadow-[0_12px_32px_-12px_rgba(18,52,120,0.45),0_28px_68px_-18px_rgba(18,52,120,0.35)]",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              "dark:border-white/10 dark:bg-[#1a1b1f]/85 dark:text-foreground",
              "dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]",
              "dark:hover:bg-[#222327]/90"
            )}
          >
            {/* App "icon" tile — mimics a Dock icon */}
            <span
              aria-hidden
              className={cn(
                "relative flex size-7 shrink-0 items-center justify-center rounded-md",
                "bg-linear-to-br from-sky-500 via-indigo-500 to-violet-600",
                "text-white shadow-[0_2px_6px_-1px_rgba(63,77,180,0.55)]",
                "transition-transform duration-300 ease-out group-hover/dock:scale-105"
              )}
            >
              <span className="font-mono text-[11px] font-bold tracking-tight">
                {(SITE.name.match(/\b[A-Z]/g) ?? []).slice(0, 2).join("") || "B"}
              </span>
              {/* macOS dock indicator dot */}
              <span className="absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-foreground/55 dark:bg-white/55" />
            </span>

            <span className="flex min-w-0 flex-col items-start text-left leading-none">
              <span className="font-mono text-[9px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Minimized
              </span>
              <span className="mt-0.5 truncate font-heading text-[13px] font-semibold tracking-tight">
                {SITE.name.split(" ")[0] ?? SITE.name}.workspace
              </span>
            </span>

            <span
              className={cn(
                "ml-1 hidden rounded-md border border-foreground/10 bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[10px] tracking-tight text-muted-foreground",
                "transition-colors duration-200 group-hover/dock:bg-foreground/[0.1]",
                "sm:inline-block",
                "dark:border-white/10 dark:bg-white/[0.06]"
              )}
            >
              Click to restore
            </span>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
