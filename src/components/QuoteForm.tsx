import { useMemo, useState, type FormEvent } from 'react'
import { Reveal } from './Reveal'
import { products, whatsappUrl } from '../config'

const quantities = ['1', '2', '3+']

export function QuoteForm() {
  const [product, setProduct] = useState(products[0]?.name ?? '')
  const [quantity, setQuantity] = useState('1')
  const [city, setCity] = useState('')

  const href = useMemo(
    () =>
      whatsappUrl({
        product: product || undefined,
        quantity: quantity || undefined,
        city: city.trim() || undefined,
      }),
    [product, quantity, city],
  )

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="cta" id="orcamento">
      <div className="cta__layout shell">
        <div className="cta__intro">
          <Reveal>
            <h2 className="cta__title">Monte o orçamento</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="cta__text">
              Modelo, quantidade e cidade. Abrimos o WhatsApp com tudo
              preenchido para agilizar a resposta.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <form className="quote" onSubmit={onSubmit}>
            <label className="quote__field">
              <span className="quote__label">Modelo</span>
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
                <option value="Conjunto (cama + colchão)">
                  Conjunto (cama + colchão)
                </option>
              </select>
            </label>

            <fieldset className="quote__field">
              <legend className="quote__label">Quantidade</legend>
              <div className="quote__pills" role="group">
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

            <label className="quote__field">
              <span className="quote__label">Cidade</span>
              <input
                className="quote__input"
                type="text"
                name="city"
                placeholder="Ex.: São Paulo"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="address-level2"
              />
            </label>

            <button className="btn btn--primary quote__submit" type="submit">
              Enviar no WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
