"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { FeaturePanelsProps, FeatureItem } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function ExpertiseCards2Variant({
  header,
  cards,
  colorVariant,
  className,
}: FeaturePanelsProps) {

  // Couleur globale par défaut
  const globalColors = colorClasses(colorVariant ?? "neutral")

  return (
    <section className={cn("py-16 sm:py-24", className)}>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        {header && (
          <ScrollAnimation animation="slideInUp">
            <div className="mb-12 sm:mb-16 text-center">
              <CustomHeader {...header} />
            </div>
          </ScrollAnimation>
        )}

        {/* Cards Stack - Alternance gauche/droite */}
        <div className="space-y-8 sm:space-y-12">
          {cards.map((card, index) => {
            // Couleurs de la card (colorVariant spécifique ou global)
            const cardColors = colorClasses(card.colorVariant ?? colorVariant ?? "neutral")

            // Couleurs des listes (listColorVariant spécifique ou card colorVariant)
            const listColors = colorClasses(
              (card as any).listColorVariant ?? card.colorVariant ?? colorVariant ?? "neutral"
            )

            // Animation alternée (gauche/droite)
            const animation = index % 2 === 0 ? "slideInLeft" : "slideInRight"

            return (
              <ScrollAnimation
                key={card.title + index}
                animation={animation}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-12 transition-all duration-300",
                    "hover:shadow-xl",
                    cardColors.card
                  )}
                >
                  {/* Image de fond optionnelle */}
                  {card.img && (
                    <div className="absolute right-6 sm:right-8 top-6 sm:top-8 opacity-10">
                      <Image
                        src={card.img}
                        alt={card.title}
                        width={192}
                        height={128}
                        className="h-24 w-36 sm:h-32 sm:w-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-2">
                    {/* Colonne gauche : Présentation */}
                    <div>
                      {/* Icône avec gradient */}
                      {card.icon && (
                        <div
                          className={cn(
                            "mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full transition-all duration-300",
                            "motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-6",
                            "shadow-md group-hover:shadow-lg",
                            cardColors.accent // Gradient spécifique à l'item
                          )}
                        >
                          <Icon
                            name={card.icon}
                            className="h-8 w-8 sm:h-10 sm:w-10 text-white"
                          />
                        </div>
                      )}

                      {/* Badge optionnel */}
                      {card.badge && (
                        <div className="mb-3 inline-block">
                          <span
                            className={cn(
                              "px-3 py-1 text-xs sm:text-sm font-medium rounded-full",
                              cardColors.badge
                            )}
                          >
                            {card.badge}
                          </span>
                        </div>
                      )}

                      {/* Titre */}
                      <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-foreground">
                        {card.title}
                      </h3>

                      {/* Description */}
                      {card.desc && (
                        <p className="mb-4 sm:mb-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                          {card.desc}
                        </p>
                      )}

                      {/* Bouton principal */}
                      {card.buttons?.primary && (
                        <Button
                          size="lg"
                          variant={card.buttons.primary.variant || "default"}
                          onClick={card.buttons.primary.onClick}
                          asChild={!!card.buttons.primary.href}
                          className={cn(
                            card.buttons.primary.variant === "default"
                              ? cn("bg-gradient-to-r", cardColors.accent, "hover:opacity-90")
                              : cardColors.hover
                          )}
                        >
                          {card.buttons.primary.href ? (
                            <a href={card.buttons.primary.href}>
                              {card.buttons.primary.text}
                              <Icon
                                name={card.buttons.primary.icon || "ArrowRight"}
                                className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
                              />
                            </a>
                          ) : (
                            <>
                              {card.buttons.primary.text}
                              <Icon
                                name={card.buttons.primary.icon || "ArrowRight"}
                                className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
                              />
                            </>
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Colonne droite : Features */}
                    <div className="space-y-3 sm:space-y-4">
                      {card.features.map((feature, featureIndex) => {
                        const isObject = typeof feature === 'object'
                        const featureText = isObject ? (feature as FeatureItem).text : feature
                        const featureIcon = isObject ? (feature as FeatureItem).icon : "CheckCircle"

                        return (
                          <div
                            key={featureIndex}
                            className="flex items-center space-x-3 sm:space-x-4"
                          >
                            <Icon
                              name={featureIcon}
                              className={cn(
                                "h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0",
                                listColors.text
                              )}
                            />
                            <span className="text-sm sm:text-base text-foreground">
                              {featureText}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section >
  )
}