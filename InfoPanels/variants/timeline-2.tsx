"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { InfoPanelsProps, Item } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function Timeline2Variant({
  header,
  items,
  colorVariant,
  cardClassName,
}: InfoPanelsProps) {

  const globalColors = colorClasses(colorVariant ?? "neutral")

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      <div className="relative mx-auto max-w-4xl">
        {/* Timeline Line */}
        <div 
          className={cn(
            "absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b md:left-1/2 md:-translate-x-0.5",
            globalColors.accent
          )}
        />

        {/* Timeline Items */}
        <div className="space-y-12">
          {items.map((item, index) => {
            const colors = colorClasses(item.colorVariant ?? colorVariant ?? "neutral")
            const isEven = index % 2 === 0
            
            return (
              <ScrollAnimation
                key={item.title + index}
                animation={isEven ? "slideInLeft" : "slideInRight"}
                delay={index * 200}
              >
                <div className={cn(
                  "relative flex items-start",
                  isEven ? "md:justify-start" : "md:justify-end"
                )}>
                  {/* Timeline Badge Number */}
                  <div className={cn(
                    "absolute left-6 flex h-8 w-8 items-center justify-center rounded-full text-white font-bold text-sm md:left-1/2 md:-translate-x-1/2",
                    "bg-gradient-to-br",
                    colors.accent
                  )}>
                    {index + 1}
                  </div>

                  {/* Content Card */}
                  <div className={cn(
                    "ml-20 md:ml-0 md:w-1/2",
                    isEven ? "md:pr-8" : "md:pl-8"
                  )}>
                    <Card className={cn(
                      "transition-shadow hover:shadow-lg",
                      cardClassName
                    )}>
                      <CardContent className="p-6">
                        {/* Title */}
                        <h3 className="mb-3 text-xl font-semibold">
                          {item.title}
                        </h3>

                        {/* Description - gestion du paragraphe avec mise en évidence */}
                        {typeof item.desc === 'string' && item.desc.includes('|') ? (
                          <>
                            <p className="text-muted-foreground mb-2">
                              {item.desc.split('|')[0]}
                            </p>
                            <p className="text-muted-foreground mb-4 font-medium">
                              {item.desc.split('|')[1]}
                            </p>
                          </>
                        ) : (
                          <p className="text-muted-foreground mb-4">
                            {item.desc}
                          </p>
                        )}

                        {/* Button */}
                        {item.button && (
                          <Button
                            asChild
                            size="sm"
                            variant={item.button.variant || "outline"}
                            className={cn(
                              item.button.variant === "default" 
                                ? cn("bg-gradient-to-r", colors.accent, "hover:opacity-90")
                                : "bg-transparent"
                            )}
                          >
                            <Link href={item.button.href || "#"}>
                              {item.button.text}
                              <Icon name="ArrowRight" className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
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