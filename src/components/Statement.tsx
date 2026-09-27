import { Reveal } from './Reveal'

export function Statement() {
  return (
    <section className="statement" aria-label="Sobre a linha">
      <div className="statement__inner">
        <Reveal>
          <p className="statement__kicker">Uso contínuo, sem firula</p>
        </Reveal>
        <Reveal delay={1}>
          <p className="statement__text">
            Estrutura que aguenta o dia a dia.{' '}
            <strong>Conforto</strong> que se mantém depois da primeira semana.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
