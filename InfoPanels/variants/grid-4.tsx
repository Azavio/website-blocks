'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { InfoPanelsProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function Grid4Variant({
  header,
  items,
  colorVariant,
  cardClassName,
  badgeClassName,
  gridClassName = 'flex flex-wrap gap-8 justify-center [&>*]:w-full [&>*]:md:w-[calc(50%-1rem)] [&>*]:lg:w-[calc(33.333%-1.334rem)] [&>*]:max-w-sm',
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
        {items.map((item, index) => {
          // Priorité : item.colorVariant > colorVariant global > neutral
          const colors = colorClasses(
            item.colorVariant ?? colorVariant ?? 'neutral',
          )

          return (
            <ScrollAnimation
              key={item.title + index}
              animation="slideInUp"
              delay={index * 0.1}
            >
              <Card
                className={cn(
                  'group relative h-full w-full max-w-sm overflow-hidden transition-all duration-300',
                  'hover:shadow-lg',
                  cardClassName,
                  colors.hover,
                )}
              >
                <CardContent className="p-6">
                  {/* Header avec icône et badge */}
                  <div className="mb-4 flex items-center justify-between">
                    {/* Icône */}
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        className={cn(
                          'h-8 w-8 transition-all duration-300',
                          'motion-safe:group-hover:scale-110',
                          colors.text,
                          colors.hoverTextColor,
                        )}
                      />
                    )}

                    {/* Badge métrique */}
                    {item.metric && (
                      <Badge
                        className={cn(
                          'border text-sm transition-all duration-300',
                          colors.badge,
                          colors.badgeHover,
                          badgeClassName,
                        )}
                      >
                        {item.metric}
                      </Badge>
                    )}
                  </div>

                  {/* Titre */}
                  <h3
                    className={cn(
                      'mb-2 text-xl font-semibold leading-tight text-foreground transition-all duration-300',
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.desc && (
                    <p
                      className={cn(
                        'text-base leading-relaxed transition-all duration-300',
                        'text-muted-foreground',
                        colors.hoverTextColor,
                      )}
                    >
                      {item.desc}
                    </p>
                  )}
                </CardContent>
              </Card>
            </ScrollAnimation>
          )
        })}
      </div>
    </div>
  )
}
