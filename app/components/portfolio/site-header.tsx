"use client"

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
} from "lucide-react"
import * as React from "react"

import { ThemeToggle } from "~/components/theme-toggle"
import { Button } from "~/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import { Separator } from "~/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import {
  EXPLORER_TREE,
  SITE,
  type ExplorerFileRow,
  type ExplorerFolderRow,
  type ExplorerRow,
} from "~/constants/portfolio"
import {
  ExplorerFileGlyphIcon,
  ExplorerFolderGlyphIcon,
} from "~/lib/explorer-glyphs"
import { cn } from "~/lib/utils"

import { usePortfolioLayout } from "./portfolio-layout-context"
import { usePortfolioScrollActiveHref } from "./portfolio-scroll-active-context"

/** Local alias so this module can call the hook; `export … from` does not create an in-file binding. */
export const useExplorerActiveHref = usePortfolioScrollActiveHref

const explorerPaneCls = cn(
  "rounded-md border border-white/35 bg-white/[0.18] opacity-[0.99] backdrop-blur-xl",
  "dark:border-white/12 dark:bg-[#252526]/32"
)

const vscodeFileRowBase = cn(
  "flex w-full min-w-0 cursor-default items-center gap-2 border-l-[3px] border-transparent py-1.5 pr-1.5 pl-1.5 font-mono text-[12px] leading-snug text-[#383838] transition-colors outline-none select-none",
  "dark:text-[#cccccc]",
  "hover:bg-black/[0.05] hover:text-black dark:hover:bg-white/[0.06] dark:hover:text-white"
)

const vscodeFileRowActive = cn(
  "!border-[#007acc] bg-[#e8e8e8] dark:!border-[#3794ff] dark:bg-[#37373d]"
)

const vscodeFolderRowBase = cn(
  "group/folder flex w-full min-w-0 items-center gap-0 rounded-sm py-0.5 pr-1 pl-1.5 font-mono text-[12px] leading-snug transition-colors outline-none select-none",
  "text-[#383838] hover:bg-black/[0.05] hover:text-black dark:text-[#cccccc] dark:hover:bg-white/[0.06] dark:hover:text-white"
)

/** Flatten explorer leaves in scroll order (folders expanded inline). */
function explorerFlatFiles(rows: readonly ExplorerRow[]): ExplorerFileRow[] {
  const out: ExplorerFileRow[] = []
  rows.forEach((r) => {
    if (r.type === "file") out.push(r)
    else out.push(...r.children)
  })
  return out
}

function folderInitialExpanded(
  rows: readonly ExplorerRow[]
): Record<string, boolean> {
  const map: Record<string, boolean> = {}
  rows.forEach((r) => {
    if (r.type === "folder") {
      map[r.folderName] = r.defaultOpen !== false
    }
  })
  return map
}

function wrapExplorerLink(
  drawer: boolean,
  hrefKey: string,
  node: React.ReactElement,
  labelForKey: string
): React.ReactNode {
  return drawer ? (
    <SheetClose key={`${hrefKey}-${labelForKey}`} asChild>
      {node}
    </SheetClose>
  ) : (
    <div key={hrefKey}>{node}</div>
  )
}

/** Single file leaf in the explorer. */
function ExplorerFileLeaf({
  file,
  variant,
  activeHref,
  onNavigate,
}: {
  file: ExplorerFileRow
  variant: "pane" | "drawer"
  activeHref: string
  onNavigate?: () => void
}) {
  const drawer = variant === "drawer"
  const selected = activeHref === file.href
  const anchor = (
    <a
      href={file.href}
      onClick={onNavigate}
      title={file.label}
      aria-label={`${file.label}, ${file.explorerFile}`}
      aria-current={selected ? "page" : undefined}
      className={cn(vscodeFileRowBase, selected && vscodeFileRowActive)}
    >
      <ExplorerFileGlyphIcon kind={file.explorerKind} size={14} />
      <span className="min-w-0 flex-1 truncate">{file.explorerFile}</span>
    </a>
  )

  return wrapExplorerLink(drawer, file.href, anchor, file.explorerFile)
}

/** Collapsible folder (e.g. `projects/`) with indented file rows. */
function ExplorerFolderBranch({
  folder,
  variant,
  activeHref,
  onNavigate,
  expanded,
  onToggleExpanded,
}: {
  folder: ExplorerFolderRow
  variant: "pane" | "drawer"
  activeHref: string
  onNavigate?: () => void
  expanded: boolean
  onToggleExpanded: () => void
}) {
  const drawer = variant === "drawer"
  const collapsible = folder.collapsible !== false
  const open = collapsible ? expanded : true

  const labelClass = cn(
    vscodeFolderRowBase,
    "flex min-w-0 flex-1 items-center gap-1.5 py-1",
    "!pr-0 !pl-0"
  )

  let folderPrimary: React.ReactNode
  if (folder.folderHref) {
    const link = (
      <a
        href={folder.folderHref}
        onClick={onNavigate}
        title={folder.folderLabel}
        aria-label={`${folder.folderLabel}, ${folder.folderName}/`}
        className={labelClass}
      >
        <ExplorerFolderGlyphIcon open={open} size={14} />
        <span className="min-w-0 truncate">{folder.folderName}/</span>
      </a>
    )
    folderPrimary = drawer ? <SheetClose asChild>{link}</SheetClose> : link
  } else {
    folderPrimary = (
      <span
        className={cn(labelClass, "!cursor-default")}
        title={folder.folderLabel}
      >
        <ExplorerFolderGlyphIcon open={open} size={14} />
        <span className="min-w-0 truncate">{folder.folderName}/</span>
      </span>
    )
  }

  return (
    <div key={folder.folderName} className="space-y-0.5">
      <div className={cn(vscodeFolderRowBase, "px-1.5 py-0.5")}>
        <div className="flex min-w-0 flex-1 items-stretch gap-px">
          {collapsible ? (
            <button
              type="button"
              aria-expanded={open}
              aria-label={
                open
                  ? `Collapse ${folder.folderLabel}`
                  : `Expand ${folder.folderLabel}`
              }
              title={open ? "Collapse folder" : "Expand folder"}
              className="-ml-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-sm text-[#848484] hover:bg-black/[0.06] dark:text-[#9d9d9d] dark:hover:bg-white/[0.08]"
              onClick={(e) => {
                e.preventDefault()
                onToggleExpanded()
              }}
            >
              {open ? (
                <ChevronDownIcon
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-3.5"
                />
              ) : (
                <ChevronRightIcon
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-3.5"
                />
              )}
            </button>
          ) : (
            <span
              className="-ml-0.5 inline-flex size-7 shrink-0 items-center justify-center text-[#848484] dark:text-[#9d9d9d]"
              aria-hidden
              title={folder.folderLabel}
            >
              <ChevronDownIcon
                aria-hidden
                strokeWidth={1.75}
                className="size-3.5"
              />
            </span>
          )}
          {folderPrimary}
        </div>
      </div>

      {open ? (
        <div
          className={cn(
            "relative ml-[7px] space-y-0.5 border-l py-0.5 pr-0.5",
            "border-[#dcdcdc]/90 dark:border-[#3f3f3f]"
          )}
        >
          {folder.children.map((child) => (
            <div key={child.href} className="pl-[6px]">
              <ExplorerFileLeaf
                file={child}
                variant={variant}
                activeHref={activeHref}
                onNavigate={onNavigate}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function VsCodeExplorer({
  variant,
  activeHref,
  onNavigate,
  collapsed = false,
  tooltipSide = "right",
}: {
  variant: "pane" | "drawer"
  activeHref: string
  onNavigate?: () => void
  /** Narrow desktop rail: icon-only section links. */
  collapsed?: boolean
  tooltipSide?: "left" | "right"
}) {
  const [foldersOpen, setFoldersOpen] = React.useState<Record<string, boolean>>(
    () => folderInitialExpanded(EXPLORER_TREE)
  )

  const toggleFolder = React.useCallback((name: string) => {
    const row = EXPLORER_TREE.find(
      (r) => r.type === "folder" && r.folderName === name
    )
    if (row?.type === "folder" && row.collapsible === false) return

    setFoldersOpen((s) => ({
      ...s,
      [name]: s[name] === undefined ? false : !s[name],
    }))
  }, [])

  if (variant === "pane" && collapsed) {
    const leaves = explorerFlatFiles(EXPLORER_TREE)
    return (
      <TooltipProvider delayDuration={250}>
        <nav
          data-portfolio-explorer-nav
          aria-label="Workspace sections"
          className="flex flex-col items-center gap-1.5 px-0.5 py-1"
        >
          {leaves.map((file) => {
            const selected = activeHref === file.href
            return (
              <Tooltip key={file.href}>
                <TooltipTrigger asChild>
                  <a
                    href={file.href}
                    onClick={onNavigate}
                    aria-label={file.label}
                    aria-current={selected ? "page" : undefined}
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-md border border-transparent transition-colors outline-none",
                      "hover:bg-black/[0.05] hover:text-black dark:hover:bg-white/[0.06] dark:hover:text-white",
                      selected &&
                        "bg-[#e8e8e8] shadow-[inset_0_0_0_1px_rgb(0_122_204)] dark:bg-[#37373d] dark:shadow-[inset_0_0_0_1px_rgb(55_148_255)]"
                    )}
                  >
                    <ExplorerFileGlyphIcon kind={file.explorerKind} size={16} />
                  </a>
                </TooltipTrigger>
                <TooltipContent side={tooltipSide} sideOffset={8}>
                  {file.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>
      </TooltipProvider>
    )
  }

  return (
    <div
      data-portfolio-explorer-nav
      className={cn(
        variant === "drawer" &&
          cn("rounded-md border opacity-[0.99]", explorerPaneCls),
        variant === "pane" && "px-0.5 pt-0.5"
      )}
    >
      <div
        className={cn(
          "flex items-center px-1.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase",
          variant === "drawer" &&
            "border-b border-[#e0e0e0] dark:border-[#3c3c3c]"
        )}
      >
        Explorer
      </div>

      <div role="tree" aria-label="Workspace files" className="py-1.5 pb-2">
        <div
          className={cn(
            "flex cursor-default items-center gap-0.5 px-1.5 py-1 pl-3 font-mono text-[12px] text-[#383838]",
            "dark:text-[#cccccc]"
          )}
          aria-expanded="true"
        >
          <ChevronDownIcon
            aria-hidden
            strokeWidth={1.75}
            className="size-3.5 shrink-0 text-[#848484] dark:text-[#9d9d9d]"
          />
          <ExplorerFolderGlyphIcon open size={14} />
          <span className="ml-0.5 min-w-0 truncate font-semibold">portfolio</span>
        </div>

        <div className="mt-0.5 space-y-0.5 pr-0.5 pb-1 pl-1.5">
          {EXPLORER_TREE.map((row) =>
            row.type === "folder" ? (
              <ExplorerFolderBranch
                key={row.folderName}
                folder={row}
                variant={variant}
                activeHref={activeHref}
                onNavigate={onNavigate}
                expanded={foldersOpen[row.folderName] !== false}
                onToggleExpanded={() => toggleFolder(row.folderName)}
              />
            ) : (
              <ExplorerFileLeaf
                key={row.href}
                file={row}
                variant={variant}
                activeHref={activeHref}
                onNavigate={onNavigate}
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}

/** Desktop explorer docked inside `PortfolioWorkbenchShell` (not a separate floating pane). */
export function PortfolioDesktopExplorerAside({
  activeHref,
  side,
}: {
  activeHref: string
  side: "left" | "right"
}) {
  const { explorerCollapsed } = usePortfolioLayout()

  return (
    <aside
      className={cn(
        "portfolio-desktop-explorer portfolio-explorer-pane-glass hidden shrink-0 flex-col overflow-hidden transition-[width] duration-200 ease-out lg:flex",
        explorerCollapsed ? "w-[3.25rem] min-w-[3.25rem]" : "w-[236px] min-w-[236px]",
        side === "left"
          ? "border-r border-neutral-950/[0.06] dark:border-white/[0.07]"
          : "border-l border-neutral-950/[0.06] dark:border-white/[0.07]"
      )}
      aria-label="Portfolio explorer"
    >
      <style>{`
        .portfolio-desktop-explorer { scrollbar-gutter: stable; }
        .portfolio-desktop-explorer::-webkit-scrollbar { width: 10px; }
        .portfolio-desktop-explorer::-webkit-scrollbar-thumb {
          border-radius: 6px;
          background: rgb(145 145 145 / 0.45);
        }
        .dark .portfolio-desktop-explorer::-webkit-scrollbar-thumb {
          background: rgb(85 85 85 / 0.55);
        }
      `}</style>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-y-auto pb-2 pt-2",
          explorerCollapsed ? "px-1" : "px-2"
        )}
      >
        <VsCodeExplorer
          variant="pane"
          activeHref={activeHref}
          collapsed={explorerCollapsed}
          tooltipSide={side === "left" ? "right" : "left"}
        />
      </div>

      <StatusBarAccent side={side} />
    </aside>
  )
}

export function SiteHeaderMobile() {
  const activeHref = useExplorerActiveHref()

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/25 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-[#252526]/70">
      <div className="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-5">
        <a
          href="#top"
          className="font-mono text-[13px] font-semibold text-[#333] dark:text-[#dcdcdc]"
        >
          {SITE.name.split(" ")[0]}
          <span className="text-muted-foreground">.profile</span>
        </a>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Open explorer"
              >
                <MenuIcon className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100%,92vw)] gap-4 sm:max-w-sm"
            >
              <SheetHeader className="text-left font-mono">
                <SheetTitle className="text-sm font-semibold tracking-[0.12em] uppercase">
                  Explorer
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-0 pb-8">
                <VsCodeExplorer variant="drawer" activeHref={activeHref} />
                <Separator className="opacity-70" />
                <p className="text-center font-mono text-[11px] text-muted-foreground">
                  Folders match the Projects section breakdown.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export function SiteHeader() {
  return <SiteHeaderMobile />
}

function StatusBarAccent({ side }: { side: "left" | "right" }) {
  const { explorerCollapsed, toggleExplorerCollapsed } = usePortfolioLayout()

  const CollapseIcon = side === "left" ? ChevronLeftIcon : ChevronRightIcon
  const ExpandIcon = side === "left" ? ChevronRightIcon : ChevronLeftIcon

  return (
    <footer
      className={cn(
        "flex shrink-0 items-center gap-1.5 border-t border-white/20 py-1.5 text-[10px] text-muted-foreground",
        "dark:border-white/10",
        explorerCollapsed ? "justify-center px-1.5" : "justify-between px-2"
      )}
    >
      {!explorerCollapsed ? (
        <span className="min-w-0 truncate font-mono tabular-nums opacity-90">
          portfolio
        </span>
      ) : null}
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="shrink-0 text-muted-foreground hover:text-foreground"
        onClick={toggleExplorerCollapsed}
        aria-expanded={!explorerCollapsed}
        aria-label={
          explorerCollapsed
            ? "Expand explorer sidebar"
            : "Collapse explorer sidebar"
        }
      >
        {explorerCollapsed ? (
          <ExpandIcon aria-hidden strokeWidth={1.75} className="size-4" />
        ) : (
          <CollapseIcon aria-hidden strokeWidth={1.75} className="size-4" />
        )}
      </Button>
    </footer>
  )
}
