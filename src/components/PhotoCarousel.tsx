import { useEffect, useId, useState, type KeyboardEvent } from 'react'
import type { ProductPhoto } from '../config'

type PhotoCarouselProps = {
  photos: ProductPhoto[]
  label: string
  priority?: boolean
}

export function PhotoCarousel({
  photos,
  label,
  priority = false,
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0)
  const labelId = useId()
  const total = photos.length
  const current = photos[index]

  useEffect(() => {
    setIndex(0)
  }, [photos[0]?.src, total])

  if (!current || total === 0) {
    return (
      <div className="photo-slot" role="img" aria-label={`${label}. Foto pendente.`}>
        <p className="photo-slot__status">Foto pendente</p>
        <p className="photo-slot__label">{label}</p>
      </div>
    )
  }

  function go(delta: number) {
    setIndex((value) => (value + delta + total) % total)
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    }
  }

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carrossel"
      aria-labelledby={labelId}
      tabIndex={0}
      onKeyDown={onKey}
    >
      <p id={labelId} className="sr-only">
        {label}
      </p>
      <div className="carousel__frame">
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={960}
          height={720}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>

      {total > 1 ? (
        <div className="carousel__meta">
          <button
            type="button"
            className="carousel__btn"
            onClick={() => go(-1)}
            aria-label="Foto anterior"
          >
            Anterior
          </button>
          <div className="carousel__dots" role="tablist" aria-label="Fotos do modelo">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Foto ${i + 1} de ${total}`}
                className={`carousel__dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel__btn"
            onClick={() => go(1)}
            aria-label="Próxima foto"
          >
            Próxima
          </button>
        </div>
      ) : null}
    </div>
  )
}
