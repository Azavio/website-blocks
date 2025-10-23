'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { InfoPanelsProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function StepperVariant({
  header,
  items,
  colorVariant,
  cardClassName,
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

      <div className="mx-auto max-w-4xl">
        <div className="grid items-stretch gap-6 sm:gap-8 md:auto-rows-[1fr] md:grid-cols-2 md:gap-10">
          {items.map((item, index) => {
            // Priorité : item.colorVariant > colorVariant global > neutral
            const colors = colorClasses(
              item.colorVariant ?? colorVariant ?? 'neutral',
            )

            // Alternance gauche/droite pour les animations
            const isEven = index % 2 === 0

            return (
              <ScrollAnimation
                key={item.title + index}
                animation={isEven ? 'slideInLeft' : 'slideInRight'}
                delay={index * 0.2}
              >
                <div
                  className={cn(
                    'group flex h-full items-start gap-4 rounded-2xl p-5 sm:gap-6 sm:p-6',
                    'transition-all duration-300',
                    'hover:shadow-lg hover:shadow-primary/10',
                    'motion-safe:hover:-translate-y-1',
                    colors.card,
                    colors.cardBgHover,
                    colors.hover,
                    cardClassName,
                  )}
                >
                  {/* Badge numéroté */}
                  <div
                    className={cn(
                      'flex h-10 w-10 flex-shrink-0 items-center justify-center sm:h-12 sm:w-12',
                      'rounded-full text-base font-bold transition-all duration-300 sm:text-xl',
                      'motion-safe:group-hover:scale-110',
                      colors.accent,
                    )}
                  >
                    {index + 1}
                  </div>

                  {/* Contenu */}
                  <div className="min-w-0 flex-1">
                    <h3
                      className={cn(
                        'mb-2 text-lg font-semibold leading-tight text-foreground transition-colors duration-300 sm:text-xl',
                      )}
                    >
                      {item.title}
                    </h3>

                    {item.desc && (
                      <p
                        className={cn(
                          'text-sm leading-relaxed transition-colors duration-300 sm:text-base',
                          'text-muted-foreground',
                          colors.hoverTextColor,
                        )}
                      >
                        {item.desc}
                      </p>
                    )}

                    {/* Métrique optionnelle */}
                    {item.metric && (
                      <div className="mt-3 inline-flex items-center gap-2">
                        <span
                          className={cn(
                            'rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-300',
                            colors.badge,
                            colors.badgeHover,
                          )}
                        >
                          {item.metric}
                        </span>
                      </div>
                    )}
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
