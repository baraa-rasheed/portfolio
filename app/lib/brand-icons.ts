/** Real brand SVGs via Simple Icons — https://simpleicons.org */
export function simpleIconUrl(slug: string, hexColor?: string) {
  const safe = slug.trim().toLowerCase()
  const base = `https://cdn.simpleicons.org/${encodeURIComponent(safe)}`
  if (!hexColor) return base
  const color = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor
  return `${base}/${encodeURIComponent(color)}`
}

/** Human-language shorthand: country flag SVGs (FlagCDN • ISO). */
export const LANGUAGE_ICON = {
  /** Jordan — Arabic. */
  arabic: "https://flagcdn.com/jo.svg",
  /** UK — English (common UI shorthand). */
  english: "https://flagcdn.com/gb.svg",
} as const

/**
 * High-resolution favicons from Google's index (icons served by the indexed site).
 */
export function siteFaviconUrl(domain: string, size = 128) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`
}
