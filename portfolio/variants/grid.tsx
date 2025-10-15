"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { PortfolioProps } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function GridVariant({
  header,
  items,
  button,
  colorVariant,
  className,
  cardClassName,
  showCategory = true,
  showTags = true,
  showDate = false,
  columns = 3,
}: PortfolioProps) {
  
  const globalColors = colorClasses(colorVariant ?? "neutral")
  
  // Classes de grille selon le nombre de colonnes
  const gridClasses = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }

  return (
    <div className={cn("relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      {/* Portfolio Grid */}
      <div className={cn(
        "grid gap-6 sm:gap-8",
        gridClasses[columns]
      )}>
        {items.map((item, index) => {
          const itemColors = colorClasses(item.colorVariant ?? colorVariant ?? "neutral")
          const hasLink = !!(item.href || item.onClick)
          
          return (
            <ScrollAnimation
              key={item.title + index}
              animation="slideInUp"
              delay={index * 0.1}
            >
              <Card
                className={cn(
                  "group relative overflow-hidden transition-all duration-500 h-full",
                  hasLink && "cursor-pointer",
                  "motion-safe:hover:-translate-y-2",
                  "hover:shadow-xl",
                  itemColors.card,
                  itemColors.cardBgHover,
                  hasLink && itemColors.hover,
                  cardClassName
                )}
                onClick={item.onClick}
              >
                {hasLink && item.href ? (
                  <a href={item.href} className="block h-full">
                    <PortfolioCardContent 
                      item={item}
                      itemColors={itemColors}
                      hasLink={hasLink}
                      showCategory={showCategory}
                      showDate={showDate}
                      showTags={showTags}
                    />
                  </a>
                ) : (
                  <PortfolioCardContent 
                    item={item}
                    itemColors={itemColors}
                    hasLink={hasLink}
                    showCategory={showCategory}
                    showDate={showDate}
                    showTags={showTags}
                  />
                )}
              </Card>
            </ScrollAnimation>
          )
        })}
      </div>

      {/* CTA Button */}
      {button && (
        <ScrollAnimation animation="slideInUp" delay={items.length * 0.1 + 0.2}>
          <div className="mt-12 sm:mt-16 text-center">
            <Button
              variant={button.variant || "default"}
              size="lg"
              onClick={button.onClick}
              asChild={!!button.href}
              className={cn(
                "transition-all duration-300",
                colorVariant && globalColors.hover
              )}
            >
              {button.href ? (
                <a href={button.href}>
                  {button.text}
                  <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                </a>
              ) : (
                <>
                  {button.text}
                  <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </ScrollAnimation>
      )}
    </div>
  )
}

// Composant séparé pour le contenu de la card (évite la duplication)
function PortfolioCardContent({ 
  item, 
  itemColors, 
  hasLink,
  showCategory,
  showDate,
  showTags
}: any) {
  return (
    <CardContent className="p-0 h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={item.image}
          alt={item.imageAlt || item.title}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            "motion-safe:group-hover:scale-110"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Overlay gradient au survol */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        )} />
        
        {/* Badge featured ou personnalisé */}
        {(item.featured || item.badge) && (
          <div className="absolute top-4 right-4">
            <Badge className={cn("backdrop-blur-sm", itemColors.badge)}>
              {item.featured ? "Featured" : item.badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category & Date */}
        {(showCategory && item.category) || (showDate && item.date) ? (
          <div className="flex items-center gap-3 mb-3">
            {showCategory && item.category && (
              <span className={cn(
                "text-xs font-medium uppercase tracking-wider transition-colors",
                itemColors.text
              )}>
                {item.category}
              </span>
            )}
            {showCategory && item.category && showDate && item.date && (
              <span className="text-muted-foreground">•</span>
            )}
            {showDate && item.date && (
              <span className="text-xs text-muted-foreground">
                {item.date}
              </span>
            )}
          </div>
        ) : null}

        {/* Title */}
        <h3 className={cn(
          "text-xl font-bold mb-2 transition-colors",
          itemColors.textContentGradient,
          hasLink && "group-hover:underline"
        )}>
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
          {item.description}
        </p>

        {/* Tags */}
        {showTags && item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag: string, tagIndex: number) => (
              <Badge
                key={tag + tagIndex}
                variant="outline"
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Metric */}
        {item.metric && (
          <div className={cn(
            "text-sm font-medium mb-4 transition-colors",
            itemColors.text
          )}>
            {item.metric}
          </div>
        )}

        {/* Link indicator */}
        {hasLink && (
          <div className="flex items-center gap-2 pt-4 border-t border-border">
            <span className={cn(
              "text-sm font-medium transition-colors",
              itemColors.text
            )}>
              Voir le projet
            </span>
            <Icon 
              name="ArrowRight" 
              className={cn(
                "h-4 w-4 transition-all duration-300",
                "motion-safe:group-hover:translate-x-1",
                itemColors.text
              )}
            />
          </div>
        )}
      </div>

      {/* Barre d'accent */}
      <div
        aria-hidden
        className={cn(
          "h-1 w-full transform transition-all duration-300",
          "motion-safe:group-hover:scale-x-100",
          "scale-x-0",
          itemColors.accent
        )}
      />
    </CardContent>
  )
}