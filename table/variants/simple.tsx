'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { TableProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function SimpleVariant({
  header,
  rows,
  colorVariant,
  className,
  tableClassName,
  showStripes = true,
  showBorder = true,
  stickyHeader = false,
  responsive = true,
  button,
}: TableProps) {
  // Couleur du heading basée sur le "colorVariant" global
  const globalColors = colorClasses(colorVariant ?? 'neutral')

  // Séparer headers et body rows
  const headerRow = rows.find(row => row.isHeader)
  const bodyRows = rows.filter(row => !row.isHeader)

  return (
    <div
      className={cn(
        'relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
        className,
      )}
    >
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      {/* Desktop Table */}
      <ScrollAnimation animation="slideInUp" delay={0.1}>
        <div className="hidden md:block">
          <div
            className={cn(
              'overflow-x-auto',
              responsive &&
                'scrollbar-thin scrollbar-track-muted scrollbar-thumb-muted-foreground/20',
            )}
          >
            <table
              className={cn(
                'w-full border-collapse rounded-lg',
                showBorder && 'border border-border',
                tableClassName,
              )}
            >
              {/* Header */}
              {headerRow && (
                <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
                  <tr className="bg-muted">
                    {headerRow.cells.map((cell, cellIndex) => {
                      const cellColors = colorClasses(
                        cell.colorVariant ?? colorVariant ?? 'neutral',
                      )

                      return (
                        <th
                          key={cellIndex}
                          className={cn(
                            'border border-border p-3 font-semibold sm:p-4',
                            cellIndex === 0 ? 'text-left' : 'text-center',
                            cell.className,
                          )}
                          colSpan={cell.colSpan}
                          rowSpan={cell.rowSpan}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {cell.icon && (
                              <Icon name={cell.icon} className="text-lg" />
                            )}
                            <span
                              className={cn(
                                cell.colorVariant &&
                                  cellColors.textContentGradient,
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
                        </th>
                      )
                    })}
                  </tr>
                </thead>
              )}

              {/* Body */}
              <tbody>
                {bodyRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      showStripes && rowIndex % 2 === 0
                        ? 'bg-background'
                        : showStripes
                          ? 'bg-muted/50'
                          : 'bg-background',
                      row.className,
                    )}
                  >
                    {row.cells.map((cell, cellIndex) => {
                      const cellColors = colorClasses(
                        cell.colorVariant ?? 'neutral',
                      )

                      return (
                        <td
                          key={cellIndex}
                          className={cn(
                            'border border-border p-3 sm:p-4',
                            cellIndex === 0
                              ? 'text-left font-medium'
                              : 'text-center',
                            cell.align === 'left' && 'text-left',
                            cell.align === 'right' && 'text-right',
                            cell.className,
                          )}
                          colSpan={cell.colSpan}
                          rowSpan={cell.rowSpan}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {cell.icon && (
                              <Icon name={cell.icon} className="text-lg" />
                            )}
                            <span
                              className={cn(
                                cell.colorVariant &&
                                  cellColors.textContentGradient,
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

                          {/* Metric et improvement pour compatibilité */}
                          {cell.metric && (
                            <div className="mt-1 text-sm text-muted-foreground">
                              {cell.metric}
                            </div>
                          )}

                          {cell.improvement && (
                            <div className="mt-1">
                              <Badge
                                className={cn(
                                  'text-xs',
                                  cell.improvementType === 'positive'
                                    ? colorClasses('success').badge
                                    : cell.improvementType === 'negative'
                                      ? colorClasses('destructive').badge
                                      : 'border-muted bg-muted text-muted-foreground',
                                )}
                              >
                                {cell.improvement}
                              </Badge>
                            </div>
                          )}

                          {cell.subtitle && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {cell.subtitle}
                            </p>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {bodyRows.map((row, rowIndex) => (
            <ScrollAnimation
              key={rowIndex}
              animation="slideInUp"
              delay={0.1 + rowIndex * 0.1}
            >
              <div
                className={cn(
                  'rounded-lg border border-border p-4',
                  showStripes && rowIndex % 2 === 0
                    ? 'bg-background'
                    : showStripes
                      ? 'bg-muted/50'
                      : 'bg-background',
                  row.className,
                )}
              >
                {/* Feature name en grand */}
                <div className="mb-3 border-b border-border pb-3">
                  <h3 className="flex items-center gap-2 text-base font-semibold">
                    {row.cells[0]?.icon && (
                      <Icon name={row.cells[0].icon} className="text-lg" />
                    )}
                    {row.cells[0]?.content}
                    {row.cells[0]?.badge && (
                      <Badge
                        className={cn(
                          'text-xs',
                          row.cells[0]?.colorVariant
                            ? colorClasses(row.cells[0].colorVariant).badge
                            : 'border-muted bg-muted text-muted-foreground',
                        )}
                      >
                        {row.cells[0].badge}
                      </Badge>
                    )}
                  </h3>
                </div>

                {/* Autres colonnes sous forme de grid */}
                <div className="space-y-3">
                  {headerRow &&
                    row.cells.slice(1).map((cell, cellIndex) => {
                      const headerCell = headerRow.cells[cellIndex + 1]
                      const cellColors = colorClasses(
                        cell.colorVariant ?? 'neutral',
                      )

                      return (
                        <div
                          key={cellIndex}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm font-medium text-muted-foreground">
                            {headerCell?.content}
                          </span>
                          <div className="flex items-center gap-2">
                            {cell.icon && (
                              <Icon name={cell.icon} className="text-sm" />
                            )}
                            <span
                              className={cn(
                                'text-sm font-medium',
                                cell.colorVariant &&
                                  cellColors.textContentGradient,
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
                        </div>
                      )
                    })}
                </div>

                {/* Métadonnées supplémentaires */}
                {row.cells.some(
                  cell => cell.metric || cell.improvement || cell.subtitle,
                ) && (
                  <div className="mt-3 space-y-2 border-t border-border pt-3">
                    {row.cells.map((cell, cellIndex) => (
                      <div key={cellIndex}>
                        {cell.metric && (
                          <p className="text-xs text-muted-foreground">
                            {cell.metric}
                          </p>
                        )}
                        {cell.improvement && (
                          <Badge
                            className={cn(
                              'text-xs',
                              cell.improvementType === 'positive'
                                ? colorClasses('success').badge
                                : cell.improvementType === 'negative'
                                  ? colorClasses('destructive').badge
                                  : 'border-muted bg-muted text-muted-foreground',
                            )}
                          >
                            {cell.improvement}
                          </Badge>
                        )}
                        {cell.subtitle && (
                          <p className="text-xs text-muted-foreground">
                            {cell.subtitle}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </ScrollAnimation>

      {/* Button */}
      {button && (
        <ScrollAnimation animation="slideInUp" delay={0.2}>
          <div className="mt-8 text-center">
            <Button
              variant={button.variant || 'default'}
              onClick={button.onClick}
              asChild={!!button.href}
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
  )
}
