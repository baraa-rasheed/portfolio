import type { Route } from "./+types/home"
import {
  CoursesSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  PortfolioLayoutProvider,
  PortfolioPageAmbience,
  PortfolioWorkbenchShell,
  ProjectsMobileSection,
  ProjectsWebsitesSection,
  RecommendationsSection,
  SiteFooter,
  SkillsSection,
} from "~/components/portfolio"
import { SITE } from "~/constants/portfolio"

export function meta(_: Route.MetaArgs) {
  return [
    { title: `${SITE.name} — ${SITE.title}` },
    {
      name: "description",
      content: SITE.tagline,
    },
    { property: "og:title", content: `${SITE.name} — ${SITE.title}` },
    { property: "og:description", content: SITE.tagline },
    { property: "og:type", content: "website" }
  ]
}

export default function Home() {
  return (
    <PortfolioLayoutProvider>
      <div className="relative min-h-svh">
        <PortfolioPageAmbience />
        <PortfolioWorkbenchShell>
          <HeroSection />
          <ExperienceSection />
          <ProjectsMobileSection />
          <ProjectsWebsitesSection />
          <SkillsSection />
          <EducationSection />
          <CoursesSection />
          <RecommendationsSection />
          <SiteFooter />
        </PortfolioWorkbenchShell>
      </div>
    </PortfolioLayoutProvider>
  )
}
