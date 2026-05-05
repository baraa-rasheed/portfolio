export type ProjectKind = "mobile" | "web"

export type ProjectItem = {
  name: string
  summary: string
  kind: ProjectKind
  /**
   * Screenshot / cover for the showcase card (`/projects/foo.png` in `public/`
   * or any image URL). Omit until you have an asset — a placeholder is shown.
   */
  previewImage?: string
  href?: string
}
