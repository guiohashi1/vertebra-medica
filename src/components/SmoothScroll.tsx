import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePerf } from './PerfProvider'
import { scrollToId, setPageScroller } from '../scrollTo'

gsap.registerPlugin(ScrollTrigger)

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const mode = usePerf()

  useEffect(() => {
    if (mode !== 'full') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 0.95,
      smoothWheel: true,
      touchMultiplier: 1.1,
    })

    setPageScroller((top) => lenis.scrollTo(top))
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {})

    return () => {
      setPageScroller(null)
      ctx.revert()
      gsap.ticker.remove(ticker)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [mode])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]')
      const href = link?.getAttribute('href')
      if (!href || href === '#') return
      if (!scrollToId(href.slice(1))) return
      event.preventDefault()
      if (window.location.hash !== href) history.pushState(null, '', href)
    }

    document.addEventListener('click', onClick)
    if (window.location.hash.length > 1) scrollToId(window.location.hash.slice(1))

    return () => document.removeEventListener('click', onClick)
  }, [mode])

  return <>{children}</>
}
