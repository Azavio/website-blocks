'use client'

import * as React from 'react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { InfoPanelsProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function TabsVariant({
  header,
  items,
  colorVariant,
  cardClassName,
  badgeClassName,
}: InfoPanelsProps) {
  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? 'neutral')

  // État: index actif pour la prévisualisation à droite
  const [activeIndex, setActiveIndex] = React.useState(0)

  // Valeur contrôlée pour Radix Accordion (items: "item-0", "item-1", …)
  const activeValue = `item-${activeIndex}`

  // Synchronise l'index quand on clique une entrée de l'accordéon
  const handleAccordionChange = (value: string | string[] | undefined) => {
    const v = Array.isArray(value) ? value[0] : value
    if (!v) return
    const idx = Number(v.replace('item-', ''))
    if (!Number.isNaN(idx)) setActiveIndex(idx)
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      <div className="mx-auto max-w-6xl">
        {/* Grid avec hauteur uniforme */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:grid-rows-1 xl:gap-12">
          {/* Accordéon (liste) - Prend toute la hauteur disponible */}
          <ScrollAnimation animation="slideInLeft" className="lg:h-full">
            <div className="flex flex-col lg:order-1 lg:h-full">
              <Accordion
                type="single"
                collapsible={false}
                value={activeValue}
                onValueChange={handleAccordionChange}
                className="flex-1 space-y-3 sm:space-y-4"
              >
                {items.map((item, index) => {
                  // Priorité : item.colorVariant > colorVariant global > neutral
                  const colors = colorClasses(
                    item.colorVariant ?? colorVariant ?? 'neutral',
                  )
                  const isActive = index === activeIndex

                  return (
                    <AccordionItem
                      key={(item as any).id ?? `${item.title}-${index}`}
                      value={`item-${index}`}
                      className={cn(
                        'rounded-lg border transition-all duration-300 focus-within:ring-2',
                        'focus-within:ring-opacity-30',
                        isActive
                          ? cn(
                              colors.card,
                              colors.hover,
                              'focus-within:ring-current',
                              colors.text,
                            )
                          : cn(
                              'border-muted bg-background hover:border-muted-foreground/20',
                              'dark:border-muted dark:bg-card dark:hover:border-muted-foreground/20',
                            ),
                      )}
                    >
                      <AccordionTrigger
                        className={cn(
                          'w-full px-3 py-2.5 text-left text-sm font-semibold transition-colors hover:no-underline sm:px-4 sm:py-3 sm:text-base',
                          isActive
                            ? colors.textContentGradient
                            : 'text-foreground',
                        )}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          {item.icon && (
                            <Icon
                              name={item.icon}
                              className={cn(
                                'flex-shrink-0 text-xl transition-colors duration-300 sm:text-2xl',
                                isActive
                                  ? colors.text
                                  : 'text-muted-foreground',
                              )}
                            />
                          )}
                          <span className="min-w-0 flex-1 truncate sm:text-clip">
                            {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          </ScrollAnimation>

          {/* Prévisualisation - Prend toute la hauteur disponible */}
          <ScrollAnimation animation="slideInRight" className="lg:h-full">
            <div className="lg:order-2 lg:h-full">
              <Card
                className={cn(
                  'h-full min-h-[300px] transition-all duration-300 sm:min-h-[400px] lg:min-h-0',
                  globalColors.card,
                  globalColors.hover,
                  cardClassName,
                )}
              >
                <CardContent className="flex h-full items-center justify-center p-4 sm:p-6 lg:p-8">
                  {items[activeIndex] &&
                    (() => {
                      // Couleurs pour l'item actif
                      const activeColors = colorClasses(
                        items[activeIndex].colorVariant ??
                          colorVariant ??
                          'neutral',
                      )

                      return (
                        <div className="mx-auto w-full max-w-md text-center">
                          {/* Icône ou méta en "hero" */}
                          <div className="mb-4 flex items-center justify-center gap-3 sm:mb-6">
                            {items[activeIndex].icon && (
                              <div className="text-4xl leading-none sm:text-5xl lg:text-6xl">
                                <Icon
                                  name={items[activeIndex].icon}
                                  size="70"
                                  className={cn(
                                    'transition-all duration-300',
                                    activeColors.text,
                                  )}
                                />
                              </div>
                            )}
                          </div>

                          <h3
                            className={cn(
                              'mb-3 text-lg font-bold leading-tight transition-all duration-300 sm:mb-4 sm:text-xl lg:text-2xl',
                              activeColors.textContentGradient,
                            )}
                          >
                            {items[activeIndex].title}
                            {items[activeIndex].metric && (
                              <Badge
                                className={cn(
                                  'relative bottom-0.5 ml-2 border text-xs transition-all duration-300 sm:bottom-1 sm:ml-4 sm:text-sm',
                                  activeColors.badge,
                                  badgeClassName,
                                )}
                              >
                                {items[activeIndex].metric}
                              </Badge>
                            )}
                          </h3>

                          {items[activeIndex].desc && (
                            <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:mb-6 sm:text-base">
                              {items[activeIndex].desc}
                            </p>
                          )}

                          <div
                            className={cn(
                              'mb-4 h-1.5 w-full rounded-full transition-all duration-300 sm:mb-6 sm:h-2',
                              activeColors.accent,
                            )}
                          />

                          {items[activeIndex].img && (
                            <div className="flex justify-center">
                              <div className="relative overflow-hidden rounded-lg bg-background/50 p-2">
                                <Image
                                  className="h-auto w-auto max-w-full rounded-md transition-transform hover:scale-105"
                                  src={items[activeIndex].img}
                                  alt={
                                    items[activeIndex].desc ||
                                    items[activeIndex].title
                                  }
                                  width={120}
                                  height={120}
                                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })()}
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}
