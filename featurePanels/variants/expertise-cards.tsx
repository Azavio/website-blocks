"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { FeaturePanelsProps, FeatureItem } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function ExpertiseCardsVariant({
    header,
    cards,
    colorVariant,
    className,
    cardClassName,
    showBorder = true,
}: FeaturePanelsProps) {

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

                {/* Cards Grid - 2 colonnes desktop, 1 mobile */}
                <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                    {cards.map((card, index) => {
                        // Couleurs de la card (colorVariant spécifique ou global)
                        const cardColors = colorClasses(card.colorVariant ?? colorVariant ?? "")
                        const listColors = colorClasses(card.listColorVariant ?? colorVariant ?? "")

                        // Animation alternée (gauche/droite)
                        const animation = index % 2 === 0 ? "slideInLeft" : "slideInRight"

                        return (
                            <ScrollAnimation
                                key={card.title + index}
                                animation={animation}
                            >
                                <Card
                                    className={cn(
                                        "group h-full transition-all duration-300 hover:shadow-xl",
                                        showBorder && cn(
                                            "border-2",
                                            card.colorVariant
                                                ? `border-${card.colorVariant}-light dark:border-${card.colorVariant}-dark`
                                                : cardColors.card
                                        ),
                                        cardClassName
                                    )}
                                >
                                    <CardHeader>
                                        {/* Icône avec gradient */}
                                        {card.icon && (
                                            <div
                                                className={cn(
                                                    "mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-300",
                                                    cardColors.accent
                                                )}
                                            >
                                                <Icon
                                                    name={card.icon}
                                                    className="h-7 w-7 sm:h-8 sm:w-8 text-white"
                                                />
                                            </div>
                                        )}

                                        {/* Badge optionnel */}
                                        {card.badge && (
                                            <Badge
                                                className={cn(
                                                    "mb-3 text-xs sm:text-sm w-fit",
                                                    cardColors.badge
                                                )}
                                            >
                                                {card.badge}
                                            </Badge>
                                        )}

                                        {/* Titre */}
                                        <CardTitle className="text-xl sm:text-2xl">
                                            {card.title}
                                        </CardTitle>

                                        {/* Description */}
                                        {card.desc && (
                                            <CardDescription className="text-sm sm:text-base">
                                                {card.desc}
                                            </CardDescription>
                                        )}
                                    </CardHeader>

                                    <CardContent>
                                        {/* Liste des features */}
                                        <div className="mb-6 space-y-3">
                                            {card.features.map((feature, featureIndex) => {
                                                const isObject = typeof feature === 'object'
                                                const featureText = isObject ? (feature as FeatureItem).text : feature
                                                const featureIcon = card.listIcon ?? "CheckCircle"
                                                console.log(listColors)

                                                return (
                                                    <div
                                                        key={featureIndex}
                                                        className="flex items-center space-x-3"
                                                    >
                                                        <Icon
                                                            name={featureIcon}
                                                            className={cn(
                                                                "h-5 w-5 flex-shrink-0",
                                                                listColors.icon
                                                            )}
                                                        />
                                                        <span className="text-sm">
                                                            {featureText}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {/* Boutons CTA */}
                                        {card.buttons && (
                                            <div className="flex flex-col gap-2">
                                                {/* Bouton principal */}
                                                {card.buttons.primary && (
                                                    <Button
                                                        variant={card.buttons.primary.variant || "outline"}
                                                        onClick={card.buttons.primary.onClick}
                                                        asChild={!!card.buttons.primary.href}
                                                        className={cn(
                                                            "w-full transition-all duration-300",
                                                            card.colorVariant && "bg-gradient-to-r hover:from-brand hover:to-brand-accent"
                                                        )}
                                                    >
                                                        {card.buttons.primary.href ? (
                                                            <a href={card.buttons.primary.href}>
                                                                {card.buttons.primary.text}
                                                                <Icon
                                                                    name={card.buttons.primary.icon || "ArrowRight"}
                                                                    className="ml-2 h-4 w-4"
                                                                />
                                                            </a>
                                                        ) : (
                                                            <>
                                                                {card.buttons.primary.text}
                                                                <Icon
                                                                    name={card.buttons.primary.icon || "ArrowRight"}
                                                                    className="ml-2 h-4 w-4"
                                                                />
                                                            </>
                                                        )}
                                                    </Button>
                                                )}

                                                {/* Bouton secondaire */}
                                                {card.buttons.secondary && (
                                                    <Button
                                                        variant={card.buttons.secondary.variant || "outline"}
                                                        onClick={card.buttons.secondary.onClick}
                                                        asChild={!!card.buttons.secondary.href}
                                                        className="w-full bg-transparent transition-all duration-300"
                                                    >
                                                        {card.buttons.secondary.href ? (
                                                            <a href={card.buttons.secondary.href}>
                                                                {card.buttons.secondary.text}
                                                                <Icon
                                                                    name={card.buttons.secondary.icon || "ArrowRight"}
                                                                    className="ml-2 h-4 w-4"
                                                                />
                                                            </a>
                                                        ) : (
                                                            <>
                                                                {card.buttons.secondary.text}
                                                                <Icon
                                                                    name={card.buttons.secondary.icon || "ArrowRight"}
                                                                    className="ml-2 h-4 w-4"
                                                                />
                                                            </>
                                                        )}
                                                    </Button>
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
        </section>
    )
}