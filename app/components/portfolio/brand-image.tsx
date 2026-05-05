"use client"

import type { LucideIcon } from "lucide-react"
import { useCallback, useState } from "react"

import { cn } from "~/lib/utils"

export type BrandImageProps = {
  src: string
  /** Short label when the graphic is illustrative (paired with adjacent text). */
  alt?: string
  className?: string
  fallback?: LucideIcon
  fallbackClassName?: string
}

/** External brand / favicon URLs with graceful fallback if the CDN or domain icon fails. */
export function BrandImage({
  src,
  alt = "",
  className,
  fallback: Fallback,
  fallbackClassName,
}: BrandImageProps) {
  const [visible, setVisible] = useState(true)
  const onError = useCallback(() => {
    setVisible(false)
  }, [])

  if (!visible || !src) {
    if (!Fallback) return null
    return (
      <span
        className={cn(
          "flex items-center justify-center text-muted-foreground",
          fallbackClassName,
          className
        )}
        aria-hidden
      >
        <Fallback className="size-[70%]" />
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={onError}
    />
  )
}
