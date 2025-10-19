"use client"

import { useState, useMemo } from "react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  tagFilter = false,
  searchItems = false,
}: PortfolioProps) {
  
  const globalColors = colorClasses(colorVariant ?? "neutral")
  
  // État pour le tag sélectionné
  const [selectedTag, setSelectedTag] = useState<string>("all")
  
  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState<string>("")
  
  // Extraction de tous les tags uniques
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    items.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => tagsSet.add(tag))
      }
    })
    return Array.from(tagsSet).sort()
  }, [items])
  
  // Filtrage des items selon le tag et la recherche
  const filteredItems = useMemo(() => {
    let filtered = items
    
    // Filtre par tag
    if (tagFilter && selectedTag !== "all") {
      filtered = filtered.filter(item => 
        item.tags && item.tags.includes(selectedTag)
      )
    }
    
    // Filtre par recherche
    if (searchItems && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        (item.category && item.category.toLowerCase().includes(searchLower)) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      )
    }
    
    return filtered
  }, [items, selectedTag, tagFilter, searchTerm, searchItems])
  
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

      {/* Barre de recherche */}
      {searchItems && (
        <ScrollAnimation animation="slideInUp" delay={0.05}>
          <Card className={cn(
            "mb-8 sm:mb-10 transition-all duration-300",
            globalColors.card
          )}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Search" className="mr-2 h-5 w-5" />
                Recherche en temps réel
              </CardTitle>
              <CardDescription>
                Trouvez rapidement le projet que vous recherchez
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Icon 
                  name="Search" 
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" 
                />
                <Input
                  placeholder="Rechercher par titre, description, catégorie ou tags..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 transform"
                    onClick={() => setSearchTerm("")}
                  >
                    <Icon name="X" className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {/* Résultat de recherche */}
              {searchTerm && (
                <div className="mt-4 text-sm text-muted-foreground">
                  {filteredItems.length} {filteredItems.length === 1 ? 'projet trouvé' : 'projets trouvés'}
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollAnimation>
      )}

      {/* Filtres par tags */}
      {tagFilter && allTags.length > 0 && (
        <ScrollAnimation animation="slideInUp" delay={0.1}>
          <div className="mb-8 sm:mb-10 flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedTag === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag("all")}
              className={cn(
                "transition-all duration-300",
                selectedTag === "all" && cn(
                  "bg-gradient-to-r",
                  globalColors.accent,
                  "hover:opacity-90"
                )
              )}
            >
              Tous
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  "transition-all duration-300",
                  selectedTag === tag && cn(
                    "bg-gradient-to-r",
                    globalColors.accent,
                    "hover:opacity-90"
                  )
                )}
              >
                {tag}
              </Button>
            ))}
          </div>
        </ScrollAnimation>
      )}

      {/* Portfolio Grid */}
      <div className={cn(
        "grid gap-6 sm:gap-8",
        gridClasses[columns]
      )}>
        {filteredItems.map((item, index) => {
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
                      showTags={showTags && !tagFilter} // Cache les tags si le filtre est actif
                    />
                  </a>
                ) : (
                  <PortfolioCardContent 
                    item={item}
                    itemColors={itemColors}
                    hasLink={hasLink}
                    showCategory={showCategory}
                    showDate={showDate}
                    showTags={showTags && !tagFilter} // Cache les tags si le filtre est actif
                  />
                )}
              </Card>
            </ScrollAnimation>
          )
        })}
      </div>

      {/* Message si aucun résultat */}
      {((filteredItems.length === 0 && tagFilter) || (filteredItems.length === 0 && searchItems && searchTerm)) && (
        <div className="text-center py-12">
          <Icon name="SearchX" className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {searchTerm 
              ? `Aucun projet ne correspond à votre recherche "${searchTerm}"`
              : "Aucun projet ne correspond au filtre sélectionné."}
          </p>
          {(tagFilter || searchTerm) && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSelectedTag("all")
                setSearchTerm("")
              }}
            >
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      )}

      {/* CTA Button */}
      {button && (
        <ScrollAnimation animation="slideInUp" delay={filteredItems.length * 0.1 + 0.2}>
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