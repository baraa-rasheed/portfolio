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
  workbenchMaximized: boolean
  setWorkbenchMaximized: (max: boolean) => void
  toggleWorkbenchMaximized: () => void
  workbenchMinimized: boolean
  setWorkbenchMinimized: (min: boolean) => void
  toggleWorkbenchMinimized: () => void
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
  // Default to maximized on first load — the workbench is the site, so we
  // open it edge-to-edge and let visitors choose to "windowed" mode via the
  // green traffic-light button.
  const [workbenchMaximized, setWorkbenchMaximizedState] =
    React.useState(true)
  const [workbenchMinimized, setWorkbenchMinimizedState] =
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

  const setWorkbenchMaximized = React.useCallback((max: boolean) => {
    setWorkbenchMaximizedState(max)
  }, [])

  const toggleWorkbenchMaximized = React.useCallback(() => {
    setWorkbenchMaximizedState((prev) => !prev)
  }, [])

  const setWorkbenchMinimized = React.useCallback((min: boolean) => {
    setWorkbenchMinimizedState(min)
  }, [])

  const toggleWorkbenchMinimized = React.useCallback(() => {
    setWorkbenchMinimizedState((prev) => !prev)
  }, [])

  const value = React.useMemo(
    () => ({
      sidebarSide,
      setSidebarSide,
      toggleSidebarSide,
      explorerCollapsed,
      setExplorerCollapsed,
      toggleExplorerCollapsed,
      workbenchMaximized,
      setWorkbenchMaximized,
      toggleWorkbenchMaximized,
      workbenchMinimized,
      setWorkbenchMinimized,
      toggleWorkbenchMinimized,
    }),
    [
      sidebarSide,
      setSidebarSide,
      toggleSidebarSide,
      explorerCollapsed,
      setExplorerCollapsed,
      toggleExplorerCollapsed,
      workbenchMaximized,
      setWorkbenchMaximized,
      toggleWorkbenchMaximized,
      workbenchMinimized,
      setWorkbenchMinimized,
      toggleWorkbenchMinimized,
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
