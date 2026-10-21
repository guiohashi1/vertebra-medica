import { companyFacts, faq } from '../config'
import { Reveal } from './Reveal'

export function TrustStrip() {
  const confirmed = companyFacts.filter((item) => item.text.trim().length > 0)
  const questions = faq.filter(
    (item) => item.question.trim() && item.answer.trim(),
  )

  if (confirmed.length === 0 && questions.length === 0) return null

  return (
    <section className="facts" id="informacoes" aria-labelledby="facts-title">
      <div className="shell facts__layout">
        <Reveal className="facts__intro">
          <h2 id="facts-title" className="section-title">
            Informações
          </h2>
        </Reveal>

        <div className="facts__body">
          {confirmed.length > 0 ? (
            <dl className="facts__list">
              {confirmed.map((item) => (
                <div key={item.label} className="facts__item">
                  <dt>{item.label}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {questions.length > 0 ? (
            <div className="faq">
              <h3 className="faq__title">Perguntas frequentes</h3>
              {questions.map((item) => (
                <details key={item.question} className="faq__item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
