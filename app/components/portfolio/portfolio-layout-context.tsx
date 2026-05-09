"use client"

import * as React from "react"

const STORAGE_KEY = "portfolio-explorer-side"
const STORAGE_KEY_COLLAPSED = "portfolio-explorer-collapsed"
const STORAGE_KEY_MAXIMIZED = "portfolio-workbench-maximized"

/** Viewports at/above this width default windowed workbench; below defaults maximized (explorer sidebar defaults expanded for all). */
const VIEWPORT_WIDE_BREAKPOINT_PX = 1600

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
  /** Expanded by default; layout effect applies saved collapse preference only. */
  const [explorerCollapsed, setExplorerCollapsedState] =
    React.useState(false)
  /** Wide screens default windowed; layout effect applies storage or maximizes on laptop widths. */
  const [workbenchMaximized, setWorkbenchMaximizedState] =
    React.useState(false)
  const [workbenchMinimized, setWorkbenchMinimizedState] =
    React.useState(false)

  React.useLayoutEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === "right" || raw === "left") {
      setSidebarSideState(raw)
    }

    const collapsedRaw = window.localStorage.getItem(STORAGE_KEY_COLLAPSED)
    const wide = window.matchMedia(
      `(min-width: ${VIEWPORT_WIDE_BREAKPOINT_PX}px)`
    ).matches

    if (collapsedRaw === "1" || collapsedRaw === "true") {
      setExplorerCollapsedState(true)
    } else if (collapsedRaw === "0") {
      setExplorerCollapsedState(false)
    }

    const maximizedRaw = window.localStorage.getItem(STORAGE_KEY_MAXIMIZED)
    if (maximizedRaw === "1" || maximizedRaw === "true") {
      setWorkbenchMaximizedState(true)
    } else if (maximizedRaw === "0") {
      setWorkbenchMaximizedState(false)
    } else {
      setWorkbenchMaximizedState(!wide)
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
    try {
      window.localStorage.setItem(STORAGE_KEY_MAXIMIZED, max ? "1" : "0")
    } catch {
      /* ignore quota */
    }
  }, [])

  const toggleWorkbenchMaximized = React.useCallback(() => {
    setWorkbenchMaximizedState((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(STORAGE_KEY_MAXIMIZED, next ? "1" : "0")
      } catch {
        /* ignore quota */
      }
      return next
    })
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
