import { lazy, Suspense } from 'react'
import { heroPhoto, products, whatsappUrl } from '../config'
import { PhotoSlot } from './PhotoSlot'
import { ProductFallback } from './ProductFallback'

const HeroStage3D = lazy(() =>
  import('./HeroStage3D').then((m) => ({ default: m.HeroStage3D })),
)

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
            Oferecemos soluções em <a href="#modelo-eletrica">camas elétricas</a>,{' '}
            <a href="#modelo-manual">manuais</a> e{' '}
            <a href="#modelo-colchao">colchões</a>. Faça sua cotação de forma
            rápida e prática falando com a nossa equipe pelo WhatsApp.
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

        <figure className="hero__stage intro intro--stage">
          <div className="hero__floor" aria-hidden="true" />
          {heroPhoto ? (
            <PhotoSlot
              photo={heroPhoto}
              label="Foto principal do produto"
              priority
            />
          ) : (
            <>
              <Suspense fallback={<ProductFallback id="eletrica" />}>
                <HeroStage3D />
              </Suspense>
              <figcaption className="stage-caption">
                <span className="stage-caption__name">{products[0]?.name}</span>
                <span className="stage-caption__note">
                  Modelo 3D ilustrativo. Arraste para girar.
                </span>
              </figcaption>
            </>
          )}
        </figure>
      </div>
    </section>
  )
}
