import { brand, modelCredits } from '../config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">{brand.name}</p>
        <p>Camas e colchões hospitalares · {year}</p>
      </div>
      <div className="footer__credits">
        <p>
          Modelos 3D de teste sob {modelCredits[0]?.license}:{' '}
          {modelCredits.map((credit, i) => (
            <span key={credit.source}>
              {i > 0 ? '; ' : null}
              <a href={credit.source} target="_blank" rel="noopener noreferrer">
                {credit.name}
              </a>{' '}
              por {credit.author}
            </span>
          ))}
          . Substitua pelos arquivos oficiais da linha quando disponíveis.
        </p>
      </div>
    </footer>
  )
}
