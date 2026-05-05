"use client"

import { AwardIcon, BadgeCheckIcon } from "lucide-react"
import { motion } from "motion/react"

import { Badge } from "~/components/ui/badge"
import { CERTIFICATIONS, type CertificationItem } from "~/constants/portfolio"
import { cn } from "~/lib/utils"

import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"
import { useShowcaseCardHoverMotion } from "./showcase-card-motion"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

export function CertificationsSection() {
  return (
    <WorkbenchScrollFrame id="certifications">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Certifications"
            title="Credentials that back the work."
            description="Accredited certs—the same rigor I bring to delivery."
          />
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
    </WorkbenchScrollFrame>
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
