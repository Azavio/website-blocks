"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { colorClasses } from "@/lib/color-mapping"
import type { HeroProps } from "../types"
import {
  renderTextWithSegments,
  getBackgroundClasses,
  getSpacingClasses,
  getMaxWidthClasses,
  getAlignClasses,
} from "../utils/hero-utils"
import { useEffect, useRef } from "react"

export default function BaseVariant({
  content,
  buttons,
  background,
  colorVariant,
  className,
  contentClassName,
  spacing = "default",
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Effet parallaxe pour les images
  useEffect(() => {
    if (background?.type !== "parallax" || !sectionRef.current) return

    const handleScroll = () => {
      if (!sectionRef.current) return
      const scrolled = window.scrollY
      const parallaxElement = sectionRef.current.querySelector(".parallax-bg") as HTMLElement
      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [background?.type])

  const colors = colorClasses(colorVariant ?? "neutral")
  const headingTag = content.headingLevel ?? "h1"

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden",
        getBackgroundClasses(background, colorVariant),
        getSpacingClasses(spacing),
        className
      )}
    >
      {/* Animated Background Layer (Particles/Waves) - INDÉPENDANT */}
      {background?.animated && (
        <AnimatedBackground variant={background.animatedVariant ?? "particles"} />
      )}

      {/* Image Background */}
      {background?.type === "image" && background.image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={background.image}
            alt={background.imageAlt ?? ""}
            fill
            className={cn(
              "object-cover",
              background.imagePosition && `object-${background.imagePosition}`
            )}
            style={{ opacity: background.imageOpacity ?? 1 }}
            priority
          />
          {background.overlay && (
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: background.overlayOpacity ?? 0.5 }}
            />
          )}
        </div>
      )}

      {/* Parallax Background */}
      {background?.type === "parallax" && background.image && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="parallax-bg absolute inset-0 w-full h-[120%] will-change-transform"
            style={{ top: "-10%" }}
          >
            <Image
              src={background.image}
              alt={background.imageAlt ?? ""}
              fill
              className={cn(
                "object-cover",
                background.imagePosition && `object-${background.imagePosition}`
              )}
              style={{ opacity: background.imageOpacity ?? 1 }}
              priority
            />
          </div>
          {background.overlay && (
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: background.overlayOpacity ?? 0.5 }}
            />
          )}
        </div>
      )}

      {/* Video Background */}
      {background?.type === "video" && background.videoSrc && (
        <div className="absolute inset-0 -z-10">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={background.videoPoster}
            className="h-full w-full object-cover"
          >
            <source src={background.videoSrc} type="video/mp4" />
          </video>
          {background.overlay && (
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: background.overlayOpacity ?? 0.6 }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollAnimation animation="slideInUp">
          <div
            className={cn(
              "mx-auto flex flex-col",
              getMaxWidthClasses(content.maxWidth),
              getAlignClasses(content.align),
              contentClassName
            )}
          >
            {/* Heading */}
            {headingTag === "h1" ? (
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
                {renderTextWithSegments(content.heading)}
              </h1>
            ) : (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
                {renderTextWithSegments(content.heading)}
              </h2>
            )}

            {/* Subheading */}
            {content.subheading && (
              <p className="mt-6 px-4 text-base leading-7 text-foreground sm:px-0 sm:text-lg sm:leading-8">
                {renderTextWithSegments(content.subheading)}
              </p>
            )}

            {/* Text + TextStrong */}
            {(content.text || content.textStrong) && (
              <p className="mt-6 px-4 text-base leading-7 sm:px-0 sm:text-lg sm:leading-8">
                {content.text && (
                  <span className="text-muted-foreground">{content.text}</span>
                )}
                {content.text && content.textStrong && <br />}
                {content.textStrong && (
                  <strong className="text-foreground">{content.textStrong}</strong>
                )}
              </p>
            )}

            {/* Buttons */}
            {buttons && buttons.length > 0 && (
              <div
                className={cn(
                  "mt-10 flex flex-col gap-4 sm:flex-row",
                  content.align === "left" && "justify-start",
                  content.align === "right" && "justify-end",
                  content.align === "center" && "justify-center"
                )}
              >
                {buttons.map((button, index) => {
                  const buttonColors = button.colorVariant
                    ? colorClasses(button.colorVariant)
                    : colors

                  const isFirstButton = index === 0
                  const defaultVariant = isFirstButton ? "default" : "outline"

                  return (
                    <Button
                      key={index}
                      asChild={!!button.href}
                      size={button.size ?? "lg"}
                      variant={button.variant ?? defaultVariant}
                      className={cn(
                        "transition-all duration-300",
                        // Premier bouton avec gradient par défaut
                        button.variant === "default" && [
                          buttonColors.accent,
                          "hover:opacity-90"
                        ],
                        // Bouton outline avec style custom
                        button.variant === "outline" && [buttonColors.hover, "bg-transparent"]
                      )}
                      /* className={cn(
  card.buttons.primary.variant === "default"
    ? cn("bg-gradient-to-r", cardColors.accent, "hover:opacity-90")
    : cardColors.hover
)} */
                      onClick={button.onClick}
                    >
                      {button.href ? (
                        <a href={button.href} className="flex items-center">
                          {button.icon && button.iconPosition === "left" && (
                            <Icon name={button.icon} className="mr-2 h-4 w-4" />
                          )}
                          {button.text}
                          {button.icon && button.iconPosition !== "left" && (
                            <Icon name={button.icon} className="ml-2 h-4 w-4" />
                          )}
                          {!button.icon && <Icon name="ArrowRight" className="ml-2 h-4 w-4" />}
                        </a>
                      ) : (
                        <>
                          {button.icon && button.iconPosition === "left" && (
                            <Icon name={button.icon} className="mr-2 h-4 w-4" />
                          )}
                          {button.text}
                          {button.icon && button.iconPosition !== "left" && (
                            <Icon name={button.icon} className="ml-2 h-4 w-4" />
                          )}
                          {!button.icon && <Icon name="ArrowRight" className="ml-2 h-4 w-4" />}
                        </>
                      )}
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}