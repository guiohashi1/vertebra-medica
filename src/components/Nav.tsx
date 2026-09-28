import { useEffect, useId, useState } from 'react'
import { pageLinks, whatsappUrl } from '../config'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function close() {
    setOpen(false)
  }

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="shell nav__inner">
        <a href="#topo" className="nav__brand" onClick={close}>
          Vertebra <span>Médica</span>
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Fechar' : 'Menu'}
        </button>

        <nav
          id={menuId}
          className={`nav__actions${open ? ' is-open' : ''}`}
          aria-label="Principal"
        >
          {pageLinks.map((link) => (
            <a key={link.href} className="nav__text" href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a
            className="nav__cta"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            Pedir orçamento
          </a>
        </nav>
      </div>
      <span className="nav__progress" aria-hidden="true" />
    </header>
  )
}
