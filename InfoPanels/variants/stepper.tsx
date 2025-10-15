"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { InfoPanelsProps } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function StepperVariant({
    header,
    items,
    colorVariant,
    cardClassName,
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

            <div className="mx-auto max-w-4xl">
                <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 md:auto-rows-[1fr] items-stretch">
                    {items.map((item, index) => {
                        // Priorité : item.colorVariant > colorVariant global > neutral
                        const colors = colorClasses(item.colorVariant ?? colorVariant ?? "neutral")

                        // Alternance gauche/droite pour les animations
                        const isEven = index % 2 === 0

                        return (
                            <ScrollAnimation
                                key={item.title + index}
                                animation={isEven ? "slideInLeft" : "slideInRight"}
                                delay={index * 0.2}
                            >
                                <div
                                    className={cn(
                                        "group h-full flex items-start gap-4 sm:gap-6 rounded-2xl p-5 sm:p-6",
                                        "transition-all duration-300",
                                        "hover:shadow-lg hover:shadow-primary/10",
                                        "motion-safe:hover:-translate-y-1",
                                        colors.card,
                                        colors.cardBgHover,
                                        colors.hover,
                                        cardClassName
                                    )}
                                >
                                    {/* Badge numéroté */}
                                    <div
                                        className={cn(
                                            "flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center",
                                            "rounded-full text-base sm:text-xl font-bold transition-all duration-300",
                                            "motion-safe:group-hover:scale-110",
                                            colors.accent
                                        )}
                                    >
                                        {index + 1}
                                    </div>

                                    {/* Contenu */}
                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className={cn(
                                                "mb-2 text-lg sm:text-xl font-semibold leading-tight transition-colors duration-300 text-foreground"
                                            )}
                                        >
                                            {item.title}
                                        </h3>

                                        {item.desc && (
                                            <p
                                                className={cn(
                                                    "text-sm sm:text-base leading-relaxed transition-colors duration-300",
                                                    "text-muted-foreground",
                                                    colors.hoverTextColor
                                                )}
                                            >
                                                {item.desc}
                                            </p>
                                        )}

                                        {/* Métrique optionnelle */}
                                        {item.metric && (
                                            <div className="mt-3 inline-flex items-center gap-2">
                                                <span className={cn(
                                                    "text-xs font-medium px-2.5 py-1 rounded-full border transition-all duration-300",
                                                    colors.badge,
                                                    colors.badgeHover
                                                )}>
                                                    {item.metric}
                                                </span>
                                            </div>
                                        )}
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