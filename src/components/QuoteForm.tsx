import { useMemo, useState, type FormEvent } from 'react'
import { Reveal } from './Reveal'
import {
  BRAZIL_UFS,
  products,
  whatsappText,
  whatsappUrl,
  type QuotePayload,
} from '../config'

const quantities = ['1', '2', '3+']

export function QuoteForm() {
  const [product, setProduct] = useState(products[0]?.name ?? '')
  const [quantity, setQuantity] = useState('1')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const payload = useMemo<QuotePayload>(
    () => ({
      product: product || undefined,
      quantity: quantity || undefined,
      city: city.trim() || undefined,
      uf: uf || undefined,
    }),
    [product, quantity, city, uf],
  )
  const href = whatsappUrl(payload)
  const preview = whatsappText(payload)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="cta" id="orcamento">
      <div className="cta__layout shell">
        <div className="cta__intro">
          <Reveal>
            <h2 className="cta__title">Solicitar orçamento</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="cta__text">
              Informe produto, quantidade e cidade. O botão abre o WhatsApp com
              o texto pronto. A solicitação só é enviada quando você confirmar
              o envio dentro do WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="preview">
              <p className="preview__label">Prévia da mensagem</p>
              <p className="preview__text">{preview}</p>
              <p className="preview__hint">Ainda não enviada.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <form className="quote" onSubmit={onSubmit}>
            <label className="quote__field">
              <span className="quote__label">Produto</span>
              <select
                className="quote__input"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
              >
                {products.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
                <option value="Cama e colchão">Cama e colchão</option>
              </select>
            </label>

            <fieldset className="quote__field">
              <legend className="quote__label">Quantidade</legend>
              <div className="quote__pills" role="group" aria-label="Quantidade">
                {quantities.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`quote__pill${quantity === item ? ' is-active' : ''}`}
                    onClick={() => setQuantity(item)}
                    aria-pressed={quantity === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="quote__row">
              <label className="quote__field">
                <span className="quote__label">Cidade</span>
                <input
                  className="quote__input"
                  type="text"
                  name="city"
                  placeholder="Ex.: Recife"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  autoComplete="address-level2"
                />
              </label>
              <label className="quote__field quote__field--uf">
                <span className="quote__label">UF</span>
                <select
                  className="quote__input"
                  name="uf"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  autoComplete="address-level1"
                >
                  <option value="">UF</option>
                  {BRAZIL_UFS.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <a
              className="btn btn--primary btn--lg quote__submit"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir WhatsApp com a mensagem
            </a>
            <p className="quote__note">
              Nada é enviado automaticamente. Depois de abrir o WhatsApp, toque
              em enviar.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
