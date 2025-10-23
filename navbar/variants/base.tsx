"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Icon } from "@/components/ui/icon"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import { useTheme } from "next-themes"

import type { NavbarProps, NavSection, NavLink } from "../types"

export default function BaseVariant({
  logo,
  links = [],
  sections = [],
  cta,
  showThemeToggle = true,
  sticky = true,
  transparent = false,
  colorVariant,
  className,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null)
  const pathname = usePathname()
  const colors = colorClasses(colorVariant ?? "neutral")
  const ctaColors = colorClasses(cta?.colorVariant ?? "brand")
  const { theme } = useTheme()

  // Classes de base pour les liens
  const baseLinkClasses =
    "text-sm font-semibold p-2 rounded leading-6 transition-colors " +
    "hover:bg-muted hover:text-foreground"

  // Classes selon pathname actif
  const getLinkClasses = (href: string) =>
    cn(
      baseLinkClasses,
      pathname === href || pathname.startsWith(href + "/")
        ? cn("text-foreground", colors.text)
        : "text-muted-foreground"
    )

  // Toggle section mobile
  const toggleMobileSection = (label: string) => {
    setOpenMobileSection(openMobileSection === label ? null : label)
  }

  return (
    <header
      className={cn(
        "z-50 w-full border-b",
        sticky && "sticky top-0",
        transparent
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href={logo.href || "/"} className="-m-1.5 flex items-center">
            <Image
              src={theme === "dark" ? logo["darkSrc"] : logo["lightSrc"]}
              alt={logo.alt}
              width={logo.width || 80}
              height={logo.height || 50}
            />
          </Link>
        </div>

        {/* Mobile: Theme Toggle + Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          {showThemeToggle && <ThemeToggle />}
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Icon name="Menu" className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8 h-10 items-center">
          {/* Liens simples */}
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={getLinkClasses(link.href)}
            >
              <span className="flex items-center gap-2">
                {link.icon && <Icon name={link.icon} className="h-4 w-4" />}
                {link.name}
                {link.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {link.badge}
                  </Badge>
                )}
                {link.external && <Icon name="ExternalLink" className="h-3 w-3 opacity-50" />}
              </span>
            </Link>
          ))}

          {/* Sections avec dropdown */}
          {sections.map((section) => (
            <DropdownMenu key={section.label}>
              <DropdownMenuTrigger
                className={cn(
                  getLinkClasses(section.href),
                  "flex items-center gap-1"
                )}
              >
                {section.icon && <Icon name={section.icon} className="h-4 w-4" />}
                {section.label}
                <Icon name="ChevronDown" className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {section.description && (
                  <div className="px-2 py-1.5 text-xs text-muted-foreground border-b mb-1">
                    {section.description}
                  </div>
                )}
                {section.items.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 cursor-pointer",
                        pathname === item.href && cn("text-foreground", colors.text)
                      )}
                    >
                      {item.icon && <Icon name={item.icon} className="h-4 w-4" />}
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* Desktop: Theme Toggle + CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-4">
          {showThemeToggle && <ThemeToggle />}
          {cta && (
            <Button
              asChild
              variant={cta.variant || "default"}
              className={cn(
                "transition-all duration-300",
                cta.variant === "default" && cn(
                  "bg-gradient-to-r",
                  ctaColors.accent,
                  "hover:opacity-90"
                )
              )}
            >
              <Link href={cta.href}>
                {cta.icon && <Icon name={cta.icon} className="mr-2 h-4 w-4" />}
                {cta.text}
              </Link>
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l bg-background px-6 py-6 shadow-2xl sm:max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link
                href={logo.href || "/"}
                className="-m-1.5 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src={theme === "dark" ? logo["darkSrc"] : logo["lightSrc"]}
                  alt={logo.alt}
                  width="50"
                  height="50"
                />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <Icon name="X" className="h-6 w-6" />
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {/* Liens simples */}
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors hover:bg-muted",
                        pathname === link.href
                          ? cn("text-foreground", colors.text)
                          : "text-muted-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.icon && <Icon name={link.icon} className="h-5 w-5" />}
                      <span className="flex-1">{link.name}</span>
                      {link.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {link.badge}
                        </Badge>
                      )}
                      {link.external && <Icon name="ExternalLink" className="h-4 w-4 opacity-50" />}
                    </Link>
                  ))}

                  {/* Sections avec sous-menus */}
                  {sections.map((section) => (
                    <div key={section.label} className="space-y-1">
                      {/* Bouton section */}
                      <button
                        onClick={() => toggleMobileSection(section.label)}
                        className={cn(
                          "w-full flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors hover:bg-muted",
                          (pathname === section.href || pathname.startsWith(section.href + "/"))
                            ? cn("text-foreground", colors.text)
                            : "text-muted-foreground"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {section.icon && <Icon name={section.icon} className="h-5 w-5" />}
                          {section.label}
                        </span>
                        <Icon
                          name="ChevronDown"
                          className={cn(
                            "h-5 w-5 transition-transform",
                            openMobileSection === section.label && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Sous-pages */}
                      {openMobileSection === section.label && (
                        <div className="space-y-1 pl-4">
                          {section.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={cn(
                                "-mx-3 flex items-center gap-2 rounded-lg px-6 py-2 text-sm leading-7 transition-colors hover:bg-muted",
                                pathname === item.href
                                  ? cn("text-foreground", colors.text)
                                  : "text-muted-foreground"
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.icon && <Icon name={item.icon} className="h-4 w-4" />}
                              <span className="flex-1">{item.name}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                {cta && (
                  <div className="py-6">
                    <Button
                      asChild
                      variant={cta.variant || "default"}
                      className={cn(
                        "w-full transition-all duration-300",
                        cta.variant === "default" && cn(
                          "bg-gradient-to-r",
                          ctaColors.accent,
                          "hover:opacity-90"
                        )
                      )}
                    >
                      <Link href={cta.href} onClick={() => setMobileMenuOpen(false)}>
                        {cta.icon && <Icon name={cta.icon} className="mr-2 h-4 w-4" />}
                        {cta.text}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}