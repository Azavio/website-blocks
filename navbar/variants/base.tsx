'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Menu } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'

import type { NavbarProps } from '../types'

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
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null,
  )
  const pathname = usePathname()
  const colors = colorClasses(colorVariant ?? 'neutral')
  const ctaColors = colorClasses(cta?.colorVariant ?? 'brand')

  // Classes de base pour les liens
  const baseLinkClasses =
    'text-sm font-semibold p-2 rounded leading-6 transition-colors ' +
    'hover:bg-muted hover:text-foreground'

  // Classes selon pathname actif
  const getLinkClasses = (href: string) =>
    cn(
      baseLinkClasses,
      pathname === href || pathname.startsWith(href + '/')
        ? cn('text-foreground', colors.text)
        : 'text-muted-foreground',
    )

  // Toggle section mobile
  const toggleMobileSection = (label: string) => {
    setOpenMobileSection(openMobileSection === label ? null : label)
  }

  return (
    <header
      className={cn(
        'z-50 w-full border-b',
        sticky && 'sticky top-0',
        transparent
          ? 'bg-transparent'
          : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className,
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href={logo.href || '/'} className="-m-1.5 flex items-center">
            <img
              src={logo.darkSrc}
              alt={logo.alt}
              width={logo.width || 80}
              height={logo.height || 50}
              className="h-8 w-auto hidden dark:block"
            />
            <img
              src={logo.lightSrc}
              alt={logo.alt}
              width={logo.width || 80}
              height={logo.height || 50}
              className="h-8 w-auto dark:hidden block"
            />
          </Link>
        </div>

        {/* Mobile: Theme Toggle + Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {showThemeToggle && <ThemeToggle />}
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden h-10 items-center lg:flex lg:gap-x-8">
          {/* Liens simples */}
          {links.map(link => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
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
                {link.external && (
                  <Icon name="ExternalLink" className="h-3 w-3 opacity-50" />
                )}
              </span>
            </Link>
          ))}

          {/* Sections avec dropdown */}
          {sections.map(section => (
            <DropdownMenu key={section.label}>
              <DropdownMenuTrigger
                className={cn(
                  getLinkClasses(section.href),
                  'flex items-center gap-1',
                )}
              >
                {section.icon && (
                  <Icon name={section.icon} className="h-4 w-4" />
                )}
                {section.label}
                <Icon name="ChevronDown" className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {section.description && (
                  <div className="mb-1 border-b px-2 py-1.5 text-xs text-muted-foreground">
                    {section.description}
                  </div>
                )}
                {section.items.map(item => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex cursor-pointer items-center gap-2',
                        pathname === item.href &&
                        cn('text-foreground', colors.text),
                      )}
                    >
                      {item.icon && (
                        <Icon name={item.icon} className="h-4 w-4" />
                      )}
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
              variant={cta.variant || 'default'}
              className={cn(
                'transition-all duration-300',
                cta.variant === 'default' &&
                cn('bg-gradient-to-r', ctaColors.accent, 'hover:opacity-90'),
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
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full bg-background shadow-2xl sm:max-w-sm">
            {/* Header fixe en haut */}
            <div className="flex items-center justify-between border-b p-6">
              <Link
                href={logo.href || '/'}
                className="-m-1.5 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img
                  src={logo.darkSrc}
                  alt={logo.alt}
                  className="h-8 w-auto hidden dark:block"
                />
                <img
                  src={logo.lightSrc}
                  alt={logo.alt}
                  className="h-8 w-auto dark:hidden block"
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

            {/* Zone scrollable avec les liens */}
            <div className="h-[calc(100vh-80px)] bg-background overflow-y-auto px-4 py-6">
              <div className="space-y-1">
                {/* Liens simples */}
                {links.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
                      pathname === link.href
                        ? 'bg-gradient-to-r from-accent/30 to-accent/10 text-foreground font-semibold shadow-sm scale-[0.98]'
                        : 'text-foreground/70 hover:text-brand hover:bg-accent/10 hover:translate-x-1',
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.icon && (
                      <Icon
                        name={link.icon}
                        className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          pathname !== link.href && "group-hover:scale-110"
                        )}
                      />
                    )}
                    <span className="flex-1">{link.name}</span>
                    {link.badge && (
                      <Badge variant="secondary" className="text-xs font-semibold">
                        {link.badge}
                      </Badge>
                    )}
                    {link.external && (
                      <Icon name="ExternalLink" className="h-4 w-4 opacity-40 group-hover:opacity-70 transition-opacity" />
                    )}
                  </Link>
                ))}

                {/* Sections avec sous-menus */}
                {sections.map(section => (
                  <div key={section.label} className="space-y-1">
                    <button
                      onClick={() => toggleMobileSection(section.label)}
                      className={cn(
                        'group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
                        pathname === section.href || pathname.startsWith(section.href + '/')
                          ? 'bg-gradient-to-r from-accent/30 to-accent/10 text-foreground font-semibold shadow-sm'
                          : 'text-foreground/70 hover:text-foreground hover:bg-accent/10 hover:translate-x-1',
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {section.icon && (
                          <Icon
                            name={section.icon}
                            className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              pathname !== section.href && "group-hover:scale-110"
                            )}
                          />
                        )}
                        {section.label}
                      </span>
                      <Icon
                        name="ChevronDown"
                        className={cn(
                          'h-5 w-5 transition-all duration-300 ease-out',
                          openMobileSection === section.label && 'rotate-180 text-accent',
                        )}
                      />
                    </button>

                    {openMobileSection === section.label && (
                      <div className="space-y-1 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                        {section.items.map(item => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              'group flex items-center gap-3 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium transition-all duration-200',
                              pathname === item.href
                                ? 'bg-accent/20 text-foreground font-semibold'
                                : 'text-foreground/60 hover:text-foreground hover:bg-accent/10 hover:pl-12',
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.icon && (
                              <Icon
                                name={item.icon}
                                className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                              />
                            )}
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
                <div className="mt-8 sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-4 pb-2">
                  <Button
                    asChild
                    variant={cta.variant || 'default'}
                    size="lg"
                    className={cn(
                      'w-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
                      cta.variant === 'default' &&
                      cn(ctaColors.accent, 'hover:opacity-90'),
                    )}
                  >
                    <Link href={cta.href} onClick={() => setMobileMenuOpen(false)}>
                      {cta.icon && <Icon name={cta.icon} className="mr-2 h-5 w-5" />}
                      <span className="font-semibold">{cta.text}</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
