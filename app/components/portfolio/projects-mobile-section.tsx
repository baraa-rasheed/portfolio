import { PROJECTS } from "~/constants/portfolio"

import { ProjectsMobileRevealGrid } from "./projects-mobile-reveal-grid"
import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

export function ProjectsMobileSection() {
  const mobile = PROJECTS.filter((p) => p.kind === "mobile")

  return (
    <WorkbenchScrollFrame
      id="apps-mobile"
      accessibleTitleId="apps-mobile-heading"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <ScrollReveal>
          <SectionHeading
            headingId="apps-mobile-heading"
            eyebrow="Mobile apps"
            title="Apps I’ve shipped."
            description="A selection of production iOS & Android work."
          />
        </ScrollReveal>

        <ProjectsMobileRevealGrid projects={mobile} />
      </div>
    </WorkbenchScrollFrame>
  )
}
