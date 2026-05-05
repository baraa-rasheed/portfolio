"use client"

import {
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  PanelRight,
} from "lucide-react"

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

function WorkbenchWindowChromeDots({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-[6px]",
        className
      )}
      aria-hidden
    >
      <span className="pointer-events-none size-[11px] shrink-0 rounded-full bg-[#ff5f57] opacity-92 ring-[0.35px] ring-black/35 dark:bg-[#ff6058] dark:ring-white/[0.12]" />
      <span className="pointer-events-none size-[11px] shrink-0 rounded-full bg-[#febc2e] opacity-92 ring-[0.35px] ring-black/25 dark:bg-[#fdbc2e]/95 dark:ring-white/[0.08]" />
      <span className="pointer-events-none size-[11px] shrink-0 rounded-full bg-[#28c840] opacity-92 ring-[0.35px] ring-black/20 dark:bg-[#28c840]/95 dark:ring-white/[0.08]" />
    </div>
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
  } = usePortfolioLayout()
  const onRight = sidebarSide === "right"
  const CollapseIcon = sidebarSide === "left" ? ChevronLeft : ChevronRight
  const ExpandIcon = sidebarSide === "left" ? ChevronRight : ChevronLeft

  const chromeBtn =
    "border-white/35 bg-white/25 backdrop-blur-md dark:border-white/12 dark:bg-white/[0.08]"

  return (
    <div className="hidden w-full shrink-0 flex-col overflow-hidden bg-white/20 lg:flex dark:bg-[#252526]/55">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/25 px-4 py-2.5 sm:px-5 dark:border-white/10">
        <div className="flex min-w-0 items-center gap-4">
          <WorkbenchWindowChromeDots />
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
