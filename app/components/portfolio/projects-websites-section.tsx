import { PROJECTS } from "~/constants/portfolio"

import { ProjectWebsiteCard } from "./project-showcase-cards"
import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

export function ProjectsWebsitesSection() {
  const web = PROJECTS.filter((p) => p.kind === "web")

  return (
    <WorkbenchScrollFrame
      id="apps-web"
      accessibleTitleId="apps-web-heading"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <ScrollReveal>
          <SectionHeading
            headingId="apps-web-heading"
            eyebrow="Websites & web apps"
            title="Web work I’ve built."
            description="Landing pages, dashboards, and product UI shipped to the browser."
          />
        </ScrollReveal>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3 xl:gap-8"
          role="list"
          aria-label="Web projects"
        >
          {web.map((project, idx) => (
            <ScrollReveal
              key={project.name}
              delayMs={Math.min(idx * 70, 320)}
              className="h-full min-h-0"
            >
              <div role="listitem" className="h-full">
                <ProjectWebsiteCard project={project} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </WorkbenchScrollFrame>
  )
}
