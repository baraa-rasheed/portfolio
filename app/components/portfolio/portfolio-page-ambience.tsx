import { PortfolioMeshGradient } from "./portfolio-mesh-gradient"

/**
 * Full-viewport mesh behind the app — matches the minimized-workbench backdrop.
 */
export function PortfolioPageAmbience() {
  return (
    <div
      className="portfolio-page-mesh pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f5f7fb] dark:bg-[#0c0d10]"
      aria-hidden
    >
      <PortfolioMeshGradient className="absolute inset-0" />
    </div>
  )
}
