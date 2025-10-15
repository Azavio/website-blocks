"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { TableProps } from "../types"
import { Fragment } from "react"
import { CustomHeader } from "@/components/ui/CustomHeader"

export default function ComparisonVariant({
  header,
  rows,
  colorVariant,
  className,
  tableClassName,
  button,
}: TableProps) {

  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? "neutral")

  // Séparer headers et body rows
  const headerRow = rows.find(row => row.isHeader);
  const bodyRows = rows.filter(row => !row.isHeader);

  // Couleurs par défaut pour les colonnes
  const col1Colors = colorClasses("neutral") // Critères
  const col2Colors = colorClasses("destructive") // Solutions classiques
  const col3Colors = colorClasses("success") // Notre approche

  return (
    <div className={cn("relative mx-auto max-w-7xl px-6 lg:px-8", className)}>
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block">
        <ScrollAnimation animation="slideInUp" delay={0.1}>
          <div className={cn(
            "overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-300",
            "bg-background/50 border",
            globalColors.card,
            tableClassName
          )}>
            <div className="grid md:grid-cols-3 items-stretch">
              {/* Headers */}
              {headerRow && headerRow.cells.map((cell, cellIndex) => {
                const cellColors = colorClasses(
                  cell.colorVariant ??
                  (cellIndex === 0 ? "neutral" :
                    cellIndex === 1 ? "destructive" :
                      "success")
                )

                return (
                  <div
                    key={cellIndex}
                    className={cn(
                      "p-6 text-center transition-all duration-300",
                      cellIndex ? cellColors.badge : cellColors.accent,
                      cellIndex > 0 && "border-l border-border",
                      cell.className
                    )}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {cell.icon && (
                        <Icon
                          name={cell.icon}
                          className={cn("text-xl", cellColors.text)}
                        />
                      )}
                      <h3 className={cn(
                        "text-lg sm:text-xl font-bold transition-colors",
                      )}>
                        {cell.content}
                      </h3>
                      {cell.badge && (
                        <Badge className={cn("text-xs", cellColors.badge)}>
                          {cell.badge}
                        </Badge>
                      )}
                    </div>
                    {cell.subtitle && (
                      <p className="mt-2 text-sm opacity-80 text-muted-foreground">
                        {cell.subtitle}
                      </p>
                    )}
                  </div>
                )
              })}

              {/* Body Rows */}
              {bodyRows.map((row, rowIndex) => (
                <Fragment key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => {
                    const cellColors = colorClasses(
                      cell.colorVariant ??
                      (cellIndex === 0 ? "neutral" :
                        cellIndex === 1 ? "destructive" :
                          "success")
                    )

                    return (
                      <ScrollAnimation
                        key={`${rowIndex}-${cellIndex}`}
                        animation={
                          cellIndex === 0 ? "slideInLeft" :
                            cellIndex === 1 ? "slideInUp" : "slideInRight"
                        }
                        delay={rowIndex * 0.15 + cellIndex * 0.05}
                      >
                        <div className={cn(
                          "h-full px-6 py-6 border-t transition-all duration-300 hover:bg-opacity-80",
                          cellColors.card,
                          "bg-gradient-to-r border-l border-border border-muted-foreground/30 dark:border-muted-foreground/30",
                          cell.className
                        )}>
                          <div className="flex items-center gap-3 h-full">
                            {cell.icon && (
                              <Icon
                                name={cell.icon}
                                className={cn(
                                  "text-lg flex-shrink-0 transition-colors"
                                )}
                              />
                            )}
                            <div className="flex-1">
                              <div className={cn(
                                "text-base transition-colors",
                                cellIndex === 0 && "font-semibold text-lg"
                              )}>
                                {cell.content}
                              </div>
                              {cell.badge && cellIndex !== 0 && (
                                <div className="mt-2">
                                  <Badge className={cn("text-xs", cellColors.badge)}>
                                    {cell.badge}
                                  </Badge>
                                </div>
                              )}
                              {cell.metric && (
                                <div className="mt-1 text-sm text-muted-foreground">
                                  {cell.metric}
                                </div>
                              )}
                              {cell.subtitle && (
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {cell.subtitle}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </ScrollAnimation>
                    )
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {bodyRows.map((row, rowIndex) => (
          <ScrollAnimation
            key={rowIndex}
            animation="slideInUp"
            delay={rowIndex * 0.1}
          >
            <div className={cn(
              "rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md",
              globalColors.card,
              row.className
            )}>
              {/* Critère */}
              <div className="mb-4 pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  {row.cells[0]?.icon && (
                    <Icon
                      name={row.cells[0].icon}
                      className={cn(
                        "text-lg",
                        row.cells[0]?.colorVariant
                          ? colorClasses(row.cells[0].colorVariant).text
                          : col1Colors.text
                      )}
                    />
                  )}
                  <h4 className={cn(
                    "font-semibold text-base sm:text-lg",
                    row.cells[0]?.colorVariant
                      ? colorClasses(row.cells[0].colorVariant).textContentGradient
                      : col1Colors.textContentGradient
                  )}>
                    {row.cells[0]?.content}
                  </h4>
                  {row.cells[0]?.badge && (
                    <Badge className={cn(
                      "text-xs",
                      row.cells[0]?.colorVariant
                        ? colorClasses(row.cells[0].colorVariant).badge
                        : col1Colors.badge
                    )}>
                      {row.cells[0].badge}
                    </Badge>
                  )}
                </div>
                {row.cells[0]?.subtitle && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.cells[0].subtitle}
                  </p>
                )}
              </div>

              {/* Comparaison */}
              <div className="space-y-3">
                {/* Solution classique */}
                {row.cells[1] && (
                  <div className="flex items-start gap-3">
                    <span className={cn(
                      "text-lg flex-shrink-0",
                      row.cells[1]?.colorVariant
                        ? colorClasses(row.cells[1].colorVariant).text
                        : col2Colors.text
                    )}>✗</span>
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm",
                        row.cells[1]?.colorVariant
                          ? colorClasses(row.cells[1].colorVariant).text
                          : col2Colors.text
                      )}>
                        {row.cells[1].content}
                      </p>
                      {row.cells[1].badge && (
                        <div className="mt-1">
                          <Badge className={cn(
                            "text-xs",
                            row.cells[1]?.colorVariant
                              ? colorClasses(row.cells[1].colorVariant).badge
                              : col2Colors.badge
                          )}>
                            {row.cells[1].badge}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notre approche */}
                {row.cells[2] && (
                  <div className="flex items-start gap-3">
                    <span className={cn(
                      "text-lg flex-shrink-0",
                      row.cells[2]?.colorVariant
                        ? colorClasses(row.cells[2].colorVariant).text
                        : col3Colors.text
                    )}>✓</span>
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm",
                        row.cells[2]?.colorVariant
                          ? colorClasses(row.cells[2].colorVariant).text
                          : col3Colors.text
                      )}>
                        {row.cells[2].content}
                      </p>
                      {row.cells[2].badge && (
                        <div className="mt-1">
                          <Badge className={cn(
                            "text-xs",
                            row.cells[2]?.colorVariant
                              ? colorClasses(row.cells[2].colorVariant).badge
                              : col3Colors.badge
                          )}>
                            {row.cells[2].badge}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Métadonnées */}
              {row.cells.some(cell => cell.metric) && (
                <div className="mt-3 pt-3 border-t border-border">
                  {row.cells.map((cell, cellIndex) =>
                    cell.metric ? (
                      <p key={cellIndex} className="text-xs text-muted-foreground">
                        {cell.metric}
                      </p>
                    ) : null
                  )}
                </div>
              )}
            </div>
          </ScrollAnimation>
        ))}
      </div>

      {/* CTA Button */}
      {button && (
        <ScrollAnimation animation="slideInUp" delay={bodyRows.length * 0.15 + 0.2}>
          <div className="mt-8 sm:mt-12 text-center">
            <Button
              variant={button.variant || "outline"}
              size="lg"
              onClick={button.onClick}
              asChild={!!button.href}
              className={cn(
                "transition-all duration-300",
                colorVariant && globalColors.hover
              )}
            >
              {button.href ? (
                <a href={button.href}>
                  {button.text}
                  <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                </a>
              ) : (
                <>
                  {button.text}
                  <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </ScrollAnimation>
      )}
    </div>
  )
}