"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { InfoPanelsProps } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"


export default function GridVariant({
  header,
  items,
  colorVariant,
  cardClassName,
  gridClassName = "grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8",
  badgeClassName,
}: InfoPanelsProps) {

  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? "neutral")

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
          const colors = colorClasses(item.colorVariant ?? colorVariant ?? "")

          return (
            <ScrollAnimation
              key={item.title + index}
              animation="slideInUp"
              delay={index * 0.1}
            >
              <Card
                className={cn(
                  "group relative overflow-hidden transition-all duration-500 h-full",
                  "motion-safe:hover:-translate-y-1 sm:motion-safe:hover:-translate-y-2",
                  "hover:shadow-xl sm:hover:shadow-2xl",
                  cardClassName,
                  colors.hover,      // ex: hover:border-*
                  colors.card,       // fond + border de base
                  colors.cardBgHover // hover de fond
                )}
              >
                <CardContent className="relative p-4 sm:p-6 lg:p-8 text-center h-full flex flex-col">
                  {/* Icône */}
                  {item.icon && (
                    <div className="flex justify-center mb-3 sm:mb-4 flex-shrink-0">
                      <Icon
                        size="39"
                        name={item.icon}
                        className={cn(
                          "text-3xl sm:text-4xl lg:text-5xl transition-all duration-300",
                          "motion-safe:group-hover:scale-110",
                          colors.text,
                          colors.hoverTextColor
                        )}
                      />
                    </div>
                  )}

                  {/* Badge métrique */}
                  {item.metric && (
                    <Badge
                      className={cn(
                        "mb-3 sm:mb-4 border text-xs sm:text-sm self-center transition-all duration-300",
                        colors.badge,
                        colors.badgeHover,
                        badgeClassName
                      )}
                    >
                      {item.metric}
                    </Badge>
                  )}

                  {/* Titre */}
                  <h3
                    className={cn(
                      "mb-2 sm:mb-3 text-lg sm:text-xl font-bold leading-tight transition-all duration-300",
                      colors.textContentGradient
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.desc && (
                    <p
                      className={cn(
                        "text-sm sm:text-base leading-relaxed mb-4 flex-grow transition-all duration-300",
                        "text-muted-foreground",
                        colors.hoverTextColor
                      )}
                    >
                      {item.desc}
                    </p>
                  )}

                  {/* Image */}
                  {item.img && (
                    <div className="mb-4 flex justify-center flex-shrink-0">
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-lg p-2 transition-all duration-300",
                          "bg-background/50",
                          "group-hover:bg-white/20"
                        )}
                      >
                        <Image
                          className="rounded-md w-auto h-auto max-w-full transition-transform group-hover:scale-105"
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
                      "h-1 w-full transform rounded-full transition-all duration-300 flex-shrink-0",
                      "motion-safe:group-hover:scale-x-100 motion-safe:group-hover:h-1.5",
                      "scale-x-0",
                      colors.accent,
                      "group-hover:opacity-60"
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
