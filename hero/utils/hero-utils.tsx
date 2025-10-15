"use client"

import { cn } from "@/lib/utils"
import { colorClasses, type ColorVariant } from "@/lib/color-mapping"
import type { TextSegment, HeroBackground } from "../types"
import { ReactNode, Fragment } from "react"

/**
 * Rend du texte avec des segments colorés/stylisés
 * Supporte à la fois les strings simples et les tableaux de TextSegment
 */
export function renderTextWithSegments(
  text: string | TextSegment[],
  className?: string
): ReactNode {
  // Si c'est une string simple, on la retourne directement
  if (typeof text === "string") {
    return <span className={className}>{text}</span>
  }

  // Sinon, on traite chaque segment individuellement
  return (
    <>
      {text.map((segment, index) => {
        // Récupère les classes de couleur si un colorVariant est défini
        const colors = segment.colorVariant
          ? colorClasses(segment.colorVariant)
          : null

        // Vérifie si le segment contient un saut de ligne
        const hasLineBreak = segment.text.startsWith('\n') || segment.text.startsWith('\r')
        const cleanText = segment.text.replace(/^[\n\r]+/, '').replace(/[\n\r]+$/, '')

        return (
          <Fragment key={index}>
            {/* Ajoute un <br> si le segment commence par \n ou \r */}
            {hasLineBreak && <br />}

            <span
              className={cn(
                className,
                segment.bold && "font-bold",
                segment.italic && "italic",
                segment.gradient && colors?.text,
              )}
            >
              {cleanText}
            </span>

            {/* Ajoute un espace entre les segments sauf pour le dernier ou si ligne suivante */}
            {index < text.length - 1 && cleanText && !text[index + 1]?.text.startsWith('\n') && " "}
          </Fragment>
        )
      })}
    </>
  )
}

/**
 * Génère les classes CSS pour le background selon son type
 * Gère : gradient, solid, image, parallax, video, none
 * Les particules sont gérées séparément via AnimatedBackground
 */
export function getBackgroundClasses(
  background?: HeroBackground,
  colorVariant?: ColorVariant
): string {
  if (!background) return "bg-background"

  const colors = colorClasses(background.colorVariant || colorVariant || "neutral")

  switch (background.type) {
    case "gradient":
      return cn(
        "bg-gradient-to-br",
        "from-brand-light/50 via-background to-brand-accent-light/50",
        "dark:from-brand-dark/20 dark:via-background dark:to-brand-accent-dark/20"
      )

    case "gradient-solid":
      return cn(
        "bg-gradient-to-l",
        "from-brand-light to-brand-accent-light",
        "dark:from-brand-dark dark:to-brand-accent-dark"
      )

    case "solid":
      // Couleur unie basée sur le colorVariant
      return cn("bg-background", colors.card)

    case "image":
    case "parallax":
      // Pour les images, le background est géré par le composant Image
      // On applique juste une couleur de fallback
      return "bg-background"

    case "video":
      // Pour les vidéos, on utilise un fond noir par défaut
      return "bg-black"

    case "none":
      return "bg-background"

    default:
      return "bg-background"
  }
}

/**
 * Gère l'espacement vertical de la section
 * Options : compact | default | comfortable | spacious
 */
export function getSpacingClasses(spacing?: string): string {
  switch (spacing) {
    case "compact":
      return "py-12 sm:py-16"
    case "comfortable":
      return "py-32 sm:py-40"
    case "spacious":
      return "py-40 sm:py-48 lg:py-56"
    case "default":
    default:
      return "py-24 sm:py-32"
  }
}

/**
 * Obtient les classes de largeur maximale du contenu
 * Options : sm | md | lg | xl | full
 */
export function getMaxWidthClasses(maxWidth?: string): string {
  switch (maxWidth) {
    case "sm":
      return "max-w-2xl"
    case "md":
      return "max-w-3xl"
    case "lg":
      return "max-w-4xl"
    case "xl":
      return "max-w-5xl"
    case "full":
      return "max-w-full"
    default:
      return "max-w-3xl"
  }
}

/**
 * Obtient les classes d'alignement du contenu
 * Options : left | center | right
 */
export function getAlignClasses(align?: string): string {
  switch (align) {
    case "left":
      return "text-left items-start"
    case "right":
      return "text-right items-end"
    case "center":
    default:
      return "text-center items-center"
  }
}