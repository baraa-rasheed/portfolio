import { cn } from "~/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
  /** Sets `id` on the `<h2>` for `aria-labelledby` on the enclosing region. */
  headingId?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  headingId,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-3",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={headingId}
        className="font-heading text-3xl tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="min-w-0 truncate text-base text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
