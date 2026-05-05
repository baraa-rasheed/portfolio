"use client"

import * as React from "react"

const STORAGE_KEY = "portfolio-explorer-side"
const STORAGE_KEY_COLLAPSED = "portfolio-explorer-collapsed"

export type SidebarSide = "left" | "right"

type PortfolioLayoutValue = {
  sidebarSide: SidebarSide
  setSidebarSide: (side: SidebarSide) => void
  toggleSidebarSide: () => void
  explorerCollapsed: boolean
  setExplorerCollapsed: (collapsed: boolean) => void
  toggleExplorerCollapsed: () => void
}

const PortfolioLayoutContext = React.createContext<PortfolioLayoutValue | null>(
  null
)

export function PortfolioLayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarSide, setSidebarSideState] = React.useState<SidebarSide>("left")
  const [explorerCollapsed, setExplorerCollapsedState] =
    React.useState(false)

  React.useEffect(() => {
    const raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null
    if (raw === "right" || raw === "left") {
      setSidebarSideState(raw)
    }
    const collapsedRaw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY_COLLAPSED)
        : null
    if (collapsedRaw === "1" || collapsedRaw === "true") {
      setExplorerCollapsedState(true)
    }
  }, [])

  const setSidebarSide = React.useCallback((side: SidebarSide) => {
    setSidebarSideState(side)
    try {
      window.localStorage.setItem(STORAGE_KEY, side)
    } catch {
      /* ignore quota */
    }
  }, [])

  const toggleSidebarSide = React.useCallback(() => {
    setSidebarSideState((prev) => {
      const next = prev === "left" ? "right" : "left"
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const setExplorerCollapsed = React.useCallback((collapsed: boolean) => {
    setExplorerCollapsedState(collapsed)
    try {
      window.localStorage.setItem(STORAGE_KEY_COLLAPSED, collapsed ? "1" : "0")
    } catch {
      /* ignore quota */
    }
  }, [])

  const toggleExplorerCollapsed = React.useCallback(() => {
    setExplorerCollapsedState((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(STORAGE_KEY_COLLAPSED, next ? "1" : "0")
      } catch {
        /* ignore quota */
      }
      return next
    })
  }, [])

  const value = React.useMemo(
    () => ({
      sidebarSide,
      setSidebarSide,
      toggleSidebarSide,
      explorerCollapsed,
      setExplorerCollapsed,
      toggleExplorerCollapsed,
    }),
    [
      sidebarSide,
      setSidebarSide,
      toggleSidebarSide,
      explorerCollapsed,
      setExplorerCollapsed,
      toggleExplorerCollapsed,
    ]
  )

  return (
    <PortfolioLayoutContext.Provider value={value}>
      {children}
    </PortfolioLayoutContext.Provider>
  )
}

export function usePortfolioLayout(): PortfolioLayoutValue {
  const ctx = React.useContext(PortfolioLayoutContext)
  if (!ctx) {
    throw new Error(
      "usePortfolioLayout must be used within PortfolioLayoutProvider"
    )
  }
  return ctx
}
