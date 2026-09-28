import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePerf } from './PerfProvider'

gsap.registerPlugin(ScrollTrigger)

const text =
  'Cama hospitalar elétrica, cama hospitalar manual e colchão. Cada pedido segue por orçamento, sem compra direta neste site.'

const highlight = new Set(['elétrica,', 'manual', 'colchão.', 'orçamento,'])

export function Statement() {
  const mode = usePerf()
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el || mode !== 'full') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.word'),
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [mode])

  return (
    <section className="statement" aria-label="O catálogo">
      <div className="statement__inner">
        <p className="kicker kicker--center">Sob consulta</p>
        <p className="statement__text" ref={textRef}>
          {text.split(' ').map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={`word${highlight.has(word) ? ' word--accent' : ''}`}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
