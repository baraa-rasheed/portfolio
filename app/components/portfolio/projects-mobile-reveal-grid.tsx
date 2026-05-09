import type { ProjectItem } from "~/constants/project-types"
import { cn } from "~/lib/utils"

import { ProjectMobileCard } from "./project-showcase-cards"

type ProjectsMobileRevealGridProps = {
  projects: ProjectItem[]
}

/** Dense responsive grid of app-store style tiles (no scroll-entry animation). */
export function ProjectsMobileRevealGrid({
  projects,
}: ProjectsMobileRevealGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10",
        "sm:grid-cols-3 sm:gap-x-5",
        "md:grid-cols-4 md:gap-x-6",
        "lg:grid-cols-5 lg:gap-x-6"
      )}
    >
      {projects.map((project) => (
        <ProjectMobileCard key={project.name} project={project} />
      ))}
    </div>
  )
}
