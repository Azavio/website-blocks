'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { InfoPanelsProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function GridVariant({
  header,
  items,
  colorVariant,
  cardClassName,
  gridClassName = 'grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8',
  badgeClassName,
}: InfoPanelsProps) {
  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? 'neutral')

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      <div className={gridClassName}>
        {items.map((item, index) => {
          // Priorité : item.colorVariant > colorVariant global > neutral
          const colors = colorClasses(item.colorVariant ?? colorVariant ?? '')

          return (
            <ScrollAnimation
              key={item.title + index}
              animation="slideInUp"
              delay={index * 0.1}
            >
              <Card
                className={cn(
                  'group relative h-full overflow-hidden transition-all duration-500',
                  'motion-safe:hover:-translate-y-1 sm:motion-safe:hover:-translate-y-2',
                  'hover:shadow-xl sm:hover:shadow-2xl',
                  cardClassName,
                  colors.hover, // ex: hover:border-*
                  colors.card, // fond + border de base
                  colors.cardBgHover, // hover de fond
                )}
              >
                <CardContent className="relative flex h-full flex-col p-4 text-center sm:p-6 lg:p-8">
                  {/* Icône */}
                  {item.icon && (
                    <div className="mb-3 flex flex-shrink-0 justify-center sm:mb-4">
                      <Icon
                        size="39"
                        name={item.icon}
                        className={cn(
                          'text-3xl transition-all duration-300 sm:text-4xl lg:text-5xl',
                          'motion-safe:group-hover:scale-110',
                          colors.text,
                          colors.hoverTextColor,
                        )}
                      />
                    </div>
                  )}

                  {/* Badge métrique */}
                  {item.metric && (
                    <Badge
                      className={cn(
                        'mb-3 self-center border text-xs transition-all duration-300 sm:mb-4 sm:text-sm',
                        colors.badge,
                        colors.badgeHover,
                        badgeClassName,
                      )}
                    >
                      {item.metric}
                    </Badge>
                  )}

                  {/* Titre */}
                  <h3
                    className={cn(
                      'mb-2 text-lg font-bold leading-tight transition-all duration-300 sm:mb-3 sm:text-xl',
                      colors.textContentGradient,
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.desc && (
                    <p
                      className={cn(
                        'mb-4 flex-grow text-sm leading-relaxed transition-all duration-300 sm:text-base',
                        'text-muted-foreground',
                        colors.hoverTextColor,
                      )}
                    >
                      {item.desc}
                    </p>
                  )}

                  {/* Image */}
                  {item.img && (
                    <div className="mb-4 flex flex-shrink-0 justify-center">
                      <div
                        className={cn(
                          'relative overflow-hidden rounded-lg p-2 transition-all duration-300',
                          'bg-background/50',
                          'group-hover:bg-white/20',
                        )}
                      >
                        <Image
                          className="h-auto w-auto max-w-full rounded-md transition-transform group-hover:scale-105"
                          src={item.img}
                          alt={item.desc || item.title}
                          width={80}
                          height={80}
                          sizes="(max-width: 640px) 60px, (max-width: 1024px) 70px, 80px"
                        />
                      </div>
                    </div>
                  )}

                  {/* Barre d'accent */}
                  <div
                    aria-hidden
                    className={cn(
                      'h-1 w-full flex-shrink-0 transform rounded-full transition-all duration-300',
                      'motion-safe:group-hover:h-1.5 motion-safe:group-hover:scale-x-100',
                      'scale-x-0',
                      colors.accent,
                      'group-hover:opacity-60',
                    )}
                  />
                </CardContent>
              </Card>
            </ScrollAnimation>
          )
        })}
      </div>
    </div>
  )
}
