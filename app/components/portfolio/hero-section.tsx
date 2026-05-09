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
import { IMAGES, SITE, SOCIAL_LINKS } from "~/constants/portfolio"

import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

const HERO_STATS = [
  { value: "9+", label: "Years engineering" },
  { value: "120+", label: "Apps shipped" },
  { value: "1M+", label: "Installs" },
] as const

const NOW = {
  role: "Senior Software Engineer",
  company: "7-Eleven",
} as const

/**
 * Pointer-driven 3D tilt for the portrait. Tracks the cursor relative to the
 * element bounds and maps to rotateX/rotateY through a spring for smoothness.
 * Also exposes the cursor position as a CSS gradient overlay (cursor "shine").
 */
function PortraitTilt({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  // Tracks whether the user has taken over the tilt with their cursor.
  const interactedRef = React.useRef(false)

  // Normalized mouse position (-0.5 → 0.5)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const springConfig = { stiffness: 180, damping: 18, mass: 0.6 }
  const sx = useSpring(mx, springConfig)
  const sy = useSpring(my, springConfig)

  // Tilt range: ±10deg feels expensive but not gimmicky.
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10])
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8])

  // Cursor shine — soft radial highlight that follows the pointer.
  const shineX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"])
  const shineY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"])
  const shine = useMotionTemplate`radial-gradient(420px circle at ${shineX} ${shineY}, rgba(255,255,255,0.22), transparent 55%)`

  /**
   * Idle "floating" tilt — a tiny, continuous sway so the card feels alive
   * before the cursor arrives. Stops on first interaction or reduced-motion.
   */
  React.useEffect(() => {
    if (reduced) return
    let raf = 0
    const start = performance.now() + 500 // brief settle delay

    const tick = (now: number) => {
      if (interactedRef.current) return
      const t = (now - start) / 1000
      if (t < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      // Small Lissajous-like float: ±0.08 (≈ ±1.6° rotation through the spring).
      mx.set(Math.sin(t * 0.9) * 0.08)
      my.set(Math.cos(t * 0.7) * 0.06)
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
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(px)
    my.set(py)
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

        {/* Cursor-following shine overlay */}
        {!reduced ? (
          <motion.div
            aria-hidden
            style={{ backgroundImage: shine }}
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] mix-blend-soft-light"
          />
        ) : null}
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  const firstName = SITE.name.split(" ")[0]

  return (
    <WorkbenchScrollFrame id="about" className="relative">
      <div
        className={cn(
          "relative mx-auto w-full max-w-6xl",
          "px-4 pt-10 pb-12 sm:px-6 sm:pt-12 sm:pb-14",
          "lg:px-8 lg:pt-14 lg:pb-16 xl:pt-16 xl:pb-20"
        )}
      >
        {/* Top meta — index + status */}
        <div
          className={cn(
            "portfolio-hero-enter portfolio-hero-delay-1",
            "flex items-center justify-between gap-4",
            "font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase"
          )}
        >
          <span className="inline-flex items-center gap-2 text-foreground/55">
            <span className="text-foreground/35 tabular-nums">01</span>
            <span aria-hidden>—</span>
            <span>Overview</span>
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-2",
              "text-emerald-700/85 dark:text-emerald-300/85"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "relative inline-flex size-1.5 items-center justify-center"
              )}
            >
              <span className="absolute size-1.5 animate-ping rounded-full bg-emerald-500/55 dark:bg-emerald-400/45" />
              <span className="relative size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </span>
            Open to senior roles
          </span>
        </div>

        <div
          className={cn(
            "mt-10 grid w-full items-start gap-10",
            "sm:mt-12 sm:gap-12",
            "lg:mt-14 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16",
            "xl:gap-[5.5rem]"
          )}
        >
          {/* COPY */}
          <div className="relative flex min-w-0 flex-col">
            {/* Eyebrow */}
            <p
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-1",
                "font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase"
              )}
            >
              <span className="text-foreground/65">{SITE.name}</span>
              <span className="px-2 text-foreground/25" aria-hidden>
                /
              </span>
              <span>Software Engineer · Texas, USA</span>
            </p>

            {/* Display headline */}
            <h1
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-2 mt-6",
                "font-heading text-balance tracking-[-0.025em]",
                "text-[2.35rem] leading-[1.02] font-medium",
                "sm:text-[3rem] sm:leading-[1.0]",
                "lg:text-[3.4rem]",
                "xl:text-[4rem] xl:leading-[0.98]"
              )}
            >
              <span className="block text-foreground/95">
                Hi, I’m {firstName}.
              </span>
              <span className="mt-2 block text-foreground/95">
                I build{" "}
                <em
                  className={cn(
                    "not-italic bg-clip-text text-transparent",
                    "bg-linear-to-br from-sky-600 via-violet-600 to-emerald-600",
                    "dark:from-sky-300 dark:via-violet-300 dark:to-emerald-300"
                  )}
                >
                  calm, reliable
                </em>{" "}
                software for
              </span>
              <span className="mt-2 block text-foreground/55">
                mobile &amp; web.
              </span>
            </h1>

            {/* Lede */}
            <p
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-3 mt-7",
                "max-w-[34rem] text-pretty",
                "text-[15.5px] leading-[1.7] text-muted-foreground",
                "sm:text-base sm:leading-[1.72]"
              )}
            >
              Nine years shipping mobile and web products across{" "}
              <span className="text-foreground/85">AI</span>,{" "}
              <span className="text-foreground/85">e‑commerce</span> and{" "}
              <span className="text-foreground/85">fintech</span> — leading teams,
              shipping to app stores, and writing the kind of code I’d want to
              inherit.
            </p>

            {/* CTAs — refined link buttons (no heavy chrome) */}
            <div
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-4 mt-9",
                "flex flex-wrap items-center gap-x-7 gap-y-4"
              )}
            >
              <a
                href="#apps-mobile"
                className={cn(
                  "group/cta inline-flex items-center gap-2 font-heading text-[15px] font-medium tracking-tight",
                  "text-foreground transition-colors"
                )}
              >
                <span className="relative">
                  See selected work
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-foreground/85 transition-transform duration-500 ease-out",
                      "group-hover/cta:scale-x-0"
                    )}
                  />
                </span>
                <ArrowUpRightIcon
                  className="size-4 transition-transform duration-300 ease-out group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                  aria-hidden
                />
              </a>
              <a
                href="#contact"
                className={cn(
                  "group/cta2 inline-flex items-center gap-2 font-heading text-[15px] font-medium tracking-tight",
                  "text-muted-foreground transition-colors hover:text-foreground"
                )}
              >
                <span className="relative">
                  Get in touch
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground/55 transition-transform duration-500 ease-out",
                      "group-hover/cta2:scale-x-100"
                    )}
                  />
                </span>
              </a>
            </div>

            {/* Now-at strip */}
            <div
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-4 mt-10",
                "inline-flex max-w-full items-center gap-3 self-start rounded-full pl-1.5 pr-3.5 py-1",
                "border border-foreground/[0.08] bg-foreground/[0.02] backdrop-blur-md",
                "dark:border-white/[0.07] dark:bg-white/[0.025]"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-6 items-center rounded-full px-2",
                  "bg-foreground text-background font-mono text-[9px] tracking-[0.18em] uppercase",
                  "dark:bg-foreground dark:text-background"
                )}
              >
                Now
              </span>
              <p className="min-w-0 truncate font-mono text-[11px] tracking-[0.04em] text-foreground/75">
                <span className="text-foreground/55">{NOW.role} ·</span>{" "}
                <span className="text-foreground">{NOW.company}</span>
              </p>
            </div>
          </div>

          {/* PORTRAIT — quieter, anchored top */}
          <div
            className={cn(
              "portfolio-hero-enter portfolio-hero-delay-3 relative",
              "mx-auto w-full max-w-[280px] sm:max-w-[320px]",
              "lg:mx-0 lg:ml-auto lg:max-w-[360px] xl:max-w-[400px]"
            )}
          >
            {/* Editorial caption — top */}
            <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[9px] tracking-[0.22em] text-muted-foreground uppercase">
              <span className="text-foreground/45">Fig. 01</span>
              <span className="text-foreground/35">{SITE.title}</span>
            </div>

            {/* Hairline frame ghost */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -bottom-3 -right-3 -z-[1] hidden h-full w-full rounded-2xl border lg:block",
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
                  className={cn(
                    "block w-full object-cover object-top",
                    "aspect-[4/5]"
                  )}
                />

                {/* Soft top gradient for caption legibility */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/35 via-black/10 to-transparent"
                />

                <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between text-white">
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase opacity-80">
                    {SITE.name}
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase opacity-60">
                    {new Date().getFullYear()}
                  </p>
                </figcaption>
              </figure>
            </PortraitTilt>
          </div>
        </div>

        {/* Stats + socials — bottom band */}
        <div
          className={cn(
            "portfolio-hero-enter portfolio-hero-delay-5",
            "mt-12 grid grid-cols-1 gap-8 border-t border-foreground/[0.07] pt-8 sm:mt-14 sm:pt-10",
            "lg:mt-16 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16",
            "dark:border-white/[0.06]"
          )}
        >
          {/* Inline numeric stats with hairline separators */}
          <dl
            className={cn(
              "flex flex-wrap items-end gap-x-0 gap-y-6",
              "divide-x divide-foreground/[0.07] dark:divide-white/[0.06]"
            )}
          >
            {HERO_STATS.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "flex min-w-0 flex-col gap-2",
                  i === 0 ? "pr-7" : "px-7",
                  i === HERO_STATS.length - 1 && "pl-7 pr-0"
                )}
              >
                <dd
                  className={cn(
                    "font-heading text-[2rem] leading-none font-medium tracking-tight tabular-nums",
                    "text-foreground/95 sm:text-[2.25rem]"
                  )}
                >
                  {s.value}
                </dd>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>

          {/* Socials — text rows, editorial */}
          <ul
            className={cn(
              "flex flex-col gap-1 self-end",
              "lg:items-end"
            )}
          >
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "group/social inline-flex items-center gap-3 py-1",
                    "text-[13px] tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                  )}
                >
                  <SocialBrandIcon
                    brand={link.brand}
                    className="size-[15px] opacity-65 transition-opacity group-hover/social:opacity-100"
                  />
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase">
                    {link.label}
                  </span>
                  <span className="font-heading text-foreground/85">
                    {link.brand === "linkedin"
                      ? "/baraa-rasheed"
                      : link.brand === "github"
                      ? "/Baraa-bi"
                      : link.brand === "x"
                      ? "@baraarasheed"
                      : link.short}
                  </span>
                  <ArrowUpRightIcon
                    aria-hidden
                    className="size-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover/social:translate-x-0 group-hover/social:opacity-70"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WorkbenchScrollFrame>
  )
}
