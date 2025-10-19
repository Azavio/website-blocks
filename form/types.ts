import type { ReactNode } from "react";
import { ColorVariant } from "@/lib/color-mapping";
import type { CustomHeaderProps } from "@/components/ui/CustomHeader";

export type FormVariant = 
  | "base"           // Formulaire standard avec layout 2 colonnes
  | "minimal"        // Formulaire épuré single column
  | "wizard"         // Formulaire multi-étapes
  | "survey";        // Formulaire type questionnaire

// Types de champs supportés
export type FieldType = 
  | "text"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "number"
  | "date"
  | "time"
  | "datetime-local"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "checkbox-group"
  | "radio"
  | "radio-group"
  | "switch"
  | "file"
  | "range"
  | "color"
  | "rating"
  | "custom";

// Options pour select, radio, checkbox-group
export type FieldOption = {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: string;
  description?: string;
};

// Règles de validation
export type ValidationRule = {
  type: "required" | "min" | "max" | "minLength" | "maxLength" | "pattern" | "email" | "url" | "custom";
  value?: any;
  message?: string;
  validator?: (value: any) => boolean | Promise<boolean>;
};

// Configuration d'un champ
export type FormField = {
  // Identification
  id: string;
  name: string;
  type: FieldType;
  
  // Labels et textes
  label: string;
  placeholder?: string;
  description?: string;
  helperText?: string;
  
  // Valeurs
  defaultValue?: any;
  value?: any;
  
  // Options (pour select, radio, checkbox-group)
  options?: FieldOption[];
  
  // Configuration spécifique
  rows?: number; // Pour textarea
  min?: number | string; // Pour number, date, range
  max?: number | string; // Pour number, date, range
  step?: number | string; // Pour number, range
  accept?: string; // Pour file
  multiple?: boolean; // Pour select, file
  
  // État et validation
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  validation?: ValidationRule[];
  
  // Layout
  colSpan?: "1" | "2" | "full"; // Occupation en colonnes
  
  // Styles
  className?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  
  // Custom render
  customRender?: (field: FormField) => ReactNode;
};

// Section de formulaire (pour organiser les champs)
export type FormSection = {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  fields: FormField[];
  
  // Layout
  columns?: 1 | 2; // Nombre de colonnes dans la section
  
  // Styles
  colorVariant?: ColorVariant;
  className?: string;
  showDivider?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
};

// Boutons d'action
export type FormButton = {
  text: string;
  type?: "submit" | "reset" | "button";
  variant?: "default" | "secondary" | "outline" | "ghost";
  onClick?: (data?: any) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
};

// Configuration du formulaire
export type FormConfig = {
  // Handlers
  onSubmit?: (data: any) => void | Promise<void>;
  onChange?: (fieldName: string, value: any) => void;
  onValidate?: (data: any) => { [key: string]: string } | null;
  
  // Options
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  resetOnSubmit?: boolean;
  
  // Layout
  layout?: "default" | "horizontal" | "inline";
  labelPosition?: "top" | "left" | "floating";
  
  // État
  isLoading?: boolean;
  isDisabled?: boolean;
  
  // Messages
  successMessage?: string;
  errorMessage?: string;
};

export type FormProps = {
  // Content
  variant: FormVariant;
  header?: CustomHeaderProps;
  
  // Structure du formulaire
  fields?: FormField[]; // Pour formulaire simple
  sections?: FormSection[]; // Pour formulaire avec sections
  
  // Configuration
  config?: FormConfig;
  
  // Boutons
  buttons?: FormButton[];
  buttonsAlign?: "left" | "center" | "right" | "space-between";
  
  // Styles
  colorVariant?: ColorVariant;
  className?: string;
  formClassName?: string;
  fieldClassName?: string;
  
  // Options d'affichage
  showRequiredIndicator?: boolean;
  showFieldIcons?: boolean;
  responsive?: boolean;
  
  // Données initiales
  initialData?: { [key: string]: any };
};