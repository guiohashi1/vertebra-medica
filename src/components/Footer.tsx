import { brand, modelCredits } from '../config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">{brand.name}</p>
        <p>Camas hospitalares e colchões · {year}</p>
      </div>
      <div className="footer__credits">
        <p>
          Modelos 3D sob {modelCredits[0]?.license}:{' '}
          {modelCredits.map((credit, i) => (
            <span key={credit.source}>
              {i > 0 ? '; ' : null}
              <a href={credit.source} target="_blank" rel="noopener noreferrer">
                {credit.name}
              </a>{' '}
              por {credit.author}
            </span>
          ))}
          .
        </p>
      </div>
      <div className="footer__links shell">
        <a href="#privacidade">Aviso de privacidade</a>
      </div>
      <section className="privacy shell" id="privacidade">
        <h2>Aviso de privacidade</h2>
        <p>
          Este site não grava os dados do formulário em servidor. Produto,
          quantidade, cidade e UF servem só para montar o texto do WhatsApp no
          seu navegador.
        </p>
        <p>
          Não pedimos dados de saúde. A mensagem só é enviada quando você
          confirma no WhatsApp, pelos botões desta página.
        </p>
      </section>
    </footer>
  )
}
