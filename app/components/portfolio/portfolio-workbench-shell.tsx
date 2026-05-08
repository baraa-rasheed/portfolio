"use client"

import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "~/lib/utils"

import { usePortfolioLayout } from "./portfolio-layout-context"
import {
  PortfolioWorkbenchDock,
  PortfolioWorkbenchMinimizedBackdrop,
} from "./portfolio-workbench-dock"
import {
  PortfolioWorkbenchChrome,
  PortfolioWorkbenchEditorTabBar,
} from "./portfolio-workbench-top-bar"
import { PortfolioScrollActiveProvider } from "./portfolio-scroll-active-context"
import { PortfolioExplorerSmoothNav } from "./portfolio-explorer-smooth-nav"
import {
  PortfolioDesktopExplorerAside,
  SiteHeaderMobile,
  useExplorerActiveHref,
} from "./site-header"

/**
 * IDE-style workbench layout.
 *
 *  Tree (lg):
 *    [fixed inset, padded]                 ← centers the glass window in viewport
 *      [glass window]                      ← rounded, bordered, blurred chrome
 *        <chrome />                        ← traffic lights + workspace title (full width)
 *        [body row]                        ← flex-row, fills remaining glass height
 *          <sidebar?>
 *          <main = editor area>            ← flex-col: editor tab bar + section layout
 *            <editor tab bar />            ← active file tab (flush beside explorer)
 *            <#top = section layout>       ← THE paged scrollport (overflow-y: auto)
 *              <section/>...               ← each = full scrollport height; inner scroll inside
 *          <sidebar?>
 *
 *  Mobile: same DOM. Document scrolls; sections size to ~svh.
 */
export function PortfolioWorkbenchShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PortfolioScrollActiveProvider>
      <PortfolioWorkbenchShellInner>{children}</PortfolioWorkbenchShellInner>
    </PortfolioScrollActiveProvider>
  )
}

function PortfolioWorkbenchShellInner({
  children,
}: {
  children: React.ReactNode
}) {
  const activeHref = useExplorerActiveHref()
  const { sidebarSide, workbenchMaximized, workbenchMinimized } =
    usePortfolioLayout()
  const reduced = useReducedMotion()

  return (
    <div
      className={cn(
        // Mobile: normal flow, full-bleed; lg: fullscreen layer that hosts the glass window
        "relative w-full",
        "lg:fixed lg:inset-0 lg:z-30 lg:box-border lg:flex lg:flex-col",
        workbenchMaximized
          ? "lg:p-0"
          : "lg:px-8 lg:py-8 xl:px-12 xl:py-10 2xl:px-16 2xl:py-12"
      )}
    >
      <PortfolioExplorerSmoothNav />

      {/* Glass window */}
      <motion.div
        layout
        // Genie-to-dock: when minimized, scale the workbench down toward its
        // bottom-left corner and fade — visually it "sinks" into the dock pill
        // that sits at bottom-6 left-6 (rendered separately below).
        animate={
          reduced
            ? { opacity: workbenchMinimized ? 0 : 1 }
            : {
                scale: workbenchMinimized ? 0.05 : 1,
                opacity: workbenchMinimized ? 0 : 1,
                y: workbenchMinimized ? 60 : 0,
                x: workbenchMinimized ? -60 : 0,
                filter: workbenchMinimized ? "blur(4px)" : "blur(0px)",
              }
        }
        style={{ transformOrigin: "0% 100%" }}
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 520, damping: 44, mass: 0.9 }
        }
        // Make the minimized window inert so visitors can't tab into it.
        aria-hidden={workbenchMinimized || undefined}
        className={cn(
          // Mobile: column that grows to fit page
          "flex min-h-svh w-full min-w-0 flex-col",
          // lg: bounded width, fills available padded area; clip overflow at the rounded edges
          "lg:min-h-0 lg:flex-1 lg:overflow-hidden",
          workbenchMaximized ? "lg:mx-0" : "lg:mx-auto",
          // Avoid `100vw` here: it includes the scrollbar on many browsers, which can offset centering at 100% zoom.
          "lg:w-full",
          workbenchMaximized ? "lg:max-w-none" : "lg:max-w-none",
          workbenchMaximized
            ? "lg:rounded-none lg:border-0 lg:bg-[#fafafa]/52 lg:shadow-none lg:backdrop-blur-[32px]"
            : "lg:rounded-2xl lg:border lg:border-white/35 lg:bg-[#fafafa]/52 lg:shadow-[0_22px_60px_-16px_rgba(18,52,120,0.2)] lg:backdrop-blur-[32px]",
          workbenchMaximized
            ? "dark:lg:bg-[#1a1b1f]/72"
            : "dark:lg:border-white/12 dark:lg:bg-[#1a1b1f]/72 dark:lg:shadow-black/35",
          // Block all interaction with the minimized workbench (the dock pill
          // is the only restore affordance).
          workbenchMinimized && "pointer-events-none"
        )}
      >
        <PortfolioWorkbenchChrome />

        {/* Body row (sidebar | editor area) */}
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            "lg:flex-row lg:overflow-hidden"
          )}
        >
          {sidebarSide === "left" && (
            <PortfolioDesktopExplorerAside
              activeHref={activeHref}
              side="left"
            />
          )}

          {/* Editor area — semantic <main> wraps the paged section layout */}
          <main
            className={cn(
              "portfolio-editor-main-well flex min-w-0 flex-1 flex-col",
              "lg:min-h-0 lg:overflow-hidden"
            )}
          >
            <SiteHeaderMobile />

            <PortfolioWorkbenchEditorTabBar />

            {/* Section layout: stacks all sections; on lg this is the paged scroll viewport.
                `portfolio-workbench-scrollport` is a plain class — its desktop-only behavior is gated
                inside @media (min-width: 1024px) in app.css. Tailwind variants (`lg:`) cannot prefix
                custom class names; doing so produces a literal `lg:portfolio-…` that never matches. */}
            <div
              id="top"
              data-portfolio-scroll-root
              className={cn(
                "portfolio-section-layout portfolio-workbench-scrollport",
                "relative box-border block min-h-0 flex-1",
                "lg:h-0 lg:min-h-0 lg:flex-1"
              )}
            >
              {children}
            </div>
          </main>

          {sidebarSide === "right" && (
            <PortfolioDesktopExplorerAside
              activeHref={activeHref}
              side="right"
            />
          )}
        </div>
      </motion.div>

      {/* Minimized state — animated mesh gradient + Esc-to-restore hint.
          Mounted before the dock so the dock pill renders on top (z-50 > z-40). */}
      <PortfolioWorkbenchMinimizedBackdrop />

      {/* Dock pill — visible only while minimized; click to restore. */}
      <PortfolioWorkbenchDock />
    </div>
  )
}

