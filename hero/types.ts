import type { ReactNode } from "react";
import { ColorVariant } from "@/lib/color-mapping";

export type HeroVariant = "centered" | "split" | "minimal" | "fullscreen";

export type BackgroundType = 
  | "solid"       // Dégradé de couleurs
  | "gradient"       // Dégradé de couleurs
  | "gradient-solid"       // Dégradé de couleurs
  | "particles"      // Particules animées
  | "image"          // Image statique
  | "parallax"       // Image avec effet parallaxe
  | "video"          // Vidéo en background
  | "none";          // Pas de background

export type TextSegment = {
  text: string;
  colorVariant?: ColorVariant;  // Pour colorer différemment des parties du texte
  gradient?: boolean;            // Appliquer un gradient sur ce segment
  bold?: boolean;                // Mettre en gras
  italic?: boolean;              // Mettre en italique
};

export type HeroButton = {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  colorVariant?: ColorVariant;  // Pour personnaliser la couleur du bouton
  icon?: string;                // Icône à afficher (Lucide)
  iconPosition?: "left" | "right";
};

export type HeroBackground = {
  type: BackgroundType;
  
  // Pour type "gradient"
  colorVariant?: ColorVariant;
  
  // Pour type "image" ou "parallax"
  image?: string;
  imageAlt?: string;
  imagePosition?: "center" | "top" | "bottom" | "left" | "right";
  imageOpacity?: number;  // 0 à 1
  overlay?: boolean;      // Ajouter un overlay sombre
  overlayOpacity?: number;
  
  // Pour type "video"
  videoSrc?: string;
  videoPoster?: string;
  
  animated?: boolean;
  animatedVariant?: "gradient" | "particles" | "waves";
};

export type HeroContent = {
  // Texte principal (peut être un string simple ou des segments)
  heading: string | TextSegment[];
  headingLevel?: "h1" | "h2";  // Sémantique HTML
  
  // Sous-titre/description
  subheading?: string | TextSegment[];
  
  // Texte additionnel
  text?: string;
  textStrong?: string;  // Partie en gras dans le texte
  
  // Alignement
  align?: "left" | "center" | "right";
  
  // Taille maximale du contenu
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
};

export type HeroProps = {
  // Variante du layout
  variant: HeroVariant;
  
  // Contenu
  content: HeroContent;
  
  // Boutons d'action
  buttons?: HeroButton[];
  
  // Background
  background?: HeroBackground;
  
  // Image pour variant "split" (moitié droite)
  splitImage?: string;
  splitImageAlt?: string;
  
  // Styles globaux
  colorVariant?: ColorVariant;
  className?: string;
  contentClassName?: string;
  
  // Padding vertical
  spacing?: "compact" | "default" | "comfortable" | "spacious";
};