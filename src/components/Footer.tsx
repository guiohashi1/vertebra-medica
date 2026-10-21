import { brand, pageLinks, whatsappUrl } from '../config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell footer__main">
        <div>
          <a href="#topo" className="footer__brand">
            Oficina das <span>{brand.accent}</span>
          </a>
          <p className="footer__line">
            Equipamentos para home care, clínicas e hospitais.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Rodapé">
          {pageLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            Pedir orçamento
          </a>
        </nav>
      </div>

      <div className="shell footer__base">
        <p>
          © {year} {brand.name}
        </p>
      </div>
    </footer>
  )
}
