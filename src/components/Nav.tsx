import { useEffect, useState } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="shell nav__inner">
        <a href="#topo" className="nav__brand">
          Vertebra <span>Médica</span>
        </a>

        <nav className="nav__actions" aria-label="Principal">
          <a className="nav__text" href="#para-quem">
            A linha
          </a>
          <a className="nav__text" href="#catalogo">
            Catálogo
          </a>
          <a className="nav__cta" href="#orcamento">
            Orçamento
          </a>
        </nav>
      </div>
    </header>
  )
}
