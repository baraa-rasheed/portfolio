"use client"

import { ExternalLinkIcon, QuoteIcon } from "lucide-react"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  RECOMMENDATIONS,
  type RecommendationItem,
} from "~/constants/portfolio"
import { cn } from "~/lib/utils"

import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

function authorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    const first = parts[0]![0]
    const last = parts[parts.length - 1]![0]
    return `${first ?? ""}${last ?? ""}`.toUpperCase().slice(0, 2) || "?"
  }
  const one = parts[0] ?? "?"
  return one.slice(0, 2).toUpperCase() || "?"
}

/**
 * Convert `**phrase**` markers in the source text into bold spans.
 * Kept intentionally minimal — professional testimonial walls (Linear, Vercel,
 * Clerk) lean on clean typography rather than per-word coloring.
 */
function parseEmphasis(text: string): React.ReactNode {
  const re = /\*\*(.+?)\*\*/g
  const nodes: React.ReactNode[] = []
  let last = 0
  let i = 0
  for (const m of text.matchAll(re)) {
    const full = m[0]!
    const inner = m[1]!
    const start = m.index ?? 0
    if (start > last) nodes.push(text.slice(last, start))
    nodes.push(
      <strong
        key={`em-${start}-${i}`}
        className="font-semibold text-foreground"
      >
        {inner}
      </strong>
    )
    i += 1
    last = start + full.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes.length > 0 ? nodes : text
}

function TestimonialCard({ rec }: { rec: RecommendationItem }) {
  return (
    <article
      className={cn(
        "group/card relative flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl border p-7",
        // Bigger cards — more presence in the rail.
        "w-[20rem] sm:w-[23rem] lg:w-[26rem]",
        "border-foreground/[0.07] bg-white/65 backdrop-blur-xl",
        "shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_2px_6px_-3px_rgb(0_0_0/0.05),0_18px_40px_-28px_oklch(0.25_0.05_260_/_0.18)]",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:border-foreground/[0.12] hover:shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_4px_10px_-4px_rgb(0_0_0/0.07),0_24px_56px_-28px_oklch(0.25_0.06_260_/_0.28)]",
        "dark:border-white/[0.08] dark:bg-white/[0.04]",
        "dark:shadow-[0_1px_0_rgb(255_255_255/0.04)_inset,0_2px_6px_-3px_rgb(0_0_0/0.4),0_18px_40px_-24px_rgb(0_0_0/0.55)]",
        "dark:hover:border-white/[0.14] dark:hover:bg-white/[0.05]"
      )}
    >
      {/* Decorative quote glyph */}
      <QuoteIcon
        aria-hidden
        className={cn(
          "absolute top-5 right-5 size-9 rotate-180 text-foreground/[0.06]",
          "dark:text-white/[0.08]"
        )}
        strokeWidth={1.5}
      />

      <blockquote
        cite={rec.linkedInHref}
        className="relative z-[1] flex-1 pr-4"
      >
        <p
          className={cn(
            "text-pretty text-[15px] leading-[1.65] text-foreground/[0.82]",
            "line-clamp-[8]"
          )}
        >
          {parseEmphasis(rec.quote)}
        </p>
      </blockquote>

      <footer
        className={cn(
          "mt-6 flex items-center gap-3 border-t pt-4",
          "border-foreground/[0.06] dark:border-white/[0.06]"
        )}
      >
        <Avatar className="size-11 shrink-0 ring-1 ring-foreground/5 dark:ring-white/10">
          {rec.avatarSrc ? (
            <AvatarImage src={rec.avatarSrc} alt="" loading="lazy" />
          ) : null}
          <AvatarFallback className="text-xs font-semibold">
            {authorInitials(rec.author)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm leading-tight font-semibold">
            {rec.linkedInHref ? (
              <a
                href={rec.linkedInHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground/40"
              >
                {rec.author}
                <ExternalLinkIcon
                  aria-hidden
                  className="size-3 shrink-0 opacity-50"
                />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            ) : (
              rec.author
            )}
          </p>
          {rec.roleLine ? (
            <p className="truncate text-xs text-muted-foreground">
              {rec.roleLine}
            </p>
          ) : null}
        </div>
      </footer>
    </article>
  )
}

/** One “group” of all testimonials. The rail renders this twice for a seamless loop. */
function TestimonialGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6"
      aria-hidden={ariaHidden || undefined}
    >
      {RECOMMENDATIONS.map((rec) => (
        <TestimonialCard key={rec.author} rec={rec} />
      ))}
    </div>
  )
}

export function RecommendationsSection() {
  return (
    <WorkbenchScrollFrame id="recommendations" className="relative">
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10",
          // Vertically center the whole block inside the section pane so the
          // marquee sits in the middle instead of pinned to the top.
          "lg:justify-center"
        )}
      >
        {/* Subtle ambient blobs (kept restrained for a pro feel) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.28] dark:opacity-[0.22]"
        >
          <div className="absolute top-[15%] -left-[10%] h-[260px] w-[260px] rounded-full bg-violet-400/16 blur-3xl dark:bg-violet-500/12" />
          <div className="absolute right-[-8%] bottom-[10%] h-[240px] w-[240px] rounded-full bg-sky-400/14 blur-3xl dark:bg-sky-400/10" />
        </div>

        <div className="relative flex flex-col gap-10">
          <ScrollReveal>
            <SectionHeading
              eyebrow="References"
              title="Trusted by the people I’ve shipped with."
              description="A few words from managers, founders, and teammates."
              className="max-w-2xl"
            />
          </ScrollReveal>

          {/* Marquee rail */}
          <ScrollReveal delayMs={80}>
            <div className="group/marquee relative -mx-3 sm:-mx-6 lg:-mx-8">
              {/* Edge fade masks */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 sm:w-24 lg:w-32",
                  "bg-linear-to-r from-background via-background/70 to-transparent"
                )}
              />
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 sm:w-24 lg:w-32",
                  "bg-linear-to-l from-background via-background/70 to-transparent"
                )}
              />

              <div className="overflow-hidden">
                <div
                  className={cn(
                    "flex w-max items-stretch will-change-transform",
                    "animate-[portfolio-marquee_55s_linear_infinite]",
                    "group-hover/marquee:[animation-play-state:paused]",
                    "motion-reduce:animate-none"
                  )}
                >
                  <TestimonialGroup />
                  <TestimonialGroup ariaHidden />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Footer hint */}
          <ScrollReveal delayMs={140}>
            <p className="text-center font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Hover to pause · scrolls automatically
            </p>
          </ScrollReveal>
        </div>
      </div>
    </WorkbenchScrollFrame>
  )
}
