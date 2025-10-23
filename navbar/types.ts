import type { ReactNode } from 'react'
import type { ColorVariant } from '@/lib/color-mapping'

export type NavbarVariant =
  | 'base' // Navbar complet avec dropdowns et CTA
  | 'minimal' // Version simplifiée sans dropdowns
  | 'centered' // Navigation centrée

// Lien simple de navigation
export type NavLink = {
  name: string
  href: string
  icon?: string
  badge?: string // Badge optionnel (ex: "Nouveau")
  external?: boolean
}

// Section de navigation avec sous-pages (dropdown)
export type NavSection = {
  label: string
  href: string // Lien principal de la section
  items: NavLink[] // Sous-pages dans le dropdown
  icon?: string
  description?: string // Description affichée dans le dropdown
}

// Configuration du logo
export type LogoConfig = {
  lightSrc: string
  darkSrc: string
  alt: string
  width?: number
  height?: number
  href?: string // Par défaut "/"
}

// Bouton CTA (Call-to-Action)
export type CTAButton = {
  text: string
  href: string
  variant?: 'default' | 'outline' | 'ghost'
  icon?: string
  colorVariant?: ColorVariant
}

export type NavbarProps = {
  // Variante
  variant: NavbarVariant

  // Logo
  logo: LogoConfig

  // Navigation principale (liens simples)
  links?: NavLink[]

  // Sections avec dropdowns
  sections?: NavSection[]

  // Bouton CTA
  cta?: CTAButton

  // Options
  showThemeToggle?: boolean // Afficher le toggle dark/light mode
  sticky?: boolean // Navbar collante en haut
  transparent?: boolean // Background transparent (pour hero)

  // Styles
  colorVariant?: ColorVariant
  className?: string
}
