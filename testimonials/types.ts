import type { ReactNode } from "react";
import { ColorVariant } from "@/lib/color-mapping";
import type { CustomHeaderProps } from "@/components/ui/CustomHeader";

export type TestimonialsVariant = 
  | "cards"           // Cartes horizontales avec navigation (comme l'image)
  | "carousel"        // Carrousel avec autoplay
  | "grid"            // Grille statique de témoignages
  | "featured";       // Un témoignage principal + petits à côté

export type Testimonial = {
  // Contenu principal
  quote: string;
  
  // Auteur
  author: {
    name: string;
    role: string;
    company?: string;
    avatar?: string; // URL ou placeholder
  };
  
  // Optionnel
  rating?: number; // 1-5 étoiles
  img?: string; // Image d'illustration (projet/résultat)
  
  // Style spécifique (override le global)
  colorVariant?: ColorVariant;
};

export type TestimonialsProps = {
  // Content
  header: CustomHeaderProps;
  variant: TestimonialsVariant;
  testimonials: Testimonial[];
  
  // Navigation (pour cards/carousel)
  showNavigation?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number; // en ms
  
  // Styles - système unifié
  colorVariant?: ColorVariant;
  cardClassName?: string;
  quoteClassName?: string;
};