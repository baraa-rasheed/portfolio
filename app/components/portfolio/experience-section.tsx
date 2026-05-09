"use client"

import { Building2Icon, MapPinIcon } from "lucide-react"

import { BrandImage } from "~/components/portfolio/brand-image"
import type { ExperienceItem } from "~/constants/portfolio"
import { EXPERIENCES } from "~/constants/portfolio"
import { cn } from "~/lib/utils"

import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

const ACCENTS = [
  {
    chipBg:
      "bg-sky-500/[0.08] text-sky-700 ring-sky-500/25 dark:bg-sky-400/[0.08] dark:text-sky-300 dark:ring-sky-400/30",
    rule: "from-sky-400/55 via-indigo-400/35 to-transparent dark:from-sky-400/45 dark:via-indigo-400/30",
    bullet: "from-sky-400 to-indigo-500 dark:from-sky-300 dark:to-indigo-400",
    halo:
      "from-sky-400/[0.18] via-indigo-400/[0.08] to-transparent dark:from-sky-400/[0.14] dark:via-indigo-400/[0.06]",
  },
  {
    chipBg:
      "bg-violet-500/[0.08] text-violet-700 ring-violet-500/25 dark:bg-violet-400/[0.08] dark:text-violet-300 dark:ring-violet-400/30",
    rule: "from-violet-400/55 via-fuchsia-400/35 to-transparent dark:from-violet-400/45 dark:via-fuchsia-400/30",
    bullet: "from-violet-400 to-fuchsia-500 dark:from-violet-300 dark:to-fuchsia-400",
    halo:
      "from-violet-400/[0.18] via-fuchsia-400/[0.08] to-transparent dark:from-violet-400/[0.14] dark:via-fuchsia-400/[0.06]",
  },
  {
    chipBg:
      "bg-emerald-500/[0.08] text-emerald-700 ring-emerald-500/25 dark:bg-emerald-400/[0.08] dark:text-emerald-300 dark:ring-emerald-400/30",
    rule: "from-emerald-400/55 via-teal-400/35 to-transparent dark:from-emerald-400/45 dark:via-teal-400/30",
    bullet: "from-emerald-400 to-teal-500 dark:from-emerald-300 dark:to-teal-400",
    halo:
      "from-emerald-400/[0.18] via-teal-400/[0.08] to-transparent dark:from-emerald-400/[0.14] dark:via-teal-400/[0.06]",
  },
] as const

function careerBeatLabel(index: number, total: number): string {
  if (total <= 1) return "Career"
  if (index === 0) return "Latest chapter"
  if (index === total - 1) return "Where it began"
  return "Next chapter"
}

function ExperienceCard({
  job,
  index,
  total,
}: {
  job: ExperienceItem
  index: number
  total: number
}) {
  const accent = ACCENTS[index % ACCENTS.length]!
  const status = index === 0 ? "Most recent" : "Past chapter"
  const chapterNum = String(index + 1).padStart(2, "0")
  const totalNum = String(total).padStart(2, "0")

  return (
    <article
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border",
        "border-black/[0.07] bg-linear-to-br from-white/[0.55] via-white/[0.32] to-white/[0.14]",
        "shadow-[0_1px_0_1px_oklch(1_0_0_/0.45)_inset,0_18px_60px_-32px_oklch(0.35_0.06_260_/0.22)]",
        "dark:border-white/[0.08] dark:from-white/[0.045] dark:via-white/[0.025] dark:to-white/[0.01]",
        "dark:shadow-[0_1px_0_1px_oklch(1_0_0_/0.05)_inset,0_22px_70px_-36px_oklch(0_0_0_/0.55)]"
      )}
    >
      {/* Top hairline accent */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r",
          accent.rule
        )}
        aria-hidden
      />

      {/* Static spotlight halo (top-left) */}
      <div
        className={cn(
          "pointer-events-none absolute -top-16 -left-14 -z-[1] h-56 w-56 rounded-full bg-linear-to-br opacity-90 blur-3xl sm:h-64 sm:w-64",
          accent.halo
        )}
        aria-hidden
      />

      {/* Massive faded chapter numeral */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-1 -bottom-4 font-heading text-[6.5rem] leading-none font-light tracking-tighter select-none sm:-right-3 sm:-bottom-7 sm:text-[9rem] lg:text-[10rem]",
          "text-foreground/[0.035] dark:text-foreground/[0.045]"
        )}
      >
        {chapterNum}
      </span>

      <div className="relative grid gap-5 p-4 sm:p-5 sm:gap-6 lg:grid-cols-[15rem_1fr] lg:gap-8 lg:p-6">
        {/* Meta column */}
        <div className="flex flex-row items-start gap-4 lg:flex-col lg:gap-5">
          <div
            className={cn(
              "flex size-[4.5rem] shrink-0 items-center justify-center rounded-2xl border shadow-md sm:size-20 lg:size-[5.5rem]",
              "border-white/70 bg-linear-to-br from-white to-white/65",
              "dark:border-white/15 dark:from-[#2a2b30] dark:to-[#1c1d22]"
            )}
          >
            <BrandImage
              src={job.logoUrl}
              alt=""
              className="size-12 rounded-xl object-cover sm:size-14 lg:size-16"
              fallback={Building2Icon}
              fallbackClassName="text-muted-foreground"
            />
          </div>

          <div className="min-w-0 space-y-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase ring-1 ring-inset",
                accent.chipBg
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full bg-linear-to-br",
                  accent.bullet,
                  index === 0 && "animate-pulse"
                )}
                aria-hidden
              />
              {status}
            </span>

            <div className="space-y-1">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Chapter {chapterNum}{" "}
                <span className="text-muted-foreground/55">/ {totalNum}</span>
              </p>
              <p className="font-mono text-[13px] font-medium text-foreground/90">
                {job.period}
              </p>
              <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPinIcon className="size-2.5 shrink-0 opacity-70" aria-hidden />
                {job.location}
              </p>
            </div>
          </div>
        </div>

        {/* Detail column */}
        <div className="min-w-0 space-y-4">
          <header className="space-y-1">
            <p className="font-mono text-[9px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              {careerBeatLabel(index, total)}
            </p>
            <h3 className="font-heading text-xl leading-[1.12] tracking-tight text-balance sm:text-[1.375rem] lg:text-[1.5rem]">
              {job.company}
            </h3>
            <p className="text-sm font-medium text-foreground/85 sm:text-[15px]">
              {job.role}
            </p>
          </header>

          <div
            className={cn(
              "h-px w-full bg-linear-to-r",
              "from-foreground/[0.14] via-foreground/[0.08] to-transparent dark:from-white/15 dark:via-white/8"
            )}
            aria-hidden
          />

          <ul className="space-y-2">
            {job.highlights.map((line, hi) => (
              <li
                key={line}
                className="relative flex items-start gap-2 text-[13px] leading-snug text-foreground/[0.88] sm:text-sm sm:leading-relaxed"
              >
                <span className="mr-1 font-mono text-[9px] font-semibold tracking-wider text-muted-foreground/60 tabular-nums sm:mr-1.5 sm:text-[10px]">
                  {String(hi + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export function ExperienceSection() {
  const total = EXPERIENCES.length

  return (
    <WorkbenchScrollFrame id="experience">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I’ve worked."
            description="Roles, impact, and the kind of problems I like to solve."
          />
        </ScrollReveal>

        <ol className="mt-8 space-y-4 sm:mt-10 sm:space-y-5 lg:space-y-6">
          {EXPERIENCES.map((job, index) => (
            <ScrollReveal key={job.id} delayMs={Math.min(index * 90, 360)}>
              <li className="list-none">
                <ExperienceCard job={job} index={index} total={total} />
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </WorkbenchScrollFrame>
  )
}
