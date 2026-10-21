import { lazy, Suspense } from 'react'
import { heroSlides, products, whatsappUrl } from '../config'
import { HeroSlideshow } from './HeroSlideshow'
import { ProductFallback } from './ProductFallback'

const HeroStage3D = lazy(() =>
  import('./HeroStage3D').then((m) => ({ default: m.HeroStage3D })),
)

const hasSlides = heroSlides.length > 0

export function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero__layout shell">
        <div className="hero__content">
          <h1 className="hero__brand hero__brand--compact intro intro--2">
            Equipamentos para Home Care,
            <br />
            <em>Clínicas e Hospitais</em>
          </h1>
          <p className="hero__lead intro intro--4">
            Camas hospitalares manuais e elétricas, Cadeiras de Rodas, colchões
            pneumáticos, cadeiras de transferência, etc. Cotação rápida pelo
            WhatsApp.
          </p>
          <div className="hero__actions intro intro--5">
            <a
              className="btn btn--primary btn--lg"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir orçamento no WhatsApp
            </a>
            <a className="btn btn--ghost btn--lg" href="#catalogo">
              Ver modelos disponíveis
            </a>
          </div>
        </div>

        {hasSlides ? (
          <div className="hero__visual intro intro--stage">
            <HeroSlideshow />
          </div>
        ) : (
          <figure className="hero__stage intro intro--stage">
            <div className="hero__floor" aria-hidden="true" />
            <Suspense fallback={<ProductFallback id="eletrica" />}>
              <HeroStage3D />
            </Suspense>
            <figcaption className="stage-caption">
              <span className="stage-caption__name">{products[0]?.name}</span>
              <span className="stage-caption__note">
                Modelo 3D ilustrativo. Arraste para girar.
              </span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
