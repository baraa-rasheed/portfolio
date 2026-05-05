/**
 * Central place for static portfolio content, assets, and outbound links.
 * Update URLs here when your profiles or projects change.
 */

import { LANGUAGE_ICON } from "~/lib/brand-icons"

import { IOS_APP_STORE_CATALOG_APPS } from "./ios-app-store-catalog"
import type { ProjectItem } from "./project-types"

export type { ProjectKind, ProjectItem } from "./project-types"

export const SITE = {
  name: "Baraa Rasheed",
  title: "Software Engineer",
  /** Production URL for canonical / sharing */
  url: "https://baraa-rasheed.deno.dev",
  tagline:
    "Senior software engineer with over 8 years of experience building mobile and web products across AI, e-commerce, and fintech. I lead teams, ship to app stores, and care about maintainable code and clear delivery.",
} as const

/** Optional portrait. Place a file in `public/` and point here, or use a remote URL. */
export const IMAGES = {
  /** GitHub serves a redirect to the account avatar when this pattern is used. */
  profile: "https://github.com/Baraa-bi.png",
  alt: "Portrait of Baraa Rasheed",
} as const

/** Outbound profile URLs — reuse in UI to avoid drift. */
export const PROFILE_URLS = {
  github: "https://github.com/Baraa-bi",
  linkedin: "https://www.linkedin.com/in/baraa-rasheed",
  x: "https://x.com/baraarasheed",
} as const

/** Icon hint for hero / contact link rows (`web` = generic outbound). */
export type SocialBrand = "linkedin" | "x" | "github" | "web"

/** Verified profiles — update LinkedIn / X slugs in `PROFILE_URLS` when needed. */
export const SOCIAL_LINKS: ReadonlyArray<{
  label: string
  href: string
  short: string
  brand: SocialBrand
}> = [
  {
    label: "LinkedIn",
    href: PROFILE_URLS.linkedin,
    short: "Profile",
    brand: "linkedin",
  },
  {
    label: "X",
    href: PROFILE_URLS.x,
    short: "Posts",
    brand: "x",
  },
  {
    label: "GitHub",
    href: PROFILE_URLS.github,
    short: "Code",
    brand: "github",
  },
  {
    label: "Résumé site (archive)",
    href: SITE.url,
    short: "Archive",
    brand: "web",
  },
]

/** Section links + VS Code explorer–style filenames. */
export type NavExplorerKind = "tsx" | "ts" | "md" | "json"

/** File row (VS Code explorer). */
export type ExplorerFileRow = {
  type: "file"
  label: string
  href: string
  explorerFile: string
  explorerKind: NavExplorerKind
}

/** Collapsible folder with nested explorer files. */
export type ExplorerFolderRow = {
  type: "folder"
  /** Accessible label (Explorer tooltips / SR). */
  folderLabel: string
  folderName: string
  folderHref?: string
  /** Initial expanded state in the sidebar. */
  defaultOpen?: boolean
  /** When false, folder stays open and the sidebar toggle is hidden. */
  collapsible?: boolean
  children: readonly ExplorerFileRow[]
}

export type ExplorerRow = ExplorerFileRow | ExplorerFolderRow

/** VS Code explorer root — flattened scroll order derives from this tree. */
export const EXPLORER_TREE: readonly ExplorerRow[] = [
  {
    type: "file",
    label: "About",
    href: "#about",
    explorerFile: "hero.tsx",
    explorerKind: "tsx",
  },
  {
    type: "file",
    label: "Experience",
    href: "#experience",
    explorerFile: "experience.tsx",
    explorerKind: "tsx",
  },
  {
    type: "folder",
    folderLabel: "Apps folder",
    folderName: "apps",
    defaultOpen: true,
    collapsible: false,
    children: [
      {
        type: "file",
        label: "Mobile",
        href: "#apps-mobile",
        explorerFile: "mobile.tsx",
        explorerKind: "tsx",
      },
      {
        type: "file",
        label: "Web",
        href: "#apps-web",
        explorerFile: "web.tsx",
        explorerKind: "tsx",
      },
    ],
  },
  {
    type: "file",
    label: "Skills",
    href: "#skills",
    explorerFile: "skills.ts",
    explorerKind: "ts",
  },
  {
    type: "file",
    label: "Education",
    href: "#education",
    explorerFile: "education.tsx",
    explorerKind: "tsx",
  },
  {
    type: "file",
    label: "Certifications",
    href: "#certifications",
    explorerFile: "certifications.md",
    explorerKind: "md",
  },
  {
    type: "file",
    label: "Courses",
    href: "#courses",
    explorerFile: "courses.ts",
    explorerKind: "ts",
  },
  {
    type: "file",
    label: "Recommendations",
    href: "#recommendations",
    explorerFile: "recommendations.md",
    explorerKind: "md",
  },
  {
    type: "file",
    label: "Contact",
    href: "#contact",
    explorerFile: "contact.md",
    explorerKind: "md",
  },
] as const

/** Section `#id`s in DOM order — drives “active editor” highlighting. */
export function explorerScrollAnchors(
  rows: readonly ExplorerRow[]
): readonly string[] {
  const out: string[] = []
  for (const r of rows) {
    if (r.type === "file") out.push(r.href)
    else {
      if (r.folderHref) out.push(r.folderHref)
      for (const c of r.children) out.push(c.href)
    }
  }
  return out
}

/** Precomputed anchors for `#about` … `#contact` ordering. */
export const EXPLORER_SCROLL_ANCHORS = explorerScrollAnchors(EXPLORER_TREE)

export type ExperienceItem = {
  id: string
  company: string
  /** Company mark (LinkedIn CDN or other hosted logo). */
  logoUrl: string
  role: string
  period: string
  location: string
  highlights: readonly string[]
}

/** LinkedIn company logos — replace if links expire. */
export const COMPANY_LOGOS = {
  kait: "https://media.licdn.com/dms/image/v2/D4D0BAQG_bfnygy13cA/company-logo_200_200/company-logo_200_200/0/1720952926467/kait_inc_logo?e=1779321600&v=beta&t=jNTPzDccDd6nHbJaEvQyCe1JtRpvkSrhm5Tq4f3opZE",
  oneZillion:
    "https://media.licdn.com/dms/image/v2/C4D0BAQEE13u_Hn0Xmg/company-logo_200_200/company-logo_200_200/0/1630551478337?e=1779321600&v=beta&t=tGFJ4Vn9msgYxfMd3uMgtKKYinRbBX4k7fTtleT5PqA",
  vasmob:
    "https://media.licdn.com/dms/image/v2/C4D0BAQES809Q5Au32g/company-logo_200_200/company-logo_200_200/0/1630528930643/vasmob_logo?e=1779321600&v=beta&t=i03JLzKpgsbtXL4REworAjihEpiAC5pYICDngMYvitU",
} as const

export const EXPERIENCES: readonly ExperienceItem[] = [
  {
    id: "kait",
    logoUrl: COMPANY_LOGOS.kait,
    company: "Knowledge AI — KAIT",
    role: "Senior Software Engineer",
    period: "2020 — 2022",
    location: "Boston · Remote",
    highlights: [
      "Architected, built, and maintained React and React Native apps with a focus on clarity and long-term maintainability.",
      "Led and mentored engineers; improved collaboration, alignment, and predictable delivery.",
      "Integrated custom native SDKs via native modules on iOS and Android.",
      "Shipped production releases to the Apple App Store and Google Play.",
      "Worked in Agile rituals—sprints, stand-ups, and continuous improvement.",
    ],
  },
  {
    id: "1zillion",
    logoUrl: COMPANY_LOGOS.oneZillion,
    company: "1Zillion",
    role: "Senior Software Engineer",
    period: "2019 — 2020",
    location: "Jordan",
    highlights: [
      "Built e-commerce mobile apps with React and React Native tailored to business needs.",
      "Implemented secure authentication patterns for sensitive user and payment flows.",
      "Delivered polished UX with purposeful motion and performance-aware UI.",
      "Integrated third-party APIs and payments: Stripe, Tabby, Tamara, Amazon, Apple Pay, and Google Pay.",
      "Added analytics and deep linking (Branch, Firebase, Instabug, WebEngage).",
    ],
  },
  {
    id: "vasmob",
    logoUrl: COMPANY_LOGOS.vasmob,
    company: "VASMob",
    role: "Software Engineer",
    period: "2017 — 2019",
    location: "Jordan",
    highlights: [
      "Shipped fintech and e-commerce apps with wallet-style experiences using React and React Native.",
      "Integrated external APIs following strict specs and resilient error handling.",
      "Owned releases on iOS and Android, including versioning and coordinated force updates.",
      "Partnered with clients on requirements, estimates, sprint planning, and demos.",
      "Led task breakdown and ensured estimates and outcomes matched stakeholder expectations.",
    ],
  },
] as const

export type EducationItem = {
  school: string
  degree: string
  period: string
  detail?: string
}

export const EDUCATION: readonly EducationItem[] = [
  {
    school: "Maharishi International University",
    degree: "Master of Science in Computer Science",
    period: "Expected completion: December 2024",
    detail: "Fairfield, Iowa",
  },
  {
    school: "Balqa’ Applied University",
    degree: "Bachelor in Software Engineering",
    period: "August 2013 — August 2017",
    detail: "Jordan — GPA 3.1",
  },
] as const

export type RecommendationItem = {
  author: string
  /** Context under the name (role, company, etc.). */
  roleLine?: string
  /** Short excerpt; phrasing mostly from their words. Wrap key phrases as `**like this**` for accent styling. */
  quote: string
  /** LinkedIn-style profile photo when available. */
  avatarSrc?: string
  /** Optional link to the recommender’s profile. */
  linkedInHref?: string
}

export const RECOMMENDATIONS: readonly RecommendationItem[] = [
  {
    author: "Omar Dweik",
    roleLine: "Co-founder of bith.ai",
    avatarSrc:
      "https://media.licdn.com/dms/image/v2/D4E03AQE_fmmneUY2Rw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1681829227322?e=1779321600&v=beta&t=ZhC4-5Ic26W9nU4j4-yXRM2LaUwnaAe77GutLjhg6uM",
    quote:
      "Baraa is by far one of the most **professional** individuals I have come across in my career; his **programming skills**, **acumen**, and **leadership** set him apart. On mobile and web-based projects he constantly **delivered above expectations**—not afraid to **roll up his sleeves**—an **exceptional talent** adding **tremendous value**.",
  },
  {
    author: "Jafar Al-Badarneh",
    avatarSrc:
      "https://media.licdn.com/dms/image/v2/D4D03AQGOYSttQcFl_w/profile-displayphoto-scale_100_100/B4DZyXKc5ZIYAc-/0/1772062633986?e=1779321600&v=beta&t=-_YKtPX81zJeiRH8N6KgfyRM8k5qCY8kzl6ThPL6qY0",
    quote:
      "I’ve managed to work with baraa since he knew almost nothing about developing mobile apps—his learning curve is **insanely exponential**. We have managed to publish plenty of **killing apps**. When looking for a front-end react/react-native engineer, **this guy is your win**.",
  },
  {
    author: "Omar Rida",
    avatarSrc:
      "https://media.licdn.com/dms/image/v2/C4D03AQH94hJE1kdSjg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1567987249919?e=1779321600&v=beta&t=oy2ekOfMHdMIJEc9dPT0UyG727qxai5CtWWPXAE3AZQ",
    quote:
      "Working with Baraa is **a blast**—by far, the **best JS developer** I've ever worked with and a **clutch team player**—his performance during **crunch-time** is **incredible**, and he holds himself to **a very high standard** in the quality of his work. **Leading development** in **React and React Native** at Audiogram, **single-handedly** grew an app to **200K installs**—a **unicorn in the startup world**, and **any organization would be lucky to have him**.",
  },
  {
    author: "Khaled Daqqaq",
    linkedInHref: "https://www.linkedin.com/in/khaled-daqqaq-a72a9b146/",
    quote:
      "**Talented**, **hard worker**—among the **best developers** in Jordan—with **solid problem solving** and **technical skills**. He **designed everything** for our application: **consumer app**, **operation dashboard**, and **employees application**.",
  },
] as const

/** Icons: Simple Icons slugs (`source: simpleicon`) or direct SVG/PNG URLs. */
export type SkillIconSpec =
  | { source: "simpleicon"; slug: string }
  | { source: "url"; href: string }

export type SkillBadgeItem = {
  name: string
  icon: SkillIconSpec
}

export type SkillGroup = {
  title: string
  items: readonly SkillBadgeItem[]
}

/** Three groups — stacked vertically; chips render in two rows per group, one shared horizontal scroll. */
export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: "Languages & frameworks",
    items: [
      {
        name: "JavaScript",
        icon: { source: "simpleicon", slug: "javascript" },
      },
      {
        name: "TypeScript",
        icon: { source: "simpleicon", slug: "typescript" },
      },
      { name: "Python", icon: { source: "simpleicon", slug: "python" } },
      { name: "Dart", icon: { source: "simpleicon", slug: "dart" } },
      { name: "Swift", icon: { source: "simpleicon", slug: "swift" } },
      { name: "Kotlin", icon: { source: "simpleicon", slug: "kotlin" } },
      { name: "Go", icon: { source: "simpleicon", slug: "go" } },
      { name: "React", icon: { source: "simpleicon", slug: "react" } },
      {
        name: "React Native",
        icon: { source: "simpleicon", slug: "expo" },
      },
      { name: "Next.js", icon: { source: "simpleicon", slug: "nextdotjs" } },
      { name: "Remix", icon: { source: "simpleicon", slug: "remix" } },
      { name: "Flutter", icon: { source: "simpleicon", slug: "flutter" } },
      { name: "Deno", icon: { source: "simpleicon", slug: "deno" } },
      { name: "Node.js", icon: { source: "simpleicon", slug: "nodedotjs" } },
      { name: "Express", icon: { source: "simpleicon", slug: "express" } },
      { name: "Angular", icon: { source: "simpleicon", slug: "angular" } },
      {
        name: "Tailwind CSS",
        icon: { source: "simpleicon", slug: "tailwindcss" },
      },
      { name: "Redux", icon: { source: "simpleicon", slug: "redux" } },
      {
        name: "TanStack Query",
        icon: { source: "simpleicon", slug: "reactquery" },
      },
      { name: "Vitest", icon: { source: "simpleicon", slug: "vitest" } },
      { name: "Storybook", icon: { source: "simpleicon", slug: "storybook" } },
      { name: "Zod", icon: { source: "simpleicon", slug: "zod" } },
    ],
  },
  {
    title: "Data, cloud & delivery",
    items: [
      { name: "MySQL", icon: { source: "simpleicon", slug: "mysql" } },
      {
        name: "PostgreSQL",
        icon: { source: "simpleicon", slug: "postgresql" },
      },
      { name: "MongoDB", icon: { source: "simpleicon", slug: "mongodb" } },
      { name: "Redis", icon: { source: "simpleicon", slug: "redis" } },
      { name: "Prisma", icon: { source: "simpleicon", slug: "prisma" } },
      { name: "GraphQL", icon: { source: "simpleicon", slug: "graphql" } },
      { name: "Firebase", icon: { source: "simpleicon", slug: "firebase" } },
      { name: "Supabase", icon: { source: "simpleicon", slug: "supabase" } },
      {
        name: "Elasticsearch",
        icon: { source: "simpleicon", slug: "elasticsearch" },
      },
      { name: "Docker", icon: { source: "simpleicon", slug: "docker" } },
      { name: "Kubernetes", icon: { source: "simpleicon", slug: "kubernetes" } },
      {
        name: "AWS",
        icon: {
          source: "url",
          href: "https://cdn.jsdelivr.net/npm/simple-icons/icons/amazonaws.svg",
        },
      },
      {
        name: "Google Cloud",
        icon: { source: "simpleicon", slug: "googlecloud" },
      },
      { name: "Terraform", icon: { source: "simpleicon", slug: "terraform" } },
      {
        name: "GitHub Actions",
        icon: { source: "simpleicon", slug: "githubactions" },
      },
      { name: "Nginx", icon: { source: "simpleicon", slug: "nginx" } },
    ],
  },
  {
    title: "Engineering practices",
    items: [
      { name: "Git", icon: { source: "simpleicon", slug: "git" } },
      { name: "Agile / Scrum", icon: { source: "simpleicon", slug: "jira" } },
      { name: "HTML", icon: { source: "simpleicon", slug: "html5" } },
      { name: "CSS", icon: { source: "simpleicon", slug: "css" } },
      { name: "Jest", icon: { source: "simpleicon", slug: "jest" } },
      {
        name: "Playwright",
        icon: {
          source: "url",
          href: "https://cdn.jsdelivr.net/npm/simple-icons/icons/playwright.svg",
        },
      },
      { name: "OpenAPI", icon: { source: "simpleicon", slug: "swagger" } },
      { name: "Sentry", icon: { source: "simpleicon", slug: "sentry" } },
      { name: "Stripe", icon: { source: "simpleicon", slug: "stripe" } },
      {
        name: "Problem solving",
        icon: { source: "simpleicon", slug: "leetcode" },
      },
    ],
  },
]

/**
 * Projects: shipped iOS apps from `ios-app-store-catalog.ts` (iTunes Search export),
 * plus standalone web demos below. To add one-off mobile apps, insert objects before
 * `...IOS_APP_STORE_CATALOG_APPS`.
 */
export const PROJECTS: readonly ProjectItem[] = [
  ...IOS_APP_STORE_CATALOG_APPS,
  {
    name: "Next.js 13 dashboard",
    summary: "Personal projects dashboard and patterns demo",
    kind: "web",
    href: "https://github.com/Baraa-bi/Next-13-demo",
  },
  {
    name: "Personal goals tracker",
    summary: "Private productivity tooling",
    kind: "web",
  },
  {
    name: "Typer",
    summary: "Typing practice with Deno Fresh",
    kind: "web",
  },
  {
    name: "Movies",
    summary: "Entertainment catalog and API experiment",
    kind: "web",
  },
]

export type CertificationItem = {
  name: string
  issuer: string
  date: string
  /** Public URL path to issuer / credential badge (e.g. `/certifications/pmi-acp-600px.png`). */
  badgeSrc?: string
  /** Accessible label when `badgeSrc` is present. */
  badgeAlt?: string
  /** ISO-8601 date for semantic `<time>` (optional). */
  issuedAtIso?: string
}

export const CERTIFICATIONS: readonly CertificationItem[] = [
  {
    name: "PMI Agile Certified Practitioner (PMI-ACP)®",
    issuer: "Project Management Institute",
    date: "June 15, 2020",
    badgeSrc: "/certifications/pmi-acp-600px.png",
    badgeAlt:
      "PMI Agile Certified Practitioner® (PMI-ACP®) credential mark logo",
    issuedAtIso: "2020-06-15",
  },
] as const

export type CourseItem = {
  title: string
  author: string
  description: string
  /** Topic mark from Simple Icons — https://simpleicons.org */
  iconSlug: string
}

export const COURSES: readonly CourseItem[] = [
  {
    title: "JavaScript: The New Hard Parts",
    author: "Will Sentance",
    iconSlug: "javascript",
    description:
      "Iterators, generators, promises, and async/await—building intuition for modern JavaScript.",
  },
  {
    title: "Modern React with Redux",
    author: "Stephen Grider",
    iconSlug: "redux",
    description:
      "React, Redux Toolkit, RTK Query, and production-minded patterns.",
  },
  {
    title: "React Performance",
    author: "Steve Kinney",
    iconSlug: "react",
    description:
      "Structuring components, memoization, code splitting, and React 18 concurrency.",
  },
  {
    title: "Introduction to Next.js 13+, v2",
    author: "Scott Moss",
    iconSlug: "nextdotjs",
    description:
      "From marketing sites to full-stack apps with Next.js fundamentals.",
  },
  {
    title: "Build a Fullstack App with Next.js, v2",
    author: "Scott Moss",
    iconSlug: "nextdotjs",
    description:
      "End-to-end project management app covering layouts, middleware, and data flow.",
  },
  {
    title: "Client-Side GraphQL in React",
    author: "Scott Moss",
    iconSlug: "apollographql",
    description:
      "Apollo Client: queries, mutations, variables, and advanced field techniques.",
  },
  {
    title: "Build a Backend REST API with Python & Django — Beginner",
    author: "Mark Winterbottom",
    iconSlug: "django",
    description:
      "Django REST Framework APIs and pragmatic deployment workflows.",
  },
  {
    title: "Deno: The Complete Guide",
    author: "Adam & Andrei",
    iconSlug: "deno",
    description:
      "Production Deno architecture, tooling, and real-world backends.",
  },
  {
    title: "The Complete React Native + Hooks Course",
    author: "Stephen Grider",
    iconSlug: "expo",
    description:
      "Hooks, Context, navigation, and ship-ready mobile foundations.",
  },
  {
    title: "React Native: Advanced Concepts",
    author: "Stephen Grider",
    iconSlug: "expo",
    description: "Animations, maps, notifications, and advanced navigation.",
  },
  {
    title: "MongoDB for Developers (v3.2)",
    author: "MongoDB University",
    iconSlug: "mongodb",
    description: "Data modeling and application integration with MongoDB.",
  },
]

export const CONTACT = {
  headline: "Let’s build something reliable and human-centered.",
  body: "Senior IC, tech lead, or scoped freelance.",
  email: "baraabilal8@gmail.com",
} as const
