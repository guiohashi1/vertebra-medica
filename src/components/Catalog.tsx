import { lazy, Suspense } from 'react'
import { products, whatsappUrl, type ProductId } from '../config'
import { ProductFallback } from './ProductFallback'
import { Reveal } from './Reveal'
import { usePerf } from './PerfProvider'

const CatalogViewer = lazy(() =>
  import('./CatalogViewer').then((m) => ({ default: m.CatalogViewer })),
)

function viewerFor(id: ProductId) {
  if (id === 'colchao') {
    return {
      cameraPosition: [2.2, 1.4, 2.6] as [number, number, number],
      target: [0, 0.1, 0] as [number, number, number],
      shadowY: -0.55,
      height: 1.2,
    }
  }
  return {
    cameraPosition: [2.6, 1.45, 3.1] as [number, number, number],
    target: [0, 0.15, 0] as [number, number, number],
    shadowY: -0.7,
    height: 1.4,
  }
}

export function Catalog() {
  const mode = usePerf()
  const use3d = mode === 'full'

  return (
    <section className="catalog" id="catalogo">
      <div className="catalog__head">
        <Reveal>
          <h2 className="catalog__title">Catálogo</h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="catalog__count">3 modelos · orçamento sob consulta</p>
        </Reveal>
      </div>

      {products.map((product, index) => {
        const view = viewerFor(product.id)
        return (
          <article className="product" key={product.id} id={product.id}>
            <div className="product__visual">
              {use3d ? (
                <Suspense fallback={<ProductFallback id={product.id} />}>
                  <CatalogViewer
                    id={product.id}
                    cameraPosition={view.cameraPosition}
                    target={view.target}
                    shadowY={view.shadowY}
                    height={view.height}
                  />
                </Suspense>
              ) : (
                <ProductFallback id={product.id} />
              )}
            </div>

            <div className="product__copy">
              <Reveal>
                <p className="product__index">
                  {String(index + 1).padStart(2, '0')} / 03
                </p>
              </Reveal>
              <Reveal delay={1}>
                <h3 className="product__name">{product.name}</h3>
                <p className="product__tag">{product.tag}</p>
              </Reveal>
              <Reveal delay={2}>
                <p className="product__desc">{product.description}</p>
                <ul className="product__points">
                  {product.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <a
                  className="btn btn--primary"
                  href={whatsappUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Orçar este modelo
                </a>
              </Reveal>
            </div>
          </article>
        )
      })}
    </section>
  )
}
