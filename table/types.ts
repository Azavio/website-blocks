import type { ReactNode } from "react";
import { ColorVariant } from "@/lib/color-mapping";
import type { CustomHeaderProps } from "@/components/ui/CustomHeader"


export type TableVariant =
  | "comparison"      // Tableau comparatif 3 colonnes (critères vs solutions)
  | "advanced"        // Tableau avec métriques et badges d'amélioration
  | "pros-cons"       // Tableau avantages/inconvénients 2 colonnes
  | "simple";         // Tableau de fonctionnalités basique

export type TableItem = {
  text: string;
  icon?: string;
};

// Cellule unifiée - gère tous les cas d'usage
export type TableCell = {
  // Contenu principal
  content: string | ReactNode;

  // Éléments visuels
  icon?: string;
  badge?: string;

  // Pour les listes (pros/cons)
  items?: (string | TableItem)[];
  itemsVariant?: "success" | "destructive" | "warning" | "default";

  // Pour les métriques/comparaisons
  metric?: string;
  improvement?: string;
  improvementType?: "positive" | "negative" | "neutral";

  // Structure et style
  isHeader?: boolean;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  align?: "left" | "center" | "right";

  // Couleur pour headers spéciaux - MODERNISÉ
  colorVariant?: ColorVariant; // Remplace "color" par "colorVariant"
  subtitle?: string;
};

// Ligne du tableau
export type TableRow = {
  cells: TableCell[];
  className?: string;
  isHeader?: boolean;
};

export type TableProps = {
  // Content
  variant: TableVariant;
  header: CustomHeaderProps;

  // Données unifiées du tableau
  rows: TableRow[];

  // Bouton optionnel
  button?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "secondary" | "outline";
  };

  // Styles - MODERNISÉ
  colorVariant?: ColorVariant; // Remplace "color" par "colorVariant"
  className?: string;
  tableClassName?: string;

  // Options d'affichage
  showStripes?: boolean;
  showBorder?: boolean;
  stickyHeader?: boolean;
  responsive?: boolean;
};