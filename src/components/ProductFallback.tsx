import type { ProductId } from '../config'
import { products } from '../config'

const labels: Record<ProductId, string> = {
  eletrica: 'Cama elétrica',
  manual: 'Cama manual',
  colchao: 'Colchão',
}

type ProductFallbackProps = {
  id: ProductId
  className?: string
}

export function ProductFallback({ id, className }: ProductFallbackProps) {
  const name = products.find((p) => p.id === id)?.name ?? labels[id]

  return (
    <div className={`product-fallback ${className ?? ''}`.trim()} role="img" aria-label={name}>
      <div className={`product-fallback__art product-fallback__art--${id}`} aria-hidden="true">
        {id === 'colchao' ? (
          <svg viewBox="0 0 160 90" fill="none">
            <rect x="18" y="28" width="124" height="34" rx="6" fill="currentColor" opacity="0.22" />
            <rect x="22" y="32" width="116" height="18" rx="4" fill="currentColor" opacity="0.38" />
            <path d="M30 42h100" stroke="currentColor" strokeOpacity="0.25" />
          </svg>
        ) : (
          <svg viewBox="0 0 180 110" fill="none">
            <rect x="28" y="48" width="124" height="14" rx="2" fill="currentColor" opacity="0.2" />
            <rect x="32" y="36" width="116" height="16" rx="3" fill="currentColor" opacity="0.35" />
            <rect x="28" y="28" width="18" height="36" rx="2" fill="currentColor" opacity="0.28" />
            <rect x="134" y="30" width="14" height="32" rx="2" fill="currentColor" opacity="0.28" />
            <circle cx="40" cy="70" r="5" fill="currentColor" opacity="0.35" />
            <circle cx="148" cy="70" r="5" fill="currentColor" opacity="0.35" />
            <circle cx="40" cy="70" r="2" fill="currentColor" opacity="0.15" />
            <circle cx="148" cy="70" r="2" fill="currentColor" opacity="0.15" />
          </svg>
        )}
      </div>
      <p className="product-fallback__label">{labels[id]}</p>
    </div>
  )
}
