import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import type { ProductPhoto } from '../config'

type PhotoCarouselProps = {
  photos: ProductPhoto[]
  label: string
  priority?: boolean
}

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg
      className="carousel__chevron"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      {dir === 'prev' ? (
        <path
          d="M14.25 5.25 7.5 12l6.75 6.75"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9.75 5.25 16.5 12l-6.75 6.75"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
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
  const dragX = useRef<number | null>(null)

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

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragX.current = event.clientX
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragX.current == null) return
    const dx = event.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) < 48) return
    go(dx < 0 ? 1 : -1)
  }

  function onPointerCancel() {
    dragX.current = null
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
      <div
        className="carousel__frame"
        onPointerDown={total > 1 ? onPointerDown : undefined}
        onPointerUp={total > 1 ? onPointerUp : undefined}
        onPointerCancel={total > 1 ? onPointerCancel : undefined}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={960}
          height={720}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          draggable={false}
        />
        {total > 1 ? (
          <>
            <button
              type="button"
              className="carousel__nav carousel__nav--prev"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => go(-1)}
              aria-label="Foto anterior"
            >
              <Chevron dir="prev" />
            </button>
            <button
              type="button"
              className="carousel__nav carousel__nav--next"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => go(1)}
              aria-label="Próxima foto"
            >
              <Chevron dir="next" />
            </button>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="carousel__meta">
          <p className="carousel__count" aria-live="polite">
            {index + 1}
            <span aria-hidden="true"> / </span>
            <span className="sr-only"> de </span>
            {total}
          </p>
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
        </div>
      ) : null}
    </div>
  )
}
