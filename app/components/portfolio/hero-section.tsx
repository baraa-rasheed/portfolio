"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { SocialBrandIcon } from "~/lib/social-brand-icon"
import { cn } from "~/lib/utils"
import {
  EXPERIENCES,
  IMAGES,
  SITE,
  SOCIAL_LINKS,
} from "~/constants/portfolio"

import { usePortfolioLayout } from "./portfolio-layout-context"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

const HERO_STATS = [
  { value: "9+", label: "Years engineering" },
  { value: "120+", label: "Apps shipped" },
  { value: "1M+", label: "Installs" },
] as const

/** Marquee — tech stack only (no employers or domains). */
const MARQUEE_SKILLS = [
  "React",
  "React Native",
  "TypeScript",
  "Next.js",
  "Swift",
  "Kotlin",
  "Node.js",
  "Tailwind",
  "GraphQL",
  "Postgres",
  "AWS",
] as const

/** Compact name for the career trail. */
function shortCompany(name: string): string {
  if (name.includes("7 Eleven") || name.includes("7-Eleven")) return "7-Eleven"
  if (name.includes("KAIT")) return "KAIT"
  if (name.includes("1Zillion")) return "1Zillion"
  if (name.includes("VASMob")) return "VASMob"
  return name.split("—")[0]?.split("-")[0]?.trim() ?? name
}

/**
 * Crayon-stroke highlight for the headline phrase.
 *
 * Built to read like a single confident crayon swipe (ref: typical "crayon
 * underline / brush mark grunge" stock illustrations):
 *
 *  - `feTurbulence` with anisotropic baseFrequency (high X, very low Y) generates
 *    fine horizontal striations — the defining trait of a crayon stroke.
 *  - `feColorMatrix` boosts the alpha contrast so the noise produces sharp on/off
 *    "skip marks" instead of a soft fade.
 *  - `feComposite operator="in"` uses that noise as the alpha mask for the colored
 *    body, so the green only paints where the "crayon" actually touched.
 *  - A horizontal taper mask feathers both ends so the stroke starts/ends like a
 *    natural mark instead of a hard rectangle.
 *  - `clip-path` wipe lays the stroke down left → right at its final thickness.
 */
function CalmReliableWipeHighlight() {
  const reduced = useReducedMotion()
  const uid = React.useId().replace(/\W/g, "")
  const fillId = `crayon-fill-${uid}`
  const grainId = `crayon-grain-${uid}`
  const taperId = `crayon-taper-${uid}`

  const transition = {
    duration: reduced ? 0 : 0.95,
    delay: reduced ? 0 : 0.35,
    ease: [0.65, 0, 0.35, 1] as const,
  }

  return (
    <span className="relative inline-block px-[0.5em] py-[0.06em]">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-x-[0.18em] -inset-y-[0.22em] z-0 -rotate-[1deg] -skew-x-[10deg]"
        initial={reduced ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={transition}
        style={{ willChange: "clip-path" }}
      >
        <svg
          viewBox="0 0 240 56"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(110 231 183)" />
              <stop offset="55%" stopColor="rgb(52 211 153)" />
              <stop offset="100%" stopColor="rgb(16 185 129)" />
            </linearGradient>

            {/*
             * Horizontal paint grain.
             * baseFrequency "fx fy" — fx LOW (≈0.025) means the noise changes
             * slowly along X (long, continuous streaks), fy HIGH (≈1.1) means it
             * changes rapidly along Y. Result: parallel horizontal stripes of
             * varying alpha, like a brush dragged across the band.
             *
             * The colorMatrix on the alpha channel clips low values to 0 and
             * high values to 1, turning soft turbulence into discrete "this row
             * has pigment / this row doesn't" stripes (the streak gaps).
             */}
            <filter
              id={grainId}
              x="-2%"
              y="-2%"
              width="104%"
              height="104%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.02 0.42"
                numOctaves="1"
                seed="9"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 1
                        0 0 0 0 1
                        0 0 0 0 1
                        0 0 0 1.4 -0.55"
                result="grain"
              />
              <feComposite in="SourceGraphic" in2="grain" operator="in" />
            </filter>

            {/* Tapered ends so the stroke fades in/out instead of cutting off */}
            <linearGradient id={taperId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity={0} />
              <stop offset="3%" stopColor="white" stopOpacity={0.45} />
              <stop offset="9%" stopColor="white" stopOpacity={1} />
              <stop offset="91%" stopColor="white" stopOpacity={1} />
              <stop offset="97%" stopColor="white" stopOpacity={0.5} />
              <stop offset="100%" stopColor="white" stopOpacity={0} />
            </linearGradient>
            <mask id={`${taperId}-m`}>
              <rect x="0" y="0" width="240" height="56" fill={`url(#${taperId})`} />
            </mask>
          </defs>

          <g mask={`url(#${taperId}-m)`} opacity="0.92" className="dark:opacity-80">
            {/* Soft wash — gives the stroke a base color body before grain bites in */}
            <path
              d="M2 16 Q 60 11, 120 14 T 238 14 L 238 42 Q 180 46, 120 42 T 2 42 Z"
              fill={`url(#${fillId})`}
              opacity="0.42"
            />
            {/* Crayon body — same shape, with horizontal grain filter applied */}
            <path
              d="M2 16 Q 60 11, 120 14 T 238 14 L 238 42 Q 180 46, 120 42 T 2 42 Z"
              fill={`url(#${fillId})`}
              filter={`url(#${grainId})`}
            />
          </g>
        </svg>
      </motion.span>
      <span className="relative z-[1] text-foreground">calm, reliable</span>
    </span>
  )
}

/**
 * Pointer-driven 3D tilt for the portrait. Tracks the cursor relative to the
 * element bounds and maps to rotateX/rotateY through a spring for smoothness.
 */
function PortraitTilt({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const interactedRef = React.useRef(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.6 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9])
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7])

  const shineX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"])
  const shineY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"])
  const shine = useMotionTemplate`radial-gradient(420px circle at ${shineX} ${shineY}, rgba(255,255,255,0.22), transparent 55%)`

  React.useEffect(() => {
    if (reduced) return
    let raf = 0
    const start = performance.now() + 500
    const tick = (now: number) => {
      if (interactedRef.current) return
      const t = (now - start) / 1000
      if (t < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      mx.set(Math.sin(t * 0.9) * 0.07)
      my.set(Math.cos(t * 0.7) * 0.05)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, mx, my])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return
    interactedRef.current = true
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 1100 }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative will-change-transform"
      >
        {children}
        {!reduced ? (
          <motion.div
            aria-hidden
            style={{ backgroundImage: shine }}
            className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-soft-light"
          />
        ) : null}
      </motion.div>
    </div>
  )
}

/**
 * Auto-scrolling marquee of stack skills. Pauses on hover.
 * Reuses `portfolio-marquee` keyframes from app.css. Items are duplicated so
 * the loop appears seamless (translate3d 0 → -50%).
 *
 * `roomy` bumps padding + type sizes when the workbench is maximized.
 */
function HeroMarquee({ roomy = false }: { roomy?: boolean }) {
  return (
    <div
      className={cn(
        "group/marquee relative w-full overflow-hidden",
        "border-y border-foreground/[0.07] dark:border-white/[0.06]",
        "[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex w-max items-center will-change-transform",
          "animate-[portfolio-marquee_42s_linear_infinite]",
          "group-hover/marquee:[animation-play-state:paused]",
          "motion-reduce:animate-none"
        )}
      >
        {[0, 1].map((rep) => (
          <ul key={rep} className="flex items-center" aria-hidden={rep === 1}>
            {MARQUEE_SKILLS.map((skill, i) => (
              <li
                key={`${rep}-${skill}-${i}`}
                className="flex items-center"
              >
                <span
                  className={cn(
                    "font-heading tracking-tight whitespace-nowrap text-foreground/55",
                    roomy
                      ? "px-4 py-3 text-[1.05rem] sm:text-[1.15rem]"
                      : "px-4 py-3 text-[1rem] sm:text-[1.05rem]"
                  )}
                >
                  {skill}
                </span>
                <span
                  aria-hidden
                  className="text-foreground/15 dark:text-white/15"
                >
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export function HeroSection() {
  const firstName = SITE.name.split(" ")[0]
  const { workbenchMaximized } = usePortfolioLayout()
  // Roomy = workbench fills the viewport; we can use bigger type, more whitespace.
  const roomy = workbenchMaximized

  const current = EXPERIENCES[0]
  const currentCompany = shortCompany(current?.company ?? "")
  const currentRole = current?.role ?? "Senior Software Engineer"

  return (
    <WorkbenchScrollFrame id="about" className="relative">
      <div className="relative flex w-full flex-col lg:h-full">
        <div
          className={cn(
            "relative mx-auto flex w-full max-w-6xl flex-1 flex-col",
            "px-4 pt-4 pb-4 sm:px-6 sm:pt-5 sm:pb-5",
            "lg:px-8",
            roomy ? "lg:pt-7 lg:pb-6 xl:pt-9 xl:pb-8" : "lg:pt-5 lg:pb-5"
          )}
        >
        {/* TOP META — index + LIVE pill */}
        <header
          className={cn(
            "portfolio-hero-enter portfolio-hero-delay-1",
            "flex items-center justify-between gap-4"
          )}
        >
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
            <span className="text-foreground/35 tabular-nums">01</span>
            <span aria-hidden>—</span>
            <span className="text-foreground/55">Overview</span>
          </span>

          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1",
              "border border-emerald-500/35 bg-emerald-500/[0.08] text-emerald-700",
              "dark:border-emerald-400/30 dark:bg-emerald-400/[0.08] dark:text-emerald-300",
              "font-mono text-[10px] tracking-[0.22em] uppercase"
            )}
          >
            <span
              aria-hidden
              className="relative inline-flex size-1.5 items-center justify-center"
            >
              <span className="absolute size-1.5 animate-ping rounded-full bg-emerald-500/55 dark:bg-emerald-400/55" />
              <span className="relative size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </span>
            Available for senior roles
          </span>
        </header>

        {/* MAIN GRID */}
        <div
          className={cn(
            "mt-5 grid w-full items-start gap-7 sm:mt-7 sm:gap-9",
            "lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]",
            roomy
              ? "lg:mt-8 lg:gap-13 xl:gap-[4.5rem]"
              : "lg:mt-7 lg:gap-12 xl:gap-[4rem]"
          )}
        >
          {/* COPY COLUMN */}
          <div className="relative flex min-w-0 flex-col">
            {/* Eyebrow signature */}
            <p
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-1",
                "font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase"
              )}
            >
              <span className="text-foreground/65">{SITE.name}</span>
              <span className="px-2 text-foreground/25" aria-hidden>
                /
              </span>
              <span>Software Engineer · Texas, USA</span>
            </p>

            {/* POSTER HEADLINE — bold, statement-driven, with a highlight block */}
            <h1
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-2 mt-3 sm:mt-4",
                "font-heading text-balance tracking-[-0.035em]",
                "text-[2.15rem] leading-[1.02] font-semibold",
                "sm:text-[2.7rem] sm:leading-[1]",
                roomy
                  ? "lg:text-[3.2rem] xl:text-[3.9rem] xl:leading-[0.96]"
                  : "lg:text-[3.05rem] xl:text-[3.55rem] xl:leading-[0.96]"
              )}
            >
              <span className="block text-foreground">I ship</span>
              <span className="block">
                <CalmReliableWipeHighlight />
              </span>
              <span className="block text-foreground">
                mobile &amp; web
              </span>
              <span className="block text-foreground/45">
                for ambitious teams.
              </span>
            </h1>

            {/* Lede */}
            <p
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-3 mt-5 sm:mt-6",
                "max-w-[34rem] text-pretty text-muted-foreground",
                "text-[14.5px] leading-[1.65] sm:text-[15px] sm:leading-[1.68]",
                "lg:text-[15.5px] lg:leading-[1.7]"
              )}
            >
              Hi — I’m {firstName}. Senior software engineer with{" "}
              <span className="text-foreground/85">9+ years</span> shipping
              products in{" "}
              <span className="text-foreground/85">AI</span>,{" "}
              <span className="text-foreground/85">e‑commerce</span> and{" "}
              <span className="text-foreground/85">fintech</span> — currently
              helping ship at scale at{" "}
              <span className="text-foreground/95 font-medium">
                {currentCompany}
              </span>
              .
            </p>

            {/* CTA row — primary as solid pill, secondary as link */}
            <div
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-3 mt-5 sm:mt-6",
                "flex flex-wrap items-center gap-3 sm:gap-4"
              )}
            >
              <a
                href="#apps-mobile"
                className={cn(
                  "group/cta inline-flex items-center gap-2 rounded-full px-5 py-2.5",
                  "bg-foreground text-background",
                  "font-heading text-[14.5px] font-medium tracking-tight",
                  "shadow-[0_8px_24px_-12px_oklch(0.25_0.04_265_/_0.6)]",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-14px_oklch(0.25_0.04_265_/_0.7)]",
                  "dark:bg-foreground dark:text-background",
                  "dark:shadow-[0_10px_28px_-12px_oklch(0_0_0_/_0.6)]"
                )}
              >
                See selected work
                <ArrowUpRightIcon
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-out group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                />
              </a>
              <a
                href="#contact"
                className={cn(
                  "group/cta2 inline-flex items-center gap-2 rounded-full px-4 py-2.5",
                  "border border-foreground/[0.12] bg-transparent text-foreground/85",
                  "font-heading text-[14.5px] font-medium tracking-tight",
                  "transition-colors duration-300",
                  "hover:bg-foreground/[0.04] hover:text-foreground",
                  "dark:border-white/[0.12] dark:hover:bg-white/[0.05]"
                )}
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* PORTRAIT COLUMN */}
          <div
            className={cn(
              "portfolio-hero-enter portfolio-hero-delay-3 relative",
              "mx-auto w-full max-w-[240px] sm:max-w-[260px]",
              "lg:mx-0 lg:ml-auto",
              roomy ? "lg:max-w-[300px] xl:max-w-[340px]" : "lg:max-w-[290px] xl:max-w-[320px]"
            )}
          >
            <div className="mb-2.5 flex items-center justify-between gap-3 font-mono text-[9px] tracking-[0.22em] text-muted-foreground uppercase">
              <span className="text-foreground/45">Fig. 01</span>
              <span className="text-foreground/35">{SITE.title}</span>
            </div>

            {/* Hairline frame ghost */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -bottom-3 -right-3 -z-[1] hidden h-[calc(100%-2rem)] w-full rounded-2xl border lg:block",
                "border-foreground/[0.06] dark:border-white/[0.05]"
              )}
            />

            <PortraitTilt>
              <figure
                className={cn(
                  "relative overflow-hidden rounded-2xl border",
                  "border-foreground/[0.08] bg-foreground/[0.02]",
                  "shadow-[0_24px_60px_-32px_oklch(0.22_0.04_265_/_0.35)]",
                  "dark:border-white/[0.08] dark:bg-white/[0.025]",
                  "dark:shadow-[0_28px_70px_-40px_oklch(0_0_0_/_0.6)]"
                )}
              >
                <img
                  src={IMAGES.profile}
                  alt={IMAGES.alt}
                  loading="eager"
                  decoding="async"
                  className="block aspect-[4/5] w-full object-cover object-top"
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/40 via-black/10 to-transparent"
                />

                <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between text-white">
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase opacity-85">
                    {SITE.name}
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase opacity-65">
                    {new Date().getFullYear()}
                  </p>
                </figcaption>
              </figure>
            </PortraitTilt>

            {/* Now-at chip — under image */}
            <div
              className={cn(
                "mt-3 inline-flex w-full items-center gap-2 self-start rounded-full pl-1 pr-3 py-1",
                "border border-foreground/[0.08] bg-foreground/[0.02] backdrop-blur-md",
                "dark:border-white/[0.07] dark:bg-white/[0.025]"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-5 items-center rounded-full px-2",
                  "bg-foreground text-background font-mono text-[9px] tracking-[0.18em] uppercase"
                )}
              >
                Now
              </span>
              <p className="min-w-0 flex-1 truncate font-mono text-[10.5px] tracking-[0.04em] text-foreground/75">
                <span className="text-foreground/55">{currentRole} ·</span>{" "}
                <span className="text-foreground">{currentCompany}</span>
              </p>
            </div>
          </div>
        </div>

        {/* MARQUEE — tech stack */}
        <div
          className={cn(
            "portfolio-hero-enter portfolio-hero-delay-4",
            roomy ? "mt-6 sm:mt-7 lg:mt-7" : "mt-5 sm:mt-6 lg:mt-6"
          )}
        >
          <HeroMarquee roomy={roomy} />
        </div>

        {/* STATS + SOCIALS — pinned to bottom of section */}
        <footer
          className={cn(
            "portfolio-hero-enter portfolio-hero-delay-5",
            "flex flex-col gap-3 pt-1",
            "sm:flex-row sm:items-end sm:justify-between sm:gap-8",
            roomy
              ? "mt-5 sm:mt-6 lg:mt-auto lg:pt-4"
              : "mt-4 sm:mt-5 lg:mt-auto lg:pt-3"
          )}
        >
          <dl className="flex flex-wrap items-end gap-y-4 divide-x divide-foreground/[0.07] dark:divide-white/[0.06]">
            {HERO_STATS.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "flex min-w-0 flex-col gap-1",
                  i === 0 ? "pr-6" : "px-6",
                  i === HERO_STATS.length - 1 && "pl-6 pr-0"
                )}
              >
                <dd
                  className={cn(
                    "font-heading leading-none font-semibold tracking-tight tabular-nums text-foreground",
                    roomy
                      ? "text-[1.55rem] sm:text-[1.75rem]"
                      : "text-[1.5rem] sm:text-[1.65rem]"
                  )}
                >
                  {s.value}
                </dd>
                <dt className="font-mono text-[9.5px] tracking-[0.2em] text-muted-foreground uppercase">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>

          <ul className="flex items-center gap-1 sm:pb-0.5">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className={cn(
                    "group/social inline-flex size-9 items-center justify-center rounded-full",
                    "border border-foreground/[0.08] text-foreground/65 transition-all duration-300",
                    "hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground",
                    "dark:border-white/[0.08] dark:hover:border-white/20"
                  )}
                >
                  <SocialBrandIcon brand={link.brand} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </footer>
        </div>
      </div>
    </WorkbenchScrollFrame>
  )
}
