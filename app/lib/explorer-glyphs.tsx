import { MdFolder, MdFolderOpen } from "react-icons/md"
import { SiJson, SiMarkdown, SiReact, SiTypescript } from "react-icons/si"
import { VscFile } from "react-icons/vsc"

import type { NavExplorerKind } from "~/constants/portfolio"
import { cn } from "~/lib/utils"

const GLYPH_PX = 16

const folderTone =
  "text-[#d9a34c] dark:text-[#e8c076] drop-shadow-[0_0_10px_rgb(217_163_76_/0.22)] dark:drop-shadow-[0_0_12px_rgb(232_192_118_/0.18)]"

/** Material-style folder glyphs (Material Icon Theme–like treatment). */
export function ExplorerFolderGlyphIcon({
  open,
  className,
  size = GLYPH_PX,
}: {
  open: boolean
  className?: string
  size?: number
}) {
  const Icon = open ? MdFolderOpen : MdFolder
  return (
    <Icon
      aria-hidden
      size={size}
      className={cn("shrink-0 opacity-[0.95]", folderTone, className)}
    />
  )
}

/** File-type glyphs aligned with common editor icon packs (Simple Icons + VS Code fallback). */
export function ExplorerFileGlyphIcon({
  kind,
  className,
  size = GLYPH_PX,
}: {
  kind: NavExplorerKind
  className?: string
  size?: number
}) {
  const shared = cn("shrink-0 opacity-[0.94]", className)

  switch (kind) {
    case "tsx":
      return (
        <SiReact
          aria-hidden
          size={size}
          className={cn(
            shared,
            "text-[#149eca] dark:text-[#5fd4f8] drop-shadow-[0_0_8px_rgb(20_158_202_/0.35)]"
          )}
        />
      )
    case "ts":
      return (
        <SiTypescript
          aria-hidden
          size={size}
          className={cn(
            shared,
            "text-[#3178c6] dark:text-[#6aadff] drop-shadow-[0_0_8px_rgb(49_120_198_/0.28)]"
          )}
        />
      )
    case "json":
      return (
        <SiJson
          aria-hidden
          size={size}
          className={cn(
            shared,
            "text-[#cbcb41] dark:text-[#e8e870] drop-shadow-[0_0_8px_rgb(203_203_65_/0.28)]"
          )}
        />
      )
    case "md":
      return (
        <SiMarkdown
          aria-hidden
          size={size}
          className={cn(
            shared,
            "text-[#519aba] dark:text-[#7eb9da] drop-shadow-[0_0_8px_rgb(81_154_186_/0.28)]"
          )}
        />
      )
  }
}

function filenameToNavKind(filename: string): NavExplorerKind | null {
  const lower = filename.toLowerCase()
  if (lower.endsWith(".tsx")) return "tsx"
  if (lower.endsWith(".ts")) return "ts"
  if (lower.endsWith(".json")) return "json"
  if (lower.endsWith(".md")) return "md"
  return null
}

/** Editor tab bar — filename extension → same glyphs as explorer. */
export function EditorTabGlyphIcon({ filename }: { filename: string }) {
  const kind = filenameToNavKind(filename)

  if (kind) {
    return <ExplorerFileGlyphIcon kind={kind} size={15} />
  }

  return (
    <VscFile
      aria-hidden
      size={15}
      className="shrink-0 text-muted-foreground opacity-90"
    />
  )
}
