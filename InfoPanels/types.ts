import type { ReactNode } from 'react'
import type { ColorVariant } from '@/lib/color-mapping'
import type { CustomHeaderProps } from '@/components/ui/CustomHeader'

export type Variant =
  | 'grid'
  | 'grid-2'
  | 'grid-3'
  | 'grid-4'
  | 'grid-5'
  | 'tabs'
  | 'timeline'
  | 'timeline-2'
  | 'horizontal-step'
  | 'hub'
  | 'stepper'

export type Item = {
  icon?: string
  title: string
  metric?: ReactNode
  desc: string
  img?: string
  colorVariant?: ColorVariant // Variant de couleur spécifique à cet item
  button?: {
    text: string
    href?: string
    onClick?: () => void
    variant?: 'default' | 'secondary' | 'outline'
  }
}

export type InfoPanelsProps = {
  // Content
  header: CustomHeaderProps
  variant: Variant
  items: Item[]

  // Styles - système unifié
  colorVariant?: ColorVariant // Système de variants (default par défaut)
  badgeClassName?: string
  cardClassName?: string
  gridClassName?: string
}
