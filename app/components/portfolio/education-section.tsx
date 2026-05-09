"use client"

import { AwardIcon, BadgeCheckIcon, GraduationCapIcon, MapPinIcon } from "lucide-react"
import { motion } from "motion/react"

import { Badge } from "~/components/ui/badge"
import type { CertificationItem, EducationItem } from "~/constants/portfolio"
import { CERTIFICATIONS, EDUCATION } from "~/constants/portfolio"
import { cn } from "~/lib/utils"

import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"
import { useShowcaseCardHoverMotion } from "./showcase-card-motion"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

const ACCENTS = [
  {
    chipBg:
      "bg-sky-500/[0.08] text-sky-700 ring-sky-500/25 dark:bg-sky-400/[0.08] dark:text-sky-300 dark:ring-sky-400/30",
    rule: "from-sky-400/55 via-indigo-400/35 to-transparent dark:from-sky-400/45 dark:via-indigo-400/30",
    bullet: "from-sky-400 to-indigo-500 dark:from-sky-300 dark:to-indigo-400",
    halo:
      "from-sky-400/[0.18] via-indigo-400/[0.08] to-transparent dark:from-sky-400/[0.14] dark:via-indigo-400/[0.06]",
    edge:
      "group-hover/edu:border-sky-400/30 dark:group-hover/edu:border-sky-400/30",
  },
  {
    chipBg:
      "bg-emerald-500/[0.08] text-emerald-700 ring-emerald-500/25 dark:bg-emerald-400/[0.08] dark:text-emerald-300 dark:ring-emerald-400/30",
    rule: "from-emerald-400/55 via-teal-400/35 to-transparent dark:from-emerald-400/45 dark:via-teal-400/30",
    bullet: "from-emerald-400 to-teal-500 dark:from-emerald-300 dark:to-teal-400",
    halo:
      "from-emerald-400/[0.18] via-teal-400/[0.08] to-transparent dark:from-emerald-400/[0.14] dark:via-teal-400/[0.06]",
    edge:
      "group-hover/edu:border-emerald-400/30 dark:group-hover/edu:border-emerald-400/30",
  },
] as const

function EducationCard({
  item,
  index,
  total,
}: {
  item: EducationItem
  index: number
  total: number
}) {
  const accent = ACCENTS[index % ACCENTS.length]!
  const inProgress = /expect|present|ongoing|current/i.test(item.period)
  const status = inProgress ? "In progress" : "Completed"
  const trackNum = String(index + 1).padStart(2, "0")
  const totalNum = String(total).padStart(2, "0")
  const hoverMotion = useShowcaseCardHoverMotion()

  return (
    <motion.article
      className={cn(
        "group/edu relative isolate flex h-full flex-col overflow-hidden rounded-3xl border transition-[border-color,box-shadow] duration-300",
        "border-black/[0.07] bg-linear-to-br from-white/[0.55] via-white/[0.32] to-white/[0.14]",
        "shadow-[0_1px_0_1px_oklch(1_0_0_/0.45)_inset,0_18px_60px_-32px_oklch(0.35_0.06_260_/0.22)]",
        "dark:border-white/[0.08] dark:from-white/[0.045] dark:via-white/[0.025] dark:to-white/[0.01]",
        "dark:shadow-[0_1px_0_1px_oklch(1_0_0_/0.05)_inset,0_22px_70px_-36px_oklch(0_0_0_/0.55)]",
        "hover:shadow-[0_1px_0_1px_oklch(1_0_0_/0.5)_inset,0_28px_70px_-30px_oklch(0.35_0.08_260_/0.28)]",
        "dark:hover:shadow-[0_1px_0_1px_oklch(1_0_0_/0.06)_inset,0_30px_80px_-32px_oklch(0_0_0_/0.7)]",
        accent.edge
      )}
      {...hoverMotion}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r",
          accent.rule
        )}
        aria-hidden
      />

      <div
        className={cn(
          "pointer-events-none absolute -top-20 -left-16 -z-[1] h-60 w-60 rounded-full bg-linear-to-br opacity-90 blur-3xl transition-opacity duration-500 group-hover/edu:opacity-100",
          accent.halo
        )}
        aria-hidden
      />

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-3 -bottom-6 font-heading text-[8rem] leading-none font-light tracking-tighter select-none sm:-right-4 sm:-bottom-8 sm:text-[10rem]",
          "text-foreground/[0.035] dark:text-foreground/[0.045]"
        )}
      >
        {trackNum}
      </span>

      <div className="relative flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-2xl border shadow-md transition-transform duration-300 group-hover/edu:scale-[1.04] sm:size-[3.25rem]",
              "border-white/70 bg-linear-to-br from-white to-white/65",
              "dark:border-white/15 dark:from-[#2a2b30] dark:to-[#1c1d22]"
            )}
          >
            <GraduationCapIcon
              className="size-[1.125rem] text-foreground/85 sm:size-5"
              aria-hidden
            />
          </div>

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
                inProgress && "animate-pulse"
              )}
              aria-hidden
            />
            {status}
          </span>
        </div>

        <div className="space-y-1.5">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            Track {trackNum}{" "}
            <span className="text-muted-foreground/55">/ {totalNum}</span>
          </p>
          <h3 className="font-heading text-lg leading-[1.15] tracking-tight text-balance sm:text-xl">
            {item.degree}
          </h3>
          <p className="text-[15px] font-medium text-foreground/85">
            {item.school}
          </p>
        </div>

        <div
          className={cn(
            "h-px w-full bg-linear-to-r",
            "from-foreground/[0.14] via-foreground/[0.08] to-transparent dark:from-white/15 dark:via-white/8"
          )}
          aria-hidden
        />

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="font-mono text-[11px] font-medium text-foreground/85">
            {item.period}
          </span>
          {item.detail ? (
            <span className="flex items-center gap-1.5">
              <MapPinIcon className="size-3 shrink-0 opacity-70" aria-hidden />
              {item.detail}
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

function CertificationCard({ c, idx }: { c: CertificationItem; idx: number }) {
  const hoverMotion = useShowcaseCardHoverMotion()

  return (
    <ScrollReveal delayMs={Math.min(idx * 70, 210)}>
      <li>
        <motion.article
          className={cn(
            "relative overflow-hidden rounded-2xl border transition-[border-color,box-shadow,background-color] duration-200 ease-out",
            "border-white/35 bg-white/[0.06] shadow-[0_20px_50px_-38px_oklch(0.45_0.12_260_/_0.35)] backdrop-blur-md",
            "hover:border-white/45 hover:bg-white/[0.085] hover:shadow-[0_24px_56px_-34px_oklch(0.45_0.14_265_/_0.42)]",
            "dark:border-white/[0.09] dark:bg-white/[0.04] dark:shadow-[0_22px_50px_-36px_oklch(0.25_0.08_275_/_0.55)]",
            "dark:hover:border-white/[0.14] dark:hover:bg-white/[0.055]"
          )}
          {...hoverMotion}
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-linear-to-b from-sky-500/90 via-violet-500/85 to-emerald-500/90 opacity-95 dark:from-sky-400/80 dark:via-violet-400/75 dark:to-emerald-400/80"
            aria-hidden
          />

          <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:gap-10">
            <div className="flex shrink-0 justify-center sm:justify-start">
              {c.badgeSrc ? (
                <div
                  className={cn(
                    "flex size-[6.5rem] items-center justify-center rounded-2xl border border-white/50 bg-white p-3 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.95)] sm:size-[7.25rem]",
                    "dark:border-white/20 dark:bg-white/[0.96] dark:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.25)]"
                  )}
                >
                  <img
                    src={c.badgeSrc}
                    alt={c.badgeAlt ?? ""}
                    width={200}
                    height={200}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex size-[6.5rem] items-center justify-center rounded-2xl border border-dashed border-white/35 bg-white/[0.08] sm:size-[7.25rem]",
                    "dark:border-white/15 dark:bg-white/[0.04]"
                  )}
                >
                  <AwardIcon
                    className="size-10 text-muted-foreground opacity-70"
                    aria-hidden
                  />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge
                  variant="outline"
                  className={cn(
                    "border-emerald-500/35 bg-emerald-500/[0.08] font-mono text-[10px] tracking-wide uppercase",
                    "text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/[0.1] dark:text-emerald-300"
                  )}
                >
                  <BadgeCheckIcon className="size-3" aria-hidden />
                  Verified
                </Badge>
              </div>

              <h3 className="font-heading text-xl leading-snug font-semibold tracking-tight text-balance text-foreground sm:text-2xl">
                {c.name}
              </h3>

              <p className="text-sm text-muted-foreground sm:text-base">
                <span className="text-foreground/75">{c.issuer}</span>
              </p>

              {c.issuedAtIso ? (
                <time
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground tabular-nums uppercase"
                  dateTime={c.issuedAtIso}
                >
                  Issued · {c.date}
                </time>
              ) : (
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase tabular-nums">
                  Issued · {c.date}
                </p>
              )}
            </div>
          </div>
        </motion.article>
      </li>
    </ScrollReveal>
  )
}

export function EducationSection() {
  const total = EDUCATION.length

  return (
    <WorkbenchScrollFrame id="education">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:py-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Education"
            title="Education & certifications."
            description="Programs that shaped how I think and build, plus formal credentials."
          />
        </ScrollReveal>

        <ol className="grid min-h-0 list-none gap-5 p-0 sm:grid-cols-2 sm:gap-6">
          {EDUCATION.map((item, idx) => (
            <ScrollReveal key={item.degree} delayMs={Math.min(idx * 90, 220)}>
              <li className="h-full list-none">
                <EducationCard item={item} index={idx} total={total} />
              </li>
            </ScrollReveal>
          ))}
        </ol>

        <div className="space-y-6 sm:space-y-8">
          <ScrollReveal delayMs={60}>
            <div className="scroll-mt-6 max-w-2xl space-y-2">
              <h3
                id="certifications"
                className="font-heading text-xl font-semibold tracking-tight text-balance sm:text-2xl"
              >
                Certifications
              </h3>
              <p className="text-base text-muted-foreground">
                Formal credentials that support delivery, leadership, and how I
                work with teams.
              </p>
            </div>
          </ScrollReveal>

          <ul
            className="flex flex-col gap-5 sm:gap-6"
            aria-label="Professional certifications"
          >
            {CERTIFICATIONS.map((c, idx) => (
              <CertificationCard key={c.name} c={c} idx={idx} />
            ))}
          </ul>

          <p className="sr-only">
            PMI-ACP® credential badge image sourced from PMI Los Angeles Chapter
            (pmi-la.org), used according to PMI trademark guidance.
          </p>
        </div>
      </div>
    </WorkbenchScrollFrame>
  )
}
