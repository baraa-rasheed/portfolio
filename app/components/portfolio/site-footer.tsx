"use client"

import * as React from "react"
import { ArrowUpRightIcon, Send } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { CONTACT, SOCIAL_LINKS } from "~/constants/portfolio"
import { SocialBrandIcon } from "~/lib/social-brand-icon"
import { cn } from "~/lib/utils"

import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"
import { WorkbenchScrollFrame } from "./workbench-scroll-frame"

export function SiteFooter() {
  const formId = React.useId()
  const nameId = `${formId}-name`
  const emailId = `${formId}-email`
  const messageId = `${formId}-message`

  const hasEmail = CONTACT.email.trim().length > 0
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "opened">("idle")
  const [errorHint, setErrorHint] = React.useState<string | null>(null)

  const submitMailto = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setErrorHint(null)

      const trimmedName = name.trim()
      const trimmedEmail = email.trim()
      const trimmedMessage = message.trim()

      if (!trimmedName) {
        setErrorHint("Please add your name.")
        return
      }
      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        setErrorHint("Please add a valid email address.")
        return
      }
      if (!trimmedMessage) {
        setErrorHint("Please write a short message.")
        return
      }

      if (!hasEmail) {
        setErrorHint("Contact email is not configured.")
        return
      }

      setErrorHint(null)

      const subject = encodeURIComponent(
        `[Portfolio] Message from ${trimmedName}`
      )
      const body = encodeURIComponent(
        `${trimmedMessage}\n\n— ${trimmedName}\n${trimmedEmail}`
      )

      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
      setStatus("opened")

      window.setTimeout(() => setStatus("idle"), 2500)
    },
    [email, hasEmail, message, name]
  )

  return (
    <WorkbenchScrollFrame
      id="contact"
      as="footer"
      accessibleTitleId="contact-heading"
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:py-10",
          // Stretch to the full height of the section pane and vertically
          // center the content so the form sits in the middle instead of
          // being pinned to the top with empty space below.
          "min-h-full lg:justify-center"
        )}
      >
        <ScrollReveal className="space-y-6 sm:space-y-8">
          <SectionHeading
            eyebrow="Contact"
            headingId="contact-heading"
            title={CONTACT.headline}
            description={CONTACT.body}
          />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-14">
            <form
              onSubmit={submitMailto}
              className="flex min-w-0 flex-1 flex-col gap-4"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor={nameId} className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id={nameId}
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    aria-required="true"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor={emailId} className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor={messageId} className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id={messageId}
                  name="message"
                  placeholder="Role, stack, timeline, links…"
                  rows={5}
                  className="min-h-[7rem] max-h-[min(240px,32vh)] resize-y text-[15px] leading-relaxed sm:max-h-[min(260px,36vh)]"
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                  aria-required="true"
                />
              </div>

              {errorHint ? (
                <p className="text-sm font-medium text-destructive" role="alert">
                  {errorHint}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  type="submit"
                  size="lg"
                  className={cn(
                    // Override the default size so the primary CTA carries
                    // real weight on the contact page.
                    "h-12 gap-2.5 px-7 text-[15px] font-semibold",
                    "shadow-[0_18px_40px_-22px_oklch(0.55_0.18_265_/_0.7)]",
                    "transition-all hover:-translate-y-0.5",
                    "hover:shadow-[0_24px_50px_-20px_oklch(0.55_0.2_265_/_0.85)]",
                    "dark:shadow-[0_22px_50px_-22px_oklch(0.62_0.22_270_/_0.65)]"
                  )}
                  disabled={!hasEmail}
                >
                  <Send className="size-[18px] shrink-0" aria-hidden />
                  Send via email
                </Button>
                {hasEmail ? (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 px-5 text-[15px]"
                  >
                    <a href={`mailto:${CONTACT.email}`}>Quick mailto</a>
                  </Button>
                ) : null}
              </div>

              <p className="text-xs text-muted-foreground">
                Opens your mail client — nothing stored here.
              </p>

              <p className="sr-only" aria-live="polite">
                {status === "opened"
                  ? "Opening your email client with your message."
                  : ""}
              </p>
            </form>

            <aside className="flex w-full shrink-0 flex-col gap-3 lg:w-56 xl:w-60">
              <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Profiles & links
              </p>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-auto justify-between gap-2 py-2.5 text-left font-normal"
                    )}
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                        <SocialBrandIcon brand={link.brand} className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-medium leading-tight">
                          {link.label}
                        </span>
                        <span className="block truncate text-[10px] text-muted-foreground">
                          {link.short}
                        </span>
                      </span>
                      <ArrowUpRightIcon className="size-3.5 shrink-0 opacity-60" />
                    </a>
                  </Button>
                ))}
              </div>
            </aside>
          </div>
        </ScrollReveal>
      </div>
    </WorkbenchScrollFrame>
  )
}
