'use client'

import * as React from 'react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { InfoPanelsProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function HorizontalStepVariant({
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

      <div className="relative">
        {/* Timeline line - masquée sur mobile, visible sur desktop */}
        <div
          aria-hidden
          className={cn(
            'absolute left-0 right-0 top-[80px] z-0 hidden h-[2px] rounded-full md:block',
            globalColors.accent,
          )}
        />

        <div className="grid items-stretch gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => {
            // Priorité : item.colorVariant > colorVariant global > neutral
            const colors = colorClasses(
              item.colorVariant ?? colorVariant ?? 'neutral',
            )

            return (
              <ScrollAnimation
                key={`${item.title}-${index}`}
                animation="slideInUp"
                delay={index * 0.15}
              >
                <div className="relative flex h-full flex-col text-center">
                  {/* Timeline dot avec numéro */}
                  <div
                    className={cn(
                      'relative z-10 mx-auto mb-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-lg transition-all duration-300 sm:mb-6',
                      colors.accent,
                      'hover:scale-110',
                    )}
                  >
                    {(index < 10 ? '0' : '') + (index + 1)}
                  </div>

                  <Card
                    className={cn(
                      'group relative h-full flex-grow overflow-hidden transition-all duration-500',
                      'motion-safe:hover:-translate-y-1 sm:motion-safe:hover:-translate-y-2',
                      'hover:shadow-xl sm:hover:shadow-2xl',
                      cardClassName,
                      colors.hover, // ex: hover:border-*
                      colors.card, // fond + border de base
                      colors.cardBgHover, // hover de fond
                    )}
                  >
                    <CardContent className="relative flex h-full flex-col p-4 sm:p-5 lg:p-6">
                      {/* Icône */}
                      {item.icon && (
                        <div className="mb-3 flex flex-shrink-0 justify-center sm:mb-4">
                          <Icon
                            size="32"
                            name={item.icon}
                            className={cn(
                              'text-2xl transition-all duration-300 sm:text-3xl lg:text-4xl',
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
                          'mb-2 text-base font-semibold leading-tight transition-all duration-300 sm:mb-3 sm:text-lg',
                          colors.textContentGradient,
                        )}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      {item.desc && (
                        <p
                          className={cn(
                            'mb-4 flex-grow text-xs leading-relaxed transition-all duration-300 sm:text-sm',
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
                              'relative overflow-hidden rounded-lg p-1.5 transition-all duration-300 sm:p-2',
                              'bg-background/50',
                              'group-hover:bg-white/20',
                            )}
                          >
                            <Image
                              className="h-auto w-auto max-w-full rounded-md transition-transform group-hover:scale-105"
                              src={item.img}
                              alt={item.desc || item.title}
                              width={60}
                              height={60}
                              sizes="(max-width: 640px) 50px, (max-width: 1024px) 55px, 60px"
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
                </div>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </div>
  )
}
