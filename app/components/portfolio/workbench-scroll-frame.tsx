"use client"

import * as React from "react"

import { portfolioEditorTabTitle } from "~/constants/portfolio-editor-tabs"
import { cn } from "~/lib/utils"

import { usePortfolioScrollActiveHref } from "./portfolio-scroll-active-context"

/**
 * One section page in the workbench section layout:
 *
 *   <section.editor-section-target>     ← snap target; full height of the section layout
 *     <div.editor-section-inset>        ← padding around content (no inset glass chrome)
 *       <div.editor-pane-card>          ← layout frame only (transparent)
 *         <div.editor-pane-scroll>      ← only inner scroll surface
 *           {children}
 *         </div>
 *       </div>
 *     </div>
 *   </section>
 *
 * Inner scroll resets when this pane is no longer the active explorer anchor: we wait for the
 * outer pager’s `scrollend` on `[data-portfolio-scroll-root]` (desktop) or `window` (mobile),
 * with a timeout fallback. Full-height snap sections often stay “intersecting” for IO, so we tie
 * resets to scroll spy + pager completion instead of IntersectionObserver alone.
 */
const SECTION_PAGE = "portfolio-editor-section-target"
const SECTION_INSET = "portfolio-editor-section-inset"
const SECTION_CARD = "portfolio-editor-pane-card"
const SECTION_SCROLL = "portfolio-editor-pane-scroll"

type FrameTag = "section" | "footer"

export function WorkbenchScrollFrame({
  id,
  as = "section",
  windowTitle: windowTitleProp,
  accessibleTitleId,
  className,
  cardClassName,
  scrollAreaClassName,
  children,
}: {
  id: string
  as?: FrameTag
  windowTitle?: string
  accessibleTitleId?: string
  className?: string
  cardClassName?: string
  scrollAreaClassName?: string
  children: React.ReactNode
}) {
  const Tag = as
  const windowTitle = windowTitleProp ?? portfolioEditorTabTitle(id)
  const labelledBy = accessibleTitleId

  const activeHref = usePortfolioScrollActiveHref()
  const mine = `#${id}`
  const prevActiveHrefRef = React.useRef<string | null>(null)

  const sectionRef = React.useRef<HTMLElement>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const inner = scrollRef.current
    if (!inner) return

    const prev = prevActiveHrefRef.current
    prevActiveHrefRef.current = activeHref

    // Land on this section from elsewhere — treat pane as fresh.
    if (activeHref === mine) {
      if (prev !== null && prev !== mine) {
        let nestedRaf = 0
        const outerRaf = requestAnimationFrame(() => {
          nestedRaf = requestAnimationFrame(() => {
            scrollRef.current?.scrollTo({ top: 0, behavior: "auto" })
          })
        })
        return () => {
          cancelAnimationFrame(outerRaf)
          cancelAnimationFrame(nestedRaf)
        }
      }
      return
    }

    let cancelled = false

    function resetIfNeeded(): void {
      if (cancelled) return
      cancelled = true
      const pane = scrollRef.current
      if (pane && pane.scrollTop !== 0) {
        pane.scrollTo({ top: 0, behavior: "auto" })
      }
    }

    const mq =
      typeof window !== "undefined"
        ? window.matchMedia("(min-width: 1024px)")
        : null
    const scrollRoot =
      mq?.matches === true
        ? document.querySelector("[data-portfolio-scroll-root]")
        : null

    const onScrollEnd = (): void => {
      resetIfNeeded()
    }

    if (scrollRoot) {
      scrollRoot.addEventListener("scrollend", onScrollEnd as EventListener)
    } else {
      window.addEventListener("scrollend", onScrollEnd)
    }

    const fallback = window.setTimeout(resetIfNeeded, 520)

    return () => {
      cancelled = true
      if (scrollRoot) {
        scrollRoot.removeEventListener("scrollend", onScrollEnd as EventListener)
      } else {
        window.removeEventListener("scrollend", onScrollEnd)
      }
      window.clearTimeout(fallback)
    }
  }, [activeHref, mine])

  return (
    <Tag
      ref={sectionRef as React.RefObject<HTMLElement>}
      id={id}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : `${windowTitle} — editor pane`}
      className={cn(SECTION_PAGE, className)}
    >
      <div className={SECTION_INSET}>
        <div className={cn(SECTION_CARD, cardClassName)}>
          <div
            ref={scrollRef}
            className={cn(SECTION_SCROLL, scrollAreaClassName)}
            aria-label={`${windowTitle} — scrollable content`}
          >
            {children}
          </div>
        </div>
      </div>
    </Tag>
  )
}
