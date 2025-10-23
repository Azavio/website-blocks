'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { TableProps, TableItem } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

// Helper pour obtenir l'icône selon le variant
function getVariantIcon(variant?: string): string | null {
  switch (variant) {
    case 'destructive':
    case 'warning':
      return 'X'
    case 'success':
      return 'Check'
    default:
      return 'Check'
  }
}

// Helper pour obtenir l'icône du header selon le variant
function getVariantHeaderIcon(variant?: string): string | null {
  switch (variant) {
    case 'destructive':
      return 'XCircle'
    case 'warning':
      return 'AlertCircle'
    case 'success':
      return 'CheckCircle'
    default:
      return 'CheckCircle'
  }
}

export default function ProsConsVariant({
  header,
  rows,
  colorVariant,
  className,
  button,
}: TableProps) {
  // Couleur globale
  const globalColors = colorClasses(colorVariant ?? 'neutral')

  // On prend la première row qui contient les deux colonnes
  const mainRow = rows.find(row => !row.isHeader) || rows[0]
  const leftCell = mainRow?.cells[0]
  const rightCell = mainRow?.cells[1]

  // Couleurs pour les colonnes
  const leftColors = colorClasses(leftCell?.colorVariant ?? 'destructive')
  const rightColors = colorClasses(rightCell?.colorVariant ?? 'success')

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

      {/* Two Column Layout */}
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {/* Left Column (Cons/Problems) */}
          {leftCell && (
            <ScrollAnimation animation="slideInLeft">
              <Card
                className={cn(
                  'h-full transition-all duration-300 hover:shadow-lg',
                  leftColors.card,
                  leftColors.hover,
                )}
              >
                <CardContent className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-center gap-3">
                    {getVariantHeaderIcon(leftCell.itemsVariant) && (
                      <Icon
                        name={getVariantHeaderIcon(leftCell.itemsVariant)!}
                        className={cn(
                          'h-6 w-6 transition-colors',
                          leftColors.text,
                        )}
                      />
                    )}
                    <h3
                      className={cn(
                        'text-xl font-bold transition-colors sm:text-2xl',
                        leftColors.textContentGradient,
                      )}
                    >
                      {leftCell.content}
                    </h3>
                    {leftCell.badge && (
                      <Badge className={cn('text-xs', leftColors.badge)}>
                        {leftCell.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Subtitle if exists */}
                  {leftCell.subtitle && (
                    <p className="mb-6 text-sm text-muted-foreground">
                      {leftCell.subtitle}
                    </p>
                  )}

                  {/* Items List */}
                  {leftCell.items && (
                    <div className="space-y-4">
                      {leftCell.items.map((item, index) => {
                        const isObject =
                          typeof item === 'object' && item !== null
                        const text = isObject ? (item as TableItem).text : item
                        const icon = isObject ? (item as TableItem).icon : null

                        return (
                          <ScrollAnimation
                            key={index}
                            animation="fadeIn"
                            delay={0.1 + index * 0.05}
                          >
                            <div className="flex items-start gap-3">
                              {icon ? (
                                <span
                                  className={cn(
                                    'mt-0.5 flex-shrink-0 text-lg',
                                    leftColors.text,
                                  )}
                                >
                                  {icon}
                                </span>
                              ) : getVariantIcon(leftCell.itemsVariant) ? (
                                <Icon
                                  name={getVariantIcon(leftCell.itemsVariant)!}
                                  className={cn(
                                    'mt-0.5 h-4 w-4 flex-shrink-0 transition-colors sm:h-5 sm:w-5',
                                    leftColors.text,
                                  )}
                                />
                              ) : null}
                              <p
                                className={cn(
                                  'text-sm transition-colors sm:text-base',
                                  leftColors.text,
                                )}
                              >
                                {text}
                              </p>
                            </div>
                          </ScrollAnimation>
                        )
                      })}
                    </div>
                  )}

                  {/* Fallback content if no items */}
                  {!leftCell.items && leftCell.content && (
                    <p
                      className={cn(
                        'text-sm transition-colors sm:text-base',
                        leftColors.text,
                      )}
                    >
                      {leftCell.content}
                    </p>
                  )}
                </CardContent>
              </Card>
            </ScrollAnimation>
          )}

          {/* Right Column (Pros/Solutions) */}
          {rightCell && (
            <ScrollAnimation animation="slideInRight">
              <Card
                className={cn(
                  'h-full transition-all duration-300 hover:shadow-lg',
                  rightColors.card,
                  rightColors.hover,
                )}
              >
                <CardContent className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-center gap-3">
                    {getVariantHeaderIcon(rightCell.itemsVariant) && (
                      <Icon
                        name={getVariantHeaderIcon(rightCell.itemsVariant)!}
                        className={cn(
                          'h-6 w-6 transition-colors',
                          rightColors.text,
                        )}
                      />
                    )}
                    <h3
                      className={cn(
                        'text-xl font-bold transition-colors sm:text-2xl',
                        rightColors.textContentGradient,
                      )}
                    >
                      {rightCell.content}
                    </h3>
                    {rightCell.badge && (
                      <Badge className={cn('text-xs', rightColors.badge)}>
                        {rightCell.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Subtitle if exists */}
                  {rightCell.subtitle && (
                    <p className="mb-6 text-sm text-muted-foreground">
                      {rightCell.subtitle}
                    </p>
                  )}

                  {/* Items List */}
                  {rightCell.items && (
                    <div className="space-y-4">
                      {rightCell.items.map((item, index) => {
                        const isObject =
                          typeof item === 'object' && item !== null
                        const text = isObject ? (item as TableItem).text : item
                        const icon = isObject ? (item as TableItem).icon : null

                        return (
                          <ScrollAnimation
                            key={index}
                            animation="fadeIn"
                            delay={0.1 + index * 0.05}
                          >
                            <div className="flex items-start gap-3">
                              {icon ? (
                                <span
                                  className={cn(
                                    'mt-0.5 flex-shrink-0 text-lg',
                                    rightColors.text,
                                  )}
                                >
                                  {icon}
                                </span>
                              ) : getVariantIcon(rightCell.itemsVariant) ? (
                                <Icon
                                  name={getVariantIcon(rightCell.itemsVariant)!}
                                  className={cn(
                                    'mt-0.5 h-4 w-4 flex-shrink-0 transition-colors sm:h-5 sm:w-5',
                                    rightColors.text,
                                  )}
                                />
                              ) : null}
                              <p
                                className={cn(
                                  'text-sm transition-colors sm:text-base',
                                  rightColors.text,
                                )}
                              >
                                {text}
                              </p>
                            </div>
                          </ScrollAnimation>
                        )
                      })}
                    </div>
                  )}

                  {/* Fallback content if no items */}
                  {!rightCell.items && rightCell.content && (
                    <p
                      className={cn(
                        'text-sm transition-colors sm:text-base',
                        rightColors.text,
                      )}
                    >
                      {rightCell.content}
                    </p>
                  )}
                </CardContent>
              </Card>
            </ScrollAnimation>
          )}
        </div>
      </div>

      {/* Button */}
      {button && (
        <ScrollAnimation animation="slideInUp" delay={0.4}>
          <div className="mt-8 text-center sm:mt-12">
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
  )
}
