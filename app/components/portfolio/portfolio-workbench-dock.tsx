"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { SITE } from "~/constants/portfolio"
import { cn } from "~/lib/utils"

import { usePortfolioLayout } from "./portfolio-layout-context"
import { PortfolioMeshGradient } from "./portfolio-mesh-gradient"

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
          <PortfolioMeshGradient className="pointer-events-none absolute inset-0" />

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
 * Dock pill — `lg` only, absolute to workbench shell; toggles minimize / restore.
 * Hidden while the glass is maximized (expanded edge-to-edge), except when minimized
 * so restore stays available. Mobile: no yellow-window chrome.
 */
export function PortfolioWorkbenchDock() {
  const {
    workbenchMinimized,
    workbenchMaximized,
    toggleWorkbenchMinimized,
  } = usePortfolioLayout()

  const firstName = SITE.name.split(" ")[0] ?? SITE.name
  const showDock = !workbenchMaximized || workbenchMinimized

  if (!showDock) return null

  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-6 left-6 z-50 hidden lg:block"
      )}
    >
      <button
        type="button"
        onClick={toggleWorkbenchMinimized}
        aria-pressed={workbenchMinimized}
        aria-label={
          workbenchMinimized
            ? `Restore ${SITE.name} workspace`
            : `Minimize ${SITE.name} workspace`
        }
        className={cn(
          "pointer-events-auto group/dock flex items-center gap-2.5 rounded-full border px-3.5 py-2 backdrop-blur-2xl",
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
          <span
            className={cn(
              "absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full",
              workbenchMinimized
                ? "bg-muted-foreground/40 dark:bg-white/35"
                : "bg-emerald-500/90 dark:bg-emerald-400/90"
            )}
          />
        </span>

        <span className="flex min-w-0 flex-col items-start text-left leading-none">
          <span className="font-mono text-[9px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {workbenchMinimized ? "Minimized" : "Workspace"}
          </span>
          <span className="mt-0.5 truncate font-heading text-[13px] font-semibold tracking-tight">
            {firstName}.workspace
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
          {workbenchMinimized ? "Click to restore" : "Click to minimize"}
        </span>
      </button>
    </div>
  )
}
