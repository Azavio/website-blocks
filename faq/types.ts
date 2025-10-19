import type { ReactNode } from "react";
import { ColorVariant } from "@/lib/color-mapping";
import type { CustomHeaderProps } from "@/components/ui/CustomHeader";

export type FAQVariant =
    | "accordion-outline"  // Accordéon avec bordures
    | "accordion-filled"   // Accordéon avec fond coloré
    | "cards"             // Cartes individuelles
    | "two-columns";      // Disposition 2 colonnes

export type FAQItem = {
    // Identification
    id?: string;

    // Contenu
    question: string;
    answer: string | ReactNode;

    // Métadonnées
    category?: string;
    tags?: string[];

    // Visuels optionnels
    icon?: string;

    // Styles
    colorVariant?: ColorVariant;

    // État par défaut
    defaultOpen?: boolean;
};

export type FAQProps = {
    // Content
    header?: CustomHeaderProps;
    variant: FAQVariant;
    items: FAQItem[];

    // Styles - système unifié
    colorVariant?: ColorVariant;
    className?: string;
    itemClassName?: string;

    // Options d'affichage et de filtrage
    showCategory?: boolean;
    showTags?: boolean;
    showIcons?: boolean;
    tagFilter?: boolean;      // Active le système de filtrage par tags
    searchItems?: boolean;    // Active la recherche

    // Comportement de l'accordéon
    allowMultiple?: boolean;  // Permet d'ouvrir plusieurs items en même temps
    defaultOpenFirst?: boolean; // Ouvre le premier item par défaut
};