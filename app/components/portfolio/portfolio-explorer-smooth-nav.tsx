"use client"

import * as React from "react"

/**
 * Smooth scrolling when jumping to `#sections` from the explorer (sidebar links sit outside
 * the desktop `[data-portfolio-scroll-root]` pane, so native fragment scrolling often snaps).
 * Keeps `location.hash` and `hashchange` in sync for the scroll spy.
 */
export function PortfolioExplorerSmoothNav() {
  React.useEffect(() => {
    function scrollWorkbenchTo(opts: { top: number; behavior: ScrollBehavior }) {
      const mq = window.matchMedia("(min-width: 1024px)")
      const root = document.querySelector(
        "[data-portfolio-scroll-root]"
      ) as HTMLElement | null
      if (mq.matches && root) {
        root.scrollTo({ top: opts.top, behavior: opts.behavior })
      } else {
        window.scrollTo({ top: opts.top, behavior: opts.behavior })
      }
    }

    function onClickCapture(e: MouseEvent) {
      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return
      }

      const target = e.target as Element | null
      const link = target?.closest?.(
        "a[href^='#']"
      ) as HTMLAnchorElement | null
      if (!link) return

      const navRoot = link.closest("[data-portfolio-explorer-nav]")
      if (!navRoot) return

      const raw = link.getAttribute("href") ?? ""
      if (!raw.startsWith("#") || raw === "#") return

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth"

      if (raw === "#top") {
        e.preventDefault()
        scrollWorkbenchTo({ top: 0, behavior })
        const url = `${window.location.pathname}${window.location.search}${raw}`
        window.history.replaceState(null, "", url)
        window.dispatchEvent(new HashChangeEvent("hashchange"))
        return
      }

      const id = raw.slice(1)
      const section = document.getElementById(id)
      if (!section) return

      e.preventDefault()

      section.scrollIntoView({ behavior, block: "start" })

      const url = `${window.location.pathname}${window.location.search}${raw}`
      window.history.replaceState(null, "", url)
      window.dispatchEvent(new HashChangeEvent("hashchange"))
    }

    document.addEventListener("click", onClickCapture, true)
    return () => document.removeEventListener("click", onClickCapture, true)
  }, [])

  return null
}
