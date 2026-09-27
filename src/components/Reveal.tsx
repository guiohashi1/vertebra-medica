import { useEffect, useRef, type ReactNode } from 'react'
import { usePerf } from './PerfProvider'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: 1 | 2 | 3
}

export function Reveal({ children, className = '', delay }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mode = usePerf()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      mode !== 'full' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('is-in')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('is-in')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [mode])

  const delayClass = mode === 'full' && delay ? ` reveal-delay-${delay}` : ''

  return (
    <div ref={ref} className={`reveal${delayClass} ${className}`.trim()}>
      {children}
    </div>
  )
}
