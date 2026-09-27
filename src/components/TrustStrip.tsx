import { Reveal } from './Reveal'
import { trustItems } from '../config'

export function TrustStrip() {
  return (
    <section className="trust" aria-label="Por que a Vertebra">
      <div className="trust__grid shell">
        {trustItems.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index === 1 ? 1 : index === 2 ? 2 : undefined}
          >
            <article className="trust__item">
              <h2 className="trust__title">{item.title}</h2>
              <p className="trust__text">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
