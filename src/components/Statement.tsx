import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePerf } from './PerfProvider'

gsap.registerPlugin(ScrollTrigger)

const text =
  'Mais do que leitos hospitalares, entregamos noites seguras, dores aliviadas e a certeza de que seu ente querido está nas melhores mãos.'

const highlight = new Set(['seguras,', 'aliviadas', 'mãos.'])

export function Statement() {
  const mode = usePerf()
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = textRef.current
    // Só desliga em static / reduced-motion. Em lite o reveal continua.
    if (!el || mode === 'static') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const words = el.querySelectorAll('.word')
    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.18 })
      gsap.to(words, {
        opacity: 1,
        duration: 0.7,
        ease: 'power1.out',
        stagger: 0.035,
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      })
    }, el)

    const refresh = () => ScrollTrigger.refresh()
    const frame = requestAnimationFrame(refresh)
    window.addEventListener('load', refresh)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [mode])

  return (
    <section className="statement" aria-label="O catálogo">
      <div className="statement__inner">
        <p className="kicker kicker--center">Para quem cuida</p>
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
