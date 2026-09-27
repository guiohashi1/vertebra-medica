import { brand, whatsappUrl } from '../config'

export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a ${brand.name} no WhatsApp`}
    >
      <span className="wa-float__dot" aria-hidden="true" />
      WhatsApp
    </a>
  )
}
