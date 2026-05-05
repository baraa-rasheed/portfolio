"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "~/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="border-white/35 bg-white/20 backdrop-blur-md dark:border-white/15 dark:bg-white/[0.08]"
          aria-label={
            !mounted
              ? "Toggle color theme"
              : isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
          }
          onClick={() => {
            if (!mounted) return
            setTheme(isDark ? "light" : "dark")
          }}
        >
          {!mounted ? (
            <MoonIcon className="size-4 animate-pulse opacity-35" aria-hidden />
          ) : isDark ? (
            <SunIcon className="size-4" />
          ) : (
            <MoonIcon className="size-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {mounted ? (isDark ? "Light mode" : "Dark mode") : "Theme"}
      </TooltipContent>
    </Tooltip>
  )
}
