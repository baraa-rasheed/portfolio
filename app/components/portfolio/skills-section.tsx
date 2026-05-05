import { Code2Icon } from "lucide-react"
import type { ReactNode } from "react"

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

/** Pill sizing — between compact and large; fits two-row grids. */
function SkillChip({ skill }: { skill: SkillBadgeItem }) {
  return (
    <span
      role="presentation"
      className={cn(
        "inline-flex shrink-0 snap-start items-center gap-2 rounded-full py-1 pl-1 pr-2.5 sm:py-1.5 sm:pl-1.5 sm:pr-3",
        "border border-transparent bg-linear-to-b from-white/90 to-white/74 text-foreground",
        "shadow-[0_1px_0_rgb(255_255_255_/_.88)_inset,0_2px_6px_-3px_rgb(0_0_0_/_.065)]",
        "text-xs font-medium leading-tight text-muted-foreground transition-[transform,box-shadow,color] duration-200 sm:text-[0.8125rem] sm:font-semibold",
        "hover:text-foreground hover:shadow-[0_1px_0_rgb(255_255_255_/_.9)_inset,0_3px_10px_-5px_rgb(0_0_0_/_.09)]",
        "dark:from-white/[0.09] dark:to-white/[0.04]",
        "dark:shadow-[0_1px_0_rgb(255_255_255_/_.05)_inset,0_2px_10px_-6px_rgb(0_0_0_/_.42)]",
        "dark:hover:shadow-[0_1px_0_rgb(255_255_255_/_.07)_inset,0_3px_14px_-6px_rgb(0_0_0_/_.5)]"
      )}
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-white/95 to-white/78 shadow-[inset_0_1px_0_rgb(255_255_255_/_.93)] dark:from-white/14 dark:to-white/[0.07] dark:shadow-none">
        <BrandImage
          src={skillIconSrc(skill.icon)}
          alt=""
          className="size-3.5 object-contain sm:size-4 dark:brightness-95"
          fallback={Code2Icon}
        />
      </span>
      <span className="max-w-[10.5rem] truncate sm:max-w-[12rem]">
        {skill.name}
      </span>
    </span>
  )
}

/**
 * One horizontal scroll for the whole skills block: groups stack vertically; each group’s chips
 * are laid out in two rows (column-wise flow). All groups move together when scrolling sideways.
 */
function SkillsUnifiedScroll({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "portfolio-scrollbar-hide touch-pan-x overflow-x-auto overflow-y-visible pb-2 pt-0.5 [-webkit-overflow-scrolling:touch]"
      )}
    >
      <div className="flex w-max min-w-full flex-col gap-6 sm:gap-7 lg:gap-8">
        {children}
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <WorkbenchScrollFrame
      id="skills"
      scrollAreaClassName="overflow-x-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:py-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Skills"
            title="Stack and craft."
            description="Two rows per group; scroll sideways to see every skill."
            className="max-w-2xl lg:space-y-2 [&_h2]:lg:text-3xl"
          />
        </ScrollReveal>

        <ScrollReveal delayMs={60} className="mt-6 sm:mt-8">
          <SkillsUnifiedScroll>
            {SKILL_GROUPS.map((group, idx) => (
              <section
                key={group.title}
                aria-labelledby={`skill-group-${idx}`}
                className="flex w-max flex-col gap-2.5 sm:gap-3"
              >
                <h3
                  id={`skill-group-${idx}`}
                  className="font-mono text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase sm:text-xs sm:tracking-[0.2em]"
                >
                  {group.title}
                </h3>
                <div
                  className={cn(
                    "grid w-max [grid-auto-columns:max-content] grid-flow-col grid-rows-2 items-start gap-x-2.5 gap-y-2",
                    "sm:gap-x-3 sm:gap-y-2.5"
                  )}
                >
                  {group.items.map((skill) => (
                    <SkillChip key={`${group.title}-${skill.name}`} skill={skill} />
                  ))}
                </div>
              </section>
            ))}
          </SkillsUnifiedScroll>
        </ScrollReveal>
      </div>
    </WorkbenchScrollFrame>
  )
}
