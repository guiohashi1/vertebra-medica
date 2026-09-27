import { useEffect, useState } from 'react'
import { whatsappUrl } from '../config'

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.querySelector('.hero__actions')
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry?.isIntersecting && (entry?.boundingClientRect.top ?? 0) < 0)
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`wa-bar${visible ? ' is-visible' : ''}`}>
      <a
        className="wa-bar__link"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? undefined : -1}
        aria-hidden={visible ? undefined : true}
      >
        Pedir orçamento no WhatsApp
      </a>
    </div>
  )
}
