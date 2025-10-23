'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { InfoPanelsProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function Grid3Variant({
  header,
  items,
  colorVariant,
  gridClassName = 'grid gap-8 md:grid-cols-4 items-stretch',
  cardClassName,
}: InfoPanelsProps) {
  return (
    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      <div className={gridClassName}>
        {items.map((item, i) => {
          // Priorité : item.colorVariant > colorVariant global > neutral
          const colors = colorClasses(
            item.colorVariant ?? colorVariant ?? 'neutral',
          )

          // Animation alternée selon l'index
          const animation =
            i % 3 === 0
              ? 'slideInLeft'
              : i % 3 === 1
                ? 'slideInUp'
                : 'slideInRight'

          return (
            <ScrollAnimation
              key={item.title + i}
              animation={animation}
              delay={i * 0.2}
            >
              <Card
                className={cn(
                  'h-full w-full max-w-sm transition-all duration-500',
                  'hover:shadow-lg hover:shadow-xl',
                  colors.card,
                  colors.hover,
                  cardClassName,
                  'bg-gradient-to-br',
                )}
              >
                <CardContent className="pt-8 text-center">
                  {/* Métrique en grand et gras avec gradient */}
                  {item.metric && (
                    <h3
                      className={cn(
                        'mb-4 text-6xl font-bold transition-all duration-300',
                        colors.textContentGradient,
                        'mb-4 bg-gradient-to-r bg-clip-text text-6xl font-bold text-transparent',
                        'from-brand to-brand-accent',
                      )}
                    >
                      {typeof item.metric === 'string'
                        ? item.metric
                        : item.metric}
                    </h3>
                  )}

                  {/* Titre en text-foreground */}
                  <p className="mb-2 text-lg font-bold text-foreground">
                    {item.title}
                  </p>

                  {/* Description en text-muted-foreground */}
                  {item.desc && (
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  )}

                  {/* Icône (optionnelle) */}
                  {item.icon && (
                    <div className="mt-4 flex justify-center">
                      <Icon
                        size="24"
                        name={item.icon}
                        className={cn(
                          'text-2xl opacity-50 transition-all duration-300',
                          'hover:scale-110 hover:opacity-100',
                          colors.icon,
                        )}
                      />
                    </div>
                  )}

                  {/* Image (optionnelle) */}
                  {item.img && (
                    <div className="mt-4 flex justify-center">
                      <Image
                        className="h-auto w-auto max-w-full rounded-md transition-transform hover:scale-105"
                        src={item.img}
                        alt={item.desc || item.title}
                        width={60}
                        height={60}
                        sizes="(max-width: 640px) 40px, (max-width: 1024px) 50px, 60px"
                      />
                    </div>
                  )}

                  {/* Barre d'accent en bas (optionnelle) */}
                  <div
                    aria-hidden
                    className={cn(
                      'absolute bottom-0 left-0 h-1 w-full transform transition-all duration-300',
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
