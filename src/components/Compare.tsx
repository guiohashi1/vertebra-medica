import { Reveal } from './Reveal'
import { comparison } from '../config'

export function Compare() {
  return (
    <section className="compare" id="comparativo" aria-labelledby="compare-title">
      <div className="shell">
        <Reveal>
          <div className="section-head section-head--center">
            <h2 id="compare-title" className="section-head__title">
              {comparison.title}
            </h2>
            <p className="section-head__lead">{comparison.lead}</p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="compare__table-wrap">
            <table className="compare__table">
              <thead>
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">Elétrica</th>
                  <th scope="col">Manual</th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.eletrica}</td>
                    <td>{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <p className="compare__note">
            Em dúvida? Monte o orçamento com os dois modelos e a gente ajuda a
            escolher.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
