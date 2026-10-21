import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePerf } from './PerfProvider'

gsap.registerPlugin(ScrollTrigger)

const lineMain =
  'Mais que equipamentos: noites seguras e conforto para o paciente.'
const lineSub = 'Alívio e acolhimento pra quem cuida com amor.'

const highlightMain = new Set(['seguras', 'conforto'])
const highlightSub = new Set(['Alívio', 'acolhimento', 'amor.'])

export function Statement() {
  const mode = usePerf()
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = textRef.current
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
    <section className="statement" aria-label="Para quem cuida">
      <div className="statement__inner" ref={textRef}>
        <p className="kicker kicker--center">Para quem cuida</p>
        <p className="statement__text statement__text--main">
          {lineMain.split(' ').map((word, index) => (
            <span
              key={`m-${word}-${index}`}
              className={`word${highlightMain.has(word) ? ' word--accent' : ''}`}
            >
              {word}{' '}
            </span>
          ))}
        </p>
        <p className="statement__text statement__text--sub">
          {lineSub.split(' ').map((word, index) => (
            <span
              key={`s-${word}-${index}`}
              className={`word${highlightSub.has(word) ? ' word--accent' : ''}`}
            >
              {word}{' '}
            </span>
          ))}
        </p>
        <p className="kicker kicker--center statement__footer-kicker">
          Pra quem precisa
        </p>
      </div>
    </section>
  )
}
