import { Reveal } from './Reveal'
import { whatsappUrl } from '../config'

export function QuoteCta() {
  return (
    <section className="cta" id="orcamento">
      <div className="cta__inner">
        <Reveal>
          <h2 className="cta__title">Precisa de um orçamento?</h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="cta__text">
            Conte quantas unidades e o modelo. Respondemos pelo WhatsApp com
            prazo e condições.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <a
            className="btn btn--primary"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
