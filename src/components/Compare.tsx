import { Reveal } from './Reveal'
import { comparison, products, whatsappUrl } from '../config'

const eletrica = products.find((product) => product.id === 'eletrica')
const manual = products.find((product) => product.id === 'manual')

export function Compare() {
  return (
    <section className="compare" id="comparativo" aria-labelledby="compare-title">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <p className="kicker">
              <span className="kicker__num">02</span> Comparativo
            </p>
            <h2 id="compare-title" className="section-title">
              {comparison.title}
            </h2>
            <p className="section-head__lead">{comparison.lead}</p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="versus">
            <div className="versus__head">
              <div className="versus__corner" aria-hidden="true" />
              <h3 className="versus__title">Elétrica</h3>
              <h3 className="versus__title versus__manual">Manual</h3>
            </div>

            <dl className="versus__rows">
              {comparison.rows.map((row) => (
                <div className="versus__row" key={row.label}>
                  <dt className="versus__name">{row.label}</dt>
                  <dd className="versus__cell">
                    <span className="sr-only">Elétrica. </span>
                    {row.eletrica}
                  </dd>
                  <dd className="versus__cell versus__manual">
                    <span className="sr-only">Manual. </span>
                    {row.manual}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="versus__links">
              <div className="versus__corner" aria-hidden="true" />
              <div className="versus__link">
                {eletrica ? (
                  <a
                    className="text-link"
                    href={whatsappUrl(eletrica.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pedir orçamento da cama elétrica
                  </a>
                ) : null}
              </div>
              <div className="versus__link versus__manual">
                {manual ? (
                  <a
                    className="text-link"
                    href={whatsappUrl(manual.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pedir orçamento da cama manual
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <p className="compare__note">
            Diferenças de medida, acessório ou condição comercial entram na
            resposta do orçamento.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
