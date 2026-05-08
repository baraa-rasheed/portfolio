"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import {
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  PanelRight,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { ThemeToggle } from "~/components/theme-toggle"
import { Button } from "~/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { EXPLORER_SCROLL_ANCHORS, SITE } from "~/constants/portfolio"
import { portfolioEditorTabTitle } from "~/constants/portfolio-editor-tabs"
import { EditorTabGlyphIcon } from "~/lib/explorer-glyphs"
import { cn } from "~/lib/utils"

import { usePortfolioLayout } from "./portfolio-layout-context"
import { useExplorerActiveHref } from "./site-header"

function MaximizeArrowsIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={cn("size-[9px]", className)}
      fill="none"
    >
      <path
        d="M4.6 2.2H2.2v2.4M7.4 9.8h2.4V7.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.2 2.2l3.1 3.1M9.8 9.8L6.7 6.7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MinimizeDashIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={cn("size-[9px]", className)}
      fill="none"
    >
      <path
        d="M2.5 6h7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CloseGlyphIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={cn("size-[9px]", className)}
      fill="none"
    >
      <path
        d="M3.4 3.4l5.2 5.2M8.6 3.4L3.4 8.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Hover/press feedback for the macOS traffic-light dots — scales up on hover
 * (clear "I'm pressable" cue) and scales down on press for that tactile click.
 * Motion library handles both transforms; CSS transitions on `transform`
 * would fight with motion's inline transform style.
 */
const TRAFFIC_DOT_HOVER = { scale: 1.18 } as const
const TRAFFIC_DOT_TAP = { scale: 0.88 } as const
const TRAFFIC_DOT_TRANSITION = {
  type: "spring",
  stiffness: 520,
  damping: 22,
  mass: 0.5,
} as const

function WorkbenchWindowChromeDots({
  className,
  maximized,
  onToggleMaximize,
  onCloseClick,
  onMinimizeClick,
}: {
  className?: string
  maximized: boolean
  onToggleMaximize: () => void
  onCloseClick: () => void
  onMinimizeClick: () => void
}) {
  const reduced = useReducedMotion()
  // Reduced motion: no scale, just opacity feedback.
  const hover = reduced ? undefined : TRAFFIC_DOT_HOVER
  const tap = reduced ? undefined : TRAFFIC_DOT_TAP

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-[6px]",
        className
      )}
    >
      <motion.button
        type="button"
        aria-label="Close window"
        whileHover={hover}
        whileTap={tap}
        transition={TRAFFIC_DOT_TRANSITION}
        className="group relative inline-flex size-[11px] shrink-0 items-center justify-center rounded-full bg-[#ff5f57] opacity-92 ring-[0.35px] ring-black/35 hover:opacity-100 dark:bg-[#ff6058] dark:ring-white/[0.12]"
        onClick={onCloseClick}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 grid place-items-center text-black/70 opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:text-black/65"
        >
          <CloseGlyphIcon />
        </span>
        <span className="sr-only">Close</span>
      </motion.button>

      <motion.button
        type="button"
        aria-label="Minimize window"
        whileHover={hover}
        whileTap={tap}
        transition={TRAFFIC_DOT_TRANSITION}
        className="group relative inline-flex size-[11px] shrink-0 items-center justify-center rounded-full bg-[#febc2e] opacity-92 ring-[0.35px] ring-black/25 hover:opacity-100 dark:bg-[#fdbc2e]/95 dark:ring-white/[0.08]"
        onClick={onMinimizeClick}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 grid place-items-center text-black/70 opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:text-black/65"
        >
          <MinimizeDashIcon />
        </span>
        <span className="sr-only">Minimize</span>
      </motion.button>

      <motion.button
        type="button"
        aria-label={maximized ? "Exit full screen" : "Enter full screen"}
        aria-pressed={maximized}
        whileHover={hover}
        whileTap={tap}
        transition={TRAFFIC_DOT_TRANSITION}
        className={cn(
          "group relative inline-flex size-[11px] shrink-0 items-center justify-center rounded-full bg-[#28c840] opacity-92 ring-[0.35px] ring-black/20 hover:opacity-100 dark:bg-[#28c840]/95 dark:ring-white/[0.08]"
        )}
        onClick={onToggleMaximize}
      >
        <span
          className={cn(
            "pointer-events-none absolute inset-0 grid place-items-center text-black/65 opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:text-black/60"
          )}
        >
          <MaximizeArrowsIcon />
        </span>
        <span className="sr-only">{maximized ? "Exit full screen" : "Full screen"}</span>
      </motion.button>
    </div>
  )
}

/**
 * "Close window" joke dialog — both buttons just dismiss. Renders a centered
 * modal with a backdrop blur, focus-trapped to the primary action, and closes
 * on Escape / backdrop click.
 */
function CloseConfirmDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const reduced = useReducedMotion()
  const stayBtnRef = React.useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    // Auto-focus the primary "Stay" button.
    const t = window.setTimeout(() => stayBtnRef.current?.focus(), 60)
    return () => {
      document.removeEventListener("keydown", onKey)
      window.clearTimeout(t)
    }
  }, [open, onClose])

  // The workbench parent applies a CSS transform via `motion.div`, which
  // breaks `position: fixed` for descendants. Portal to <body> so the backdrop
  // and modal are anchored to the actual viewport.
  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="close-dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="close-dialog-title"
          aria-describedby="close-dialog-desc"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 px-4 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            key="close-dialog-card"
            initial={
              reduced
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.92, y: 14 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 360, damping: 28, mass: 0.7 }
            }
            className={cn(
              "relative w-full max-w-md overflow-hidden rounded-2xl border bg-white text-foreground shadow-2xl",
              "border-black/10 dark:border-white/10 dark:bg-[#1c1d21]"
            )}
          >
            {/* Window strip — sells the macOS dialog vibe */}
            <div className="flex items-center gap-[6px] border-b border-black/[0.08] bg-black/[0.03] px-4 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.04]">
              <span className="size-[11px] rounded-full bg-[#ff5f57] ring-[0.35px] ring-black/30 dark:bg-[#ff6058]" />
              <span className="size-[11px] rounded-full bg-[#febc2e]/85 ring-[0.35px] ring-black/20 dark:bg-[#fdbc2e]/85" />
              <span className="size-[11px] rounded-full bg-[#28c840]/85 ring-[0.35px] ring-black/20 dark:bg-[#28c840]/85" />
              <span className="ml-2 truncate font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                {SITE.name.split(" ")[0] ?? SITE.name}.workspace
              </span>
            </div>

            <div className="px-6 pt-6 pb-5 sm:px-7 sm:pt-7">
              <h2
                id="close-dialog-title"
                className="font-heading text-lg font-semibold tracking-tight sm:text-xl"
              >
                Are you sure you want to close?
              </h2>
              <p
                id="close-dialog-desc"
                className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
              >
                You'll miss the rest of the portfolio — and frankly,{" "}
                <span className="font-medium text-foreground/85">
                  {SITE.name.split(" ")[0] ?? "I"}
                </span>{" "}
                worked pretty hard on it.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-black/[0.06] bg-black/[0.02] px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-2.5 sm:px-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="h-10 px-4 text-sm"
              >
                Definitely stay
              </Button>
              <Button
                ref={stayBtnRef}
                type="button"
                onClick={onClose}
                className="h-10 px-4 text-sm font-semibold"
              >
                Stay
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}

function useActiveEditorFilename(): string {
  const activeHref = useExplorerActiveHref()
  const raw =
    activeHref.startsWith("#") && activeHref.length > 1
      ? activeHref.slice(1)
      : ""
  const activeId =
    raw === "" || raw === "top"
      ? (EXPLORER_SCROLL_ANCHORS[0]?.slice(1) ?? "about")
      : raw
  return portfolioEditorTabTitle(activeId)
}

/**
 * macOS-style title strip spanning the whole glass window (`lg` only): dots + workspace,
 * then collapse → panel position → theme (left→right). Editor tab sits above the editor column.
 */
export function PortfolioWorkbenchChrome() {
  const {
    sidebarSide,
    toggleSidebarSide,
    explorerCollapsed,
    toggleExplorerCollapsed,
    workbenchMaximized,
    toggleWorkbenchMaximized,
    toggleWorkbenchMinimized,
  } = usePortfolioLayout()
  const onRight = sidebarSide === "right"
  const CollapseIcon = sidebarSide === "left" ? ChevronLeft : ChevronRight
  const ExpandIcon = sidebarSide === "left" ? ChevronRight : ChevronLeft

  const [closeDialogOpen, setCloseDialogOpen] = React.useState(false)

  const chromeBtn =
    "border-white/35 bg-white/25 backdrop-blur-md dark:border-white/12 dark:bg-white/[0.08]"

  return (
    <div className="hidden w-full shrink-0 flex-col overflow-hidden bg-white/20 lg:flex dark:bg-[#252526]/55">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/25 px-4 py-2.5 sm:px-5 dark:border-white/10">
        <div className="flex min-w-0 items-center gap-4">
          <WorkbenchWindowChromeDots
            maximized={workbenchMaximized}
            onToggleMaximize={toggleWorkbenchMaximized}
            onCloseClick={() => setCloseDialogOpen(true)}
            onMinimizeClick={toggleWorkbenchMinimized}
          />
          <span className="min-w-0 truncate font-mono text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {SITE.name.split(" ")[0] ?? SITE.name}
            <span className="font-normal text-muted-foreground/70">.workspace</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className={chromeBtn}
                onClick={toggleExplorerCollapsed}
                aria-expanded={!explorerCollapsed}
                aria-label={
                  explorerCollapsed
                    ? "Expand primary side bar"
                    : "Collapse primary side bar"
                }
              >
                {explorerCollapsed ? (
                  <ExpandIcon
                    className="size-4"
                    aria-hidden
                    strokeWidth={1.75}
                  />
                ) : (
                  <CollapseIcon
                    className="size-4"
                    aria-hidden
                    strokeWidth={1.75}
                  />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6}>
              {explorerCollapsed ? "Expand" : "Collapse"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className={chromeBtn}
                onClick={toggleSidebarSide}
                aria-label={
                  onRight
                    ? "Move primary side bar left"
                    : "Move primary side bar right"
                }
              >
                {onRight ? (
                  <PanelRight className="size-4" aria-hidden strokeWidth={1.75} />
                ) : (
                  <PanelLeft className="size-4" aria-hidden strokeWidth={1.75} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6}>
              {onRight ? "Move panel left" : "Move panel right"}
            </TooltipContent>
          </Tooltip>

          <ThemeToggle />
        </div>
      </div>

      <CloseConfirmDialog
        open={closeDialogOpen}
        onClose={() => setCloseDialogOpen(false)}
      />
    </div>
  )
}

/**
 * Editor tab row: sits at the top of `<main>` only — flush with the explorer splitter,
 * like VS Code tabs above the editor pane (`lg` only).
 */
export function PortfolioWorkbenchEditorTabBar() {
  const activeTab = useActiveEditorFilename()

  return (
    <header
      role="toolbar"
      aria-label="Editor tab"
      className="mt-0 ml-0 hidden shrink-0 items-end border-b border-neutral-950/[0.09] pt-0 pr-4 pb-0 pl-0 dark:border-white/[0.09] lg:flex sm:pr-6"
    >
      <div
        className={cn(
          "relative z-[1] -mb-px ml-0 inline-flex max-w-[min(100%,36rem)] min-w-0 items-center gap-2.5 rounded-none border border-b-0 px-4 py-2 sm:gap-3 sm:px-5 sm:py-2.5",
          "border-neutral-950/[0.14] bg-white/95 shadow-[inset_0_1px_0_0_rgb(255_255_255/_0.85)]",
          "dark:border-[#474747] dark:bg-[#1e1e1e] dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/_0.04)]"
        )}
        aria-live="polite"
      >
        <EditorTabGlyphIcon filename={activeTab} />
        <span className="min-w-0 truncate text-left font-mono text-[12px] leading-none tracking-tight text-[#2c2c2c] sm:text-[13px] dark:text-[#e8e8e8]">
          {activeTab}
        </span>
      </div>
    </header>
  )
}
