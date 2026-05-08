"use client"

import { GlobeIcon } from "lucide-react"

import type { ProjectItem } from "~/constants/portfolio"
import { cn } from "~/lib/utils"

import { ShowcaseCardMotion } from "./showcase-card-motion"

function projectInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean)
  const a = parts[0]?.[0]
  const b = parts.length > 1 ? parts[1]?.[0] : parts[0]?.[1]
  return [a, b].filter(Boolean).join("").toUpperCase().slice(0, 2) || "?"
}

function displayHost(href?: string) {
  if (!href) return "…"
  try {
    return new URL(href).hostname.replace(/^www\./, "")
  } catch {
    return href.slice(0, 42)
  }
}

function PreviewFallback({
  initials,
  className,
}: {
  initials: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center bg-linear-to-br from-sky-500/85 via-indigo-500/75 to-violet-700/85 text-lg font-semibold tracking-tight text-white/95 dark:from-sky-600/65 dark:via-indigo-600/55 dark:to-violet-900/65",
        className
      )}
      aria-hidden
    >
      {initials}
    </div>
  )
}

/** App-store style: rounded icon tile + caption underneath. */
export function ProjectMobileCard({ project }: { project: ProjectItem }) {
  const body = (
    <>
      <div
        className={cn(
          "relative mx-auto aspect-square w-[min(7rem,52vw)] overflow-hidden rounded-[26%]",
          "ring-1 ring-black/15 ring-inset dark:ring-white/20"
        )}
      >
        {project.previewImage ? (
          <img
            src={project.previewImage}
            alt=""
            className="size-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <PreviewFallback initials={projectInitials(project.name)} />
        )}
      </div>
      <div className="mx-auto mt-4 w-full max-w-[14rem] min-w-0 space-y-1.5">
        <h3
          className="w-full min-w-0 truncate text-center font-heading text-base leading-snug font-semibold"
          title={project.name}
        >
          {project.name}
        </h3>
        <p
          className="line-clamp-2 text-center text-xs leading-snug text-muted-foreground"
          title={project.summary}
        >
          {project.summary}
        </p>
      </div>
    </>
  )

  const shellClass = cn(
    "flex flex-col items-center rounded-2xl border border-transparent px-4 pt-8 pb-6 text-foreground",
    "bg-linear-to-b from-white/92 to-white/74 backdrop-blur-xl",
    "shadow-[0_1px_0_rgb(255_255_255_/_.88)_inset,0_3px_16px_-6px_rgb(0_0_0_/_.07),0_12px_36px_-16px_rgb(0_0_0_/_.09)]",
    "transition-[box-shadow] duration-300 ease-out",
    "hover:shadow-[0_1px_0_rgb(255_255_255_/_.92)_inset,0_6px_22px_-8px_rgb(0_0_0_/_.09),0_16px_44px_-18px_rgb(0_0_0_/_.11)]",
    "dark:from-white/[0.1] dark:to-white/[0.04]",
    "dark:shadow-[0_1px_0_rgb(255_255_255_/_.06)_inset,0_6px_28px_-12px_rgb(0_0_0_/_.48)]",
    "dark:hover:shadow-[0_1px_0_rgb(255_255_255_/_.08)_inset,0_10px_36px_-14px_rgb(0_0_0_/_.55)]"
  )

  if (project.href) {
    return (
      <ShowcaseCardMotion>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            shellClass,
            "group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          )}
        >
          {body}
        </a>
      </ShowcaseCardMotion>
    )
  }

  return (
    <ShowcaseCardMotion>
      <article className={shellClass}>{body}</article>
    </ShowcaseCardMotion>
  )
}

/** Address bar mimic shared by web showcases. */
function WebsiteChromeBar({ host }: { host: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-white/30 bg-black/[0.06] px-3 py-2 dark:border-white/[0.1] dark:bg-black/25">
      <span className="flex shrink-0 gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-red-400/85" />
        <span className="size-2.5 rounded-full bg-amber-400/85" />
        <span className="size-2.5 rounded-full bg-emerald-400/85" />
      </span>
      <div className="min-w-0 flex-1 truncate rounded-md border border-black/15 bg-black/10 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground tabular-nums dark:border-white/10 dark:bg-white/[0.06] dark:text-muted-foreground">
        https://{host}
      </div>
    </div>
  )
}

const webProjectCardShell = cn(
  "flex h-full flex-col overflow-hidden rounded-2xl border border-transparent text-foreground backdrop-blur-xl",
  "bg-linear-to-b from-white/93 to-white/76",
  "shadow-[0_1px_0_rgb(255_255_255_/_.9)_inset,0_4px_20px_-8px_rgb(0_0_0_/_.07),0_14px_44px_-20px_rgb(0_0_0_/_.09)]",
  "transition-[box-shadow] duration-300 ease-out",
  "hover:shadow-[0_1px_0_rgb(255_255_255_/_.94)_inset,0_8px_28px_-10px_rgb(0_0_0_/_.09),0_20px_52px_-22px_rgb(0_0_0_/_.11)]",
  "dark:from-white/[0.1] dark:to-white/[0.045]",
  "dark:shadow-[0_1px_0_rgb(255_255_255_/_.06)_inset,0_8px_32px_-14px_rgb(0_0_0_/_.5)]",
  "dark:hover:shadow-[0_1px_0_rgb(255_255_255_/_.09)_inset,0_12px_40px_-16px_rgb(0_0_0_/_.58)]"
)

/**
 * Website projects in a grid: browser chrome + screenshot on top, copy below — compact tiles vs full-width rows.
 */
export function ProjectWebsiteCard({ project }: { project: ProjectItem }) {
  const host = displayHost(project.href)

  const previewBlock = (
    <div className="shrink-0 overflow-hidden ring-1 ring-black/10 ring-inset dark:ring-white/10">
      <WebsiteChromeBar host={host} />
      <div className="relative aspect-video bg-black/[0.04] dark:bg-white/[0.04]">
        {project.previewImage ? (
          <img
            src={project.previewImage}
            alt=""
            className="size-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex size-full min-h-[9rem] flex-col items-center justify-center gap-2 bg-linear-to-b from-muted/35 to-muted/12 px-4 text-center">
            <GlobeIcon
              className="size-9 text-muted-foreground/65"
              strokeWidth={1.25}
            />
            <span className="text-xs text-muted-foreground">Preview soon</span>
          </div>
        )}
      </div>
    </div>
  )

  const metaBlock = (
    <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:p-5">
      <div className="min-w-0 space-y-1">
        <h3
          className="font-heading text-lg leading-snug font-semibold tracking-tight sm:text-xl"
          title={project.name}
        >
          {project.name}
        </h3>
        <p
          className="truncate font-mono text-[0.7rem] text-muted-foreground sm:text-xs"
          title={project.href ? `https://${host}` : undefined}
        >
          {project.href ? `https://${host}` : "URL coming soon"}
        </p>
      </div>
      <p
        className="line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]"
        title={project.summary}
      >
        {project.summary}
      </p>
    </div>
  )

  if (project.href) {
    return (
      <ShowcaseCardMotion enableHoverMotion className="h-full">
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            webProjectCardShell,
            "group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          )}
        >
          {previewBlock}
          {metaBlock}
        </a>
      </ShowcaseCardMotion>
    )
  }

  return (
    <ShowcaseCardMotion enableHoverMotion={false} className="h-full">
      <article className={webProjectCardShell}>
        {previewBlock}
        {metaBlock}
      </article>
    </ShowcaseCardMotion>
  )
}

