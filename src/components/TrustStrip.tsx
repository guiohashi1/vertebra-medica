import { companyFacts, faq } from '../config'
import { Reveal } from './Reveal'

const pendingFacts = [
  'Região atendida',
  'Entrega e montagem',
  'Garantia e suporte',
  'Dados empresariais',
]

export function TrustStrip() {
  const confirmed = companyFacts.filter((item) => item.text.trim().length > 0)
  const questions = faq.filter(
    (item) => item.question.trim() && item.answer.trim(),
  )
  const missing = pendingFacts.filter(
    (label) => !confirmed.some((item) => item.label === label),
  )

  return (
    <section className="facts" id="informacoes" aria-labelledby="facts-title">
      <div className="shell facts__layout">
        <Reveal className="facts__intro">
          <p className="kicker">
            <span className="kicker__num">03</span> Informações
          </p>
          <h2 id="facts-title" className="section-title">
            Informações
          </h2>
          <p className="section-head__lead">
            Só entram aqui dados confirmados. O que falta permanece marcado como
            pendente.
          </p>
        </Reveal>

        <div className="facts__body">
          <dl className="facts__list">
            {confirmed.map((item) => (
              <div key={item.label} className="facts__item">
                <dt>{item.label}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
            {missing.map((label) => (
              <div key={label} className="facts__item">
                <dt>{label}</dt>
                <dd className="pending">Pendente de confirmação.</dd>
              </div>
            ))}
          </dl>

          <div className="faq">
            <h3 className="faq__title">Perguntas frequentes</h3>
            {questions.length > 0 ? (
              questions.map((item) => (
                <details key={item.question} className="faq__item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))
            ) : (
              <p className="pending">Respostas pendentes de aprovação.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
