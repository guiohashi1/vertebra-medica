type Photo = {
  src: string
  alt: string
}

type PhotoSlotProps = {
  photo: Photo | null | undefined
  label: string
  priority?: boolean
}

export function PhotoSlot({ photo, label, priority = false }: PhotoSlotProps) {
  if (photo) {
    return (
      <img
        src={photo.src}
        alt={photo.alt}
        width={960}
        height={720}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    )
  }

  return (
    <div className="photo-slot" role="img" aria-label={`${label}. Foto pendente.`}>
      <p className="photo-slot__status">Foto pendente</p>
      <p className="photo-slot__label">{label}</p>
      <p className="photo-slot__note">Este espaço não é a foto final do produto.</p>
    </div>
  )
}
