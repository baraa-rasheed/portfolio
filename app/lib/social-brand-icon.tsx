import { GlobeIcon } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import { SiGithub, SiX } from "react-icons/si"

import type { SocialBrand } from "~/constants/portfolio"
import { cn } from "~/lib/utils"

export function SocialBrandIcon({
  brand,
  className,
}: {
  brand: SocialBrand
  className?: string
}) {
  const s = cn("size-[1.125rem] sm:size-5", className)
  switch (brand) {
    case "linkedin":
      return <FaLinkedin className={s} aria-hidden />
    case "x":
      return <SiX className={s} aria-hidden />
    case "github":
      return <SiGithub className={s} aria-hidden />
    case "web":
      return <GlobeIcon className={s} aria-hidden />
  }
}
