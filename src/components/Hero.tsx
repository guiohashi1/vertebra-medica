import { lazy, Suspense } from 'react'
import { brand } from '../config'
import { usePerf } from './PerfProvider'
import { ProductFallback } from './ProductFallback'

const HeroStage3D = lazy(() =>
  import('./HeroStage3D').then((m) => ({ default: m.HeroStage3D })),
)

export function Hero() {
  const mode = usePerf()

  return (
    <section className="hero" id="topo">
      <div className="hero__stage" aria-hidden="true">
        {mode === 'static' ? (
          <ProductFallback id="eletrica" />
        ) : (
          <Suspense fallback={<ProductFallback id="eletrica" />}>
            <HeroStage3D />
          </Suspense>
        )}
      </div>
      <div className="hero__veil" />

      <div className="hero__content">
        <p className="hero__eyebrow reveal is-in">{brand.region}</p>
        <h1 className="hero__brand reveal is-in reveal-delay-1">
          Vertebra <em>Médica</em>
        </h1>
        <p className="hero__lead reveal is-in reveal-delay-2">
          Camas e colchões hospitalares com foco em durabilidade e conforto.
          Orçamento pelo WhatsApp.
        </p>
        <div className="hero__actions reveal is-in reveal-delay-3">
          <a className="btn btn--primary" href="#orcamento">
            Montar orçamento
          </a>
          <a className="btn btn--ghost" href="#catalogo">
            Ver modelos
          </a>
        </div>
      </div>

      <p className="hero__scroll">Role para ver</p>
    </section>
  )
}
