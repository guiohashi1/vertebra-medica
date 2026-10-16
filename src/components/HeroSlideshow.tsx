import { useEffect, useId, useRef, useState } from 'react'
import { heroSlides } from '../config'

const INTERVAL_MS = 5600

export function HeroSlideshow() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const labelId = useId()
  const reduceMotion = useRef(false)
  const total = heroSlides.length
  const current = heroSlides[index]

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }, [])

  useEffect(() => {
    if (total < 2 || paused || reduceMotion.current) return
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % total)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused, total])

  if (!current) return null

  return (
    <div
      className="hero-slides"
      role="region"
      aria-roledescription="carrossel"
      aria-labelledby={labelId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <p id={labelId} className="sr-only">
        Modelos em destaque
      </p>

      <div className="hero-slides__frame">
        {heroSlides.map((slide, i) => (
          <img
            key={slide.src}
            className={`hero-slides__image${i === index ? ' is-active' : ''}`}
            src={slide.src}
            alt={slide.alt}
            width={960}
            height={720}
            decoding="async"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            aria-hidden={i === index ? undefined : true}
          />
        ))}
      </div>

      <div className="hero-slides__meta">
        <p className="hero-slides__name">{current.name}</p>
        {total > 1 ? (
          <div className="hero-slides__switch" role="tablist" aria-label="Modelo em destaque">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={`hero-slides__option${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              >
                {slide.short}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
