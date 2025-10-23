'use client'

import * as React from 'react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { InfoPanelsProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function TimelineVariant({
  header,
  items,
  colorVariant,
  cardClassName,
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

      <div className="mx-auto max-w-5xl">
        <div className="relative">
          {/* Ligne de la timeline */}
          <div
            aria-hidden
            className={cn(
              'absolute left-6 top-0 h-full w-0.5 sm:left-8 lg:left-1/2 lg:-translate-x-0.5',
              globalColors.accent,
            )}
          />

          {items.map((item, index) => {
            // Priorité : item.colorVariant > colorVariant global > neutral
            const colors = colorClasses(
              item.colorVariant ?? colorVariant ?? 'neutral',
            )

            const k = (item as any).id ?? `${item.title}-${index}`
            const isEvenRow = index % 2 === 0
            const sideClasses = isEvenRow
              ? 'lg:flex-row lg:pr-8 xl:pr-12'
              : 'lg:flex-row-reverse lg:pl-8 xl:pl-12'

            return (
              <ScrollAnimation
                key={k}
                animation="slideInUp"
                delay={index * 0.12}
              >
                <div
                  className={cn(
                    'relative mb-8 flex items-start sm:mb-10 lg:mb-12 lg:items-center',
                    sideClasses,
                  )}
                >
                  {/* Dot de la timeline */}
                  <div
                    aria-hidden
                    className={cn(
                      'absolute left-6 top-6 z-10 flex h-3 w-3 items-center justify-center rounded-full transition-all duration-300 sm:left-8 sm:top-8 sm:h-4 sm:w-4 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2',
                      colors.accent,
                      'hover:scale-125',
                    )}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2" />
                  </div>

                  {/* Carte de contenu */}
                  <div className={cn('ml-12 w-full sm:ml-16 lg:ml-0 lg:w-1/2')}>
                    <Card
                      className={cn(
                        'group relative h-full overflow-hidden transition-all duration-500',
                        'motion-safe:hover:-translate-y-1 sm:motion-safe:hover:-translate-y-2',
                        'hover:shadow-xl sm:hover:shadow-2xl',
                        cardClassName,
                        colors.hover,
                        colors.card,
                        colors.cardBgHover,
                      )}
                    >
                      <CardContent className="relative w-full p-4 sm:p-5 lg:p-6">
                        {/* Header avec icône, titre et badge */}
                        <div className="mb-4 flex items-start gap-3">
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            {/* Icône */}
                            {item.icon && (
                              <Icon
                                name={item.icon}
                                className={cn(
                                  'shrink-0 text-xl leading-none transition-all duration-300 sm:text-2xl lg:text-3xl',
                                  'flex items-center justify-center motion-safe:group-hover:scale-110',
                                  colors.text,
                                  colors.hoverTextColor,
                                )}
                              />
                            )}
                            {/* Titre */}
                            <h3
                              className={cn(
                                'min-w-0 text-lg font-semibold leading-tight transition-all duration-300 sm:text-xl',
                                colors.textContentGradient,
                              )}
                            >
                              {item.title}
                            </h3>
                          </div>

                          {/* Badge */}
                          {item.metric && (
                            <Badge
                              className={cn(
                                'whitespace-nowrap border text-xs transition-all duration-300 sm:text-sm',
                                colors.badge,
                                colors.badgeHover,
                                badgeClassName,
                              )}
                            >
                              {item.metric}
                            </Badge>
                          )}
                        </div>

                        {/* Description */}
                        {item.desc && (
                          <p
                            className={cn(
                              'mb-4 text-sm leading-relaxed transition-all duration-300 sm:text-base',
                              'text-muted-foreground',
                              colors.hoverTextColor,
                            )}
                          >
                            {item.desc}
                          </p>
                        )}

                        {/* Image */}
                        {item.img && (
                          <div className="mb-4 flex justify-center lg:justify-start">
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
                                width={100}
                                height={100}
                                sizes="(max-width: 640px) 80px, (max-width: 1024px) 90px, 100px"
                              />
                            </div>
                          </div>
                        )}

                        {/* Barre d'accent */}
                        <div
                          aria-hidden
                          className={cn(
                            'h-1 w-full transform rounded-full transition-all duration-300',
                            'motion-safe:group-hover:h-1.5 motion-safe:group-hover:scale-x-100',
                            'scale-x-0',
                            colors.accent,
                            'group-hover:opacity-60',
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </div>
  )
}
