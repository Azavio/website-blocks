'use client'

import { useState, useEffect, useCallback } from 'react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { colorClasses } from '@/lib/color-mapping'
import type { TestimonialsProps } from '../types'
import { CustomHeader } from '@/components/ui/CustomHeader'

export default function CarouselVariant({
  header,
  testimonials,
  colorVariant,
  cardClassName,
  quoteClassName,
  showNavigation = true,
  showDots = true,
  autoplay = false,
  autoplayDelay = 5000,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const colors = colorClasses(colorVariant ?? 'brand')

  const currentTestimonial = testimonials[currentIndex]

  // Navigation handlers
  const nextTestimonial = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevTestimonial = useCallback(() => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length,
    )
  }, [testimonials.length])

  // Autoplay
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(nextTestimonial, autoplayDelay)
    return () => clearInterval(interval)
  }, [autoplay, autoplayDelay, nextTestimonial])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevTestimonial()
      if (e.key === 'ArrowRight') nextTestimonial()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevTestimonial, nextTestimonial])

  return (
    <div className="relative">
      {/* Header */}
      {header && (
        <ScrollAnimation animation="slideInUp">
          <CustomHeader {...header} />
        </ScrollAnimation>
      )}

      {/* Carousel */}
      <div className="relative mx-auto max-w-4xl">
        <ScrollAnimation animation="slideInUp" delay={0.1}>
          <Card
            className={cn(
              'overflow-hidden border transition-all duration-300',
              colors.card,
            )}
          >
            <CardContent className="p-6 sm:p-8">
              <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-3">
                {/* Avatar et infos */}
                <div className="text-center lg:text-left">
                  <div className="relative mx-auto mb-4 h-20 w-20 lg:mx-0">
                    <Image
                      width={80}
                      height={80}
                      src={
                        currentTestimonial.author.avatar || '/placeholder.svg'
                      }
                      alt={currentTestimonial.author.name}
                      className={cn(
                        'rounded-full border-4 transition-all duration-300',
                        colors.hover,
                      )}
                    />
                  </div>

                  <h3
                    className={cn(
                      'text-lg font-semibold text-foreground transition-colors',
                    )}
                  >
                    {currentTestimonial.author.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.author.role}
                  </p>

                  {currentTestimonial.author.company && (
                    <p
                      className={cn(
                        'mt-1 text-sm font-medium transition-colors',
                        colors.text,
                      )}
                    >
                      {currentTestimonial.author.company}
                    </p>
                  )}

                  {/* Rating */}
                  {currentTestimonial.rating && (
                    <div className="mt-2 flex items-center justify-center gap-1 lg:justify-start">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Témoignage */}
                <div className="lg:col-span-2">
                  <Icon
                    name="Quote"
                    className={cn(
                      'mb-4 h-8 w-8 transition-colors',
                      colors.icon,
                    )}
                  />
                  <blockquote
                    className={cn(
                      'text-base leading-relaxed transition-colors sm:text-lg',
                      quoteClassName,
                    )}
                  >
                    "{currentTestimonial.quote}"
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>

        {/* Navigation */}
        {(showNavigation || showDots) && testimonials.length > 1 && (
          <ScrollAnimation animation="slideInUp" delay={0.2}>
            <div className="mt-6 flex items-center justify-center space-x-4 sm:mt-8">
              {/* Previous Button */}
              {showNavigation && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    colors.hover,
                  )}
                  aria-label="Témoignage précédent"
                >
                  <Icon name="ChevronLeft" className="h-4 w-4" />
                </Button>
              )}

              {/* Dots */}
              {showDots && (
                <div
                  className="flex space-x-2"
                  role="tablist"
                  aria-label="Sélection de témoignage"
                >
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      role="tab"
                      aria-selected={index === currentIndex}
                      aria-label={`Témoignage ${index + 1}`}
                      className={cn(
                        'h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3',
                        index === currentIndex
                          ? cn('scale-110', colors.accent)
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
                      )}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              )}

              {/* Next Button */}
              {showNavigation && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    colors.hover,
                  )}
                  aria-label="Témoignage suivant"
                >
                  <Icon name="ChevronRight" className="h-4 w-4" />
                </Button>
              )}
            </div>
          </ScrollAnimation>
        )}
      </div>
    </div>
  )
}
