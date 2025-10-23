'use client'

import * as React from 'react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import { Icon } from '@/components/ui/icon'
import type { InfoPanelsProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function HubVariant({
  header,
  items,
  colorVariant,
  cardClassName,
}: InfoPanelsProps) {
  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? 'neutral')

  // Limiter à 4 items maximum pour le layout hub
  const displayItems = items.slice(0, 4)

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      <div className="relative mx-auto max-w-6xl">
        {/* Points stratégiques avec hub central intégré */}
        <div className="relative grid grid-cols-1 gap-4 pb-8 pt-8 sm:grid-cols-2 sm:gap-6 sm:pb-12 sm:pt-12 lg:gap-8 lg:pb-16 lg:pt-16">
          {/* Lignes de connexion SVG */}
          <ScrollAnimation animation="fadeIn" delay={0.2}>
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 800 600"
            >
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="currentColor"
                    stopOpacity="0.4"
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity="0.2"
                  />
                </linearGradient>
              </defs>
            </svg>
          </ScrollAnimation>

          {/* Hub central - positionné par rapport à la grille */}
          <ScrollAnimation animation="fadeIn" delay={0.4}>
            <div className="absolute left-1/2 top-1/2 z-20 mt-4 -translate-x-1/2 -translate-y-1/2">
              <div
                className={cn(
                  'flex h-20 w-20 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 sm:h-24 sm:w-24 lg:h-28 lg:w-28',
                  globalColors.accent,
                )}
              >
                <div className="text-center">
                  <div className="px-2 text-xs font-bold leading-tight text-white sm:text-sm lg:text-base">
                    Azavio
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Cards dans les 4 coins */}
          {displayItems.map((item, index) => {
            // Priorité : item.colorVariant > colorVariant global > neutral
            const colors = colorClasses(
              item.colorVariant ?? colorVariant ?? 'neutral',
            )

            // Positions des cards autour du hub
            const positions = [
              'order-1', // Top-left
              'order-2', // Top-right
              'order-3 sm:order-4', // Bottom-left (sur mobile: 3ème, sur desktop: 4ème)
              'order-4 sm:order-3', // Bottom-right (sur mobile: 4ème, sur desktop: 3ème)
            ]

            return (
              <ScrollAnimation
                key={`${item.title}-${index}`}
                animation="slideInUp"
                delay={0.6 + index * 0.15}
              >
                <div className={cn('relative', positions[index])}>
                  <Card
                    className={cn(
                      'group relative h-full transition-all duration-500',
                      'motion-safe:hover:-translate-y-2',
                      'hover:shadow-xl sm:hover:shadow-2xl',
                      cardClassName,
                      colors.hover,
                      colors.card,
                      colors.cardBgHover,
                    )}
                  >
                    <CardContent className="relative flex min-h-[220px] flex-col p-4 text-center sm:min-h-[250px] sm:p-6 lg:min-h-[280px] lg:p-8">
                      {/* Badge métrique en haut */}
                      {item.metric && (
                        <div className="z-10 pb-4">
                          <Badge
                            className={cn(
                              'border-0 px-3 py-1 text-xs font-semibold shadow-lg transition-all duration-300 sm:text-sm',
                              colors.badge,
                              colors.badgeHover,
                              'badgeClassName',
                            )}
                          >
                            {typeof item.metric === 'string'
                              ? item.metric
                              : item.metric}
                          </Badge>
                        </div>
                      )}

                      {/* Icône principale */}
                      {item.icon && (
                        <div className="mx-auto mb-4 flex-shrink-0 sm:mb-6">
                          <Icon
                            size="48"
                            name={item.icon}
                            className={cn(
                              'text-4xl transition-all duration-300 sm:text-5xl lg:text-6xl',
                              'motion-safe:group-hover:scale-125',
                              colors.text,
                              colors.hoverTextColor,
                            )}
                          />
                        </div>
                      )}

                      {/* Titre */}
                      <h3
                        className={cn(
                          'mb-3 text-base font-bold leading-tight transition-all duration-300 sm:mb-4 sm:text-lg lg:text-xl',
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
                              width={70}
                              height={70}
                              sizes="(max-width: 640px) 50px, (max-width: 1024px) 60px, 70px"
                            />
                          </div>
                        </div>
                      )}

                      {/* Barre d'accent */}
                      <div
                        aria-hidden
                        className={cn(
                          'absolute bottom-0 left-0 h-1 w-full transform rounded-full transition-all duration-300',
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
