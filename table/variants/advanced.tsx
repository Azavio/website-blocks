'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { TableProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function AdvancedVariant({
  header,
  rows,
  colorVariant,
  className,
  tableClassName,
  showBorder = true,
  button,
}: TableProps) {
  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? 'neutral')

  // Séparer headers et body rows
  const headerRow = rows.find(row => row.isHeader)
  const bodyRows = rows.filter(row => !row.isHeader)

  return (
    <section className={cn('py-16 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        {header && (
          <ScrollAnimation animation="slideInUp">
            <CustomHeader {...header} />
          </ScrollAnimation>
        )}

        <div className="mx-auto max-w-6xl">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <ScrollAnimation animation="slideInUp" delay={0.1}>
              <div
                className={cn(
                  'overflow-hidden rounded-2xl transition-all duration-300',
                  showBorder && cn('border', globalColors.card),
                  tableClassName,
                )}
              >
                {/* Header */}
                {headerRow && (
                  <div
                    className={cn(
                      'grid grid-cols-4 transition-colors',
                      globalColors.card,
                    )}
                  >
                    {headerRow.cells.map((cell, cellIndex) => {
                      const cellColors = colorClasses(
                        cell.colorVariant ?? colorVariant ?? 'neutral',
                      )

                      return (
                        <div
                          key={cellIndex}
                          className={cn(
                            'p-4 font-semibold transition-colors',
                            cell.className,
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {cell.icon && (
                              <Icon
                                name={cell.icon}
                                className={cn(
                                  'text-lg transition-colors',
                                  cell.colorVariant
                                    ? cellColors.text
                                    : 'text-muted-foreground',
                                )}
                              />
                            )}
                            <span
                              className={cn(
                                'transition-colors',
                                cell.colorVariant
                                  ? cellColors.textContentGradient
                                  : 'text-foreground',
                              )}
                            >
                              {cell.content}
                            </span>
                            {cell.badge && (
                              <Badge
                                className={cn(
                                  'text-xs',
                                  cell.colorVariant
                                    ? cellColors.badge
                                    : 'border-muted bg-muted text-muted-foreground',
                                )}
                              >
                                {cell.badge}
                              </Badge>
                            )}
                          </div>
                          {cell.subtitle && (
                            <p className="mt-1 text-sm font-normal text-muted-foreground">
                              {cell.subtitle}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Body */}
                {bodyRows.map((row, rowIndex) => (
                  <ScrollAnimation
                    key={rowIndex}
                    animation="slideInUp"
                    delay={0.15 + rowIndex * 0.05}
                  >
                    <div
                      className={cn(
                        'grid grid-cols-4 transition-all duration-300',
                        'hover:bg-muted/50',
                        showBorder && 'border-t border-border',
                        row.className,
                      )}
                    >
                      {row.cells.map((cell, cellIndex) => {
                        const cellColors = colorClasses(
                          cell.colorVariant ?? 'neutral',
                        )

                        return (
                          <div
                            key={cellIndex}
                            className={cn(
                              'p-4 font-medium transition-colors',
                              cellIndex === 0 && 'flex items-center gap-3',
                              cellIndex > 0 && 'flex items-center',
                              cell.className,
                            )}
                          >
                            {cellIndex === 0 ? (
                              // Première colonne avec icône
                              <>
                                {cell.icon && (
                                  <Icon
                                    name={cell.icon}
                                    className={cn(
                                      'h-5 w-5 transition-colors',
                                      cell.colorVariant
                                        ? cellColors.text
                                        : 'text-muted-foreground',
                                    )}
                                  />
                                )}
                                <span
                                  className={cn(
                                    'transition-colors',
                                    cell.colorVariant
                                      ? cellColors.textContentGradient
                                      : 'text-foreground',
                                  )}
                                >
                                  {cell.content}
                                </span>
                              </>
                            ) : cellIndex === 3 ? (
                              // Dernière colonne avec badge
                              <div className="flex items-center">
                                <Badge
                                  className={cn(
                                    'text-xs',
                                    cell.colorVariant
                                      ? cellColors.badge
                                      : 'border-muted bg-muted text-muted-foreground',
                                  )}
                                >
                                  {cell.badge || cell.content}
                                </Badge>
                              </div>
                            ) : (
                              // Colonnes du milieu
                              <div className="flex items-center gap-2">
                                {cell.icon && (
                                  <Icon
                                    name={cell.icon}
                                    className={cn(
                                      'text-lg transition-colors',
                                      cell.colorVariant
                                        ? cellColors.text
                                        : 'text-muted-foreground',
                                    )}
                                  />
                                )}
                                <span
                                  className={cn(
                                    'transition-colors',
                                    cell.colorVariant
                                      ? cellColors.textContentGradient
                                      : 'text-foreground',
                                  )}
                                >
                                  {cell.content}
                                </span>
                              </div>
                            )}

                            {/* Métadonnées */}
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
                        )
                      })}
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-6 md:hidden">
            {bodyRows.map((row, rowIndex) => {
              // Couleurs pour les colonnes "Avant" et "Après"
              const beforeColors = colorClasses(
                row.cells[1]?.colorVariant ?? 'destructive',
              )
              const afterColors = colorClasses(
                row.cells[2]?.colorVariant ?? 'success',
              )
              const improvementColors = colorClasses(
                row.cells[3]?.colorVariant ?? colorVariant ?? 'neutral',
              )

              return (
                <ScrollAnimation
                  key={rowIndex}
                  animation="slideInUp"
                  delay={0.1 + rowIndex * 0.05}
                >
                  <div
                    className={cn(
                      'rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg',
                      globalColors.card,
                      globalColors.cardBgHover,
                      row.className,
                    )}
                  >
                    {/* Aspect avec icône en header */}
                    <div className="mb-6 border-b border-border pb-4">
                      <div className="flex items-center gap-3">
                        {row.cells[0]?.icon && (
                          <Icon
                            name={row.cells[0].icon}
                            className={cn(
                              'h-6 w-6 transition-colors',
                              row.cells[0]?.colorVariant
                                ? colorClasses(row.cells[0].colorVariant).text
                                : globalColors.text,
                            )}
                          />
                        )}
                        <h3
                          className={cn(
                            'text-lg font-semibold transition-colors',
                            row.cells[0]?.colorVariant
                              ? colorClasses(row.cells[0].colorVariant)
                                  .textContentGradient
                              : globalColors.textContentGradient,
                          )}
                        >
                          {row.cells[0]?.content}
                        </h3>
                      </div>
                    </div>

                    {/* Comparaison Avant/Après */}
                    <div className="mb-6 space-y-4">
                      {/* Avant */}
                      <div
                        className={cn(
                          'rounded-lg border-l-4 p-4 transition-all duration-300',
                          beforeColors.card,
                          'border-l-current',
                          beforeColors.text,
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div
                              className={cn(
                                'mt-2 h-2 w-2 rounded-full',
                                beforeColors.accent,
                              )}
                            ></div>
                          </div>
                          <div>
                            <p
                              className={cn(
                                'mb-1 text-sm font-medium',
                                beforeColors.textContentGradient,
                              )}
                            >
                              {headerRow?.cells[1]?.content || 'Avant'}
                            </p>
                            <p className={cn('text-sm', beforeColors.text)}>
                              {row.cells[1]?.content}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Après */}
                      <div
                        className={cn(
                          'rounded-lg border-l-4 p-4 transition-all duration-300',
                          afterColors.card,
                          'border-l-current',
                          afterColors.text,
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div
                              className={cn(
                                'mt-2 h-2 w-2 rounded-full',
                                afterColors.accent,
                              )}
                            ></div>
                          </div>
                          <div>
                            <p
                              className={cn(
                                'mb-1 text-sm font-medium',
                                afterColors.textContentGradient,
                              )}
                            >
                              {headerRow?.cells[2]?.content || 'Après'}
                            </p>
                            <p className={cn('text-sm', afterColors.text)}>
                              {row.cells[2]?.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Badge d'amélioration */}
                    <div className="flex justify-center">
                      <div
                        className={cn(
                          'inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300',
                          improvementColors.card,
                        )}
                      >
                        <span
                          className={cn(
                            'text-sm font-medium',
                            improvementColors.textContentGradient,
                          )}
                        >
                          {headerRow?.cells[3]?.content || 'Amélioration'}
                        </span>
                        <Badge
                          className={cn(
                            'text-xs',
                            row.cells[3]?.colorVariant
                              ? colorClasses(row.cells[3].colorVariant).badge
                              : improvementColors.badge,
                          )}
                        >
                          {row.cells[3]?.badge || row.cells[3]?.content}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>

        {/* Button */}
        {button && (
          <ScrollAnimation animation="slideInUp" delay={0.3}>
            <div className="mt-12 text-center">
              <Button
                variant={button.variant || 'default'}
                onClick={button.onClick}
                asChild={!!button.href}
                className={cn(
                  'transition-all duration-300',
                  colorVariant && globalColors.hover,
                )}
              >
                {button.href ? (
                  <a href={button.href}>{button.text}</a>
                ) : (
                  button.text
                )}
              </Button>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  )
}
