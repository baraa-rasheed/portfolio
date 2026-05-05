/**
 * Fixed animated orbs + grid — shared across the whole page (not clipped to hero).
 */
export function PortfolioPageAmbience() {
  return (
    <div
      className="portfolio-hero-orbs pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="portfolio-hero-blob-a absolute top-1/6 left-1/4 size-[min(42rem,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-sky-300/55 via-blue-400/35 to-transparent opacity-65 blur-3xl dark:from-sky-500/25 dark:via-blue-600/15 dark:opacity-40" />
      <div className="portfolio-hero-blob-b absolute top-[10%] right-[-15%] size-[min(36rem,100vw)] rounded-full bg-linear-to-bl from-violet-300/50 via-indigo-300/35 to-transparent opacity-50 blur-3xl dark:from-violet-500/20 dark:via-indigo-500/12 dark:opacity-35" />
      <div className="portfolio-hero-blob-c absolute bottom-[-20%] left-[55%] size-[min(32rem,90vw)] -translate-x-1/2 rounded-full bg-linear-to-t from-teal-300/45 via-cyan-300/25 to-transparent opacity-45 blur-3xl dark:from-teal-500/15 dark:via-cyan-500/10 dark:opacity-30" />

      {/* Fine grid across the viewport */}
      <div
        className="absolute inset-0 mask-[linear-gradient(to_bottom,transparent,black_10%,black_86%,transparent)] opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(var(--portfolio-grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--portfolio-grid-line) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  )
}
