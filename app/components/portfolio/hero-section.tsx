import {
  ArrowDownRightIcon,
  GlobeIcon,
  RocketIcon,
  Share2Icon,
  TerminalIcon,
  ZapIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { SocialBrandIcon } from "~/lib/social-brand-icon"
import { cn } from "~/lib/utils"
import { IMAGES, SITE, SOCIAL_LINKS } from "~/constants/portfolio"

import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase()
}

const HERO_STATS = [
  { value: "8+", label: "Years engineering" },
  { value: "20+", label: "Production apps" },
  { value: "200K+", label: "Cumulative installs" },
  { value: "iOS · Android · Web", label: "Platforms shipped" },
] as const

const NOW_BUILDING = [
  {
    accent: "text-emerald-600 dark:text-emerald-400",
    label: "Native AI assistants on iOS + Android",
  },
  {
    accent: "text-sky-600 dark:text-sky-400",
    label: "Storefront & checkout for fintech",
  },
  {
    accent: "text-violet-600 dark:text-violet-400",
    label: "Edge runtimes (Deno) for low-latency UX",
  },
] as const

export function HeroSection() {
  return (
    <WorkbenchScrollFrame id="about" className="relative">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-6 sm:px-6 sm:py-8 md:grid-cols-[1.05fr_minmax(0,0.95fr)] md:items-center md:gap-12 lg:py-10">
        {/* LEFT — title cluster */}
        <div className="relative flex flex-col space-y-7">
          <div className="space-y-3">
            <h1 className="portfolio-hero-enter portfolio-hero-delay-1 font-heading text-4xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[4.25rem] lg:leading-[0.96]">
              <span className="portfolio-text-aurora block">{SITE.name}.</span>
              <span className="mt-1 block bg-linear-to-br from-sky-600 via-violet-600 to-emerald-600 bg-clip-text font-medium text-transparent dark:from-sky-300 dark:via-violet-300 dark:to-emerald-300">
                Shipping mobile &amp; web apps,
                <br className="hidden sm:inline" /> end to end.
              </span>
            </h1>
            <p className="portfolio-hero-enter portfolio-hero-delay-3 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg lg:leading-relaxed">
              <span className="font-medium text-foreground/85">{SITE.title}</span>
              {" · "}
              8+ years shipping AI, e‑commerce &amp; fintech — prototype to production.
            </p>
          </div>

          <div className="portfolio-hero-enter portfolio-hero-delay-4 flex flex-wrap gap-3">
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
                Explore selected work
                <ArrowDownRightIcon className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:translate-y-0.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl border-white/55 bg-white/30 backdrop-blur-md hover:bg-white/45 dark:border-white/15 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
            >
              <a href="#experience">Read the story</a>
            </Button>
          </div>

          <div className="portfolio-hero-enter portfolio-hero-delay-5 space-y-2.5">
            <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              <Share2Icon className="size-3 opacity-70" aria-hidden /> Connect
            </p>
            <div className="flex flex-wrap gap-2 pt-0.5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border border-white/45 bg-white/30 text-foreground/85 backdrop-blur-sm transition-colors",
                    "hover:bg-white/45 hover:text-foreground dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.09]"
                  )}
                >
                  <SocialBrandIcon brand={link.brand} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — floating artifacts */}
        <div className="portfolio-hero-enter portfolio-hero-delay-2 relative mx-auto w-full max-w-md md:mx-0 md:max-w-none">
          {/* Halo behind artifacts */}
          <div
            className="pointer-events-none absolute inset-0 -z-[1] flex items-center justify-center"
            aria-hidden
          >
            <div className="size-[22rem] rounded-full bg-linear-to-br from-sky-400/22 via-violet-400/18 to-emerald-400/18 opacity-80 blur-[52px] dark:from-sky-500/16 dark:via-violet-500/14 dark:to-emerald-500/12" />
          </div>

          <div className="relative space-y-4">
            {/* Identity card — animated conic ring */}
            <article
              className={cn(
                "portfolio-conic-ring relative overflow-hidden rounded-2xl",
                "shadow-[0_24px_60px_-30px_oklch(0.55_0.16_270_/_0.45)] dark:shadow-[0_28px_68px_-30px_oklch(0.45_0.2_280_/_0.65)]"
              )}
            >
              <div className="relative flex items-center gap-4 rounded-2xl bg-linear-to-br from-white/65 to-white/35 p-4 backdrop-blur-2xl sm:p-5 dark:from-white/[0.08] dark:to-white/[0.03]">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 -m-2 rounded-full bg-linear-to-br from-sky-400/45 to-violet-400/45 blur-md dark:from-sky-500/35 dark:to-violet-500/35" />
                  <Avatar
                    size="lg"
                    className="relative size-16 ring-2 ring-white/85 dark:ring-white/15"
                  >
                    <AvatarImage src={IMAGES.profile} alt={IMAGES.alt} />
                    <AvatarFallback className="text-base font-semibold">
                      {initials(SITE.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="absolute right-0 bottom-0 flex size-4 items-center justify-center rounded-full border-2 border-background bg-emerald-500 dark:bg-emerald-400"
                    aria-hidden
                  >
                    <span className="inline-flex size-1.5 rounded-full bg-white/95 dark:bg-emerald-950/35" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Currently online
                  </p>
                  <p className="font-heading text-lg leading-tight font-semibold tracking-tight">
                    {SITE.name}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-foreground/70">
                    <GlobeIcon className="size-3 opacity-70" aria-hidden /> Senior engineer · Mobile + Web
                  </p>
                </div>

                <div className="hidden flex-col items-end gap-1.5 sm:flex">
                  <span className="rounded-full bg-emerald-500/[0.14] px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-emerald-700 uppercase ring-1 ring-inset ring-emerald-500/30 dark:bg-emerald-400/[0.14] dark:text-emerald-300 dark:ring-emerald-400/30">
                    Hireable
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/70">
                    UTC · async-first
                  </span>
                </div>
              </div>
            </article>

            {/* Stats card */}
            <article
              className={cn(
                "relative rounded-2xl border p-5 backdrop-blur-2xl",
                "border-white/45 bg-linear-to-br from-white/55 to-white/25",
                "shadow-[0_24px_60px_-30px_oklch(0.55_0.16_270_/_0.4)]",
                "dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.025]",
                "dark:shadow-[0_24px_60px_-30px_oklch(0.4_0.2_280_/_0.55)]"
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  <ZapIcon
                    className="size-3 text-amber-500 dark:text-amber-400"
                    aria-hidden
                  />{" "}
                  Track record
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/[0.12] px-2 py-0.5 text-[10px] font-semibold tracking-wider text-sky-700 uppercase ring-1 ring-inset ring-sky-500/30 dark:bg-sky-400/[0.12] dark:text-sky-300 dark:ring-sky-400/30">
                  <span className="size-1.5 rounded-full bg-sky-500 opacity-90 dark:bg-sky-400" />{" "}
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {HERO_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/40 bg-white/30 p-3 backdrop-blur-sm transition-colors hover:border-white/60 dark:border-white/[0.08] dark:bg-white/[0.035] dark:hover:border-white/15"
                  >
                    <p className="font-heading bg-linear-to-br from-sky-500 via-violet-500 to-emerald-500 bg-clip-text text-lg font-semibold tracking-tight text-transparent dark:from-sky-300 dark:via-violet-300 dark:to-emerald-300 sm:text-xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Currently building */}
            <article
              className={cn(
                "relative rounded-2xl border p-5 backdrop-blur-2xl",
                "border-white/45 bg-linear-to-br from-white/55 to-white/25",
                "shadow-[0_24px_60px_-30px_oklch(0.55_0.16_270_/_0.4)]",
                "dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.025]",
                "dark:shadow-[0_24px_60px_-30px_oklch(0.4_0.2_280_/_0.55)]"
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  <TerminalIcon
                    className="size-3 text-foreground/70"
                    aria-hidden
                  />{" "}
                  Currently building
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400"
                  aria-label="Live"
                >
                  <span className="relative inline-flex size-2 items-center justify-center">
                    <span className="inline-flex size-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/35 dark:bg-emerald-400 dark:ring-emerald-400/35" />
                  </span>
                  shipping
                </span>
              </div>
              <ul className="space-y-2 font-mono text-xs text-foreground/85">
                {NOW_BUILDING.map((item, i) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className={cn("mt-[1px] font-semibold", item.accent)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("font-semibold", item.accent)}>›</span>
                    <span className="min-w-0 leading-relaxed">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-3 text-[11px] text-muted-foreground dark:border-white/[0.07]">
                <span className="flex items-center gap-1.5">
                  <RocketIcon
                    className="size-3 text-violet-500/85 dark:text-violet-300"
                    aria-hidden
                  />
                  Latest release
                </span>
                <span className="font-mono">prod · v1.4.0</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </WorkbenchScrollFrame>
  )
}
