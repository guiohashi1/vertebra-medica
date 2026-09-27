import { Reveal } from './Reveal'
import { comparison, products, whatsappUrl } from '../config'

const columns = [
  { key: 'eletrica', title: 'Elétrica' },
  { key: 'manual', title: 'Manual' },
] as const

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
            {columns.map((column, index) => {
              const product = products.find((p) => p.id === column.key)
              return (
                <article className="versus__col" key={column.key}>
                  <p className="versus__label">
                    {index === 0 ? 'A' : 'B'} · Cama hospitalar
                  </p>
                  <h3 className="versus__title">{column.title}</h3>
                  <dl className="versus__rows">
                    {comparison.rows.map((row) => (
                      <div key={row.label} className="versus__row">
                        <dt>{row.label}</dt>
                        <dd>{row[column.key]}</dd>
                      </div>
                    ))}
                  </dl>
                  {product ? (
                    <a
                      className="text-link"
                      href={whatsappUrl(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pedir orçamento da cama {column.title.toLowerCase()}
                    </a>
                  ) : null}
                </article>
              )
            })}
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
