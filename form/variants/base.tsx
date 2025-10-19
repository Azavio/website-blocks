"use client"

import { useState, useCallback, FormEvent } from "react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { FormProps, FormField, FormSection } from "../types"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function BaseVariant({
  header,
  fields,
  sections,
  config,
  buttons,
  buttonsAlign = "right",
  colorVariant,
  className,
  formClassName,
  fieldClassName,
  showRequiredIndicator = true,
  showFieldIcons = true,
  responsive = true,
  initialData = {},
}: FormProps) {
  const colors = colorClasses(colorVariant ?? "neutral")
  
  // État du formulaire
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Gestion des changements
  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
    
    // Clear error on change
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
    
    // Callback externe
    config?.onChange?.(fieldName, value)
    
    // Validation on change si activé
    if (config?.validateOnChange) {
      validateField(fieldName, value)
    }
  }, [config, errors])
  
  // Validation d'un champ
  const validateField = (fieldName: string, value: any): string | null => {
    // Trouver le champ
    const field = getAllFields().find(f => f.name === fieldName)
    if (!field) return null
    
    // Validation required
    if (field.required && !value) {
      return `${field.label} est requis`
    }
    
    // Validations custom
    if (field.validation) {
      for (const rule of field.validation) {
        switch (rule.type) {
          case "required":
            if (!value) return rule.message || `${field.label} est requis`
            break
          case "email":
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
              return rule.message || "Email invalide"
            break
          case "minLength":
            if (value && value.length < rule.value)
              return rule.message || `Minimum ${rule.value} caractères`
            break
          case "maxLength":
            if (value && value.length > rule.value)
              return rule.message || `Maximum ${rule.value} caractères`
            break
          case "pattern":
            if (value && !new RegExp(rule.value).test(value))
              return rule.message || "Format invalide"
            break
          case "custom":
            if (rule.validator && !rule.validator(value))
              return rule.message || "Validation échouée"
            break
        }
      }
    }
    
    return null
  }
  
  // Récupérer tous les champs (depuis fields ou sections)
  const getAllFields = (): FormField[] => {
    if (fields) return fields
    if (sections) return sections.flatMap(s => s.fields)
    return []
  }
  
  // Soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (config?.isDisabled || isSubmitting) return
    
    setIsSubmitting(true)
    setShowSuccess(false)
    
    // Validation complète
    const newErrors: { [key: string]: string } = {}
    getAllFields().forEach(field => {
      const error = validateField(field.name, formData[field.name])
      if (error) newErrors[field.name] = error
    })
    
    // Validation custom globale
    if (config?.onValidate) {
      const customErrors = config.onValidate(formData)
      if (customErrors) {
        Object.assign(newErrors, customErrors)
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }
    
    // Soumission
    try {
      await config?.onSubmit?.(formData)
      setShowSuccess(true)
      
      // Reset si configuré
      if (config?.resetOnSubmit) {
        setFormData(initialData)
      }
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Rendu d'un champ
  const renderField = (field: FormField, index: number) => {
    const fieldValue = formData[field.name] ?? field.defaultValue ?? ""
    const fieldError = errors[field.name]
    const isDisabled = config?.isDisabled || field.disabled
    
    // Custom render
    if (field.customRender) {
      return field.customRender(field)
    }
    
    // Classes de largeur pour les colonnes
    const colSpanClasses = {
      "1": "md:col-span-1",
      "2": "md:col-span-2",
      "full": "col-span-full"
    }
    
    return (
      <ScrollAnimation
        key={field.id}
        animation="fadeIn"
        delay={index * 0.05}
        className={cn(
          "space-y-2",
          colSpanClasses[field.colSpan || "1"],
          field.className
        )}
      >
        {/* Label */}
        {field.label && field.type !== "checkbox" && field.type !== "switch" && (
          <Label
            htmlFor={field.id}
            className={cn(
              "text-sm font-medium",
              fieldError && "text-destructive"
            )}
          >
            {field.label}
            {showRequiredIndicator && field.required && (
              <span className="ml-1 text-destructive">*</span>
            )}
          </Label>
        )}
        
        {/* Description */}
        {field.description && (
          <p className="text-xs text-muted-foreground">{field.description}</p>
        )}
        
        {/* Champ selon le type */}
        <div className="relative">
          {/* Icône gauche */}
          {showFieldIcons && field.icon && field.iconPosition === "left" && (
            <Icon
              name={field.icon}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10"
            />
          )}
          
          {/* Input text et variantes */}
          {["text", "email", "password", "tel", "url", "number", "date", "time", "datetime-local"].includes(field.type) && (
            <Input
              id={field.id}
              name={field.name}
              type={field.type as any}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              onBlur={() => config?.validateOnBlur && validateField(field.name, fieldValue)}
              placeholder={field.placeholder}
              disabled={isDisabled}
              readOnly={field.readOnly}
              min={field.min}
              max={field.max}
              step={field.step}
              className={cn(
                fieldClassName,
                showFieldIcons && field.icon && field.iconPosition === "left" && "pl-10",
                showFieldIcons && field.icon && field.iconPosition === "right" && "pr-10",
                fieldError && "border-destructive focus:ring-destructive"
              )}
            />
          )}
          
          {/* Textarea */}
          {field.type === "textarea" && (
            <Textarea
              id={field.id}
              name={field.name}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              onBlur={() => config?.validateOnBlur && validateField(field.name, fieldValue)}
              placeholder={field.placeholder}
              disabled={isDisabled}
              readOnly={field.readOnly}
              rows={field.rows || 4}
              className={cn(
                fieldClassName,
                fieldError && "border-destructive focus:ring-destructive"
              )}
            />
          )}
          
          {/* Select */}
          {field.type === "select" && field.options && (
            <Select
              value={fieldValue}
              onValueChange={(value) => handleFieldChange(field.name, value)}
              disabled={isDisabled}
            >
              <SelectTrigger
                id={field.id}
                className={cn(
                  fieldClassName,
                  fieldError && "border-destructive focus:ring-destructive"
                )}
              >
                <SelectValue placeholder={field.placeholder || "Sélectionner..."} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon && <Icon name={option.icon} className="h-4 w-4" />}
                      <span>{option.label}</span>
                    </div>
                    {option.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {/* Checkbox simple */}
          {field.type === "checkbox" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.id}
                checked={fieldValue}
                onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
                disabled={isDisabled}
              />
              <Label
                htmlFor={field.id}
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  fieldError && "text-destructive"
                )}
              >
                {field.label}
                {showRequiredIndicator && field.required && (
                  <span className="ml-1 text-destructive">*</span>
                )}
              </Label>
            </div>
          )}
          
          {/* Checkbox group */}
          {field.type === "checkbox-group" && field.options && (
            <div className="space-y-3">
              {field.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${option.value}`}
                    checked={Array.isArray(fieldValue) && fieldValue.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const currentValues = Array.isArray(fieldValue) ? fieldValue : []
                      const newValues = checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(v => v !== option.value)
                      handleFieldChange(field.name, newValues)
                    }}
                    disabled={isDisabled || option.disabled}
                  />
                  <Label
                    htmlFor={`${field.id}-${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
          
          {/* Radio group */}
          {field.type === "radio-group" && field.options && (
            <RadioGroup
              value={fieldValue}
              onValueChange={(value) => handleFieldChange(field.name, value)}
              disabled={isDisabled}
            >
              {field.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`${field.id}-${option.value}`}
                    disabled={option.disabled}
                  />
                  <Label
                    htmlFor={`${field.id}-${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          
          {/* Switch */}
          {field.type === "switch" && (
            <div className="flex items-center space-x-2">
              <Switch
                id={field.id}
                checked={fieldValue}
                onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
                disabled={isDisabled}
              />
              <Label
                htmlFor={field.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {field.label}
              </Label>
            </div>
          )}
          
          {/* Range */}
          {field.type === "range" && (
            <div className="space-y-2">
              <Slider
                id={field.id}
                value={[fieldValue || 0]}
                onValueChange={([value]) => handleFieldChange(field.name, value)}
                min={Number(field.min) || 0}
                max={Number(field.max) || 100}
                step={Number(field.step) || 1}
                disabled={isDisabled}
                className={cn(fieldClassName)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{field.min || 0}</span>
                <span className="font-medium">{fieldValue || 0}</span>
                <span>{field.max || 100}</span>
              </div>
            </div>
          )}
          
          {/* File */}
          {field.type === "file" && (
            <Input
              id={field.id}
              name={field.name}
              type="file"
              onChange={(e) => handleFieldChange(field.name, e.target.files)}
              accept={field.accept}
              multiple={field.multiple}
              disabled={isDisabled}
              className={cn(
                fieldClassName,
                fieldError && "border-destructive focus:ring-destructive"
              )}
            />
          )}
          
          {/* Color */}
          {field.type === "color" && (
            <Input
              id={field.id}
              name={field.name}
              type="color"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              disabled={isDisabled}
              className={cn(
                fieldClassName,
                "h-12 cursor-pointer",
                fieldError && "border-destructive focus:ring-destructive"
              )}
            />
          )}
          
          {/* Icône droite */}
          {showFieldIcons && field.icon && field.iconPosition === "right" && (
            <Icon
              name={field.icon}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10"
            />
          )}
        </div>
        
        {/* Helper text */}
        {field.helperText && !fieldError && (
          <p className="text-xs text-muted-foreground">{field.helperText}</p>
        )}
        
        {/* Error message */}
        {fieldError && (
          <p className="text-xs text-destructive">{fieldError}</p>
        )}
      </ScrollAnimation>
    )
  }
  
  // Rendu d'une section
  const renderSection = (section: FormSection, sectionIndex: number) => {
    const sectionColors = colorClasses(section.colorVariant ?? colorVariant ?? "neutral")
    const gridCols = section.columns === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
    
    return (
      <ScrollAnimation
        key={section.id}
        animation="slideInUp"
        delay={sectionIndex * 0.1}
      >
        <div className={cn("space-y-6", section.className)}>
          {/* En-tête de section */}
          {(section.title || section.subtitle) && (
            <div className="space-y-1">
              {section.title && (
                <h3 className={cn(
                  "text-lg font-semibold",
                  sectionColors.textContentGradient
                )}>
                  {section.title}
                </h3>
              )}
              {section.subtitle && (
                <p className="text-sm text-muted-foreground">{section.subtitle}</p>
              )}
              {section.description && (
                <p className="text-sm text-muted-foreground mt-2">{section.description}</p>
              )}
            </div>
          )}
          
          {/* Champs de la section */}
          <div className={cn("grid gap-4 sm:gap-6", gridCols)}>
            {section.fields.map((field, index) => renderField(field, sectionIndex * 10 + index))}
          </div>
          
          {/* Divider */}
          {section.showDivider && sectionIndex < (sections?.length || 0) - 1 && (
            <hr className="my-8 border-t border-border" />
          )}
        </div>
      </ScrollAnimation>
    )
  }
  
  // Alignement des boutons
  const buttonAlignClasses = {
    "left": "justify-start",
    "center": "justify-center",
    "right": "justify-end",
    "space-between": "justify-between"
  }
  
  return (
    <div className={cn("relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8", className)}>
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}
      
      {/* Messages de statut */}
      {showSuccess && config?.successMessage && (
        <ScrollAnimation animation="slideInUp">
          <div className={cn(
            "mb-6 rounded-lg p-4 text-sm",
            colorClasses("success").card
          )}>
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" className="h-4 w-4" />
              <span>{config.successMessage}</span>
            </div>
          </div>
        </ScrollAnimation>
      )}
      
      {config?.errorMessage && (
        <ScrollAnimation animation="slideInUp">
          <div className={cn(
            "mb-6 rounded-lg p-4 text-sm",
            colorClasses("destructive").card
          )}>
            <div className="flex items-center gap-2">
              <Icon name="AlertCircle" className="h-4 w-4" />
              <span>{config.errorMessage}</span>
            </div>
          </div>
        </ScrollAnimation>
      )}
      
      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          "space-y-8",
          formClassName
        )}
      >
        {/* Rendu avec sections */}
        {sections && sections.map((section, index) => renderSection(section, index))}
        
        {/* Rendu simple (sans sections) */}
        {!sections && fields && (
          <div className={cn(
            "grid gap-4 sm:gap-6",
            responsive ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          )}>
            {fields.map((field, index) => renderField(field, index))}
          </div>
        )}
        
        {/* Boutons */}
        {buttons && buttons.length > 0 && (
          <ScrollAnimation animation="slideInUp" delay={0.2}>
            <div className={cn(
              "flex flex-col gap-3 sm:flex-row pt-6 border-t border-border",
              buttonAlignClasses[buttonsAlign]
            )}>
              {buttons.map((button, index) => {
                const isSubmitButton = button.type === "submit" || (!button.type && index === 0)
                
                return (
                  <Button
                    key={index}
                    type={button.type || (index === 0 ? "submit" : "button")}
                    variant={button.variant || (index === 0 ? "default" : "outline")}
                    onClick={button.onClick}
                    disabled={button.disabled || (isSubmitButton && (isSubmitting || config?.isDisabled))}
                    className={cn(
                      "transition-all duration-300",
                      index === 0 && colors.accent
                    )}
                  >
                    {button.loading || (isSubmitButton && isSubmitting) ? (
                      <>
                        <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      <>
                        {button.icon && button.iconPosition === "left" && (
                          <Icon name={button.icon} className="mr-2 h-4 w-4" />
                        )}
                        {button.text}
                        {button.icon && button.iconPosition !== "left" && (
                          <Icon name={button.icon} className="ml-2 h-4 w-4" />
                        )}
                      </>
                    )}
                  </Button>
                )
              })}
            </div>
          </ScrollAnimation>
        )}
      </form>
    </div>
  )
}