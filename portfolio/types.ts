import type { ReactNode } from "react";
import { ColorVariant } from "@/lib/color-mapping";
import type { CustomHeaderProps } from "@/components/ui/CustomHeader";

export type PortfolioVariant =
    | "grid"           // Grille classique avec cartes
    | "masonry"        // Disposition maçonnerie
    | "carousel"       // Carrousel avec navigation
    | "featured";      // Mise en avant avec item principal

export type PortfolioItem = {
    // Contenu principal
    title: string;
    description: string;

    // Visuels
    image: string;
    imageAlt?: string;

    // Métadonnées
    category?: string;
    tags?: string[];
    date?: string;

    // Navigation
    href?: string;
    onClick?: () => void;

    // Badges et métriques
    badge?: string;
    metric?: ReactNode;

    // Styles
    colorVariant?: ColorVariant;
    featured?: boolean; // Pour mettre en avant certains items
};

export type PortfolioProps = {
    // Content
    header: CustomHeaderProps;
    variant: PortfolioVariant;
    items: PortfolioItem[];

    // Bouton CTA optionnel
    button?: {
        text: string;
        href?: string;
        onClick?: () => void;
        variant?: "default" | "secondary" | "outline";
    };

    // Styles - système unifié
    colorVariant?: ColorVariant;
    className?: string;
    cardClassName?: string;

    // Options d'affichage
    showCategory?: boolean;
    showTags?: boolean;
    showDate?: boolean;
    columns?: 2 | 3 | 4; // Pour la variante grid
    tagFilter?: boolean; // Active le système de filtrage par tags
};