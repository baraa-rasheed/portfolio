"use client"

import { Code2Icon } from "lucide-react"
import { useReducedMotion } from "motion/react"

import { BrandImage } from "~/components/portfolio/brand-image"
import type { SkillBadgeItem } from "~/constants/portfolio"
import { SKILL_GROUPS } from "~/constants/portfolio"
import { simpleIconUrl } from "~/lib/brand-icons"
import { cn } from "~/lib/utils"

import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

function skillIconSrc(skill: SkillBadgeItem["icon"]) {
  return skill.source === "simpleicon" ? simpleIconUrl(skill.slug) : skill.href
}

/** Pill sizing tuned for ticker rows — readable at a glance. */
function SkillChip({ skill }: { skill: SkillBadgeItem }) {
  return (
    <span
      role="presentation"
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full py-1 pl-1.5 pr-3 sm:gap-2.5 sm:py-1.5 sm:pl-2 sm:pr-4",
        "border border-transparent bg-linear-to-b from-white/90 to-white/74 text-foreground",
        "shadow-[0_1px_0_rgb(255_255_255_/_.88)_inset,0_2px_8px_-4px_rgb(0_0_0_/_.07)]",
        "text-[0.75rem] font-semibold leading-none text-muted-foreground transition-[transform,box-shadow,color] duration-200 sm:text-[0.8125rem]",
        "hover:text-foreground hover:shadow-[0_1px_0_rgb(255_255_255_/_.9)_inset,0_4px_14px_-6px_rgb(0_0_0_/_.1)]",
        "dark:from-white/[0.09] dark:to-white/[0.04]",
        "dark:shadow-[0_1px_0_rgb(255_255_255_/_.05)_inset,0_2px_12px_-6px_rgb(0_0_0_/_.42)]",
        "dark:hover:shadow-[0_1px_0_rgb(255_255_255_/_.07)_inset,0_4px_16px_-6px_rgb(0_0_0_/_.5)]"
      )}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-white/95 to-white/78 shadow-[inset_0_1px_0_rgb(255_255_255_/_.93)] sm:size-8 dark:from-white/14 dark:to-white/[0.07] dark:shadow-none">
        <BrandImage
          src={skillIconSrc(skill.icon)}
          alt=""
          className="size-3.5 object-contain sm:size-4 dark:brightness-95"
          fallback={Code2Icon}
        />
      </span>
      <span className="max-w-[12rem] truncate sm:max-w-[14rem]">{skill.name}</span>
    </span>
  )
}

function chipsFromSkills(
  skills: readonly SkillBadgeItem[],
  groupTitle: string,
  laneKey: string,
  instance: string
) {
  return skills.map((skill) => (
    <SkillChip
      key={`${groupTitle}-${skill.name}-${laneKey}-${instance}`}
      skill={skill}
    />
  ))
}

/** First / second marquee row per group (~half the skills each). */
function splitSkillsIntoTwoLines(
  skills: readonly SkillBadgeItem[]
): [readonly SkillBadgeItem[], readonly SkillBadgeItem[]] {
  const n = skills.length
  if (n === 0) return [[], []]
  if (n === 1) return [skills, skills]
  const mid = Math.ceil(n / 2)
  return [skills.slice(0, mid), skills.slice(mid)]
}

const segmentGap = "gap-4 pr-4 sm:gap-5 sm:pr-5"

function SkillsTickerLane({
  skills,
  groupTitle,
  laneKey,
  durationSec,
  direction,
  reducedMotion,
}: {
  skills: readonly SkillBadgeItem[]
  groupTitle: string
  laneKey: string
  durationSec: number
  direction: "forward" | "reverse"
  reducedMotion: boolean
}) {
  if (skills.length === 0) return null

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "flex flex-wrap content-start gap-x-4 gap-y-3 sm:gap-x-5 sm:gap-y-4"
        )}
      >
        {chipsFromSkills(skills, groupTitle, laneKey, "static")}
      </div>
    )
  }

  const primary = chipsFromSkills(skills, groupTitle, laneKey, "a")
  const duplicate = chipsFromSkills(skills, groupTitle, laneKey, "b")

  return (
    <div className="relative -mx-4 sm:-mx-6">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 sm:w-16",
          "bg-linear-to-r from-background via-background/70 to-transparent"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 sm:w-16",
          "bg-linear-to-l from-background via-background/70 to-transparent"
        )}
      />

      <div className="portfolio-scrollbar-hide overflow-hidden py-1">
        <div
          className={cn(
            "flex w-max will-change-transform",
            "group-hover/skills-tickers:[animation-play-state:paused]"
          )}
          style={{
            animation:
              direction === "forward"
                ? `portfolio-marquee ${durationSec}s linear infinite`
                : `portfolio-marquee-reverse ${durationSec}s linear infinite`,
          }}
        >
          <div className={cn("flex shrink-0 items-center", segmentGap)}>
            {primary}
          </div>
          <div className={cn("flex shrink-0 items-center", segmentGap)} aria-hidden>
            {duplicate}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Per-group heading + two ticker lanes (split skills across two rows). */
function SkillsTickerGroup({
  title,
  titleId,
  skills,
  primaryDurationSec,
}: {
  title: string
  titleId: string
  skills: readonly SkillBadgeItem[]
  primaryDurationSec: number
}) {
  const reducedMotion = useReducedMotion() === true
  const [lineA, lineB] = splitSkillsIntoTwoLines(skills)
  const secondLineDurationSec =
    primaryDurationSec * SKILLS_TICKER_LINE2_DURATION_RATIO

  return (
    <section
      aria-labelledby={titleId}
      className="space-y-4 border-t border-foreground/[0.06] pt-8 first:border-t-0 first:pt-0 dark:border-white/[0.06]"
    >
      <h3
        id={titleId}
        className="font-mono text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase sm:text-xs sm:tracking-[0.2em]"
      >
        {title}
      </h3>

      <div className="space-y-3 sm:space-y-4">
        <SkillsTickerLane
          skills={lineA}
          groupTitle={title}
          laneKey="1"
          durationSec={primaryDurationSec}
          direction="forward"
          reducedMotion={reducedMotion}
        />
        <SkillsTickerLane
          skills={lineB}
          groupTitle={title}
          laneKey="2"
          durationSec={secondLineDurationSec}
          direction="reverse"
          reducedMotion={reducedMotion}
        />
      </div>
    </section>
  )
}

/** Base loop length for row 1; row 2 uses reverse animation and `SKILLS_TICKER_LINE2_DURATION_RATIO` (faster). */
const TICKER_PRIMARY_SEC = [28, 32, 24] as const

/** Second row duration = primary × ratio (< 1 → faster). */
const SKILLS_TICKER_LINE2_DURATION_RATIO = 0.82

export function SkillsSection() {
  return (
    <WorkbenchScrollFrame
      id="skills"
      scrollAreaClassName="overflow-x-hidden"
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:gap-12 lg:py-10"
        )}
      >
        <ScrollReveal>
          <SectionHeading
            eyebrow="Toolbox"
            title="Tools I ship with."
            description="Languages, frameworks, and delivery systems I use day‑to‑day."
            className="max-w-2xl lg:space-y-2 [&_h2]:lg:text-3xl"
          />
        </ScrollReveal>

        <ScrollReveal delayMs={60}>
          <div className="group/skills-tickers flex flex-col">
            {SKILL_GROUPS.map((group, idx) => (
              <SkillsTickerGroup
                key={group.title}
                titleId={`skill-group-${idx}`}
                title={group.title}
                skills={group.items}
                primaryDurationSec={
                  TICKER_PRIMARY_SEC[idx % TICKER_PRIMARY_SEC.length]!
                }
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </WorkbenchScrollFrame>
  )
}
