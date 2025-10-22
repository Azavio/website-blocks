import type { ReactNode } from "react";
import { ColorVariant } from "@/lib/color-mapping";

export type FooterVariant = 
  | "base"           // Footer complet avec colonnes + newsletter
  | "minimal"        // Uniquement copyright
  | "centered";      // Version centrée simplifiée

// Lien dans le footer
export type FooterLink = {
  label: string;
  href: string;
  icon?: string;
  external?: boolean; // Ouvre dans un nouvel onglet
  badge?: string;     // Badge optionnel (ex: "Nouveau")
};

// Colonne/Section du footer
export type FooterColumn = {
  title: string;
  links: FooterLink[];
  description?: string; // Description optionnelle sous le titre
};

// Configuration newsletter
export type NewsletterConfig = {
  enabled: boolean;
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  onSubmit?: (email: string) => void | Promise<void>;
  colorVariant?: ColorVariant;
};

// Informations de copyright
export type CopyrightConfig = {
  text: string;              // Ex: "© 2025 Azavio. Tous droits réservés."
  links?: FooterLink[];      // Liens additionnels (CGV, Politique, etc.)
  socials?: FooterLink[];    // Liens réseaux sociaux
  logo?: string;             // URL du logo
  logoAlt?: string;
};

export type FooterProps = {
  // Variante du footer
  variant: FooterVariant;
  
  // Colonnes de navigation (jusqu'à 3)
  columns?: FooterColumn[];
  
  // Newsletter (optionnelle)
  newsletter?: NewsletterConfig;
  
  // Copyright et bas de page
  copyright: CopyrightConfig;
  
  // Styles
  colorVariant?: ColorVariant;
  className?: string;
  
  // Options d'affichage
  showDivider?: boolean;     // Ligne de séparation avant copyright
  layout?: "default" | "compact"; // Layout serré ou aéré
};