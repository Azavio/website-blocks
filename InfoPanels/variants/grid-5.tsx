"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { InfoPanelsProps } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function Grid5Variant({
  header,
  items,
  colorVariant,
  cardClassName,
  gridClassName = "grid gap-6 md:grid-cols-3",
}: InfoPanelsProps) {

  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? "neutral")

  return (
    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      <div className="mx-auto max-w-6xl">
        <div className={gridClassName}>
          {items.map((item, index) => {
            // Priorité : item.colorVariant > colorVariant global > neutral
            const colors = colorClasses(item.colorVariant ?? colorVariant ?? "neutral")

            return (
              <ScrollAnimation
                key={item.title + index}
                animation="slideInUp"
                delay={index * 0.1}
              >
                <Card
                  className={cn(
                    "text-center transition-all duration-300 hover:shadow-lg",
                    "border-2",
                    colors.border,
                    cardClassName
                  )}
                >
                  <CardContent className="p-6">
                    {/* Titre */}
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>

                    {/* Prix avec metric */}
                    {item.metric && (
                      <div className="mb-2">
                        <span className={cn(
                          "text-2xl font-bold transition-colors",
                          colors.text
                        )}>
                          {typeof item.metric === 'string' ? item.metric : item.metric}
                        </span>
                        {item.desc && (
                          <span className="text-sm text-muted-foreground ml-1">
                            {item.desc}
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </div>
  )
}