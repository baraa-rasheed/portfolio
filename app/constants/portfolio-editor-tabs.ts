/** Filename shown for each section editor pane (chrome tab + a11y). */
export const PORTFOLIO_EDITOR_TAB_BY_SECTION: Record<string, string> = {
  about: "hero.tsx",
  experience: "experience.tsx",
  recommendations: "recommendations.md",
  education: "education.tsx",
  skills: "skills.ts",
  "apps-mobile": "mobile.tsx",
  "apps-web": "web.tsx",
  certifications: "certifications.md",
  courses: "courses.ts",
  contact: "contact.md",
}

export function portfolioEditorTabTitle(sectionId: string): string {
  return PORTFOLIO_EDITOR_TAB_BY_SECTION[sectionId] ?? `${sectionId}`
}
