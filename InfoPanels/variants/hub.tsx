"use client"

import * as React from "react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import { Icon } from "@/components/ui/icon"
import type { InfoPanelsProps } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function HubVariant({
  header,
  items,
  colorVariant,
  cardClassName,
}: InfoPanelsProps) {
  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? "neutral")

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
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">

          {/* Lignes de connexion SVG */}
          <ScrollAnimation animation="fadeIn" delay={0.2}>
            <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" viewBox="0 0 800 600">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </ScrollAnimation>

          {/* Hub central - positionné par rapport à la grille */}
          <ScrollAnimation animation="fadeIn" delay={0.4}>
            <div className="mt-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div
                className={cn(
                  "flex h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
                  globalColors.accent
                )}
              >
                <div className="text-center">
                  <div className="text-xs sm:text-sm lg:text-base font-bold text-white px-2 leading-tight">
                    Azavio
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Cards dans les 4 coins */}
          {displayItems.map((item, index) => {
            // Priorité : item.colorVariant > colorVariant global > neutral
            const colors = colorClasses(item.colorVariant ?? colorVariant ?? "neutral")

            // Positions des cards autour du hub
            const positions = [
              "order-1", // Top-left
              "order-2", // Top-right  
              "order-3 sm:order-4", // Bottom-left (sur mobile: 3ème, sur desktop: 4ème)
              "order-4 sm:order-3", // Bottom-right (sur mobile: 4ème, sur desktop: 3ème)
            ]

            return (
              <ScrollAnimation
                key={`${item.title}-${index}`}
                animation="slideInUp"
                delay={0.6 + index * 0.15}
              >
                <div className={cn("relative", positions[index])}>
                  <Card
                    className={cn(
                      "group relative transition-all duration-500 h-full",
                      "motion-safe:hover:-translate-y-2",
                      "hover:shadow-xl sm:hover:shadow-2xl",
                      cardClassName,
                      colors.hover,
                      colors.card,
                      colors.cardBgHover
                    )}
                  >
                    <CardContent className="p-4 sm:p-6 lg:p-8 text-center flex flex-col min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] relative">
                      {/* Badge métrique en haut */}
                      {item.metric && (
                        <div className="z-10 pb-4">
                          <Badge
                            className={cn(
                              "border-0 px-3 py-1 text-xs sm:text-sm font-semibold shadow-lg transition-all duration-300",
                              colors.badge,
                              colors.badgeHover,
                              "badgeClassName"
                            )}
                          >
                            {typeof item.metric === 'string' ? item.metric : item.metric}
                          </Badge>
                        </div>
                      )}

                      {/* Icône principale */}
                      {item.icon && (
                        <div className="mx-auto mb-4 sm:mb-6 flex-shrink-0">
                          <Icon
                            size="48"
                            name={item.icon}
                            className={cn(
                              "text-4xl sm:text-5xl lg:text-6xl transition-all duration-300",
                              "motion-safe:group-hover:scale-125",
                              colors.text,
                              colors.hoverTextColor
                            )}
                          />
                        </div>
                      )}

                      {/* Titre */}
                      <h3
                        className={cn(
                          "mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl font-bold leading-tight transition-all duration-300",
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
                          "absolute bottom-0 left-0 h-1 w-full transform rounded-full transition-all duration-300",
                          "motion-safe:group-hover:scale-x-100 motion-safe:group-hover:h-1.5",
                          "scale-x-0",
                          colors.accent,
                          "group-hover:opacity-60"
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