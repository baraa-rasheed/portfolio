"use client"

import type * as React from "react"

import { cn } from "~/lib/utils"

import { usePortfolioLayout } from "./portfolio-layout-context"
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
  const { sidebarSide } = usePortfolioLayout()

  return (
    <div
      className={cn(
        // Mobile: normal flow, full-bleed; lg: fullscreen layer that hosts the glass window
        "relative w-full",
        "lg:fixed lg:inset-0 lg:z-30 lg:box-border lg:flex lg:flex-col lg:p-6 lg:pb-8 xl:p-10"
      )}
    >
      <PortfolioExplorerSmoothNav />

      {/* Glass window */}
      <div
        className={cn(
          // Mobile: column that grows to fit page
          "flex min-h-svh w-full min-w-0 flex-col",
          // lg: bounded width, fills available padded area; clip overflow at the rounded edges
          "lg:mx-auto lg:min-h-0 lg:flex-1 lg:overflow-hidden",
          "lg:w-[min(calc(100vw-3rem),84rem)] lg:max-w-[min(calc(100vw-3rem),84rem)]",
          "lg:rounded-2xl lg:border lg:border-white/35 lg:bg-[#fafafa]/52 lg:shadow-[0_22px_60px_-16px_rgba(18,52,120,0.2)] lg:backdrop-blur-[32px]",
          "dark:lg:border-white/12 dark:lg:bg-[#1a1b1f]/72 dark:lg:shadow-black/35"
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
      </div>
    </div>
  )
}

