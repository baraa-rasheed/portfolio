"use client"

import * as React from "react"
import { ArrowDownRightIcon, MapPinIcon } from "lucide-react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { Button } from "~/components/ui/button"
import { SocialBrandIcon } from "~/lib/social-brand-icon"
import { cn } from "~/lib/utils"
import { IMAGES, SITE, SOCIAL_LINKS } from "~/constants/portfolio"

import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

const HERO_STATS = [
  { value: "9+", label: "Years" },
  { value: "120+", label: "Apps shipped" },
  { value: "1M+", label: "Installs" },
] as const

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
            className="pointer-events-none absolute inset-0 rounded-[2rem] mix-blend-soft-light"
          />
        ) : null}
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  return (
    <WorkbenchScrollFrame id="about" className="relative">
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8",
          // On lg, vertical-center inside the pane so it never needs its own scroll.
          "lg:min-h-full lg:items-center lg:justify-center lg:py-6"
        )}
      >
        <div
          className={cn(
            "grid w-full items-center gap-8 sm:gap-10",
            "lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-14 xl:gap-20"
          )}
        >
          {/* PORTRAIT */}
          <div className="portfolio-hero-enter portfolio-hero-delay-2 relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:mx-0 lg:max-w-none">
            {/* Soft ambient glow behind the portrait */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-[1] opacity-80 blur-3xl"
            >
              <div className="absolute -top-4 -left-4 h-44 w-44 rounded-full bg-sky-400/20 dark:bg-sky-500/12" />
              <div className="absolute -bottom-6 -right-6 h-52 w-52 rounded-full bg-violet-400/18 dark:bg-violet-500/12" />
            </div>

            {/* Decorative offset frame — gives editorial depth */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 -z-[1] translate-x-3 translate-y-3 rounded-[2rem] border",
                "border-foreground/[0.18] dark:border-white/[0.08]",
                "lg:translate-x-4 lg:translate-y-4"
              )}
            />

            <PortraitTilt>
              <figure
                className={cn(
                  "relative overflow-hidden rounded-[2rem] border backdrop-blur-2xl",
                  // Light mode — needed real contrast: foreground-tinted border,
                  // a touch more opaque white fill, and a darker drop shadow so
                  // the card actually reads against a near-white page.
                  "border-foreground/[0.12] bg-white/55",
                  "shadow-[0_1px_0_rgb(255_255_255/0.7)_inset,0_30px_80px_-32px_oklch(0.2_0.05_260_/_0.55)]",
                  // Dark mode — original treatment retained.
                  "dark:border-white/10 dark:bg-white/[0.04]",
                  "dark:shadow-[0_36px_100px_-50px_oklch(0_0_0_/_0.7)]"
                )}
              >
                <img
                  src={IMAGES.profile}
                  alt={IMAGES.alt}
                  loading="eager"
                  decoding="async"
                  className={cn(
                    // Tall portrait crop — keeps the face anchored to the top
                    // of the frame so the figure reads as a proper headshot.
                    "block w-full object-cover object-top",
                    "aspect-[3/4]",
                    "max-h-[clamp(360px,64vh,620px)]"
                  )}
                />

                {/* Bottom → name plate */}
                <figcaption
                  className={cn(
                    "absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5",
                    "border-white/55 bg-white/55 backdrop-blur-xl",
                    "dark:border-white/12 dark:bg-[#1a1b1f]/65"
                  )}
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      {SITE.title}
                    </p>
                    <p className="truncate font-heading text-sm font-semibold tracking-tight">
                      {SITE.name}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase",
                      "bg-emerald-500/[0.14] text-emerald-700 ring-1 ring-inset ring-emerald-500/30",
                      "dark:bg-emerald-400/[0.12] dark:text-emerald-300 dark:ring-emerald-400/30"
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    Available
                  </span>
                </figcaption>
              </figure>
            </PortraitTilt>
          </div>

          {/* COPY */}
          <div className="relative flex flex-col gap-6 sm:gap-7">
            {/* Eyebrow / location */}
            <div className="portfolio-hero-enter portfolio-hero-delay-1 flex flex-wrap items-center gap-2.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase",
                  "border-white/55 bg-white/35 text-foreground/75 backdrop-blur-md",
                  "dark:border-white/12 dark:bg-white/[0.05] dark:text-foreground/80"
                )}
              >
                <MapPinIcon className="size-3 opacity-70" aria-hidden />
                Texas, USA
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                Senior Software Engineer
              </span>
            </div>

            {/* Headline */}
            <h1
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-2 font-heading font-semibold tracking-[-0.025em] text-balance",
                "text-4xl leading-[1.05] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.02] xl:text-[4.25rem]"
              )}
            >
              <span className="block">Hi, I’m {SITE.name.split(" ")[0]}.</span>
              <span
                className={cn(
                  "mt-1 block bg-linear-to-br from-sky-600 via-violet-600 to-emerald-600 bg-clip-text font-medium text-transparent",
                  "dark:from-sky-300 dark:via-violet-300 dark:to-emerald-300"
                )}
              >
                I build calm, reliable software.
              </span>
            </h1>

            {/* Tagline */}
            <p
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-3 max-w-xl text-pretty text-muted-foreground",
                "text-[15px] leading-relaxed sm:text-base lg:text-[17px]"
              )}
            >
              Senior engineer with{" "}
              <span className="font-medium text-foreground/85">8+ years</span>{" "}
              shipping mobile and web products across{" "}
              <span className="font-medium text-foreground/85">AI</span>,{" "}
              <span className="font-medium text-foreground/85">e‑commerce</span>{" "}
              and{" "}
              <span className="font-medium text-foreground/85">fintech</span>.
              Currently helping ship at scale for{" "}
              <span className="font-medium text-foreground/85">7‑Eleven</span>.
            </p>

            {/* CTAs */}
            <div className="portfolio-hero-enter portfolio-hero-delay-4 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className={cn(
                  "group/cta gap-2 rounded-xl px-5 transition-all",
                  "shadow-[0_18px_40px_-22px_oklch(0.55_0.18_265_/_0.7)]",
                  "hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-20px_oklch(0.55_0.2_265_/_0.85)]",
                  "dark:shadow-[0_22px_50px_-22px_oklch(0.62_0.22_270_/_0.65)]"
                )}
              >
                <a href="#apps-mobile">
                  See selected work
                  <ArrowDownRightIcon className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:translate-y-0.5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className={cn(
                  "rounded-xl border-white/55 bg-white/30 backdrop-blur-md hover:bg-white/45",
                  "dark:border-white/15 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
                )}
              >
                <a href="#contact">Get in touch</a>
              </Button>
            </div>

            {/* Stats strip + social — single condensed row */}
            <div
              className={cn(
                "portfolio-hero-enter portfolio-hero-delay-5 mt-1 flex flex-col gap-5 border-t pt-5",
                "border-foreground/[0.08] dark:border-white/[0.08]",
                "sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              )}
            >
              <dl className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-7">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      {s.label}
                    </dt>
                    <dd
                      className={cn(
                        "font-heading text-xl font-semibold tracking-tight bg-linear-to-br bg-clip-text text-transparent",
                        "from-sky-600 via-violet-600 to-emerald-600",
                        "dark:from-sky-300 dark:via-violet-300 dark:to-emerald-300"
                      )}
                    >
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full border text-foreground/80 transition-colors",
                      "border-white/45 bg-white/30 backdrop-blur-sm hover:bg-white/45 hover:text-foreground",
                      "dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.09]"
                    )}
                  >
                    <SocialBrandIcon brand={link.brand} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkbenchScrollFrame>
  )
}
