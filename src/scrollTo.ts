type ScrollFn = (top: number) => void

let scrollFn: ScrollFn | null = null

export function setPageScroller(fn: ScrollFn | null) {
  scrollFn = fn
}

/** Rola até um id da página, compensando o menu fixo. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return false

  const header = document.querySelector('.nav')
  const offset = id === 'topo' ? 0 : -(header?.getBoundingClientRect().height ?? 0)
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (scrollFn && !reduce) scrollFn(top)
  else window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })

  return true
}
