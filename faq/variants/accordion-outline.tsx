'use client'

import { useState, useMemo } from 'react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { FAQProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function AccordionOutlineVariant({
  header,
  items,
  colorVariant,
  className,
  itemClassName,
  showCategory = false,
  showTags = true,
  showIcons = true,
  tagFilter = false,
  searchItems = false,
  allowMultiple = true,
  defaultOpenFirst = false,
}: FAQProps) {
  const globalColors = colorClasses(colorVariant ?? 'neutral')

  // État pour le tag sélectionné
  const [selectedTag, setSelectedTag] = useState<string>('all')

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Extraction de tous les tags uniques
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    items.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => tagsSet.add(tag))
      }
    })
    return Array.from(tagsSet).sort()
  }, [items])

  // Filtrage des items selon le tag et la recherche
  const filteredItems = useMemo(() => {
    let filtered = items

    // Filtre par tag
    if (tagFilter && selectedTag !== 'all') {
      filtered = filtered.filter(
        item => item.tags && item.tags.includes(selectedTag),
      )
    }

    // Filtre par recherche
    if (searchItems && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        item =>
          item.question.toLowerCase().includes(searchLower) ||
          (typeof item.answer === 'string' &&
            item.answer.toLowerCase().includes(searchLower)) ||
          (item.category &&
            item.category.toLowerCase().includes(searchLower)) ||
          (item.tags &&
            item.tags.some(tag => tag.toLowerCase().includes(searchLower))),
      )
    }

    return filtered
  }, [items, selectedTag, tagFilter, searchTerm, searchItems])

  // Valeur par défaut de l'accordéon
  const defaultValue =
    defaultOpenFirst && filteredItems.length > 0
      ? filteredItems[0].id || `item-0`
      : undefined

  return (
    <div
      className={cn(
        'relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8',
        className,
      )}
    >
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      {/* Barre de recherche */}
      {searchItems && (
        <ScrollAnimation animation="slideInUp" delay={0.05}>
          <div className="mb-8 sm:mb-12">
            <div className="mx-auto mb-6 max-w-md">
              <div className="relative">
                <Icon
                  name="Search"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
                />
                <Input
                  placeholder="Rechercher une question..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 transform"
                    onClick={() => setSearchTerm('')}
                  >
                    <Icon name="X" className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Résultat de recherche */}
            {searchTerm && (
              <div className="mb-4 text-center text-sm text-muted-foreground">
                {filteredItems.length}{' '}
                {filteredItems.length === 1
                  ? 'question trouvée'
                  : 'questions trouvées'}
              </div>
            )}
          </div>
        </ScrollAnimation>
      )}

      {/* Filtres par tags */}
      {tagFilter && allTags.length > 0 && (
        <ScrollAnimation animation="slideInUp" delay={0.1}>
          <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-12">
            <Button
              variant={selectedTag === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag('all')}
              className={cn(
                'transition-all duration-300',
                selectedTag === 'all' &&
                  cn(
                    'bg-gradient-to-r',
                    globalColors.accent,
                    'hover:opacity-90',
                  ),
              )}
            >
              Toutes
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  'transition-all duration-300',
                  selectedTag === tag &&
                    cn(
                      'bg-gradient-to-r',
                      globalColors.accent,
                      'hover:opacity-90',
                    ),
                )}
              >
                {tag}
              </Button>
            ))}
          </div>
        </ScrollAnimation>
      )}

      {/* FAQ Accordion */}
      {filteredItems.length > 0 ? (
        <Accordion
          type={allowMultiple ? 'multiple' : 'single'}
          collapsible={!allowMultiple}
          defaultValue={defaultValue}
          className="space-y-4"
        >
          {filteredItems.map((item, index) => {
            const itemColors = colorClasses(
              item.colorVariant ?? colorVariant ?? 'neutral',
            )
            const itemId = item.id || `item-${index}`

            return (
              <ScrollAnimation
                key={itemId}
                animation="slideInUp"
                delay={index * 0.05}
              >
                <AccordionItem
                  value={itemId}
                  className={cn(
                    'rounded-lg border-2 px-6 transition-all duration-300',
                    'hover:shadow-md',
                    itemColors.border,
                    itemColors.cardBgHover,
                    itemClassName,
                  )}
                >
                  <AccordionTrigger
                    className={cn('py-5 text-left hover:no-underline', 'group')}
                  >
                    <div className="flex w-full items-start gap-3 pr-4">
                      {/* Icône optionnelle */}
                      {showIcons && item.icon && (
                        <Icon
                          name={item.icon}
                          className={cn(
                            'mt-0.5 h-5 w-5 flex-shrink-0 transition-colors',
                            itemColors.text,
                          )}
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        {/* Catégorie */}
                        {showCategory && item.category && (
                          <div className="mb-2">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                        )}

                        {/* Question */}
                        <h3
                          className={cn(
                            'text-base font-semibold leading-snug transition-colors sm:text-lg',
                            'group-hover:text-foreground',
                          )}
                        >
                          {item.question}
                        </h3>

                        {/* Tags (cachés si le filtre est actif) */}
                        {showTags &&
                          !tagFilter &&
                          item.tags &&
                          item.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {item.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tag + tagIndex}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pt-2">
                    <div
                      className={cn(
                        'pl-8 text-sm leading-relaxed text-muted-foreground sm:text-base',
                        showIcons && item.icon && 'pl-11',
                      )}
                    >
                      {typeof item.answer === 'string' ? (
                        <p>{item.answer}</p>
                      ) : (
                        item.answer
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </ScrollAnimation>
            )
          })}
        </Accordion>
      ) : (
        // Message si aucun résultat
        <div className="py-12 text-center">
          <Icon
            name="SearchX"
            className="mx-auto mb-4 h-12 w-12 text-muted-foreground"
          />
          <p className="mb-2 text-muted-foreground">
            {searchTerm
              ? `Aucune question ne correspond à votre recherche "${searchTerm}"`
              : 'Aucune question ne correspond au filtre sélectionné.'}
          </p>
          {(tagFilter || searchTerm) && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSelectedTag('all')
                setSearchTerm('')
              }}
            >
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
