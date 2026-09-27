import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { productPhotos, products, whatsappUrl, type ProductId } from '../config'
import { PhotoSlot } from './PhotoSlot'
import { ProductFallback } from './ProductFallback'
import { Reveal } from './Reveal'
import { scrollToId } from '../scrollTo'

const CatalogViewer = lazy(() =>
  import('./CatalogViewer').then((m) => ({ default: m.CatalogViewer })),
)

const HASH_PREFIX = '#modelo-'

function idFromHash(hash: string): ProductId | null {
  if (!hash.startsWith(HASH_PREFIX)) return null
  const id = hash.slice(HASH_PREFIX.length)
  return products.some((p) => p.id === id) ? (id as ProductId) : null
}

export function Catalog() {
  const [active, setActive] = useState<ProductId>(products[0]!.id)
  const sectionRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const open = (id: ProductId) => {
      setActive(id)
      scrollToId('catalogo')
    }

    const initial = idFromHash(window.location.hash)
    if (initial) open(initial)

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#modelo-"]')
      const id = link ? idFromHash(link.getAttribute('href') ?? '') : null
      if (!id) return
      event.preventDefault()
      history.replaceState(null, '', `${HASH_PREFIX}${id}`)
      open(id)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = products.length - 1
    let next = -1
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last
    if (next < 0) return
    event.preventDefault()
    const id = products[next]!.id
    setActive(id)
    tabRefs.current[id]?.focus()
  }

  const activeIndex = products.findIndex((p) => p.id === active)
  const activeProduct = products[activeIndex]!
  const photo = productPhotos[active]

  return (
    <section className="catalog" id="catalogo" ref={sectionRef}>
      <div className="shell">
        <Reveal>
          <div className="catalog__head">
            <div>
              <p className="kicker">
                <span className="kicker__num">01</span> Catálogo
              </p>
              <h2 className="section-title">Escolha o modelo</h2>
            </div>
            <p className="catalog__count">Três modelos. Orçamento sob consulta.</p>
          </div>
        </Reveal>

        <div className="showroom">
          <Reveal className="showroom__stage-wrap">
            <figure className="showroom__stage">
              <div className="hero__floor" aria-hidden="true" />
              {photo ? (
                <PhotoSlot photo={photo} label={activeProduct.name} />
              ) : (
                <>
                  <Suspense fallback={<ProductFallback id={active} />}>
                    <CatalogViewer id={active} />
                  </Suspense>
                  <figcaption className="stage-caption">
                    <span className="stage-caption__name">
                      {String(activeIndex + 1).padStart(2, '0')} · {activeProduct.name}
                    </span>
                    <span className="stage-caption__note">Modelo 3D ilustrativo</span>
                  </figcaption>
                </>
              )}
            </figure>
          </Reveal>

          <div className="showroom__panel">
            <div className="tabs" role="tablist" aria-label="Modelos">
              {products.map((product, index) => {
                const selected = product.id === active
                return (
                  <button
                    key={product.id}
                    ref={(el) => {
                      tabRefs.current[product.id] = el
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${product.id}`}
                    aria-selected={selected}
                    aria-controls={`painel-${product.id}`}
                    tabIndex={selected ? 0 : -1}
                    className={`tab${selected ? ' is-active' : ''}`}
                    onClick={() => setActive(product.id)}
                    onKeyDown={(event) => onTabKey(event, index)}
                  >
                    <span className="tab__num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="tab__name">{product.name}</span>
                  </button>
                )
              })}
            </div>

            {products.map((product, index) => (
              <div
                key={product.id}
                role="tabpanel"
                id={`painel-${product.id}`}
                aria-labelledby={`tab-${product.id}`}
                className="panel"
                hidden={product.id !== active}
              >
                <p className="panel__index">
                  {String(index + 1).padStart(2, '0')} de 03 · {product.tag}
                </p>
                <h3 className="panel__name">{product.name}</h3>
                <p className="panel__desc">{product.description}</p>
                {product.points.length > 0 ? (
                  <ul className="panel__points">
                    {product.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="pending">Especificações pendentes de confirmação.</p>
                )}
                <a
                  className="btn btn--primary btn--lg"
                  href={whatsappUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pedir orçamento deste modelo
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
