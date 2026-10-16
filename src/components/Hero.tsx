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
          <h1 className="hero__brand">
            <span className="hero__line intro intro--2">Camas hospitalares</span>
            <span className="hero__line intro intro--3">
              <em>e colchões</em>
            </span>
          </h1>
          <p className="hero__lead intro intro--4">
            Camas elétricas e manuais, colchão, poltrona de acompanhante e
            cadeira de rodas. Cotação rápida pelo WhatsApp.
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
              Ver modelos e detalhes
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
