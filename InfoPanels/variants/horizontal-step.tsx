"use client"

import * as React from "react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { InfoPanelsProps } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"


export default function HorizontalStepVariant({
  header,
  items,
  colorVariant,
  cardClassName,
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

      <div className="relative">
        {/* Timeline line - masquée sur mobile, visible sur desktop */}
        <div
          aria-hidden
          className={cn(
            "absolute top-[80px] left-0 right-0 h-[2px] rounded-full hidden md:block z-0",
            globalColors.accent
          )}
        />

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
          {items.map((item, index) => {
            // Priorité : item.colorVariant > colorVariant global > neutral
            const colors = colorClasses(item.colorVariant ?? colorVariant ?? "neutral")

            return (
              <ScrollAnimation
                key={`${item.title}-${index}`}
                animation="slideInUp"
                delay={index * 0.15}
              >
                <div className="relative text-center h-full flex flex-col">
                  {/* Timeline dot avec numéro */}
                  <div 
                    className={cn(
                      "relative z-10 mx-auto mb-4 sm:mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white font-bold text-base shadow-lg flex-shrink-0 transition-all duration-300",
                      colors.accent,
                      "hover:scale-110"
                    )}
                  >
                    {(index < 10 ? '0' : '') + (index + 1)}
                  </div>

                  <Card
                    className={cn(
                      "group relative overflow-hidden transition-all duration-500 h-full flex-grow",
                      "motion-safe:hover:-translate-y-1 sm:motion-safe:hover:-translate-y-2",
                      "hover:shadow-xl sm:hover:shadow-2xl",
                      cardClassName,
                      colors.hover,      // ex: hover:border-*
                      colors.card,       // fond + border de base
                      colors.cardBgHover // hover de fond
                    )}
                  >
                    <CardContent className="relative p-4 sm:p-5 lg:p-6 h-full flex flex-col">
                      {/* Icône */}
                      {item.icon && (
                        <div className="flex justify-center mb-3 sm:mb-4 flex-shrink-0">
                          <Icon
                            size="32"
                            name={item.icon}
                            className={cn(
                              "text-2xl sm:text-3xl lg:text-4xl transition-all duration-300",
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
                          "mb-2 sm:mb-3 text-base sm:text-lg font-semibold leading-tight transition-all duration-300",
                          colors.textContentGradient
                        )}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      {item.desc && (
                        <p
                          className={cn(
                            "text-xs sm:text-sm leading-relaxed mb-4 flex-grow transition-all duration-300",
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
                              "relative overflow-hidden rounded-lg p-1.5 sm:p-2 transition-all duration-300",
                              "bg-background/50",
                              "group-hover:bg-white/20"
                            )}
                          >
                            <Image
                              className="rounded-md w-auto h-auto max-w-full transition-transform group-hover:scale-105"
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
                          "h-1 w-full transform rounded-full transition-all duration-300 flex-shrink-0",
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