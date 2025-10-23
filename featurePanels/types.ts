import type { ReactNode } from 'react'
import type { ColorVariant } from '@/lib/color-mapping'
import type { CustomHeaderProps } from '@/components/ui/CustomHeader'

export type Variant = 'expertise-cards'

export type FeatureItem = {
  text: string
  icon?: string // Icône optionnelle devant chaque feature
}

export type CardButton = {
  text: string
  href?: string
  onClick?: () => void
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  icon?: string // Icône optionnelle dans le bouton
}

export type FeatureCard = {
  // Identité visuelle
  icon?: string
  title: string
  desc: string
  colorVariant?: ColorVariant // Couleur spécifique de la card
  listIcon?: string
  listColorVariant?: ColorVariant // Couleur des icones listées

  // Contenu structuré
  features: (string | FeatureItem)[] // Liste à puces

  // Actions (CTA)
  buttons?: {
    primary?: CardButton
    secondary?: CardButton
  }

  // Optionnel
  badge?: string
  metric?: ReactNode
  img?: string
}

export type FeaturePanelsProps = {
  // Content
  header: CustomHeaderProps
  variant: Variant
  cards: FeatureCard[]

  // Styles - système unifié
  colorVariant?: ColorVariant // Couleur globale par défaut
  className?: string
  cardClassName?: string

  // Options d'affichage
  showBorder?: boolean
  responsive?: boolean
}
