import { Reveal } from './Reveal'
import { comparison, products, whatsappUrl } from '../config'

const eletrica = products.find((product) => product.id === 'eletrica')
const manual = products.find((product) => product.id === 'manual')

const columns = [
  {
    key: 'manual' as const,
    title: 'Manual',
    product: manual,
    cta: 'Consultar manual',
    getValue: (row: (typeof comparison.rows)[number]) => row.manual,
  },
  {
    key: 'eletrica' as const,
    title: 'Elétrica',
    product: eletrica,
    cta: 'Consultar elétrica',
    getValue: (row: (typeof comparison.rows)[number]) => row.eletrica,
  },
]

export function Compare() {
  return (
    <section className="compare" id="comparativo" aria-labelledby="compare-title">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <p className="kicker">Comparativo</p>
            <h2 id="compare-title" className="section-title compare__title">
              {comparison.title}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="versus">
            {columns.map((column) => (
              <article
                key={column.key}
                className={`versus__card versus__card--${column.key}`}
              >
                <header className="versus__card-head">
                  <p className="versus__title-kicker">Cama hospitalar</p>
                  <h3 className="versus__card-title">{column.title}</h3>
                </header>

                <dl className="versus__list">
                  {comparison.rows.map((row) => (
                    <div className="versus__item" key={row.label}>
                      <dt className="versus__item-label">{row.label}</dt>
                      <dd className="versus__item-value">{column.getValue(row)}</dd>
                    </div>
                  ))}
                </dl>

                {column.product ? (
                  <a
                    className="btn btn--ghost versus__cta"
                    href={whatsappUrl(column.product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {column.cta}
                  </a>
                ) : null}
              </article>
            ))}
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
