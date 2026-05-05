"use client"

import { ChevronLeft, ChevronRight, ExternalLinkIcon } from "lucide-react"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { RECOMMENDATIONS } from "~/constants/portfolio"
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

const AUTO_ADVANCE_MS = 11_000

const WORD_GRADIENT_FILLS = [
  cn(
    "inline bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text font-quote font-semibold tracking-[-0.03em] text-transparent",
    "dark:from-violet-400 dark:to-indigo-300"
  ),
  cn(
    "inline bg-linear-to-r from-sky-500 to-teal-400 bg-clip-text font-quote font-semibold tracking-[-0.03em] text-transparent",
    "dark:from-sky-400 dark:to-teal-300"
  ),
  cn(
    "inline bg-linear-to-r from-fuchsia-600 to-orange-400 bg-clip-text font-quote font-semibold tracking-[-0.03em] text-transparent",
    "dark:from-fuchsia-400 dark:to-orange-300"
  ),
  cn(
    "inline bg-linear-to-br from-emerald-600 to-cyan-500 bg-clip-text font-quote font-semibold tracking-[-0.03em] text-transparent",
    "dark:from-emerald-400 dark:to-cyan-400"
  ),
  cn(
    "inline bg-linear-to-r from-rose-600 to-violet-500 bg-clip-text font-quote font-semibold tracking-[-0.03em] text-transparent",
    "dark:from-rose-400 dark:to-violet-300"
  ),
  cn(
    "inline bg-linear-to-bl from-amber-500 to-pink-500 bg-clip-text font-quote font-semibold tracking-[-0.03em] text-transparent",
    "dark:from-amber-400 dark:to-pink-400"
  ),
  cn(
    "inline bg-linear-to-br from-blue-600 to-emerald-500 bg-clip-text font-quote font-semibold tracking-[-0.03em] text-transparent",
    "dark:from-blue-400 dark:to-emerald-300"
  ),
  cn(
    "inline bg-linear-to-tl from-purple-600 to-sky-500 bg-clip-text font-quote font-semibold tracking-[-0.03em] text-transparent",
    "dark:from-purple-400 dark:to-sky-400"
  ),
] as const

/** Subtle panel tint per slide — solid-enough base + light gradient for readability. */
const QUOTE_PANEL_VARIANTS = [
  cn(
    "border-violet-200/70 bg-linear-to-br from-white/92 via-white/80 to-violet-100/55 shadow-[0_1px_0_rgb(255_255_255_/_.65)_inset]",
    "dark:border-white/[0.09] dark:from-white/[0.12] dark:via-white/[0.06] dark:to-violet-950/35 dark:shadow-none"
  ),
  cn(
    "border-sky-200/65 bg-linear-to-br from-white/92 via-white/78 to-sky-100/45 shadow-[0_1px_0_rgb(255_255_255_/_.65)_inset]",
    "dark:border-white/[0.09] dark:from-white/[0.11] dark:via-white/[0.055] dark:to-sky-950/30 dark:shadow-none"
  ),
  cn(
    "border-fuchsia-200/55 bg-linear-to-br from-white/92 via-white/78 to-fuchsia-100/40 shadow-[0_1px_0_rgb(255_255_255_/_.65)_inset]",
    "dark:border-white/[0.09] dark:from-white/[0.11] dark:via-white/[0.055] dark:to-fuchsia-950/28 dark:shadow-none"
  ),
  cn(
    "border-emerald-200/60 bg-linear-to-br from-white/92 via-white/78 to-emerald-100/42 shadow-[0_1px_0_rgb(255_255_255_/_.65)_inset]",
    "dark:border-white/[0.09] dark:from-white/[0.11] dark:via-white/[0.055] dark:to-emerald-950/28 dark:shadow-none"
  ),
  cn(
    "border-rose-200/55 bg-linear-to-br from-white/92 via-white/78 to-rose-100/38 shadow-[0_1px_0_rgb(255_255_255_/_.65)_inset]",
    "dark:border-white/[0.09] dark:from-white/[0.11] dark:via-white/[0.055] dark:to-rose-950/26 dark:shadow-none"
  ),
  cn(
    "border-amber-200/55 bg-linear-to-br from-white/92 via-white/78 to-amber-100/35 shadow-[0_1px_0_rgb(255_255_255_/_.65)_inset]",
    "dark:border-white/[0.09] dark:from-white/[0.11] dark:via-white/[0.055] dark:to-amber-950/22 dark:shadow-none"
  ),
] as const

function emphasizedPhraseToSpans(
  inner: string,
  wordStride: { n: number }
): React.ReactNode[] {
  if (!inner) return []
  const parts = inner.split(/(\s+)/)
  const out: React.ReactNode[] = []

  parts.forEach((part, pi) => {
    if (!part || /^\s+$/.test(part)) {
      out.push(part)
      return
    }
    const wi = wordStride.n
    wordStride.n += 1
    const cls = WORD_GRADIENT_FILLS[wi % WORD_GRADIENT_FILLS.length]
    out.push(
      <span key={`qw-${wi}-${pi}-${part.slice(0, 10)}`} className={cls}>
        {part}
      </span>
    )
  })

  return out
}

function parseQuoteMarks(text: string): React.ReactNode {
  const re = /\*\*(.+?)\*\*/g
  const nodes: React.ReactNode[] = []
  let last = 0
  let emphasisIndex = 0
  const wordStride = { n: 0 }

  for (const m of text.matchAll(re)) {
    const full = m[0]!
    const inner = m[1]!
    const start = m.index ?? 0
    if (start > last) {
      nodes.push(text.slice(last, start))
    }
    const words = emphasizedPhraseToSpans(inner, wordStride)
    nodes.push(
      <span key={`e-${start}-${emphasisIndex}`} className="inline">
        {words}
      </span>
    )
    emphasisIndex += 1
    last = start + full.length
  }
  if (last < text.length) {
    nodes.push(text.slice(last))
  }
  return nodes.length > 0 ? nodes : text
}

export function RecommendationsSection() {
  const count = RECOMMENDATIONS.length
  const [index, setIndex] = React.useState(0)
  const [quoteExpanded, setQuoteExpanded] = React.useState(false)
  const [motionReduced, setMotionReduced] = React.useState(false)
  const [pausedByHover, setPausedByHover] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setMotionReduced(mq.matches)
    const listener = () => setMotionReduced(mq.matches)
    mq.addEventListener("change", listener)
    return () => mq.removeEventListener("change", listener)
  }, [])

  React.useEffect(() => {
    setQuoteExpanded(false)
  }, [index])

  const goPrev = React.useCallback(() => {
    setIndex((i) => (i - 1 + count) % count)
  }, [count])

  const goNext = React.useCallback(() => {
    setIndex((i) => (i + 1) % count)
  }, [count])

  React.useEffect(() => {
    if (motionReduced || count <= 1 || pausedByHover) return
    const interval = window.setInterval(goNext, AUTO_ADVANCE_MS)
    return () => window.clearInterval(interval)
  }, [motionReduced, count, goNext, index, pausedByHover])

  const active = RECOMMENDATIONS[index]!

  return (
    <WorkbenchScrollFrame id="recommendations" className="relative">
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.32] dark:opacity-[0.26]"
        >
          <div className="absolute top-[15%] -left-[12%] h-[280px] w-[280px] rounded-full bg-linear-to-br from-violet-400/18 via-transparent to-transparent blur-3xl dark:from-violet-500/14" />
          <div className="absolute right-[-8%] bottom-[10%] h-[260px] w-[260px] rounded-full bg-linear-to-tl from-sky-400/14 via-transparent to-transparent blur-3xl dark:from-sky-400/10" />
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col gap-5 lg:gap-6">
          <ScrollReveal>
            <SectionHeading
              className="max-w-2xl shrink-0 [&_h2]:text-2xl sm:[&_h2]:text-3xl lg:[&_h2]:text-[2rem]"
              eyebrow="Recommendations"
              title="From managers and coworkers."
              description="Peers on leadership, reliability, and shipping under pressure."
            />
          </ScrollReveal>

          <div className="flex min-h-0 flex-1 flex-col">
            <ScrollReveal delayMs={60}>
              <div
                role="region"
                aria-roledescription="carousel"
                aria-label="Professional recommendations"
                className="outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                tabIndex={0}
                onMouseEnter={() => setPausedByHover(true)}
                onMouseLeave={() => setPausedByHover(false)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") {
                    e.preventDefault()
                    goPrev()
                  }
                  if (e.key === "ArrowRight") {
                    e.preventDefault()
                    goNext()
                  }
                }}
              >
                <div className="relative mx-auto mt-2 w-full max-w-[min(88rem,calc(100%-1rem))] lg:mt-3">
                  <div className="rounded-none border-0 bg-transparent py-2 outline-none md:flex md:items-start md:gap-6 lg:gap-10 xl:gap-12">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-lg"
                      aria-label="Previous recommendation"
                      className="mt-8 hidden shrink-0 text-muted-foreground hover:text-foreground md:flex lg:mt-14"
                      onClick={goPrev}
                    >
                      <ChevronLeft
                        className="size-7"
                        aria-hidden
                        strokeWidth={1.25}
                      />
                    </Button>

                    <div className="relative min-w-0 flex-1 pb-2">
                      <article
                        key={`${active.author}-${index}`}
                        className={cn(
                          "relative",
                          !motionReduced && "portfolio-testimonial-enter"
                        )}
                        aria-live={motionReduced ? "off" : "polite"}
                      >
                        <div
                          className={cn(
                            "relative overflow-hidden rounded-2xl border backdrop-blur-xl",
                            QUOTE_PANEL_VARIANTS[index % QUOTE_PANEL_VARIANTS.length]
                          )}
                        >
                          <span
                            className={cn(
                              "pointer-events-none absolute top-3 left-3 leading-none tracking-tight text-foreground/[0.11] select-none sm:top-4 sm:left-4 dark:text-white/[0.14]",
                              "font-quote text-[clamp(2.75rem,6vw,4rem)] lg:text-[clamp(3rem,5vw,3.75rem)]"
                            )}
                            aria-hidden
                          >
                            “
                          </span>

                          <blockquote
                            cite={active.linkedInHref}
                            className="relative mx-auto max-w-[68ch] border-none px-5 pt-10 pb-5 sm:px-7 sm:pt-11 sm:pb-6 md:px-9 md:pt-12 md:pb-7"
                          >
                            <p
                              className={cn(
                                "font-quote tracking-[-0.01em] text-pretty text-foreground",
                                "text-[clamp(1.0625rem,2vw,1.3125rem)] leading-[1.48] sm:leading-[1.46]",
                                !quoteExpanded &&
                                  "line-clamp-[9] sm:line-clamp-[10] lg:line-clamp-[8]"
                              )}
                            >
                              {parseQuoteMarks(active.quote)}
                            </p>
                            <Button
                              type="button"
                              variant="link"
                              size="sm"
                              className="mt-3 h-auto px-0 py-0 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground"
                              onClick={() => setQuoteExpanded((e) => !e)}
                            >
                              {quoteExpanded ? "Show less" : "Show full quote"}
                            </Button>
                          </blockquote>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-5 sm:mt-10 sm:flex-row sm:justify-between sm:gap-8 md:mt-11">
                          <div className="flex items-center gap-4 text-center sm:text-left">
                            <Avatar className="size-[3.25rem] shrink-0 md:size-[3.5rem]">
                              {active.avatarSrc ? (
                                <AvatarImage
                                  src={active.avatarSrc}
                                  alt=""
                                  loading="lazy"
                                />
                              ) : null}
                              <AvatarFallback className="text-sm font-semibold">
                                {authorInitials(active.author)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 space-y-0.5">
                              {active.linkedInHref ? (
                                <p className="font-sans text-base leading-tight font-semibold md:text-[1.0625rem]">
                                  <a
                                    href={active.linkedInHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground/35 sm:inline-flex"
                                  >
                                    {active.author}
                                    <ExternalLinkIcon
                                      aria-hidden
                                      className="size-3.5 shrink-0 opacity-50"
                                    />
                                    <span className="sr-only">
                                      (opens in new tab)
                                    </span>
                                  </a>
                                </p>
                              ) : (
                                <p className="font-sans text-base leading-tight font-semibold md:text-[1.0625rem]">
                                  {active.author}
                                </p>
                              )}
                              {active.roleLine ? (
                                <p className="text-sm font-medium text-muted-foreground">
                                  {active.roleLine}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <p className="font-sans text-[0.6875rem] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-right">
                            <span className="sr-only">
                              Recommendation {index + 1} of {count}.{" "}
                            </span>
                            <span aria-hidden>
                              {index + 1} / {count}
                            </span>
                          </p>
                        </div>
                      </article>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-lg"
                      aria-label="Next recommendation"
                      className="mt-8 hidden shrink-0 text-muted-foreground hover:text-foreground md:flex lg:mt-14"
                      onClick={goNext}
                    >
                      <ChevronRight
                        className="size-7"
                        aria-hidden
                        strokeWidth={1.25}
                      />
                    </Button>
                  </div>

                  <div className="mt-6 flex justify-center gap-6 md:hidden">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-lg"
                      className="-ml-3 text-muted-foreground"
                      aria-label="Previous recommendation"
                      onClick={goPrev}
                    >
                      <ChevronLeft
                        className="size-7"
                        aria-hidden
                        strokeWidth={1.25}
                      />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-lg"
                      className="-mr-3 text-muted-foreground"
                      aria-label="Next recommendation"
                      onClick={goNext}
                    >
                      <ChevronRight
                        className="size-7"
                        aria-hidden
                        strokeWidth={1.25}
                      />
                    </Button>
                  </div>

                  <nav
                    className="mx-auto mt-7 flex justify-center gap-2.5 pt-2 md:mt-9"
                    aria-label="Recommendation slides"
                  >
                    {RECOMMENDATIONS.map((rec, dotIndex) => {
                      const selected = dotIndex === index
                      return (
                        <button
                          key={`dot-${rec.author}`}
                          type="button"
                          aria-label={`Show recommendation ${dotIndex + 1}: ${rec.author}`}
                          aria-current={selected ? "true" : undefined}
                          className={cn(
                            "h-1 rounded-full bg-foreground/55 transition-[width,opacity,background-color] duration-300 ease-out dark:bg-white/40",
                            selected
                              ? "w-10 opacity-100"
                              : "w-2 opacity-40 hover:opacity-70"
                          )}
                          onClick={() => setIndex(dotIndex)}
                        />
                      )
                    })}
                  </nav>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </WorkbenchScrollFrame>
  )
}
