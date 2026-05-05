import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const input =
  process.env.ITUNES_EXPORT_TXT ?? "/Users/bras3007/Downloads/1.txt"
const outfile = path.join(__dirname, "../app/constants/ios-app-store-catalog.ts")

const raw = fs.readFileSync(input, "utf8").trim()
const data = JSON.parse(raw)
const apps = data.results.filter(
  (r) =>
    r.wrapperType === "software" &&
    r.kind === "software" &&
    r.trackName &&
    r.trackViewUrl
)

function summarize(desc) {
  if (!desc || typeof desc !== "string") return "iOS app on the App Store."
  const line = desc.split(/\r?\n/).find((l) => l.trim().length > 0)
  if (!line) return "iOS app on the App Store."
  const t = line.trim().replace(/\s+/g, " ")
  if (t.length <= 170) return t
  let cut = t.slice(0, 167).replace(/\s+\S*$/, "")
  return cut + "…"
}

const q = JSON.stringify
const parts = [
  "/**",
  " * Parsed from an iTunes Search API export (developer lookup JSON).",
  " * Each entry maps: trackName → name, artworkUrl512 → previewImage, trackViewUrl → href.",
  " * Regenerate: ITUNES_EXPORT_TXT=/path/to/export.txt node scripts/gen-ios-app-catalog.mjs",
  " */",
  "",
  'import type { ProjectItem } from "./project-types"',
  "",
  "export const IOS_APP_STORE_CATALOG_APPS: readonly ProjectItem[] = [",
]

for (const r of apps) {
  parts.push(`  {`)
  parts.push(`    name: ${q(r.trackName)},`)
  parts.push(`    summary: ${q(summarize(r.description))},`)
  parts.push(`    kind: "mobile",`)
  parts.push(`    previewImage: ${q(r.artworkUrl512 || r.artworkUrl100)},`)
  parts.push(`    href: ${q(r.trackViewUrl)},`)
  parts.push(`  },`)
}

parts.push(`]`, "")

fs.mkdirSync(path.dirname(outfile), { recursive: true })
fs.writeFileSync(outfile, parts.join("\n"))
console.log(`Wrote ${apps.length} apps to ${outfile}`)
