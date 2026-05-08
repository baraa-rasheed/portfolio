"use client"

import { BookMarkedIcon } from "lucide-react"
import { motion } from "motion/react"

import { BrandImage } from "~/components/portfolio/brand-image"
import type { CourseItem } from "~/constants/portfolio"
import { COURSES } from "~/constants/portfolio"
import { simpleIconUrl } from "~/lib/brand-icons"
import { cn } from "~/lib/utils"

import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"
import { useShowcaseCardHoverMotion } from "./showcase-card-motion"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

function CourseCard({ course }: { course: CourseItem }) {
  const hoverMotion = useShowcaseCardHoverMotion()

  return (
    <div className="overflow-visible pt-2">
      <motion.article
        role="listitem"
        className={cn(
          "relative isolate flex h-full flex-col overflow-visible rounded-xl px-5 pt-[3.25rem] pb-5",
          "border border-transparent bg-linear-to-b from-white/93 to-white/76 text-foreground",
          "shadow-[0_1px_0_rgb(255_255_255_/_.9)_inset,0_2px_12px_-2px_rgb(0_0_0_/_.06),0_8px_28px_-12px_rgb(0_0_0_/_.08)]",
          "backdrop-blur-md transition-[box-shadow] duration-200 ease-out sm:pt-[3.75rem]",
          "hover:shadow-[0_1px_0_rgb(255_255_255_/_.95)_inset,0_4px_18px_-4px_rgb(0_0_0_/_.08),0_12px_36px_-14px_rgb(0_0_0_/_.1)]",
          "dark:from-white/[0.1] dark:to-white/[0.04]",
          "dark:shadow-[0_1px_0_rgb(255_255_255_/_.06)_inset,0_4px_20px_-8px_rgb(0_0_0_/_.5)]",
          "dark:hover:shadow-[0_1px_0_rgb(255_255_255_/_.08)_inset,0_8px_28px_-10px_rgb(0_0_0_/_.58)]"
        )}
        {...hoverMotion}
      >
        <div
          className={cn(
            "absolute -top-10 left-6 z-[2] flex size-[4.75rem] items-center justify-center",
            "sm:-top-11 sm:left-8 sm:size-20",
            "rounded-full border-2 border-white/75 bg-linear-to-b from-white/95 to-white/78",
            "shadow-[0_8px_24px_-10px_rgb(0_0_0/0.25),inset_0_1px_0_rgb(255_255_255/0.85)] backdrop-blur-sm",
            "ring-[3px] ring-white/60 ring-offset-2 ring-offset-background",
            "dark:border-white/25 dark:from-white/25 dark:via-white/15 dark:to-white/8 dark:shadow-[0_16px_36px_-10px_rgb(0_0_0/0.55)] dark:ring-white/15 dark:ring-offset-0 dark:backdrop-blur-md"
          )}
          aria-hidden
        >
          <BrandImage
            src={simpleIconUrl(course.iconSlug)}
            alt=""
            className="size-[2.75rem] shrink-0 object-contain p-1.5 sm:size-14 dark:brightness-105"
            fallback={BookMarkedIcon}
          />
        </div>

        <div className="min-w-0 flex-1 space-y-2.5">
          <header className="space-y-1 pt-1 pr-1 sm:pr-4">
            <h3 className="font-heading text-base leading-snug font-medium tracking-tight text-balance">
              {course.title}
            </h3>
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
              {course.author}
            </p>
          </header>
          <p className="relative pt-2.5 text-sm leading-relaxed text-pretty text-muted-foreground before:absolute before:inset-x-0 before:-top-px before:h-px before:bg-linear-to-r before:from-transparent before:via-black/10 before:to-transparent dark:before:via-white/15">
            {course.description}
          </p>
        </div>
      </motion.article>
    </div>
  )
}

export function CoursesSection() {
  return (
    <WorkbenchScrollFrame id="courses">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Learning"
            title="Courses I’ve taken."
            description="Deep dives that improved how I design, debug, and deliver."
          />
        </ScrollReveal>

        <div
          className="grid grid-cols-1 gap-x-4 gap-y-12 pt-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-14 sm:pt-10 md:grid-cols-3 md:gap-x-4 lg:gap-x-5 xl:gap-x-6"
          role="list"
          aria-label="Course list"
        >
          {COURSES.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </div>
    </WorkbenchScrollFrame>
  )
}
