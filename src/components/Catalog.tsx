import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { productPhotos, products, whatsappUrl, type ProductId } from '../config'
import { PhotoCarousel } from './PhotoCarousel'
import { PhotoSlot } from './PhotoSlot'
import { Reveal } from './Reveal'
import { scrollToId } from '../scrollTo'

const HASH_PREFIX = '#modelo-'

function idFromHash(hash: string): ProductId | null {
  if (!hash.startsWith(HASH_PREFIX)) return null
  const id = hash.slice(HASH_PREFIX.length)
  return products.some((p) => p.id === id) ? (id as ProductId) : null
}

function splitPoint(point: string): { label: string; value: string } | null {
  const index = point.indexOf(':')
  if (index <= 0 || index > 28) return null
  const label = point.slice(0, index).trim()
  const value = point.slice(index + 1).trim()
  if (!label || !value) return null
  return { label, value }
}

export function Catalog() {
  const [active, setActive] = useState<ProductId>(products[0]!.id)
  const sectionRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const open = (id: ProductId, scroll = true) => {
      setActive(id)
      if (scroll) scrollToId('catalogo')
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

    const onHash = () => {
      const id = idFromHash(window.location.hash)
      if (id) open(id)
    }

    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHash)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [active])

  function selectProduct(id: ProductId, opts?: { revealPanel?: boolean }) {
    setActive(id)
    history.replaceState(null, '', `${HASH_PREFIX}${id}`)
    if (!opts?.revealPanel) return
    if (!window.matchMedia('(max-width: 960px)').matches) return
    requestAnimationFrame(() => {
      document.getElementById(`painel-${id}`)?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    })
  }

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
    selectProduct(id, { revealPanel: true })
    tabRefs.current[id]?.focus()
  }

  const activeIndex = products.findIndex((p) => p.id === active)
  const activeProduct = products[activeIndex]!
  const photos = productPhotos[active] ?? []
  const hasPhotos = photos.length > 0

  return (
    <section className="catalog" id="catalogo" ref={sectionRef}>
      <div className="shell">
        <Reveal>
          <div className="catalog__head">
            <div>
              <h2 className="section-title">Escolha o modelo</h2>
            </div>
          </div>
        </Reveal>

        <div className="showroom">
          <Reveal className="showroom__stage-wrap">
            <figure className="showroom__stage has-photo">
              {hasPhotos ? (
                <PhotoCarousel
                  key={active}
                  photos={photos}
                  label={activeProduct.name}
                />
              ) : (
                <PhotoSlot photo={null} label={activeProduct.name} />
              )}
            </figure>
          </Reveal>

          <div className="showroom__panel">
            <div className="model-nav">
              <p className="model-nav__label">Modelos</p>
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
                      onClick={() => selectProduct(product.id, { revealPanel: true })}
                      onKeyDown={(event) => onTabKey(event, index)}
                    >
                      <span className="tab__index" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="tab__name">{product.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {products.map((product) => {
              const specs = product.points
                .map((point) => ({ point, parts: splitPoint(point) }))
                .filter((item) => item.parts)

              const notes = product.points.filter((point) => !splitPoint(point))

              return (
                <div
                  key={product.id}
                  role="tabpanel"
                  id={`painel-${product.id}`}
                  aria-labelledby={`tab-${product.id}`}
                  className="panel"
                  hidden={product.id !== active}
                >
                  {product.tag ? <p className="panel__tag">{product.tag}</p> : null}
                  <h3 className="panel__name">{product.name}</h3>
                  <p className="panel__desc">{product.description}</p>

                  <a
                    className="btn btn--primary btn--lg panel__cta"
                    href={whatsappUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pedir orçamento deste modelo
                  </a>

                  {specs.length > 0 ? (
                    <dl className="panel__specs">
                      {specs.map(({ point, parts }) => (
                        <div key={point} className="panel__spec">
                          <dt>{parts!.label}</dt>
                          <dd>{parts!.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {notes.length > 0 ? (
                    <ul className="panel__points">
                      {notes.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
