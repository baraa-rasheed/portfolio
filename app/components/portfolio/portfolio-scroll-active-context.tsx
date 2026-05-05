"use client"

import * as React from "react"

import { EXPLORER_SCROLL_ANCHORS } from "~/constants/portfolio"

const PortfolioScrollActiveContext = React.createContext<string | null>(null)

/**
 * Single scroll spy for the paged workbench: wraps listeners once and exposes the active #anchor.
 * Desktop reads `[data-portfolio-scroll-root]`; mobile uses window/document scroll.
 */
export function PortfolioScrollActiveProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const anchors = EXPLORER_SCROLL_ANCHORS
  const [active, setActive] = React.useState<string>(anchors[0] ?? "#about")

  React.useEffect(() => {
    const mq =
      typeof window !== "undefined"
        ? window.matchMedia("(min-width: 1024px)")
        : null

    function scrollRootEl(): HTMLElement | null {
      if (!mq?.matches) return null
      return document.querySelector(
        "[data-portfolio-scroll-root]"
      ) as HTMLElement | null
    }

    function elementScrollOffset(
      el: HTMLElement,
      root: HTMLElement | null
    ): number {
      if (!root)
        return el.getBoundingClientRect().top + window.scrollY

      const r = root.getBoundingClientRect()
      const er = el.getBoundingClientRect()
      return er.top - r.top + root.scrollTop
    }

    let rootDetach: (() => void) | null = null

    function subscribeRootScroll(bump: () => void): void {
      rootDetach?.()
      rootDetach = null
      const root = scrollRootEl()
      root?.addEventListener("scroll", bump, { passive: true })
      rootDetach = () =>
        root?.removeEventListener("scroll", bump as EventListener)
    }

    function bump(): void {
      const root = scrollRootEl()
      const scrollTop = root ? root.scrollTop : window.scrollY
      const viewH = root ? root.clientHeight : window.innerHeight
      const marker = Math.min(viewH * 0.38, 400)
      const scrollPos = scrollTop + marker
      let best = anchors[0] ?? "#about"

      anchors.forEach((href) => {
        const id = href.slice(1)
        const el = document.getElementById(id)
        if (!el) return
        const sectionTop = elementScrollOffset(el, root)
        if (sectionTop <= scrollPos) best = href
      })

      setActive(best)
    }

    subscribeRootScroll(bump)
    bump()

    const onMqChange = (): void => {
      subscribeRootScroll(bump)
      bump()
    }
    mq?.addEventListener("change", onMqChange)

    const t = window.setTimeout(() => bump(), 0)
    window.addEventListener("scroll", bump, { passive: true })
    window.addEventListener("resize", bump)
    window.addEventListener("hashchange", bump)

    return () => {
      window.clearTimeout(t)
      mq?.removeEventListener("change", onMqChange)
      rootDetach?.()
      window.removeEventListener("scroll", bump)
      window.removeEventListener("resize", bump)
      window.removeEventListener("hashchange", bump)
    }
  }, [anchors])

  return (
    <PortfolioScrollActiveContext.Provider value={active}>
      {children}
    </PortfolioScrollActiveContext.Provider>
  )
}

export function usePortfolioScrollActiveHref(): string {
  const ctx = React.useContext(PortfolioScrollActiveContext)
  if (ctx === null) {
    throw new Error(
      "usePortfolioScrollActiveHref must be used within PortfolioScrollActiveProvider"
    )
  }
  return ctx
}
