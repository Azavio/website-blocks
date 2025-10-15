"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { InfoPanelsProps } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function Grid2Variant({
  header,
  items,
  colorVariant,
  gridClassName = "grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3",
  cardClassName,
  button,
}: InfoPanelsProps & {
  button?: {
    text: string;
    href?: string;
    variant?: "default" | "secondary" | "outline"
  }
}) {

  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? "brand")

  // Animations par direction pour créer un effet de profondeur
  const animations = ["slideInLeft", "slideInUp", "slideInRight"]

  return (
    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
      {/* Header avec bouton intégré */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <div className="mx-auto mb-12 sm:mb-16 max-w-3xl text-center">
            <CustomHeader {...header} />

            {/* Bouton optionnel sous le header */}
            {button && (
              <div className="mt-6 sm:mt-8">
                <Button
                  variant={button.variant || "outline"}
                  size="lg"
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
            )}
          </div>
        </ScrollAnimation>
      )}

      {/* Grille des items */}
      <div className={gridClassName}>
        {items.map((item, index) => {
          // Couleurs de la card → colorVariant global du bloc
          const cardColors = globalColors

          // Couleurs de l'icône → colorVariant spécifique de l'item
          const iconColors = colorClasses(item.colorVariant ?? colorVariant ?? "")

          // Animation dynamique selon l'index (gauche, centre, droite)
          const animation = animations[index % 3] as "slideInLeft" | "slideInUp" | "slideInRight"
          const delay = (index % 3) * 0.2

          return (
            <ScrollAnimation
              key={item.title + index}
              animation={animation}
              delay={delay}
            >
              <Card
                className={cn(
                  "group h-full text-center transition-all duration-300",
                  "motion-safe:hover:-translate-y-1",
                  "hover:shadow-lg sm:hover:shadow-xl",
                  cardClassName,
                  cardColors.card,
                  cardColors.cardBgHover,
                )}
              >
                <CardContent className="pt-6 sm:pt-8 px-4 sm:px-6 pb-6 sm:pb-8 h-full flex flex-col items-center">
                  {/* Icône dans cercle avec gradient de l'item */}
                  {item.icon && (
                    <div
                      className={cn(
                        "mx-auto mb-4 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-300",
                        "motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-6",
                        "shadow-md group-hover:shadow-lg",
                        iconColors.accent,
                        "bg-gradient-to-br"
                      )}
                    >
                      <Icon
                        name={item.icon}
                        className="h-7 w-7 sm:h-8 sm:w-8 text-white"
                      />
                    </div>
                  )}

                  {/* Titre */}
                  <h3
                    className={cn(
                      "mb-3 sm:mb-4 text-lg sm:text-xl font-semibold leading-tight transition-all duration-300",
                      "text-foreground" // Texte standard sans gradient
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.desc && (
                    <p
                      className={cn(
                        "text-sm sm:text-base leading-relaxed transition-all duration-300",
                        "text-muted-foreground" // Texte standard
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