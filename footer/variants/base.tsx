"use client"

import { useState, FormEvent } from "react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icon } from "@/components/ui/icon"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { FooterProps } from "../types"

export default function BaseVariant({
  columns = [],
  newsletter,
  copyright,
  colorVariant,
  className,
  showDivider = true,
  layout = "default",
}: FooterProps) {
  const colors = colorClasses(colorVariant ?? "neutral")
  const newsletterColors = colorClasses(newsletter?.colorVariant ?? colorVariant ?? "brand")

  // État newsletter
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Gestion soumission newsletter
  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || isSubmitting) return

    setIsSubmitting(true)
    setShowSuccess(false)

    try {
      await newsletter?.onSubmit?.(email)
      setShowSuccess(true)
      setEmail("")

      // Cache le message de succès après 5s
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error("Newsletter subscription error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Classes de layout
  const isCompact = layout === "compact"
  const spacingClasses = isCompact ? "py-8 sm:py-12" : "py-12 sm:py-16 lg:py-20"

  return (
    <footer className={cn(
      "relative border-t border-border bg-muted/30",
      className
    )}>
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", spacingClasses)}>

        {/* Newsletter Section (optionnelle) */}
        {newsletter?.enabled && (
          <ScrollAnimation animation="slideInUp">
            <div className={cn(
              "mb-12 sm:mb-16 rounded-2xl p-6 sm:p-8 lg:p-10",
              newsletterColors.card
            )}>
              <div className="mx-auto max-w-2xl text-center">
                {/* Titre */}
                {newsletter.title && (
                  <h3 className={cn(
                    "mb-3 text-2xl sm:text-3xl font-bold",
                    newsletterColors.textContentGradient
                  )}>
                    {newsletter.title}
                  </h3>
                )}

                {/* Description */}
                {newsletter.description && (
                  <p className="mb-6 text-sm sm:text-base text-muted-foreground">
                    {newsletter.description}
                  </p>
                )}

                {/* Formulaire */}
                {!showSuccess ? (
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-2"
                  >
                    <Input
                      type="email"
                      placeholder={newsletter.placeholder || "votre@email.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className={cn(
                        "transition-all duration-300",
                        newsletterColors.accent,
                        "hover:opacity-90"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        <>
                          {newsletter.buttonText || "S'inscrire"}
                          <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className={cn(
                    "rounded-lg p-4 text-sm flex items-center justify-center gap-2",
                    colorClasses("success").card
                  )}>
                    <Icon name="CheckCircle" className="h-4 w-4" />
                    <span>
                      {newsletter.successMessage || "Merci pour votre inscription !"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimation>
        )}

        {/* Colonnes de navigation (si présentes) */}
        {columns.length > 0 && (
          <ScrollAnimation animation="slideInUp" delay={0.1}>
            <div className={cn(
              "grid gap-8 sm:gap-12",
              columns.length === 1 && "grid-cols-1",
              columns.length === 2 && "grid-cols-1 sm:grid-cols-2",
              columns.length === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
              !isCompact && "mb-12 sm:mb-16"
            )}>
              {columns.map((column, index) => (
                <div key={column.title + index}>
                  {/* Titre de colonne */}
                  <h4 className={cn(
                    "mb-4 text-sm font-semibold uppercase tracking-wider",
                    colors.text
                  )}>
                    {column.title}
                  </h4>

                  {/* Description optionnelle */}
                  {column.description && (
                    <p className="mb-4 text-sm text-muted-foreground">
                      {column.description}
                    </p>
                  )}

                  {/* Liste de liens */}
                  <ul className="space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <li key={link.label + linkIndex}>
                        <a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className={cn(
                            "group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors",
                            "hover:text-foreground"
                          )}
                        >
                          {link.icon && (
                            <Icon
                              name={link.icon}
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            />
                          )}
                          <span>{link.label}</span>
                          {link.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {link.badge}
                            </Badge>
                          )}
                          {link.external && (
                            <Icon
                              name="ExternalLink"
                              className="h-3 w-3 opacity-50"
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        )}

        {/* Divider */}
        {showDivider && (columns.length > 0 || newsletter?.enabled) && (
          <ScrollAnimation animation="fadeIn" delay={0.15}>
            <hr className="border-t border-border mt-6" />
          </ScrollAnimation>
        )}

        {/* Copyright Section */}
        <ScrollAnimation animation="slideInUp" delay={0.2}>
          <div className={cn(
            "flex flex-col gap-6 sm:gap-8",
            showDivider && (columns.length > 0 || newsletter?.enabled) && "pt-2"
          )}>

            {/* Logo + Réseaux sociaux */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Logo */}
              {copyright.logo && (
                <div className="flex-shrink-0">
                  <Image
                    src={copyright.logo}
                    alt={copyright.logoAlt || "Logo"}
                    width={120}
                    height={40}
                    className="h-8 sm:h-10 w-auto"
                  />
                </div>
              )}

              {/* Réseaux sociaux */}
              {copyright.socials && copyright.socials.length > 0 && (
                <div className="flex items-center gap-3">
                  {copyright.socials.map((social, index) => (
                    <a
                      key={social.label + index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
                        "hover:bg-muted hover:scale-110",
                        colors.hover
                      )}
                      aria-label={social.label}
                    >
                      <Icon name={social.icon || "Link"} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            {/* Copyright text + liens légaux */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              {/* Texte copyright */}
              <p>{copyright.text}</p>

              {/* Liens légaux */}
              {copyright.links && copyright.links.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  {copyright.links.map((link, index) => (
                    <a
                      key={link.label + index}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  )
}