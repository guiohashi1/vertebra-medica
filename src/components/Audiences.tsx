import { Reveal } from './Reveal'
import { audiences, whatsappUrl } from '../config'

export function Audiences() {
  return (
    <section className="audiences" id="para-quem" aria-labelledby="audiences-title">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <h2 id="audiences-title" className="section-head__title">
              O que importa no leito
            </h2>
            <p className="section-head__lead">
              Conforto, praticidade e a opção de orçar cama e colchão juntos.
              Sem amarrar a um tipo de ambiente.
            </p>
          </div>
        </Reveal>

        <div className="audiences__grid">
          {audiences.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index === 0 ? undefined : (Math.min(index, 3) as 1 | 2 | 3)}
            >
              <a
                className="audience"
                href={whatsappUrl({ audience: item.waHint })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="audience__title">{item.title}</h3>
                <p className="audience__text">{item.text}</p>
                <span className="audience__cta">Pedir orçamento</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
